import { IForm } from "@/base-ui/form";
// 用户页搜索栏的搜索栏格式
export const searchFormConfig: IForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 40px",
  },
  colLayout: {
    span: 8,
  },
  formItems: [
    {
      field: "id",
      type: "input",
      label: "id",
      placeholder: "请输入id",
    },
    {
      field: "name",
      type: "input",
      label: "用户名",
      placeholder: "",
    },
    {
      field: "realName",
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名",
    },
    {
      field: "cellphone",
      type: "input",
      label: "手机号码",
      placeholder: "请输入电话号码",
    },
    {
      field: "enable",
      type: "select",
      label: "用户状态",
      placeholder: "请选择用户状态",
      options: [
        { title: "启用", value: 1 },
        { title: "禁用", value: 0 },
      ],
    },
    {
      field: "",
      type: "datepicker",
      label: "创建时间",
      placeholder: "",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "dataRange",
      },
    },
  ],
};
