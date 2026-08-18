'use client';

import { useMemo, useState } from 'react';
import type { Messages } from '@/i18n/getMessages';
import { FilterIcon, SearchIcon, CloseIcon } from './icons';

type Props = { t: Messages['catalog'] };

const ALL = 'all';

export default function Catalog({ t }: Props) {
  const [category, setCategory] = useState(ALL);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shown = useMemo(
    () => t.products.filter((p) => category === ALL || p.categoryKey === category),
    [t.products, category],
  );

  const requestCount = Object.values(added).filter(Boolean).length;
  const toggle = (id: string) => setAdded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div className="search">
                <SearchIcon />
                <input type="text" placeholder={t.searchPlaceholder} aria-label={t.searchLabel} />
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
          </div>

          <div
            className="chips"
            style={{ marginTop: 36, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}
          >
            {t.categories.map((c) => (
              <button
                key={c.key}
                className={`chip${category === c.key ? ' on' : ''}`}
                onClick={() => setCategory(c.key)}
                aria-pressed={category === c.key}
              >
                {c.label}
              </button>
            ))}
            <button
              className="chip filt-btn"
              onClick={() => setFiltersOpen(true)}
              style={{ color: 'var(--text)' }}
            >
              <FilterIcon />
              {t.filtersButton}
            </button>
          </div>

          <div className="cat-body" style={{ marginTop: 36 }}>
            <aside className="cat-side">
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {t.filtersLabel}
              </div>
              {t.filterGroups.map((group, gi) => (
                <div
                  className="fgroup"
                  key={group.key}
                  style={gi === t.filterGroups.length - 1 ? { borderBottom: 'none' } : undefined}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'var(--soft)',
                      marginBottom: 16,
                    }}
                  >
                    {group.label}
                  </div>
                  {group.options.map((opt) => (
                    <label className="flabel" key={opt.key}>
                      <input
                        type={group.type === 'checkbox' ? 'checkbox' : 'radio'}
                        name={group.type === 'radio' ? group.key : undefined}
                        style={{ width: 15, height: 15 }}
                      />
                      <span>
                        {opt.label}
                        {opt.count && <span style={{ color: '#57544C' }}> ({opt.count})</span>}
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </aside>

            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 22,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: 13, letterSpacing: '.04em', color: 'var(--muted)' }}
                  aria-live="polite"
                >
                  <span style={{ color: 'var(--text)' }}>{shown.length}</span> {t.countSuffix}
                </div>
                <div className="mono" style={{ fontSize: 13, letterSpacing: '.04em', color: 'var(--muted)' }}>
                  {t.sortLabel} <span style={{ color: 'var(--text)' }}>{t.sortValue}</span>
                </div>
              </div>

              <div className="cards3" style={{ marginTop: 24 }}>
                {shown.map((p) => {
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
                          <span
                            className="mono"
                            style={{ fontSize: 10, letterSpacing: '.05em', color: '#57544C' }}
                          >
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
                          <span
                            style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor }}
                          />
                          {t.inStockLabel} <span style={{ color: 'var(--text)' }}>{p.stock}</span>{' '}
                          {t.unitLabel}
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
          </div>
        </div>
      </section>

      {/* mobile category filter drawer */}
      <div
        className="drawer"
        style={{
          display: filtersOpen ? 'flex' : 'none',
          background: 'rgba(12,12,11,0.6)',
          justifyContent: 'flex-end',
        }}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{
            background: 'var(--base)',
            borderTop: '1px solid var(--border)',
            maxHeight: '88%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 22px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--text)',
              }}
            >
              {t.filtersDrawerTitle}
            </span>
            <button className="xbtn" onClick={() => setFiltersOpen(false)} aria-label={t.filtersLabel}>
              <CloseIcon size={16} />
            </button>
          </div>
          <div
            style={{
              overflowY: 'auto',
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 9,
            }}
          >
            {t.categories.map((c) => (
              <button
                key={c.key}
                className={`chip${category === c.key ? ' on' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', textAlign: 'left' }}
                onClick={() => {
                  setCategory(c.key);
                  setFiltersOpen(false);
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ padding: '16px 22px 22px', borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-solid" style={{ width: '100%' }} onClick={() => setFiltersOpen(false)}>
              {t.showResults} ({shown.length})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
