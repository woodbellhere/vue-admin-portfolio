// 动态菜单-权限管理中的路由映射表
const role = () => import("@/views/main/system/role/role.vue");
export default {
  path: "/main/system/role",
  name: "role",
  component: role,
  children: [],
};
