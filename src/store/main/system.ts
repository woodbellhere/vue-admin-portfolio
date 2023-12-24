import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    },
  },
  // pageName/list是查询用户列表的post接口
  // 分页效果利用offset，将列表平移出视野实现
  // 分页规模用size指定
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 获取页面url
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      //对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // 并将获取的数据存到state中,list真是指定的内容数组，totalCount是它的长度
      const { list, totalCount } = pageResult.data;
      // 然后将pageName的字符串改成首字母大写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取上传的页面名称和id
      const { pageName, id } = payload;
      // 构造一个url字符串
      const pageUrl = `/${pageName}/${id}`;
      // 调用删除操作删除这个url
      await deletePageData(pageUrl);
      // 同时重新请求最新数据来更新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 获取，拼接并调用创建操作
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 请求新数据以更新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 一样的思路，获取构建发请求
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 然后更新当前数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
