import type { Messages } from '@/i18n/getMessages';

export default function Process({ t }: { t: Messages['process'] }) {
  return (
    <section id="proces" className="sec divide">
      <div className="container-vl">
        <div className="sec-head" style={{ marginBottom: 64 }}>
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {t.eyebrow}
            </div>
            <h2 className="h2" style={{ marginTop: 22 }}>
              {t.title}
            </h2>
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, letterSpacing: '.06em', color: 'var(--muted)', textAlign: 'right' }}
          >
            {t.note}
          </div>
        </div>

        <div className="steps">
          {t.steps.map((step) => (
            <div className="step" key={step.num}>
              <div className="step-head">
                <span className="step-ring">
                  <i />
                </span>
                <span className="step-line" />
              </div>
              <div style={{ padding: '32px 40px 32px 0' }}>
                <div className="step-num">{step.num}</div>
                <h3
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 24,
                    letterSpacing: '-0.02em',
                    color: 'var(--text)',
                    margin: '18px 0 0',
                  }}
                >
                  {step.title}
                </h3>
                <p className="lede" style={{ fontSize: 15, lineHeight: 1.58, margin: '12px 0 0' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
