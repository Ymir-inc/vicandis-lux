#!/usr/bin/env bash
# Build and install vicandislux.md on a MAIESTRU API box (maiestru-prod-1).
#
# Runs ON the server, as root, from the clone at /srv/vicandis-lux:
#     cd /srv/vicandis-lux && git pull && ./deploy.sh
#
# Idempotent: re-running with the same commit reuses the built release and
# only reloads what changed. See deploy/maiestru/README.md for rollback,
# secrets and cutover.
set -euo pipefail

PROJECT=vicandis-lux
DOMAIN=vicandislux.md
SITE_URL="https://$DOMAIN"
QUOTE_PORT=8180
KEEP_RELEASES=5

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WWW_DIR="/var/www/$PROJECT"
RELEASES_DIR="$WWW_DIR/releases"
QUOTE_DIR="/opt/$PROJECT/quote"
ENV_DIR="/etc/$PROJECT"
QUOTE_ENV="$ENV_DIR/quote.env"
UNIT_NAME="$PROJECT-quote.service"
UNIT_SRC="$REPO_DIR/deploy/maiestru/$UNIT_NAME"
UNIT_DST="/etc/systemd/system/$UNIT_NAME"
CADDY_SRC="$REPO_DIR/deploy/maiestru/site.caddy"
CADDY_SITES=/etc/caddy/sites
CADDY_DST="$CADDY_SITES/$PROJECT.caddy"
CADDYFILE=/etc/caddy/Caddyfile

log() { printf '[deploy %s] %s\n' "$PROJECT" "$*"; }
die() { printf '[deploy %s] ERROR: %s\n' "$PROJECT" "$*" >&2; exit 1; }

http_code() { curl -s -o /dev/null -m 10 -w '%{http_code}' "$@" || true; }

maiestru_health() { http_code http://127.0.0.1/health; }

# ── Preflight ────────────────────────────────────────────────────────────────
[[ $EUID -eq 0 ]] || die "run as root"
cd "$REPO_DIR"
command -v node >/dev/null || die "node not found"
node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>20||(a===20&&b>=9)?0:1)' \
  || die "Next.js 16 needs Node >= 20.9 (found $(node -v))"
command -v caddy >/dev/null || die "caddy not found"
command -v rsync >/dev/null || die "rsync not found"
[[ -f $QUOTE_ENV ]] || die "$QUOTE_ENV missing (copy it first, mode 600; see deploy/maiestru/README.md)"
[[ $(stat -c '%a' "$QUOTE_ENV") == 600 ]] || die "$QUOTE_ENV must be mode 600"
[[ -z $(git status --porcelain --untracked-files=no) ]] \
  || die "tracked files modified in $REPO_DIR; the release name must match the commit"

SHA=$(git rev-parse --short=12 HEAD)
RELEASE="$RELEASES_DIR/$SHA"
log "commit $SHA ($(git rev-parse --abbrev-ref HEAD))"

before=$(maiestru_health)
[[ $before == 200 ]] || die "MAIESTRU /health is $before before deploying; not touching anything"

# ── 1. Static site → releases/<sha>, atomic `current` symlink ────────────────
mkdir -p "$RELEASES_DIR"
if [[ -f $RELEASE/.complete ]]; then
  log "release $SHA already built, reusing it"
else
  log "building (npm ci --ignore-scripts && next build)"
  # --ignore-scripts: dependency install scripts never run as root. The build
  # needs none (checked on 2026-11-02).
  npm ci --ignore-scripts --no-audit --no-fund
  NEXT_PUBLIC_SITE_URL="$SITE_URL" npx --no-install next build
  [[ -f out/index.html && -f out/404.html && -f out/ro/index.html ]] || die "build output incomplete"

  tmp="$RELEASES_DIR/.tmp-$SHA"
  rm -rf "$tmp"
  rsync -a --delete --chmod=D755,F644 out/ "$tmp/"
  touch "$tmp/.complete"
  rm -rf "$RELEASE"
  mv "$tmp" "$RELEASE"
fi

ln -sfn "releases/$SHA" "$WWW_DIR/.current-new"
mv -Tf "$WWW_DIR/.current-new" "$WWW_DIR/current"
log "current -> releases/$SHA"

# Keep the newest $KEEP_RELEASES (by mtime), never the one that is live.
live=$(readlink -f "$WWW_DIR/current")
mapfile -t old < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d ! -name '.tmp-*' -printf '%T@ %p\n' \
  | sort -rn | awk -v keep="$KEEP_RELEASES" 'NR>keep {print $2}')
