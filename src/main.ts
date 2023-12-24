import { createApp } from "vue";
import { registerApp } from "./global";
import "normalize.css";
import "./assets/css/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { setupStore } from "./store";
// import "./service/axios_demo";
// import ElementPlus from "element-plus";
// import "element-plus/theme-chalk/index.css";
// import woodRequest from "./service";

const app = createApp(App);
// app.use(ElementPlus);
registerApp(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注意，这里页面刷新后重新执行的顺序很可能影响跳转的效果
// 如果use(router)在前，则router中的逻辑执行完之后to会匹配为notfound，而此时所有路由尚未注册完毕
// setupstore后续才会注册路由，因此导航首位会把你跳转到404页
// 所以要反过来，先setupstore注册路由，再use route
// setupStore()
app.use(router);
app.use(store);

app.mount("#app");

// 练习环境变量的例子
// console.log(process.env.VUE_APP_BASE_NAME);
// console.log(process.env.VUE_APP_BASE_URL);

// 练习axios的例子，先注释了
// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }

// // dataType传给request的泛型
// woodRequest
//   .request<DataType>({
//     url: "/home/multidata",
//     method: "GET",
//     showLoading: false,
//     // interceptors: {
//     //   requestInterceptor: (config) => {
//     //     console.log("single request config");
//     //     return config;
//     //   },
//     // },
//   })
//   .then((res) => {
//     console.log(res.data);
//     console.log(res.returnCode);
//     console.log(res.success);
//   });
