const utils = [
  {
    path: '/resizer',
    name: 'resizer',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/utils/resizer/Resizer.vue')
    }
  },
  {
    path: '/dragger',
    name: 'dragger',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/utils/drag/Drag.vue')
    }
  },
  {
    path: '/clickOutside',
    name: 'clickOutside',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/utils/clickOutside/ClickOutside.vue')
    }
  },
  {
    path: '/resizeDetector',
    name: 'resizeDetector',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/utils/resizeDetector/ResizeDetector.vue')
    }
  }
]

export default utils
