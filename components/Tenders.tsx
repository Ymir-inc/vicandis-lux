import type { Messages } from '@/i18n/getMessages';
import { CheckIcon, DownloadIcon } from './icons';

const MONO = "var(--m)";
const BODY = "var(--b)";

const blockEyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
};

const blockTitle: React.CSSProperties = {
  fontFamily: 'var(--d)',
  fontWeight: 600,
  fontSize: 30,
  letterSpacing: '-0.02em',
  lineHeight: 1.08,
  margin: '16px 0 12px',
  color: 'var(--text)',
};

const columnHead: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

function BlockIntro({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div>
      <div className="mono" style={blockEyebrow}>
        {eyebrow}
      </div>
      <h3 style={blockTitle}>{title}</h3>
      <p className="lede" style={{ fontSize: 14.5, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}

export default function Tenders({ t }: { t: Messages['tenders'] }) {
  return (
    <section
      id="licitatii"
      className="sec divide"
      style={{ background: 'linear-gradient(180deg,rgba(198,255,58,0.02),transparent 40%)' }}
    >
      <div className="container-vl">
        <div className="eyebrow">
          <span className="dot" />
          {t.eyebrow}
        </div>
        <h2
          className="h2"
          style={{
            marginTop: 28,
            fontSize: 'clamp(34px,4vw,58px)',
            maxWidth: 900,
            textWrap: 'balance',
          }}
        >
          {t.title}
        </h2>
        <p className="lede" style={{ fontSize: 'clamp(16px,1.5vw,19px)', marginTop: 22, maxWidth: 760 }}>
          {t.lede}
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
          {t.assurances.map((a) => (
            <div
              key={a}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                borderRadius: 2,
                padding: '12px 16px',
              }}
            >
              <CheckIcon size={16} strokeWidth="1.7" />
              <span className="mono" style={{ fontSize: 12.5, letterSpacing: '.03em', color: 'var(--soft)' }}>
                {a}
              </span>
            </div>
          ))}
        </div>

        {/* 02 — identification */}
        <div
          className="lic-row"
          style={{ marginTop: 64, paddingTop: 56, borderTop: '1px solid var(--border)' }}
        >
          <BlockIntro {...t.identification} />
          <div className="idtable">
            {t.identification.rows.map((row, i) => (
              <div
                className="idrow"
                key={row.k}
                style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent' }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  {row.k}
                </span>
                <span
                  style={{
                    fontFamily: row.mono ? MONO : BODY,
                    fontSize: 15,
                    color: row.accent ? 'var(--accent)' : 'var(--text)',
                    letterSpacing: row.mono ? '0.02em' : 'normal',
                  }}
                >
                  {row.v}
                </span>
                <span />
              </div>
            ))}
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '.06em',
                color: 'var(--muted)',
                padding: '14px 26px',
                background: 'var(--surface)',
              }}
            >
              {t.identification.footnote}
            </div>
          </div>
        </div>

        {/* 03 — documents */}
        <div
          className="lic-row"
          style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--border)' }}
        >
          <BlockIntro {...t.documents} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {t.documents.items.map((doc) => (
              <a href="#" className="docrow" key={doc.title}>
                <span
                  style={{
                    flex: 'none',
                    width: 44,
                    height: 52,
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: 7,
                    background: 'var(--surface2)',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      background: 'var(--base)',
                      borderLeft: '1px solid var(--border)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  />
                  <span className="mono" style={{ fontSize: 8.5, letterSpacing: '.06em', color: 'var(--muted)' }}>
                    PDF
                  </span>
                </span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--d)',
                      fontWeight: 500,
                      fontSize: 18,
                      letterSpacing: '-0.01em',
                      color: 'var(--text)',
                    }}
                  >
                    {doc.title}
                  </span>
                  <span
                    className="mono doc-meta"
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'center',
                      marginTop: 6,
                      fontSize: 11.5,
                      letterSpacing: '.03em',
                      color: 'var(--muted)',
                    }}
                  >
                    <span>
                      {t.documents.updatedPrefix} {doc.date}
                    </span>
                    <span style={{ color: 'var(--faint)' }}>·</span>
                    <span>{doc.meta}</span>
                  </span>
                </span>
                <span className="dlb">
                  {t.documents.downloadLabel} <DownloadIcon />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 04 — references */}
        <div
          className="lic-row"
          style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--border)' }}
        >
          <BlockIntro {...t.references} />
          <div className="idtable">
            <div className="exp-row exp-head" style={{ background: 'var(--surface)' }}>
              <span className="mono" style={columnHead}>
                {t.references.columns.year}
              </span>
              <span className="mono" style={columnHead}>
                {t.references.columns.client}
              </span>
              <span className="mono" style={columnHead}>
                {t.references.columns.service}
              </span>
              <span className="mono" style={{ ...columnHead, textAlign: 'right' }}>
                {t.references.columns.scale}
              </span>
            </div>
            {t.references.items.map((p) => (
              <div className="exp-row" key={`${p.year}-${p.client}`}>
                <span className="mono" style={{ fontSize: 13, color: 'var(--accent)' }}>
                  <span className="exp-lbl">{t.references.columns.year} · </span>
                  {p.year}
                </span>
                <span style={{ fontSize: 14.5, color: 'var(--text)' }}>{p.client}</span>
                <span style={{ fontSize: 13.5, color: 'var(--soft)' }}>{p.service}</span>
                <span className="mono" style={{ fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>
                  {p.scale}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
