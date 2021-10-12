import Pagenation from './src/Pagenation.vue'

Pagenation.install = (App) => {
  App.component(Pagenation.name, Pagenation)
}

export default Pagenation
