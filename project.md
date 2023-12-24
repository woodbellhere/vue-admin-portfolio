editorConfig

- 维护统一的编码规范

.prettier 和 .prettierignore

- 代码格式化工具以及哪些代码不需要遵守这些规范

husky

- git 提交的拦截器，可以在正式提交前再做一些处理，比如执行一遍格式化或者测试

commitizen

- git commit 的规范

element-plus

- 样式文件已经更改位置到 element-plus/theme-chalk/index.css

autoImprot

- 由于全局导入占地方，手动按需导入太麻烦，所以现在一般用插件支持的自动按需导入
- 下载 unplugin-auto-import 和 unplugin-vue-components，然后按官网方式导入即可
- 但注意 这俩目前版本都有问题，先用上一个版本

main.ts/js 到 global 全局的封装

- 简单来讲，main 文件中的全局调用最好搞得比较简单，有复杂操作你就提取到一个 global 文件夹里
- global 文件夹也可以再具体分文件，主文件最好也只调用函数，具体实现再抽到具体文件里

axios

- 由于规范上每个请求都应该加 token 再发，所以 axios 提供的请求发送拦截就能帮我们自动加 token 再发出去
- loading 动画效果也是一部分
- 环境变量
  - 手动修改，在文件多的情况下比较麻烦/这种方式里的取巧方法是写命名一样的变量，按环境需要注释其他内容即可
  - 根据 process.env.NODE_ENV 动态插入值，只需把变量用 let 定义即可。具体通过 process.end.NODE_ENV === 'xxx'来确定
  - .env 文件,项目会自动读取文件
    - 通过.env.prod 等不同后缀文件，来自动区分
    - VUE_APP 在 vue-cli 中是默认环境变量前缀，会被自动读取
    - 但注意，读的时候也要用 process.env.xxx 来读，因为它就是注入而已
  - 在 ts 项目中，需要在 shimes-vue.s.ts 中声明这些变量
- 封装要点
  - 避免整个项目和 axios 过于耦合
    - 所以在 axios 和使用之间再包一层，加个适配？
    - 实际使用自己“设置”的工具，axios 等外部库更新变化时，只需更改自己的工具文件写法即可
    - 外部使用自定义工具的代码就不需要变化
  - 有时候会有几套 axios 的需求适应不同的需求，而我们引入的 axios 本身就是一个实例，axios 本身又提供一套 config
    - 所以你也要在类或者函数里把 config 作为 constructor 的参数
  - 需要扩展原来的 config 类时，可以写个 interface 然后 extends 原来的 interface，最后把自己封装的类中的 config 也使用自定义的 config 类型
  - 拦截器和其他很多操作也一样分实例上的和类上的（全局上）
  - 带 token 和 loading 动画也要放在拦截器中

element-plus

- loading 的 type 文件和名字都变了
- form 组件中验证选项

  - trigger：""blur"是失去焦点时触发验证
  - 记得 rules 是复数

- defineexpose

  - 简单来说就是暴露组件 ref 信息，在选项式中是默认的

项目架构

- service 文件主要存各种请求函数

登录控制

- 保存账号密码/记住密码功能
  - 登录页提供记住密码勾选框，附带一个 v-model 的布尔属性 keepPassword
  - 如果 keeppassword 为 true，则使用 localStorage 保存 account 的 name 和 password
  - 登录页的账号和密码输入栏绑定的变量也要改为 localStorage.get name 和 password 以及|| '' 回退值
  - 这样每次进入登录页就会检查 localstorage 并把账号和密码直接输入输入栏
  - 可以做个封装
- 立即登录功能
  - 登录逻辑本身/发请求后做初步处理
  - 数据保存到特定位置
  - 登陆成功后发送其他请求/请求当前用户信息
  - 拿到用户菜单/涉及到权限管理
  - 跳转首页

动态路由与权限控制

- 用户表和基于角色的访问控制 rbac
- 用户表 查 角色/身份表 查 关系表 查 菜单表（能够访问哪些菜单）
- 前面的登录功能中，只要一登录，我们就能拿到 id 和 token，以及 userinfo 和 usermenus
- 从设计上讲， userinfo 有 role 角色西悉尼，usermenus 就是菜单权限
- 动态路由就是通过 usermenu 来动态生成菜单
  - 一种是写死/全部注册，过于麻烦，而且有可能用户自己硬改 url，也有可能展示
  - 一种是给不同角色注册不同路由，然后上面一套登录获取 user 信息之后加载特定路由（某个数组）即可，缺点就是新增路由还要重新配
  - 菜单自己也能动态生成路由映射
    - 菜单自己有 url，这样对应的一个路由就可以有一个 component
    - 我们可以依据这个东西动态生成一个数组形式的 routes 表，加入路由的 children 部分
    - 菜单 url 和组件之间有一个配好的映射表，因此具体的 url 就会获取响应的 routes，我们也是把它搞成数组配到 children 里
