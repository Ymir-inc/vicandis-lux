import type { Messages } from '@/i18n/getMessages';
import type { Locale } from '@/i18n/config';
import { BASE_PATH } from '@/i18n/site';

const columnTitleStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 20,
};

/** Hosts whose links are pages to read, not conversations to start. */
const OFFSITE_PROFILE_HOSTS = ['facebook.com', 'instagram.com'];

const isOffsiteProfile = (href: string) => {
  if (!href.startsWith('https://')) return false;
  const { hostname } = new URL(href);
  return OFFSITE_PROFILE_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
};

/**
 * Attributes for a footer social entry.
 *
 * Only the profile hosts above are off-site reading: they open in a new tab so
 * the visitor keeps their place. Everything else is treated as an app hand-off
 * — `viber://`, `wa.me`, and any click-to-chat added later (`t.me`, `m.me`) —
 * and stays in the current tab, matching MobileContactBar: the browser passes
 * the intent to the OS and the site is still underneath on return, where
 * `target="_blank"` would strand a blank tab. The scheme cannot decide this,
 * because click-to-chat is served over https too. New entries default to the
 * hand-off behaviour; list a host above only when it is a page to read.
 */
const socialLinkProps = (href: string) =>
  isOffsiteProfile(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

export default function SiteFooter({
  t,
  locale,
}: {
  t: Messages['footer'];
  locale: Locale;
}) {
  return (
    <footer className="foot">
      <div className="foot-spine" />
      <div className="container-vl">
        <div className="foot-grid">
          <div>
            <a href="#acasa" className="brand" style={{ marginBottom: 20 }}>
              <img
                src={`${BASE_PATH}/brand/vicandislux-logo.webp`}
                alt="VicandisLux"
                style={{ height: 76, width: 'auto', display: 'block' }}
              />
            </a>
            <p className="lede" style={{ fontSize: 14.5, color: 'var(--muted)', maxWidth: 340 }}>
              {t.desc}
            </p>
            <div
              className="foot-social"
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 26,
                fontFamily: 'var(--m)',
                fontSize: 12,
                letterSpacing: '.06em',
              }}
            >
              {t.social.map((s) => (
                <a key={s.label} href={s.href} className="flink" {...socialLinkProps(s.href)}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {t.columns.map((col) => (
            <div key={col.title}>
              <div className="mono" style={columnTitleStyle}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, fontSize: 14.5 }}>
                {col.links.map((link) => (
                  <a key={link.label} href={link.href} className="flink">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div className="mono" style={columnTitleStyle}>
              {t.contactTitle}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
                fontFamily: 'var(--m)',
                fontSize: 13.5,
              }}
            >
              <a href={t.phoneHref} className="flink" style={{ color: 'var(--text)' }}>
                {t.phone}
              </a>
              <a href={`mailto:${t.email}`} className="flink" style={{ color: 'var(--accent)' }}>
                {t.email}
              </a>
              <span style={{ color: 'var(--muted)', lineHeight: 1.55 }}>
                {t.addressLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < t.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="mono" style={{ fontSize: 11.5, letterSpacing: '.05em', color: 'var(--muted)' }}>
            {t.legalLine}
          </div>
          <div
            className="mono"
            style={{
              display: 'flex',
              gap: 20,
              fontSize: 11.5,
              color: 'var(--muted)',
              flexWrap: 'wrap',
            }}
          >
            {t.legalLinks.map((link) => (
              <a
                key={link.label}
                href={`${BASE_PATH}/${locale}/${link.href}/`}
                className="flink"
              >
                {link.label}
              </a>
            ))}
            <span>{t.copyright}</span>
            <span
              className="powered-by"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
            >
              Powered by
              <img
                src={`${BASE_PATH}/brand/mimir.png`}
                alt="Mimir"
                width={16}
                height={16}
                style={{ display: 'block', borderRadius: '50%' }}
              />
              <span style={{ color: 'var(--soft)' }}>Mimir</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
