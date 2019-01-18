const defaultConfig = require('@spraoi/jest-config');

module.exports = {
  ...defaultConfig,
  testPathIgnorePatterns: ['<rootDir>/packages/legacy-*'],
};
