import Bookmark from './src/Bookmark.vue'

Bookmark.install = (App) => {
  App.component(Bookmark.name, Bookmark)
}

export default Bookmark
