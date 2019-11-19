const { resolve } = require('path');

module.exports = {
  bail: true,
  collectCoverage: true,
  globals: { __PATH_PREFIX__: '' },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest.mock.js',
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports' }]],
  rootDir: process.cwd(),
  setupFiles: [resolve(__dirname, 'jest.shim.js')],
  setupFilesAfterEnv: [resolve(__dirname, 'jest.setup.js')],
  testPathIgnorePatterns: ['.cache/', 'cypress/', 'node_modules/', 'public/'],
  transform: { '^.+\\.jsx?$': resolve(__dirname, 'jest.transform.js') },
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby|@spraoi/.*)/)',
    'packages/(?=(babel-preset)/)',
  ],
  verbose: true,
};
