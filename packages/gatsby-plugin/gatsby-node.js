const { readFileSync, writeFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const merge = require('deepmerge');

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();

  config.module.rules = [
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/)
    ),
    {
      ...loaders.js(),
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        !/node_modules\/(@spraoi)/.test(modulePath),
      test: /\.jsx?$/,
    },
  ];

  actions.replaceWebpackConfig(config);
};

module.exports.onPreInit = () => {
  const [variation, stage] = process.env.config.split('.');

  const config = [
    'config/default.yml',
    `config/default.${stage}.yml`,
    `config/${variation}.yml`,
    `config/${variation}.${stage}.yml`,
  ].reduce((acc, file) => {
    try {
      return merge(acc, safeLoad(readFileSync(file, 'utf8')));
    } catch (e) {
      return acc;
    }
  }, {});

  writeFileSync('src/config.json', JSON.stringify(config, null, 2));
};
