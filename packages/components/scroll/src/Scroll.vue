<template>
  <div ref="scroll" class="XlScroll" :style="style">
    <div ref="view" class="xl-scroll-content" :style="style" @scroll="handleScroll">
      <slot />
    </div>
    <div v-show="scroll&&showScroll" class="xl-pointer xl-scroll-bar" @mousedown="clickTrackHandler" @click.stop>
      <div ref="bar" class="xl-bar xl-pointer" :class="barClass" :style="barStyle" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import whCompute from '../../../mixins/whCompute'
import { themeType } from '../../../types'
const on = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}
const off = function (element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}
export default {
  name: 'XlScroll',

  components: {
  },

  mixins: [whCompute],

  props: {

    showScroll: {
      type: Boolean,
      default: true
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

  data () {
    return {
      scroll: false, // 是否需要滚动
      scrollHeight: 0, // 内容高度
      viewHeight: 0, // 可见高度
      barTranslateY: 0, // 滚动条位置
      barChecked: false// 滚动条是否被选中
    }
  },

  computed: {

    style () {
      const style = { ...this.popStyle }
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      return style
    },

    barClass () {
      const type = themeType(this.type, 'bg', this.lightStyle)
      const checked = { 'xl-bar-checked': this.barChecked }
      return [type, checked]
    },

    barStyle () {
      const style = {}
      style.width = `${this.barWidth}px`
      style.transform = `translateY(${this.barTranslateY}%)`
      style.height = `${this.scrollHeight / this.viewHeight * this.scrollHeight}px`
      return style
    }
  },

  created () {
  },

  mounted () {
    this.$nextTick().then(() => {
      this.scrollHeight = this.$refs.scroll.clientHeight
      this.viewHeight = this.$refs.view.scrollHeight
      this.scroll = this.viewHeight >= this.scrollHeight
    })
  },

  updated () {
    this.$nextTick().then(() => {
      this.scrollHeight = this.$refs.scroll.clientHeight
      this.viewHeight = this.$refs.view.scrollHeight
      this.scroll = this.viewHeight > this.scrollHeight
    })
  },

  unmounted () {
    off(document, 'mouseup', this.mouseUp)
  },

  methods: {
    handleScroll () {
      if (this.scroll && this.showScroll) {
        this.barTranslateY = this.$refs.view.scrollTop / this.scrollHeight * 100
      }
    },

    clickTrackHandler (e) {
      if (this.scroll && this.showScroll) {
        e.stopPropagation()
        // this.caculatePosition(e)
        on(document, 'mousemove', this.moseMove)
        on(document, 'mouseup', this.mouseUp)
      }
    },

    moseMove (e) {
      e.stopPropagation()
      this.barChecked = true
      this.caculatePosition(e)
    },

    mouseUp (e) {
      this.barChecked = false
      e.stopPropagation()
      this.caculatePosition(e)
      off(document, 'mousemove', this.moseMove)
    },

    caculatePosition (e) {
      e.preventDefault()
      const barTop = this.$refs.scroll.getBoundingClientRect().top
      const barBottom = this.$refs.scroll.getBoundingClientRect().bottom
      const barHeight = (this.scrollHeight / this.viewHeight * this.scrollHeight)
      const barMiddle = barTop + barHeight / 2
      const VIEW = this.$refs.view
      if (e.clientY - barHeight / 2 <= barTop) {
        this.barTranslateY = 0
        VIEW.scrollTop = 0
      } else if (e.clientY + barHeight / 2 >= barBottom) {
        this.barTranslateY = ((this.scrollHeight - barHeight) / barHeight) * 100
        VIEW.scrollTop = this.viewHeight - this.scrollHeight
      } else {
        this.barTranslateY = (e.clientY - barMiddle) / barHeight * 100
        VIEW.scrollTop = (e.clientY - barMiddle) / this.scrollHeight * this.viewHeight
      }
    }
  }
}
</script>

<style lang="less">
.XlScroll{
  overflow: hidden;
  height: 100%;
  -webkit-display:flex;
  -ms-display:flex;
  display:flex;
  >.xl-scroll-content::-webkit-scrollbar {
    display: none;
  }
  >.xl-scroll-content{
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    word-break:break-all
  }
  >.xl-scroll-bar{
    box-sizing: border-box;
    padding-left: 5px;
    height: 100%;
    >.xl-bar{
      // background-color: #909399;
      border-radius: 6px;
    }
    >.xl-bar:hover,.xl-bar-checked{
      opacity: 0.6;
    }
  }
  .xl-pointer{
    cursor: pointer;
  }
}
</style>
