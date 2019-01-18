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
    return config;
  },
  define: { SPRAOI_ENV: JSON.stringify(envVars) },
  entry: 'src/index.js',
  html: { template: 'src/index.html' },
  babel: {
    jsx: 'react',
    include: [
      '@spraoi/auth',
      '@spraoi/aws',
      '@spraoi/chatbot',
      '@spraoi/s3-uploader',
      '@spraoi/validations',
      '@spraoi/cobrowsing',
    ],
  },
};
