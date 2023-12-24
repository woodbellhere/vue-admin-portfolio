// 根组件有vue自定义的类型App
import { App } from "vue";
import registerElement from "./register-element";
export function registerApp(app: App): void {
  registerElement(app);
}
