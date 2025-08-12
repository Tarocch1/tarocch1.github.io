<template>
  <Tags :codes="['<nav>']" />

  <div class="links">
    <div v-for="link in props.links" :key="link.title" class="link-wrap">
      <Tags :codes="['<a>']" />
      <a
        class="link"
        :href="link.url"
        target="_blank"
        rel="noreferrer noopener"
      >
        {{ link.title }}
      </a>
      <Tags :codes="['</a>']" />
    </div>
  </div>

  <Tags :codes="['</nav>']" />
</template>

<script lang="ts" setup>
import Tags from './Tags.vue'

const props = defineProps<{
  links: { title: string, url: string }[]
}>()
</script>

<style scoped>
@reference '@/styles/index.css';

.links {
  @apply tw:my-2 tw:ml-[1.2rem] tw:space-y-2;

  .link-wrap {
    @apply tw:flex tw:items-center tw:gap-2;

    .link {
      @apply tw:inline-block;
      @apply tw:py-0.5 tw:px-1.5;
      @apply tw:border tw:border-yellow-600 tw:rounded-sm;
      @apply tw:font-maple-mono tw:text-yellow-600;
      @apply tw:transition tw:duration-300;

      &:hover {
        @apply tw:bg-yellow-600 tw:text-bg;
        @apply tw:scale-105;
      }
    }
  }
}
</style>
