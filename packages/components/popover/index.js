import Popover from './src/Popover.vue'

Popover.install = (App) => {
  App.component(Popover.name, Popover)
}

export default Popover
