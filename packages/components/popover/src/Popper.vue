<script type="text/ecmascript-6">
import { h, Teleport, Transition, vShow, withDirectives, withCtx } from 'vue'
import zIndexManager from '../../../utils/zIndexManager'
// import {getElementSize} from '../../../utils/dom'
import Scroll from '../../scroll/src/Scroll'
import whCompute from '../../../mixins/whCompute'
const GAP = 10
const getMax = function (value) { // 边缘距离判断函数，最小为10
  return Math.max(value, GAP)
}
// const getMiddle = function(...arr){
//   arr.sort((a,b)=>a>b?1:a<b?-1:0);
//   if (arr.length % 2 == 0) {
//     return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
//   } else {
//     return arr[Math.floor(arr.length / 2)];
//   }
// }
// 直接固定三个数，减少判断次数
const getMiddle = function (v1, v2, v3) {
  const arr = [v1, v2, v3]
  arr.sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
  return arr[1]
}
const TYPES = {
  primary: 'xl-popper-primary-style',
  select: 'xl-popper-none-style'
}
export default {
  name: 'XlPropper',
  components: {
  },

  mixins: [whCompute],
  inject: ['XlPopperTrigger'],
  props: {
    modelValue: Boolean,

    width: {
      type: [Number, String],
      default: 0
    },

    height: {
      type: [Number, String],
      default: 0
    },

    maxHeight: {
      type: [Number, String],
      default: 0
    },

    type: {
      type: String,
      default: 'primary'
    },

    position: {
      type: String,
      default: 'bottom'
    },

    alwaysGivenPosition: Boolean, // 强制位置显示

    alwaysInView: Boolean, // 总是在窗口内

    popStyle: {
      type: Object,
      default: function () { return null }
    },

    showArrow: {
      type: Boolean,
      default: true
    },

    // 偏移量，右下为正，左上为负
    offset: {
      type: [Number, String],
      default: 0
    },

    offsetParent: {
      type: [Number, String],
      default: 0
    },

    minWidthFollowParent: Boolean// select时使用
  },

  emits: ['update:modelValue', 'close', 'mouseover', 'mouseout'],

  data () {
    return {
      zIndex: 100,
      parentwidth: '',
      scrollWidth: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      ownWidth: 0,
      popperPosition: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },

      arrowAttr: {
        position: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },

        arrowSize: 10, // border-width
        color: 'white'
      },

      finalPosition: ''
    }
  },

  computed: {
    model: {
      get () {
        return this.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    },

    xlPopperTrigger () {
      return this.XlPopperTrigger.value || this.XlPopperTrigger
    },

    widthC () {
      if (isNaN(this.width)) {
        const calcWidth = this.windowWidth * this.width.toString().trim().slice(0, -1) / 100
        return this.width.toString().endsWith('%') ? `${this.alwaysInView ? Math.min(calcWidth, this.windowWidth - this.scrollWidth) : calcWidth}px` : this.width.toString()
      }
      if (this.width === 0) {
        return 'auto'
      } else if (this.width > 1) {
        return `${this.alwaysInView ? Math.min(this.width, this.windowWidth - this.scrollWidth) : this.width}px`
      } else if (this.width < 1) {
        return `${this.windowWidth * this.width}px`
      } else {
        return `${this.windowWidth - this.scrollWidth}px`
      }
    },

    heightC () {
      if (isNaN(this.height)) {
        const calcHeight = this.windowHeight * this.height.toString().trim().slice(0, -1) / 100
        return this.height.toString().endsWith('%') ? `${this.alwaysInView ? Math.min(calcHeight, this.windowHeight - this.scrollWidth) : calcHeight}px` : this.height.toString()
      }
      if (this.height === 0) {
        return 'auto'
      } else if (this.height > 1) {
        return `${this.alwaysInView ? Math.min(this.height, this.windowHeight - this.scrollWidth) : this.height}px`
      } else if (this.height < 1) {
        return `${this.windowHeight * this.height}px`
      } else {
        return `${this.windowHeight - this.scrollWidth}px`
      }
    },

    style () {
      const style = {}
      style.zIndex = this.zIndex
      if (this.popperPosition.left) {
        style.left = `${this.popperPosition.left}px`
      }
      if (this.popperPosition.top) {
        style.top = `${this.popperPosition.top}px`
      }
      // style.transform = `translate(${this.popperPosition.left||0}px,${this.popperPosition.top||0}px)`
      return style
    },

    contentStyle () {
      const style = { ...this.popStyle }
      style.zIndex = this.zIndex
      if (this.width !== 0) {
        style.width = this.widthC
      } else if (this.ownWidth >= (this.windowWidth - this.scrollWidth)) {
        style.width = `${this.windowWidth - this.scrollWidth}px`
      }
      if (this.minWidthFollowParent) {
        style.minWidth = `${this.parentwidth}px`
      }

      if (this.height !== 0) {
        style.height = this.heightC
      } else if (this.maxHeight !== 0 && this.$refs.popper?.getBoundingClientRect().height >= this.maxHeight) {
        style.height = `${this.maxHeight}px`
      }
      return style
    },

    arrowStyle () {
      const style = {}
      style.zIndex = this.zIndex - 1
      if (this.arrowAttr.position.left) {
        style.left = `${this.arrowAttr.position.left}px`
      }
      if (this.arrowAttr.position.right) {
        style.right = `${this.arrowAttr.position.right}px`
      }
      if (this.arrowAttr.position.top) {
        style.top = `${this.arrowAttr.position.top}px`
      }
      if (this.arrowAttr.position.bottom) {
        style.bottom = `${this.arrowAttr.position.bottom}px`
      }
      style.backgroundColor = this.arrowAttr.color
      style.width = `${this.arrowAttr.arrowSize}px`
      style.height = `${this.arrowAttr.arrowSize}px`
      return style
    }
  },

  watch: {
    modelValue (nv) {
      if (nv) { this.calcPosition() }
    }
  },

  created () {
    this.zIndex = zIndexManager.nextIndex()
    this.scrollWidth = this.getScrollWidth()
  },

  updated () {
    // this.calcPosition()
  },

  mounted () {
    this.calcPosition()
    if (!this.isFixed(this.$parent.$refs.popover)) { // 固定位置不监听滚动事件
      document.addEventListener('scroll', this.calcPosition)
    }
    window.addEventListener('resize', this.calcPosition)
  },

  unmounted () {
    if (!this.isFixed(this.$parent.$refs.popover)) {
      document.removeEventListener('scroll', this.calcPosition)
    }
    window.removeEventListener('resize', this.calcPosition)
  },

  methods: {
    calcPosition () {
      if (!this.modelValue) {
        return
      }
      const parent = this.xlPopperTrigger.dom()
      if (parent) {
        this.finalPosition = this.position
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        const parentOffetLeft = parent.getBoundingClientRect().left
        const parentOffsetRight = parent.getBoundingClientRect().right
        const parentOffsetTop = parent.getBoundingClientRect().top
        const parentOffsetBottom = parent.getBoundingClientRect().bottom
        const parentwidth = parent.getBoundingClientRect().width
        this.parentwidth = parentwidth
        const parentHeight = parent.getBoundingClientRect().height

        const ownWidthOrig = this.$refs.popper?.getBoundingClientRect().width || this.widthC.slice(0, -2) / 1
        // const size = getElementSize(this.$refs.popperInner)
        // console.log('size',size);
        // const ownWidthOrig = size.width||this.widthC.slice(0,-2)/1
        const ownWidth = this.minWidthFollowParent ? Math.max(ownWidthOrig, parentwidth) : ownWidthOrig
        this.ownWidth = ownWidthOrig
        let ownHeight = this.$refs.popper?.getBoundingClientRect().height || this.heightC.slice(0, -2) / 1
        if (this.maxHeight !== 0 && ownHeight >= this.maxHeight) {
          ownHeight = this.maxHeight
        }
        // this.ownHeight = ownHeight
        // const ownHeight = size.height||this.heightC.slice(0,-2)/1
        const windowHeight = window.innerHeight - this.scrollWidth
        const windowWidth = window.innerWidth - this.scrollWidth

        // 剩余空间
        const restLeft = parentOffetLeft
        const restRight = windowWidth - parentOffsetRight
        const restTop = parentOffsetTop
        const restBottom = windowHeight - parentOffsetBottom

        const arrowSize = this.showArrow ? this.arrowAttr.arrowSize : 0

        const offset = isNaN(this.offset / 1) ? 0 : this.offset / 1
        const offsetParent = isNaN(this.offsetParent / 1) ? 0 : this.offsetParent / 1
        // 是否横向矩形，横向矩形超出后位置落入上下，纵向矩形落入左右方向
        const isRect = Math.max((restLeft - ownWidth), (restRight - ownWidth)) < Math.max((restTop - ownHeight), (restBottom - ownHeight))

        if (!this.alwaysGivenPosition && this.position === 'bottom') {
          if (restBottom > (ownHeight + arrowSize + offsetParent)) {
            this.finalPosition = 'bottom'
          } else if (restTop > (ownHeight + arrowSize + offsetParent)) {
            this.finalPosition = 'top'
          } else {
            if (isRect) {
              this.finalPosition = restBottom > restTop ? 'bottom' : 'top'// 上下空间哪个大放哪边
            } else {
              this.finalPosition = restLeft > restRight ? 'left' : 'right'
            }
          }
        }
        if (!this.alwaysGivenPosition && this.position === 'top') {
          if (restTop > (ownHeight + arrowSize + offsetParent)) {
            this.finalPosition = 'top'
          } else if (restBottom > (ownHeight + arrowSize + offsetParent)) {
            this.finalPosition = 'bottom'
          } else {
            if (isRect) {
              this.finalPosition = restBottom > restTop ? 'bottom' : 'top'// 上下空间哪个大放哪边
            } else {
              this.finalPosition = restLeft > restRight ? 'left' : 'right'
            }
          }
        }
        if (!this.alwaysGivenPosition && this.position === 'left') {
          if (restLeft > (ownWidth + arrowSize + offsetParent)) {
            this.finalPosition = 'left'
          } else if (restRight > (ownWidth + arrowSize + offsetParent)) {
            this.finalPosition = 'right'
          } else {
            if (isRect) {
              this.finalPosition = restBottom > restTop ? 'bottom' : 'top'
            } else {
              this.finalPosition = restLeft > restRight ? 'left' : 'right'
            }
          }
        }
        if (!this.alwaysGivenPosition && this.position === 'right') {
          if (restRight > (ownWidth + arrowSize + offsetParent)) {
            this.finalPosition = 'right'
          } else if (restLeft > (ownWidth + arrowSize + offsetParent)) {
            this.finalPosition = 'left'
          } else {
            if (isRect) {
              this.finalPosition = restBottom > restTop ? 'bottom' : 'top'
            } else {
              this.finalPosition = restLeft > restRight ? 'left' : 'right'
            }
          }
        }

        // console.log("finaPosition:",this.finalPosition);
        const position = { transition: 'tst-scale-down' }
        const getInvewWidth = (value) => {
          return this.alwaysInView ? getMiddle(GAP, value, getMax(windowWidth - ownWidth)) : value
        }
        const getInvewHeight = (value) => {
          return this.alwaysInView ? getMiddle(GAP, value, getMax(windowHeight - ownHeight)) : value
        }
        if (this.finalPosition === 'bottom') {
          const left = parentOffetLeft + parentwidth / 2 - ownWidth / 2 + offset
          const top = parentOffsetBottom + arrowSize + offsetParent
          if (this.showArrow) {
            const minLeft = getInvewWidth(parentOffetLeft + parentwidth / 2 - ownWidth + arrowSize / 1.5)
            const maxLeft = getInvewWidth(parentOffsetRight - parentwidth / 2 - arrowSize / 1.5)
            const minTop = getInvewHeight(parentOffsetBottom + arrowSize)
            const maxTop = getInvewHeight(windowHeight - ownHeight - arrowSize)
            position.left = getMiddle(minLeft, left, maxLeft)
            position.top = getMiddle(minTop, top, maxTop)
          } else {
            position.left = getInvewWidth(left)
            position.top = getInvewHeight(top)
          }
          if (this.showArrow) {
            const arrow = {}
            arrow.top = -(arrowSize / 2)
            arrow.left = parentOffetLeft - position.left + parentwidth / 2 - arrowSize / 2
            this.arrowAttr.position = arrow
          }
        }
        if (this.finalPosition === 'top') {
          position.transition = 'tst-scale-up'
          const left = parentOffetLeft + parentwidth / 2 - ownWidth / 2 + offset
          const top = parentOffsetTop - ownHeight - arrowSize + offsetParent
          if (this.showArrow) {
            const minLeft = getInvewWidth(parentOffetLeft + parentwidth / 2 - ownWidth + arrowSize / 1.5)
            const maxLeft = getInvewWidth(parentOffsetRight - parentwidth / 2 - arrowSize / 1.5)
            const minTop = getInvewHeight(GAP)
            const maxTop = getInvewHeight(parentOffsetTop - ownHeight - arrowSize)
            position.left = getMiddle(minLeft, left, maxLeft)
            position.top = getMiddle(minTop, top, maxTop)
          } else {
            position.left = getInvewWidth(left)
            position.top = getInvewHeight(top)
          }
          if (this.showArrow) {
            const arrow = {}
            arrow.bottom = -(arrowSize / 2)
            arrow.left = parentOffetLeft - position.left + parentwidth / 2 - arrowSize / 2
            this.arrowAttr.position = arrow
          }
        }
        if (this.finalPosition === 'left') {
          position.transition = 'tst-scale-left'
          const left = parentOffetLeft - ownWidth - arrowSize + offset
          const top = parentOffsetTop + parentHeight / 2 - ownHeight / 2 + offsetParent
          if (this.showArrow) {
            const minLeft = getInvewWidth(GAP)
            const maxLeft = getInvewWidth(parentOffetLeft - ownWidth - arrowSize)
            const minTop = getInvewHeight(parentOffsetTop + parentHeight / 2 - ownHeight + arrowSize / 1.5)
            const maxTop = getInvewHeight(parentOffsetBottom - parentHeight / 2 - arrowSize / 1.5)
            position.left = getMiddle(minLeft, left, maxLeft)
            position.top = getMiddle(minTop, top, maxTop)
          } else {
            position.left = getInvewWidth(left)
            position.top = getInvewHeight(top)
          }
          if (this.showArrow) {
            const arrow = {}
            arrow.right = -(arrowSize / 2)
            arrow.top = parentOffsetTop - position.top + parentHeight / 2 - arrowSize / 2
            this.arrowAttr.position = arrow
          }
        }
        if (this.finalPosition === 'right') {
          position.transition = 'tst-scale-right'
          const left = parentOffsetRight + arrowSize
          const top = parentOffsetTop + parentHeight / 2 - ownHeight / 2 + offsetParent
          if (this.showArrow) {
            const minLeft = getInvewWidth(parentOffsetRight + arrowSize)
            const maxLeft = getInvewWidth(windowWidth - ownWidth - arrowSize)
            const minTop = getInvewHeight(parentOffsetTop + parentHeight / 2 - ownHeight + arrowSize / 1.5)
            const maxTop = getInvewHeight(parentOffsetBottom - parentHeight / 2 - arrowSize / 1.5)
            position.left = getMiddle(minLeft, left, maxLeft)
            position.top = getMiddle(minTop, top, maxTop)
          } else {
            position.left = getInvewWidth(left)
            position.top = getInvewHeight(top)
          }
          if (this.showArrow) {
            const arrow = {}
            arrow.left = -(arrowSize / 2)
            arrow.top = parentOffsetTop - position.top + parentHeight / 2 - arrowSize / 2
            this.arrowAttr.position = arrow
          }
        }
        this.popperPosition = position
      }
    },

    contains (e) {
      return this.$refs?.popperInner?.contains(e)
    },

    isFixed (e) {
      if (!e || e.nodeName === 'BODY') {
        return false
      }
      const pos = window.getComputedStyle(e).position
      if (pos === 'fixed') {
        return true
      }
      if (e.parentNode) {
        return this.isFixed(e.parentNode)
      }
    },

    mouseover (e) {
      this.$emit('mouseover', e)
    },

    mouseout (e) {
      this.$emit('mouseout', e)
    },

    getScrollWidth () {
      var noScroll; var scroll; var oDiv = document.createElement('DIV')
      oDiv.style.cssText = 'position:absolute; top:9999px; width:100px; height:100px; overflow:hidden;'
      noScroll = document.body.appendChild(oDiv).clientWidth
      oDiv.style.overflowY = 'scroll'
      scroll = oDiv.clientWidth
      document.body.removeChild(oDiv)
      return (noScroll - scroll) + 20
      // return window.innerWidth-document.body.clientWidth
    }
  },

  render () {
    return h(Teleport, { to: 'body' }, [h(
      Transition,
      {
        name: this.popperPosition.transition
      },
      {
        default: withCtx(() => [withDirectives(
          h(
            'div',
            {
              class: 'popper-out',
              style: this.style,
              onMouseover: this.mouseover,
              onMouseout: this.mouseout

            }, [h(
              'div',
              { class: [{ arrow: this.showArrow }], style: this.arrowStyle },
              null
            ), h(
              'div',
              { class: [TYPES[this.type], 'xl-popper'], style: this.contentStyle, ref: 'popperInner' },
              h(Scroll, null, this.$slots.default())
            )]

          ),
          [[vShow, this.model]]
        )])
      }
    ),
    isNaN(this.width) || this.width === 0 || isNaN(this.height) || this.height === 0 ? h(
      'div',
      { class: [TYPES[this.type], 'xl-hidden-popper'], ref: 'popper', style: this.contentStyle },
      h(Scroll, null, this.$slots.default())
    ) : null
    ])
  }
}
</script>

