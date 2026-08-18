'use client';

import { useState } from 'react';
import type { Messages } from '@/i18n/getMessages';
import { CheckIcon, DatasheetIcon, ShieldCheckIcon } from './icons';

const badgeStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 11.5,
  letterSpacing: '.06em',
  color: 'var(--soft)',
  border: '1px solid var(--border)',
  padding: '8px 12px',
  borderRadius: 2,
};

const metaLabelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

export default function ProductDetail({ t }: { t: Messages['product'] }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [added, setAdded] = useState(false);

  return (
    <section id="produs" className="sec divide">
      <div className="container-vl">
        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: '.05em',
            color: 'var(--muted)',
            display: 'flex',
            gap: 9,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {t.breadcrumb.map((crumb) => (
            <span key={crumb.href} style={{ display: 'contents' }}>
              <a href={crumb.href} style={{ color: 'var(--muted)' }}>
                {crumb.label}
              </a>
              <span style={{ color: '#3E3D38' }}>/</span>
            </span>
          ))}
          <span style={{ color: 'var(--text)' }}>{t.breadcrumbCurrent}</span>
        </div>

        <div className="pd-grid" style={{ marginTop: 36 }}>
          <div>
            <div className="gallery-main">
              <span
                className="mono"
                style={{
                  position: 'absolute',
                  left: 18,
                  top: 16,
                  fontSize: 11,
                  letterSpacing: '.12em',
                  color: 'var(--muted)',
                }}
              >
                {t.figLabel}
              </span>
              <span
                className="mono"
                style={{ fontSize: 13, letterSpacing: '.1em', color: 'var(--muted)' }}
              >
                {t.gallery[galleryIndex].label}
              </span>
            </div>
            <div className="thumbs">
              {t.gallery.map((view, i) => (
                <button
                  key={view.label}
                  className="thumb"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={view.label}
                  aria-pressed={galleryIndex === i}
                  style={{
                    border: `1px solid ${galleryIndex === i ? '#C6FF3A' : 'rgba(255,255,255,0.10)'}`,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      position: 'absolute',
                      left: 9,
                      top: 8,
                      fontSize: 9,
                      letterSpacing: '.08em',
                      color: 'var(--muted)',
                    }}
                  >
                    {view.short}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div
              className="mono"
              style={{
                fontSize: 12,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {t.kicker}
            </div>
            <h2
              className="h1"
              style={{
                fontSize: 'clamp(30px,3.4vw,46px)',
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
                margin: '16px 0 0',
              }}
            >
              {t.title}
            </h2>
            <p className="lede" style={{ fontSize: 16, margin: '20px 0 0', maxWidth: 480 }}>
              {t.lede}
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {t.badges.map((badge) => (
                <span className="mono" style={badgeStyle} key={badge.key}>
                  {badge.key === 'shield' ? <ShieldCheckIcon /> : <CheckIcon />}
                  {badge.label}
                </span>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 44,
                marginTop: 32,
                padding: '24px 0',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div className="mono" style={metaLabelStyle}>
                  {t.availabilityLabel}
                </div>
                <div
                  className="mono"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    marginTop: 12,
                    fontSize: 16,
                    color: 'var(--text)',
                  }}
                >
                  <span
                    style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}
                  />
                  {t.availabilityValue}
                </div>
              </div>
              <div>
                <div className="mono" style={metaLabelStyle}>
                  {t.rateLabel}
                </div>
                <div className="mono" style={{ marginTop: 12, fontSize: 16, color: 'var(--accent)' }}>
                  {t.rateValue}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              <button onClick={() => setAdded((v) => !v)} className="btn btn-solid" aria-pressed={added}>
                {added ? t.addedLabel : t.addLabel}
              </button>
              <a href="#configurator" className="btn btn-ghost">
                {t.quickQuote}
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64, border: '1px solid var(--border)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
              padding: '24px 32px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
              <span
                className="mono"
                style={{
                  fontSize: 13,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                }}
              >
                {t.specsTitle}
              </span>
              <span
                className="mono"
                style={{ fontSize: 12, letterSpacing: '.06em', color: 'var(--muted)' }}
              >
                {t.specsSubtitle}
              </span>
            </div>
            <a href="#" className="dl">
              <DatasheetIcon />
              {t.datasheet}
            </a>
          </div>

          <div className="spec-table">
            {t.specs.map((spec, i) => (
              <div
                className="spec-row"
                key={spec.k}
                style={{ borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}
              >
                <span style={{ fontSize: 15, color: 'var(--muted)' }}>{spec.k}</span>
                <span
                  className="mono"
                  style={{
                    fontSize: 15,
                    letterSpacing: '-0.01em',
                    color: spec.highlight ? 'var(--accent)' : 'var(--text)',
                    textAlign: 'right',
                  }}
                >
                  {spec.v}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: '.08em',
              color: 'var(--muted)',
              padding: '16px 32px',
              borderTop: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            {t.specsFootnote}
          </div>
        </div>
      </div>
    </section>
  );
}
