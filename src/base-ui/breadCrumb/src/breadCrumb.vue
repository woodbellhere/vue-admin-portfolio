<template>
  <div class="nav-breadCrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { IBreadCrumb } from "../types";
interface Props {
  breadCrumbs: IBreadCrumb[];
}
// 定义面包屑props并默认一个空数组给它？
const props = withDefaults(defineProps<Props>(), {
  breadCrumbs: () => [],
});
</script>

<style lang="scss" scoped></style>
