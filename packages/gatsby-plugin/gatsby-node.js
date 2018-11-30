const { readFileSync, writeFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const merge = require('deepmerge');

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  config.module.rules = config.module.rules.map(rule => {
    const newRule = { ...rule };

    if (String(rule.test) === String(/\.jsx?$/)) {
      // our common modules are never transpiled beforehand
      newRule.exclude = modulePath =>
        /node_modules/.test(modulePath) &&
        !/node_modules\/(@spraoi)/.test(modulePath);
    }

    return newRule;
  });

  actions.replaceWebpackConfig(config);
};

module.exports.onPreInit = () => {
  const [variation, stage] = process.env.config.split('.');

  const config = [
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

  writeFileSync('src/config.json', JSON.stringify(config, null, 2));
};
