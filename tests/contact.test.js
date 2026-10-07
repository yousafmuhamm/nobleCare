import assert from 'node:assert/strict';
import { test } from 'node:test';
import { HOME_SERVICE_IDS, PATHS, SERVICES, SERVICE_GROUPS } from '../src/content.js';
import { CARE_FOR_OPTIONS, SERVICE_IDS, validateContact } from '../shared/contact-schema.js';
import { SERVICE_NAMES } from '../server/service-names.js';
import { buildEmail, createRateLimiter, escapeHtml, handleContactRequest } from '../server/contact.js';

const ORIGIN = 'https://www.example.ca';
const NOW = 1_700_000_000_000;
const ENV = {
  RESEND_API_KEY: 're_test_secret',
  CONTACT_TO_EMAIL: 'team@example.ca',
  CONTACT_FROM_EMAIL: 'Site <forms@example.ca>',
};
const quiet = { info() {}, error() {} };

const valid = (over = {}) => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '403 555 0100',
  contactMethod: 'phone',
  careFor: 'parent',
  timing: 'asap',
  services: ['personal-care'],
  message: 'Mom needs help in the mornings.',
  consent: true,
  company: '',
  startedAt: NOW - 60_000,
  submissionId: '3b241101-e2bb-4255-8caf-4136c566a962',
  ...over,
});

function req(body, { method = 'POST', origin = ORIGIN, type = 'application/json', ip = '1.1.1.1' } = {}) {
  const headers = { 'x-forwarded-for': ip };
  if (origin) headers.origin = origin;
  if (type) headers['content-type'] = type;
  return new Request(`${ORIGIN}/api/contact`, {
    method,
    headers,
    body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  });
}

function fakeFetch(status = 200) {
  const calls = [];
  const fn = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return new Response(JSON.stringify({ id: 'x' }), { status });
  };
  fn.calls = calls;
  return fn;
}

const run = (request, extra = {}) =>
  handleContactRequest(request, { env: ENV, now: NOW, fetchImpl: fakeFetch(), log: quiet, ...extra });

test('form option ids match the site content', () => {
  assert.deepEqual(SERVICES.map((s) => s.id), SERVICE_IDS);
  assert.deepEqual(Object.keys(SERVICE_NAMES), SERVICE_IDS);
  const careIds = CARE_FOR_OPTIONS.map((o) => o.id);
  for (const p of PATHS) assert.ok(careIds.includes(p.id), `picker path ${p.id} missing from form options`);
});

test('every service the site links to exists, and every service has a known group', () => {
  const ids = new Set(SERVICES.map((s) => s.id));
  for (const id of HOME_SERVICE_IDS) assert.ok(ids.has(id), `home card ${id}`);
  for (const p of PATHS) for (const id of p.services) assert.ok(ids.has(id), `picker ${p.id} -> ${id}`);
  const groups = new Set(SERVICE_GROUPS.map((g) => g.id));
  for (const s of SERVICES) assert.ok(groups.has(s.group), `${s.id} group ${s.group}`);
  assert.equal(ids.size, SERVICES.length, 'service ids are unique');
});

test('valid submission is sent to Resend with the key server-side only', async () => {
  const fetchImpl = fakeFetch();
  const res = await run(req(valid()), { fetchImpl });
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.deepEqual(JSON.parse(text), { ok: true });
  assert.ok(!text.includes('re_test_secret'));
  assert.equal(fetchImpl.calls.length, 1);
  const call = fetchImpl.calls[0];
  assert.equal(call.url, 'https://api.resend.com/emails');
  assert.equal(call.init.headers.Authorization, 'Bearer re_test_secret');
  assert.equal(call.init.headers['Idempotency-Key'], 'contact-3b241101-e2bb-4255-8caf-4136c566a962');
  assert.deepEqual(call.body.to, ['team@example.ca']);
  assert.equal(call.body.reply_to, 'jane@example.com');
});

test('rejects wrong method, content type and origin', async () => {
  assert.equal((await run(req(null, { method: 'GET' }))).status, 405);
  assert.equal((await run(req(valid(), { type: 'text/plain' }))).status, 415);
  assert.equal((await run(req(valid(), { origin: 'https://evil.example' }))).status, 403);
  assert.equal((await run(req(valid(), { origin: null }))).status, 403);
});

