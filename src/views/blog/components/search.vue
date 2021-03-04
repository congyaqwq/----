<template>
  <a-card class="mgb15">
    <a-form-model layout="inline" :model="form">
      <a-form-model-item label="关键词">
        <a-input placeholder="请输入关键词" v-model="form.keyword"></a-input>
      </a-form-model-item>
      <a-form-model-item label="标签">
        <a-select
          style="min-width: 180px"
          placeholder="请选择"
          v-model="form.tags"
        >
          <a-select-option v-for="it in tagsList" :key="it.id">{{
            it.name
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button class="mgr15" type="primary" @click="search">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { list as getTagsList } from "@/api/tags";

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
      tagsList: [],
    };
  },
  watch: {
    payload(payload) {
      this.form = payload;
    },
  },
  mounted() {
    this.fetchTagsList();
  },
  methods: {
    async fetchTagsList() {
      const { list } = await getTagsList();
      this.tagsList = list;
    },
    search() {
      const d = {
        ...this.form,
        page: 1,
      };
      this.$emit("change", d);
    },
    reset() {
      const d = {
        keyword: "",
        tags: undefined,
      };
      this.$emit("change", d);
    },
  },
};
</script>

<style>
</style>