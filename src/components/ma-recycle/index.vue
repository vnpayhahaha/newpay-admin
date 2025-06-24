<script setup lang="ts">
// 定义 props 来接收 `ma-pro-table` 传入的 proxy 参数
import type { MaProTableExpose } from '@mineadmin/pro-table'
import { ElMessage } from 'element-plus'

const { proxy } = defineProps<{ proxy: MaProTableExpose }>()
const isRecovery = ref(false)
async function execute() {
  isRecovery.value = !isRecovery.value
  proxy.setRequestParams({
    recycle: isRecovery.value,
  }, false)
  if (isRecovery.value) {
    console.log('已进入回收站', proxy.getTableColumns())
  }
  else {
    ElMessage.info('已退出回收站')
  }
  // 执行刷新表格
  await proxy?.refresh?.()
  ElMessage.success('表格刷新成功')
}
</script>

<template>
  <!-- 加入 circle 属性成为圆按钮，与系统的保持统一 -->
  <el-button class="el-button is-circle ml-[12px]">
    <ma-svg-icon
      name="i-ci:transfer" size="1.2em" @click="execute"
    />
  </el-button>
</template>
