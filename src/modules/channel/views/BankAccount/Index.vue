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
import type { MaProTableExpose, MaProTableOptions, MaProTableSchema } from '@mineadmin/pro-table'
import type { Ref } from 'vue'
import type { TransType } from '@/hooks/auto-imports/useTrans.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { deleteByIds, page, realDelete, recovery } from '~/channel/api/BankAccount.ts'
import getSearchItems from './components/GetSearchItems.tsx'
import getTableColumns from './components/GetTableColumns.tsx'
import useDialog from '@/hooks/useDialog.ts'
import { useMessage } from '@/hooks/useMessage.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import { useProTableToolbar } from '@mineadmin/pro-table'
import MaRecycle from '@/components/ma-recycle/index.vue'

import Form from './Form.vue'
import { orderBy } from 'lodash-es'

defineOptions({ name: 'channel:bank_account' })

const proTableRef = ref<MaProTableExpose>() as Ref<MaProTableExpose>
const formRef = ref()
const setFormRef = ref()
const selections = ref<any[]>([])
const i18n = useTrans() as TransType
const t = i18n.globalTrans
const local = i18n.localTrans
const msg = useMessage()
const tableToolBar = useProTableToolbar()

// 管理回收站状态
const isRecovery = ref(false)
const maRecycleRef = ref()

const IndexName = 'backAccount:Index'
const isRecoveryAdded = ref(false)
onActivated(() => {
  // console.log(`[${IndexName}] Activated`)
  // 确保按钮只添加一次
  if (!isRecoveryAdded.value) {
    tableToolBar.add({
      name: IndexName,
      order: 0,
      show: true,
      render: () => h(MaRecycle, {
        'ref': maRecycleRef, // 绑定引用
        'proxy': proTableRef.value,
        'isRecovery': isRecovery.value,
        'onUpdate:isRecovery': (value: boolean) => {
          isRecovery.value = value
        },
      }),
    })
    isRecoveryAdded.value = true
  }
})

onDeactivated(() => {
  // console.log(`[${IndexName}] Deactivated`)
  // 移除工具栏按钮
  tableToolBar.remove(IndexName)
  isRecoveryAdded.value = false
})

// 弹窗配置
const maDialog: UseDialogExpose = useDialog({
  // 保存数据
  ok: ({ formType }, okLoadingState: (state: boolean) => void) => {
    okLoadingState(true)
    if (['add', 'edit'].includes(formType)) {
      const elForm = formRef.value.maForm.getElFormRef()
      // 验证通过后
      elForm.validate().then(() => {
        switch (formType) {
          // 新增
          case 'add':
            formRef.value.add().then((res: any) => {
              res.code === ResultCode.SUCCESS ? msg.success(t('crud.createSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err)
            })
            break
          // 修改
          case 'edit':
            formRef.value.edit().then((res: any) => {
              res.code === 200 ? msg.success(t('crud.updateSuccess')) : msg.error(res.message)
              maDialog.close()
              proTableRef.value.refresh()
            }).catch((err: any) => {
              msg.alertError(err)
            })
            break
        }
      }).catch()
    }
    okLoadingState(false)
  },
})

// 参数配置
const options = ref<MaProTableOptions>({
  // 表格距离底部的像素偏移适配
  adaptionOffsetBottom: 161,
  header: {
    mainTitle: () => t('bankAccount.index'),
  },
  // 表格参数
  tableOptions: {
    on: {
      // 表格选择事件
      onSelectionChange: (selection: any[]) => selections.value = selection,
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
    },
  },
})
// 架构配置
const schema = ref<MaProTableSchema>({
  // 搜索项
  searchItems: getSearchItems(t),
  // 表格列
  tableColumns: getTableColumns(maDialog, formRef, t),
})

// 批量删除
function handleDelete() {
  const ids = selections.value.map((item: any) => item.id)
  if (isRecovery.value) {
    msg.delConfirm(t('crud.realDeleteDataMessage')).then(async () => {
      const response = await realDelete(ids)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value.refresh()
      }
    })
  }
  else {
    msg.delConfirm(t('crud.delMessage')).then(async () => {
      const response = await deleteByIds(ids)
      if (response.code === ResultCode.SUCCESS) {
        msg.success(t('crud.delSuccess'))
        proTableRef.value.refresh()
      }
    })
  }
}

// 批量恢复
function handleRecovery() {
  const ids = selections.value.map((item: any) => item.id)
  msg.confirm(t('crud.restoreMessage')).then(async () => {
    const response = await recovery(ids)
    if (response.code === ResultCode.SUCCESS) {
      msg.success(t('crud.restoreSuccess'))
      proTableRef.value.refresh()
    }
  })
}
</script>

<template>
  <div class="mine-layout pt-3">
    <MaProTable ref="proTableRef" :options="options" :schema="schema">
      <template #actions>
        <el-button
          v-auth="['channel:bank_account:save']"
          type="primary"
          @click="() => {
            maDialog.setTitle(t('crud.add'))
            maDialog.open({ formType: 'add' })
          }"
        >
          {{ t('crud.add') }}
        </el-button>
      </template>

      <template #toolbarLeft>
        <el-button-group>
          <el-button
            v-auth="['channel:bank_account:delete']"
            type="danger"
            plain
            :disabled="selections.length < 1"
            @click="handleDelete"
          >
            {{ t('crud.delete') }}
          </el-button>
          <el-button
            v-if="isRecovery"
            v-auth="['channel:bank_account:recovery']"
            type="success"
            plain
            :disabled="selections.length < 1"
            @click="handleRecovery"
          >
            {{ t('crud.restore') }}
          </el-button>
        </el-button-group>
      </template>
      <!-- 数据为空时 -->
      <template #empty>
        <el-empty>
          <el-button
            v-auth="['channel:bank_account:save']"
            type="primary"
            @click="() => {
              maDialog.setTitle(t('crud.add'))
              maDialog.open({ formType: 'add' })
            }"
          >
            {{ t('crud.add') }}
          </el-button>
        </el-empty>
      </template>
    </MaProTable>

    <component :is="maDialog.Dialog">
      <template #default="{ formType, data }">
        <!-- 新增、编辑表单 -->
        <Form ref="formRef" :form-type="formType" :data="data" />
      </template>
    </component>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table th.cellBackgroundBlue.el-table__cell){
  background-color: rgb(148,191,255,0.3) !important;
}

:deep(.el-table td.cellBackgroundBlue.el-table__cell){
  background-color: rgb(148,191,255,0.3) !important;
}
:deep(.el-table th.cellBackgroundRed.el-table__cell){
  background-color: rgba(253,171,171,0.3) !important;
}

:deep(.el-table td.cellBackgroundRed.el-table__cell){
  background-color: rgba(253,171,171,0.3) !important;
}
</style>
