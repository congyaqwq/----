<template>
  <a-card class="mgb15">
    <a-form-model layout="inline" :model="form">
      <a-form-model-item label="关键词">
        <a-input placeholder="请输入关键词" v-model="form.keyword"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button class="mgr15" type="primary" @click="search">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: this.payload,
    };
  },
  watch: {
    payload(payload) {
      this.form = payload;
    },
  },
  methods: {
    search() {
      const d = {
        ...this.form,
      };
      this.$emit("change", d);
    },
    reset() {
      const d = {
        keyword: "",
        page: 1,
      };
      this.$emit("change", d);
    },
  },
};
</script>

<style>
</style>