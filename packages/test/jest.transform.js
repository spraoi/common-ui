const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['@spraoi/babel-preset'],
});
