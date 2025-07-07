<template>
  <div class="wrap">
    <template v-for="(data, index) in dataToRender" :key="index">
      <CodeBlock
        v-if="data.component === 'CodeBlock'"
        :content="data.content"
        @all-appeared="next"
      />
      <Result v-else :content="data.content" @all-appeared="next" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, onMounted, nextTick } from 'vue'
import { cloneDeep } from 'lodash-es'

import CodeBlock from './CodeBlock.vue'
import Result from './Result.vue'
import { datas, type Data } from './data'
import { sleep } from '../../utils/sleep'
import { formatCode } from '../../utils/prettier'
import { TITLE_ALL_APPEARED } from '../../utils/event'

// 当前渲染第几组数据
const cur = ref(0)
// 已经渲染的数据
const dataToRender = ref<Data[]>([])
// 渲染所需的上下文
const ctx = shallowRef<Record<string, any>>({})

/**
 * 渲染下一条数据
 */
const next = async () => {
  // 要渲染的数据集合
  const data = datas[cur.value]

  if (dataToRender.value.length === data.length) {
    // 当前数据组已经全部渲染完毕
    await sleep(3000)
    // 重置状态
    dataToRender.value = []
    ctx.value = {}
    nextTick(async () => {
      cur.value = cur.value === datas.length - 1 ? 0 : cur.value + 1
      const dataItem = await prepareData(datas[cur.value][0])
      dataToRender.value.push(dataItem)
    })
  } else {
    // 渲染下一条数据
    await sleep(500)
    const dataItem = await prepareData(data[dataToRender.value.length])
    dataToRender.value.push(dataItem)
  }
}

const prepareData = async (dataItem: Data) => {
  const _dataItem = cloneDeep(dataItem)
  if (typeof _dataItem.fn === 'function') {
    _dataItem.content = _dataItem.fn(ctx.value) ?? _dataItem.content
  }
  _dataItem.content =
    _dataItem.prettier !== false
      ? await formatCode(_dataItem.content, _dataItem.prettier)
      : _dataItem.content
  return _dataItem
}

onMounted(() => {
  document.addEventListener(TITLE_ALL_APPEARED, next, { once: true })
})
</script>

<style scoped>
@reference '@/styles/index.css';

.wrap {
  @apply tw:mx-auto tw:space-y-2;
  @apply tw:w-[512px];
}
</style>
