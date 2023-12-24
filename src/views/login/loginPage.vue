<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from "./comps/login-panel.vue";
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
