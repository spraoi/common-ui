const path = require('path');

module.exports = {
  bail: true,
  globals: { __PATH_PREFIX__: '' },
  globalSetup: path.resolve(__dirname, 'jest.setup.js'),
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest.mock.js',
  },
  rootDir: process.cwd(),
  setupFiles: [path.resolve(__dirname, 'jest.shim.js')],
  testPathIgnorePatterns: ['.cache/', '.idea/', 'node_modules/', 'public/'],
  transform: { '^.+\\.jsx?$': path.resolve(__dirname, 'jest.transform.js') },
  transformIgnorePatterns: ['node_modules/(?!(gatsby|spraoi)/)'],
  verbose: true,
};
