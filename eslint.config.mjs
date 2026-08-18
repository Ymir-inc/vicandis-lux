import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      '.deploy/**', // throwaway GitHub Pages checkout — build output, not source
      'vicandislux-design-system/**',
      'public/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
