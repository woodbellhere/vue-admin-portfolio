<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <WoodBreadCrumb :breadCrumbs="breadCrumbs"></WoodBreadCrumb>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineExpose } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { pathMapBreadCrumbs } from "@utils/mapMenus";
import { IStoreType } from "@/store/types";
import UserInfo from "./user-info";

// 侧边栏折叠相关
const isFold = ref(false);

const store = useStore<IStoreType>();
const route = useRoute();

// 获取面包屑数组信息
const breadCrumbs = computed(() => {
  const userMenus = store.state.login.userMenus;
  const currentPath = route.path;
  return pathMapBreadCrumbs(userMenus, currentPath);
});

// 还是展开折叠侧边栏的函数，但是emit出去让mainpage触发
const emit = defineEmits(["foldChange"]);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};
defineExpose({ isFold, handleFoldClick });
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
