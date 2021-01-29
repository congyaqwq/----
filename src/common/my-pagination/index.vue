<template>
  <div class="pagination">
    <a-pagination
      v-model="current"
      :pageSize="payload.per_page"
      show-size-changer
      :total="total"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>
<script>
export default {
  name: "MyPagination",
  props: {
    payload: {
      type: Object,
      default: () => ({
        page: 1,
        per_page: 12
      })
    },
    total: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    current: {
      get() {
        return this.payload.page - 1;
      },
      set(val) {
        this.$emit("input", Number(val) + 1);
      }
    }
  },
  watch: {},
  methods: {
    onShowSizeChange(current, pageSize) {
      this.$emit("change", {
        page: Number(current) + 1,
        per_page: Number(pageSize)
      });
    }
  }
};
</script>
<style lang="less" scoped>
.pagination {
  margin: 30px 0;
  text-align: right;
}
</style>