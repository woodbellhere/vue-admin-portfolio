<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" class="img" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <!-- default-active是默认展开的选项index -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- type1是可展开菜单 -->
        <template v-if="item.type === 1">
          <!-- 能下拉就是一个sub-menu -->
          <el-sub-menu :index="item.id + ''">
            <!-- 这里会往内部的el-sub-menu中的title slot中传入模板包裹的内容 -->
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="formatIcon(item)" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <!-- 有分组文本的就是menu-item-group -->
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon v-if="subitem.icon">
                  <component :is="formatIcon(subitem)"></component>
                </el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- type2是没有展开项的一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id" @click="handleMenuItemClick(item)">
            <el-icon v-if="item.icon">
              <component :is="formatIcon(item)"></component>
              <span>{{ item.name }}</span>
            </el-icon>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type { IStoreType } from "@/store/types";
interface Props {
  collapse: boolean;
}
// 为props引入类型时就不能声明props的默认值了，withdefaults专门是这个设置默认值的补丁
const props = withDefaults(defineProps<Props>(), {
  collapse: true,
});

// 获取登录后的用户菜单
const store = useStore<IStoreType>();
const userMenus = computed(() => store.state.login.userMenus);
// 获取特定格式的icon
const formatIcon = computed(() => {
  return (item: any) => {
    return item.icon.replace("el-icon-", "");
  };
});
// 菜单路由事件，编程式导航
const Router = useRouter();
// 获取动态注册路由流程中的菜单/选项url并“跳转”
const handleMenuItemClick = (item: any) => {
  Router.push({
    path: item.url ?? "/not-found",
  });
};
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
