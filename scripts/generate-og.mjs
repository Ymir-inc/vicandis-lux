/**
 * Regenerates the social share card.
 *
 *   npm run og
 *
 * `public/og.png` is what WhatsApp, Facebook, LinkedIn and Telegram render
 * when someone pastes a link — by a wide margin the most-seen single image the
 * site owns, and the one nobody ever looks at while developing. It used to be
 * a hand-made binary, which is exactly why it was still wearing the dead lime
 * accent months after the rest of the site went gold. It is now drawn from
 * this file, in the palette of `brand.mjs`, alongside the icon set.
 *
 * Two rules make the output trustworthy:
 *
 *   1. Every glyph is emitted as an outline, never as an SVG <text> element.
 *      `sharp` rasterises SVG through librsvg, which has no access to the
 *      site's webfonts; a <text> run would be silently reset in whatever
 *      system face fontconfig happened to pick, and the Romanian diacritics
 *      (ă â î ș ț) would be the first thing to go. `scripts/fonts/` therefore
 *      carries the real Space Grotesk and IBM Plex Mono binaries (both OFL)
 *      and opentype.js converts each run to a <path>.
 *   2. Geometry is expressed in absolute card pixels, matching the previous
 *      card to within a pixel. This is a recolour, not a redesign: the copy,
 *      the composition and the type sizes are the ones that were signed off.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { CREAM, CREAM_DIM, GOLD, GOLD_DEEP, GOLD_LIGHT, GREY, INK } from './brand.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Facebook/LinkedIn/WhatsApp all crop to 1.91:1; 1200x630 is that, exactly. */
const W = 1200;
const H = 630;

/** Left margin. Every text run's pen starts here — the ragged left edge you
    see is the glyphs' own side bearings, which is what the original had. */
const X = 75.4;
/** Where the striped panel starts; the copy column owns everything left of it. */
const PANEL = 768;

async function font(file) {
  const b = await readFile(join(root, 'scripts/fonts', file));
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
}
const DISPLAY = await font('SpaceGrotesk-Bold.ttf'); // wordmark + headline
const MONO = await font('IBMPlexMono-Regular.ttf'); // kicker + URL

/** Human name of a face, for the missing-glyph error below. opentype.js keys
    `names` by platform (`unicode`/`macintosh`/`windows`) and a font need only
    populate one of them, so take the first that carries a full name. */
const fontName = (f) => Object.values(f.names).find((n) => n.fullName?.en)?.fullName.en ?? 'font';

/**
 * One text run as a filled outline.
 * @param {opentype.Font} f
 * @param {string} str
 * @param {object} o
 * @param {number} o.x      pen origin (not the inked left edge)
 * @param {number} o.y      baseline
 * @param {number} o.size   font size in px
 * @param {number} [o.track] letter-spacing in em, as CSS would express it
 * @param {string} o.fill
 */
const type = (f, str, { x, y, size, track = 0, fill }) => {
  /*
    opentype.js maps any character the font has no glyph for to .notdef — a
    hollow box — and returns a perfectly valid path, so the script exits 0 and
    the card looks finished. Both vendored faces cover the Romanian copy this
    card carries today (including the comma-below ș and ț, U+0219/U+021B, which are not the
    cedilla forms), but Space Grotesk carries no Cyrillic whatsoever. Localise
    this card for /ru and the headline becomes tofu while the Plex Mono kicker
    renders correctly — a card broken plausibly enough to ship. Fail here
    instead; an ink-coverage check on the PNG would not catch it, because
    .notdef boxes are ink.
  */
  const missing = [...str].filter((c) => f.charToGlyphIndex(c) === 0);
  if (missing.length) {
    throw new Error(`${fontName(f)}: no glyph for ${JSON.stringify(missing)} in "${str}"`);
  }
  const d = f.getPath(str, x, y, size, { kerning: true, letterSpacing: track }).toPathData(2);
  return `<path d="${d}" fill="${fill}"/>`;
};

