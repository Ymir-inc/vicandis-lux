import type { ReactNode } from 'react';

/**
 * Next requires a root layout, but `<html>` / `<body>` live in
 * `app/[locale]/layout.tsx` so the `lang` attribute can follow the locale.
 * Nothing renders directly under this layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
