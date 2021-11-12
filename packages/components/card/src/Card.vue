<template>
  <div class="XlCard" :style="style">
    <div class="xl-card-header" :class="headerClass" />
    <div class="xl-card-content" :class="contentClass">
      <slot>
        no content
      </slot>
    </div>
    <div class="xl-card-footer" :class="footerClass" />
  </div>
</template>

<script type="text/ecmascript-6">
import { computed } from '@vue/reactivity'
import whCompute from '../../../mixins/whCompute'
import { themeType } from '../../../types'
import size from '@/mixins/size'
export default {
  name: 'XlCard',

  components: {
  },

  mixins: [whCompute],

  props: {
    type: {
      type: String,
      default: 'primary'
    },

    customClass: {
      type: String,
      default: ''
    },

    lightStyle: Boolean,
    width: {
      type: [Number, String],
      default: 0
    },

    height: {
      type: [Number, String],
      default: 0
    }
  },

  setup (props, ctx) {
    const headerClass = computed(() => {
      return themeType(props.type || 'notice', 'card-header', props.lightStyle)
    })
    const footerClass = computed(() => {
      return themeType(props.type || 'notice', 'bg', props.lightStyle)
    })
    const contentClass = computed(() => {
      let classes = props.customClass || []
      if (typeof classes === 'string') {
        classes = [classes]
      }
      const type = themeType(props.type || 'notice', 'bd', props.lightStyle)
      return [...classes, type]
    })
    const { widthC, heightC } = size(props)
    const style = computed(() => {
      const style = {}
      if (!style.width && props.width !== 0) {
        style.width = widthC.value
      }
      if (!style.height && props.height !== 0) {
        style.height = heightC.value
      }
      return style
    })
    return {
      headerClass,
      footerClass,
      contentClass,
      style
    }
  }
}
</script>

<style lang="less">
.XlCard{
  // box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  @borderWidth:2px;
  >.xl-card-header{
    width: 100%;
    height: 39px;
    position: relative;
    z-index: -1;
  }
  >.xl-card-content{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    width: 100%;
    box-sizing: border-box;
    border-left-width: @borderWidth;
    border-right-width: @borderWidth;
    border-left-style: dashed;
    border-right-style: dashed;
    @gap:20px;
    padding: @gap @gap @gap @gap;
  }
  >.xl-card-footer{
    width: 100%;
    height: 21px;
    box-sizing: border-box;
  }
}
</style>
