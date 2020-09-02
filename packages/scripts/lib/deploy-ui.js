#!/usr/bin/env node

const merge = require('deepmerge');
const { readFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const { tryShell } = require('./utilities/helpers');

module.exports = function deployUi(configString) {
  const [variation, stage] = configString.split('.');

  const {
    deploy: { bucketUrl, cacheControlMaxAge, cloudFrontDistributionId },
  } = [
    'configs/default.yml',
    `configs/default.${stage}.yml`,
    `configs/${variation}.yml`,
    `configs/${variation}.${stage}.yml`,
  ].reduce((acc, file) => {
    try {
      return merge(acc, safeLoad(readFileSync(file, 'utf8')));
    } catch (e) {
      return acc;
    }
  }, {});

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

  const setContentType = (ext, type) =>
    tryShell(`
    aws s3 cp \
      --exclude '*' \
      --include '*.${ext}' \
      --content-type '${type}' \
      --metadata-directive 'REPLACE' \
      --recursive ${bucketUrl} ${bucketUrl}
  `);

  // upload
  tryShell(`aws s3 sync --delete public ${bucketUrl}`);

  // fix content-types
  setContentType('css', 'text/css');
  setContentType('eot', 'font/eot');
  setContentType('jpeg', 'image/jpeg');
  setContentType('jpg', 'image/jpeg');
  setContentType('js', 'application/javascript');
  setContentType('json', 'application/json');
  setContentType('png', 'image/png');
  setContentType('svg', 'image/svg+xml');
  setContentType('ttf', 'font/ttf');
  setContentType('woff', 'font/woff');
  setContentType('woff2', 'font/woff2');

  // set max-age
  tryShell(`
    aws s3 cp \
      --exclude '*' \
      --include '*.css' \
      --include '*.eot' \
      --include '*.jpeg' \
      --include '*.jpg' \
      --include '*.js' \
      --include '*.json' \
      --include '*.png' \
      --include '*.svg' \
      --include '*.ttf' \
      --include '*.webp' \
      --include '*.woff' \
      --include '*.woff2' \
      --cache-control max-age=${cacheControlMaxAge} \
      --metadata-directive 'REPLACE' \
      --recursive ${bucketUrl} ${bucketUrl}
  `);

  if (cloudFrontDistributionId)
    // invalidate cloudfront cache
    tryShell(`
      aws configure set preview.cloudfront true \
        && aws cloudfront create-invalidation \
          --distribution-id ${cloudFrontDistributionId} \
          --paths '/*'
    `);
};
