<template>
  <div :class="['XlTooltip', 'xl-inline-block']" @mouseover="show" @mouseout="mouseout">
    <div ref="tootip" :style="style" :class="[{'xl-pointer':model,'xl-inline-block':inline},'xl-text-ellipsis']"><slot /></div>
    <Popper v-model="model" always-in-view :position="position" :show-arrow="true" @mouseover="show" @mouseout="mouseout" @close="closePop">
      <slot name="tip"><slot /></slot>
    </Popper>
  </div>
</template>

<script type="text/ecmascript-6">
import Popper from '../../popover/src/Popper'
import { computed } from 'vue'
import whCompute from '../../../mixins/whCompute'
export default {
  name: 'XlTooltip',

  components: {
    Popper
  },

  mixins: [whCompute],

  provide () {
    return {
      XlPopperTrigger: computed(() => {
        return {
          name: 'ToolTip',
          dom: () => {
            return this.$refs.tootip
          }
        }
      })
    }
  },

  props: {
    position: {
      type: String,
      default: 'bottom'
    },

    inline: Boolean,
    showDelay: {
      type: Number,
      default: 1000
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      showPanel: false,
      timer: null,
      overFlow: false
    }
  },

  computed: {
    style () {
      const style = {}
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      return style
    },

    model: {
      get () {
        return this.showPanel && (this.overFlow || !!this.$slots.tip)
      },

      set (nv) {
        this.showPanel = nv
      }
    }
  },

  created () {
  },

  mounted () {
    this.$nextTick().then(() => {
      this.overFlow = this.$refs.tootip.scrollWidth > this.$refs.tootip.clientWidth
    })
  },

  methods: {
    show () {
      if (this.$refs.tootip.scrollWidth > this.$refs.tootip.clientWidth) {
        this.overFlow = true
      } else if (this.$refs.tootip.children) {
        this.$refs.tootip.children.forEach(c => {
          if (c.scrollWidth > this.$refs.tootip.clientWidth) {
            this.overFlow = true
          }
        })
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.model = true
      }, this.showDelay)
    },

    closePop () {
      this.model = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },

    mouseout () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.model = false
      }, 300)
    }
  }
}
</script>

<style lang="less">
.XlTooltip{
  position: relative;
  >.xl-pointer{
    cursor: pointer;
  }
  >.xl-text-ellipsis{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.xl-inline-block{
  display: inline-block;
}
</style>
