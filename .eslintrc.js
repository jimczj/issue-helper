module.exports = {
  extends: ['o2team', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['react'],
  parser: 'babel-eslint',
  rules: {
    'class-methods-use-this': 'off',
    'prefer-rest-params': 'off',
    'react/prop-types': 0,
    'react/no-find-dom-node': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['JSXElement']
      }
    ],
    "react/jsx-indent": ["error", 2]
  }
}
