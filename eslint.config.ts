import {
  config,
  NodeConfig,
  VueConfig,
  PrettierConfig,
} from '@tarocch1/eslint-config'

export default config(
  { files: ['**/*.{js,jsx,ts,tsx,vue}'] },
  { ignores: ['dist'] },
  { files: ['src/**/*.{js,jsx,ts,tsx,vue}'], extends: VueConfig },
  { files: ['*.{js,ts}'], extends: NodeConfig },
  ...PrettierConfig,
)
