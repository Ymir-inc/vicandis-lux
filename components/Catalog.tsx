import type { Messages } from '@/i18n/getMessages';

type Props = { t: Messages['catalog'] };

/**
 * Equipment showcase: a plain gallery of photos with a title. No selection,
 * request list, specs or actions — just the items on display.
 */
export default function Catalog({ t }: Props) {
  return (
    <section id="echipamente" className="sec divide">
      <div className="container-vl">
        <div>
          <div className="eyebrow">
            <span className="dot" />
            {t.eyebrow}
          </div>
          <h2 className="h2" style={{ marginTop: 20, fontSize: 'clamp(36px,4vw,60px)' }}>
            {t.title}
          </h2>
        </div>

        <div className="cards3" style={{ marginTop: 44 }}>
          {t.products.map((p) => (
            <figure className="pcard" key={p.id} style={{ margin: 0 }}>
              <div className="ph" style={{ height: 220 }}>
                <span
                  className="mono"
                  style={{
                    position: 'absolute',
                    left: 13,
                    top: 12,
                    fontSize: 10,
                    letterSpacing: '.1em',
                    color: 'var(--muted)',
                  }}
                >
                  {p.fig}
                </span>
              </div>
              <figcaption style={{ padding: '18px 20px 22px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--text)',
                    margin: 0,
                  }}
                >
                  {p.model}
                </h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
