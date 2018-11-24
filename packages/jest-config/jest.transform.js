const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  plugins: ['@babel/plugin-transform-runtime'],
  presets: ['@spraoi/babel-preset'],
});
