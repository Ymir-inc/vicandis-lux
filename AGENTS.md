# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this is

Marketing website for **VicandisLux** — conference AV & simultaneous-interpretation
rental (Chișinău, Moldova). Single-page, trilingual (RO / RU / EN).

## Stack

- **Next.js 16** (App Router) exported as a **static site** (`output: 'export'`).
- **React 19 + TypeScript**, plain CSS (`app/globals.css`, design tokens as CSS
  variables). No Tailwind, no CSS-in-JS runtime.
- `next/font/google`, self-hosted at build, subset per locale.
- Deployed as static files (GitHub Pages preview via `deploy-preview.sh`;
  production intended for a headers-capable host — see `public/_headers`).

## Commands

```bash
npm run dev         # local dev
npm run build       # production build (static export to ./out)
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
./deploy-preview.sh "msg"   # build + publish throwaway GitHub Pages preview
```

Always run `npm run build` before committing UI changes — it also runs the type check.

## Layout

- `app/[locale]/` — localized routes (`layout.tsx` = metadata/JSON-LD/fonts, `page.tsx` = section composition).
- `components/` — one component per page section (Hero, Services, Catalog, Configurator, Pricing, CaseStudies, Contact, SiteHeader/Footer, …).
- `i18n/` — `site.ts` (URLs + `ORG` identity + `BASE_PATH`/env flags), `getMessages.ts` (`Messages` type derives from `messages/ro.json`), `messages/{ro,en,ru}.json`.
- `public/` — static assets: `brand/`, `projects/`, `icons/`, `_headers`, `.well-known/`.
- `tasks/OWNER-TODO.md` — open questions/decisions for the site owner. Keep it current.

## Conventions that matter

- **Assets must be `BASE_PATH`-aware.** Reference public files as `` `${BASE_PATH}/…` `` (client) or `assetUrl('/…')` (server), never a bare `/…`, or they 404 under the preview sub-path.
- **i18n is Romanian-first.** `ro.json` is the source of truth; `en.json`/`ru.json` must keep the same key structure (arrays fall back whole). Add new keys to all three.
- **Real company data (NAP) is gated** behind `NEXT_PUBLIC_ORG_VERIFIED`; never publish placeholder business facts as structured data.
- **The preview build (`NEXT_PUBLIC_PREVIEW=1`) is `noindex` + `Disallow: /`.** Never let it get indexed.
- Content must be server-rendered (static export) — verify it's present with JS disabled.

## Environment flags

- `NEXT_PUBLIC_SITE_URL` — production origin (defaults to `https://vicandislux.md`, unconfirmed).
- `NEXT_PUBLIC_BASE_PATH` — sub-path for the preview only.
- `NEXT_PUBLIC_PREVIEW` — `1` on the throwaway preview.
- `NEXT_PUBLIC_ORG_VERIFIED` — `1` to publish real NAP in JSON-LD.
- `NEXT_PUBLIC_FORM_ENDPOINT` — optional; if set, the configurator POSTs quote requests there, else falls back to `mailto:` the office.
