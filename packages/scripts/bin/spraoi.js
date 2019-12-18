#!/usr/bin/env node

const meow = require('meow');
const deploy = require('../lib/deploy-ui');
const newComponent = require('../lib/new-component');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');
const newVariation = require('../lib/new-variation');
const { tryShell } = require('../lib/utilities/helpers');

const helpText = `
USAGE
  $ spraoi <command> [arguments]

COMMANDS
  deploy-sam-project        Deploy a SAM project.
    --api-version, -a
    --bucket, -b
    --domain, -d
    --environment, -e
    --template, -t
    --variation, -v

  deploy-sam-stack          Deploy a SAM stack.
    --bucket, -b
    --directory, -d
    --name, -n
    --params, -p
    --template, -t
    
  deploy-ui                 Deploy the contents of ./public to the configured
    --config, -c            S3 bucket and invalidate the Cloudfront cache.

  new-component             Start new component wizard (for ui).
  new-package               Start new package wizard (for common-ui).
  new-ui                    Start new project wizard.
  new-variation             Start new variation wizard (for ui).

  version                   Print current version.

EXAMPLES
  $ spraoi deploy --config ./configs/site.dev.yml
`;

const cli = meow(helpText, {
  flags: {
    'api-version': { alias: 'a', default: null, type: 'string' },
    bucket: { alias: 'b', default: null, type: 'string' },
    config: { alias: 'c', default: null, type: 'string' },
    directory: { alias: 'd', default: null, type: 'string' },
    domain: { alias: 'd', default: null, type: 'string' },
    environment: { alias: 'e', default: null, type: 'string' },
    name: { alias: 'n', default: null, type: 'string' },
    params: { alias: 'p', default: null, type: 'string' },
    template: { alias: 't', default: null, type: 'string' },
    variation: { alias: 'v', default: null, type: 'string' },
  },
  input: [
    'deploy-sam-project',
    'deploy-sam-stack',
    'deploy-ui',
    'new-component',
    'new-package',
    'new-ui',
    'new-variation',
    'version',
  ],
});

switch (cli.input[0]) {
  case 'deploy-sam-project': {
    tryShell(
      `${__dirname}/../lib/deploy-sam-project.sh \
        -a ${cli.flags['api-version']} \
        -b ${cli.flags.bucket} \
        -d ${cli.flags.domain} \
        -e ${cli.flags.environment} \
        -t ${cli.flags.template} \
        -v ${cli.flags.variation}`
    );

    break;
  }

  case 'deploy-sam-stack': {
    tryShell(
      `${__dirname}/../lib/deploy-sam-stack.sh \
        -b ${cli.flags.bucket} \
        -d ${cli.flags.directory} \
        -e ${cli.flags.name} \
        -t ${cli.flags.params} \
        -v ${cli.flags.template}`
    );

    break;
  }

  case 'deploy-ui': {
    if (!cli.flags.config) cli.showHelp(1);
    deploy(cli.flags.config);
    break;
  }

  case 'new-component': {
    newComponent();
    break;
  }

  case 'new-package': {
    newPackage();
    break;
  }

  case 'new-ui': {
    newUi();
    break;
  }

  case 'new-variation': {
    newVariation();
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
