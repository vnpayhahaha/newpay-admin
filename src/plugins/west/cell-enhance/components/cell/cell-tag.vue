<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import { getDictionaryItem } from '../../utils/tools'
import type { Tag } from '../../types'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Tag
    prop?: string | null
    dictName?: string | ''
  }
}>()

// 提取字典名，避免重复计算
const dictName = props?.dictName || ''

const modelValue = computed(() => {
  return props?.prop ? data.row[props.prop] : null
})

// 计算是否是数组
const isArrayField = computed(() => Array.isArray(modelValue.value))

// 提供安全的字典标签获取
function safeGetLabel(key: string | number) {
  return getDictionaryItem(dictName, key)
}

// 统一事件处理函数
function handleEvent(eventHandlers: Record<string, (...args: any[]) => void> = {}) {
  const handlerMap = {}
  Object.keys(eventHandlers).forEach((event) => {
    handlerMap[event] = (...args: any[]) => {
      const rowData = data.row
      eventHandlers[event](...args, rowData, proxy)
    }
  })
  return handlerMap
}
</script>

<template>
  <!-- 渲染数组类型 -->
  <div v-if="isArrayField" class="justify-center gap-10px lg:flex">
    <el-tag
      v-for="(item, index) in modelValue"
      :key="index"
      :color="safeGetLabel(item).color"
      v-bind="props?.props || {}"
      v-on="handleEvent(props?.props?.on)"
    >
      {{ safeGetLabel(item).label }}
    </el-tag>
  </div>
  <!-- 渲染非数组类型 -->
  <div v-else>
    <el-tag
      :color="safeGetLabel(modelValue).color"
      v-bind="props?.props"
      v-on="handleEvent(props?.props?.on)"
    >
      {{ safeGetLabel(modelValue).label }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">
:deep {
  .el-tag {
    border: none;
  }
}
</style>
