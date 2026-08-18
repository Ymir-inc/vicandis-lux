# VicandisLux

Marketing site for VicandisLux (Chișinău) — rental of simultaneous-interpretation and
professional sound equipment.

Implemented from the Claude Design handoff bundle in
[`vicandislux-design-system/`](vicandislux-design-system/), specifically
`project/VicandisLux Site.dc.html`. That bundle is reference material, not build input —
it is excluded from TypeScript, ESLint and the bundler.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · static export.

There is no server runtime and no API routes. `npm run build` emits a deployable `out/`.

## Commands

| Command             | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:3000            |
| `npm run build`     | Production build → static export in `out/`     |
| `npm run typecheck` | `tsc --noEmit`                                 |
| `npm run lint`      | ESLint (flat config, `eslint-config-next`)     |

## Layout

```
app/
  layout.tsx            pass-through; <html>/<body> live in [locale] so lang follows the route
  not-found.tsx         404, renders its own document shell
  globals.css           design tokens + the design's component classes, ported verbatim
  [locale]/
    layout.tsx          <html lang>, next/font, metadata + hreflang alternates
    page.tsx            composes the fourteen sections
components/             one component per section; `'use client'` only where there is state
i18n/
  config.ts             locales, hreflang tags, number-format locales
  getMessages.ts        loads a catalogue and fills gaps from Romanian
  messages/{ro,ru,en}.json
lib/
  estimate.ts           configurator price weights + range calculation
  waveform.ts           deterministic hero waveform generator
public/index.html       `/` → `/ro/` (static export has no redirect support)
```

### Styling

Design tokens live in `@theme` (so Tailwind utilities such as `text-accent` and
`border-line` resolve to them) and are mirrored as the short `--d` / `--b` / `--m`
aliases the ported CSS uses. The design's authored classes (`.btn`, `.card`, `.cfg`, …)
were carried over as written, because they are what makes the layout pixel-accurate;
Tailwind utilities are available for anything new.

`.container` was renamed `.container-vl` to avoid colliding with Tailwind's own class.

### Fonts

Self-hosted via `next/font/google`, selected per script in `app/[locale]/layout.tsx`:

| Role    | Latin (ro, en)                | Cyrillic (ru)                 |
| ------- | ----------------------------- | ----------------------------- |
| Display | Space Grotesk                 | Manrope                       |
| Body    | IBM Plex Sans (latin)         | IBM Plex Sans (+ cyrillic)    |
| Mono    | IBM Plex Mono (latin)         | IBM Plex Mono (+ cyrillic)    |

**Space Grotesk has no Cyrillic glyphs at all**, so Russian headings would fall back to
Helvetica and lose the design's voice. Manrope is the closest geometric grotesque on
Google Fonts that ships Cyrillic. This is the one place where a Russian visitor sees
different typography from a Romanian one — swap it if the brand has a licensed Cyrillic
display face.

Both script variants write to the same CSS variables (`--font-display-face`, etc.) and
only one class lands on `<html>`, so a Latin page never applies a Cyrillic face.
`preload: false` is set throughout: Next preloads every face in a route's module graph,
which meant 254 KB of hints per page with both scripts in one layout. Letting the browser
resolve `unicode-range` instead, each locale downloads only what it renders — 152 KB (ro),
168 KB (ru), 143 KB (en).

### Internationalisation

Romanian is the source language and the contract every other catalogue is measured
against. Russian and English are fully translated. `getMessages()` deep-merges a locale
over `ro.json`, so any key a future translator has not supplied renders in Romanian
instead of breaking; arrays are taken whole or not at all, so a partially translated list
can never mix two languages.

Number formatting follows the active locale, independently of the copy — the same
configurator answers render `€ 5.550` (ro), `€ 5,550` (en) and `€ 5 550` (ru).

**Do not translate** values under the keys `key`, `field`, `categoryKey`, `id`, `href`,
`variant`, `type`, or the boolean flags (`wide`, `highlighted`, `highlight`, `mono`,
`accent`, `lowStock`). They drive icon lookup, category filtering and price weights.
The option keys in `configurator.steps[].options[].key` must match `lib/estimate.ts`.

