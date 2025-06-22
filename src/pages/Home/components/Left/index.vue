<template>
  <Tags :codes="['<html>', '  <body>']" />

  <div class="main">
    <div class="section">
      <Title :title="title" />
    </div>

    <div class="section">
      <Links :links="links" />
    </div>
  </div>

  <Tags :codes="['  </body>', '</html>']" />
</template>

<script lang="ts" setup>
import Tags from './Tags.vue'
import Title from './Title.vue'
import Links from './Links.vue'

const title = "Hi 👋,\nI'm Tarocch1,\nweb developer."

const links = [
  { title: 'GitHub', url: 'https://github.com/Tarocch1' },
  { title: 'Telegram', url: 'https://t.me/tarocch1' },
  { title: 'huiben.fang@gmail.com', url: 'mailto:huiben.fang@gmail.com' },
]
</script>

<style scoped>
@reference '@/styles/index.css';

.main {
  @apply my-10 ml-[2.4rem];

  .section {
    @apply mb-4;

    &:last-of-type {
      @apply mb-0;
    }
  }
}
</style>
