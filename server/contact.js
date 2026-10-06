// Contact form handler. Runs only on the server (Vercel Function in production,
// Vite dev middleware locally). This is the only place the Resend API key is
// read, so it never reaches the browser bundle.

import {
  CARE_FOR_OPTIONS, CONTACT_METHODS, LIMITS, TIMING_OPTIONS, isUuid, labelFor, validateContact,
} from '../shared/contact-schema.js';

const RESEND_URL = 'https://api.resend.com/emails';
const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

const reply = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...extra } });

const GENERIC_FAIL = 'Sorry, we could not send your message. Please call us instead.';

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Fixed-window, per-key limiter. Best effort: serverless instances do not share memory. */
export function createRateLimiter({ limit = 5, windowMs = 10 * 60 * 1000, maxKeys = 5000 } = {}) {
  const hits = new Map();
  return function allow(key, now = Date.now()) {
    const entry = hits.get(key);
    if (!entry || now - entry.start >= windowMs) {
      if (hits.size >= maxKeys) hits.clear();
      hits.set(key, { start: now, count: 1 });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}

function clientIp(request) {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = request.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}

function originAllowed(request, env) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const allowed = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (allowed.length) return allowed.includes(origin);
  // No list configured: only accept same-origin requests.
  return origin === new URL(request.url).origin;
}

export function buildEmail(data, { serviceNames = {} } = {}) {
  const services = data.services.length ? data.services.map((id) => serviceNames[id] || id).join(', ') : 'Not specified';
  const rows = [
    ['Name', data.name],
    ['Email', data.email || 'Not given'],
    ['Phone', data.phone || 'Not given'],
    ['Best way to reach them', labelFor(CONTACT_METHODS, data.contactMethod)],
    ['Care is for', labelFor(CARE_FOR_OPTIONS, data.careFor)],
    ['How soon', labelFor(TIMING_OPTIONS, data.timing)],
    ['Services of interest', services],
  ];
  const message = data.message || '(No message)';

  const subject = `New care enquiry from ${data.name}`.slice(0, 150);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${message}\n`;
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1b2e47;line-height:1.5">
<h2 style="color:#0f2a4a;margin:0 0 16px">New care enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join('')}</table>
<h3 style="color:#0f2a4a;margin:24px 0 8px">Message</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
</body></html>`;
  return { subject, text, html };
}

/**
 * Handles POST /api/contact. Takes a Web Request, returns a Web Response.
 * options: { env, rateLimit, fetchImpl, now, dryRun, serviceNames, log }
 */
export async function handleContactRequest(request, options = {}) {
  const {
    env = {},
    rateLimit = () => true,
    fetchImpl = fetch,
    now = Date.now(),
    dryRun = false,
    serviceNames = {},
    log = console,
  } = options;

  if (request.method !== 'POST') return reply(405, { ok: false, error: 'Method not allowed.' }, { Allow: 'POST' });

  const type = request.headers.get('content-type') || '';
  if (!type.toLowerCase().startsWith('application/json')) return reply(415, { ok: false, error: 'Unsupported content type.' });

  if (!originAllowed(request, env)) return reply(403, { ok: false, error: 'Forbidden.' });

  if (!rateLimit(clientIp(request), now)) {
    return reply(429, { ok: false, error: 'Too many requests. Please wait a few minutes or call us.' }, { 'Retry-After': '600' });
  }

  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > LIMITS.bodyBytes) return reply(413, { ok: false, error: 'Request too large.' });
  const raw = await request.text();
  if (raw.length > LIMITS.bodyBytes) return reply(413, { ok: false, error: 'Request too large.' });

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false, error: 'Invalid request.' });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false, error: 'Invalid request.' });

  // Bot traps: a hidden field humans never fill, and a minimum time on the form.
  // Answer "ok" so bots do not learn they were caught.
  const startedAt = Number(body.startedAt);
  if (body.company || !Number.isFinite(startedAt) || now - startedAt < LIMITS.minFillMs) {
    return reply(200, { ok: true });
  }

  const { ok, data, errors } = validateContact(body);
  if (!ok) return reply(422, { ok: false, errors });

  const email = buildEmail(data, { serviceNames });

  if (dryRun) {
    log.info?.(`[contact] dry run, email not sent:\n${email.text}`);
    return reply(200, { ok: true });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    log.error?.('[contact] missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL');
    return reply(500, { ok: false, error: GENERIC_FAIL });
  }

  try {
    const res = await fetchImpl(RESEND_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        ...(isUuid(body.submissionId) ? { 'Idempotency-Key': `contact-${body.submissionId}` } : {}),
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(',').map((e) => e.trim()).filter(Boolean),
        ...(data.email ? { reply_to: data.email } : {}),
        subject: email.subject,
        text: email.text,
        html: email.html,
        tags: [{ name: 'source', value: 'website_contact_form' }],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      log.error?.(`[contact] Resend responded ${res.status}`);
      return reply(502, { ok: false, error: GENERIC_FAIL });
    }
  } catch (err) {
    log.error?.(`[contact] Resend request failed: ${err?.name || 'Error'}`);
    return reply(502, { ok: false, error: GENERIC_FAIL });
  }

  return reply(200, { ok: true });
}
