import ClickOutside from '@/utils/clickOutside'
import type { DirectiveBinding } from 'vue'
const clickOutside = new ClickOutside()
export default {
  beforeMount (el:HTMLElement, binding:DirectiveBinding):void {
    clickOutside.addSource(el, { callback: binding.value })
  },
  beforeUnmount (el:HTMLElement):void {
    clickOutside.removeSource(el)
  }
}
