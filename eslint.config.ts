import globals from 'globals'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  { files: ['**/*.{js,jsx,ts,tsx,vue}'] },
  { ignores: ['dist'] },
  {
    files: ['src/**/*.{js,jsx,ts,tsx,vue}'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/recommended'],
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: { jsx: true },
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // 允许单个单词的组件名
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['*.{js,ts}'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  eslintPluginPrettierRecommended,
)
