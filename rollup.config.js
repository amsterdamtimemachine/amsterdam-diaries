import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { builtinModules } from 'module';

export default {
  input: {
    import: 'importer/import.ts',
    validate: 'importer/validate.ts',
  },
  output: {
    dir: '.output/scripts',
    format: 'es',
    sourcemap: false,
    entryFileNames: '[name].mjs',
    chunkFileNames: 'shared-[hash].mjs',
  },
  plugins: [resolve({ preferBuiltins: true }), commonjs(), typescript(), json()],
  external: builtinModules,
};
