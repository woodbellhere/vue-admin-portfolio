export const accountRules = {
  // 失去焦点时验证
  name: [
    {
      required: true,
      message: "用户名是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名应该是是5-10个字母或数字的组合",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{4,}$/,
      message: "密码应该是4个以上字母或数字的组合",
      trigger: "blur",
    },
  ],
};

export const phoneRules = {
  // 失去焦点时验证
  num: [
    {
      required: true,
      message: "手机号是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^1[3-9][0-9]{9}$/,
      message: "手机号应是11位数字",
    },
  ],
  veriNum: [
    {
      required: true,
      message: "验证码是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^[0-9]{6}$/,
      message: "验证码应该是6个数字的组合",
      trigger: "blur",
    },
  ],
};
