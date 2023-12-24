import woodRequest from "../index";

import type { IAccount, ILoginResult } from "./type";
import { IDataType } from "@/service/types";

// 弄一个列举存地址，下面就可以直接调用
enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/",
}

export function accountLoginActionRequest(account: IAccount) {
  return woodRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return woodRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return woodRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false,
  });
}
