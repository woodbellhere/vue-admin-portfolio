// 路由数据的格式
import { RouteRecordRaw } from "vue-router";
import { IBreadCrumb } from "@/base-ui/breadCrumb";

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 先获取所有的routes数据
  const allRoutes: RouteRecordRaw[] = [];
  // 而且真的就是遍历导出的对象，require.context是webpack的函数，用于获取文件加
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    // 实际上route获取的是webpack中包装过的模块，具体的路由数据存在default属性里
    allRoutes.push(route.default);
  });

  // 把刚刚的allRoutes放到菜单数组中
  const recurGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 判断路由是否是需要展开的二级菜单
      if (menu.type === 2) {
        // route.path是特定菜单/选项的文件名，menu.url是user信息里的权限
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
      } else {
        recurGetRoute(menu.children); // 递归
      }
    }
  };
  // 直接接收上面mapMenusToRoutes处理过的路由数组
  recurGetRoute(userMenus);
  // 返回开头定义的数组
  return routes;
}

// 将路径转成面包屑
export function pathMapBreadRrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[],
): any {
  for (const menu of userMenus) {
    // 如果是多级目录就递归的取呗
    if (menu.type === 1) {
      // 将首个路由地址作为fallback值/默认值
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}
