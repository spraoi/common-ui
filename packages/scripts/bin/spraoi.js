#!/usr/bin/env node

const meow = require('meow');
const linkPackages = require('../lib/link-packages');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');

const cli = meow(
  `
Usage:
  $ spraoi [command] [arguments]
	 
Commands:
  new
    --package  Create a new UI package for common-ui.
    --ui       Create a new UI project.

  link
    --packages path/to/common-ui/packages

      Symlink common-ui packages to local node_modules. Useful for testing
      without publishing to NPM.

  version
    Print the current version.

Examples:
  $ spraoi new --package
  $ spraoi new --ui
  $ spraoi link --packages ../common-ui/packages
`,
  {
    flags: {
      package: { default: false, type: 'boolean' },
      packages: { default: null, type: 'string' },
      ui: { default: false, type: 'boolean' },
    },
    input: ['link', 'new', 'version'],
  }
);

switch (cli.input[0]) {
  case 'new': {
    if (cli.flags.package) newPackage();
    else if (cli.flags.ui) newUi();
    else cli.showHelp(1);
    break;
  }

  case 'link': {
    if (cli.flags.packages) linkPackages(cli.flags.packages);
    else cli.showHelp(1);
    break;
  }

  case 'version': {
    cli.showVersion();
    break;
  }

  default: {
    cli.showHelp(1);
  }
}
