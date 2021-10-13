module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'string-quotes': 'single',
    'no-descending-specificity': 'off',
    "block-closing-brace-newline-after": "never-multi-line",
    'block-no-empty': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-empty-source': false,
  }
}
