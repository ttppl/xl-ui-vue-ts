
import ResizeDetector from '@/utils/ResizeDetector'
import type { DirectiveBinding } from 'vue'

const resizeDetector = ResizeDetector()
export default {
  mounted (el:HTMLElement, binding:DirectiveBinding):void {
    if (binding.value?.disable) {
      return
    }
    resizeDetector.listenTo(el, binding.value?.callback)
  },
  beforeUnmount (el:HTMLElement):void {
    resizeDetector.remove(el)
  }
}
