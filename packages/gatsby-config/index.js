/* eslint no-console: 0 */

const fs = require('fs');
const { resolve } = require('path');

if (!process.env.config || !fs.existsSync(`config/${process.env.config}.yml`)) {
  const red = '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`\n\n💥 ${red}Please specify a valid config!`);
  console.log(`   Try one of these:${reset}\n`);

  fs.readdirSync('config')
    .filter(
      file => !file.includes('default.') && /^([a-z]+\.){2}yml/.test(file)
    )
    .forEach(file =>
      console.log(`   $ config=${file.replace('.yml', '')} yarn start`)
    );

  console.log();
  process.exit(1);
}

const [variation, stage] = process.env.config.split('.');

const pageResolution = [
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

module.exports = {
  plugins: [
    '@spraoi/gatsby-plugin',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-svgr',
    ...pageResolution,
  ],
};
