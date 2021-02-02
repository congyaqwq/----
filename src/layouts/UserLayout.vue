<template>
  <div class="container" :class="[`nav-theme-${theme}`]">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider :theme="theme" v-model="collapsed" :trigger="null" width="256px" collapsible>
        <div class="logo center-flex">
          <span v-if="!collapsed">后台管理系统</span>
          <a-icon v-else type="rocket" />
        </div>
        <side-menu :theme="theme"></side-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content :style="{
            margin: '24px',
          }">
          <a-breadcrumb>
            <a-breadcrumb-item :key="item.path" v-for="(item, i) in matched">
              <span v-if="item.meta.disabledBreadcrumb || matched.length -1 === i">{{item.meta.title || item.name}}</span>
              <router-link v-else :to="{path: item.path}">{{item.meta.title || item.name}}</router-link>
            </a-breadcrumb-item>
          </a-breadcrumb>
          <router-view :style="{  
            margin: '24px 16px',
            minHeight: '280px'}"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <Authorized :authority="['admin']">
      <setting-drawer></setting-drawer>
    </Authorized>
  </div>
</template>

<script>
import SettingDrawer from "@/components/setting-drawer";
import SideMenu from "@/layouts/SideMenu";

export default {
  components: {
    SettingDrawer,
    SideMenu
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    theme() {
      return this.$route.query.theme || "dark";
    },
    matched() {
      return this.$route.matched;
    }
  }
};
</script>

<style>
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.8);
  margin: 16px;
  font-weight: bold;
}
</style>
