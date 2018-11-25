#!/usr/bin/env node
/* eslint no-console: 0 */

const sh = require('shelljs');
const { resolve } = require('path');

module.exports = function linkPackages(packagesLocation) {
  const destination = 'node_modules/@spraoi';
  sh.rm('-rf', destination);
  sh.mkdir('-p', destination);

  sh.ls(packagesLocation).forEach(file => {
    const packageLocation = resolve(packagesLocation, file);
    const linkLocation = resolve(destination, file);
    sh.ln('-sf', packageLocation, linkLocation);
    console.log(`${packageLocation} -> ${linkLocation}`);
  });
};
