# North & Noble Care website

React + Vite site with a contact form that emails enquiries through [Resend](https://resend.com). Hosted on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # contact form API tests
npm run build      # production build into dist/
```

The contact form works locally without any keys: if `RESEND_API_KEY` is empty, submissions are printed in the terminal instead of being emailed.

## Before launch: replace the sample content

All business details live in **`src/content/business.js`** (phone, email, address, hours, founder, testimonials, service area). Other copy lives in `src/content.js`, `src/content/about.js` and `src/content/faq.js`.

Every made-up value is tagged `// SAMPLE`. To list what is left:

```bash
npm run check:samples
```

Two things need special care:

- **Testimonials** must be real quotes from real clients, used with permission. While `TESTIMONIALS_ARE_SAMPLES` is `true`, the site shows a visible "sample" note beside them. Set it to `false` only once they are real.
- **The privacy policy** (`src/pages/Privacy.jsx`) is a starting point, not legal advice. Have it reviewed.
- **Team photos:** portraits live in `public/images/team/` (named after each person, e.g. `laarni-de-guzman.jpg`). Anyone without a photo shows the logo instead. Names, roles and bios are in `src/content/team.js`.

## API keys and secrets

The Resend key is a secret. It is only ever read on the server, in `server/contact.js`, and never reaches the browser.

- **Locally:** copy `.env.example` to `.env.local` and fill it in. `.env.local` is git-ignored.
- **In production:** add the same variables in Vercel under *Project > Settings > Environment Variables*. Vercel stores them encrypted and only exposes them to the server function.
- Never give a secret a `VITE_` prefix. Vite copies `VITE_` variables into the public JavaScript bundle.
- Use a Resend key with **Sending access** only, restricted to your domain, not a Full access key.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key (sending access only) |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered (comma-separated for several) |
| `CONTACT_FROM_EMAIL` | Sender, on a domain verified in Resend, e.g. `North & Noble Care website <forms@yourdomain.ca>` |
| `ALLOWED_ORIGINS` | Optional. Your site origins, e.g. `https://www.yourdomain.ca,https://yourdomain.ca` |

### Setting up Resend

1. Create a Resend account and add your domain under *Domains*. Add the DNS records it gives you and wait until it shows as verified.
2. Create an API key under *API Keys* with **Sending access** for that domain.
3. Put the key and addresses in Vercel's environment variables (and `.env.local` for local testing), then redeploy.

## How the contact form is protected

- Validation runs in the browser for helpful messages and again on the server, from one shared set of rules (`shared/contact-schema.js`).
- The server accepts only `POST` JSON requests from your own site's origin, caps the body size, and rate-limits each visitor (5 per 10 minutes, best effort per server instance).
- A hidden honeypot field and a minimum fill time quietly drop most spam bots.
- Everything a visitor types is HTML-escaped before it goes into the notification email, and the email is only ever sent to your own address, never to an address typed into the form.
- Errors shown to visitors are generic; nothing about the key or provider leaks.
- `vercel.json` adds security headers: a strict Content-Security-Policy, HSTS, no framing, nosniff and a restrictive Permissions-Policy.

For stronger spam protection later, add Vercel Firewall rate limiting or a CAPTCHA such as Cloudflare Turnstile.

## Project layout

```
api/contact.js            Vercel Function entry (thin adapter)
server/contact.js         Form handler: checks, validation, Resend call
shared/contact-schema.js  Validation rules shared by browser and server
src/content/              Editable site content (start with business.js)
src/pages/                Home, Services, About, FAQ, Contact, Privacy, 404
src/components/           Layout, form, picker and other building blocks
tests/                    API tests (node --test)
vercel.json               SPA routing and security headers
```
