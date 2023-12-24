<template>
  <div class="page-content">
    <WoodTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header部分插槽，这些template专门用于给同名slot传内容 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick">新建用户</el-button>
      </template>
      <!-- 都是列表中的插槽，还使劲实现了作用域插槽 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? "启用" : "禁用"
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            text
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            text
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </WoodTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import WoodTable from "@/base-ui/table";
import { formatTime } from "@/utils/date-format";
const store = useStore();
interface Props {
  pageName: string;
  contentTableConfig: any;
}

const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  contentTableConfig: () => ({}),
});

// 双向绑定分页信息pageInfo，如果pageInfo有变化，则监听器直接调用更新，不然分页没法正常跳转
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(pageInfo, () => getPageData());
// 发请求查询用户列表
const getPageData = (queryInfo: any = {}) => {
  store.dispatch("system/getPageListAction", {
    // 多个页面都会使用这个组件，也给这个函数传参数，另一种麻烦的写法是switch判断不同名字
    pageName: props.pageName,
    // offset是偏移量，一般 offset * pagesize就能得出整个分页应该偏移多少来容纳后续的新条目
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo,
    },
  });
};
// 组件加载就获取一下
getPageData();

// 表格中的两个主要数据
const dataList = computed(() => {
  store.getters[`system/pageListData`](props.pageName);
});
const dataCount = computed(() => {
  store.getters[`system/pageListCount`](props.pageName);
});

// 新建用户的emit
const emit = defineEmits<{
  (e: "newBtnClick"): void;
  (e: "editBtnClick", item: any): void;
}>();
// 删除 编辑和新建操作
const handleDeleteClick = (item: any) => {
  console.log(item);
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id: item.id,
  });
};

const handleNewClick = () => {
  emit("newBtnClick");
};

const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};

defineExpose({ getPageData });
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
