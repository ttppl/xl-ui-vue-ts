const findParent = (el, index = 1) => {
  return index > 0 && el?.parentNode ? findParent(el.parentNode, index - 1) : el
}

export default {
  mounted (el, binding) {
    let element = el
    if (binding.value?.disable) {
      return
    }
    el.style.cursor = 'move'
    if (binding.value?.childLevel) {
      element = findParent(el, binding.value?.childLevel)
    }
    el.onmousedown = function (e) {
      var disx = e.pageX - element.offsetLeft
      var disy = e.pageY - element.offsetTop
      document.onmousemove = function (e) {
        element.style.left = `${e.pageX - disx}px`
        element.style.top = `${e.pageY - disy}px`
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  },
  unmounted (el) {
    el.onmousedown = null
  }
}
