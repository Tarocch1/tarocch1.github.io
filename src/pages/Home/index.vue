<template>
  <div class="container">
    <div ref="left" class="left" :style="leftScaleStyle">
      <Left />
    </div>
  </div>

  <Kid />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'

import Left from './components/Left/index.vue'
import Kid from './components/Kid/index.vue'

const leftElement = useTemplateRef('left')
// 左侧元素的宽度
const leftWidth = ref(0)
// 左侧元素的缩放比例
const leftScale = ref(1)
// 左侧元素缩放样式
const leftScaleStyle = computed(() => {
  return leftScale.value === 1
    ? {}
    : { transform: `scale(${leftScale.value})`, 'transform-origin': 'top left' }
})

// 获取元素的宽度
const getWidth = (element: Element | null) => {
  return element ? element.getBoundingClientRect().width : 0
}

// 根据窗口大小调整左侧元素的缩放比例
const autoScale = () => {
  if (leftWidth.value > 0) {
    const targetWidth = getWidth(document.documentElement) - 24 * 2
    if (leftWidth.value > targetWidth) {
      leftScale.value = targetWidth / leftWidth.value
    } else {
      leftScale.value = 1
    }
  }
}

onMounted(() => {
  leftWidth.value = getWidth(leftElement.value)
  autoScale()
  // 窗口大小变化时自动调整缩放比例
  window.addEventListener('resize', autoScale)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', autoScale)
})
</script>

<style scoped>
@reference '@/styles/index.css';

.container {
  @apply flex;
  @apply py-12 px-6;

  & > .left {
    @apply grow-0 shrink-0;
  }
}
</style>
