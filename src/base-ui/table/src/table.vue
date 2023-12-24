<template>
  <div class="wood-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
      v-bind="childrenProps"
    >
      <!-- 上面标签的一些属性主要用来给menu页面展示用 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 具名template专门用来给同名slot传内容 -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- current-page和page-size基本都是和外部双向绑定的，用于给分页偏移做支撑 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        ></el-pagination>
        <!-- total是共xx页，sizes是xxx条/页 pager是当前页 prev和next都好懂，jumper是跳转， page-sizes是可以选择每页展示多少条， page-size是每次给服务器发请求的请求数目 -->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  listData: Array<any>;
  listCount?: number;
  propList: Array<any>;
  page?: { currentPage: number; pageSize: number };
  childrenProps?: any;
  showIndexColumn?: boolean;
  showSelectColumn?: boolean;
  showFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  listData: () => [],
  listCount: 0,
  propList: () => [],
  // 当前页和每页条数
  page: () => ({ currentPage: 0, pageSize: 10 }),
  childrenProps: () => ({}),
  showIndexColumn: true,
  showSelectColumn: true,
  showFooter: true,
});

// 定义了输入框的输入事件
const emit = defineEmits<{
  (e: "selectionChange", value: any): void;
  (e: "update:page", value: any): void;
}>();
// 监听表格选择
const handleSelectionChange = (value: any) => {
  emit("selectionChange", value);
};
// 监听分页组件的每页条目数量
const handleCurrentChange = (currentPage: number) => {
  emit("update:page", { ...props.page, currentPage });
};
// 监听分页组件的当前页码变化
const handleSizeChange = (pageSize: number) => {
  emit("update:page", { ...props.page, pageSize });
};

defineExpose({
  handleSelectionChange,
  handleCurrentChange,
  handleSizeChange,
});
</script>

<style lang="scss" scoped></style>
