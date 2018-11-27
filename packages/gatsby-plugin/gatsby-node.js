const { readFileSync, writeFileSync } = require('fs');
const { safeLoad } = require('js-yaml');
const merge = require('deepmerge');

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
