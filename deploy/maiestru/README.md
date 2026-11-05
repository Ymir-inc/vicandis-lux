# VicandisLux on the MAIESTRU servers

vicandislux.md is served by **maiestru-prod-1** (10.0.0.3) behind the shared
load balancer **maiestru-lb** (178.104.32.40), which terminates TLS.

```
browser ──HTTPS──> maiestru-lb Caddy (lb.caddy: TLS, HSTS, gzip/zstd)
                      └─HTTP :80, Host kept──> maiestru-prod-1 Caddy (site.caddy)
                                                 ├─ /api/*  → 127.0.0.1:8180  vicandis-lux-quote.service (server/quote.mjs)
                                                 └─ else    → /var/www/vicandis-lux/current  (static export)
```

The same boxes run the live MAIESTRU product. Never touch `/opt/maiestru`, the
`maiestru-*` services, port 8000, the `:80` block of `/etc/caddy/Caddyfile`,
or ufw. `deploy.sh` checks `http://127.0.0.1/health` (MAIESTRU) before and
after it changes Caddy and rolls its own change back if that isn't 200.

## Files

| In the repo | On the box |
|---|---|
| `deploy.sh` | run from `/srv/vicandis-lux` |
| `deploy/maiestru/site.caddy` | `/etc/caddy/sites/vicandis-lux.caddy` (imported by `/etc/caddy/Caddyfile`) |
| `deploy/maiestru/vicandis-lux-quote.service` | `/etc/systemd/system/vicandis-lux-quote.service` |
| `server/quote.mjs` | `/opt/vicandis-lux/quote/quote.mjs` |
| static export (`out/`) | `/var/www/vicandis-lux/releases/<sha>`, `current` → the live one, last 5 kept |
| `deploy/maiestru/env.example` (names only) | `/etc/vicandis-lux/quote.env` (secrets, root, mode 600) |
| `deploy/maiestru/lb.caddy` | maiestru-lb: `/etc/caddy/sites-staged/vicandis-lux.caddy` until cutover |

Port range reserved for this project on the box: `127.0.0.1:8180-8189`
(8180 = quote endpoint).

## Deploy

```bash
ssh maiestru-prod-1
cd /srv/vicandis-lux && git pull && ./deploy.sh
```

`deploy.sh` (root, idempotent):

1. refuses to run if tracked files are modified, if `quote.env` is missing or
   not mode 600, or if MAIESTRU `/health` isn't 200;
2. `npm ci --ignore-scripts`, then `NEXT_PUBLIC_SITE_URL=https://vicandislux.md next build`,
   copies `out/` to `releases/<sha>` and flips `current` atomically
   (a commit that is already built is reused);
3. installs `quote.mjs` and the unit, restarts the service only if either changed;
4. installs `site.caddy` under `flock /etc/caddy/sites/.lock`, runs
   `caddy validate`, reloads Caddy; on any failure (validate, reload, or
   MAIESTRU `/health` afterwards) it restores the previous file and exits non-zero;
5. smoke-tests `/`, `/ro/`, a 404, a legacy redirect, www → apex and
   `/api/quote` (a GET, which the endpoint answers with 404 JSON; no email).

First install on a fresh box:

```bash
# public repo: plain https, no deploy key. Use -b deploy/maiestru until that PR is merged,
# then: git -C /srv/vicandis-lux checkout main && git -C /srv/vicandis-lux pull
git clone -b main https://github.com/Ymir-inc/vicandis-lux.git /srv/vicandis-lux
install -d -m 700 /etc/vicandis-lux
# copy the secrets from the old host without printing them (run from a machine with both SSH keys):
ssh root@2.28.45.53 'cat /etc/vlx-quote.env' | sed 's/^PORT=.*/PORT=8180/' \
  | ssh maiestru-prod-1 'install -m 600 /dev/stdin /etc/vicandis-lux/quote.env'
cd /srv/vicandis-lux && ./deploy.sh
```

## Rollback

Static site, to any of the kept releases (instant, no rebuild):

```bash
ls -t /var/www/vicandis-lux/releases/
ln -sfn releases/<sha> /var/www/vicandis-lux/.current-new && mv -Tf /var/www/vicandis-lux/.current-new /var/www/vicandis-lux/current
```

Everything (site, quote endpoint, Caddy file) to an earlier commit:

```bash
cd /srv/vicandis-lux && git checkout <sha> && ./deploy.sh
# back to normal later: git checkout main && git pull && ./deploy.sh
```

Remove the site from the box entirely:

```bash
rm /etc/caddy/sites/vicandis-lux.caddy && caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1/health   # must be 200
systemctl disable --now vicandis-lux-quote
```

## Secrets

`/etc/vicandis-lux/quote.env` holds `RESEND_API_KEY`, `QUOTE_TO` and
`QUOTE_FROM` (key names in `env.example`). Root-owned, mode 600, read by
systemd before it drops to the service's throwaway user. The repo is public:
never commit values. Show what is set without values:

```bash
sed 's/=.*/=<set>/' /etc/vicandis-lux/quote.env
```

`PORT` is pinned in the unit (8180), so a stale `PORT=` line in the env file is harmless.

Logs: `journalctl -u vicandis-lux-quote`. The endpoint never logs submissions
or the key.

## Cutover (owner's go required)

DNS is on Hetzner DNS (`hydrogen.ns.hetzner.com`, `oxygen.ns.hetzner.com`,
`helium.ns.hetzner.de`). Current records: `vicandislux.md` and
`www.vicandislux.md` are `A 2.28.45.53`, TTL 300, no AAAA. MX (Zoho) is not
touched.

1. Re-check the origin from maiestru-lb:
   `curl -sS -o /dev/null -w '%{http_code}\n' -H 'Host: vicandislux.md' http://10.0.0.3/ro/` → 200.
2. Lower risk first: confirm the TTL is 300 (it is today).
3. In Hetzner DNS, change both records to the LB:
   - `vicandislux.md  A  178.104.32.40`
   - `www.vicandislux.md  A  178.104.32.40`
   (no AAAA exists, so none to remove)
4. On maiestru-lb, once `dig +short vicandislux.md @1.1.1.1` returns 178.104.32.40:
   ```bash
   cp /etc/caddy/Caddyfile /root/Caddyfile.before-vicandis-lux
   # load the staged block (either move it into the directory the LB already imports,
   # or add one line:  import /etc/caddy/sites-staged/vicandis-lux.caddy)
   caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy
   curl -s -o /dev/null -w '%{http_code}\n' https://maiestru.com/health   # must stay 200
   ```
   Caddy then gets Let's Encrypt certificates for both names (watch
   `journalctl -u caddy -f`).
5. Verify from outside: `https://vicandislux.md/ro/` 200 with HSTS and CSP,
   `https://www.vicandislux.md/Home.html` → 301 `https://vicandislux.md/ro/`,
   `http://vicandislux.md/` → 308 to https, `POST /api/quote` with `{}` → 400.
   Do not submit the real quote form: it emails the client.
6. Keep the old host running, untouched, for at least a week, then retire it.

Rollback during cutover: set both A records back to `2.28.45.53` (the old
host still serves with its own certificate), then remove the import on the LB
and reload Caddy there.
