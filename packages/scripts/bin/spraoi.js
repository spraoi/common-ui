#!/usr/bin/env node

const meow = require('meow');
const linkPackages = require('../lib/link-packages');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');
const newVariation = require('../lib/new-variation');
const unlinkPackages = require('../lib/unlink-packages');

const cli = meow(
  `
USAGE
  $ spraoi <command> [arguments]
	 
COMMANDS
  new-package              Start new package wizard.
  new-ui                   Start new project wizard.
  new-variation            Start new variation wizard.
  link                     Symlink common-ui packages to local node_modules.
    --packages, -p [path]
  unlink                   Remove common-ui package symlinks in node_modules.
  version                  Print current version.

EXAMPLES
  $ spraoi link --packages ../common-ui/packages
`,
  {
    flags: {
      packages: {
        alias: 'p',
        default: null,
        type: 'string',
      },
    },
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
