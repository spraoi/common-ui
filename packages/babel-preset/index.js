module.exports = () => ({
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        transpileTemplateLiterals: false,
      },
    ],
  ],
  presets: [
    'gatsby',
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
      },
    ],
  ],
});
