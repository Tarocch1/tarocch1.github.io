import type { Config } from 'prettier'

import { PrettierOptions } from '@tarocch1/eslint-config'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import { format } from 'prettier/standalone'

const defaultConfig: Config = {
  ...PrettierOptions,
  parser: 'babel',
  plugins: [prettierPluginBabel, prettierPluginEstree as any],
}

/** 使用 prettier 格式化代码 */
export async function formatCode(source: string, config: Config = {}) {
  const cfg = { ...defaultConfig, ...config }
  const code = await format(source, cfg)

  return code.trim().replace(/^;/, '') // 去掉开头的分号
}
