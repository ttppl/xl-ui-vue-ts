import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.min.js'
import '@/styles'
import ExampleForm from './components/ExampleForm.vue'
import AttrTable from './components/AttrTable.vue'
import EventTable from './components/EventTable.vue'
import all from '@/index'
const app = createApp(App)

app.use(router)
// app.use(xlui)
// 注册公共组件
const locales = require.context('@/', true, /[A-Za-z0-9-_,\s]+\.vue$/i)
locales.keys().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    // const name = matched[1]
    console.log('commomcomp:', locales(key).default.name)
    app.component(locales(key).default.name, locales(key).default)
  }
})
app.component('ExampleForm', ExampleForm)
app.component('AttrTable', AttrTable)
app.component('EventTable', EventTable)

app.directive('highlight', function (el) {
  hljs.configure({ useBR: true })
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

app.directive('codeFormat', function (el) {
  // const code = el.innerHTML
  // el.innerHTML = code.replace(/[ ]+\n/g, '')
})
// app.config.unwrapInjectedRef = false
app.config.warnHandler = function () {
  // `trace` 是组件的继承关系追踪
}

// 全局变量
app.config.globalProperties.logo = require('~/assets/logo.png')

app.mount('#app')

console.log(all)
