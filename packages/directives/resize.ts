import { isMobile } from '@/utils/common'
import ResizeHandler from '@/utils/resizeHandler'
import type { DirectiveBinding } from 'vue'

let resizer:ResizeHandler
export default {
  mounted (el:HTMLElement, binding:DirectiveBinding):void {
    if (binding.value?.disable) {
      return
    }
    resizer = new ResizeHandler(el, {
      geometric: binding.value?.geometric,
      barWidth: isMobile ? 10 : 5,
      transform: binding.value?.transform,
      callback: binding.value?.callback
    })
  },
  beforeUnmount ():void {
    if (resizer) { resizer.off() }
  }
}