Left untranslated by intent: the brand name, manufacturer and model names, standards
(ISO 4043, IEC 61603), the registered legal entity, bank name, IBAN/IDNO and street
addresses — these are legal or postal identifiers. Institution names use their official
English/Russian forms (e.g. *Cancelaria de Stat a RM* → *State Chancellery of the
Republic of Moldova* / *Государственная канцелярия РМ*).

## Deviations from the prototype

Everything below is a deliberate change, each reversible in one edit.

**Bugs in the prototype, fixed**

- **Horizontal scroll below ~430px.** The header row (brand + CTA + burger) was wider
  than the viewport, pushing the menu button off-screen. The header CTA is now hidden
  ≤560px; it remains in the drawer and the sticky bottom bar.
- **More horizontal scroll at ≤360px.** `1fr` grid tracks in `.lic-row`, `.cat-body` and
  `.foot-grid` inherit `min-width: auto` and were blown out by their content; they are
  now `minmax(0, 1fr)`, with `min-width: 0` on the document-row flex children.
- **Anchor links landed under the sticky header** — the design had `scroll-behavior:
  smooth` and a sticky header but no `scroll-margin-top`. Added.
- **Mobile reference-table labels never appeared.** The design styled `.exp-lbl` in a
  media query but set `display:none` inline, which always won. The labels now show, and
  the column header hides when stacked — matching what the sibling rate table does.
- **Invalid HTML** — the bottom contact bar nested `<button>` inside `<a>`. It is now
  plain links, with the CSS retargeted.
- **Second `<h1>`** on the product-detail section, which is mid-page. It is an `<h2>`
  carrying the `.h1` class, so it looks identical.
- **Gallery thumbnail labels** were derived with `label.split(' ')[0]`, which produced
  `RECEPTOR / RECEPTOR / AFIȘAJ / CU` — two duplicates and a stray preposition, and worse
  once translated. `product.gallery` entries now carry an explicit `short`.

**Additions**

- Drawer closes on `Escape` and locks background scroll while open.
- `aria-expanded` / `aria-controls` / `aria-pressed` on the accordion, chips, gallery
  thumbs and toggle buttons; the equipment count is an `aria-live` region.
- `prefers-reduced-motion` disables the hero entry animation and the looping waveform.

**Typography**

- `„VicandisLux"` → `„VicandisLux”` (and two similar strings). The design paired an
  opening `„` with a straight `"`; Romanian convention is `„ … ”`. Each locale uses its
  own convention: `„…”` (ro), `«…»` (ru), `“…”` (en).

## Known gaps

These are places where the prototype is deliberately a mock and needs real data before
launch. None are implementation shortcuts.

- **No photography.** Every image is the design's striped CSS placeholder labelled
  `FOTO EVENIMENT`. Replacing them is a separate pass.
- **Catalog search and sidebar filters are presentational**, exactly as designed — the
  design binds no behaviour to them, their counts (`Bosch (14)`) describe a catalogue
  larger than the six sample products, and transmission/capacity have no backing fields.
  Only the category chips filter. Wiring the rest needs a real product source.
- **The configurator does not submit anywhere.** It shows the design's success state and
  a hard-coded reference (`VL-Q/2026-0417`). It needs a form endpoint.
- **Placeholder company data.** IDNO, IBAN and VAT code read `[de completat]` /
  `[to be completed]` / `[заполнить]`; the document links, social links and case-study
  links point at `#`.
- **The Russian and English copy is my translation, not a certified one.** The marketing
  text is safe to ship; have a native reviewer check the procurement section
  (`tenders.*`) and the legal footer before submitting anything to a tender authority.
- **Phone `+373 22 000 000` and the addresses are placeholders** — note the header/footer
  address (str. Ștefan cel Mare 100) and the tender address (str. Mitropolit
  Bănulescu-Bodoni 25) disagree in the design; both were carried over as-is.
- Only `VicandisLux Site.dc.html` is built. The bundle contains ~20 further designs
  (Blog, Case Study, Service Template, …), several of which restate sections of this page.
