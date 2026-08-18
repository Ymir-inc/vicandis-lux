import type { Messages } from '@/i18n/getMessages';

export default function Contact({ t }: { t: Messages['contact'] }) {
  return (
    <section id="contact" className="sec divide" style={{ background: 'var(--base)' }}>
      <div className="container-vl">
        <div className="brass-rule" style={{ width: 'min(520px,100%)', marginBottom: 44 }}>
          <i />
          <div />
        </div>

        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 56,
            alignItems: 'end',
          }}
        >
          <div>
            <h2
              className="h2"
              style={{ fontSize: 'clamp(40px,5vw,76px)', letterSpacing: '-0.04em', maxWidth: 820 }}
            >
              {t.title}
            </h2>
            <p className="lede" style={{ fontSize: 'clamp(16px,1.6vw,20px)', marginTop: 28, maxWidth: 560 }}>
              {t.lede}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
            <a href="#configurator" className="btn btn-solid" style={{ padding: '18px 32px', fontSize: 15 }}>
              {t.cta}
            </a>
            <div className="mono" style={{ fontSize: 13, letterSpacing: '.06em', color: 'var(--muted)' }}>
              {t.orCall}
            </div>
            <a
              href={t.phoneHref}
              className="mono"
              style={{ fontSize: 'clamp(22px,2.4vw,26px)', letterSpacing: '-0.01em', color: 'var(--accent)' }}
            >
              {t.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
