import Category from './src/Category.vue'

Category.install = (App) => {
  App.component(Category.name, Category)
}

export default Category
