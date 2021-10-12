import CategoryItem from './src/CategoryItemItem.vue'

CategoryItem.install = (App) => {
  App.component(CategoryItem.name, CategoryItem)
}

export default CategoryItem
