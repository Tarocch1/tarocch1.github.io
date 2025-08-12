import { random } from 'lodash-es'

import type { Data } from './'

// 判断质数
export const data: Data[] = [
  {
    component: 'CodeBlock',
    content: `
      function isPrime(num) {
        const boundary = Math.floor(Math.sqrt(num))
        for (let i = 2; i <= boundary; i++) {
          if (num % i === 0) {
            return false
          }
        }
        return num >= 2
      }
    `,
    fn(ctx) {
      function isPrime(num: number) {
        const boundary = Math.floor(Math.sqrt(num))
        for (let i = 2; i <= boundary; i++) {
          if (num % i === 0) {
            return false
          }
        }
        return num >= 2
      }
      ctx.isPrime = isPrime
    },
  },
  {
    component: 'CodeBlock',
    content: '',
    fn(ctx) {
      ctx.num = random(1, 100)
      return `isPrime(${ctx.num})`
    },
  },
  {
    component: 'Result',
    content: '',
    fn(ctx) {
      return `${ctx.isPrime(ctx.num)}`
    },
    prettier: false,
  },
]
