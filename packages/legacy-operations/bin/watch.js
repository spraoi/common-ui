#!/usr/bin/env node

const path = require('path');
const exec = require('./helpers.js').exec;
const configFile = path.resolve(__dirname, '../poi.config.js');
exec('poi', ['--config', configFile]);
