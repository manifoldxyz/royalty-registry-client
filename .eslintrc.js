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
  parserOptions: {
    parser: {
      // Script parser for `<script lang="ts">`
      ts: "@typescript-eslint/parser",
      js: "@typescript-eslint/parser",
    },
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'vue/require-default-prop': 0,
    "vue/no-v-html": 0,
    'semi': [2, 'never'],
    'vue/html-indent': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': 'off',
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
