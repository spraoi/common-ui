#!/usr/bin/env node

const { readFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const { tryShell } = require('./utilities/helpers');

module.exports = function deploy(config) {
  const {
    deploy: { bucketUrl, cacheControlMaxAge, cloudFrontDistributionId },
  } = safeLoad(readFileSync(config, 'utf8'));

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
