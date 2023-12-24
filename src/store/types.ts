import { ILoginState } from "./login/types";

export interface IRootState {
  name: string;
  age: number;
}

export interface IRootWithModule {
  login: ILoginState;
}

// 有个交叉类型的例子
export type IStoreType = IRootState & IRootWithModule;
