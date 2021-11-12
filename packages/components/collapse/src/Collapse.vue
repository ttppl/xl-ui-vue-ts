<template>
  <transition v-on="on">
    <slot />
  </transition>
</template>

<script>
import { addClass, getStyle, removeClass } from '@/utils/dom'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'XlCollapse',
  setup () {
    let height = 0
    const on = {
      beforeEnter (el) {
        if (!el.dataset) el.dataset = {}
        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom
        el.dataset.oldMarginTop = el.style.marginTop
        el.dataset.oldMarginBottom = el.style.marginBottom
        // slot里只能使用v-show，v-if可能会获取不到height属性
        height = parseFloat(getStyle(el, 'height')) || 0
        el.style.height = '0'
        el.style.paddingTop = 0
        el.style.paddingBottom = 0

        addClass(el, 'collapse-transition')
      },

      enter (el) {
        el.dataset.oldOverflow = el.style.overflow
        if (el.scrollHeight !== 0) {
          el.style.height = Math.max(el.scrollHeight, height) + 'px'
        } else {
          el.style.height = ''
        }
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
        el.style.marginTop = el.dataset.oldMarginTop
        el.style.marginBottom = el.dataset.oldMarginBottom

        el.style.overflow = 'hidden'
      },

      afterEnter (el) {
        removeClass(el, 'collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
      },

      beforeLeave (el) {
        if (!el.dataset) el.dataset = {}
        el.dataset.oldPaddingTop = el.style.paddingTop
        el.dataset.oldPaddingBottom = el.style.paddingBottom
        el.dataset.oldMarginTop = el.style.marginTop
        el.dataset.oldMarginBottom = el.style.marginBottom
        el.dataset.oldOverflow = el.style.overflow

        el.style.height = Math.max(el.scrollHeight, height) + 'px'
        el.style.overflow = 'hidden'
      },

      leave (el) {
        if (el.scrollHeight !== 0) {
          addClass(el, 'collapse-transition')
          el.style.transitionProperty = 'height'
          el.style.height = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
          el.style.marginTop = 0
          el.style.marginBottom = 0
        }
      },

      afterLeave (el) {
        removeClass(el, 'collapse-transition')
        el.style.height = ''
        el.style.overflow = el.dataset.oldOverflow
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
        el.style.marginTop = el.dataset.oldMarginTop
        el.style.marginBottom = el.dataset.oldMarginBottom
      }
    }
    return {
      on
    }
  }
})
</script>

<style lang="less">
.collapse-transition {
  -webkit-transition: .4s height ease-in-out, .4s padding-top ease-in-out, .4s padding-bottom ease-in-out;
  transition: .4s height ease-in-out, .4s padding-top ease-in-out, .4s padding-bottom ease-in-out, .4s margin-top ease-in-out, .4s margin-bottom ease-in-out;
  pointer-events:none;
}
</style>
