#!/usr/bin/env node

const merge = require('deepmerge');
const { readFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const { tryShell } = require('./utilities/helpers');

module.exports = function deploy(configString) {
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

  // upload
  tryShell(`aws s3 sync --delete public ${bucketUrl}`);

  // fix content-type
  tryShell(`
    aws s3 cp \
      --exclude '*' \
      --include '*.js' \
      --content-type 'application/javascript' \
      --metadata-directive 'REPLACE' \
      --recursive ${bucketUrl} ${bucketUrl}
  `);

  // set max-age
  tryShell(`
    aws s3 cp \
      --exclude '*' \
      --include '*.css' \
      --include '*.eot' \
      --include '*.jpeg' \
      --include '*.jpg' \
      --include '*.js' \
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

  // invalidate cloudfront cache
  tryShell(`
    aws configure set preview.cloudfront true \
      && aws cloudfront create-invalidation \
        --distribution-id ${cloudFrontDistributionId} \
        --paths '/*'
  `);
};
