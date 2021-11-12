const interactive = [
  {
    path: '/message',
    name: 'message',
    meta: {
      keepAlive: false
    },
    components: {
      main: () => import('~/components/message/Message.vue')
    }
  }
]

export default interactive
