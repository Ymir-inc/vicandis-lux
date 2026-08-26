import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const strokeDefaults = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function Icon({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...strokeDefaults} {...rest}>
      {children}
    </svg>
  );
}

/* ---------- service icons, keyed by `services.items[].key` ---------- */

const SERVICE_PATHS: Record<string, string[]> = {
  interpretation: [
    'M3 18v-6a9 9 0 0 1 18 0v6',
    'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z',
    'M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
  ],
  sound: ['M11 5 6 9H2v6h4l5 4z', 'M19.07 4.93a10 10 0 0 1 0 14.14', 'M15.54 8.46a5 5 0 0 1 0 7.07'],
  hybrid: [
    'M4.93 19.07a10 10 0 0 1 0-14.14',
    'M7.76 16.24a6 6 0 0 1 0-8.48',
    'M16.24 7.76a6 6 0 0 1 0 8.48',
    'M19.07 4.93a10 10 0 0 1 0 14.14',
  ],
  video: ['M2 3h20v14H2z', 'M8 21h8', 'M12 17v4'],
  support: ['M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6'],
  tourguide: [
    'M5 12.55a11 11 0 0 1 14.08 0',
    'M1.42 9a16 16 0 0 1 21.16 0',
    'M8.53 16.11a6 6 0 0 1 6.95 0',
    'M12 20h.01',
  ],
};

export function ServiceIcon({ name }: { name: string }) {
  const paths = SERVICE_PATHS[name] ?? [];
  return (
    <svg
      className="ico"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/* ---------- contact channel icons, keyed by `contactChannels[].key` ---------- */

const CHANNEL_PATHS: Record<string, string[]> = {
  phone: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  ],
  viber: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  telegram: ['M22 2 11 13', 'M22 2 15 22 11 13 2 9 22 2z'],
  whatsapp: [
    'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z',
  ],
};

export function ChannelIcon({ name, size = 20, stroke }: { name: string; size?: number; stroke: string }) {
  const paths = CHANNEL_PATHS[name] ?? [];
  return (
    <Icon size={size} stroke={stroke} strokeWidth="1.5" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </Icon>
  );
}

/* ---------- one-off icons ---------- */

export function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <Icon size={size} stroke="#F7F5F0" strokeWidth="1.6" strokeLinejoin={undefined} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}

export function SearchIcon() {
  return (
    <Icon size={16} stroke="#8E8A80" strokeWidth="1.6" strokeLinejoin={undefined} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  );
}

export function FilterIcon() {
  return (
    <Icon
      size={14}
      stroke="#D6A94B"
      strokeWidth="1.6"
      strokeLinejoin={undefined}
      style={{ marginRight: 7 }}
      aria-hidden="true"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </Icon>
  );
}

export function ShieldCheckIcon() {
  return (
    <Icon size={14} stroke="#D6A94B" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function CheckIcon({ size = 14, stroke = '#D6A94B', strokeWidth = '1.6' }: {
  size?: number;
  stroke?: string;
  strokeWidth?: string;
}) {
  return (
    <Icon size={size} stroke={stroke} strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

export function DatasheetIcon() {
  return (
    <Icon className="di" size={15} stroke="#8E8A80" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </Icon>
  );
}

export function DownloadIcon() {
  return (
    <Icon size={14} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
    </Icon>
  );
}

export function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8E8A80"
      strokeWidth="1.6"
      style={{ flex: 'none', marginTop: 1 }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" strokeLinecap="round" />
    </svg>
  );
}
