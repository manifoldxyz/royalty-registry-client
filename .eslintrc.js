module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "vue-eslint-parser",
  extends: [
    '@vue/typescript',
    'eslint:recommended',
    'plugin:vue/strongly-recommended'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'vue/require-default-prop': 0,
    'semi': [2, 'never'],
    'vue/html-indent': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': 'off',
    'no-empty-source': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off'
  },
  ignorePatterns: ['src/**/*.d.ts'],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/tests/unit/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
