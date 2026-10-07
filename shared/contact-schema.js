// Contact form rules, shared by the browser form and the /api/contact function
// so validation can never drift between the two. Keep this file free of
// browser-only or Node-only APIs.

import { SERVICES } from '../src/content/services.js';

export const CARE_FOR_OPTIONS = [
  { id: 'parent', label: 'My mom or dad' },
  { id: 'partner', label: 'My husband, wife or partner' },
  { id: 'self', label: 'Myself' },
  { id: 'caregiver', label: 'I’m a family caregiver and I need a break' },
  { id: 'other', label: 'Another family member or friend' },
  { id: 'organization', label: 'My organization needs care staff' },
];

export const TIMING_OPTIONS = [
  { id: 'asap', label: 'As soon as possible' },
  { id: 'weeks', label: 'In the next few weeks' },
  { id: 'planning', label: 'Just planning ahead' },
];

export const CONTACT_METHODS = [
  { id: 'phone', label: 'Phone call' },
  { id: 'email', label: 'Email' },
];

// Service ids come straight from the site content, so the form and server always agree.
export const SERVICE_IDS = SERVICES.map((s) => s.id);

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
  bodyBytes: 10_000,
  minFillMs: 3000,
};

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]{2,}$/;
const PHONE_RE = /^[0-9+().\-\s]{7,30}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const ids = (list) => list.map((o) => o.id);
const clean = (v) => (typeof v === 'string' ? v.replace(CONTROL_CHARS, '').trim() : '');
const oneLine = (v) => clean(v).replace(/[\r\n\t]+/g, ' ');

/**
 * Validates raw form input. Returns { ok, data, errors } where `data` holds
 * only known, cleaned fields and `errors` maps field name to a plain message.
 */
export function validateContact(input) {
  const raw = input && typeof input === 'object' ? input : {};
  const errors = {};

  const name = oneLine(raw.name);
  const email = oneLine(raw.email).toLowerCase();
  const phone = oneLine(raw.phone);
  const contactMethod = oneLine(raw.contactMethod);
  const careFor = oneLine(raw.careFor);
  const timing = oneLine(raw.timing);
  const message = clean(raw.message).replace(/\r\n?/g, '\n');
  const services = Array.isArray(raw.services) ? [...new Set(raw.services.filter((s) => typeof s === 'string'))] : [];

  if (name.length < 2) errors.name = 'Please tell us your name.';
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;
  else if (/https?:|www\./i.test(name)) errors.name = 'Please enter just your name.';

  if (!ids(CONTACT_METHODS).includes(contactMethod)) errors.contactMethod = 'Please choose how we should reach you.';

  // Whichever contact method is chosen becomes required; the other is optional.
  if (email && (email.length > LIMITS.email || !EMAIL_RE.test(email))) errors.email = 'Please check your email address.';
  else if (!email && contactMethod === 'email') errors.email = 'Please add your email address so we can reply.';

  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Please check your phone number.';
  else if (!phone && contactMethod === 'phone') errors.phone = 'Please add a phone number so we can call you.';

  if (!ids(CARE_FOR_OPTIONS).includes(careFor)) errors.careFor = 'Please choose who the care is for.';
  if (!ids(TIMING_OPTIONS).includes(timing)) errors.timing = 'Please choose when you need care.';

  if (services.length > SERVICE_IDS.length || services.some((s) => !SERVICE_IDS.includes(s))) {
    errors.services = 'Please choose from the listed services.';
  }

  if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;
  if (raw.consent !== true) errors.consent = 'Please confirm we can contact you about your request.';

  const data = { name, email, phone, contactMethod, careFor, timing, services, message };
  return { ok: Object.keys(errors).length === 0, data, errors };
}

export const isUuid = (v) => typeof v === 'string' && UUID_RE.test(v);
export const labelFor = (list, id) => list.find((o) => o.id === id)?.label ?? id;
