import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, localeTags } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { legal } from '@/i18n/legal';
import { IS_PREVIEW, SITE_BASE } from '@/i18n/site';
import LegalPage from '@/components/LegalPage';

const SLUG = 'cookies';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = `${legal[locale][SLUG].title} — VicandisLux`;
  const languages = Object.fromEntries(
    locales.map((l) => [localeTags[l], `${SITE_BASE}/${l}/${SLUG}/`]),
  );
  return {
    title,
    description: legal[locale][SLUG].title,
    alternates: { canonical: `${SITE_BASE}/${locale}/${SLUG}/`, languages },
    robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage locale={locale} t={getMessages(locale)} doc={SLUG} />;
}
