import CategoryItem from './src/CategoryItem.vue'

CategoryItem.install = (App) => {
  App.component(CategoryItem.name, CategoryItem)
}

export default CategoryItem
