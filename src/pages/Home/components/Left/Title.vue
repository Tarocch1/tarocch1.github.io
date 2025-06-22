<template>
  <Tags :codes="['<h1>']" />

  <h1 class="title">
    <TransitionGroup
      appear
      appear-from-class="hide"
      appear-active-class="bounceIn"
      type="animation"
      @after-appear="appeared++"
    >
      <template v-for="(char, index) of [...props.title]" :key="index">
        <span
          v-if="char !== '\n'"
          :style="{
            animationDelay: allAppeared ? undefined : `${index * 100}ms`,
          }"
          :class="{
            char: true,
            animated: true,
            rubberBand: allAppeared && hovered[index],
          }"
          @mouseenter="hovered[index] = true"
          @mouseleave="hovered[index] = false"
        >
          {{ char === ' ' ? '&nbsp;' : char }}
        </span>
        <br v-else />
      </template>
    </TransitionGroup>
  </h1>

  <Tags :codes="['</h1>']" />
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

import Tags from './Tags.vue'

const props = defineProps<{ title: string }>()

// 记录已出现的字符数量
const appeared = ref(0)
// 计算是否所有字符都已出现
const allAppeared = computed(() => appeared.value === [...props.title].length)

// 记录鼠标悬停状态
const hovered = reactive<{ [key: number]: boolean }>({})
</script>

<style>
@import 'animate.css/source/_vars.css';
@import 'animate.css/source/_base.css';
@import 'animate.css/source/bouncing_entrances/bounceIn.css';
@import 'animate.css/source/attention_seekers/rubberBand.css';
</style>

<style scoped>
@reference '@/styles/index.css';

.title {
  @apply my-2 ml-[1.2rem];
  @apply text-3xl md:text-4xl;
  @apply font-exo-2;
  @apply text-white;

  .char {
    @apply inline-block;
    @apply transition-colors duration-300;

    &:hover {
      @apply text-yellow-500;
    }
  }

  .hide {
    @apply invisible;
  }
}
</style>
