const path = require('path');

module.exports = {
  bail: true,
  globalSetup: path.resolve(__dirname, '__helpers__', 'enzyme.setup.js'),
  moduleNameMapper: {
    '\\.css$': path.resolve(__dirname, '__mocks__', 'css.js'),
  },
  rootDir: process.cwd(),
  transform: {
    '\\.jsx?$': path.resolve(__dirname, 'jest.transform.js'),
  },
  verbose: true,
};
