#!/usr/bin/env node

const meow = require('meow');
const linkPackages = require('../lib/link-packages');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');
const unlinkPackages = require('../lib/unlink-packages');

const cli = meow(
  `
Usage
  $ spraoi <command> [arguments]
	 
Commands
  new-package           Start the new UI package wizard. Run this in the
                        root of our common-ui repo.

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
    input: ['link', 'new-package', 'new-ui', 'unlink', 'version'],
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

  case 'unlink':
    unlinkPackages();
    break;

  case 'version':
    cli.showVersion();
    break;

  default:
    cli.showHelp(1);
}
