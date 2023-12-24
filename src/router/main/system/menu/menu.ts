// 动态菜单-权限管理中的路由映射表
const menu = () => import("@/views/main/system/menu/menu.vue");
export default {
  path: "/main/system/menu",
  name: "menu",
  component: menu,
  children: [],
};
