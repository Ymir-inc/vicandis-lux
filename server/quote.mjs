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

// Brand palette (mirrors the site)
const C = { bg: '#0c0c0b', surface: '#151513', border: '#2a2a28', accent: '#d6a94b', text: '#f7f5f0', soft: '#cfcbc2', muted: '#8e8a80', faint: '#57544c' };

/** Branded, email-client-safe (table + inline styles) quote email. */
function renderEmail({ name, email, phone, rows, summary }) {
  const mono = "'Courier New', Courier, monospace";
  const sans = "Arial, Helvetica, sans-serif";
  const body = rows.length
    ? rows
        .map(
          (r) =>
            `<tr><td style="padding:11px 0;border-top:1px solid ${C.border};font-family:${mono};font-size:13px;color:${C.muted};">${esc(r.k)}</td>` +
            `<td style="padding:11px 0;border-top:1px solid ${C.border};font-family:${mono};font-size:13px;color:${C.text};text-align:right;">${esc(r.v)}</td></tr>`,
        )
        .join('')
    : `<tr><td style="padding:11px 0;font-family:${mono};font-size:13px;color:${C.soft};white-space:pre-wrap;">${esc(summary)}</td></tr>`;

  return `<!doctype html><html><body style="margin:0;padding:0;background:${C.bg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};padding:28px 12px;">
 <tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${C.surface};border:1px solid ${C.border};border-radius:6px;overflow:hidden;">
   <tr><td style="height:4px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
   <tr><td style="padding:28px 32px 6px;">
     <div style="font-family:${sans};font-size:20px;font-weight:700;letter-spacing:-0.02em;color:${C.text};">VICANDIS<span style="color:${C.accent};">LUX</span></div>
     <div style="font-family:${mono};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};margin-top:6px;">Cerere de ofertă · Configurator</div>
   </td></tr>
   <tr><td style="padding:10px 32px 4px;">
     <h1 style="margin:0;font-family:${sans};font-size:23px;font-weight:700;color:${C.text};">Cerere nouă de la ${esc(name)}</h1>
   </td></tr>
   <tr><td style="padding:18px 32px 0;">
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg};border:1px solid ${C.border};border-radius:4px;">
      <tr><td style="padding:16px 18px;font-family:${sans};font-size:14px;color:${C.soft};line-height:1.7;">
        <strong style="color:${C.text};">Nume:</strong> ${esc(name)}<br>
        <strong style="color:${C.text};">Email:</strong> <a href="mailto:${esc(email)}" style="color:${C.accent};text-decoration:none;">${esc(email)}</a><br>
        <strong style="color:${C.text};">Telefon:</strong> ${esc(phone) || '—'}
      </td></tr>
     </table>
   </td></tr>
   <tr><td style="padding:24px 32px 4px;">
     <div style="font-family:${mono};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};">Configurație</div>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:6px;">${body}</table>
   </td></tr>
   <tr><td style="padding:22px 32px 28px;">
     <div style="font-family:${sans};font-size:13px;color:${C.muted};line-height:1.6;border-top:1px solid ${C.border};padding-top:16px;">
       Răspunde direct la acest email pentru a-i scrie clientului.
     </div>
   </td></tr>
  </table>
  <div style="font-family:${mono};font-size:11px;color:${C.faint};margin-top:16px;">VICANDISLUX SRL · vicandislux.md</div>
 </td></tr>
</table>
</body></html>`;
}

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
    const rows = Array.isArray(data.config)
      ? data.config
          .slice(0, 20)
          .map((r) => ({ k: String(r?.k ?? '').slice(0, 120), v: String(r?.v ?? '').slice(0, 200) }))
      : [];

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return send(400, { error: 'name/email required' });
    if (!RESEND_API_KEY || !QUOTE_TO) {
      console.error('vlx-quote: RESEND_API_KEY or QUOTE_TO not set');
      return send(500, { error: 'not configured' });
    }

    const html = renderEmail({ name, email, phone, rows, summary });
    const text =
      `Cerere nouă de ofertă\n\n` +
      `Nume: ${name}\nEmail: ${email}\nTelefon: ${phone || '—'}\n\n` +
      `Configurație:\n` +
      (rows.length ? rows.map((r) => `- ${r.k}: ${r.v}`).join('\n') : summary) +
      `\n\nRăspunde direct la acest email pentru a-i scrie clientului.`;

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
          text,
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
