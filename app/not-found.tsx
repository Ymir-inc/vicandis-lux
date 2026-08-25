import Link from 'next/link';
import { defaultLocale, localeTags } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import './globals.css';

export default function NotFound() {
  const t = getMessages(defaultLocale);

  return (
    <html lang={localeTags[defaultLocale]}>
      <body>
        {/* React hoists this into <head>; a 404 should never be indexed. */}
        <meta name="robots" content="noindex, follow" />
        <main
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <div className="eyebrow">
            <span className="dot" />
            Eroare 404
          </div>
          <h1 className="h1" style={{ fontSize: 'clamp(36px,6vw,64px)' }}>
            Pagina nu a fost găsită
          </h1>
          <p className="lede" style={{ maxWidth: 460 }}>
            Adresa accesată nu există sau a fost mutată.
          </p>
          <Link href={`/${defaultLocale}/`} className="btn btn-solid">
            {t.nav.links[0].label} →
          </Link>
          <div
            className="mono"
            style={{
              display: 'flex',
              gap: 18,
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontSize: 13,
            }}
          >
            {t.nav.links.slice(1).map((link) => (
              <Link key={link.href} href={`/${defaultLocale}/${link.href}`} className="flink">
                {link.label}
              </Link>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
