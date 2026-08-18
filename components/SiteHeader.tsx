'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { localeLabels, locales, type Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/getMessages';
import { ChannelIcon, CloseIcon } from './icons';

type Props = {
  locale: Locale;
  nav: Messages['nav'];
  channels: Messages['contactChannels'];
};

function LangSwitcher({
  locale,
  label,
  style,
}: {
  locale: Locale;
  label: string;
  /** `.lang` is hidden below 1100px; the drawer re-shows it inline. */
  style?: React.CSSProperties;
}) {
  return (
    <div className="lang" aria-label={label} style={style}>
      {locales.map((l, i) => (
        <span key={l} style={{ display: 'contents' }}>
          {i > 0 && <span style={{ color: 'var(--border)' }}>/</span>}
          <Link
            href={`/${l}/`}
            className={l === locale ? 'on' : undefined}
            hrefLang={l}
            aria-current={l === locale ? 'true' : undefined}
          >
            {localeLabels[l]}
          </Link>
        </span>
      ))}
    </div>
  );
}

function Brand({ onClick, style }: { onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <a href="#acasa" className="brand" onClick={onClick} style={style}>
      <span className="dot" />
      VICANDIS<b>LUX</b>
    </a>
  );
}

export default function SiteHeader({ locale, nav, channels }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // A full-screen opaque drawer should not leave the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  return (
    <>
      <header className="hdr">
        <div className="container-vl hdr-in">
          <Brand />
          <nav className="nav">
            {nav.links.map((link) => (
              <a key={link.href + link.label} href={link.href} className="navlink">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hdr-right">
            <LangSwitcher locale={locale} label={nav.languageSwitcher} />
            <a href="#configurator" className="cta-sm">
              {nav.cta}
            </a>
            <button
              className="burger"
              aria-label={nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" style={{ display: open ? 'flex' : 'none' }} role="dialog" aria-modal="true">
        <div className="drawer-head">
          <Brand onClick={close} />
          <button className="xbtn" aria-label={nav.closeMenu} onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <nav className="drawer-nav">
          {nav.links.map((link) => (
            <a key={link.href + link.label} href={link.href} className="mlink" onClick={close}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="drawer-foot">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <LangSwitcher locale={locale} label={nav.languageSwitcher} style={{ display: 'flex' }} />
            <a href="#configurator" className="cta-sm" onClick={close}>
              {nav.cta}
            </a>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 10,
            }}
          >
            {nav.directContact}
          </div>
          <div className="contact4">
            {channels.map((c) => (
              <a key={c.key} href={c.href}>
                <ChannelIcon name={c.key} stroke="#C6FF3A" />
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
