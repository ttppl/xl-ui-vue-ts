<template>
  <teleport to="body" :disabled="diasbaleTobody">
    <transition :name="transition">
      <div v-show="showPopup" ref="content" v-resize="{disable:type!=='dialog'||!resizable,geometric:resizable==='geometric',callback:mouseMoveCallback,transform:'offset'}" class="xl-popup" :style="style" :class="classes">
        <Icon v-if="showClose" class="xl-close-icon" :pop-style="iconStyle" icon="close" @click.capture="closePop" />
        <!-- title,dialog时渲染 -->
        <div v-if="type==='dialog'" v-drag="{target:1,disable:type!=='dialog'||!draggable,callback:dragCallback,transform:false}" class="xl-popup-content-title">
          <slot name="title"><p v-if="title">{{ title }}</p></slot>
        </div>
        <!-- content -->
        <Scroll ref="scroll" :width="1" :height="1" :show-scroll="showScroll" class="xl-popup-content-inner">
          <slot />
        </Scroll>
        <!-- footer，dialog或者自定义footer时渲染 -->
        <div v-if="$slots.footer||type=='dialog'" class="xl-popup-content-footer">
          <slot name="footer">
            <div v-if="type=='dialog'" class="xl-popup-footer-buttons">
              <Button type="notice" plain light-style @click="showPopup=false">Cancle</Button>
              <Button type="primary" light-style>Confirm</Button>
            </div>
          </slot>
        </div>
      </div>
    </transition>
    <div v-show="showPopup" class="xl-popup-mask" :style="{zIndex:maskZIndex}" :class="{'xl-mask':mask}" @click.capture="clickOutside" />
  </teleport>
</template>

