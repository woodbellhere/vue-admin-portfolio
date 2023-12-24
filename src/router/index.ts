import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import LocalCache from "@/utils/cache";

const routeMap: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/loginPage.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/mainPage.vue"),
    // children:[]这里直接写就是写死所谓动态菜单了
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/notFound/NotFoundPage.vue"),
  },
];
const router = createRouter({
  routes: routeMap,
  history: createWebHashHistory(process.env.BASE_URL),
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  if (to.path === "/main") {
    return "/main/system/user";
  }
});

export default router;
