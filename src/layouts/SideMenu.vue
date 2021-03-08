<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="linkTo(item)"
        >
          <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta && item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { extraRoute } from "@/router";
import SubMenu from "./SubMenu";

export default {
  components: {
    SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    // this.$router.options.routes
    const menuData = this.getMenuData(extraRoute);
    return {
      collapsed: false,
      list: [],
      menuData,
      openKeys: [],
      selectedKeys: [],
    };
  },
  watch: {
    "$route.path": {
      immediate: true,
      handler(val) {
        this.selectedKeys = this.selectedKeysMap[val];
        this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
      },
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    linkTo({ path }) {
      if (this.$route.path == path) return;
      this.$router.push({ path: path });
    },
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      let { openKeysMap, selectedKeysMap } = this;
      routes.forEach((it) => {
        if (it.name && !it.hideInMenu) {
          openKeysMap[it.path] = parentKeys;
          selectedKeysMap[it.path] = [selectedKeys || it.path];
          const newItem = { ...it };
          delete newItem.children;
          if (it.children && !it.hideInMenu) {
            newItem.children = this.getMenuData(it.children, [
              ...parentKeys,
              it.path,
            ]);
          } else {
            this.getMenuData(
              it.children,
              selectedKeys ? parentKeys : [...parentKeys, it.path],
              selectedKeys || it.path
            );
          }
          menuData.push(newItem);
        } else if (!it.hideInMenu && !it.hideChildrenMenu && it.children) {
          menuData.push(
            ...this.getMenuData(it.children, [...parentKeys, it.path])
          );
        }
      });
      return menuData;
    },
  },
};
</script>
