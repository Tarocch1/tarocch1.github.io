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

const props = defineProps<{ links: { title: string; url: string }[] }>()
</script>

<style scoped>
@reference '@/styles/index.css';

.links {
  @apply my-2 ml-[1.2rem];

  .link-wrap {
    @apply flex items-center gap-2;
    @apply mb-2;

    &:last-of-type {
      @apply mb-0;
    }

    .link {
      @apply inline-block;
      @apply py-1 px-2;
      @apply border border-yellow-600 rounded-sm;
      @apply tracking-[2px] font-fira-code text-yellow-600;
      @apply transition duration-300;

      &:hover {
        @apply bg-yellow-600 text-bg;
        @apply scale-105;
      }
    }
  }
}
</style>
