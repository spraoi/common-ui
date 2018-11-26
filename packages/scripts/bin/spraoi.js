#!/usr/bin/env node

const meow = require('meow');
const linkPackages = require('../lib/link-packages');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');

const cli = meow(
  `
Usage
  $ spraoi <command> [arguments]
	 
Commands
  new-package           Create a new UI package for common-ui.

  new-ui                Create a new UI project.

  link                  Symlink common-ui packages to local node_modules.
    --packages [path]   Useful for testing without publishing to NPM.

  version               Print the current version.

Examples
  $ spraoi new-package
  $ spraoi new-ui
  $ spraoi link --packages ../common-ui/packages
`,
  {
    flags: { packages: { default: null, type: 'string' } },
    input: ['link', 'new-package', 'new-ui', 'version'],
  }
);

switch (cli.input[0]) {
  case 'new-package':
    newPackage();
    break;

  case 'new-ui':
    newUi();
    break;

  case 'link':
    if (!cli.flags.packages) cli.showHelp(1);
    linkPackages(cli.flags.packages);
    break;

  case 'version':
    cli.showVersion();
    break;

  default:
    cli.showHelp(1);
}
