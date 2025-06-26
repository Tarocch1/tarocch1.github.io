import { random } from 'lodash-es'

import type { Data } from './'

// 快速排序
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      function quickSort(arr) {
        if (arr.length < 2) return arr
        const p = arr[0]
        const [lo, hi] = arr.slice(1).reduce(
          (acc, val) => {
            acc[val <= p ? 0 : 1].push(val)
            return acc
          },
          [[], []]
        )
        return [...quickSort(lo), p, ...quickSort(hi)]
      }
    `,
    fn: function (ctx) {
      function quickSort(arr: number[]): number[] {
        if (arr.length < 2) return arr
        const p = arr[0]
        const [lo, hi] = arr.slice(1).reduce(
          (acc, val) => {
            acc[val <= p ? 0 : 1].push(val)
            return acc
          },
          [[], []] as number[][],
        )
        return [...quickSort(lo), p, ...quickSort(hi)]
      }
      ctx.quickSort = quickSort
    },
  },
  {
    component: 'CodeBlock',
    content: '',
    fn: function (ctx) {
      const array = Array.from({ length: 10 }).map(() => random(0, 100))
      ctx.array = array
      return `quickSort([${array.join(', ')}])`
    },
  },
  {
    component: 'Result',
    content: '',
    fn: function (ctx) {
      const result = ctx.quickSort(ctx.array)
      return `[${result.join(', ')}]`
    },
    prettier: { parser: 'json' },
  },
]
