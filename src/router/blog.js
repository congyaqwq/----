export default [
  {
    path: '/blog',
    name: 'blog',
    meta: { title: '文章管理', icon: 'profile' },
    component: () => import("@/views/blog")
  },
  {
    path: '/blog/detail',
    name: 'blogDetail',
    meta: { title: '文章编辑' },
    hideInMenu: true,
    component: () => import("@/views/blog/detail")
  }
]