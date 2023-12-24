// 用户页用户信息栏的格式
export const contentTableConfig = {
  title: "用户列表",
  propsList: [
    {
      prop: "name",
      label: "用户名",
      minWidth: "80",
    },
    {
      prop: "realName",
      label: "真实姓名",
      minWidth: "80",
    },
    { prop: "cellPhone", label: "手机号码", minWidth: "100" },
    { prop: "enable", label: "状态", minWidth: "80", slotName: "status" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "80",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "80",
      slotName: "updateAt",
    },
    {
      prop: "handler",
      label: "操作",
      minWidth: "100",
      slotName: "handler",
    },
  ],
  // 显示序号列
  showIndexColumn: true,
  // 显示多选列
  showSelectColumn: true,
};
