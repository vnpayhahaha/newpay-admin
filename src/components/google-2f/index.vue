<!--
 - Google 2FA Verification Component
-->
<i18n lang="yaml">
en:
  title: Google Authenticator Code
  placeholder: Please enter Google Authenticator Code
  verify: Verify
  enterCode: Please enter verification code
  missingKey: Missing key information
  verifySuccess: Verification successful!
  verifyFailed: Verification failed
  requestError: Request error, please try again!
zh_CN:
  title: Google 验证码
  placeholder: 请输入 Google 验证码
  verify: 验证
  enterCode: 请输入验证码
  missingKey: 缺少密钥信息
  verifySuccess: 验证成功！
  verifyFailed: 验证失败
  requestError: 请求异常，请重试！
zh_TW:
  title: Google 驗證碼
  placeholder: 請輸入 Google 驗證碼
  verify: 驗證
  enterCode: 請輸入驗證碼
  missingKey: 缺少金鑰資訊
  verifySuccess: 驗證成功！
  verifyFailed: 驗證失敗
  requestError: 請求異常，請重試！
</i18n>

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
// 使用响应式用户信息
const userInfo = ref({ ...userStore.getUserInfo() });

async function handleBeforeOk() {
  if (!codeValue.value) {
    msg.warning(t("enterCode"));
    return false;
  }

  if (!googleSecretKey.value) {
    msg.warning(t("missingKey"));
    return false;
  }

  isVerifying.value = true;
  try {
    const response = await verify(codeValue.value, googleSecretKey.value);
    if (response.success && response.data?.is_pass === true) {
      emit("pass", true);
      codeValue.value = "";
      msg.success(t("verifySuccess"));
      return true;
    } else {
      msg.error(response.message || t("verifyFailed"));
      return false;
    }
  } catch (error: any) {
    msg.error(error.message || t("requestError"));
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
  return userInfo.value?.is_enabled_google === true && !props.isVerify;
}

defineExpose({ open, isNeedGoogleTwoFa });

// 使用全局 t 函数
const { t } = useTrans();
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="t('title')"
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
      :placeholder="t('placeholder')"
      clearable
      @keyup.enter="handleEnter"
    />
    <template #footer>
      <el-button type="primary" :loading="isVerifying" @click="handleBeforeOk">
        {{ t("verify") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
/* 保持原有样式 */
</style>
