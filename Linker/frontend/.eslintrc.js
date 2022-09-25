module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 0,
    'no-var': 2,
    'prefer-const': 1,
    quotes: ['warn', 'single'],
    'react/prop-types': 0
  }
};
