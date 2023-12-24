<template>
  <div class="login-account">
    <el-form label-width="4vw" :rules="phoneRules" :model="phone">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="veriNum">
        <div class="get-veriNum">
          <el-input v-model="phone.veriNum" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineExpose } from "vue";
import { useStore } from "vuex";

import { phoneRules } from "../config/account-rules";
const phone = reactive({
  num: "",
  veriNum: "",
});
const store = useStore();

const loginAction = () => {
  // 由vuex统一管理
  store.dispatch("login/phoneLoginAction", { ...phone });
  console.log(phone);
};

defineExpose({
  loginAction,
});
</script>

<style scoped>
.el-form {
  white-space: nowrap;
}
.get-veriNum {
  display: flex;
  gap: 1vw;
}
</style>
