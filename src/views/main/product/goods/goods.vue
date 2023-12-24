<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          :style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/components/page-content";
import { contentTableConfig } from "../../system/user/config/content.config";
</script>

<style scoped></style>
