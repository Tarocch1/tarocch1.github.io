<template>
  <div class="codes">
    <TransitionGroup
      appear
      appear-from-class="hide"
      appear-to-class="show"
      type="transition"
      @after-appear="appeared++"
    >
      <template v-for="(char, index) of chars" :key="index">
        <span
          v-if="char.char !== '\n'"
          :style="{ color: char.color, transitionDelay: `${index * 100}ms` }"
        >
          {{ char.char }}
        </span>
        <br v-else />
      </template>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { findLastIndex } from 'lodash-es'

import { highlightCode } from '../../utils/shiki'

const props = defineProps<{ content: string }>()
const emits = defineEmits<{ 'all-appeared': [] }>()

// 记录已出现的字符数量
const appeared = ref(0)

// 将字符按照空格打散
const splitWithSpaces = (str: string) => {
  const result: string[] = []
  const chars = [...str]

  // 最后一个不为空格的字符索引
  const lastNonSpaceIndex = findLastIndex(chars, (char) => char !== ' ')

  let buffer = ''
  for (let i = 0; i < chars.length; i++) {
    let char = chars[i]
    buffer += char
    if (char !== ' ') {
      if (i === lastNonSpaceIndex) {
        buffer += chars.slice(i + 1).join('')
        result.push(buffer)
        break
      } else {
        result.push(buffer)
        buffer = ''
      }
    }
  }
  if (result.length === 0) {
    result.push(buffer)
  }

  return result
}

// 需要渲染的字符
const chars = computed(() => {
  const { tokens } = highlightCode(props.content)
  const result: { char: string; color?: string }[] = []

  tokens.forEach((line, index) => {
    line.forEach((token) => {
      const chars = splitWithSpaces(token.content)
      chars.forEach((char) => {
        result.push({ char, color: token.color })
      })
    })
    if (index !== tokens.length - 1) {
      result.push({ char: '\n' }) // 添加换行符
    }
  })

  return result
})

// 计算是否所有字符都已出现
const allAppeared = computed(() => appeared.value === chars.value.length)

watch(allAppeared, () => {
  if (allAppeared.value) {
    emits('all-appeared')
  }
})
</script>

<style scoped>
@reference '@/styles/index.css';

.codes {
  @apply tw:relative;
  @apply tw:mb-2 tw:ml-4;
  @apply tw:whitespace-pre;
  @apply tw:font-fira-code;
  @apply tw:text-neutral-300;

  &::before {
    content: '>';
    @apply tw:absolute tw:-left-4;
  }

  .show {
    @apply tw:visible;
  }
  .hide {
    @apply tw:invisible;
  }
}
</style>