for dir in "${old[@]}"; do
  [[ $(readlink -f "$dir") == "$live" ]] && continue
  log "pruning old release $(basename "$dir")"
  rm -rf -- "$dir"
done

# ── 2. Quote endpoint (systemd) ──────────────────────────────────────────────
restart_quote=0
install -d -m 755 "$QUOTE_DIR"
if ! cmp -s server/quote.mjs "$QUOTE_DIR/quote.mjs"; then
  install -m 644 server/quote.mjs "$QUOTE_DIR/quote.mjs"
  restart_quote=1
fi
if ! cmp -s "$UNIT_SRC" "$UNIT_DST"; then
  install -m 644 "$UNIT_SRC" "$UNIT_DST"
  systemctl daemon-reload
  restart_quote=1
fi
if ! systemctl is-active --quiet "$UNIT_NAME"; then
  # Refuse to start on a port something else already holds.
  if [[ -n $(ss -tlnH "sport = :$QUOTE_PORT") ]]; then
    die "port $QUOTE_PORT is in use by another process: $(ss -tlnpH "sport = :$QUOTE_PORT")"
  fi
  restart_quote=1
fi
systemctl enable --quiet "$UNIT_NAME"
if (( restart_quote )); then
  log "restarting $UNIT_NAME"
  systemctl restart "$UNIT_NAME"
fi
quote_listening() { ss -tlnH "sport = :$QUOTE_PORT" | grep -q "127.0.0.1:$QUOTE_PORT"; }
for _ in $(seq 1 20); do
  quote_listening && break
  sleep 0.5
done
quote_listening || die "$UNIT_NAME is not listening on 127.0.0.1:$QUOTE_PORT (journalctl -u $UNIT_NAME)"

# ── 3. Caddy site (shared Caddy: lock, validate, roll back on any failure) ───
install -d -m 755 "$CADDY_SITES"
exec 9>"$CADDY_SITES/.lock"
flock -w 120 9 || die "could not lock $CADDY_SITES/.lock"

backup=""
if [[ -f $CADDY_DST ]]; then
  backup=$(mktemp)
  cp -p "$CADDY_DST" "$backup"
fi
restore_caddy() {
  log "restoring the previous $CADDY_DST"
  if [[ -n $backup ]]; then cp -p "$backup" "$CADDY_DST"; else rm -f "$CADDY_DST"; fi
}

if [[ -n $backup ]] && cmp -s "$CADDY_SRC" "$CADDY_DST"; then
  log "Caddy site unchanged, no reload"
else
  install -m 644 "$CADDY_SRC" "$CADDY_DST"
  vlog=$(mktemp)
  if ! caddy validate --config "$CADDYFILE" --adapter caddyfile >"$vlog" 2>&1; then
    tail -n 20 "$vlog" >&2
    rm -f "$vlog"
    restore_caddy
    die "caddy validate failed; previous site file restored, Caddy not reloaded"
  fi
  if ! systemctl reload caddy; then
    restore_caddy
    systemctl reload caddy || true
    die "caddy reload failed; previous site file restored"
  fi
  rm -f "$vlog"
  log "Caddy reloaded"
  sleep 1
fi

after=$(maiestru_health)
if [[ $after != 200 ]]; then
  restore_caddy
  systemctl reload caddy || true
  die "MAIESTRU /health is $after after the Caddy change; previous site file restored and reloaded"
fi
[[ -n $backup ]] && rm -f "$backup"
flock -u 9

# ── 4. Smoke test this site through the local Caddy ──────────────────────────
check() { # expected-code host path
  local want=$1 host=$2 path=$3 got
  got=$(http_code -H "Host: $host" "http://127.0.0.1$path")
  [[ $got == "$want" ]] || die "smoke: $host$path returned $got, expected $want"
  log "smoke: $host$path $got"
}
check 200 "$DOMAIN" /
check 200 "$DOMAIN" /ro/
check 404 "$DOMAIN" /definitely-not-a-page
check 301 "$DOMAIN" /Home.html
check 301 "www.$DOMAIN" /
# quote.mjs answers 404 JSON to a GET: proves Caddy reaches it, sends nothing.
api=$(curl -s -m 10 -H "Host: $DOMAIN" "http://127.0.0.1/api/quote" || true)
[[ $api == '{"error":"not found"}' ]] || die "smoke: /api/quote GET returned '$api'"
log "smoke: /api/quote reaches $UNIT_NAME"

log "done: $SHA live on this box (MAIESTRU /health $after)"
