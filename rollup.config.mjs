import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { readdirSync } from 'node:fs';
import { dts } from 'rollup-plugin-dts';

const packages = readdirSync('packages');

let config = [];

packages.map((pkg) => {
  const input = `packages/${pkg}/src/index.ts`;
  config.push(
    {
      input,
      output: [{ file: `dist/${pkg}/index.d.ts`, format: 'es' }],
      plugins: [dts()],
    },
    {
      input,
      output: [{ file: `dist/${pkg}/index.es.js`, format: 'es' }],
      plugins: [terser(), typescript()],
    }
  );
});
export default config;
