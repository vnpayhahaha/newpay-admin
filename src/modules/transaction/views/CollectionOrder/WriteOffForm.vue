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
import type { CollectionOrderVo } from "~/transaction/api/CollectionOrder.ts";
import { create, save } from "~/transaction/api/CollectionOrder.ts";
import getFormItems from "./components/GetWriteOffFormItems.tsx";
import type { MaFormExpose } from "@mineadmin/form";
import useForm from "@/hooks/useForm.ts";
import { ResultCode } from "@/utils/ResultCode.ts";

const { data = null } = defineProps<{
  data?: CollectionOrderVo | null;
}>();

const t = useTrans().globalTrans;
const maFormRef = ref<MaFormExpose>();
const formModel = ref<CollectionOrderVo>({});

useForm("maFormRef").then((form: MaFormExpose) => {
  form.setItems(getFormItems(t, formModel.value));
  form.setOptions({
    labelWidth: "180px",
  });
});

// 核销操作
function writeOffHandle(): Promise<any> {
  return new Promise((resolve, reject) => {
    create(formModel.value)
      .then((res: any) => {
        res.code === ResultCode.SUCCESS ? resolve(res) : reject(res);
      })
      .catch((err) => {
        reject(err.response.message);
      });
  });
}

defineExpose({
  writeOffHandle,
  maForm: maFormRef,
});
</script>

<template>
  <ma-form ref="maFormRef" v-model="formModel" />
</template>

<style scoped lang="scss"></style>
