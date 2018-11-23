#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');

const args = process.argv.slice(2).join(' ');
const configFile = path.resolve(__dirname, '../jest.config.js');
shell.exec(`jest --config ${configFile} ${args}`);
