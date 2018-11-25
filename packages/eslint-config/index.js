module.exports = {
  env: { browser: true, 'jest/globals': true },
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier'],
  rules: {
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/jsx-sort-props': 'error',
    'react/no-array-index-key': 'off',
    'react/prefer-stateless-function': 'off',
    'sort-keys': 'error',
  },
};
