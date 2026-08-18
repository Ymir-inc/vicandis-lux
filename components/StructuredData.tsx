import type { Locale } from '@/i18n/config';
import { localeTags } from '@/i18n/config';
import { ORG, ORG_VERIFIED, SITE_BASE, localeUrl } from '@/i18n/site';
import type { Messages } from '@/i18n/getMessages';

/**
 * schema.org JSON-LD as a single `@graph`: Organization, WebSite and FAQPage.
 *
 * The FAQ block is built from the real, translated Q&A, so it is eligible for
 * FAQ rich results and is directly quotable by AI assistants. The organisation's
 * address / phone / email are emitted *only* when `ORG_VERIFIED` is set — the
 * placeholder NAP must never appear as machine-readable, verifiable facts.
 */
export default function StructuredData({ locale, t }: { locale: Locale; t: Messages }) {
  const orgId = `${SITE_BASE}/#organization`;
  const inLanguage = localeTags[locale];

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: ORG.name,
    legalName: ORG.legalName,
    url: `${SITE_BASE}/`,
    logo: { '@type': 'ImageObject', url: ORG.logo, width: 512, height: 512 },
    foundingDate: ORG.foundingYear,
    areaServed: { '@type': 'Country', name: 'Moldova' },
    ...(ORG.sameAs.length > 0 && { sameAs: ORG.sameAs }),
    ...(ORG_VERIFIED && {
      email: ORG.email,
      telephone: ORG.telephone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ORG.address.street,
        addressLocality: ORG.address.locality,
        postalCode: ORG.address.postalCode,
        addressCountry: ORG.address.country,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: ORG.email,
        telephone: ORG.telephone,
        availableLanguage: ['ro', 'ru', 'en'],
      },
    }),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_BASE}/#website`,
    url: localeUrl(locale),
    name: t.meta.siteName,
    description: t.meta.description,
    inLanguage,
    publisher: { '@id': orgId },
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${localeUrl(locale)}#faq`,
    inLanguage,
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, faqPage],
  };

  // Escape `<` so a stray sequence in content can never close the script early.
  const json = JSON.stringify(graph).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
