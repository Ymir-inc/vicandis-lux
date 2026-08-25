import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/getMessages';
import { BASE_PATH } from '@/i18n/site';
import { legal, type LegalDocKey } from '@/i18n/legal';

/** Self-contained chrome (brand → home, slim footer) so home-only anchors never break here. */
export default function LegalPage({
  locale,
  t,
  doc,
}: {
  locale: Locale;
  t: Messages;
  doc: LegalDocKey;
}) {
  const L = legal[locale];
  const d = L[doc];
  const home = `${BASE_PATH}/${locale}/`;

  return (
    <>
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '20px 0',
        }}
      >
        <div className="container-vl" style={{ display: 'flex', alignItems: 'center' }}>
          <a href={home} className="brand" aria-label="VicandisLux">
            <img
              src={`${BASE_PATH}/brand/vicandislux-mark.webp`}
              alt="VicandisLux"
              width={40}
              height={40}
              style={{ height: 40, width: 'auto', display: 'block' }}
            />
          </a>
        </div>
      </header>

      <main id="main" className="sec">
        <div className="container-vl" style={{ maxWidth: 820 }}>
          <a href={home} className="flink mono" style={{ fontSize: 13 }}>
            {L.backHome}
          </a>

          <h1 className="h2" style={{ marginTop: 20, fontSize: 'clamp(32px,4vw,48px)' }}>
            {d.title}
          </h1>

          <p
            className="mono"
            style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14 }}
          >
            {L.updatedLabel}: {L.updated}
          </p>

          <p
            className="mono"
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: 'var(--soft)',
              border: '1px solid var(--accent)',
              borderRadius: 3,
              background: 'rgba(214,169,75,0.06)',
              padding: '14px 18px',
              margin: '20px 0 8px',
            }}
          >
            {L.draftNotice}
          </p>

          {d.sections.map((s) => (
            <section key={s.h} style={{ marginTop: 34 }}>
              <h2
                style={{
                  fontFamily: 'var(--d)',
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                }}
              >
                {s.h}
              </h2>
              {s.p.map((para, i) => (
                <p className="lede" key={i} style={{ fontSize: 15.5, marginTop: 12, maxWidth: 720 }}>
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0', marginTop: 40 }}>
        <div
          className="container-vl mono"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px 22px',
            alignItems: 'center',
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          {t.footer.legalLinks.map((link) => (
            <a key={link.label} href={`${BASE_PATH}/${locale}/${link.href}/`} className="flink">
              {link.label}
            </a>
          ))}
          <span style={{ marginLeft: 'auto' }}>{t.footer.legalLine}</span>
        </div>
      </footer>
    </>
  );
}
