import { App } from "vue";
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
} from "element-plus";
import "element-plus/theme-chalk/base.css";

const components = [
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElLink,
  ElMain,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
];
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
