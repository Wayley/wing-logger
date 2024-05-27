import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import { builtinModules } from 'module';
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const name = pkg.name.replaceAll(/-|\./g, '_');

const output = ['amd', 'cjs', 'es', 'iife', 'umd', 'system'].map((format) => ({ format, file: `dist/index.${format}.js`, name }));

export default {
  input: 'src/index.ts',
  output: [{ file: `dist/index.js` }, ...output],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {}), ...builtinModules],
  onwarn: (warning) => {
    throw Object.assign(new Error(), warning);
  },
  strictDeprecations: true,
  plugins: [terser(), typescript()],
};
