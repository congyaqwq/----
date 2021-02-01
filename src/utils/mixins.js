export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      }
    }
  },
  methods: {
    saveParams(payload) {
      if (!payload) return
      this.payload = { ...this.payload, ...payload }
      const query = { ...this.$route.query, ...this.payload }
      const newQuery = Object.keys(query).reduce((obj, key) => {
        if (query[key] !== "") {
          obj[key] = query[key]
        }
        return obj
      }, {})
      this.$router.replace({ query: newQuery })
    },
  }
}