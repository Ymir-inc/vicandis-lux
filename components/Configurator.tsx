'use client';

import { useMemo, useState } from 'react';
import type { Messages } from '@/i18n/getMessages';
import {
  emptyAnswers,
  estimate,
  type ConfiguratorAnswers,
  type ConfiguratorField,
} from '@/lib/estimate';
import { CheckIcon, InfoIcon } from './icons';

const ACCENT = '#C6FF3A';
const BORDER = 'rgba(255,255,255,0.10)';
const TEXT = '#EDEBE4';
const SOFT = '#C9C6BC';
const MUTED = '#8C897E';

/** Index of the recap step, which sits after the five question steps. */
const SUMMARY_STEP = 5;

type Props = { t: Messages['configurator']; numberLocale: string };

export default function Configurator({ t, numberLocale }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ConfiguratorAnswers>(emptyAnswers);
  const [sent, setSent] = useState(false);

  const format = useMemo(() => new Intl.NumberFormat(numberLocale), [numberLocale]);
  const { low, high } = estimate(answers);
  const isSummary = step === SUMMARY_STEP;
  const current = t.steps[Math.min(step, t.steps.length - 1)];

  const pick = (field: string, key: string) =>
    setAnswers((prev) => ({ ...prev, [field as ConfiguratorField]: key }));

  const recap = t.steps.map((s) => {
    const chosen = s.options.find((o) => o.key === answers[s.field as ConfiguratorField]);
    return {
      k: t.recapLabels[s.field as keyof typeof t.recapLabels],
      v: chosen?.recap || t.recapEmpty,
    };
  });

  return (
    <section id="configurator" className="sec divide">
      <div className="container-vl">
        <div className="sec-head" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {t.eyebrow}
            </div>
            <h2 className="h2" style={{ marginTop: 22, fontSize: 'clamp(34px,4vw,56px)' }}>
              {t.title}
            </h2>
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, letterSpacing: '.06em', color: 'var(--muted)', textAlign: 'right' }}
          >
            {t.note}
          </div>
        </div>

        <div className="cfg">
          <div className="cfg-side">
            <div className="eyebrow" style={{ fontSize: 11 }}>
              <span className="dot" />
              {t.sidebarEyebrow}
            </div>
            <p className="lede" style={{ fontSize: 13, margin: '14px 0 0' }}>
              {t.sidebarLede}
            </p>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {t.navLabels.map((label, i) => {
                const isCurrent = i === step;
                const isDone = i < step;
                return (
                  <button
                    key={label}
                    className="cfg-navbtn"
                    onClick={() => setStep(i)}
                    aria-current={isCurrent ? 'step' : undefined}
                    style={{
                      background: isCurrent ? 'rgba(198,255,58,0.07)' : 'transparent',
                      borderLeftColor: isCurrent ? ACCENT : 'transparent',
                    }}
                  >
                    <span
                      style={{
                        flex: 'none',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `1px solid ${isCurrent || isDone ? ACCENT : BORDER}`,
                        background: isDone ? ACCENT : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--m)',
                        fontSize: 10,
                        color: isDone ? '#111110' : isCurrent ? ACCENT : MUTED,
                      }}
                    >
                      {isDone ? '✓' : i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: isCurrent ? TEXT : isDone ? SOFT : MUTED }}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                {t.estimateLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <span
                  style={{
                    fontFamily: 'var(--d)',
                    fontWeight: 600,
                    fontSize: 34,
                    letterSpacing: '-0.02em',
                    color: 'var(--accent)',
                  }}
                >
                  € {format.format(low)}
                </span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
                  – {format.format(high)}
                </span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--faint)', marginTop: 6 }}>
                {t.estimateFootnote}
              </div>
            </div>
          </div>

          <div className="cfg-body">
            <div className="cfg-main">
              {sent ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '40px 0',
                    minHeight: 360,
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: 58,
                      border: '1px solid var(--accent)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckIcon size={26} strokeWidth="1.8" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--d)',
                      fontWeight: 600,
                      fontSize: 26,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                      margin: '24px 0 0',
                    }}
                  >
                    {t.sent.title}
                  </h3>
                  <p className="lede" style={{ fontSize: 14.5, margin: '12px 0 0', maxWidth: 340 }}>
                    {t.sent.desc}
                  </p>
                  <div
                    className="mono"
                    style={{
                      fontSize: 12,
                      color: 'var(--faint)',
                      marginTop: 22,
                      border: '1px solid var(--border)',
                      borderRadius: 2,
                      padding: '10px 16px',
                    }}
                  >
                    {t.sent.reference}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                    }}
                  >
                    {isSummary ? t.summaryEyebrow : current.eyebrow}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--d)',
                      fontWeight: 600,
                      fontSize: 'clamp(24px,2.4vw,30px)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: 'var(--text)',
                      margin: '14px 0 0',
                    }}
                  >
                    {isSummary ? t.summaryTitle : current.title}
                  </h3>
                  <p className="lede" style={{ fontSize: 14.5, margin: '12px 0 26px' }}>
                    {isSummary ? t.summaryDesc : current.desc}
                  </p>

                  {!isSummary && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {current.options.map((o) => {
                        const on = answers[current.field as ConfiguratorField] === o.key;
                        return (
                          <button
                            key={o.key}
                            className={`opt${on ? ' on' : ''}`}
                            onClick={() => pick(current.field, o.key)}
                            aria-pressed={on}
                          >
                            <span className="radio">
                              <i />
                            </span>
                            <span style={{ flex: 1 }}>
                              <span style={{ display: 'block', fontSize: 15.5, color: on ? TEXT : SOFT }}>
                                {o.label}
                              </span>
                              {o.desc && (
                                <span
                                  className="mono"
                                  style={{
                                    display: 'block',
                                    fontSize: 11,
                                    letterSpacing: '.03em',
                                    color: 'var(--muted)',
                                    marginTop: 4,
                                  }}
                                >
                                  {o.desc}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isSummary && (
                    <div
                      style={{
                        border: '1px solid var(--accent)',
                        borderRadius: 3,
                        marginTop: 8,
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ padding: '20px 20px 6px' }}>
                        <div
                          className="mono"
                          style={{
                            fontSize: 11,
                            letterSpacing: '.12em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                          }}
                        >
                          {t.estimateLabel}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 10,
                            marginTop: 12,
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--d)',
                              fontWeight: 700,
                              fontSize: 'clamp(40px,4vw,48px)',
                              letterSpacing: '-0.03em',
                              color: 'var(--accent)',
                              lineHeight: 1,
                            }}
                          >
                            € {format.format(low)}
                          </span>
                          <span className="mono" style={{ fontSize: 15, color: 'var(--soft)' }}>
                            – € {format.format(high)}
                          </span>
                        </div>
                      </div>
                      <div style={{ padding: '14px 20px 4px' }}>
                        {recap.map((r) => (
                          <div
                            key={r.k}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                              padding: '10px 0',
                              borderTop: '1px solid var(--border)',
                              fontFamily: 'var(--m)',
                              fontSize: 12.5,
                            }}
                          >
                            <span style={{ color: 'var(--muted)' }}>{r.k}</span>
                            <span style={{ color: 'var(--text)', textAlign: 'right' }}>{r.v}</span>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                          background: 'var(--surface)',
                          borderTop: '1px solid var(--border)',
                          padding: '14px 20px',
                          marginTop: 12,
                        }}
                      >
                        <InfoIcon />
                        <span className="lede" style={{ fontSize: 12.5 }}>
                          {t.estimateDisclaimer}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {!sent && (
              <div className="cfg-nav">
                <button
                  className="cfg-back"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  style={{ display: step === 0 ? 'none' : 'inline-flex' }}
                >
                  {t.backLabel}
                </button>
                <div style={{ flex: 1 }} />
                <button
                  className="btn btn-solid"
                  style={{ minWidth: 180 }}
                  onClick={() =>
                    isSummary ? setSent(true) : setStep((s) => Math.min(SUMMARY_STEP, s + 1))
                  }
                >
                  {isSummary ? t.submitLabel : t.nextLabel} <span>{isSummary ? '↗' : '→'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