/*
  The diagonal weave in the right-hand panel. 50% duty, ~70px perpendicular
  pitch, rising left-to-right at 41.26° — measured off the card it replaces so
  the texture lands on the same pixels. `x` inside the tile is the phase.
*/
const WEAVE = `<pattern id="weave" patternUnits="userSpaceOnUse" width="70.4" height="70.4" patternTransform="rotate(41.26)">
      <rect x="13.5" width="35.2" height="70.4" fill="${CREAM}" opacity=".038"/>
    </pattern>`;

/*
  Twenty-bar level meter — the card's one nod to what the company actually
  does. Heights are the original's, kept so the silhouette is unchanged.
*/
const BAR_HEIGHTS = [10, 18, 28, 21, 35, 26, 40, 31, 24, 38, 27, 19, 33, 22, 30, 17, 26, 13, 20, 11];
const BAR_X = 824;
const BAR_W = 11.2;
const BAR_PITCH = 289 / (BAR_HEIGHTS.length - 1);
const BAR_BASE = 558;

const bars = BAR_HEIGHTS.map(
  (h, i) =>
    `<rect x="${(BAR_X + i * BAR_PITCH).toFixed(2)}" y="${BAR_BASE - h}" width="${BAR_W}" height="${h}"/>`,
).join('');

/** The rule's left terminal: a square on its point, half-diagonal 5. */
const DIAMOND = 'M78.5 381.5 83.5 386.5 78.5 391.5 73.5 386.5Z';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="au" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_LIGHT}"/>
      <stop offset=".42" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_DEEP}"/>
    </linearGradient>
    <linearGradient id="auWave" gradientUnits="userSpaceOnUse" x1="${BAR_X}" y1="518" x2="1124" y2="${BAR_BASE}">
      <stop offset="0" stop-color="${GOLD_LIGHT}"/>
      <stop offset=".42" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_DEEP}"/>
    </linearGradient>
    <linearGradient id="rule" gradientUnits="userSpaceOnUse" x1="73.5" y1="0" x2="520.7" y2="0">
      <stop offset="0" stop-color="${GOLD}" stop-opacity=".86"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="halo">
      <stop offset="0" stop-color="${GOLD}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    ${WEAVE}
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="${PANEL + 1}" width="${W - PANEL - 1}" height="${H}" fill="url(#weave)"/>
  <rect x="${PANEL}" width="1" height="${H}" fill="${CREAM}" opacity=".12"/>

  <circle cx="82" cy="93" r="20" fill="url(#halo)"/>
  <circle cx="82" cy="93" r="6.5" fill="url(#au)"/>
  ${type(DISPLAY, 'VICANDIS', { x: 102.54, y: 105, size: 35, track: -0.046, fill: CREAM })}
  ${type(DISPLAY, 'LUX', { x: 256.69, y: 105, size: 35, track: -0.046, fill: 'url(#au)' })}

  ${type(MONO, 'TRADUCERE SIMULTANĂ & SONORIZARE', { x: X, y: 164, size: 20, track: 0.122, fill: GREY })}

  ${type(DISPLAY, 'Fiecare cuvânt,', { x: X, y: 259, size: 85.7, track: -0.054, fill: CREAM })}
  ${type(DISPLAY, 'auzit clar.', { x: X, y: 339, size: 85.7, track: -0.054, fill: CREAM })}

  <rect x="78.5" y="386" width="442.2" height="1" fill="url(#rule)"/>
  <path d="${DIAMOND}" fill="url(#au)"/>

  ${type(MONO, 'vicandislux.md', { x: X, y: 552, size: 23.5, fill: CREAM_DIM })}

  <g fill="url(#auWave)" opacity=".85">${bars}</g>
</svg>
`;

const png = await sharp(Buffer.from(svg))
  .flatten({ background: INK })
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(join(root, 'public/og.png'), png);
console.log(`Generating public/og.png from scripts/generate-og.mjs`);
console.log(`  public/og.png  ${W}x${H}  ${(png.length / 1024).toFixed(1)} KB`);
