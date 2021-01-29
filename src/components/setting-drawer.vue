<template>
  <div>
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button>-->
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon type="setting"></a-icon>
        </div>
      </template>
      <h2>整体风格</h2>
      <a-radio-group :value="$route.query.theme||'dark'" @change="changeTheme">
        <a-radio value="light">白色</a-radio>
        <a-radio value="dark">黑色</a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      theme: "white"
    };
  },
  methods: {
    afterVisibleChange(val) {},
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    changeTheme(e) {
      const val = e.target.value;
      this.$router.push({
        query: { ...this.$route.query, theme: val }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.handle {
  position: absolute;
  top: 200px;
  right: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  color: #fff;
  background-color: #4a99ff;
  border-radius: 5px;
}
</style>
