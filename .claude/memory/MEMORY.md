# Project Memory — VicandisLux

Index of the persistent knowledge base. One line per entry. See linked files for detail.

## Decisions ([DECISIONS.md](DECISIONS.md))
- [2026-08-18] Rebrand palette: lime `#C6FF3A` → brass/gold `#D6A94B`; text tokens warmed (globals.css 41-48).
- [2026-08-18] Logo system: text wordmark → image marks in `public/brand/` (mark=header/nav, logo=footer).
- [2026-08-18] Hero: placeholder stripe → real `/brand/hero-conferinta.jpg` with veil overlays.
- [2026-08-18] Structural removals: `#licitatii`→`#referinte` (slimmed), `#produs` page unmounted — OWNER RATIFY PENDING.
- [2026-08-18] Commercial data: EUR→MDL, estimate removed, real company facts (2007, 1000+ events, IDNO).

## Context ([CONTEXT.md](CONTEXT.md))
- Company identity, market (MDL), site shape/anchors, rebrand delivery notes.

## Learnings / tech debt ([LEARNINGS.md](LEARNINGS.md))
- Dead code retained pending ratification (ProductDetail.tsx, lib/estimate.ts).
- ~13 literal color constants in JS not tokenized; oversized brand PNGs (webp pass in progress).
- Open owner items + `NEXT_PUBLIC_ORG_VERIFIED` NAP gate.
