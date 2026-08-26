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

  // priority/changeFrequency omitted deliberately — Google ignores both.
  const home = locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: new Date(),
    alternates: {
      languages: { ...languages, 'x-default': `${SITE_BASE}/ro/` },
    },
  }));

  const legalSlugs = ['privacy', 'terms', 'cookies'] as const;
  const legalPages = legalSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${SITE_BASE}/${locale}/${slug}/`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeTags[l], `${SITE_BASE}/${l}/${slug}/`]),
        ) as Record<string, string>,
      },
    })),
  );

  return [...home, ...legalPages];
}
