import type { Messages } from '@/i18n/getMessages';

const columnTitleStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 20,
};

export default function SiteFooter({ t }: { t: Messages['footer'] }) {
  return (
    <footer className="foot">
      <div className="foot-spine" />
      <div className="container-vl">
        <div className="foot-grid">
          <div>
            <a href="#acasa" className="brand" style={{ fontSize: 22, marginBottom: 20 }}>
              <span className="dot" />
              VICANDIS<b>LUX</b>
            </a>
            <p className="lede" style={{ fontSize: 14.5, color: 'var(--muted)', maxWidth: 340 }}>
              {t.desc}
            </p>
            <div
              className="foot-social"
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 26,
                fontFamily: 'var(--m)',
                fontSize: 12,
                letterSpacing: '.06em',
              }}
            >
              {t.social.map((s) => (
                <a key={s.label} href={s.href} className="flink">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {t.columns.map((col) => (
            <div key={col.title}>
              <div className="mono" style={columnTitleStyle}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14.5 }}>
                {col.links.map((link) => (
                  <a key={link.label} href={link.href} className="flink">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mono" style={columnTitleStyle}>
              {t.contactTitle}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                fontFamily: 'var(--m)',
                fontSize: 13.5,
              }}
            >
              <a href={t.phoneHref} className="flink" style={{ color: 'var(--text)' }}>
                {t.phone}
              </a>
              <a href={`mailto:${t.email}`} className="flink" style={{ color: 'var(--accent)' }}>
                {t.email}
              </a>
              <span style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
                {t.addressLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < t.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="mono" style={{ fontSize: 11.5, letterSpacing: '.05em', color: 'var(--muted)' }}>
            {t.legalLine}
          </div>
          <div
            className="mono"
            style={{
              display: 'flex',
              gap: 20,
              fontSize: 11.5,
              color: 'var(--muted)',
              flexWrap: 'wrap',
            }}
          >
            {t.legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="flink">
                {link.label}
              </a>
            ))}
            <span>{t.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
