<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { verify } from "~/base/api/google2f";
import { useMessage } from "@/hooks/useMessage";

const props = defineProps({
  isVerify: Boolean, // 是否已验证
});
const emit = defineEmits(["pass"]);

const userStore = useUserStore();
const visible = ref(false);
const alertMsg = ref("");
const codeValue = ref("");
const googleSecretKey = ref("");
const isVerifying = ref(false);
const msg = useMessage();
async function handleBeforeOk() {
  if (!codeValue.value) {
    msg.warning("请输入验证码");
    return false;
  }

  if (!googleSecretKey.value) {
    msg.warning("缺少密钥信息");
    return false;
  }

  isVerifying.value = true;
  try {
    const response = await verify(codeValue.value, googleSecretKey.value);
    if (response.success && response.data?.is_pass === true) {
      emit("pass", true);
      codeValue.value = "";
      msg.success("验证成功！");
      return true;
    } else {
      msg.error(response.message || "验证失败");
      return false;
    }
  } catch (error: any) {
    msg.error(error.message || "请求异常，请重试！");
    return false;
  } finally {
    isVerifying.value = false;
    visible.value = false;
  }
}

function handleCancel() {
  visible.value = false;
  codeValue.value = "";
}

async function handleEnter() {
  const result = await handleBeforeOk();
  if (result) {
    visible.value = false;
  }
}

function open(msg: string, google_secret_key: string = "") {
  alertMsg.value = msg;
  googleSecretKey.value = google_secret_key;
  visible.value = true;
}

// 判断是否需要验证的方法
function isNeedGoogleTwoFa() {
  return userStore.userInfo?.is_enabled_google === true && !props.isVerify;
}

defineExpose({ open, isNeedGoogleTwoFa });
</script>

<template>
  <el-dialog
    v-model="visible"
    title="Google Authenticator Code"
    width="30%"
    :before-close="handleCancel"
  >
    <el-alert type="warning" :closable="false">
      {{ alertMsg }}
    </el-alert>
    <el-divider />
    <el-input
      v-model="codeValue"
      type="text"
      placeholder="请输入 Google Authenticator Code"
      clearable
      @keyup.enter="handleEnter"
    />
    <template #footer>
      <el-button type="primary" :loading="isVerifying" @click="handleBeforeOk">
        验证
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
/* 保持原有样式 */
</style>
