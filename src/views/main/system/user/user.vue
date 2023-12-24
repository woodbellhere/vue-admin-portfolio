<template>
  <div class="user">
    <!-- 两个config就是传进来的props数据直接绑到两个组件上 -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
    ></PageContent>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

const pageContentRef = ref<InstanceType<typeof PageContent>>();
// 新建用户
const handleNewData = () => {
  console.log("handleNewData");
};
// 查询按钮 新页面
const handleQueryClick = (formData: any) => {
  pageContentRef.value?.getPageData(formData);
};
// 重置按钮 页面内容
const handleResetClick = () => {
  pageContentRef.value?.getPageData();
};
</script>

<style lang="scss" scoped></style>
