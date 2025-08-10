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

import { cancel, page } from '~/transaction/api/DisbursementOrder.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

import WriteOffForm from './WriteOffForm.vue'
import DistributeForm from './DistributeForm.vue'

defineOptions({ name: 'transaction:disbursement_order' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const writeOffFormRef = ref()
const distributeFormRef = ref()
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
const checkboxGroupAllocation = ref([])
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
      return (
        `| ${
          t('disbursement_order.query_total')
        }: ${
          responseTableData.value.total}`
      )
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
      status: 0,
    },
    responseDataHandler: (response: Record<string, any>) => {
      responseTableData.value = response
      return response.list
    },
  },
})
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t, true),
  // 表格列
  tableColumns: getTableColumns(writeOffDialog, distributeDialog, t),
})
const allocationOptions = ref([
  { label: t('disbursement_order.undistributed'), value: 1 },
  { label: t('disbursement_order.distributed'), value: 2 },
])

function handleCheckedAllocationChange(val) {
  proTableRef.value.setRequestParams(
    {
      allocation: val,
    },
    true,
  )
}

// 批量取消
function handleCancel() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.cancelMessage')).then(async () => {
    const response = await cancel(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.cancelSuccess'))
      proTableRef.value.refresh()
    }
  })
}
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #toolbarLeft>
        <el-button
          v-auth="['transaction:transaction_voucher:update']"
          type="danger"
          plain
          :disabled="selections.length < 1"
          @click="handleCancel"
        >
          {{ t("crud.cancel") }}
        </el-button>
        <NmSearch :proxy="proTableRef" :row="2" />
        <el-checkbox-group
          v-model="checkboxGroupAllocation"
          :max="1"
          @change="handleCheckedAllocationChange"
        >
          <el-checkbox-button
            v-for="option in allocationOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-checkbox-group>
      </template>
    </MaProTable>

    <component :is="writeOffDialog.Dialog">
      <template #default="{ data }">
        <!-- 新增、编辑表单 -->
        <WriteOffForm ref="writeOffFormRef" :data="data" />
      </template>
    </component>
    <component :is="distributeDialog.Dialog">
      <template #default="{ data }">
        <!-- 新增、编辑表单 -->
        <DistributeForm ref="distributeFormRef" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss"></style>
