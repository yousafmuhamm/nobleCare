import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Serves /api/contact during `npm run dev` using the same handler as production.
// Server-only env vars (no VITE_ prefix) are loaded here and never sent to the browser.
function contactApiDev(env) {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const [{ createRateLimiter, handleContactRequest }, { SERVICE_NAMES }] = await Promise.all([
          server.ssrLoadModule('/server/contact.js'),
          server.ssrLoadModule('/server/service-names.js'),
        ]);
        server.contactRateLimit ??= createRateLimiter();

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks);
        const url = `http://${req.headers.host}${req.originalUrl}`;
        const request = new Request(url, { method: req.method, headers: req.headers, body });

        const response = await handleContactRequest(request, {
          env,
          rateLimit: server.contactRateLimit,
          serviceNames: SERVICE_NAMES,
          dryRun: !env.RESEND_API_KEY,
        });
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), contactApiDev(env)],
  };
});
