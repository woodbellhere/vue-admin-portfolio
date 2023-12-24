<template>
  <div class="app" :locale="locale">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = ref(zhCn);
</script>

<style>
.app {
  height: 100%;
  background-color: #f1f3f5;
}
</style>