<script type="text/ecmascript-6">
import zIndexManager from '@/utils/zIndexManager'
import Scroll from '@/components/scroll'
import Button from '@/components/button'
import dragHandler from '@/directives/drag'
import resizeHandler from '@/directives/resize'
import { getElementSize, getWindowSize, on, off, hasScrollbar, getScrollWidth, getOffsetLeft, getOffsetTop } from '@/utils/dom'
import { computed, reactive, ref } from '@vue/reactivity'
import size from '@/mixins/size'
import { nextTick, onBeforeUnmount, onMounted, watch } from '@vue/runtime-core'
import Icon from '@/components/icon/src/Icon'
import ResizeDetector from '@/utils/ResizeDetector'
import { onece } from '@/utils/common'
// v-clickoutside="closePop"
const colors = {
  primary: '#409EFF',
  white: '#FFFFFF',
  black: '#000000',
  warn: '#e6a23c',
  notice: '#909399',
  error: '#f56c6c',
  success: '#67c23a'
}
export default {
  name: 'XlPopup',

  components: {
    Scroll,
    Button,
    Icon
  },

  directives: { drag: dragHandler, resize: resizeHandler },

  props: {
    modelValue: Boolean,
    toBody: Boolean,
    direction: {
      type: String,
      default: 'center'
    },

    showClose: {
      type: Boolean,
      default: true
    },

    lockScreen: {
      type: Boolean,
      default: false
    },

    closeIcon: {
      type: String,
      default: ''
    },

    mask: {
      type: Boolean,
      default: true
    },

    type: {
      type: String,
      default: 'drawer'
    },

    draggable: { // type为dialog时生效
      type: Boolean,
      default: false
    },

    resizable: { // type为dialog时生效
      type: [Boolean, String],
      default: false
    },

    showScroll: {
      type: [String, Boolean],
      default: true
    },

    closeOnPressEscape: Boolean,
    closeOnClickMask: {
      type: Boolean,
      default: true
    },

    popStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    popClass: {
      type: [Array, String],
      default: () => {
        return []
      }
    },

    title: {
      type: String,
      default: ''
    },

    width: {
      type: [Number, String],
      default: 200
    },

    height: {
      type: [Number, String],
      default: 100
    }
  },

  emits: ['update:modelValue'],

  setup (props, ctx) {
    const maskZIndex = zIndexManager.nextIndex()
    const popupZIndex = zIndexManager.nextIndex()
    const closeIconZIndex = zIndexManager.nextIndex()

    const showPopup = computed({
      get () {
        return props.modelValue
      },

      set (nv) {
        ctx.emit('update:modelValue', nv)
      }
    })
    const transition = computed(() => {
      if (props.type === 'dialog') {
        return 'tst-scale-center'
      }
      switch (props.direction) {
        case 'center':
          return 'tst-scale-center'
        case 'left':
          return 'tst-scale-right'
        case 'right':
          return 'tst-scale-left'
        case 'top':
          return 'tst-scale-down'
        case 'bottom':
          return 'tst-scale-up'
        default:
          return 'tst-scale-center'
      }
    })
    const classes = computed(() => {
      let classes = props.popClass || []
      if (typeof classes === 'string') {
        classes = [classes]
      }
      return [...classes, { 'xl-dialog': props.type === 'dialog' }]
    })
    const windows = reactive({
      viewWidth: 0,
      viewHeight: 0
    })
    const contentSize = ref({
      width: 0,
      height: 0
    })
    const getElementAttr = () => { // 获取window可视宽高
      const size = getWindowSize()
      windows.viewWidth = size.width
      windows.viewHeight = size.height
      // windows.viewWidth = document.documentElement.clientWidth
      // windows.viewHeight = document.documentElement.clientHeight
      contentSize.value = getElementSize(content.value, 'fixed')
    }

    const content = ref(null)
    const resizeDetector = new ResizeDetector({ console: false })
    let resizer
    onMounted(() => {
      nextTick().then(getElementAttr)// 初始化执行获取
      on(window, 'resize', getElementAttr)
    })
    onBeforeUnmount(() => {
      off(window, 'resize', getElementAttr)
      if (resizer) {
        resizeDetector.removeListener(resizer)
      }
    })
    const onKeyPress = (e) => {
      console.log('escape')
      if (!props.closeOnPressEscape) return
      if (e.code === 'Escape') {
        e.stopPropagation()
        closePop()
      }
    }

    const closePop = () => {
      showPopup.value = false
    }

    const clickOutside = (e) => {
      e.stopPropagation()
      if (props.closeOnClickMask) {
        closePop()
      }
    }

    const diasbaleTobody = computed(() => {
      // teleport disable会导致自定义指令unmount相关生命周期失效，所以diasable需恒为false
      if (props.draggable || props.resizable) {
        return false
      }
      return !props.toBody
    })
    let disableStyleForSize = false
    const mouseMoveCallback = onece(() => {
      // computed依赖未改变，需手动删除定位属性
      delete style.value.left
      delete style.value.top
      disableStyleForSize = true
    })
    const dragCallback = onece(() => {
      // computed依赖未改变，需手动删除定位属性
      delete style.value.left
      delete style.value.top
      disableStyleForSize = true
    })
    const { widthC, heightC } = size(props)
    const style = computed(() => {
      const style = { ...props.popStyle }
      style.zIndex = popupZIndex
      if (props.type === 'dialog') {
        if (!disableStyleForSize) {
          style.left = `${windows.viewWidth / 2 - contentSize.value.width / 2}px`
          style.top = `${windows.viewHeight / 2 - contentSize.value.height / 2}px`
        }
        return style
      }
      if (!style.width && props.width !== 0) {
        style.width = widthC.value
      }
      if (!style.height && props.height !== 0) {
        style.height = heightC.value
      }
      if (props.direction === 'center') {
        style.left = `${windows.viewWidth / 2 - contentSize.value.width / 2}px`
        style.top = `${windows.viewHeight / 2 - contentSize.value.height / 2}px`
      }
      if (props.direction === 'left') {
        style.left = '0px'
        style.top = `${windows.viewHeight / 2 - contentSize.value.height / 2}px`
      }
      if (props.direction === 'right') {
        style.right = '0px'
        style.top = `${windows.viewHeight / 2 - contentSize.value.height / 2}px`
      }
      if (props.direction === 'top') {
        style.left = `${windows.viewWidth / 2 - contentSize.value.width / 2}px`
        style.top = '0px'
      }
      if (props.direction === 'bottom') {
        style.left = `${windows.viewWidth / 2 - contentSize.value.width / 2}px`
        style.bottom = '0px'
      }
      return style
    })
    const iconStyle = computed(() => {
      return {
        zIndex: closeIconZIndex,
        color: colors[props.closeIcon] || '#bfbfbf',
        position: 'absolute',
        top: '3px',
        right: '5px'
      }
    })
    const scroll = ref(null)
    watch(() => props.modelValue, (nv) => {
      if (nv) {
        nextTick().then(scroll.value.initScroll)// 初始化Scroll
        if (props.type === 'dialog' && props.resizable && props.resizable === 'geometric' && !resizer) { // 监听resize事件
          nextTick().then(() => {
            try {
              resizer = resizeDetector.listenTo(content.value, getElementAttr)
            } catch (e) {
              console.log(e)
            }
          })
        }
        if (props.lockScreen) {
          if (hasScrollbar()) {
            document.body.style.left = '0'
            document.body.style.right = `${getScrollWidth()}px`
            // document.getElementById('app').style.paddingRight = '100px'
          }
          document.body.style.overflow = 'hidden'
        }
        if (props.closeOnPressEscape) { on(document, 'keydown', onKeyPress) }
      } else {
        document.body.style.right = '0'
        document.body.style.overflow = 'auto'
        if (props.closeOnPressEscape) { off(document, 'keydown', onKeyPress) }
      }
    })
    return {
      maskZIndex,
      // ref
      content,
      scroll,
      // compute
      showPopup,
      diasbaleTobody,
      transition,
      style,
      classes,
      iconStyle,
      // method
      closePop,
      clickOutside,
      mouseMoveCallback,
      dragCallback
    }
  }
}
</script>

<style lang="less">
// @import '../../styles/transition.less';
.xl-mask{
  background:rgba(0, 0, 0, 0.4);
}
.xl-popup-mask{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}
.xl-popup{
  position: fixed;
  opacity: 1;
  background-color: white;
  padding : 0 4px;
  box-sizing: border-box;
  >.xl-popup-content-title{
    font-size: 18px;
    font-family: Arial;
    font-weight: 700;
    color: black;
    text-align: center;
  }

  >.xl-popup-content-footer{
    padding: 20px 0;
    >.xl-popup-footer-buttons{
      -webkit-display:flex;
      -ms-display:flex;
      display:flex;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      -ms-justify-content: space-around;
    }
  }
}

.xl-dialog{
  // left:50%;
  // top:50%;
  // transform: translate(-50%,-50%);
  min-width: 400px;
  min-height: 200px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

// .tst-popup-scale-center-enter-active,
// .tst-popup-scale-center-leave-active {
//   opacity: 1;
//   -webkit-transform: translate(-50%,-50%) scale(1,1) !important;
//   transform: translate(-50%,-50%) scale(1,1) !important;
//   -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
// }

// .tst-popup-scale-center-enter-from,
// .tst-popup-scale-center-leave-to {
//   opacity: 0;
//   -webkit-transform: translate(-50%,-50%) scale(0,0) !important;
//   transform: translate(-50%,-50%) scale(0,0) !important;
// }
</style>
