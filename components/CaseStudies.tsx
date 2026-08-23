'use client';

import { useCallback, useRef, useState } from 'react';
import type { Messages } from '@/i18n/getMessages';
import { BASE_PATH } from '@/i18n/site';

const COUNT = 8;
const photos = Array.from(
  { length: COUNT },
  (_, i) => `${BASE_PATH}/projects/proiect-${String(i + 1).padStart(2, '0')}.jpg`,
);

export default function CaseStudies({ t }: { t: Messages['cases'] }) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const prev = useCallback(() => setActive((p) => (p - 1 + COUNT) % COUNT), []);
  const next = useCallback(() => setActive((p) => (p + 1) % COUNT), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
    [prev, next],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    startX.current = null;
  };

  return (
    <section id="studii" className="sec divide">
      <div className="container-vl">
        <div className="sec-head" style={{ marginBottom: 40 }}>
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

        <div
          className="carousel"
          role="group"
          aria-roledescription="carousel"
          aria-label={t.title}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="carousel-stage"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {photos.map((src, i) => (
                <div
                  className="carousel-slide"
                  key={src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${COUNT}`}
                  aria-hidden={i !== active}
                >
                  <img
                    src={src}
                    alt={`${t.photoAlt} (${i + 1}/${COUNT})`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <button className="carousel-nav prev" onClick={prev} aria-label={t.prevLabel}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="carousel-nav next" onClick={next} aria-label={t.nextLabel}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <div className="carousel-count mono">
              {active + 1} / {COUNT}
            </div>
          </div>

          <div className="carousel-dots" role="tablist" aria-label={t.title}>
            {photos.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === active ? ' on' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <a href="#contact" className="btn btn-ghost">
            {t.ctaAll}
          </a>
        </div>
      </div>
    </section>
  );
}
