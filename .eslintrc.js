const prettier = require('./.prettierrc.js');

module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react/no-unstable-nested-components': [0],
    'react-hooks/exhaustive-deps': [0],
    'react-native/no-inline-styles': [0],
    'prettier/prettier': ['error', prettier],
    'no-unused-vars': 'off',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
