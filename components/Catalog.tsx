import type { Messages } from '@/i18n/getMessages';
import { BASE_PATH } from '@/i18n/site';

type Props = { t: Messages['catalog'] };

/** Product shots that get cropped by `cover`; show them whole instead. */
const CONTAIN = new Set(['traducere']);
/** Product shots on a white studio background — fill the letterbox white to match. */
const WHITE_TILE = new Set(['traducere', 'proiectie']);
/** object-position override to fill on the product band (crops surrounding white). */
const POSITION: Record<string, string> = { proiectie: '50% 40%' };

/**
 * Equipment showcase: a plain gallery of photos with a title. Each product `id`
 * is also its photo slug at /equipment/<id>.jpg.
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
          {t.products.map((p) => {
            const contain = CONTAIN.has(p.id);
            return (
            <figure className="pcard" key={p.id} style={{ margin: 0 }}>
              <div
                className="ph"
                style={{
                  height: 220,
                  position: 'relative',
                  overflow: 'hidden',
                  background: WHITE_TILE.has(p.id)
                    ? '#ffffff'
                    : contain
                      ? 'var(--surface2)'
                      : undefined,
                }}
              >
                <img
                  src={`${BASE_PATH}/equipment/${p.id}.jpg`}
                  alt={p.title}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: contain ? 'contain' : 'cover',
                    objectPosition: POSITION[p.id] ?? 'center',
                    padding: contain ? 14 : 0,
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <figcaption style={{ padding: '18px 20px 22px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 20,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--text)',
                    margin: 0,
                  }}
                >
                  {p.title}
                </h3>
              </figcaption>
            </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
