import CategoryItem from '../category/src/CategoryItem.vue'

CategoryItem.install = (App) => {
  App.component(CategoryItem.name, CategoryItem)
}

export default CategoryItem
