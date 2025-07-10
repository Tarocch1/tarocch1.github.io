<template>
  <Tags :codes="['<html>', '  <body>']" />

  <div class="main">
    <div>
      <Title :title="title" />
    </div>

    <div>
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
  { title: 'Telegram', url: 'https://t.me/Tarocch1' },
  { title: 'huiben.fang@gmail.com', url: 'mailto:huiben.fang@gmail.com' },
]
</script>

<style scoped>
@reference '@/styles/index.css';

.main {
  @apply tw:my-8 tw:ml-[2.4rem] tw:space-y-8;
}
</style>
