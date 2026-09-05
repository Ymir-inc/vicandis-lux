# VicandisLux — Takeover / Handover

Everything needed to run, deploy, and continue this project. **No secrets are in this file**
(the repo is public) — it points at *where* each credential lives. Whoever takes over needs
access to the accounts in §2.

Last updated: 2026-09 · Live site: **https://vicandislux.md**

---

## 1. What it is
Trilingual (RO/RU/EN) marketing site for VicandisLux (Chișinău) — simultaneous-interpretation &
AV/sound rental. Next.js 16 static export + a tiny self-hosted email endpoint for quote requests.
Full architecture is in `README.md`.

## 2. Accounts you must have access to
| System | What / where | Notes |
|---|---|---|
| **GitHub** | `Ymir-inc/vicandis-lux` (public, source) · `rusu-cristian/vicandislux-preview` (Pages preview, compiled output only) | `main` is production source |
| **Server (Hetzner)** | Ubuntu host at **`2.28.45.53`** (`vicandis-lux-1`), root SSH | Access is by **SSH key** — add a successor's public key to `/root/.ssh/authorized_keys` |
| **Hetzner DNS** | `dns.hetzner.com` → zone `vicandislux.md` | Where all DNS records are edited |
| **Domain registrar** | wherever `vicandislux.md` is registered (`.md`) | Nameservers already point to Hetzner |
| **Resend** | resend.com account (sends the quote emails) | API key lives on the server, not here (see §5) |
| **Email provider** | **not chosen yet** — receiving mail for the domain is unconfigured (see §6) | |

## 3. Infrastructure
- **Web server:** nginx 1.28, config at `/etc/nginx/sites-available/vicandislux` (symlinked into `sites-enabled/`). Serves the static site from **`/var/www/vicandislux/html`**.
- **TLS:** Let's Encrypt (`certbot --nginx`), certs in `/etc/letsencrypt/live/vicandislux.md/`. **Auto-renews** via `certbot.timer`. HTTP→HTTPS 301, HSTS, CSP + security headers all set in the nginx config.
- **Quote service:** Node 22 systemd unit **`vlx-quote`** running `/opt/vlx-quote/quote.mjs` on `127.0.0.1:8081`; nginx proxies **`/api/`** to it. Source of truth is `server/quote.mjs` in the repo.

## 4. DNS (Hetzner zone `vicandislux.md`)
Nameservers: `hydrogen.ns.hetzner.com`, `oxygen.ns.hetzner.com`, `helium.ns.hetzner.de`.

Current records:
- `A @` and `A www` → `2.28.45.53`
- `TXT @` (SPF): `v=spf1 -all` — **anti-spoof placeholder** (no domain mail yet; change when email is set up, §6)
- `TXT _dmarc`: `v=DMARC1; p=reject;` — also placeholder; relax to `p=none` during an email cutover
- **Resend send-auth** on the `send` subdomain (MX `…forge.rmta.net`, SPF, and `resend._domainkey` DKIM) — added when the domain was verified in Resend. **Leave these alone**; they're what lets the quote endpoint send.

## 5. Deploying
**The static site** (from a clean `main`):
```bash
NEXT_PUBLIC_SITE_URL=https://vicandislux.md npm run build
rsync -az --delete out/ root@2.28.45.53:/var/www/vicandislux/html/
```
> ⚠️ Always `git fetch && git reset --hard origin/main` (or checkout the intended commit) **before** building — a stale local tree silently ships old content. Never deploy the *preview* build (`NEXT_PUBLIC_PREVIEW=1`) to production.

**The throwaway preview** (for showing changes): `./deploy-preview.sh "msg"` → https://rusu-cristian.github.io/vicandislux-preview/ (noindex).

**The quote service** (after editing `server/quote.mjs`):
```bash
rsync -az server/quote.mjs root@2.28.45.53:/opt/vlx-quote/quote.mjs
ssh root@2.28.45.53 'systemctl restart vlx-quote'
```

