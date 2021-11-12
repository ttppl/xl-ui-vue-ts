const form = [
  {
    path: '/category',
    name: 'category',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/category/Category.vue')
    }
  }
]

export default form
