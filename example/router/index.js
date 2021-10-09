import { createRouter, createWebHashHistory } from 'vue-router'

const requiredModules = require.context('./modules', true, /\.js$/)
let routes = [{
  path: '/',
  name: 'index',
  redirect: { name: 'guide' }
},
{
  path: '/guide',
  name: 'guide',
  meta: {
    keepAlive: false
  },
  components: {
    main: () => import('~/components/Guide')
  }
}]

requiredModules.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const module = requiredModules(fileName).default || requiredModules(fileName)
  const moduleName = /^\.(\/\w+)\.js$/g.exec(fileName)[1]
  module.forEach(r => {
    if (r.path) {
      r.path = moduleName + r.path
    }
  })
  routes = [...routes, ...module]
})
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})

export default router
