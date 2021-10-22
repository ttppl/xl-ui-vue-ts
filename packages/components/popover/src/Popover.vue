<template>
  <div ref="popover" v-clickoutside="closePopOutSide" class="XlPopover" :class="{'xl-inline-block':inline}" @[popTrigger]="showPop" @mouseleave="mouseleave">
    <slot name="reference" />{{}}
    <popper ref="popper" v-model="model" :position="position" :show-arrow="showArrow" :offset="offset" :offset-parent="offsetParent"
            :width="width" :height="height" :pop-style="popStyle"
            :always-given-position="alwaysGivenPosition" :always-in-view="alwaysInView"
            @mouseenter="mouseenter" @mouseleave="mouseleave"
            @close="model = false">
      <slot />
    </popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../../utils/clickouside'
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
    width: {
      type: [Number, String],
      default: 0
    },

    height: {
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

    alwaysInView: Boolean// 总是在窗口内
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
    const showPop = () => {
      model.value = !model.value
    }

    const popper = ref(null)
    const closePopOutSide = (e) => {
      if (!popper.value.$el.contains(e.target)) {
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
      showPanel,
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
@gap:20px;
.xl-inline-block{
  display: inline-block;
}
.XlPopover{
  position: relative;
}
</style>