test('ALLOWED_ORIGINS overrides same-origin check', async () => {
  const env = { ...ENV, ALLOWED_ORIGINS: 'https://a.ca, https://b.ca' };
  assert.equal((await run(req(valid(), { origin: 'https://b.ca' }), { env })).status, 200);
  assert.equal((await run(req(valid()), { env })).status, 403);
});

test('rejects oversized and malformed bodies', async () => {
  assert.equal((await run(req(valid({ message: 'x'.repeat(20_000) })))).status, 413);
  assert.equal((await run(req('{not json'))).status, 400);
  assert.equal((await run(req('[1,2]'))).status, 400);
});

test('honeypot and too-fast submissions are silently dropped', async () => {
  const f1 = fakeFetch();
  const r1 = await run(req(valid({ company: 'Spam Inc' })), { fetchImpl: f1 });
  assert.equal(r1.status, 200);
  assert.equal(f1.calls.length, 0);
  const f2 = fakeFetch();
  const r2 = await run(req(valid({ startedAt: NOW - 500 })), { fetchImpl: f2 });
  assert.equal(r2.status, 200);
  assert.equal(f2.calls.length, 0);
});

test('returns field errors without sending', async () => {
  const fetchImpl = fakeFetch();
  const res = await run(req(valid({ email: 'nope', consent: false, services: ['hacking'] })), { fetchImpl });
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.deepEqual(Object.keys(body.errors).sort(), ['consent', 'email', 'services']);
  assert.equal(fetchImpl.calls.length, 0);
});

test('rate limiter blocks after the limit', async () => {
  const rateLimit = createRateLimiter({ limit: 2, windowMs: 60_000 });
  const statuses = [];
  for (let i = 0; i < 3; i++) statuses.push((await run(req(valid()), { rateLimit })).status);
  assert.deepEqual(statuses, [200, 200, 429]);
  assert.equal((await run(req(valid(), { ip: '2.2.2.2' }), { rateLimit })).status, 200);
});

test('missing config and Resend failures give a generic 5xx', async () => {
  const noKey = await run(req(valid()), { env: { ...ENV, RESEND_API_KEY: '' } });
  assert.equal(noKey.status, 500);
  const bad = await run(req(valid()), { fetchImpl: fakeFetch(401) });
  assert.equal(bad.status, 502);
  assert.ok(!(await bad.text()).includes('401'));
});

test('email HTML escapes user input and strips header-breaking characters', () => {
  const { data } = validateContact(valid({ name: 'Eve <script>\r\nBcc: x@y.z', message: '<img src=x onerror=alert(1)>' }));
  const email = buildEmail(data);
  assert.ok(!email.html.includes('<script>'));
  assert.ok(!email.html.includes('<img'));
  assert.ok(email.html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!/[\r\n]/.test(email.subject));
  assert.equal(escapeHtml(`"'&`), '&quot;&#39;&amp;');
});

test('email is required only when email is the chosen contact method', () => {
  assert.ok(validateContact(valid({ email: '', contactMethod: 'phone' })).ok);
  assert.equal(
    validateContact(valid({ email: '', contactMethod: 'email' })).errors.email,
    'Please add your email address so we can reply.'
  );
  assert.equal(validateContact(valid({ email: 'not-an-email', contactMethod: 'phone' })).errors.email, 'Please check your email address.');
});

test('no reply-to is set when the visitor gives no email', async () => {
  const fetchImpl = fakeFetch();
  const res = await run(req(valid({ email: '', contactMethod: 'phone' })), { fetchImpl });
  assert.equal(res.status, 200);
  assert.equal('reply_to' in fetchImpl.calls[0].body, false);
  assert.match(fetchImpl.calls[0].body.text, /Email: Not given/);
});

test('phone is required only when phone is the chosen contact method', () => {
  assert.ok(validateContact(valid({ phone: '', contactMethod: 'email' })).ok);
  assert.equal(validateContact(valid({ phone: '', contactMethod: 'phone' })).errors.phone, 'Please add a phone number so we can call you.');
});
