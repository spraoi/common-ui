const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['@babel/env', '@babel/react'],
});
