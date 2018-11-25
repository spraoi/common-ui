#!/usr/bin/env node

const meow = require('meow');
const newPackageWizard = require('../lib/new-package');
const newUiWizard = require('../lib/new-ui');

const cli = meow(
  `
Usage:
  $ spraoi [command] [arguments]
	 
Commands:
  new [--package, --ui]
    --package  create a new ui package for common-ui
    --ui       create a new ui project

Examples
  $ spraoi new --package
  $ spraoi new --ui
`,
  {
    flags: {
      package: { default: false, type: 'boolean' },
      ui: { default: false, type: 'boolean' },
    },
    input: ['new'],
  }
);

switch (cli.input[0]) {
  case 'new': {
    if (cli.flags.package) newPackageWizard();
    else if (cli.flags.ui) newUiWizard();
    else cli.showHelp(1);
    break;
  }

  default: {
    cli.showHelp(1);
  }
}
