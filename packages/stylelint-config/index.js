module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    indentation: 2,
    'no-eol-whitespace': true,
    'string-quotes': 'single',
  },
};
