<template>
  <div class="tags">
    <div
      v-for="code in props.codes"
      :key="code"
      :style="{ marginLeft: ml(code) }"
    >
      {{ code.trim() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  codes: string[]
}>()

/** 计算 marginLeft */
function ml(code: string): string {
  let indent = 0
  for (const char of code) {
    if (char === ' ') {
      indent++
    }
    else {
      break
    }
  }
  return `${indent * 0.6}rem`
}
</script>

<style scoped>
@reference '@/styles/index.css';

.tags {
  @apply tw:italic tw:font-maple-mono;
  @apply tw:text-neutral-500;
  @apply tw:select-none;
}
</style>
