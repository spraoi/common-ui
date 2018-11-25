#!/usr/bin/env node

const meow = require('meow');
const newPackageWizard = require('./new-package');
const newUiWizard = require('./new-ui');

const cli = meow(
  `
Usage:
  $ spraoi [command] [arguments]
	 
Commands:
  new [--ui, --package]

Examples
  $ spraoi new --ui
  $ spraoi new --package
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
