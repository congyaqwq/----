<template>
  <div class="flex">
    <div class="left">
      <a-textarea class="text" v-model="inputText" name="编辑框" id cols="30" rows="10" @change="changeText"></a-textarea>
    </div>
    <div class="right" v-html="convertText"></div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  props: {
    value: String
  },
  data() {
    return {
      inputText: this.value,
      convertText: ""
    };
  },
  watch: {
    value(value) {
      this.inputText = value;
    },
    inputText(t) {
      this.convertText = marked(t);
    }
  },
  methods: {
    changeText() {
      this.$emit("input", this.inputText);
    }
  }
};
</script>

<style lang="less" scoped>
.left {
  margin-right: 30px;
  width: 40%;
  .text {
    height: 500px;
  }
}
.right {
  width: 40%;
  border: 1px solid #ccc;
  overflow: auto;
  height: 500px;
}
</style>