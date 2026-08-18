import { locales, type Locale } from './config';

/**
 * Single source of truth for absolute URLs and organisation identity.
 *
 * `NEXT_PUBLIC_SITE_URL` is the production origin. It defaults to the likely
 * domain (inferred from the office email) so a plain build is coherent, but the
 * real value must be confirmed by the owner — see tasks/OWNER-TODO.md.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set only for the throwaway GitHub Pages preview,
 * which serves from `/<repo>/` rather than the origin root.
 */
const RAW_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vicandislux.md';

/** Origin only, no trailing slash: `https://host`. */
export const SITE_ORIGIN = RAW_ORIGIN.replace(/\/+$/, '');

/** Sub-path the site is served under (`` in prod, `/vicandislux-preview` in the preview). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Canonical base including any sub-path: `https://host` or `https://host/repo`. */
export const SITE_BASE = `${SITE_ORIGIN}${BASE_PATH}`;

/** Preview build: placeholder company data, must never be indexed. */
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === '1';

/**
 * Opt-in flag for publishing the real NAP (name/address/phone) in structured
 * data. Off by default so the placeholder IDNO/IBAN/phone are never emitted as
 * machine-readable, verifiable business facts. Flip to '1' once the owner has
 * supplied real details — see tasks/OWNER-TODO.md.
 */
export const ORG_VERIFIED = process.env.NEXT_PUBLIC_ORG_VERIFIED === '1';

/** Absolute URL for a locale home page, e.g. `https://host/base/ro/`. */
export const localeUrl = (locale: Locale) => `${SITE_BASE}/${locale}/`;

/** Absolute URL for an asset served from `public/`, respecting the sub-path. */
export const assetUrl = (path: string) => `${SITE_BASE}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Organisation identity used across metadata, the manifest and JSON-LD.
 * The NAP fields are placeholders until the owner confirms them; they are only
 * ever emitted when `ORG_VERIFIED` is set.
 */
export const ORG = {
  name: 'VicandisLux',
  legalName: 'VICANDISLUX SRL',
  url: `${SITE_BASE}/`,
  logo: assetUrl('/icons/icon-512.png'),
  email: 'director@vicandislux.md',
  telephone: '+373 69 337 792',
  foundingYear: '2007',
  address: {
    street: 'str. Milescu Spătaru 7/1',
    locality: 'Chișinău',
    postalCode: '',
    country: 'MD',
  },
  /** Social profiles — replace `#` placeholders with real URLs before emitting. */
  sameAs: [] as string[],
} as const;

export const ALL_LOCALE_URLS = locales.map(localeUrl);
