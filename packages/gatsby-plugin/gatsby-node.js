const fs = require('fs');
const merge = require('deepmerge');
const prettier = require('prettier');
const { safeLoad } = require('js-yaml');

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

  config.module.rules.push({
    exclude: /node_modules/,
    loader: 'graphql-tag/loader',
    test: /\.gql$/,
  });

  actions.replaceWebpackConfig(config);
};

module.exports.onPreInit = () => {
  createConfigJson();
  createIconComponent();
  fixReactCarouselWindowUndefinedIssue();
};

function createConfigJson() {
  const [variation, stage] = process.env.config.split('.');

  const config = [
    'configs/default.yml',
    `configs/default.${stage}.yml`,
    `configs/${variation}.yml`,
    `configs/${variation}.${stage}.yml`,
  ].reduce((acc, file) => {
    try {
      return merge(acc, safeLoad(fs.readFileSync(file, 'utf8')));
    } catch (e) {
      return acc;
    }
  }, {});

  fs.writeFileSync('src/config.json', JSON.stringify(config, null, 2));
}

function createIconComponent() {
  const iconDir = 'src/images/icons';
  const iconComponentDir = 'src/components/Icon';
  const iconComponent = `${iconComponentDir}/index.js`;

  if (!fs.existsSync(iconDir)) return;

  const files = fs
    .readdirSync(iconDir)
    .map(file => ({
      componentName: file.split('.')[0].replace(/[^a-z]/gi, ''),
      file,
      name: file.split('.')[0],
      type: file.split('.').pop(),
    }))
    .filter(file => file.type === 'svg');

  if (!fs.existsSync(iconComponentDir)) fs.mkdirSync(iconComponentDir);

  prettier.resolveConfig(iconComponent).then(options => {
    const allOpts = { ...options, parser: 'babel' };

    const formatted = prettier.format(
      `
        // NOTE: this file is generated automatically, any changes will be overwritten.

        import Box from '@spraoi/base/Box';
        import PropTypes from 'prop-types';
        import React from 'react';
        ${files.reduce(
          (acc, file) =>
            `${acc}import ${file.componentName} from '../../images/icons/${file.file}';`,
          ''
        )}

        const svgMap = {
          ${files.map(file => `'${file.name}': ${file.componentName}`)}
        };

        const Icon = ({ svg, ...rest }) => {
          const SvgComponent = svgMap[svg];

          return (
            <Box {...rest}>
              <SvgComponent />
            </Box>
          );
        };

        Icon.propTypes = {
          svg: PropTypes.oneOf([
            ${files.map(file => `'${file.name}'`)}
          ]).isRequired,
        };

        export default Icon;
      `,
      allOpts
    );

    fs.writeFileSync(iconComponent, formatted);
  });
}

function fixReactCarouselWindowUndefinedIssue() {
  // https://github.com/brainhubeu/react-carousel/issues/287

  const carouselSrcFile =
    'node_modules/@brainhubeu/react-carousel/lib/react-carousel.js';

  if (!fs.existsSync(carouselSrcFile)) return;

  fs.writeFileSync(
    carouselSrcFile,
    fs
      .readFileSync(carouselSrcFile)
      .replace('(window,', `(typeof window==='undefined'?{}:window,`)
  );
}
