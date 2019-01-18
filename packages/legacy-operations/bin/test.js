#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const configFile = path.resolve(__dirname, '../jest.config.js');
shell.exec(`jest --config ${configFile}`);
