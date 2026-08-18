import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { IBM_Plex_Mono, IBM_Plex_Sans, Manrope, Space_Grotesk } from 'next/font/google';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import {
  IS_PREVIEW,
  ORG,
  SITE_BASE,
  SITE_ORIGIN,
  assetUrl,
  localeUrl,
} from '@/i18n/site';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

/*
  Fonts are loaded per script, not per page, so a Latin locale never downloads
  Cyrillic subsets and vice versa. Each pair writes to the same CSS variable and
  only one class is applied to <html>, so exactly one face is preloaded.

  `next/font/google` is a compile-time transform: every argument below must stay
  an inline literal, not a shared constant.

  `preload: false` throughout — Next preloads every face declared in a route's
  module graph, and since both scripts live in this one shared layout that meant
  254 KB of font hints per page, roughly half of it unusable by any given locale.
  Without the hints the browser resolves `unicode-range` itself and fetches only
  the subsets a page actually renders; `display: swap` plus Next's metric-matched
  fallback keep the swap quiet.
*/

/** Brand display face. Latin only — Space Grotesk ships no Cyrillic glyphs. */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-display-face',
});

/**
 * Cyrillic display stand-in. Space Grotesk has no Cyrillic coverage at all, so
 * Russian headings would otherwise fall back to Helvetica and lose the design's
 * voice entirely. Manrope is the closest geometric grotesque on Google Fonts
 * that ships Cyrillic.
 */
const manrope = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-display-face',
});

const plexSansLatin = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-body-face',
});

const plexSansCyrillic = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-body-face',
});

const plexMonoLatin = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-mono-face',
});

const plexMonoCyrillic = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-mono-face',
});

/** Locales whose content is written in Cyrillic script. */
const CYRILLIC_LOCALES: ReadonlySet<Locale> = new Set<Locale>(['ru']);

function fontsFor(locale: Locale) {
  const cyrillic = CYRILLIC_LOCALES.has(locale);
  return [
    cyrillic ? manrope : spaceGrotesk,
    cyrillic ? plexSansCyrillic : plexSansLatin,
    cyrillic ? plexMonoCyrillic : plexMonoLatin,
  ]
    .map((f) => f.variable)
    .join(' ');
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0c0c0b',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale);

  const languages = {
    ...Object.fromEntries(locales.map((l) => [localeTags[l], localeUrl(l)])),
    'x-default': `${SITE_BASE}/ro/`,
  };

  const ogImage = {
    url: assetUrl('/og.png'),
    width: 1200,
    height: 630,
    alt: t.meta.siteName,
  };

  return {
    // Origin only: canonical/alternate/OG URLs below already carry the sub-path.
    metadataBase: new URL(SITE_ORIGIN),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: t.meta.siteName,
    authors: [{ name: ORG.legalName }],
    creator: ORG.legalName,
    publisher: ORG.legalName,
    referrer: 'strict-origin-when-cross-origin',
    // Explicit tel: links handle calling; stop the OS auto-linking stray numbers.
    formatDetection: { telephone: false, email: false, address: false },
    alternates: { canonical: localeUrl(locale), languages },
    robots: IS_PREVIEW
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      url: localeUrl(locale),
      siteName: t.meta.siteName,
      title: t.meta.title,
      description: t.meta.description,
      locale: localeTags[locale].replace('-', '_'),
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeTags[l].replace('-', '_')),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: [ogImage.url],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);

  return (
    <html lang={localeTags[locale]} className={fontsFor(locale)}>
      <body>
        <StructuredData locale={locale} t={t} />
        {children}
      </body>
    </html>
  );
}
