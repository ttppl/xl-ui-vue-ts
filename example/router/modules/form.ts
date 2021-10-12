const form = [
  {
    path: '/button',
    name: 'button',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Button.vue')
    }
  },
  {
    path: '/input',
    name: 'input',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Input.vue')
    }
  }
]

export default form
