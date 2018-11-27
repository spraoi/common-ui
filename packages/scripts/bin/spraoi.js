#!/usr/bin/env node

const meow = require('meow');
const linkPackages = require('../lib/link-packages');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');
const newVariation = require('../lib/new-variation');
const unlinkPackages = require('../lib/unlink-packages');

const cli = meow(
  `
Usage
  $ spraoi <command> [arguments]
	 
Commands
  new-package           Start the new UI package wizard.

  new-variation         Start the new UI variation wizard.

  new-ui                Start the new UI project wizard.

  link                  Symlink common-ui packages to local node_modules.
    --packages [path]   Useful for testing without publishing to NPM.

    Example:
      $ spraoi link --packages ../common-ui/packages

  unlink                Remove common-ui package symlinks in node_modules.

  version               Print current version.
`,
  {
    flags: { packages: { default: null, type: 'string' } },
    input: [
      'link',
      'new-package',
      'new-ui',
      'new-variation',
      'unlink',
      'version',
    ],
  }
);

switch (cli.input[0]) {
  case 'link':
    if (!cli.flags.packages) cli.showHelp(1);
    linkPackages(cli.flags.packages);
    break;

  case 'new-package':
    newPackage();
    break;

  case 'new-ui':
    newUi();
    break;

  case 'new-variation':
    newVariation();
    break;

  case 'unlink':
    unlinkPackages();
    break;

  case 'version':
    cli.showVersion();
    break;

  default:
    cli.showHelp(1);
}
