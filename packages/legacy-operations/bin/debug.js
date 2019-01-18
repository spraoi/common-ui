#!/usr/bin/env node

const shell = require('shelljs');
shell.exec('NODE_ENV=debug ui-test');
