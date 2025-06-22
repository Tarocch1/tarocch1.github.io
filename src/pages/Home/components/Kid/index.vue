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
  @apply tw:fixed tw:right-4 tw:bottom-4;
  @apply tw:w-16 tw:h-16;

  .kid {
    @apply tw:w-full tw:h-full;
    @apply tw:scheme-normal; /* 让 svg 背景透明 */
  }
}
</style>
