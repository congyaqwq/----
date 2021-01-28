import Vue from "vue"
import VueRouter from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

import RouteView from '@/components/RouteView'


const files = require.context('.', false, /\.js$/)

let extraRoute = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const route = files(key).default
  if (Array.isArray(route)) {
    extraRoute = [...extraRoute, ...route]
  } else {
    routes.push(route)
  }
})


Vue.use(VueRouter)

let routes = [
  {
    path: "/",
    // hideInMenu: true,
    // 找到子组件
    // component: {render: h=>h('router-view')},
    meta: {
      title: '博客后台'
    },
    component: () => import("@/layouts/UserLayout"),
    children: extraRoute
  },
  {
    path: "/user",
    redirect: "/user/login",
    meta: {
      title: "用户中心",
      icon: "user"
    },
    component: RouteView,
    children: [
      {
        path: "/user/login",
        name: "login",
        meta: {
          title: "登录",
          icon: "user"
        },
        component: () => import("@/views/user/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        meta: {
          title: "注册",
          icon: "setting"
        },
        component: () => import("@/views/user/Register.vue")
      }
    ]
  },
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done(true)
})

export default router
export { extraRoute }
