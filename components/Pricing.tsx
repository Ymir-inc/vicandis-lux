import type { Messages } from '@/i18n/getMessages';

export default function Pricing({ t }: { t: Messages['pricing'] }) {
  const rates = t.rates;

  return (
    <section id="preturi" className="sec divide">
      <div className="container-vl">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 24,
            fontFamily: 'var(--m)',
            fontSize: 12,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            flexWrap: 'wrap',
          }}
        >
          <div className="eyebrow">
            <span className="dot" />
            {t.eyebrow}
          </div>
          <div style={{ color: 'var(--soft)' }}>{t.currencyNote}</div>
        </div>

        <h2
          className="h2"
          style={{ marginTop: 28, fontSize: 'clamp(36px,4vw,60px)', maxWidth: 840, textWrap: 'balance' }}
        >
          {t.title}
        </h2>
        <p className="lede" style={{ fontSize: 'clamp(16px,1.5vw,19px)', marginTop: 22, maxWidth: 660 }}>
          {t.lede}
        </p>

        <div className="pkgs" style={{ marginTop: 44 }}>
          {t.packages.map((p) => (
            <div className={`pkg${p.highlighted ? ' hi' : ''}`} key={p.key}>
              {p.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: -1,
                    right: 24,
                    fontFamily: 'var(--m)',
                    fontSize: 10,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: '#111110',
                    background: 'var(--accent)',
                    padding: '6px 12px',
                    borderRadius: '0 0 2px 2px',
                  }}
                >
                  {t.badgeLabel}
                </div>
              )}
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: p.highlighted ? 'var(--accent)' : 'var(--muted)',
                }}
              >
                {p.tag}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--d)',
                  fontWeight: 600,
                  fontSize: 24,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.12,
                  color: 'var(--text)',
                  margin: '12px 0 0',
                  textWrap: 'balance',
                }}
              >
                {p.title}
              </h3>
              <p
                className="lede"
                style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted)', margin: '10px 0 0' }}
              >
                {p.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '26px 0 4px' }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {t.fromLabel}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 700,
                    fontSize: 42,
                    letterSpacing: '-0.03em',
                    color: p.highlighted ? 'var(--accent)' : 'var(--text)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {p.price}
                </span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--muted)' }}>
                  {t.perDay}
                </span>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 24 }}>
                {t.scalePrefix} {p.scale}
              </div>
              <div style={{ borderTop: '1px solid var(--border)', flex: 1 }}>
                {p.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: 'flex',
                      gap: 11,
                      alignItems: 'flex-start',
                      padding: '12px 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: 'var(--accent)', fontSize: 12, lineHeight: 1.5, flex: 'none' }}
                    >
                      ✓
                    </span>
                    <span className="lede" style={{ fontSize: 13.5, lineHeight: 1.5 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#configurator"
                className={`btn ${p.highlighted ? 'btn-solid' : 'btn-ghost'}`}
                style={{ marginTop: 26 }}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 32,
              marginBottom: 32,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                {rates.eyebrow}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--d)',
                  fontWeight: 600,
                  fontSize: 'clamp(26px,3vw,32px)',
                  letterSpacing: '-0.02em',
                  margin: '16px 0 0',
                  color: 'var(--text)',
                }}
              >
                {rates.title}
              </h3>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: '.04em',
                color: 'var(--muted)',
                textAlign: 'right',
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              {rates.note}
            </div>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div className="rate-head">
              <span>{rates.columns.category}</span>
              <span>{rates.columns.includes}</span>
              <span style={{ textAlign: 'right' }}>{rates.columns.from}</span>
            </div>
            {rates.items.map((r) => (
              <div className="rate-row" key={r.category}>
                <span
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: '-0.01em',
                    color: 'var(--text)',
                  }}
                >
                  <span className="rate-lbl">{rates.columns.category}&nbsp;</span>
                  {r.category}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--muted)' }}>
                  <span className="rate-lbl">{rates.columns.includes}&nbsp;</span>
                  {r.includes}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 16,
                    color: 'var(--accent)',
                    textAlign: 'right',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <span className="rate-lbl">{rates.columns.from}&nbsp;</span>
                  {r.from}
                </span>
              </div>
            ))}
          </div>
          <div className="mono" style={{ fontSize: 11.5, color: 'var(--faint)', marginTop: 16 }}>
            {rates.footnote}
          </div>
        </div>
      </div>
    </section>
  );
}
