const path = require('path');

module.exports = {
  bail: true,
  rootDir: process.cwd(),
  testRegex: '/__tests__/.*\\.test\\.jsx?$',
  transform: { '/__tests__/.*': path.resolve(__dirname, 'jest.transform.js') },
  verbose: true,
};
