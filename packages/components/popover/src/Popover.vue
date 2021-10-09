<template>
  <div ref="popover" v-clickoutside="closePopOutSide" class="XlPopover" :class="{'xl-inline-block':inline}" @[popTrigger]="show" @mouseout="mouseout">
    <slot name="reference" />
    <popper ref="popper" v-model="model" :position="position" :show-arrow="showArrow" :offset="offset" :offset-parent="offsetParent"
            :width="width" :height="height" :pop-style="popStyle"
            :always-given-position="alwaysGivenPosition" :always-in-view="alwaysInView"
            @mouseover="mouseover" @mouseout="mouseout"
            @close="closePop">
      <slot />
    </popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../../utils/clickouside'
import popper from './Popper'
import { computed } from 'vue'
export default {
  name: 'XlPopover',

  directives: { clickoutside },
  components: {
    popper
  },

  provide () {
    return {
      XlPopperTrigger: computed(() => {
        return {
          name: 'XlPopover',
          dom: () => {
            return this.$refs.popover
          }
        }
      })
    }
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

    borderRadius: {
      type: Number,
      default: 3
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
  setup () {

  },

  data () {
    return {
      showPanel: false
    }
  },

  computed: {
    model: {
      get () {
        if (this.trigger === 'manual') { return this.modelValue }
        return this.showPanel
      },

      set (nv) {
        if (this.trigger === 'manual') {
          this.$emit('update:modelValue', nv)
        } else {
          this.showPanel = nv
        }
      }
    },

    popTrigger () {
      if (this.trigger === 'hover') {
        return 'mouseover'
      }
      if (this.trigger === 'click' || this.trigger === 'manual') {
        return 'click'
      }
      return this.trigger
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    show () {
      this.model = !this.model
    },

    closePopOutSide (e) {
      if (!this.$refs?.popper?.contains(e.target)) {
        this.model = false
      }
    },

    closePop () {
      this.model = false
    },

    mouseover () {
      if (this.trigger === 'hover') {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.model = true
      }
    },

    mouseout () {
      // if (this.trigger === 'hover') {
      //   let timeout = null
      //   document.body.onmouseover = (e) => {
      //     if (!this.$refs.popper.contains(e.target)) {
      //       timeout = setTimeout(() => {
      //         this.model = false
      //         document.body.onmouseover = null
      //       }, 300)
      //     } else {
      //       clearTimeout(timeout)
      //     }
      //   }
      // }
      if (this.trigger === 'hover') {
        this.timer = setTimeout(() => {
          this.model = false
        }, 300)
      }
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
