<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="tsx">
import type {
  MaProTableExpose,
  MaProTableOptions,
  MaProTableSchema,
} from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { page } from '~/transaction/api/DisbursementOrder.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'

import WriteOffForm from './WriteOffForm.vue'
import DistributeForm from './DistributeForm.vue'
import DownloadForm from './DownloadForm.vue'

defineOptions({ name: 'transaction:disbursement_order' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const writeOffFormRef = ref()
const distributeFormRef = ref()
const downloadFormRef = ref()
const setFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()

// 弹窗配置
const writeOffDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = writeOffFormRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        writeOffFormRef.value
          .writeOffHandle()
          .then((res: any) => {
            res.code === 200
              ? msg.success(t('crud.updateSuccess'))
              : msg.error(res.message)
            writeOffDialog.close()
            proTableRef.value.refresh()
          })
          .catch((err: any) => {
            msg.alertError(err.response.data?.message)
          })
      })
      .catch()
    okLoadingState(false)
  },
})
const distributeDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = distributeFormRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        distributeFormRef.value
          .distributeHandle()
          .then((res: any) => {
            res.code === 200
              ? msg.success(t('crud.updateSuccess'))
              : msg.error(res.message)
            distributeDialog.close()
            proTableRef.value.refresh()
          })
          .catch((err: any) => {
            msg.alertError(err.response.data?.message)
          })
      })
      .catch()
    okLoadingState(false)
  },
})
const downloadDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: (_, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    const elForm = downloadFormRef.value.maForm.getElFormRef()
    // 验证通过后
    elForm
      .validate()
      .then(() => {
        const selectValue = downloadFormRef.value.downloadHandle()
        downloadDialog.close()
        proTableRef.value.search({ ...selectValue })
      })
      .catch()
    okLoadingState(false)
  },
})
const responseTableData = ref<Record<string, any>>({
  list: [],
  total: 0,
})
// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('disbursement_order.index'),
    subTitle: () => {
      return `| ${t('disbursement_order.query_total')}: ${
        responseTableData.value.total
      }`
    },
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => (selections.value = selection),
    },
  },
  // 搜索参数
  searchOptions: {
    fold: true,
    text: {
      searchBtn: () => t('crud.search'),
      resetBtn: () => t('crud.reset'),
      isFoldBtn: () => t('crud.searchFold'),
      notFoldBtn: () => t('crud.searchUnFold'),
    },
  },
  // 搜索表单参数
  searchFormOptions: { labelWidth: '150px' },
  // 请求配置
  requestOptions: {
    api: page,
    requestParams: {
      orderBy: 'id',
      orderType: 'desc',
      status: 11,
      channel_type: 1,
    },
    autoRequest: false,
    responseDataHandler: (response: Record<string, any>) => {
      responseTableData.value = response
      return response.list
    },
  },
})
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t, true, true),
  // 表格列
  tableColumns: getTableColumns(writeOffDialog, distributeDialog, t),
})
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #toolbarLeft>
        <NmSearch :proxy="proTableRef" :row="2" />
      </template>
      <!-- 数据为空时 -->
      <template #empty>
        <el-empty>
          <el-button
            type="primary"
            @click="() => {
              downloadDialog.setTitle(t('bankStatement.download'))
              downloadDialog.open({ t })
            }"
          >
            {{ t('bankStatement.download') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <component :is="writeOffDialog.Dialog">
      <template #default="{ data }">
        <!-- 核销表单 -->
        <WriteOffForm ref="writeOffFormRef" :data="data" />
      </template>
    </component>
    <component :is="distributeDialog.Dialog">
      <template #default="{ data }">
        <!-- 分配表单 -->
        <DistributeForm ref="distributeFormRef" :data="data" />
      </template>
    </component>
    <component :is="downloadDialog.Dialog">
      <template #default="{ data }">
        <!-- download -->
        <DownloadForm ref="downloadFormRef" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
