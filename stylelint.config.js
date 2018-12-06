module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'color-hex-case': null,
    'number-no-trailing-zeros': null,
    'no-empty-source': null,
    'scss/at-rule-no-unknown': true,
    'no-missing-end-of-source-newline': null,
    'selector-list-comma-newline-after': null,
    'no-eol-whitespace': null,
    'block-closing-brace-newline-before': null,
    'declaration-block-semicolon-newline-after': null,
    'no-descending-specificity': null,
    'block-opening-brace-newline-after': null,
    'block-no-empty': null,
    'unit-case': null,
    'declaration-block-no-shorthand-property-overrides': false
  },
  ignoreFiles: ['src/**/*.js']
}
