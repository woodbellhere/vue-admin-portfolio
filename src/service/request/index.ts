import axios from "axios";
import type { AxiosInstance } from "axios";
import { WoodRequestConfig, WoodRequestInterceptor } from "./interceptor";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
// 为不同实例提供不同的拦截器
const Default_Loading = true;

class WoodRequest {
  instance: AxiosInstance;
  interceptors?: WoodRequestInterceptor;
  showLoading: boolean;
  loading?: LoadingInstance;
  // 把config自定义为能可选容纳多个拦截器
  constructor(config: WoodRequestConfig) {
    this.instance = axios.create(config);
    // 默认显示加载进度
    this.showLoading = config.showLoading ?? Default_Loading;
    // 从config中取出对应实例的拦截器
    this.interceptors = config.interceptors;
    // 这一块是具体实例上的拦截器
    // use这种习惯应该也是express里来的
    // 如果特定实例的config有响应的拦截回调操作，则加入实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    // 后添加的拦截器先调用，要是想可以把这些挪上去
    // 这一块是所有实例上都有的，基本不用你自己的参数
    this.instance.interceptors.request.use(
      (config) => {
        // 练习拦截写的log，先注释了放着
        // console.log("all instance request interceptor");
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "loading ...",
            background: "rgba(0,0,0,0.5)",
            fullscreen: true,
          });
        }
        return config;
      },
      (err) => {
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (res) => {
        // console.log("all instance response interceptor");
        this.loading?.close();
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("request failed,wrong message");
        } else {
          return data;
        }
      },
      (err) => {
        if (err.response.status === 404) {
          console.log("404 wrong");
        }
        return err;
      },
    );
  }

  // 这就是纯粹包裹一层了
  // promise要传个T，就是promise里的内容看使用者自己
  request<T>(config: WoodRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 相当于手动transform
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any);
      }
      // loading 效果处理
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 某个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            // 行吧，最后都是anyscript,这里的responseInterceptor要求一个axiosResponse类型。但我们需要传一个T，所以你要改它的类，让类本身接收T
            res = config.interceptors.responseInterceptor(res);
          }
          // console.log(res);
          // 把showloading复位为true，不影响后续请求
          this.showLoading = Default_Loading;

          // resolve回调
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = Default_Loading;
          reject(err);
          return err;
        });
    });
  }
  get<T>(config: WoodRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: WoodRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: WoodRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: WoodRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default WoodRequest;
