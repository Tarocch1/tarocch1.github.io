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
          class="char animated"
          :class="{
            rubberBand: allAppeared && hovered[index],
          }"
          @mouseenter="hovered[index] = true"
          @mouseleave="hovered[index] = false"
        >
          {{ char === ' ' ? '&nbsp;' : char }}
        </span>
        <br v-else>
      </template>
    </TransitionGroup>
  </h1>

  <Tags :codes="['</h1>']" />
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'

import { TITLE_ALL_APPEARED } from '../../utils/event'
import Tags from './Tags.vue'

const props = defineProps<{
  title: string
}>()

// 记录已出现的字符数量
const appeared = ref(0)
// 计算是否所有字符都已出现
const allAppeared = computed(() => appeared.value === [...props.title].length)

watch(allAppeared, () => {
  if (allAppeared.value) {
    document.dispatchEvent(new Event(TITLE_ALL_APPEARED))
  }
})

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
  @apply tw:my-2 tw:ml-[1.2rem];
  @apply tw:text-3xl tw:md:text-4xl;
  @apply tw:font-exo-2;
  @apply tw:text-white;

  .char {
    @apply tw:inline-block;
    @apply tw:transition-colors tw:duration-300;

    &:hover {
      @apply tw:text-yellow-500;
    }
  }

  .hide {
    @apply tw:invisible;
  }
}
</style>
