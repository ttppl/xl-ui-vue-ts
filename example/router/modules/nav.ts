const form = [
  {
    path: '/category',
    name: 'category',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Category.vue')
    }
  }
]

export default form
