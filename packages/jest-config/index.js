const path = require('path');

module.exports = {
  bail: true,
  globalSetup: path.resolve(__dirname, 'enzyme.setup.js'),
  moduleNameMapper: { '\\.css$': path.resolve(__dirname, 'jest.mock.js') },
  rootDir: process.cwd(),
  transform: { '\\.jsx?$': path.resolve(__dirname, 'jest.transform.js') },
  verbose: true,
};
