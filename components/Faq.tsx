'use client';

import { useId, useState } from 'react';
import type { Messages } from '@/i18n/getMessages';

export default function Faq({ t }: { t: Messages['faq'] }) {
  // The design opens the first question by default.
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const baseId = useId();

  const toggle = (i: number) => setOpen((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section id="faq" className="sec divide">
      <div className="container-vl faq-grid">
        <div style={{ position: 'sticky', top: 100 }}>
          <div className="eyebrow">
            <span className="dot" />
            {t.eyebrow}
          </div>
          <h2 className="h2" style={{ marginTop: 22, fontSize: 'clamp(30px,3.4vw,52px)' }}>
            {t.title}
          </h2>
          <p className="lede" style={{ fontSize: 15, marginTop: 22, maxWidth: 300 }}>
            {t.lede}
          </p>
        </div>

        <div>
          {t.items.map((f, i) => {
            const isOpen = !!open[i];
            const panelId = `${baseId}-faq-${i}`;
            return (
              <div
                key={f.q}
                style={{
                  borderBottom: i === t.items.length - 1 ? '1px solid rgba(255,255,255,0.10)' : 'none',
                }}
              >
                <button
                  className="faq-q"
                  id={`${panelId}-label`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="q">{f.q}</span>
                  <span className="pl" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </button>
                <div
                  className="faq-body"
                  id={panelId}
                  role="region"
                  aria-labelledby={`${panelId}-label`}
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div style={{ opacity: isOpen ? 1 : 0 }}>
                    <p
                      className="lede"
                      style={{ fontSize: 16, lineHeight: 1.62, margin: '0 0 28px', maxWidth: 680 }}
                    >
                      {f.a}
                    </p>
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
