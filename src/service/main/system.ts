import woodRequest from "../index";
import { IDataType } from "../types";
// 查询页面列表数据
export function getPageListData(url: string, queryInfo: any) {
  return woodRequest.post<IDataType>({
    url: url, // url: pageName + /list => user/list
    data: queryInfo,
  });
}
// 删除某条记录
export function deletePageData(url: string) {
  return woodRequest.delete<IDataType>({
    url: url, // url: pageName + /1 => /users/id
  });
}
// 创建某条记录
export function createPageData(url: string, newData: any) {
  return woodRequest.post<IDataType>({
    url: url,
    data: newData,
  });
}
// 修改某条记录
export function editPageData(url: string, editData: any) {
  return woodRequest.patch<IDataType>({
    url: url,
    data: editData,
  });
}
