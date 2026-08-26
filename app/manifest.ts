import type { MetadataRoute } from 'next';
import { BASE_PATH } from '@/i18n/site';
import { defaultLocale, localeTags } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';

/** Required for these metadata routes under `output: export`. */
export const dynamic = 'force-static';

/**
 * PWA manifest. Icon `src` values are written with the sub-path baked in
 * because, unlike page metadata, the manifest is not run through Next's
 * asset-prefix rewriting.
 */
export default function manifest(): MetadataRoute.Manifest {
  const t = getMessages(defaultLocale);

  return {
    name: t.meta.siteName,
    short_name: t.meta.siteName,
    description: t.meta.description,
    lang: localeTags[defaultLocale],
    start_url: `${BASE_PATH}/${defaultLocale}/`,
    scope: `${BASE_PATH}/`,
    display: 'standalone',
    background_color: '#0c0c0b',
    theme_color: '#0c0c0b',
    icons: [
      { src: `${BASE_PATH}/icons/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${BASE_PATH}/icons/icon-512.png`, sizes: '512x512', type: 'image/png' },
      {
        src: `${BASE_PATH}/icons/icon-maskable-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
