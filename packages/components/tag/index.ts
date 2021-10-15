import Tag from './src/Tag.vue'

Tag.install = (App) => {
  App.component(Tag.name, Tag)
}

export default Tag
