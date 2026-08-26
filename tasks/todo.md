# TODO — Apply new "VicandisLux Site" design handoff

Source: `# VicandisLux Design System/VicandisLux Site.dc.html` (new handoff, 2026-08-18).
Diffed against the previously-implemented `vicandislux-design-system/project/` version.
Nature: rebrand (color/logo) + real company data + structural section changes. All frontend.

## Task A — Brand rebrand (@frontend-design)
Owns: `app/globals.css`, `components/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileContactBar.tsx`, `components/icons.tsx`, `public/brand/*`
- [ ] Accent `#C6FF3A` → `#D6A94B` (globals.css tokens + hardcoded hex in owned files)
- [ ] Text tokens: `--text #EDEBE4→#F7F5F0`, `--soft #C9C6BC→#CFCBC2`, `--muted #8C897E→#8E8A80`, `--faint #54524A→#57544C`, `--brass #B99364→#8A6A34`
- [ ] Header/mobile brand: text wordmark → `/brand/vicandislux-mark.png`
- [ ] Footer brand: text wordmark → `/brand/vicandislux-logo.png`

## Task B — Content & i18n data (@frontend-design)
Owns: `i18n/site.ts`, `i18n/messages/{ro,en,ru}.json`, `app/llms.txt/route.ts`
- [ ] Founding 2018 → 2007; events 500+ → 1000+; channels 32 → 8; FAQ "up to 32" → "up to 16"
- [ ] Currency EUR → MDL; package prices 350/900/2400 → 3000/4000/7000; rate-card values (single MDL column)
- [ ] Contact email `office@` → `director@vicandislux.md`; address → str. Milescu Spătaru 7/1, Chișinău; IDNO 1003600168698
- [ ] Nav label "Pentru licitații" → "Referințe" (href `#referinte`); footer socials → Facebook/Instagram/Viber
- [ ] Process step 04 → "Asistență pe durata evenimentului"; translate new copy to EN + RU

## Task C — Hero + Stats (@frontend-design)
Owns: `components/Hero.tsx`, `components/Stats.tsx`
- [ ] Placeholder stripe → `/brand/hero-conferinta.jpg` photo + veil gradient overlays
- [ ] Hero/stat numbers: 8 canale, ISO 4043, din 2007

## Task D — Structural body (@frontend-design)
Owns: `components/Tenders.tsx`, `Catalog.tsx`, `Configurator.tsx`, `ProductDetail.tsx`, `Pricing.tsx`, `app/[locale]/page.tsx`
- [ ] "Pentru licitații" → slim "Referințe" (`#referinte`); drop id/IBAN table, doc downloads, assurances
- [ ] Remove Product Detail section (`#produs`); unmount from page.tsx; Catalog "Detalii" → `#configurator`
- [ ] Catalog: remove manufacturer + transmission filter groups
- [ ] Configurator: hide price estimate → "Sumar configurație"
- [ ] Pricing rate-card: 4-col (De la / Uzual) → 3-col (Tarif / zi MDL)

## Verification
- [ ] `npm run build` clean
- [ ] 5-agent parallel review over diff
- [ ] @memory-manager records rebrand + structural decisions

## Review (5-agent, 2026-08-18) — build clean, no blockers
- Tokens centralized: 61 var(--accent) vs 13 literal #D6A94B (component constants). OK.
- No stale rendered hex; i18n parity ro884/en885/ru885 (+_comment only); no #produs/#licitatii refs.
- [Perf-M] Brand PNGs oversized: logo 320K/mark 220K/word 128K shown ≤76px → resize+WebP.
- [Perf-L] Hero uses CSS background-image → no lazy/responsive, LCP cost.
- [Read-L] Tenders.tsx renders "Referințe" (#referinte) — filename/label mismatch; rename or comment.
- Dead code kept intentionally: ProductDetail.tsx + lib/estimate.ts (owner ratify #8).

## Remaining
- [ ] @memory-manager: record brass rebrand tokens, #licitatii→#referinte, ProductDetail removal, EUR→MDL.
- [ ] Optimize brand PNGs (resize/WebP) — biggest user-facing win.
- [ ] Owner ratify OWNER-TODO #7–9; provide real phone to unblock #2 NAP gate.
