<template>
  <div class="codes">
    <Loading v-if="loading" @loaded="loaded" />
    <div v-else>{{ props.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

import Loading from './Loading.vue'

const props = defineProps<{ content: string }>()
const emits = defineEmits<{ 'all-appeared': [] }>()

const loading = ref(true)

const loaded = () => {
  loading.value = false
  nextTick(() => {
    emits('all-appeared')
  })
}
</script>

<style scoped>
@reference '@/styles/index.css';

.codes {
  @apply tw:relative;
  @apply tw:ml-4;
  @apply tw:whitespace-pre;
  @apply tw:font-maple-mono;
  @apply tw:text-neutral-300;

  &::before {
    content: '>';
    @apply tw:absolute tw:left-[-16px];
  }
}
</style>