<style lang="less">
@gap:20px;
.popper-out{
  position: fixed;
  z-index: 100;
  left:0;
  top:0;
  border-radius: 5px;
  box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
  >.arrow{
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
    transform: rotate(45deg);
  }
}
.xl-popper{
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
.xl-popper-primary-style{
  padding:@gap/2 @gap/2 @gap/2 @gap/2;
  background-color: white;
}
.xl-popper-none-style{
  background-color: white;
}
.xl-hidden-popper{
  position: absolute;
  box-sizing: border-box;
  top:0;
  overflow: hidden;
  visibility: hidden;
  z-index: -100;
}

.tst-scale-down-enter-active,
.tst-scale-down-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.tst-scale-down-enter-from,
.tst-scale-down-leave-to {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}

.tst-scale-up-enter-active,
.tst-scale-up-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center bottom;
  transform-origin: center bottom;
}

.tst-scale-up-enter-from,
.tst-scale-up-leave-to {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}

.tst-scale-right-enter-active,
.tst-scale-right-leave-active {
  opacity: 1;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: left center ;
  transform-origin: left center ;
}

.tst-scale-right-enter-from,
.tst-scale-right-leave-to {
  opacity: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}

.tst-scale-left-enter-active,
.tst-scale-left-leave-active {
  opacity: 1;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: right center ;
  transform-origin: right center ;
}

.tst-scale-left-enter-from,
.tst-scale-left-leave-to {
  opacity: 0;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}
</style>
