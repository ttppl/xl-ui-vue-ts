const form = [
  {
    path: '/button',
    name: 'button',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/button/Button.vue')
    }
  }, {
    path: '/input',
    name: 'input',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/input/Input.vue')
    }
  }, {
    path: '/select',
    name: 'select',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/select/Select.vue')
    }
  }, {
    path: '/choose',
    name: 'choose',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/choose/Choose.vue')
    }
  }
]

export default form
