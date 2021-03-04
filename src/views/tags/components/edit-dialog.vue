<template>
  <a-modal
    v-model="computedVisible"
    :destroyOnClose="false"
    :footer="is_admin ? undefined : null"
    @ok="onSubmit"
  >
    <a-form-model layout="horizontal" :model="form" ref="form">
      <a-form-model-item
        label="名称"
        prop="name"
        :rules="{ required: true, message: '请输入名称' }"
      >
        <a-input placeholder="请输入名称" v-model="form.name"></a-input>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import * as Api from "@/api/tags";

export default {
  props: {
    record: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    record(record) {
      this.form = { ...record };
    },
  },
  computed: {
    is_admin() {
      return this.$store.state.user.is_admin;
    },
    computedVisible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        let d = { ...this.form };
        this.id
          ? await Api.update({ ...d, id: this.record.id })
          : await Api.add(d);
        this.$message.success(`${this.record.id ? "修改" : "新增"}成功`);
        this.computedVisible = false;
        this.$emit("change");
      });
    },
  },
};
</script>

<style>
</style>