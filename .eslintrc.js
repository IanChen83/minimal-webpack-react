module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/prop-types': 'off',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/core-modules': ['styled-jsx/css'],
  },
}
