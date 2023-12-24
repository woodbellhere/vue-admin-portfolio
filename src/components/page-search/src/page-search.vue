<template>
  <div class="formData" v-bind="searchFormConfig">
    <WoodForm v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </div>
      </template>
    </WoodForm>
  </div>
</template>

<script setup lang="ts">
// 整个pagesearch组件依赖于woodForm组件
import { ref } from "vue";
import WoodForm from "@/base-ui/form";
interface Props {
  searchFormConfig: any;
}

const props = withDefaults(defineProps<Props>(), {
  searchFormConfig: () => ({}),
});
// 双向绑定触发这俩事件
const emit = defineEmits<{
  (e: "resetBtnClick"): void;
  (e: "queryBtnClick", newFormData: any): void;
}>();
// 从纯业务来讲，直接修改传过来的formData Props也可以，但是打破单向数据流，所以从规范出发需要一个新数据来接
// 一个亮点，复杂的双向绑定实现
// 具体表单里有什么数据要config文件确定，这里塞个空字符串等着
const formItems = props.searchFormConfig?.formItems ?? [];
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = "";
}
// 这样就能拿到一个动态的origin表单数据
const formData = ref(formOriginData);

// 重置按钮的重置操作
const handleResetClick = () => {
  // 用户自定义数据后点击即可重新设置表单内容
  // 相当于这个实现
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key];
  // }
  formData.value = formOriginData;
  emit("resetBtnClick");
};
// 查询按钮发起查询请求
const handleQueryClick = () => {
  emit("queryBtnClick", formData.value);
};
</script>

<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
