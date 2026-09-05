# VicandisLux

Marketing site for **VicandisLux** (Chișinău) — rental of simultaneous-interpretation and
professional sound/AV equipment. Trilingual (RO source · RU · EN).

Live: **https://vicandislux.md**

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · **static export** (`output: 'export'`).

The site itself is fully static (`npm run build` → `out/`). The one dynamic piece is a tiny,
self-hosted **quote endpoint** (`server/quote.mjs`) that runs on the production server behind
nginx and emails each configurator submission via Resend — it is not part of the Next build.

## Commands

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:3000            |
| `npm run build`     | Production build → static export in `out/`     |
| `npm run typecheck` | `tsc --noEmit`                                 |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`)     |
| `./deploy-preview.sh` | Build + publish the throwaway GitHub Pages preview (noindex) |

## Deployment

**DNS** is on **Hetzner DNS** (nameservers `hydrogen`/`oxygen.ns.hetzner.com`, `helium.ns.hetzner.de`).
`vicandislux.md` + `www` → the production server.

**Production host:** an Ubuntu server (`2.28.45.53`) running **nginx**, serving the static export from
`/var/www/vicandislux/html`, with **Let's Encrypt** TLS (certbot `--nginx`, auto-renewing via
`certbot.timer`), HTTP→HTTPS redirect, HSTS, and a CSP + security-header set. nginx also proxies
`/api/` to the quote service.

**Deploy the site** (static files):

```bash
NEXT_PUBLIC_SITE_URL=https://vicandislux.md npm run build
rsync -az --delete out/ root@2.28.45.53:/var/www/vicandislux/html/
```

**Quote endpoint** (`server/quote.mjs`): deployed to `/opt/vlx-quote/quote.mjs`, run by the
`vlx-quote` systemd service on `127.0.0.1:8081`, configured via `/etc/vlx-quote.env`:

```
RESEND_API_KEY=re_...
QUOTE_TO=inbox@example.com          # comma-separated for multiple recipients
QUOTE_FROM="VicandisLux <quote@vicandislux.md>"
PORT=8081
```

Update it with `rsync server/quote.mjs …:/opt/vlx-quote/ && systemctl restart vlx-quote`.
The sending domain `vicandislux.md` is verified in Resend (EU region).

### Environment variables (build)

| Var | Effect |
| --- | ------ |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin baked into canonical/OG/sitemap/JSON-LD. Prod: `https://vicandislux.md`. |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for the GitHub Pages preview only. |
| `NEXT_PUBLIC_PREVIEW` | `1` on the preview → `noindex` + `robots: Disallow: /`, no sitemap. |
| `NEXT_PUBLIC_ORG_VERIFIED` | `1` to publish real NAP (address/phone) in JSON-LD. Currently **off**. |

## Layout

```
app/
  layout.tsx            pass-through; <html>/<body> live in [locale] so lang follows the route
  not-found.tsx         designed 404 (returns 404), own document shell
  globals.css           design tokens (brass palette) + the design's component classes
  robots.ts sitemap.ts manifest.ts   build-time metadata routes (env-aware)
  llms.txt/route.ts     llms.txt
  [locale]/
    layout.tsx          <html lang>, next/font, metadata + hreflang, LCP hero preload
    page.tsx            composes the page sections
    privacy|terms|cookies/page.tsx   legal pages (shared LegalPage component)
components/             one component per section; 'use client' only where there is state
i18n/
  config.ts             locales, hreflang tags, number-format locales
  getMessages.ts        loads a catalogue and fills gaps from Romanian
  legal.ts              legal-page copy (ro/ru/en) — DRAFT, pending review
  site.ts               absolute-URL helpers + ORG identity + env flags
  messages/{ro,ru,en}.json
lib/
  waveform.ts           deterministic hero waveform generator
  estimate.ts           configurator answer types (the price-range calc is no longer surfaced)
server/
  quote.mjs             the /api/quote email service (runs on the host, not in the build)
public/
  index.html            `/` → `/ro/` redirect (static export has no root route)
  brand/ equipment/ projects/   real photography (WebP logos, JPEG event photos)
  _headers .well-known/security.txt   headers file (nginx is authoritative) + security.txt
```

### Fonts

Self-hosted via `next/font/google`, selected per script in `app/[locale]/layout.tsx`:

| Role    | Latin (ro, en)        | Cyrillic (ru)              |
| ------- | --------------------- | -------------------------- |
| Display | Space Grotesk         | Manrope                    |
| Body    | IBM Plex Sans (latin) | IBM Plex Sans (+ cyrillic) |
| Mono    | IBM Plex Mono (latin) | IBM Plex Mono (+ cyrillic) |

**Space Grotesk has no Cyrillic glyphs**, so Russian headings use Manrope (closest geometric
grotesque on Google Fonts with Cyrillic). Both variants write the same CSS variables and only one
class lands on `<html>`. `preload: false` throughout, so each locale downloads only the subset it
renders.

> The language switcher does a **full navigation** (plain `<a>`, not `next/link`) on purpose: a
> client-side locale switch would keep the previous locale's `<html>` font-class/`lang`, leaving
> Russian rendered in a Latin fallback.

### Internationalisation

Romanian is the source language; `getMessages()` deep-merges a locale over `ro.json`, so a missing
key renders in Romanian rather than breaking (arrays are taken whole, never spliced).

**Do not translate** values under `key`, `field`, `categoryKey`, `id`, `href`, `variant`, `type`, or
the boolean flags — they drive logic. Left untranslated by intent: brand/manufacturer/model names,
standards (ISO 4043), and legal identifiers (legal entity, IDNO).

## The equipment showcase & configurator

- **Echipamente** is a photo showcase (6 system categories, real photos in `public/equipment/`) —
  no search/filters/cart; the old catalog behaviour was removed.
- **Proiecte recente** is a photo carousel (`public/projects/`, keyboard + swipe + srcset).
- **Configurator** collects the configuration + contact details and POSTs to `/api/quote`; the
  server emails the office via Resend (branded HTML + text). A `mailto:` fallback is kept.

## Status / open items

Resolved this cycle: real photography, real company data (IDNO `1003600168698`, phone
`+373 69 337 792`, address str. Milescu Spătaru 7/1), MDL pricing, working quote email, production
deploy with HTTPS. See `tasks/OWNER-TODO.md` for the live decision log.

Still open:

- **`director@vicandislux.md` cannot receive mail yet** — the domain has no inbound MX/mailbox
  (email hosting is a pending decision). Resend only *sends*.
- **Legal pages are DRAFT** (`i18n/legal.ts`, stamped "DOCUMENT ÎN LUCRU") — need review before
  relying on them.
- **Social links are `#` placeholders**; JSON-LD `sameAs` is empty.
- **`ORG_VERIFIED` is off**, so structured data omits address/phone; not upgraded to `LocalBusiness`.
- **No analytics / search-console** installed (deliberate — zero third-party origins, so no cookie
  banner is required).
- Audit polish outstanding: enable HTTP/2, `www`→apex 301, tighten `<title>`/meta-description
  lengths. See the compliance audit / `tasks/`.

The RU/EN copy is a translation, not certified — have a native reviewer check the legal pages.
