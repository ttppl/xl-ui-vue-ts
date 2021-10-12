export default {
  beforeMount (el, binding) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false
      }
      binding.value(e)
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  updated () {

  },
  unmounted (el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
}
