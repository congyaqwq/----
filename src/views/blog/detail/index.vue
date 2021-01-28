<template>
  <a-card>
    <a-form-model layout="horizontal" :model="form" ref="form">
      <a-form-model-item label="标题" prop="title">
        <a-input placeholder="请输入标题" v-model="form.title"></a-input>
      </a-form-model-item>
      <a-form-model-item prop="content">
        <markdown-editor v-model="form.content"></markdown-editor>
      </a-form-model-item>
      <a-form-model-item>
        <div class="action-box">
          <a-button type="primary" @click="onSubmit">确认</a-button>
          <a-button @click="$router.push('/blog')">取消</a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import * as Api from "@/api/blog";

import MarkdownEditor from "@/components/markdown-editor";

export default {
  components: {
    MarkdownEditor
  },
  data() {
    const { id } = this.$route.query;
    return {
      id,
      form: {}
    };
  },
  mounted() {
    this.id && this.fetchData();
  },
  methods: {
    async fetchData() {
      const { data } = await Api.detail(this.id);
      this.form = data;
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        let d = { ...this.form };
        this.id ? await Api.update({ ...d, id: this.id }) : await Api.add(d);
        this.$message.success(`${this.id ? "修改" : "新增"}成功`);
        this.$router.push("/blog");
      });
    }
  }
};
</script>

<style>
</style>