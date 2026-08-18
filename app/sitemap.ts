import type { MetadataRoute } from 'next';
import { locales, localeTags } from '@/i18n/config';
import { IS_PREVIEW, SITE_BASE, localeUrl } from '@/i18n/site';

/** Required for these metadata routes under `output: export`. */
export const dynamic = 'force-static';

/**
 * Emitted to `sitemap.xml` at build, one entry per locale with reciprocal
 * hreflang alternates (Google reads `xhtml:link` alternates from the sitemap
 * as well as from the pages themselves).
 *
 * Suppressed entirely on the preview build so a disallowed, placeholder site
 * never ships a sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (IS_PREVIEW) return [];

  const languages = Object.fromEntries(
    locales.map((l) => [localeTags[l], localeUrl(l)]),
  ) as Record<string, string>;

  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'ro' ? 1 : 0.8,
    alternates: {
      languages: { ...languages, 'x-default': `${SITE_BASE}/ro/` },
    },
  }));
}
