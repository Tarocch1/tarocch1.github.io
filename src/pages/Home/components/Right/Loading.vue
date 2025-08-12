<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { sleep } from '../../utils/sleep'

const emits = defineEmits<{ loaded: [] }>()

const states = ['-', '\\', '|', '/']
// 每轮 500 毫秒
const duration = 500
// 共 4 轮
const iteration = 4

const text = ref('')

async function start() {
  const gap = duration / states.length
  let cur = 0
  let cycle = 1
  while (cycle <= iteration) {
    cur = 0
    while (cur < states.length) {
      text.value = states[cur]
      await sleep(gap)
      cur++
    }
    cycle++
  }
  emits('loaded')
}

onMounted(start)
</script>
