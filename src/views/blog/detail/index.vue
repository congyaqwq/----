<template>
  <a-card>
    <a-form-model layout="horizontal" :model="form" ref="form">
      <a-form-model-item
        label="标题"
        prop="title"
        :rules="{ required: true, message: '请输入标题' }"
      >
        <a-input placeholder="请输入标题" v-model="form.title"></a-input>
      </a-form-model-item>
      <a-form-model-item
        label="类型"
        prop="tags"
        :rules="{ required: true, message: '请选择类型' }"
      >
        <a-select
          mode="multiple"
          placholder="请选择"
          showSearch
          allowClear
          :filterOption="filterOption"
          v-model="form.tags"
          @search="searchTags"
        >
          <a-select-option v-for="it in tagsList" :key="it.id">
            {{ it.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort">
        <a-input-number
          v-model="form.sort"
          placeholder="请输入"
        ></a-input-number>
      </a-form-model-item>
      <a-form-model-item
        label="主要内容"
        prop="content"
        :rules="{ required: true, message: '请输入内容' }"
      >
        <markdown-editor v-model="form.content"></markdown-editor>
      </a-form-model-item>
      <a-form-model-item>
        <div class="action-box">
          <a-button v-auth="is_admin" type="primary" @click="onSubmit"
            >确认</a-button
          >
          <a-button @click="$router.push('/blog')">取消</a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import * as Api from "@/api/blog";
import { list as getTagsList } from "@/api/tags";

import MarkdownEditor from "@/components/markdown-editor";
import debounce from "lodash/debounce";

export default {
  components: {
    MarkdownEditor,
  },
  data() {
    const { id } = this.$route.query;
    return {
      id,
      form: {},
      tagsList: [],
    };
  },
  computed: {
    is_admin() {
      return this.$store.state.user.is_admin;
    },
  },
  mounted() {
    this.id && this.fetchData();
    !this.id && this.fetchTagsList();
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    searchTags(name) {
      const debounceFunc = debounce((name) => {
        this.fetchTagsList(name);
      });
      return debounceFunc(name);
    },
    async fetchTagsList(name = "") {
      const { list } = await getTagsList({ name });
      console.log(list);
      this.tagsList = list;
    },
    async fetchData() {
      let data = await Api.detail(this.id);
      if (data.tags) {
        this.tagsList = data.tags;
      } else {
        this.fetchTagsList();
      }
      this.form = {
        ...data,
        tags: data.tags && data.tags.length ? data.tags.map((it) => it.id) : [],
      };
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        let d = {
          ...this.form,
          tags: this.form.tags ? this.form.tags.join(",") : "",
        };
        this.id ? await Api.update({ ...d, id: this.id }) : await Api.add(d);
        this.$message.success(`${this.id ? "修改" : "新增"}成功`);
        this.$router.push("/blog");
      });
    },
  },
};
</script>

<style>
</style>