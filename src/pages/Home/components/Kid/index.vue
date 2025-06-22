<template>
  <Teleport to="body">
    <div class="kid-wrap">
      <embed class="kid" :src="src" type="image/svg+xml" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import src from './assets/kid.svg'
</script>

<style scoped>
@reference '@/styles/index.css';

.kid-wrap {
  @apply fixed right-4 bottom-4;
  @apply w-16 h-16;

  .kid {
    @apply w-full h-full;
    @apply scheme-normal; /* 让 svg 背景透明 */
  }
}
</style>
