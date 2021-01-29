<template>
  <a-card>
    <a-button class="mg15" type="primary" @click="$router.push('/blog/detail')">新增</a-button>
    <a-table :pagination="false" row-key="id" :dataSource="list" :columns="columns">
      <template #blog_title="text">{{text&&text.length>15?text.slice(0,15):text}}</template>
      <template #content="text">{{text&&text.length>15?text.slice(0,15):text}}</template>
      <template #action="text,record">
        <div class="action-box">
          <span class="primary bold" @click="toEdit(record)">编辑</span>
          <span class="danger bold" @click="remove(record)">删除</span>
        </div>
      </template>
    </a-table>
    <my-pagination :payload="payload" @change="fetchData"></my-pagination>
  </a-card>
</template>

<script>
import * as Api from "@/api/blog";

export default {
  data() {
    const { page = 1, per_page = 12 } = this.$route.query;
    return {
      payload: {
        page: Number(page),
        per_page: Number(per_page)
      },
      list: [],
      record: {}
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "标题",
          dataIndex: "title",
          scopedSlots: { customRender: "blog_title" }
        },
        {
          title: "内容",
          dataIndex: "content",
          scopedSlots: { customRender: "content" }
        },
        { title: "查看数", dataIndex: "views" },
        { title: "点赞数", dataIndex: "thumbs" },
        { title: "创建时间", dataIndex: "created_time" },
        { title: "操作", scopedSlots: { customRender: "action" } }
      ];
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(fixedData = {}) {
      this.saveParams(fixedData);
      const { data } = await Api.list(this.payload);
      this.list = data;
    },
    async remove({ id }) {
      await Api.remove(id);
      this.$message.success("删除成功");
      this.fetchData();
    },
    toEdit({ id }) {
      this.$router.push({
        path: "/blog/detail",
        query: { id }
      });
    }
  }
};
</script>

<style>
</style>