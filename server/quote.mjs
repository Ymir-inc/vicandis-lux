// Minimal same-origin quote endpoint for the VicandisLux site.
// Receives POST /api/quote from the configurator and emails the office via Resend.
// No dependencies (Node 18+ built-in http + fetch). Config via env:
//   RESEND_API_KEY, QUOTE_TO, QUOTE_FROM (optional), PORT (optional)
import http from 'node:http';

const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT) || 8081;
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const QUOTE_TO = process.env.QUOTE_TO || '';
const QUOTE_FROM = process.env.QUOTE_FROM || 'VicandisLux <onboarding@resend.dev>';
const MAX_BODY = 20 * 1024;

// Naive per-IP rate limit: LIMIT requests per WINDOW.
const WINDOW = 60_000;
const LIMIT = 5;
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > LIMIT;
}

const esc = (s = '') =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]);

const server = http.createServer((req, res) => {
  const send = (code, obj) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  };
  if (req.method !== 'POST' || !req.url.startsWith('/api/quote')) return send(404, { error: 'not found' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
  if (rateLimited(ip)) return send(429, { error: 'rate limited' });

  let body = '';
  let aborted = false;
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > MAX_BODY) {
      aborted = true;
      req.destroy();
    }
  });
  req.on('end', async () => {
    if (aborted) return;
    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return send(400, { error: 'bad json' });
    }

    if (data.website) return send(200, { ok: true }); // honeypot: accept + drop

    const name = String(data.name || '').trim().slice(0, 200);
    const email = String(data.email || '').trim().slice(0, 200);
    const phone = String(data.phone || '').trim().slice(0, 60);
    const summary = String(data.summary || '').slice(0, 4000);

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return send(400, { error: 'name/email required' });
    if (!RESEND_API_KEY || !QUOTE_TO) {
      console.error('vlx-quote: RESEND_API_KEY or QUOTE_TO not set');
      return send(500, { error: 'not configured' });
    }

    const html =
      `<h2>Cerere de ofertă — configurator</h2>` +
      `<p><strong>Nume:</strong> ${esc(name)}<br>` +
      `<strong>Email:</strong> ${esc(email)}<br>` +
      `<strong>Telefon:</strong> ${esc(phone) || '—'}</p>` +
      `<h3>Configurație</h3>` +
      `<pre style="font-family:monospace;white-space:pre-wrap">${esc(summary)}</pre>`;

    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: QUOTE_FROM,
          to: [QUOTE_TO],
          reply_to: email,
          subject: `Cerere ofertă — ${name}`,
          html,
        }),
      });
      if (!r.ok) {
        console.error('vlx-quote: resend', r.status, await r.text().catch(() => ''));
        return send(502, { error: 'send failed' });
      }
      return send(200, { ok: true });
    } catch (e) {
      console.error('vlx-quote:', e);
      return send(502, { error: 'send failed' });
    }
  });
});

server.listen(PORT, HOST, () => console.log(`vlx-quote listening on ${HOST}:${PORT}`));
