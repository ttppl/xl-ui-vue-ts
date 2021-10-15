const dataView = [
  {
    path: '/tag',
    name: 'tag',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Tag.vue')
    }
  }
]

export default dataView
