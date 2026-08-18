# Context

Project background, business logic, domain knowledge.

---

## Company identity (as of 2026-08-18 rebrand)
- **VicandisLux** — Moldovan company; rents/sells conference & simultaneous-translation systems,
  primarily for medical congresses and similar events.
- Founded **2007**. Track record framed as **1000+ events** served, **8 translation channels**.
- Registered address: **str. Milescu Spătaru 7/1, Chișinău**. **IDNO 1003600168698** (public).
- Primary contact email: **director@vicandislux.md** (was office@).
- Market/currency: **MDL** (Moldovan leu), not EUR. Packages priced 3000 / 4000 / 7000 MDL.

## Site shape
- Single-page marketing site, Next.js App Router, i18n via `app/[locale]/`.
- Section anchors are load-bearing for nav/deep-links. Post-rebrand: `#licitatii`→`#referinte`;
  `#produs` (product detail) removed. See DECISIONS.md.

## Rebrand delivery (2026-08-18)
- Applied from design handoff "# VicandisLux Design System/VicandisLux Site.dc.html" onto the
  already-implemented site. Scope: rebrand + real-data + structural change.
- Implemented by 4 parallel frontend agents, reviewed by 5 review agents, build-clean.
