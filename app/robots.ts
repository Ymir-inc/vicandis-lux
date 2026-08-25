import type { MetadataRoute } from 'next';
import { IS_PREVIEW, SITE_BASE } from '@/i18n/site';

/** Required for these metadata routes under `output: export`. */
export const dynamic = 'force-static';

/**
 * Emitted to `robots.txt` at build.
 *
 * Preview: disallow everything and advertise no sitemap — the throwaway build
 * carries placeholder company data and must stay out of every index.
 *
 * Production: allow all crawlers, including AI assistants (the site is meant to
 * be quotable by them), and point at the sitemap. If the owner later decides to
 * bar AI *training* crawlers, add per-agent `disallow` rules here — see
 * tasks/OWNER-TODO.md.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      // AI answer engines — explicitly welcomed; this is how the site gets cited.
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
        ],
        allow: '/',
      },
      // Aggressive scraper that ignores crawl norms.
      { userAgent: 'Bytespider', disallow: '/' },
      // Everyone else (incl. Googlebot and AI *training* crawlers): full access.
      // Flip training crawlers to disallow here if that becomes a business need.
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${SITE_BASE}/sitemap.xml`,
    host: SITE_BASE,
  };
}
