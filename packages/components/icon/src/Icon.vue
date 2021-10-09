<template>
  <i class="iconfont" :class="classes" :style="style" />
</template>

<script type="text/ecmascript-6">
import { themeType } from '../../../types'
export default {
  name: 'XlIcon',

  nameSpace: 'xl-icon',

  components: {
  },

  props: {
    icon: {
      type: String,
      default: 'heart'
    },

    type: {
      type: String,
      default: 'primary'
    },

    block: {
      type: Boolean,
      default: true
    },

    lightStyle: Boolean,
    popStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    color: {
      type: String,
      default: ''
    },

    size: {
      type: Number,
      default: 20
    }
  },

  data () {
    return {
    }
  },

  computed: {
    classes () {
      const iconType = `xl-icon-${this.icon}`
      const color = themeType(this.type, null, this.lightStyle)
      const block = { 'xl-icon-block': this.block }
      return [iconType, color, block]
    },

    style () {
      const style = { ...this.popStyle }
      if (this.color) {
        style.color = this.color
      }
      style.fontSize = `${this.size}px`
      return style
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style scoped lang="less">
@import url('./icons.less');
.xl-icon-block{
  display: inline-block;
}
</style>
