// 动态菜单-权限管理中的路由映射表
const department = () =>
  import("@/views/main/system/department/department.vue");
export default {
  path: "/main/system/department",
  name: "department",
  component: department,
  children: [],
};
