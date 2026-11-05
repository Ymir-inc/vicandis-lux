/**
 * The brand's colour tokens, shared by every generated raster asset.
 *
 * `generate-icons.mjs` (favicon, PWA, apple-touch) and `generate-og.mjs`
 * (the social share card) both draw from here, so a palette change lands on
 * every surface at once.
 *
 * Two other copies of these values exist, and both are deliberate:
 *
 *   1. The site's Tailwind/CSS layer, authored by hand and reviewed in the
 *      browser. This file feeds `sharp`, which never sees a stylesheet.
 *   2. `server/quote.mjs`, in the inline styles of the quote email. That file
 *      is deployed on its own to `/opt/vlx-quote` on the VPS (TAKEOVER.md §3,
 *      §5) with no bundler and no repo around it, so it cannot import this
 *      module — it has to carry its own literals or ship broken.
 *
 * A palette change therefore means three edits, not one. There is no fourth.
 *
 * The gold is a three-stop metallic ramp, not a flat fill: lit from the
 * top-left, it reads as brushed metal rather than as mustard.
 */

/** Page background — the card and the site body. */
export const INK = '#0c0c0b';
/** Icon tile background; a hair lighter than INK so the mark has a plinth. */
export const TILE = '#111110';

export const GOLD_LIGHT = '#F2D390';
export const GOLD = '#D6A94B';
export const GOLD_DEEP = '#A87B2C';

export const CREAM = '#F7F5F0';
export const CREAM_DEEP = '#DCD5C4';
/** The OG card's URL line: below CREAM_DEEP so it recedes, above GREY so it
    still reads as a link rather than as caption text. */
export const CREAM_DIM = '#C9C6BC';

/** Muted text: the OG card's kicker, the site's secondary copy. */
export const GREY = '#8E8A80';
