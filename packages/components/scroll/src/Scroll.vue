<template>
  <div ref="scrollRef" class="XlScroll" :style="style">
    <div ref="viewRef" :style="viewStyle" class="scroll-view" @scroll="handleScroll">
      <slot />
    </div>
    <div v-if="showScrollY" class="xl-scroll-bar-y" @mousedown="clickTrackHandler" @click.stop>
      <div class="xl-bar-y xl-pointer" :class="barClass" :style="barStyle" />
    </div>
    <div v-if="showScrollX" class="xl-pointer xl-scroll-bar-x" @mousedown="clickTrackHandler" @click.stop>
      <div class="xl-bar-x xl-pointer" :class="barClass" :style="barStyle" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, computed, onMounted, nextTick, onUnmounted, onBeforeUpdate } from 'vue'
import size, { computeSize } from '@/mixins/size'
import { themeType } from '../../../types'
import { on, off } from '@/utils/dom'
export default {
  name: 'XlScroll',

  nameSpace: 'XlScroll',

  components: {
  },

  props: {

    showScroll: {
      type: String,
      default: 'both'
    },

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
    popStyle: {
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
      scrollSize.containerHeight = scrollRef.value.clientHeight
      scrollSize.contentHeight = viewRef.value.scrollHeight
      scrollSize.containerWidth = scrollRef.value.clientWidth
      scrollSize.contentWidth = viewRef.value.scrollWidth
      scrollSize.contentViewHeight = viewRef.value.clientHeight
      scrollSize.contentViewWidth = viewRef.value.clientWidth
    }
    onMounted(() => {
      nextTick().then(() => {
        getScrollSize()
        on(viewRef.value, 'resize', getScrollSize)
      })
    })
    // onBeforeUpdate(() => {
    //   if (props.width === 0 || props.height === 0) {
    //     console.log(111)
    //     getScrollSize()
    //   }
    // })
    const showScrollY = computed(() => { // 显示纵向滚动条
      return scrollSize.contentHeight > scrollSize.containerHeight && (props.showScroll === 'both' || props.showScroll.toLowerCase() === 'y')
    })
    const showScrollX = computed(() => { // 显示横向滚动条
      return scrollSize.contentWidth > scrollSize.containerWidth && (props.showScroll === 'both' || props.showScroll.toLowerCase() === 'x')
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
      const style = { ...props.popStyle }
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
    const barHeight = computed(() => { return Math.pow(scrollSize.containerHeight, 2) / scrollSize.contentHeight })
    // showScrollX时用
    const barWidth = computed(() => { return Math.pow(scrollSize.containerWidth, 2) / scrollSize.contentWidth })
    const barStyle = computed(() => {
      const style = {}
      if (showScrollY.value) {
        style.width = `${props.barWidth}px`
        style.height = `${barHeight.value}px`
        style.transform = `translateY(${barTranslate.y}px)`
      }
      if (showScrollX.value) {
        style.height = `${props.barWidth}px`
        style.width = `${barWidth.value}px`
        style.transform = `translateY(${barTranslate.x}px)`
      }
      return style
    })
    const barTranslate = reactive({ x: 0, y: 0 }) // 滚动条位置

    const handleScroll = () => { // 滚动事件
      if (showScrollY.value) {
        barTranslate.y = viewRef.value.scrollTop * barHeight.value / scrollSize.containerHeight
      }
    }

    const clickTrackHandler = (e) => {
      e.stopPropagation()
      caculatePosition(e)
      if (showScrollY.value) {
        on(document, 'mousemove', moseMove)
        on(document, 'mouseup', mouseUp)
      }
    }

    const moseMove = (e) => {
      e.stopPropagation()
      caculatePosition(e)
    }

    const mouseUp = (e) => {
      e.stopPropagation()
      off(document, 'mousemove', moseMove)
    }

    const caculatePosition = (e) => {
      e.preventDefault()
      const containerTop = scrollRef.value.getBoundingClientRect().top
      const containerBottom = scrollRef.value.getBoundingClientRect().bottom
      const VIEW = viewRef.value
      if (showScrollY.value) {
        if (e.clientY <= (containerTop + barHeight.value / 2)) { // 移动到超出上边界
          // barTranslate.y = 0
          VIEW.scrollTop = 0
        } else if (e.clientY >= (containerBottom - barHeight.value / 2)) { // 移动到超出下边界
          // barTranslate.y = scrollSize.containerHeight - barHeight.value
          VIEW.scrollTop = scrollSize.contentHeight - scrollSize.contentViewHeight
        } else {
          const barMiddle = containerTop + barHeight.value / 2
          // barTranslate.y = e.clientY - barMiddle
          VIEW.scrollTop = (e.clientY - barMiddle) / scrollSize.containerHeight * scrollSize.contentHeight
        }
      }
    }

    onUnmounted(() => {
      off(document, 'mouseup', mouseUp)
    })
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
      clickTrackHandler
    }
  }

}
</script>

<style scoped lang="less">
.XlScroll{
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  >.scroll-view{
    height:100%;
    width:100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  >.xl-scroll-bar-y{
    box-sizing: border-box;
    position: absolute;
    right:0;
    top:0;
    height: 100%;
    cursor: pointer;
    >.xl-bar-y{
      border-radius: 6px;
    }
    >.xl-bar-y:hover,.xl-bar-checked{
      opacity: 0.6;
    }
  }
}
</style>
