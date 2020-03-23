const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  external: (dependency) =>
    [
      /^assert$/,
      /^buffer$/,
      /^child_process$/,
      /^crypto$/,
      /^dgram$/,
      /^domain$/,
      /^events$/,
      /^fs$/,
      /^http$/,
      /^https$/,
      /^net$/,
      /^os$/,
      /^path$/,
      /^querystring$/,
      /^stream$/,
      /^string_decoder$/,
      /^timers$/,
      /^tty$/,
      /^url$/,
      /^util$/,
      /^vm$/,
      /^zlib$/,
      /aws-sdk/,
    ].some((re) => re.test(dependency)),
  output: { format: 'cjs' },
  plugins: [
    commonjs(),
    json(),
    resolve(),
    terser({ output: { comments: false } }),
  ],
};
