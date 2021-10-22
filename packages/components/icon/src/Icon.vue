<template>
  <i class="iconfont" :class="classes" :style="style" v-bind="$attrs"><slot /></i>
</template>

<script type="text/ecmascript-6">
import { computed } from '@vue/reactivity'
import { themeType } from '../../../types'
export default {
  name: 'XlIcon',

  nameSpace: 'xl-icon',

  components: {
  },

  inheritAttrs: false,

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

    cursor: {
      type: String,
      default: 'default'
    },

    size: {
      type: Number,
      default: 20
    }
  },

  setup (props, ctx) {
    const classes = computed(() => {
      const iconType = `xl-icon-${props.icon}`
      const color = themeType(props.type, null, props.lightStyle)
      const block = { 'xl-icon-block': props.block }
      const pointer = { 'xl-icon-pointer': ctx.attrs.onClick }
      return [iconType, color, block, pointer]
    })
    const style = computed(() => {
      const style = { ...props.popStyle }
      if (props.color) {
        style.color = props.color
      }
      style.fontSize = `${props.size}px`
      style.cursor = props.cursor
      return style
    })
    return {
      classes,
      style
    }
  }
}
</script>

<style scoped lang="less">
@import url('./icons.less');
.xl-icon-block{
  display: inline-block;
}
.xl-icon-pointer{
  cursor: pointer!important;
}
</style>
