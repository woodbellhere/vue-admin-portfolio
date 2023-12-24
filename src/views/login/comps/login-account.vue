<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from "vue";
import { useStore } from "vuex";
import LocalCache from "@/utils/cache";
import { accountRules } from "../config/account-rules";
import { ElForm } from "element-plus";
//
const account = reactive({
  name: "",
  password: "",
});
// instancetype用于获取form实例类型
const formRef = ref<InstanceType<typeof ElForm>>();

const store = useStore();
const loginAction = (isKeepPassWord: boolean) => {
  // console.log("account login now");
  formRef.value?.validate((valid) => {
    if (valid) {
      // 首先，是否需要记住密码
      if (isKeepPassWord) {
        LocalCache.setCache("name", account.name);
        LocalCache.setCache("password", account.password);
        // 如果不记住就删除本地缓存
      } else {
        LocalCache.deleteCache("name");
        LocalCache.deleteCache("password");
      }
      // 然后是登录逻辑
      // 由vuex统一管理
      store.dispatch("login/accountLoginAction", { ...account });
    }
    console.log(valid);
  });
};
// 给个默认账户和密码则下一次登录时按理说就能读取到本地存储
const setFormFields = (name: string, password: string) => {
  account.name = name || account.name;
  account.password = password || account.password;
};
// 暴露给外部使用
defineExpose({
  loginAction,
  setFormFields,
});
</script>

<style scoped></style>
