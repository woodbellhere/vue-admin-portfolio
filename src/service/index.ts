// import WoodRequest from "./request";
import WoodRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import LocalCache from "@/utils/cache";

const woodRequest = new WoodRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = LocalCache.getCache("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // 这些log都是练习拦截时例子，先注释了
      // console.log("success request intercept");
      return config;
    },
    requestInterceptorCatch(error) {
      // console.log("failed request intercept");
      return error;
    },
    responseInterceptor: (res) => {
      // console.log("success response intercept");
      return res;
    },
    responseInterceptorCatch(error) {
      // console.log("failed response intercept");
      return error;
    },
  },
});

export default woodRequest;
