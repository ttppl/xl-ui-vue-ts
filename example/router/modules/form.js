const form = [
  {
    path: '/button',
    name: 'button',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Button')
    }
  },
  {
    path: '/input',
    name: 'input',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/Input')
    }
  }
]

export default form
