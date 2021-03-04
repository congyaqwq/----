<template>
  <div>
    <search :payload="payload" @change="fetchData"></search>
    <a-card>
      <a-button
        v-auth="is_admin"
        class="mgb15"
        type="primary"
        @click="visible = true"
        >新增</a-button
      >
      <a-table
        :pagination="false"
        row-key="id"
        :dataSource="list"
        :columns="columns"
      >
        <template #name="text">
          <a-tooltip>
            {{ text && text.length > 15 ? text.slice(0, 15) : text }}
            <template #title>{{ text }}</template>
          </a-tooltip>
        </template>
        <template #created_time="text">{{ $formatDate(text) }}</template>
        <template #action="text, record">
          <div class="action-box">
            <span class="primary bold" @click="toEdit(record)">编辑</span>
            <span v-auth="is_admin" class="danger bold" @click="remove(record)"
              >删除</span
            >
          </div>
        </template>
      </a-table>
      <my-pagination
        :payload="payload"
        :total="total"
        @change="fetchData"
      ></my-pagination>
    </a-card>
    <edit-dialog
      v-model="visible"
      :record="record"
      @change="fetchData"
    ></edit-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/tags";

import Search from "./components/search";
import EditDialog from "./components/edit-dialog";

export default {
  components: {
    Search,
    EditDialog,
  },
  data() {
    const { page = 1, per_page = 12, keyword = "" } = this.$route.query;
    return {
      payload: {
        page: Number(page),
        per_page: Number(per_page),
        keyword,
      },
      total: 0,
      list: [],
      record: {},
      visible: false,
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
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "创建时间",
          dataIndex: "created_time",
          scopedSlots: { customRender: "created_time" },
        },
        { title: "操作", scopedSlots: { customRender: "action" } },
      ];
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(fixedData = {}) {
      this.saveParams(fixedData);
      const { list, total } = await Api.list(this.payload);
      this.list = list;
      this.total = total;
    },
    remove({ id }) {
      this.$confirm({
        title: "确定要删除吗？",
        onOk: async () => {
          await Api.remove(id);
          this.$message.success("删除成功");
          this.fetchData();
        },
      });
    },
    toEdit(record) {
      this.visible = true;
      this.record = record;
    },
  },
};
</script>

<style>
</style>