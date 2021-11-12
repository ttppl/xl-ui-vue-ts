<template>
  <div class="XlTag">
    <div class="tag" :style="style">
      <slot name="tag">
        <div class="tag-label" :class="classes">{{ label }}</div>
      </slot>
    </div>
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, computed } from 'vue'
import { themeType } from '@/types'
import { isNum } from '@/utils/common'
export default {
  name: 'XlTag',

  nameSpace: 'XlTag',

  components: {
  },

  props: {
    type: {
      type: String,
      default: 'default'
    },

    size: {
      type: [Number, String],
      default: 16
    },

    position: {
      type: String,
      default: 'right-top'
    },

    offset: {
      type: Object,
      default: () => { return {} }
    },

    label: {
      type: String,
      default: ''
    }
  },

  setup (props, ctx) {
    const style = computed(() => {
      const style = { // 初始化size
        minWidth: `${props.size}px`,
        minHeight: `${props.size}px`,
        borderRadius: `${props.size / 2}px`
      }
      const transform = {}
      props.position.split('-').forEach(p => { // 位置
        style[p] = isNum(props.offset[p]) ? `${props.offset[p] || 0}px` : (props.offset[p] || 0)
        if (['left', 'right'].includes(p)) {
          transform.x = p === 'left' ? '-50%' : '50%'
        }
        if (['top', 'bottom'].includes(p)) {
          transform.y = p === 'top' ? '-50%' : '50%'
        }
      })
      style.transform = `translateX(${transform.x}) translateY(${transform.y})`
      return style
    })

    const classes = computed(() => {
      const cls = []
      // 风格
      if (props.type !== 'default') {
        const bg = themeType(props.type, 'bg', false)
        const color = themeType(props.type === 'white' ? 'black' : 'white', '', false)
        cls.push(`${bg} ${color}`)
      } else {
        cls.push('default-tag')
      }
      return cls
    })
    return {
      style,
      classes
    }
  }

}
</script>

<style scoped lang="less">
.XlTag{
  display: inline-block;
  position: relative;
  .tag{
    position: absolute;
    display: inline-block;
    box-sizing: border-box;
    overflow: hidden;
    .tag-label{
      box-sizing: border-box;
      padding:2px 6px;
    }
    .default-tag{
      background-color: red;
      color: white;
    }
  }
}
</style>
