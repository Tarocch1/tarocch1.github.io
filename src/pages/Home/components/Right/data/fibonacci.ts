import type { Data } from './'

// 斐波那契
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      function fibonacci(n) {
        return Array.from({ length: n }).reduce(
          (acc, cur, i) =>
            acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
          []
        )
      }
    `,
    fn: function (ctx) {
      function fibonacci(n: number) {
        return Array.from({ length: n }).reduce(
          (acc: number[], _cur, i) =>
            acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
          [] as number[],
        )
      }
      ctx.fibonacci = fibonacci
    },
  },
  { component: 'CodeBlock', content: 'fibonacci(10)' },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      const result: number[] = ctx.fibonacci(10)
      return `[${result.join(', ')}]`
    },
    prettier: { parser: 'json' },
  },
]
