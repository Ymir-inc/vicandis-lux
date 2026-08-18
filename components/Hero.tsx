import type { Messages } from '@/i18n/getMessages';
import { buildWaveform } from '@/lib/waveform';

const bars = buildWaveform();

export default function Hero({ t }: { t: Messages['hero'] }) {
  return (
    <section id="acasa" className="hero">
      <div className="container-vl" style={{ position: 'relative' }}>
        <div className="hero-grid">
          <div className="hero-left">
            <div className="rise eyebrow" style={{ animationDelay: '.05s' }}>
              <span className="dot" />
              {t.eyebrow}
            </div>

            <h1 className="rise" style={{ marginTop: 34, maxWidth: 720, animationDelay: '.12s' }}>
              {t.titleLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < t.titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p
              className="rise lede"
              style={{
                fontSize: 'clamp(16px,1.5vw,19px)',
                marginTop: 32,
                maxWidth: 560,
                animationDelay: '.2s',
              }}
            >
              {t.lede}
            </p>

            <div
              className="rise"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 40,
                flexWrap: 'wrap',
                animationDelay: '.28s',
              }}
            >
              <a href="#configurator" className="btn btn-solid">
                {t.ctaPrimary}
              </a>
              <a href="#echipamente" className="btn btn-ghost">
                {t.ctaSecondary}
              </a>
            </div>

            <div
              className="rise brass-rule"
              style={{ marginTop: 44, maxWidth: 560, animationDelay: '.36s' }}
            >
              <i />
              <div />
            </div>

            <div
              className="rise mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 20,
                fontSize: 13,
                letterSpacing: '.04em',
                color: 'var(--muted)',
                flexWrap: 'wrap',
                animationDelay: '.42s',
              }}
            >
              <span>
                {t.sinceLabel} <span style={{ color: 'var(--text)' }}>{t.sinceYear}</span>
              </span>
              {t.facts.map((fact) => (
                <span key={fact} style={{ display: 'contents' }}>
                  <span style={{ color: 'var(--accent)' }}>·</span>
                  <span>{fact}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="rise hero-panel" style={{ animationDelay: '.24s', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/brand/hero-conferinta.jpg)',
                backgroundPosition: '52% 76%',
                backgroundSize: 'cover',
                filter: 'saturate(.72) contrast(1.04) brightness(.86)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(17,17,16,.72), rgba(17,17,16,.30) 42%, rgba(17,17,16,.88)), linear-gradient(90deg, rgba(17,17,16,.78), transparent 46%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 28,
              }}
            >
              <div className="mono" style={{ fontSize: 11, letterSpacing: '.12em', color: 'var(--muted)' }}>
                {t.panel.fig}
              </div>
              <div
                className="mono"
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 12,
                  letterSpacing: '.08em',
                  lineHeight: 1.9,
                  color: 'var(--muted)',
                  maxWidth: 300,
                }}
              >
                {t.panel.captionLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < t.panel.captionLines.length - 1 && <br />}
                  </span>
                ))}
              </div>
              <div className="chip-stat" style={{ alignSelf: 'flex-start' }}>
                {t.panel.stats.map((stat, i) => (
                  <span key={stat.label} style={{ display: 'contents' }}>
                    {i > 0 && <div style={{ width: 1, height: 30, background: 'var(--border)' }} />}
                    <div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 22,
                          letterSpacing: '-0.02em',
                          color: stat.accent ? 'var(--accent)' : 'var(--text)',
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: '.08em',
                          color: 'var(--muted)',
                          marginTop: 3,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wave" style={{ height: 46, borderTop: '1px solid var(--border)' }} aria-hidden="true">
        {bars.map((bar, i) => (
          <i key={i} style={{ height: `${bar.height}%`, animationDelay: bar.delay }} />
        ))}
      </div>
    </section>
  );
}
