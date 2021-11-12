<template>
  <div ref="XlButton" class="XlButton" :style="styleC" :class="classC" @click.capture="clickHandler">
    <span class="label"><slot>{{ label }}</slot></span>
  </div>
</template>

<script type="text/ecmascript-6">
import { computed, ref } from '@vue/reactivity'
import size from '@/mixins/size'
import { themeType } from '../../../types'
import { nextTick, onMounted } from '@vue/runtime-core'
import { go } from '@/utils/router'
import { useRouter } from 'vue-router'
export default {
  name: 'XlButton',

  components: {
  },

  props: {
    type: {
      type: String,
      default: 'notice'
    },

    lightStyle: Boolean, // 明亮风格
    plain: Boolean, // 边框风格
    popStyle: {
      type: Object,
      default () {
        return null
      }
    },

    circle: { // 圆形按钮
      type: Boolean,
      default: false
    },

    label: { // 内容
      type: String,
      default: ''
    },

    to: { // 路由地址
      type: String,
      default: ''
    }
  },

  // emits: ['click'],

  setup (props, ctx) {
    // class
    const classC = computed(() => {
      const bg = props.plain ? themeType('white', 'bg') : themeType(props.type, 'bg', props.lightStyle)
      const color = props.plain ? themeType(props.type, null)
        : props.lightStyle ? themeType(props.type, null)
          : themeType('white', null)
      const border = props.plain ? themeType(props.type, 'bd', true)
        : props.lightStyle ? themeType(props.type, 'bd', true) : ''
      const bgHover = props.plain ? themeType(props.type, 'bg-hover', props.lightStyle)
        : props.lightStyle ? themeType(props.type, 'bg-hover')
          : themeType(props.type, 'bg-hover') + ' ' + 'xl-color-hover-brightness'
      const colorHover = props.plain ? props.lightStyle ? themeType(props.type, 'hover')
        : themeType('white', 'hover') : themeType('white', 'hover')
      const borderHover = props.plain ? themeType(props.type, 'bd-hover', true) : ''
      return [bg, bgHover, color, colorHover, border, borderHover]
    })
    // style
    const maxSize = ref(0)// 按钮为圆形的时候需要取"宽高中的最大值"将圆形扩展成正方形再加上borderRadius：50%
    const XlButton = ref(null)// XlButton-ref
    onMounted(() => {
      nextTick().then(() => {
        maxSize.value = Math.max(XlButton.value.clientWidth, XlButton.value.clientHeight) + 10
      })
    })
    const { widthC, heightC } = size(props)
    const styleC = computed(() => {
      const style = { ...props.popStyle }
      if (props.width !== 0) {
        style.width = widthC.value
      }
      if (props.height !== 0) {
        style.height = heightC.value
      }
      if (props.circle) {
        style.width = `${maxSize.value}px`
        style.height = `${maxSize.value}px`
        style.borderRadius = '50%'
      }
      if (classC.value.join().includes('-bd-')) {
        style.borderWidth = '1px'
        style.borderStyle = 'solid'
      }
      return style
    })
    const router = useRouter()
    const clickHandler = () => {
      go(props.to, router)// 路由跳转
      // ctx.emit('click')//click事件自动冒泡，无需emit
    }
    return {
      classC,
      styleC,
      XlButton,
      clickHandler
    }
  }
}
</script>

<style lang="less">
.XlButton{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 56px;
  min-height: 14px;
  @gap:10px;
  padding: @gap/2 @gap @gap/2 @gap;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  .label{
    padding : 5px 8px;
    font-size: 16px;
  }
}
@brightness:1.1;
.xl-color-hover-brightness:hover{
  -webkit-filter:brightness(@brightness);//兼容不同浏览器
  -o-filter:brightness(@brightness);
  -moz-filter:brightness(@brightness);
  filter:brightness(@brightness);
}
</style>
