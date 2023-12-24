import {
  accountLoginActionRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import LocalCache from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/mapMenus";
import Router from "@/router";
import type { Module } from "vuex";
import type { IAccount } from "@/service/login/type";
import type { IRootState } from "../types";
import type { ILoginState } from "./types";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      // permissions: [],
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    // 保存当前的用户信息，为了后续的不同权限展示做准备
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    // 顺着获取用户菜单一次性解决动态注册路由
    changeUserMenus(state, UserMenus: any) {
      // 获取用户菜单
      state.userMenus = UserMenus;
      // 映射二级菜单（需要展开的那一级）以取出路由表
      const routes = mapMenusToRoutes(UserMenus);
      // 动态添加路由到main的子路由中
      routes.forEach((route) => {
        Router.addRoute("main", route);
      });
    },
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log("execute accountLoginAction", payload);
      // 开始实现登录逻辑
      const loginResult = await accountLoginActionRequest(payload);
      // console.log(loginResult);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      LocalCache.setCache("token", token);

      // 请求用户信息，来获取当前用户应该看到的菜单
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      LocalCache.setCache("userInfo", userInfo);

      // 实际请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      LocalCache.setCache("userMenus", userMenus);
      // 还是跳转到主页
      Router.push("/main");
    },
    // 每次加载页面都重新获取一次各种缓存，统称 setupStore，主要是vuex本身每次刷新页面就失效，所以你就搞个本地储存
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = LocalCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = LocalCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log("execute phoneLoginAction");
    },
  },
};

export default loginModule;
