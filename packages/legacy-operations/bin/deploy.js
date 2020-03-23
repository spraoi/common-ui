#!/usr/bin/env node

const pkg = require('find-package-json');
const shell = require('shelljs');

const pkgDeploy = pkg().next().value.deploy;
const stage = (process.env.STAGE = process.argv[2] || 'default');
const variation = process.env.VARIATION || 'default';

const uppercaseVariation = variation.toUpperCase();
const uppercaseStage = stage.toUpperCase();
const envVarPrefix = `${uppercaseVariation}_${uppercaseStage}_`;
const AWS_ACCOUNT_ID = 'AWS_ACCOUNT_ID';
const AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID';
const AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY';

process.env[AWS_ACCOUNT_ID] =
  process.env[`${envVarPrefix}${AWS_ACCOUNT_ID}`] ||
  process.env[AWS_ACCOUNT_ID];

process.env[AWS_ACCESS_KEY_ID] =
  process.env[`${envVarPrefix}${AWS_ACCESS_KEY_ID}`] ||
  process.env[AWS_ACCESS_KEY_ID];

process.env[AWS_SECRET_ACCESS_KEY] =
  process.env[`${envVarPrefix}${AWS_SECRET_ACCESS_KEY}`] ||
  process.env[AWS_SECRET_ACCESS_KEY];

const config = Object.assign(
  (pkgDeploy['common'] || {})['common'] || {},
  (pkgDeploy['common'] || {})[variation] || {},
  (pkgDeploy[stage] || {})['common'] || {},
  (pkgDeploy[stage] || {})[variation] || {}
);

const tryShell = (command) => {
  shell.exec(command);
  if (shell.error()) process.exit(1);
};

// build
tryShell('ui-build');

// upload
tryShell(`aws s3 sync --delete dist ${config.bucketUrl}`);

// fix content-type
tryShell(`
  aws s3 cp \
    --exclude '*' \
    --include '*.js' \
    --content-type 'application/javascript' \
    --metadata-directive 'REPLACE' \
    --recursive ${config.bucketUrl} ${config.bucketUrl}`);

// set max-age
tryShell(`
  aws s3 cp \
    --exclude '*' \
    --include '*.js' \
    --include '*.css' \
    --include '*.svg' \
    --include '*.png' \
    --include '*.jpg' \
    --cache-control max-age=${config.cacheControlMaxAge} \
    --metadata-directive 'REPLACE' \
    --recursive ${config.bucketUrl} ${config.bucketUrl}`);

// invalidate cloudfront cache
tryShell(`
  aws configure set preview.cloudfront true && aws cloudfront create-invalidation \
    --distribution-id ${config.cloudFrontDistributionId} \
    --paths '/*'`);
