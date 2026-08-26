'use client';

import { useState } from 'react';
import type { Messages } from '@/i18n/getMessages';

type Props = { t: Messages['catalog'] };

/**
 * Equipment showcase: every item is displayed as-is. No search, filters,
 * categories or sort — this is a gallery, not a browsable catalogue.
 */
export default function Catalog({ t }: Props) {
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const requestCount = Object.values(added).filter(Boolean).length;
  const toggle = (id: string) => setAdded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="echipamente" className="sec divide">
      <div className="container-vl">
        <div className="cat-top">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {t.eyebrow}
            </div>
            <h2 className="h2" style={{ marginTop: 20, fontSize: 'clamp(36px,4vw,60px)' }}>
              {t.title}
            </h2>
          </div>
          <div
            className="mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              fontSize: 13,
              letterSpacing: '.04em',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              padding: '12px 16px',
              borderRadius: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {t.requestListLabel} <span style={{ color: 'var(--accent)' }}>{requestCount}</span>
          </div>
        </div>

        <div className="cards3" style={{ marginTop: 44 }}>
          {t.products.map((p) => {
            const isAdded = !!added[p.id];
            const dotColor = p.lowStock ? '#8A6A34' : '#2FBF71';
            return (
              <div className="pcard" key={p.id}>
                <div className="ph" style={{ height: 170 }}>
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
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 11,
                      fontSize: 10,
                      letterSpacing: '.06em',
                      color: dotColor,
                      border: '1px solid var(--border)',
                      background: 'rgba(17,17,16,0.6)',
                      padding: '4px 8px',
                      borderRadius: 2,
                    }}
                  >
                    {p.stock} {t.unitLabel}
                  </span>
                </div>
                <div
                  style={{
                    padding: '20px 20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                      }}
                    >
                      {p.producer}
                    </span>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: '.05em', color: '#57544C' }}>
                      {p.categoryLabel}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--d)',
                      fontWeight: 600,
                      fontSize: 20,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: 'var(--text)',
                      margin: '8px 0 0',
                    }}
                  >
                    {p.model}
                  </h3>
                  <div style={{ marginTop: 16 }}>
                    {p.specs.map((spec) => (
                      <div className="kv" key={spec.k}>
                        <span style={{ color: 'var(--muted)' }}>{spec.k}</span>
                        <span style={{ color: 'var(--text)' }}>{spec.v}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mono"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 16,
                      fontSize: 12,
                      color: 'var(--muted)',
                    }}
                  >
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor }} />
                    {t.inStockLabel} <span style={{ color: 'var(--text)' }}>{p.stock}</span> {t.unitLabel}
                    {p.lowStock ? t.lowStockNote : ''}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 'auto',
                      paddingTop: 18,
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    <a href="#configurator" className="slink">
                      {t.detailsLabel} <span className="arw">→</span>
                    </a>
                    <button
                      onClick={() => toggle(p.id)}
                      className="add"
                      style={{ borderColor: isAdded ? '#D6A94B' : 'rgba(255,255,255,0.10)' }}
                      aria-pressed={isAdded}
                    >
                      {isAdded ? (
                        <span style={{ color: 'var(--accent)' }}>{t.addedLabel}</span>
                      ) : (
                        <span>{t.addLabel}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
