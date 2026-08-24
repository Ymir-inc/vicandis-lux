import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Catalog from '@/components/Catalog';
import Configurator from '@/components/Configurator';
import Tenders from '@/components/Tenders';
import Pricing from '@/components/Pricing';
import CaseStudies from '@/components/CaseStudies';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import SiteFooter from '@/components/SiteFooter';
import MobileContactBar from '@/components/MobileContactBar';

export default async function SitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);

  return (
    <>
      <SiteHeader locale={locale} nav={t.nav} channels={t.contactChannels} />
      <main id="main">
        <Hero t={t.hero} />
        <Services t={t.services} />
        <Stats t={t.stats} />
        <Process t={t.process} />
        <Catalog t={t.catalog} />
        <Configurator t={t.configurator} />
        <Tenders t={t.tenders} />
        <Pricing t={t.pricing} />
        <CaseStudies t={t.cases} />
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>
      <SiteFooter t={t.footer} />
      <MobileContactBar channels={t.contactChannels} />
    </>
  );
}
