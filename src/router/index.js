import Vue from "vue"
import VueRouter from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { get } from '@/utils/localData'
import store from '../store'

import RouteView from '@/components/RouteView'


// 关闭跳转报错信息
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  try {
    return originalReplace.call(this, location).catch((err) => err)
  } catch (error) {
    console.log(error)
  }
}

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

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/user/login' && !get('lc_blog_manage')) {
    next('/user/login')
  }
  if (get('lc_blog_manage') && !store.state.user.username) {
    await store.dispatch('user/getUserInfo')
  }
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done(true)
})

export default router
export { extraRoute }
