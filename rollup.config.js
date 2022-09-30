import path from 'path';

import swc from 'rollup-plugin-swc';
import copy from 'rollup-plugin-copy';
import clear from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const isDevEnv = process.env.dev;

function external(id) {
  return !path.isAbsolute(id) && ['.', '/'].indexOf(id[0]) === -1;
}

function onwarn(warning) {
  const { code, plugin, id, input, message, text } = warning;

  console.warn('[!]', '[B]', code || warning);
  if (plugin) console.warn('[!]', '...', '[plugin]', plugin);
  if (id) console.warn('[!]', '...', '[id]', id);
  if (input) console.warn('[!]', '...', '[input]', input.file || input);
  if (message) console.warn('[!]', '...', '[message]', message);
  if (text) console.warn('[!]', '...', '[message]', text);
}

export default {
  input: 'src/index.js',
  external,
  onwarn,
  plugins: [
    clear({ targets: 'lib/*', runOnce: true, verbose: false }),
    copy({
      copyOnce: true,
      verbose: false,
      targets: [
        // {src: 'src/bootstrap.yml',dest: 'dist'}
      ],
    }),
    resolve({
      extensions: ['.js'],
    }),
    swc({
      minify: !isDevEnv,
    }),
    commonjs(),
  ],
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    exports: 'auto',
    sourcemap: true,
  },
};
