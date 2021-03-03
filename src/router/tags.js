export default [
  {
    path: '/tags',
    name: 'tags',
    meta: { title: '标签管理', icon: 'profile' },
    component: () => import("@/views/tags")
  },
]