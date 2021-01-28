import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ant from "ant-design-vue"
import marked from 'marked'
import highlight from 'highlight.js'
// import {
//   Button,
// } from "ant-design-vue"
import Authorized from "./components/Authorized"
import Auth from "./directives/auth"

import '@/style/index.less'
import "ant-design-vue/dist/antd.less"


// import Button from "ant-design-vue/lib/button"
// import "ant-design-vue/dist/antd.less"
// 按照需求引入
// import "ant-design-vue/lib/button/style"

Vue.config.productionTip = false

// Vue.use(Button)
// Vue.use(Radio)
Vue.component('Authorized', Authorized)
Vue.use(Auth)
Vue.use(ant)

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const hljs = highlight
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
    return hljs.highlight(validLanguage, code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")