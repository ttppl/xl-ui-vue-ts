
import './styles/transition.less'
import './styles/themBase.less'
const components = []
const componentsModules = require.context('./components/', true, /[A-Za-z0-9-_,\s]+\.ts$/i)
componentsModules.keys().forEach(k => {
  components.push(componentsModules(k).default)
})
// 定义 install 方法，接收 Vue 作为参数
const install:any = function (Vue) {
  // 判断是否安装，安装过就不继续往下执行
  if (install.installed) return
  install.installed = true
  // 遍历注册所有组件
  // components.map(component => Vue.component(component.name, component))
  // 下面这个写法也可以
  components.map(component => Vue.use(component))
}

// 检测到 Vue 才执行
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default {
  install
}

// 插件
export { default as ClickOutside } from './utils/clickOutside'

// 指令
export { default as clickOutside } from './directives/clickOutside'
