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
import whCompute from '../../../mixins/whCompute'
import { themeType } from '../../../types'
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

    lightStyle: Boolean
  },

  data () {
    return {
    }
  },

  computed: {
    headerClass () {
      return themeType(this.type || 'notice', 'card-header', this.lightStyle)
    },

    footerClass () {
      return themeType(this.type || 'notice', 'bg', this.lightStyle)
    },

    contentClass () {
      let classes = this.customClass || []
      if (typeof classes === 'string') {
        classes = [classes]
      }
      const type = themeType(this.type || 'notice', 'bd', this.lightStyle)
      return [...classes, type]
    },

    style () {
      const style = {}
      if (!style.width && this.width !== 0) {
        style.width = this.widthC
      }
      if (!style.height && this.height !== 0) {
        style.height = this.heightC
      }
      return style
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
