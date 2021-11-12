<template>
  <div ref="scrollRef" class="XlScroll" :style="style" @mouseenter="showbar" @mouseleave="hideBar">
    <div ref="viewRef" :style="viewStyle" class="scroll-view" @scroll="handleScroll">
      <slot />
    </div>
    <div v-if="showScrollY" class="xl-scroll-bar-y" @mousedown="clickTrackHandler" @click.stop>
      <Transition name="tst-faded">
        <div v-show="showBar" class="xl-bar" :class="barClass" :style="barStyle('y')" />
      </Transition>
    </div>
    <div v-if="showScrollX" class="xl-scroll-bar-x" @mousedown="clickTrackHandlerX" @click.stop>
      <Transition name="tst-faded">
        <div v-show="showBar" class="xl-bar" :class="barClass" :style="barStyle('x')" />
      </Transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, computed, onMounted, nextTick, onUnmounted, onBeforeUpdate, onBeforeUnmount, toRef } from 'vue'
import size, { computeSize } from '@/mixins/size'
import { themeType } from '../../../types'
import { on, off } from '@/utils/dom'
import { isMobile, isTrue } from '@/utils/common'
import ResizeDetector from '@/utils/ResizeDetector'
import Transition from '@/components/transition/src/Transition.vue'
export default {
  name: 'XlScroll',

  nameSpace: 'XlScroll',

  components: {
    Transition
  },

  props: {

    showScroll: { // x,y,treu/false
      type: [String, Boolean],
      default: true
    },

    showOnhover: Boolean, // hover才显示bar

    width: {
      type: [String, Number],
      default: 0
    },

    height: {
      type: [String, Number],
      default: 0
    },

    maxWidth: {
      type: [String, Number],
      default: 0
    },

    maxHeight: {
      type: [String, Number],
      default: 0
    },

    barWidth: {
      type: Number,
      default: 5
    },

    type: {
      type: String,
      default: 'notice'
    },

    lightStyle: Boolean,
    popBarStyle: {
      type: Object,
      default: () => {
        return null
      }
    }
  },

  setup (props, ctx) {
    const scrollRef = ref(null)
    const viewRef = ref(null)
    const scrollSize = reactive({})// 内容大小（可见高度，内容高度，可见宽度，内容宽度）
    const getScrollSize = () => {
      // scrollSize.containerHeight = scrollRef.value.clientHeight
      scrollSize.contentHeight = viewRef.value?.scrollHeight
      // scrollSize.containerWidth = scrollRef.value.clientWidth
      scrollSize.contentWidth = viewRef.value?.scrollWidth
      scrollSize.contentViewHeight = viewRef.value?.clientHeight
      scrollSize.contentViewWidth = viewRef.value?.clientWidth
    }

    let resizer
    const resizeDetector = new ResizeDetector({ console: false })
    const initScroll = () => { // 暴露给外界的初始化方法
      // console.log('init scroll')
      nextTick().then(() => {
        getScrollSize()
        if (!resizer) {
          try {
            resizer = resizeDetector.listenTo(viewRef.value, getScrollSize)
          } catch (e) {
          // console.log(e)
          }
        }
      })
    }
    onMounted(() => {
      nextTick().then(() => {
        getScrollSize()
        on(window, 'resize', getScrollSize)
        try {
          resizer = resizeDetector.listenTo(viewRef.value, getScrollSize)
        } catch (e) {
          // console.log(e)
        }
      })
    })
    // onBeforeUpdate(() => {
    //   if (props.width === 0 || props.height === 0) {
    //     console.log(111)
    //     getScrollSize()
    //   }
    // })

    onBeforeUnmount(() => {
      off(window, 'resize', getScrollSize)
      off(document, 'mouseup', mouseUp)
      if (resizer) {
        resizeDetector.removeListener(resizer)
      }
    })
    const showScrollY = computed(() => { // 显示纵向滚动条
      return scrollSize.contentHeight > scrollSize.contentViewHeight && (isTrue(props.showScroll) || props.showScroll.toLowerCase() === 'y')
    })
    const showScrollX = computed(() => { // 显示横向滚动条
      return scrollSize.contentWidth > scrollSize.contentViewWidth && (isTrue(props.showScroll) || props.showScroll.toLowerCase() === 'x')
    })
    const style = computed(() => { // container style
      const style = { }
      const { widthC, heightC } = size(props)
      if (props.width !== 0) {
        style.width = widthC.value
      }
      if (props.height !== 0) {
        style.height = heightC.value
      }
      if (showScrollY.value) {
        style.paddingRight = `${props.barWidth * 1 + 2}px`
      }
      if (showScrollX.value) {
        style.paddingRBottom = `${props.barWidth * 1 + 2}px`
      }
      return style
    })

    const viewStyle = computed(() => {
      const style = {}
      if (props.maxWidth !== 0) {
        style.maxWidth = computeSize(props.maxWidth)
      }
      if (props.maxHeight !== 0) {
        style.maxHeight = computeSize(props.maxHeight)
      }
      return style
    })

    // bar相关
    const barClass = computed(() => {
      const type = themeType(props.type, 'bg', props.lightStyle)
      const checked = { 'xl-bar-checked': props.barChecked }
      return [type, checked]
    })
    // showScrollY时用
    const barHeight = computed(() => { return Math.pow(scrollSize.contentViewHeight, 2) / scrollSize.contentHeight })
    // showScrollX时用
    const barWidth = computed(() => { return Math.pow(scrollSize.contentViewWidth, 2) / scrollSize.contentWidth })
    const barStyle = computed(() => {
      return (type) => {
        const style = { ...props.popBarStyle }
        if (showScrollY.value && type === 'y') {
          style.width = `${props.barWidth}px`
          style.height = `${barHeight.value}px`
          style.transform = `translateY(${barTranslate.y}px)`
        }
        if (showScrollX.value && type === 'x') {
          style.height = `${props.barWidth}px`
          style.width = `${barWidth.value}px`
          style.transform = `translateX(${barTranslate.x}px)`
        }
        return style
      }
    })
    const barTranslate = reactive({ x: 0, y: 0 }) // 滚动条位置

    const handleScroll = () => { // 滚动事件
      if (showScrollY.value) {
        barTranslate.y = viewRef.value.scrollTop * barHeight.value / scrollSize.contentViewHeight
      }
      if (showScrollX.value) {
        barTranslate.x = viewRef.value.scrollLeft * barWidth.value / scrollSize.contentViewWidth
      }
    }

    const clickTrackHandler = (e) => {
      e.stopPropagation()
      caculatePosition(e, 'y')
      if (showScrollY.value) {
        on(document, 'mousemove', moseMove)
        on(document, 'mouseup', mouseUp)
      }
    }
    const clickTrackHandlerX = (e) => {
      e.stopPropagation()
      caculatePosition(e, 'x')
      if (showScrollX.value) {
        on(document, 'mousemove', moseMoveX)
        on(document, 'mouseup', mouseUp)
      }
    }

    const moseMove = (e) => {
      e.stopPropagation()
      caculatePosition(e, 'y')
    }

    const moseMoveX = (e) => {
      e.stopPropagation()
      caculatePosition(e, 'x')
    }

    const mouseUp = (e) => {
      e.stopPropagation()
      off(document, 'mousemove', moseMove)
      off(document, 'mousemove', moseMoveX)
    }

    const caculatePosition = (e, type = 'y') => {
      e.preventDefault()
      const VIEW = viewRef.value
      if (type === 'y' && showScrollY.value) {
        const containerTop = scrollRef.value.getBoundingClientRect().top
        const containerBottom = scrollRef.value.getBoundingClientRect().bottom
        if (e.clientY <= (containerTop + barHeight.value / 2)) { // 移动到超出上边界
          // barTranslate.y = 0
          VIEW.scrollTop = 0
        } else if (e.clientY >= (containerBottom - barHeight.value / 2)) { // 移动到超出下边界
          VIEW.scrollTop = scrollSize.contentHeight - scrollSize.contentViewHeight
        } else {
          const barMiddle = containerTop + barHeight.value / 2
          VIEW.scrollTop = (e.clientY - barMiddle) / scrollSize.contentViewHeight * scrollSize.contentHeight
        }
      }
      if (type === 'x' && showScrollX.value) {
        const containerleft = scrollRef.value.getBoundingClientRect().left
        const containerRight = scrollRef.value.getBoundingClientRect().right
        if (e.clientX <= (containerleft + barWidth.value / 2)) { // 移动到超出左边界
          VIEW.scrollLeft = 0
        } else if (e.clientX >= (containerRight - barWidth.value / 2)) { // 移动到超出右边界
          VIEW.scrollLeft = scrollSize.contentWidth - scrollSize.contentViewWidth
        } else {
          const barMiddle = containerleft + barWidth.value / 2
          VIEW.scrollLeft = (e.clientX - barMiddle) / scrollSize.contentViewWidth * scrollSize.contentWidth
        }
      }
    }
    const showOnhover = isMobile ? ref(false) : toRef(props, 'showOnhover')
    const showBar = ref(!showOnhover.value)
    let timer = null
    function showbar () {
      if (!showOnhover.value) return
      clearTimeout(timer)
      showBar.value = true
    }
    function hideBar () {
      if (!showOnhover.value) return
      timer = setTimeout(() => {
        showBar.value = false
      }, 1500)
    }
    return {
      style,
      viewStyle,
      scrollRef,
      viewRef,
      showScrollY,
      showScrollX,
      barClass,
      barStyle,
      handleScroll,
      clickTrackHandler,
      clickTrackHandlerX,
      initScroll,
      showBar,
      showbar,
      hideBar
    }
  }

}
</script>

<style scoped lang="less">
@import '~@/styles/transition.less';
.XlScroll{
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  font-size: 1rem;//inlineblock间隙问题
  >.scroll-view{
    height:100%;
    width:100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  >.xl-scroll-bar-y,.xl-scroll-bar-x{
    box-sizing: border-box;
    position: absolute;
    cursor: pointer;
    >.xl-bar{
      border-radius: 6px;
      cursor: pointer;
    }
    >.xl-bar:hover,.xl-bar-checked{
      opacity: 0.6;
    }
  }
  >.xl-scroll-bar-y{
    right:0;
    top:0;
    height: 100%;
  }
  >.xl-scroll-bar-x{
    left:0;
    bottom:0;
    width:100%;
  }
}
</style>
