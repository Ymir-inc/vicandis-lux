import { getMessages } from '@/i18n/getMessages';
import { ORG, ORG_VERIFIED, SITE_BASE, localeUrl } from '@/i18n/site';

/**
 * `/llms.txt` — the emerging convention (llmstxt.org) that gives language models
 * a concise, curated map of the site. Written in English (the lingua franca for
 * assistants) with absolute, locale-correct URLs.
 *
 * A static GET so it is emitted as a plain file by `output: export`.
 */
export const dynamic = 'force-static';

export function GET(): Response {
  const en = getMessages('en');

  const contact = ORG_VERIFIED
    ? [
        '## Contact',
        `- Email: ${ORG.email}`,
        `- Phone: ${ORG.telephone}`,
        `- ${ORG.address.street}, ${ORG.address.postalCode} ${ORG.address.locality}, Republic of Moldova`,
        '',
      ]
    : ['## Contact', '- See the contact section on any page of the site.', ''];

  const body = [
    `# ${en.meta.siteName}`,
    '',
    `> ${en.meta.description}`,
    '',
    'VicandisLux rents simultaneous-interpretation systems and professional sound,',
    'video and streaming equipment for conferences, corporate and institutional',
    'events across the Republic of Moldova. Delivery, installation and on-site',
    'technical support are included. Founded 2007; up to 16 interpretation channels;',
    'ISO 4043 booths; experienced with public institutions and international organisations.',
    '',
    '## Languages',
    `- Romanian (primary): ${localeUrl('ro')}`,
    `- Russian: ${localeUrl('ru')}`,
    `- English: ${localeUrl('en')}`,
    '',
    '## Key sections',
    `- Services — simultaneous interpretation, sound, hybrid & streaming, video, technical staff: ${localeUrl('en')}#servicii`,
    `- Equipment catalogue: ${localeUrl('en')}#echipamente`,
    `- Quote configurator with a live estimate: ${localeUrl('en')}#configurator`,
    `- References — projects and experience with public institutions and international organisations: ${localeUrl('en')}#referinte`,
    `- Pricing — indicative packages and per-category day rates: ${localeUrl('en')}#preturi`,
    `- Case studies: ${localeUrl('en')}#studii`,
    `- FAQ: ${localeUrl('en')}#faq`,
    '',
    ...contact,
    '## More',
    `- Sitemap: ${SITE_BASE}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
