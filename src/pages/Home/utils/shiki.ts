import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import javaScript from 'shiki/langs/javascript.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'

const highlighter = createHighlighterCoreSync({
  langs: [javaScript],
  themes: [githubDark],
  engine: createJavaScriptRegexEngine(),
})

/** 使用 shiki 进行代码高亮 */
export const highlightCode = (code: string) => {
  const result = highlighter.codeToTokens(code, {
    lang: 'js',
    theme: 'github-dark',
  })
  return result
}
