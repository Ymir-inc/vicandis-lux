import type { Messages } from '@/i18n/getMessages';
import { ServiceIcon } from './icons';

export default function Services({ t }: { t: Messages['services'] }) {
  return (
    <section id="servicii" className="sec divide">
      <div className="container-vl">
        <div className="sec-head" style={{ paddingBottom: 44, borderBottom: '1px solid var(--border)' }}>
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
            style={{
              fontSize: 13,
              letterSpacing: '.06em',
              color: 'var(--muted)',
              textAlign: 'right',
              lineHeight: 1.7,
            }}
          >
            {t.countLine}
            <br />
            <span style={{ color: 'var(--text)' }}>{t.countLineStrong}</span>
          </div>
        </div>

        <div className="svcs" style={{ marginTop: 40 }}>
          {t.items.map((s) => (
            <a key={s.key} href="#configurator" className={`card svc${s.wide ? ' svc-wide' : ''}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <ServiceIcon name={s.key} />
                <span className="mono" style={{ fontSize: 12, letterSpacing: '.1em', color: 'var(--muted)' }}>
                  {s.num}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--d)',
                  fontWeight: 600,
                  fontSize: 25,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.08,
                  color: 'var(--text)',
                  margin: '26px 0 0',
                }}
              >
                {s.title}
              </h3>
              <p className="lede" style={{ fontSize: 15, lineHeight: 1.58, margin: '14px 0 0', flex: 1 }}>
                {s.desc}
              </p>
              <span className="slink" style={{ marginTop: 24 }}>
                {t.linkLabel} <span className="arw">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
