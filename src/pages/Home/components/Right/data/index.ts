import type { Config } from 'prettier'

import { data as closure } from './closure'
import { data as fibonacci } from './fibonacci'
import { data as helloWorld } from './hello-world'
import { data as isPrime } from './is-prime'
import { data as proto } from './proto'
import { data as quickSort } from './quick-sort'
import { data as thisRef } from './this-ref'

export type Char = { char?: string; className?: string[]; child?: Char }

export type Data =
  | {
      component: 'CodeBlock'
      content: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fn?: (ctx: Record<string, any>) => string | void
      prettier?: Config | false
    }
  | {
      component: 'Result'
      content: string
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fn?: (ctx: Record<string, any>) => string | void
      prettier?: Config | false
    }

export const datas = [
  helloWorld,
  closure,
  thisRef,
  proto,
  fibonacci,
  isPrime,
  quickSort,
]
