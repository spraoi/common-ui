#!/usr/bin/env node
/* eslint no-console: 0 */

const sh = require('shelljs');

module.exports = function unlinkPackages() {
  console.log('removing symlinks...');
  sh.rm('-f', 'node_modules/@spraoi/*');
};
