#!/usr/bin/env node

const meow = require('meow');
const newComponent = require('../lib/new-component');
const newPackage = require('../lib/new-package');
const newStack = require('../lib/new-stack');
const newUi = require('../lib/new-ui');
const newVariation = require('../lib/new-variation');
const deploy = require('../lib/deploy');

const helpText = `
USAGE
  $ spraoi <command> [arguments]

COMMANDS
  deploy                     Deploy the contents of ./public to the configured
    --config, -c [path]      s3 bucket and invalidate the Cloudfront cache.

  new-component              Start new component wizard (for ui).
  new-package                Start new package wizard (for common-ui).
  new-stack                  Start new stack wizard (for sam).
  new-ui                     Start new project wizard.
  new-variation              Start new variation wizard (for ui).

  version                    Print current version.

EXAMPLES
  $ spraoi deploy --config ./configs/site.dev.yml
`;

const cli = meow(helpText, {
  flags: {
    config: {
      alias: 'c',
      default: null,
      type: 'string',
    },
  },
  input: [
    'deploy',
    'new-component',
    'new-package',
    'new-ui',
    'new-variation',
    'unlink',
    'version',
  ],
});

switch (cli.input[0]) {
  case 'deploy':
    if (!cli.flags.config) cli.showHelp(1);
    deploy(cli.flags.config);
    break;

  case 'new-component':
    newComponent();
    break;

  case 'new-package':
    newPackage();
    break;

  case 'new-stack':
    newStack();
    break;

  case 'new-ui':
    newUi();
    break;

  case 'new-variation':
    newVariation();
    break;

  case 'version':
    cli.showVersion();
    break;

  default:
    cli.showHelp(1);
}
