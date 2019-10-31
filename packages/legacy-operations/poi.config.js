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

const transpileCommonPkgs = envVars.TRANSPILE_COMMON_PKGS || [];
const transpileVariationPkgs = envVars.TRANSPILE_VARIATION_PKGS || [];
const transpilePkgs = [...transpileCommonPkgs, ...transpileVariationPkgs];

module.exports = {
  configureWebpack(config) {
    config.output.globalObject = 'this';
    config.optimization = { minimizer: [new TerserPlugin()] };

    config.module.rules.push({
      include: /node_modules/,
      test: /\.mjs$/,
      type: 'javascript/auto',
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            data: '$env: ' + variation + ';',
          },
        },
      ],
    });

    return config;
  },
  define: { SPRAOI_ENV: JSON.stringify(envVars) },
  entry: 'src/index.js',
  html: { template: 'src/index.html' },
  babel: {
    jsx: 'react',
    include: [
      ...transpilePkgs,
      '@spraoi/auth',
      '@spraoi/aws',
      '@spraoi/chatbot',
      '@spraoi/cobrowsing',
      '@spraoi/legacy-auth',
      '@spraoi/legacy-aws',
      '@spraoi/legacy-chatbot',
      '@spraoi/legacy-cobrowsing',
      '@spraoi/legacy-file-upload',
      '@spraoi/s3-uploader',
      '@spraoi/validations',
    ],
  },
};
