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
  presets: ['gatsby'],
});
