import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'out/**', 'vicandislux-design-system/**', 'public/**'] },
  ...coreWebVitals,
  ...typescript,
];

export default config;
