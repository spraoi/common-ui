/* eslint no-console: 0 */

const fs = require('fs');
const { resolve } = require('path');

const command = process.env.npm_lifecycle_event;
let pageResolution = [];

if (
  (command === 'start' || command === 'build') &&
  (!process.env.config || !fs.existsSync(`configs/${process.env.config}.yml`))
) {
  const red = '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`\n\n💥 ${red}Please specify a valid config!`);
  console.log(`   Try one of these:${reset}\n`);

  fs.readdirSync('configs')
    .filter(
      file => !file.includes('default.') && /^([a-z]+\.){2}yml/.test(file)
    )
    .forEach(file =>
      console.log(`   $ config=${file.replace('.yml', '')} yarn ${command}`)
    );

  console.log();
  process.exit(1);
} else if (process.env.config) {
  const [variation, stage] = process.env.config.split('.');

  pageResolution = [
    'src/routes/default',
    `src/routes/default.${stage}`,
    `src/routes/${variation}`,
    `src/routes/${variation}.${stage}`,
  ]
    .filter(path => fs.existsSync(path))
    .map(path => ({
      options: { path: resolve(path) },
      resolve: 'gatsby-plugin-page-creator',
    }));
}

module.exports = {
  plugins: [
    ...pageResolution,
    '@spraoi/gatsby-plugin',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-svgr',
  ],
};
