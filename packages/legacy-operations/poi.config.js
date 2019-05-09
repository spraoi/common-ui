const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('find-package-json');

const pkgAppEnv = pkg().next().value.appEnv;
const stage = process.env.STAGE || 'default';
const variation = process.env.VARIATION || 'default';

const envVars = Object.assign(
  (pkgAppEnv['common'] || {})['common'] || {},
  (pkgAppEnv['common'] || {})[variation] || {},
  (pkgAppEnv[stage] || {})['common'] || {},
  (pkgAppEnv[stage] || {})[variation] || {},
  { STAGE: stage, VARIATION: variation }
);

module.exports = {
  configureWebpack(config) {
    config.output.globalObject = 'this';
    config.optimization = { minimizer: [new TerserPlugin()] };

    config.module.rules.push({
      include: /node_modules/,
      test: /\.mjs$/,
      type: 'javascript/auto',
    });

    return config;
  },
  define: { SPRAOI_ENV: JSON.stringify(envVars) },
  entry: 'src/AutoSave.js',
  html: { template: 'src/index.html' },
  babel: {
    jsx: 'react',
    include: [
      '@spraoi/auth',
      '@spraoi/aws',
      '@spraoi/chatbot',
      '@spraoi/cobrowsing',
      '@spraoi/legacy-auth',
      '@spraoi/legacy-aws',
      '@spraoi/legacy-file-upload',
      '@spraoi/s3-uploader',
      '@spraoi/validations',
    ],
  },
};
