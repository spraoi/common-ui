#!/usr/bin/env node

const meow = require('meow');
const buildSamCfTemplate = require('../lib/build-sam-cf-template');
const deployUi = require('../lib/deploy-ui');
const extractSamVariation = require('../lib/extract-sam-variation');
const extractUiVariation = require('../lib/extract-ui-variation');
const newComponent = require('../lib/new-component');
const newPackage = require('../lib/new-package');
const newUi = require('../lib/new-ui');
const newVariation = require('../lib/new-variation');
const { tryShell } = require('../lib/utilities/helpers');

const helpText = `
USAGE
  $ spraoi <command> [arguments]

COMMANDS
  deploy-sam-project        Deploy a SAM project
    --domain, -d
    --environment, -e
    --project, -p
    --variation, -v

  deploy-sam-stack          Deploy a SAM stack
    --bucket, -b
    --directory, -d
    --name, -n
    --params, -p
    --template, -t
    
  deploy-ui                 Deploy the contents of ./public to the configured
    --config, -c            S3 bucket and invalidate the Cloudfront cache

  new-component             Start new component wizard (for UI)
  new-package               Start new package wizard (for common-ui)
  new-ui                    Start new project wizard
  new-variation             Start new variation wizard (for UI)

  build-sam-cf-template     Build CloudFormation template from partials
    --project, -p
    --variation, -v

  extract-ui-variation      Start UI variation extraction wizard
  extract-sam-variation     Start SAM variation extraction wizard

  version                   Print current version.

EXAMPLES
  $ spraoi deploy --config ./configs/site.dev.yml
`;

const cli = meow(helpText, {
  flags: {
    bucket: { alias: 'b', default: null, type: 'string' },
    config: { alias: 'c', default: null, type: 'string' },
    directory: { alias: 'd', default: null, type: 'string' },
    domain: { alias: 'd', default: null, type: 'string' },
    environment: { alias: 'e', default: null, type: 'string' },
    name: { alias: 'n', default: null, type: 'string' },
    params: { alias: 'p', default: null, type: 'string' },
    project: { alias: 'p', default: null, type: 'string' },
    template: { alias: 't', default: null, type: 'string' },
    variation: { alias: 'v', default: null, type: 'string' },
  },
  input: [
    'build-sam-cf-template',
    'deploy-sam-project',
    'deploy-sam-stack',
    'deploy-ui',
    'extract-sam-variation',
    'extract-ui-variation',
    'new-component',
    'new-package',
    'new-ui',
    'new-variation',
    'version',
  ],
});

switch (cli.input[0]) {
  case 'build-sam-cf-template': {
    if (!cli.flags.project || !cli.flags.variation) cli.showHelp(1);
    buildSamCfTemplate(cli.flags);
    break;
  }

  case 'deploy-sam-project': {
    tryShell(
      `${__dirname}/../lib/deploy-sam-project.sh \
        ${cli.flags.domain ? `-d ${cli.flags.domain}` : ''} \
        ${cli.flags.environment ? `-e ${cli.flags.environment}` : ''} \
        ${cli.flags.project ? `-p ${cli.flags.project}` : ''} \
        ${cli.flags.variation ? `-v ${cli.flags.variation}` : ''}`
    );

    break;
  }

  case 'deploy-sam-stack': {
    tryShell(
      `${__dirname}/../lib/deploy-sam-stack.sh \
        ${cli.flags.bucket ? `-b ${cli.flags.bucket}` : ''} \
        ${cli.flags.directory ? `-d ${cli.flags.directory}` : ''} \
        ${cli.flags.name ? `-n ${cli.flags.name}` : ''} \
        ${cli.flags.params ? `-p ${cli.flags.params}` : ''} \
        ${cli.flags.template ? `-t ${cli.flags.template}` : ''}`
    );

    break;
  }

  case 'deploy-ui': {
    if (!cli.flags.config) cli.showHelp(1);
    deployUi(cli.flags.config);
    break;
  }

  case 'extract-sam-variation': {
    extractSamVariation();
    break;
  }

  case 'extract-ui-variation': {
    extractUiVariation();
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
