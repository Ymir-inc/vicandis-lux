# Learnings

Bugs found, lessons learned, gotchas, and tracked tech debt.

---

## [2026-08-18] Dead code kept in-tree pending owner ratification
`components/ProductDetail.tsx` and `lib/estimate.ts` are unmounted/unused but intentionally retained
so the removed Product Detail page and price estimate can be restored quickly. Do NOT delete until
owner ratifies OWNER-TODO #7/#8. Tracked as tech debt.

## [2026-08-18] Palette not fully tokenized — ~13 literal color constants in JS
Most components use `var(--accent)` (~61 usages) but ~13 hardcoded color literals live in
per-component JS. A palette change requires editing those by hand, not just `app/globals.css`.

## [2026-08-18] Brand PNGs were oversized (logo ~320KB, etc.)
An asset-optimization pass is/was in progress; `.webp` siblings now exist in `public/brand/`. If a
component still points at a `.png`, prefer wiring the `.webp` where supported.

## [2026-08-18] Open owner items (see tasks/OWNER-TODO.md)
Still blocking/pending: #1 production domain, #2 real phone (unblocks NAP structured-data gate
`NEXT_PUBLIC_ORG_VERIFIED`), #5 real social URLs, #7-9 ratify structural removals. The env flag
`NEXT_PUBLIC_ORG_VERIFIED` gates emitting NAP/Organization structured data until a real phone exists.
