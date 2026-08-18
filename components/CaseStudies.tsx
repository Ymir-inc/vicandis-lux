import type { Messages } from '@/i18n/getMessages';

export default function CaseStudies({ t }: { t: Messages['cases'] }) {
  return (
    <section id="studii" className="sec divide">
      <div className="container-vl">
        <div className="sec-head" style={{ marginBottom: 48 }}>
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {t.eyebrow}
            </div>
            <h2 className="h2" style={{ marginTop: 22, fontSize: 'clamp(34px,4vw,60px)' }}>
              {t.title}
            </h2>
          </div>
        </div>

        <div className="cards3">
          {t.items.map((c) => (
            <a
              href="#"
              className="card"
              key={c.title}
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <div className="ph" style={{ height: 220 }}>
                <span
                  className="mono"
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: 14,
                    fontSize: 10,
                    letterSpacing: '.12em',
                    color: 'var(--muted)',
                  }}
                >
                  {c.fig}
                </span>
              </div>
              <div
                style={{ padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}
              >
                <span
                  className="mono"
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: 11,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    padding: '5px 10px',
                    borderRadius: 2,
                  }}
                >
                  {c.tag}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 23,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--text)',
                    margin: '18px 0 0',
                  }}
                >
                  {c.title}
                </h3>
                <div
                  className="mono"
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    margin: '14px 0 0',
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {c.meta}
                </div>
                <span className="slink" style={{ marginTop: 22 }}>
                  {t.linkLabel} <span className="arw">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 36 }}>
          <a href="#" className="btn btn-ghost">
            {t.ctaAll}
          </a>
        </div>
      </div>
    </section>
  );
}
