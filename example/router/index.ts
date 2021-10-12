import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const requiredModules = require.context('./modules', true, /\.ts$/)
let routes: Array<RouteRecordRaw> = [{
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
    main: () => import('~/components/Guide.vue')
  }
}]

requiredModules.keys().forEach(fileName => {
  if (fileName === './index.js') return
  const module = requiredModules(fileName).default || requiredModules(fileName)
  const moduleName = /^\.(\/\w+)\.ts$/g.exec(fileName)[1]
  module.forEach(r => {
    if (r.path) {
      r.path = moduleName + r.path
    }
  })
  routes = [...routes, ...module]
})
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routes
})

export default router
