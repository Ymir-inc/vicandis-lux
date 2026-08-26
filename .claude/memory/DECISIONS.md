# Decisions

Architectural and product decisions with rationale and date. Newest first.

---

## [2026-08-18] VicandisLux rebrand — brass/gold palette replaces lime green
Decision: Accent color moved from lime green `#C6FF3A` to brass/gold `#D6A94B`. Text tokens
warmed across the board: text `#EDEBE4`→`#F7F5F0`, soft `#C9C6BC`→`#CFCBC2`, muted
`#8C897E`→`#8E8A80`, faint `#54524A`→`#57544C`, brass `#B99364`→`#8A6A34`.
Rationale: New design handoff ("# VicandisLux Design System/VicandisLux Site.dc.html") shifted the
brand from a tech/lime identity to a warmer premium brass/gold identity.
Affected: Tokens are CSS variables in `app/globals.css` (verified lines 41-48). Components mostly
consume `var(--accent)` (~61 usages) but ~13 literal color constants remain in per-component JS —
those must be updated by hand when the palette changes again.
Alternatives considered: n/a (design-handoff-driven).
Revisit if: palette changes again — audit the ~13 JS literal constants, not just globals.css.

## [2026-08-18] Logo system — image marks replace text wordmark
Decision: Text wordmark replaced by image assets. `/brand/vicandislux-mark.png` in header + mobile
nav; `/brand/vicandislux-logo.png` in footer. Assets in `public/brand/`.
Rationale: Design handoff supplied real brand marks.
Affected: `public/brand/` (mark, logo, word PNGs; hero jpg). Optimized `.webp` siblings now also
present from the in-progress asset-optimization pass.
Revisit if: a `.svg` vector mark becomes available (PNGs are raster and were oversized).

## [2026-08-18] Hero — real conference photo replaces placeholder stripe
Decision: Placeholder "stripe" element replaced by real photo `/brand/hero-conferinta.jpg` (a
medical-congress conference system) with veil gradient overlays for text legibility.
Rationale: Real product photography from handoff.
Affected: Hero component, `public/brand/hero-conferinta.jpg` (+ `.webp`).

## [2026-08-18] Structural removals — dossier slimmed, product-detail page unmounted
Decision: (1) The "Pentru licitații" public-procurement dossier section was reduced to a slim
"Referințe" section; anchor `#licitatii` → `#referinte`. (2) The standalone Product Detail page
(`#produs`) was removed and unmounted from `app/[locale]/page.tsx`.
Rationale: Handoff restructured the single-page site; owner wanted a lighter references section
rather than a full procurement dossier.
Affected: `app/[locale]/page.tsx` (unmount), `components/ProductDetail.tsx` and `lib/estimate.ts`
kept in-tree as dead code (restorable) — tracked as tech debt in LEARNINGS.md.
Status: OWNER RATIFICATION PENDING — tasks/OWNER-TODO.md #7 and #8. Do not delete the dead-code
files until the owner ratifies removal.
Revisit if: owner rejects the removal (restore the unmount) or ratifies it (then delete dead code).

## [2026-08-18] Commercial data — EUR→MDL, real company facts
Decision: Pricing switched EUR → MDL (packages 3000 / 4000 / 7000 MDL; rate card is a single MDL
column). Configurator no longer shows a price estimate (the "Sumar configurație" block was removed).
Real company data applied: founding year 2018→2007, events 500+→1000+, translation channels 32→8,
contact email office@→director@vicandislux.md, address → str. Milescu Spătaru 7/1 Chișinău, IDNO
1003600168698 now public.
Rationale: Real Moldovan-market data supplied by owner; site sells in MDL, not EUR. Estimate hidden
because per-config pricing is quote-based, not fixed.
Affected: pricing/rate-card components, Configurator (estimate removed), Contact/footer NAP data.
`lib/estimate.ts` now unused (dead code — see LEARNINGS.md).
Revisit if: pricing model changes back to fixed per-config (re-enable estimate).
