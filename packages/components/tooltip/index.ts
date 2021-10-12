import Tooltip from './src/Tooltip.vue'

Tooltip.install = (App) => {
  App.component(Tooltip.name, Tooltip)
}

export default Tooltip
