module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // 集成Prettier插件规范
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        htmlWhitespaceSensitivity: 'strict',
        // singleAttributePerLine: true,
        trailingComma: 'none',
        printWidth: 80
        // jsxBracketSameLine: true
        // bracketSameLine: false,
        // singleAttributePerLine: true
      }
    ]
  }
}