## 6. Email
### Sending (works) — Resend
Quote-form submissions POST to `/api/quote`; the service emails via **Resend** (domain `vicandislux.md`
verified, EU region), from `quote@vicandislux.md`, reply-to = the visitor.
- Config file: **`/etc/vlx-quote.env`** on the server (`640 root:www-data`). Keys:
  `RESEND_API_KEY` (the real key — **only here, never in the repo**), `QUOTE_TO` (comma-separated
  recipients), `QUOTE_FROM` (**keep it quoted** — it contains `<>`), `PORT`.
- Change who receives: edit `QUOTE_TO`, then `systemctl restart vlx-quote`. Currently → `talpaandrei1983@gmail.com`.
- Logs: `journalctl -u vlx-quote -n 50`. Test: `curl -s -X POST -H 'Content-Type: application/json' -d '{"name":"T","email":"t@t.co","summary":"x"}' https://vicandislux.md/api/quote` → `{"ok":true}`.

### Receiving (NOT set up)
`director@vicandislux.md` **cannot receive mail** — the domain has no inbound MX/mailbox. To fix:
1. Pick a provider (**Zoho Mail Lite ~$12/yr** for one mailbox, or **Migadu ~$19/yr** for many — needs IMAP for migration).
2. Create `director@vicandislux.md`; **IMAP-migrate** the old mail from **host.md** (account is still open — server 993/SSL) *before* switching MX.
3. In Hetzner DNS: add the provider's **MX + DKIM**, change SPF `@` to `v=spf1 include:<provider> ~all`, relax `_dmarc` to `p=none`. (Resend's `send.` records are separate — don't remove.)
4. Then set `QUOTE_TO=director@vicandislux.md, talpaandrei1983@gmail.com` so both get every request.

## 7. Outstanding work (priority order)
See `tasks/OWNER-TODO.md` for the decision log and the compliance audit for the full list.
1. **`director@` receiving** (§6) — the site shows that address but it bounces.
2. **Legal pages are DRAFT** (`i18n/legal.ts`, "DOCUMENT ÎN LUCRU") — get them reviewed/finalised.
3. **Audit polish:** enable HTTP/2 (`http2 on;`), add `www`→apex 301, `server_tokens off`, tighten `<title>` (≤60) and meta-descriptions (70–160) in `i18n/messages/*` `meta.*`.
4. **`ORG_VERIFIED=1`** at build → publishes real address/phone in JSON-LD; consider `LocalBusiness`.
5. **Real social URLs** (footer links + JSON-LD `sameAs` are `#`).
6. **Analytics** — none installed (deliberate: zero third-party origins, so no cookie banner needed). Add a cookieless one (Plausible/Umami) if wanted.
7. **DMARC/SPF** must be updated when email (§6) is set up.

## 8. Gotchas / things not to break
- **Language switcher uses a full `<a>` navigation on purpose** (`components/SiteHeader.tsx`) — reverting to `next/link` makes Russian render in a Latin fallback font.
- **ISP HTTP interception:** from a StarNet connection, plain `http://vicandislux.md` was seen redirecting to `avertizare.starnet.md` (a subscriber notice). The server's own redirect is correct (verified on loopback). **Verify `http://` from a clean/mobile network**; if it still shows the notice, it's a server-uplink account issue.
- **`ProductDetail.tsx` and `lib/estimate.ts`** are dead/unmounted but kept for restorability — don't assume they're wired.
- **CSP has `'unsafe-inline'`** (script+style) — unavoidable with a static export; documented tradeoff.
- Assets are `BASE_PATH`-aware — reference public files as `` `${BASE_PATH}/…` `` (client) / `assetUrl()` (server), never a bare `/…`, or they 404 under the preview.
- i18n is RO-first; add new keys to all of `ro/en/ru`.

## 9. Quick runbooks
- **Roll back a bad deploy:** `git revert <sha>` (or check out the last good commit) → rebuild → rsync.
- **Restart / check the quote API:** `systemctl restart vlx-quote` · `systemctl status vlx-quote` · `journalctl -u vlx-quote`.
- **Renew TLS manually (normally automatic):** `certbot renew` · dry-run `certbot renew --dry-run`.
- **Add an operator's SSH access:** append their public key to `/root/.ssh/authorized_keys` on the server.
