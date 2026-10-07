// Readable service names for the notification email (ids come from the form).
import { SERVICES } from '../src/content/services.js';

export const SERVICE_NAMES = Object.fromEntries(SERVICES.map((s) => [s.id, s.name]));
