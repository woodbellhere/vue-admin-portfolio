// 动态菜单-权限管理中的路由映射表
const user = () => import("@/views/main/system/user/user.vue");
export default {
  path: "/main/system/user",
  name: "user",
  component: user,
  children: [],
};
