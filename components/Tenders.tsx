import type { Messages } from '@/i18n/getMessages';

const columnHead: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

export default function Tenders({ t }: { t: Messages['tenders'] }) {
  return (
    <section id="referinte" className="sec divide">
      <div className="container-vl">
        <div className="lic-row">
          <div>
            <h3
              style={{
                fontFamily: 'var(--d)',
                fontWeight: 600,
                fontSize: 'clamp(30px,3.2vw,44px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.06,
                margin: '0 0 14px',
                color: 'var(--text)',
              }}
            >
              {t.references.title}
            </h3>
            <p className="lede" style={{ fontSize: 15.5, margin: 0 }}>
              {t.references.desc}
            </p>
          </div>
          <div className="idtable">
            <div className="exp-row" style={{ background: 'var(--surface)' }}>
              <span className="mono" style={columnHead}>
                {t.references.columns.year}
              </span>
              <span className="mono" style={columnHead}>
                {t.references.columns.client}
              </span>
              <span className="mono" style={columnHead}>
                {t.references.columns.service}
              </span>
              <span className="mono" style={{ ...columnHead, textAlign: 'right' }}>
                {t.references.columns.scale}
              </span>
            </div>
            {t.references.items.map((p) => (
              <div className="exp-row" key={`${p.year}-${p.client}`}>
                <span className="mono" style={{ fontSize: 13, color: 'var(--accent)' }}>
                  <span className="exp-lbl">{t.references.columns.year} · </span>
                  {p.year}
                </span>
                <span style={{ fontSize: 14.5, color: 'var(--text)' }}>{p.client}</span>
                <span style={{ fontSize: 13.5, color: 'var(--soft)' }}>{p.service}</span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>
                  {p.scale}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
