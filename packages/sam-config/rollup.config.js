const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  external: [
    'assert',
    'aws-sdk',
    'buffer',
    'child_process',
    'crypto',
    'dgram',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'net',
    'os',
    'path',
    'querystring',
    'stream',
    'string_decoder',
    'timers',
    'tty',
    'url',
    'util',
    'vm',
    'zlib',
  ],
  onwarn: warning => {
    // silence circular dependency warnings in packages we don't control
    // https://github.com/rollup/rollup/issues/1089
    if (warning.importer && !warning.importer.indexOf('node_modules/moment/')) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(`(!) ${warning.message}`);
  },
  output: { format: 'cjs' },
  plugins: [
    babel({
      babelrc: false,
      exclude: ['node_modules/**'],
      presets: [
        ['@babel/preset-env', { modules: false, targets: { node: '8.10' } }],
      ],
    }),
    commonjs(),
    json(),
    resolve({ preferBuiltins: true }),
    terser(),
  ],
};
