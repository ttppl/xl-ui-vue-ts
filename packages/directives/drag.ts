import DragHandler from '@/utils/dragHandler'
import type { DirectiveBinding } from 'vue'
const findParent = (el, index = 1) => {
  return index > 0 && el?.parentNode ? findParent(el.parentNode, index - 1) : el
}

let dh:DragHandler

export default {
  mounted (el:HTMLElement, binding:DirectiveBinding):void {
    if (binding.value?.disable) {
      return
    }
    if (!binding.value?.cursor) {
      el.style.cursor = 'move'
    } else if (binding.value?.cursor !== 'none') {
      el.style.cursor = binding.value?.cursor
    }
    let element = el
    if (binding.value?.target) {
      element = findParent(el, binding.value?.target)
    }
    dh = new DragHandler(el, { target: element, callback: binding.value?.callback, transform: binding.value?.transform, propagation: binding.value?.propagation })
  },
  beforeUnmount (el:HTMLElement):void {
    if (dh) { dh.off() }
  }
}
