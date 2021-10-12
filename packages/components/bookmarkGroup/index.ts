import BookmarkGroup from '../bookmark/src/BookmarkGroup.vue'

BookmarkGroup.install = (App) => {
  App.component(BookmarkGroup.name, BookmarkGroup)
}

export default BookmarkGroup
