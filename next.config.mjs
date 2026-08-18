/**
 * `NEXT_PUBLIC_BASE_PATH` is set only for the throwaway GitHub Pages preview,
 * which serves from `/<repo>/` rather than a domain root. A real deployment
 * leaves it unset and behaves exactly as before.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is fully static — no server runtime, no API routes.
  // `next build` emits a deployable `out/` directory.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
