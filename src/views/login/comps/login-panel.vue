<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-control">
      <el-checkbox v-model="isKeepPassWord">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { User, Iphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import LocalCache from "@/utils/cache";

const isKeepPassWord = ref(false);
// 获取两个选项卡组件的dom以备操作
const accountRef = ref<InstanceType<typeof LoginAccount>>();
const phoneRef = ref<InstanceType<typeof LoginPhone>>();
// 保存当前被用户选择的登录选项卡(默认是账号登录)，值由el-标签的name属性提供，本身通过v-model和el-tab联动
const currentTab = ref("account");

const handleLoginClick = () => {
  if (currentTab.value === "account") {
    console.log("login now");
    accountRef.value?.loginAction(isKeepPassWord.value);
  } else {
    console.log("验证码已发送");
    // 可以脑补一些登录逻辑
    phoneRef.value?.loginAction();
  }
};
// 页面挂载时就获取保存的账密信息，没有就给个默认账密
onMounted(() => {
  const name = LocalCache.getCache("name") || "woodbell";
  const password = LocalCache.getCache("password") || 123456;
  accountRef.value?.setFormFields(name, password);
});
</script>

<style scoped>
.login-panel {
  width: 24rem;
  margin-bottom: 15vh;
  transform: scale(1.3);
}
.login-panel .title {
  text-align: center;
}
.login-control {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 8px;
}
</style>
