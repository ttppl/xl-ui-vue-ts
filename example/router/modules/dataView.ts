const dataView = [
  {
    path: '/tag',
    name: 'tag',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/tag/Tag.vue')
    }
  }, {
    path: '/scroll',
    name: 'scroll',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/scroll/Scroll.vue')
    }
  }, {
    path: '/popover',
    name: 'popover',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/popover/Popover.vue')
    }
  }, {
    path: '/popup',
    name: 'popup',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/popup/Popup.vue')
    }
  }, {
    path: '/card',
    name: 'card',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/card/Card.vue')
    }
  }
]

export default dataView
