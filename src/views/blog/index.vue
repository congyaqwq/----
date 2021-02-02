<template>
  <a-card>
    <a-button class="mg15" type="primary" @click="$router.push('/blog/detail')">新增</a-button>
    <a-table :pagination="false" row-key="id" :dataSource="list" :columns="columns">
      <template #blog_title="text">
        <a-tooltip>
          {{text&&text.length>15?text.slice(0,15):text}}
          <template #title>{{text}}</template>
        </a-tooltip>
      </template>
      <template #content="text">{{text&&text.length>15?text.slice(0,15):text}}</template>
      <template #created_time="text">{{$formatDate(text)}}</template>
      <template #action="text,record">
        <div class="action-box">
          <span class="primary bold" @click="toEdit(record)">编辑</span>
          <span v-auth="is_admin" class="danger bold" @click="remove(record)">删除</span>
        </div>
      </template>
    </a-table>
    <my-pagination :payload="payload" :total="total" @change="fetchData"></my-pagination>
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
      total: 0,
      list: [],
      record: {}
    };
  },
  computed: {
    is_admin() {
      return this.$store.state.user.is_admin;
    },
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
        {
          title: "创建时间",
          dataIndex: "created_time",
          scopedSlots: { customRender: "created_time" }
        },
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
      this.list = data.list;
      this.total = data.total;
    },
    remove({ id }) {
      this.$confirm({
        title: "确定要删除吗？",
        onOk: async () => {
          await Api.remove(id);
          this.$message.success("删除成功");
          this.fetchData();
        }
      });
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