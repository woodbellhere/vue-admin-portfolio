import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface WoodRequestInterceptor<T = AxiosResponse> {
  // 拦截器需要使用internalAxiosRequestConfig
  // 拦截器也都是函数
  requestInterceptor?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface WoodRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: WoodRequestInterceptor<T>;
  showLoading?: boolean;
}
