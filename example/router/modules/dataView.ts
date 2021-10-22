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
  },
  {
    path: '/scroll',
    name: 'scroll',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Scroll.vue')
    }
  },
  {
    path: '/popover',
    name: 'popover',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Popover.vue')
    }
  }
]

export default dataView
