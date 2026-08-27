import type { Messages } from '@/i18n/getMessages';

export default function Stats({ t }: { t: Messages['stats'] }) {
  return (
    <section id="cifre" className="stats divide">
      <div className="container-vl">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px 16px',
            flexWrap: 'wrap',
            padding: '26px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            {t.eyebrow}
          </div>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '.08em', color: 'var(--muted)' }}>
            {t.note}
          </div>
        </div>
      </div>

      <div className="container-vl" style={{ paddingInline: 0 }}>
        <div className="stats-grid">
          {t.items.map((item) => (
            <div className="stat" key={item.label}>
              <div style={{ width: 22, height: 2, background: 'var(--brass)' }} />
              {item.variant === 'text' ? (
                <div
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 'clamp(28px,2.6vw,40px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.02,
                    color: 'var(--text)',
                    marginTop: 22,
                  }}
                >
                  {item.value}
                </div>
              ) : (
                <div className="stat-num">
                  {item.value}
                  {item.suffix && <span style={{ color: 'var(--brass)' }}>{item.suffix}</span>}
                </div>
              )}
              <div className="stat-lbl">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
