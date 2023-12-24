/* eslint-disable */
declare module "*.vue" {
  // defineComponent用于正确推断组件选项中的类型
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
