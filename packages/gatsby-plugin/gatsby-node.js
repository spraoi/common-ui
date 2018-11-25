/* eslint no-console: 0 */

const { readFileSync, writeFile } = require('fs');
const { safeLoad } = require('js-yaml');
const merge = require('deepmerge');

module.exports.onPreInit = () => {
  if (!process.env.config) {
    const red = '\x1b[31m';
    const reset = '\x1b[0m';

    console.error(`💥 ${red}config not specified!${reset} 💥`);
    process.exit(1);
  }

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

  writeFile('src/config.json', JSON.stringify(config, null, 2), () => {});
};
