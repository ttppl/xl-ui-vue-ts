<template>
  <div ref="popover" v-clickoutside="closePopOutSide" class="XlPopover" :class="{'xl-inline-block':inline}"
       @[popTrigger]="showPop" @mouseleave="mouseleave">
    <slot name="reference" />{{}}
    <popper ref="popper" v-model="model" :position="position" :show-arrow="showArrow" :offset="offset" :offset-parent="offsetParent"
            :width="width" :height="height" :min-width="minWidth" :min-height="minHeight" :max-width="maxWidth" :max-height="maxHeight"
            :pop-style="popStyle" :to-body="toBody"
            @mouseenter="mouseenter" @mouseleave="mouseleave"
            @close="model = false">
      <slot />
    </popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '@/directives/clickOutside'
import popper from './Popper'
import { computed, provide, reactive, ref } from 'vue'
export default {
  name: 'XlPopover',

  directives: { clickoutside },
  components: {
    popper
  },

  props: {
    modelValue: Boolean,
    inline: Boolean,
    toBody: Boolean,
    width: {
      type: [Number, String],
      default: 0
    },

    height: {
      type: [Number, String],
      default: 0
    },

    minWidth: {
      type: [Number, String],
      default: 0
    },

    minHeight: {
      type: [Number, String],
      default: 0
    },

    maxWidth: {
      type: [Number, String],
      default: 0
    },

    maxHeight: {
      type: [Number, String],
      default: 0
    },

    offset: {
      type: [Number, String],
      default: 0
    },

    offsetParent: {
      type: [Number, String],
      default: 0
    },

    trigger: {
      type: String,
      default: 'click'
    },

    popStyle: {
      type: Object,
      default: function () { return null }
    },

    showArrow: {
      type: Boolean,
      default: true
    },

    position: {
      type: String,
      default: 'bottom'
    },

    alwaysGivenPosition: Boolean, // 强制位置显示

    alwaysInView: { // 总是在窗口内
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue'],

  setup (props, ctx) {
    const popover = ref(null)
    provide('XlPopperTrigger', reactive({
      name: 'XlPopover',
      dom: () => {
        return popover.value
      }
    }))
    const showPanel = ref(false)
    const model = computed({
      get () {
        if (props.trigger === 'manual') { return props.modelValue }
        return showPanel.value
      },

      set (nv) {
        if (props.trigger === 'manual') {
          ctx.emit('update:modelValue', nv)
        } else {
          showPanel.value = nv
        }
      }
    })
    const popTrigger = computed(() => {
      if (props.trigger === 'hover') {
        return 'mouseenter'
      }
      return props.trigger
    })
    const showPop = (e) => {
      if (model.value && props.trigger !== 'hover' && !props.toBody) {
        model.value = popper.value?.contains(e.target)
      } else if (props.trigger === 'hover') { model.value = true } else { model.value = !model.value }
    }

    const popper = ref(null)
    const closePopOutSide = (e) => {
      if (!popper.value?.contains(e.target)) {
        model.value = false
      }
    }

    let timer = null
    const mouseenter = () => {
      if (props.trigger === 'hover') {
        if (timer) {
          clearTimeout(timer)
        }
        model.value = true
      }
    }

    const mouseleave = () => {
      if (props.trigger === 'hover') {
        timer = setTimeout(() => {
          model.value = false
        }, 300)
      }
    }
    return {
      popover,
      model,
      popTrigger,
      showPop,
      popper,
      closePopOutSide,
      mouseenter,
      mouseleave
    }
  }

}
</script>

<style lang="less">
.xl-inline-block{
  display: inline-block;
}
.XlPopover{
  position: relative;
}
</style>
