export const contentTableConfig = {
  title: "菜单列表",
  propsList: [
    {
      prop: "name",
      label: "菜单名称",
      minWidth: "100",
    },
    {
      prop: "type",
      label: "类型",
      minWidth: "60",
    },
    { prop: "url", label: "菜单url", minWidth: "100" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
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
  showIndexColumn: false,
  // 显示多选列
  showSelectColumn: false,
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  },
};
