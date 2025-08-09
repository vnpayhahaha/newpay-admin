<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="ts">
import type { DisbursementOrderVo, DistributerVo } from '~/transaction/api/DisbursementOrder.ts'
import { distribute, save } from '~/transaction/api/DisbursementOrder.ts'
import getFormItems from './components/GetDistributeFormItems.tsx'
import type { MaFormExpose } from '@mineadmin/form'
import useForm from '@/hooks/useForm.ts'
import { ResultCode } from '@/utils/ResultCode.ts'

const { data = null } = defineProps<{
  data?: DisbursementOrderVo | null
}>()

const t = useTrans().globalTrans
const maFormRef = ref<MaFormExpose>()
const formModel = ref<DisbursementOrderVo>({})

useForm('maFormRef').then((form: MaFormExpose) => {
  if (data) {
    Object.keys(data).map((key: string) => {
      formModel.value[key] = data[key]
    })
  }
  form.setItems(getFormItems(t, formModel.value))
  form.setOptions({
    labelWidth: '180px',
  })
})

// 核销操作
function distributeHandle(): Promise<any> {
  console.log('writeOffHandle', formModel.value)

  return new Promise((resolve, reject) => {
    distribute({ ...formModel.value, ids: [formModel.value?.id] })
      .then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res)
      })
      .catch((err) => {
        reject(err.response.message)
      })
  })
}

defineExpose({
  distributeHandle,
  maForm: maFormRef,
})
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss"></style>
