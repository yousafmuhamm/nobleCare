// Vercel Function: POST /api/contact
// Secrets come from Vercel's encrypted environment variables (see README).
import { createRateLimiter, handleContactRequest } from '../server/contact.js';
import { SERVICE_NAMES } from '../server/service-names.js';

const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export default {
  fetch(request) {
    return handleContactRequest(request, { env: process.env, rateLimit, serviceNames: SERVICE_NAMES });
  },
};
