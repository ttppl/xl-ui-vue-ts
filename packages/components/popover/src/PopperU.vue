<script type="text/ecmascript-6">
import { h, Teleport, Transition, vShow, withDirectives, withCtx, ref, inject, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import zIndexManager from '@/utils/zIndexManager'
import Scroll from '@/components/scroll/src/Scroll'
import { getElementSize, getScrollWidth, on, off, hasScrollbar, getOffsetTop, getOffsetLeft, setPositioned } from '@/utils/dom'
import { POSITION, SCALE_TRANSITION } from '@/types/consistant'
import size from '@/mixins/size'
// 常量

const GAP = 10// popper距离边缘的距离
// const getMax = function (value) { // 边缘距离判断函数，最小为10
//   return Math.max(value, GAP)
// }
// 获取中位数
// const getMiddle = function(...arr){
//   arr.sort((a,b)=>a>b?1:a<b?-1:0);
//   if (arr.length % 2 == 0) {
//     return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2;
//   } else {
//     return arr[Math.floor(arr.length / 2)];
//   }
// }
// 获取中位数，直接固定三个数，减少判断次数
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

  props: {
    modelValue: Boolean,
    toBody: Boolean,
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

    offsetParent: { // 距离触发元素的偏移量
      type: [Number, String],
      default: 0
    },

    transition: {
      type: String,
      default: 'faded'
    },

    transform: {
      type: Boolean,
      default: true
    },

    minWidthFollowParent: Boolean// select时使用，最小宽度为触发元素宽度,toBody时生效，否则设置宽度100%即可
  },

  emits: ['update:modelValue', 'close', 'mouseenter', 'mouseleave'],

  setup (props, ctx) {
    const windows = reactive({ // 窗口的一些属性
      // scrollWidth: hasScrollbar() ? getScrollWidth() : 0, // 滚动条宽度
      // width: 0, // 实际宽高
      // height: 0,
      // viewWidth: 0, // 可见宽高
      // viewHeight: 0,
      bodyWidth: 0, // body宽高
      bodyHeight: 0
    })
    const popper = ref(null)
    const popperAttr = reactive({ // popper自身的一些属性
      width: 0, // 原始宽高
      height: 0,
      resetedWidth: 0, // 重置宽高时赋值
      resetedHeight: 0,
      transition: `tst-${props.transition}`, // 过渡效果
      finalPosition: props.position,
      position: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })

    const arrowAttr = reactive({ // 箭头的一些属性
      size: 10, // border-width,
      color: 'white',
      position: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })

    const scroll = ref(null)// Scroll组件

    const model = computed({
      get () {
        return props.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    })
    // offset定位需要父元素不能为static
    // if (!props.transform) {
    //   nextTick().then(setPositioned(popper.value?.parentNode))
    // }

    const clearPopperResetedsize = () => {
      // if (Object.prototype.hasOwnProperty.call(popperAttr, 'resetedWidth')) { delete popperAttr.resetedWidth }
      // if (Object.prototype.hasOwnProperty.call(popperAttr, 'resetedHeight')) { delete popperAttr.resetedHeight }
      if (popperAttr.resetedWidth) { delete popperAttr.resetedWidth }// 为0时可不删除
      if (popperAttr.resetedHeight) { delete popperAttr.resetedHeight }
    }
    watch(() => props.modelValue, (nv) => { // 监听弹框
      if (nv) { calcPosition('show') } else {
        // nextTick().then(clearPopperResetedsize())
      }
    })

    const XlPopperTrigger = inject('XlPopperTrigger')
    const xlPopperTrigger = computed(() => { // 兼容传递普通对象和compute对象
      return XlPopperTrigger.value || XlPopperTrigger
    })
    // 计算popper位置
    const calcPosition = (triggerMethod) => {
      if (!model.value) { // 元素未显示，不计算位置
        clearPopperResetedsize()
        return
      }
      // if (triggerMethod === 'resize') { clearPopperResetedsize() }// resize放大时宽度需要重置，会造成闪烁，暂时没有更好的办法，待优化
      scroll.value.initScroll()// 初始化Scroll

      const parent = xlPopperTrigger.value.dom()// 触发元素的dom
      if (parent) {
        // 初始化窗口大小
        // windows.scrollWidth = hasScrollbar() ? getScrollWidth() : 0
        // windows.width = window.innerWidth * 1
        // windows.height = window.innerHeight * 1
        // windows.viewWidth = window.innerWidth - windows.scrollWidth
        // windows.viewHeight = window.innerHeight - windows.scrollWidth
        windows.bodyWidth = props.toBody ? Math.max(document.body.clientWidth, window.innerWidth) : document.body.clientWidth
        windows.bodyHeight = props.toBody ? Math.max(document.body.scrollHeight, window.innerHeight) : document.body.scrollHeight
        // 触发元素的位置和大小信息

        // const parentOffsetLeft = parent.getBoundingClientRect().left * 1
        // const parentOffsetRight = parent.getBoundingClientRect().right * 1
        // const parentOffsetTop = parent.getBoundingClientRect().top * 1
        // const parentOffsetBottom = parent.getBoundingClientRect().bottom * 1
        const parentwidth = parent.getBoundingClientRect().width * 1
        const parentHeight = parent.getBoundingClientRect().height * 1

        const parentOffsetTop = getOffsetTop(parent) * 1
        const parentOffsetLeft = getOffsetLeft(parent) * 1
        const parentOffsetBottom = parentOffsetTop + parentHeight
        const parentOffsetRight = parentOffsetLeft + parentwidth

        // 获取popper大小
        // let ownWidth = popperAttr.width || 0; let ownHeight = popperAttr.height || 0
        // if (ownWidth === 0 || ownHeight === 0) {
        //   const size = getElementSize(popper.value)
        //   ownWidth = size.width
        //   ownHeight = size.height
        // }
        let { width: ownWidth, height: ownHeight } = getElementSize(popper.value)
        // 赋值原始宽高
        // if (popperAttr.width === 0) {
        //   popperAttr.width = ownWidth
        // }
        // if (popperAttr.height === 0) {
        //   popperAttr.height = ownHeight
        // }

        // 强制显示完全时可能需要重置宽高
        if (props.alwaysInView) {
          if (ownWidth > (windows.bodyWidth - GAP * 2)) {
            ownWidth = windows.bodyWidth - GAP * 2
            popperAttr.resetedWidth = ownWidth
          }
          if (ownHeight > (windows.bodyHeight - GAP * 2)) {
            ownHeight = windows.bodyHeight - GAP * 2
            popperAttr.resetedHeight = ownHeight
          }
        }
        // 如果minWidthFollowParent为true的情况下宽度小于触发元素宽度则取触发元素宽度
        if (props.minWidthFollowParent && ownWidth < parentwidth) {
          ownWidth = parentwidth
          popperAttr.resetedWidth = parentwidth
        }
        // 高度超出最大高度取最大高度
        if (props.maxHeight !== 0 && ownHeight >= props.maxHeight) {
          ownHeight = props.maxHeight
          popperAttr.resetedHeight = ownHeight
        }
        // 箭头大小
        const arrowSize = props.showArrow ? arrowAttr.size : 0

        // 偏移量
        const offset = isNaN(props.offset / 1) ? 0 : props.offset / 1
        const offsetParent = isNaN(props.offsetParent / 1) ? 0 : props.offsetParent / 1
        let finalPosition = props.position// 初始化位置为默认位置
        if (!props.alwaysGivenPosition) {
          // 剩余空间
          const rest = {
            left: parentOffsetLeft,
            right: windows.bodyWidth - parentOffsetRight,
            top: parentOffsetTop,
            bottom: windows.bodyHeight - parentOffsetBottom
          }

          // 相对父元素的偏移量
          const offsetParent = isNaN(props.offsetParent / 1) ? 0 : props.offsetParent / 1
          // 是否横向矩形，横向矩形超出后位置落入上下，纵向矩形落入左右方向
          const isRect = Math.max((rest.left - ownWidth), (rest.right - ownWidth)) < Math.max((rest.top - ownHeight), (rest.bottom - ownHeight))

          // 计算最终位置
          if (isRect) {
            finalPosition = rest.bottom > rest.top ? POSITION.BOTTOM : POSITION.TOP// 上下空间哪个大放哪边
          } else {
            finalPosition = rest.left > rest.right ? POSITION.LEFT : POSITION.RIGHT
          }
          switch (props.position) {
            case POSITION.BOTTOM:
              if (rest.bottom > (ownHeight + arrowSize + offsetParent)) {
                finalPosition = POSITION.BOTTOM
              } else if (rest.top > (ownHeight + arrowSize + offsetParent)) {
                finalPosition = POSITION.TOP
              }
              break
            case POSITION.TOP:
              if (rest.top > (ownHeight + arrowSize + offsetParent)) {
                finalPosition = POSITION.TOP
              } else if (rest.bottom > (ownHeight + arrowSize + offsetParent)) {
                finalPosition = POSITION.BOTTOM
              }
              break
            case POSITION.LEFT:
              if (rest.left > (ownWidth + arrowSize + offsetParent)) {
                finalPosition = POSITION.LEFT
              } else if (rest.right > (ownWidth + arrowSize + offsetParent)) {
                finalPosition = POSITION.RIGHT
              }
              break
            case POSITION.RIGHT:
              if (rest.right > (ownWidth + arrowSize + offsetParent)) {
                finalPosition = POSITION.RIGHT
              } else if (rest.left > (ownWidth + arrowSize + offsetParent)) {
                finalPosition = POSITION.LEFT
              }
              break
          }
        }
        // console.log('finalPosition:', finalPosition)
        popperAttr.finalPosition = finalPosition
        if (props.toBody) {
          // 计算position
          const position = {}
          // const arrowWidth = Math.sqrt(Math.pow(arrowSize, 2) * 2)
          const boxShadowWidth = 2
          if ([POSITION.BOTTOM, POSITION.TOP].includes(finalPosition)) {
          // 初始位置
            let left = parentOffsetLeft + parentwidth / 2 - ownWidth / 2
            let top = finalPosition === POSITION.BOTTOM ? (parentOffsetBottom + arrowSize) : (parentOffsetTop - arrowSize - ownHeight)
            // 强制窗口显示可能需要重置宽高
            if (props.alwaysInView) {
              if (left < GAP) {
                left = GAP
              } else if ((left + ownWidth) > (windows.bodyWidth - GAP)) {
                left = windows.bodyWidth - GAP - ownWidth
              }
              if (finalPosition === POSITION.BOTTOM) {
                if ((top + ownHeight + arrowSize + offsetParent) > windows.bodyHeight - GAP) {
                  ownHeight = windows.bodyHeight - GAP - parentOffsetBottom - arrowSize - offsetParent
                  popperAttr.resetedHeight = ownHeight
                }
              } else {
                if (top < GAP) {
                  top = GAP
                  ownHeight = parentOffsetTop - arrowSize - GAP - offsetParent
                  popperAttr.resetedHeight = ownHeight
                }
              }
            }
            position.left = left
            position.top = top
            if (props.showArrow) {
              const arrowPosition = {}
              // arrowPosition.top = -(arrowSize / 2)
              if (finalPosition === POSITION.BOTTOM) {
                arrowPosition.top = -(arrowSize / 2)
              } else {
                arrowPosition.bottom = -(arrowSize / 2)
              }

              arrowPosition.left = getMiddle(boxShadowWidth, (parentOffsetLeft - position.left + parentwidth / 2 - arrowSize / 2 - offset), (ownWidth - arrowSize - boxShadowWidth))
              arrowAttr.position = arrowPosition
            }
          }

          if ([POSITION.RIGHT, POSITION.LEFT].includes(finalPosition)) {
          // 初始位置
            let left = finalPosition === POSITION.LEFT ? (parentOffsetLeft - arrowSize - ownWidth) : (parentOffsetRight + arrowSize)
            let top = parentOffsetTop + parentHeight / 2 - ownHeight / 2
            // 强制窗口显示可能需要重置宽高
            if (props.alwaysInView) {
              if ((top + ownHeight) > (windows.bodyHeight - GAP)) {
                top = windows.bodyHeight - GAP - ownHeight
              }
              if (finalPosition === POSITION.RIGHT) {
                if ((left + arrowSize + ownWidth) > (windows.bodyWidth - GAP)) {
                  ownWidth = windows.bodyWidth - GAP - parentOffsetRight - arrowSize
                  popperAttr.resetedWidth = ownWidth
                }
              } else {
                if (left < GAP) {
                  left = GAP
                  ownWidth = parentOffsetLeft - arrowSize - GAP
                  popperAttr.resetedWidth = ownWidth
                }
              }
            }
            position.left = left
            position.top = top
            if (props.showArrow) {
              const arrowPosition = {}
              if (finalPosition === POSITION.RIGHT) {
                arrowPosition.left = -(arrowSize / 2)
              } else {
                arrowPosition.right = -(arrowSize / 2)
              }
              // arrowPosition.top = parentOffsetTop - position.top + parentHeight / 2 - arrowSize / 2
              arrowPosition.top = getMiddle(boxShadowWidth, (parentOffsetTop - position.top + parentHeight / 2 - arrowSize / 2 - offset), (ownHeight - arrowSize - boxShadowWidth))
              arrowAttr.position = arrowPosition
            }
          }
          popperAttr.position = position
        } else {
          // 计算position
          const position = {}
          // const arrowWidth = Math.sqrt(Math.pow(arrowSize, 2) * 2)
          const boxShadowWidth = 2
          if ([POSITION.BOTTOM, POSITION.TOP].includes(finalPosition)) {
          // 初始位置
            let left = parentwidth / 2 - ownWidth / 2
            let top = finalPosition === POSITION.BOTTOM ? (parentHeight + arrowSize) : -(ownHeight + arrowSize)
            // 强制窗口显示可能需要重置宽高
            if (props.alwaysInView) {
              if (parentOffsetLeft + left < GAP) {
                left = GAP - parentOffsetLeft
              } else if ((parentOffsetLeft + left + ownWidth) > (windows.bodyWidth - GAP)) {
                left = windows.bodyWidth - GAP - ownWidth - parentOffsetLeft
              }
              if (finalPosition === POSITION.BOTTOM) {
                if ((parentOffsetTop + top + ownHeight) > windows.bodyHeight - GAP) {
                  ownHeight = windows.bodyHeight - GAP - parentOffsetBottom - arrowSize
                  popperAttr.resetedHeight = ownHeight
                }
              } else {
                if (top < GAP - parentOffsetTop) {
                  top = GAP - parentOffsetTop
                  ownHeight = parentOffsetTop - arrowSize - GAP
                  popperAttr.resetedHeight = ownHeight
                }
              }
            }
            position.left = left
            position.top = top
            if (props.showArrow) {
              const arrowPosition = {}
              // arrowPosition.top = -(arrowSize / 2)
              if (finalPosition === POSITION.BOTTOM) {
                arrowPosition.top = -(arrowSize / 2)
              } else {
                arrowPosition.bottom = -(arrowSize / 2)
              }

              arrowPosition.left = parentwidth / 2 - arrowSize / 2 - position.left
              arrowAttr.position = arrowPosition
            }
          }

          if ([POSITION.RIGHT, POSITION.LEFT].includes(finalPosition)) {
          // 初始位置
            let left = finalPosition === POSITION.LEFT ? -(ownWidth + arrowSize) : (parentwidth + arrowSize)
            let top = parentHeight / 2 - ownHeight / 2
            // 强制窗口显示可能需要重置宽高
            if (props.alwaysInView) {
              if ((parentOffsetTop + top + ownHeight) > (windows.bodyHeight - GAP)) {
                top = windows.bodyHeight - GAP - ownHeight - parentOffsetTop
              }
              if (finalPosition === POSITION.RIGHT) {
                if ((parentOffsetRight + left + arrowSize + ownWidth) > (windows.bodyWidth - GAP)) {
                  ownWidth = windows.bodyWidth - GAP - parentOffsetRight - arrowSize
                  popperAttr.resetedWidth = ownWidth
                }
              } else {
                if (left + parentOffsetLeft < GAP) {
                  left = GAP - parentOffsetLeft
                  ownWidth = parentOffsetLeft - arrowSize - GAP
                  popperAttr.resetedWidth = ownWidth
                }
              }
            }
            position.left = left
            position.top = top
            if (props.showArrow) {
              const arrowPosition = {}
              if (finalPosition === POSITION.RIGHT) {
                arrowPosition.left = -(arrowSize / 2)
              } else {
                arrowPosition.right = -(arrowSize / 2)
              }
              // arrowPosition.top = getMiddle(boxShadowWidth, (parentOffsetTop - position.top + parentHeight / 2 - arrowSize / 2 - offset), (ownHeight - arrowSize - boxShadowWidth))
              arrowPosition.top = +parentHeight / 2 - arrowSize / 2 - position.top
              arrowAttr.position = arrowPosition
            }
          }
          popperAttr.position = position
        }
      }
    }

    // popper计算style
    const zIndex = zIndexManager.nextIndex()// 元素层级
    const popperStyle = computed(() => {
      const { widthC, heightC } = size(props)
      const style = {
        // width: popperAttr.resetedWidth ? `${popperAttr.resetedWidth}px` : widthC.value,
        // height: popperAttr.resetedHeight ? `${popperAttr.resetedHeight}px` : heightC.value
        width: widthC.value,
        height: heightC.value
      }
      style.zIndex = zIndex
      const offsetLeft = parseFloat(getOffSetLeft()) || 0
      const offsetTop = parseFloat(getOffSetTop()) || 0
      if (props.transform) {
        style.transform = `translate(${(popperAttr.position.left || 0) + offsetLeft}px,${(popperAttr.position.top || 0) + offsetTop}px)`
      } else { // offset定位
        nextTick().then(setPositioned(popper.value?.parentNode))
        if (popperAttr.position.left) {
          style.left = `${popperAttr.position.left}px`
        }
        if (popperAttr.position.top) {
          style.top = `${popperAttr.position.top}px`
        }
      }
      return style
    })

    const getOffSetLeft = () => {
      switch (popperAttr.finalPosition) {
        case POSITION.BOTTOM:
        case POSITION.TOP:
          return props.offset
        case POSITION.LEFT:
          return -1 * props.offsetParent
        case POSITION.RIGHT:
          return props.offsetParent
      }
    }

    const getOffSetTop = () => {
      switch (popperAttr.finalPosition) {
        case POSITION.BOTTOM:
          return props.offsetParent
        case POSITION.TOP:
          return -1 * props.offsetParent
        case POSITION.LEFT:
        case POSITION.RIGHT:
          return props.offset
      }
    }

    const mouseenter = (e) => {
      ctx.emit('mouseenter', e)
    }

    const mouseleave = (e) => {
      ctx.emit('mouseleave', e)
    }

    const arrowStyle = computed(() => {
      if (!props.showArrow) {
        return null
      }
      const style = {}
      // style.zIndex = zIndex - 1
      if (arrowAttr.position.left) {
        style.left = `${arrowAttr.position.left}px`
      }
      if (arrowAttr.position.right) {
        style.right = `${arrowAttr.position.right}px`
      }
      if (arrowAttr.position.top) {
        style.top = `${arrowAttr.position.top}px`
      }
      if (arrowAttr.position.bottom) {
        style.bottom = `${arrowAttr.position.bottom}px`
      }
      style.backgroundColor = arrowAttr.color
      style.width = `${arrowAttr.size}px`
      style.height = `${arrowAttr.size}px`
      return style
    })
    // const isFixed = (e) => {
    //   if (!e || e.nodeName === 'BODY') {
    //     return false
    //   }
    //   const pos = window.getComputedStyle(e).position
    //   if (pos === 'fixed') {
    //     return true
    //   }
    //   if (e.parentNode) {
    //     return isFixed(e.parentNode)
    //   }
    // }
    const resizeCalcPosition = () => {
      calcPosition('resize')
    }
    onMounted(() => {
      calcPosition('mounted')
      // if (!isFixed(popper.value)) { // 固定位置不监听滚动事件
      //   on(document, 'scroll', calcPosition)
      // }
      on(window, 'resize', resizeCalcPosition)
    })

    onUnmounted(() => {
      // if (!isFixed(popper.value)) {
      //   off(document, 'scroll', calcPosition)
      // }
      off(window, 'resize', resizeCalcPosition)
    })

    const contains = (target) => { // teleport导致$el失效，需重写contains方法
      return popper.value?.contains(target)
    }
    return {
      model,
      popperStyle,
      mouseenter,
      mouseleave,
      popper,
      popperAttr,
      arrowStyle,
      scroll,
      contains
    }
  },

  render () {
    return h(Teleport, { to: 'body', disabled: !this.toBody }, h(
      Transition,
      {
        name: this.popperAttr.transition
      },
      {
        default: withCtx(() => [withDirectives(
          h(
            'div',
            {
              class: 'xl-popper',
              style: this.popperStyle,
              onMouseenter: this.mouseenter,
              onMouseleave: this.mouseleave,
              ref: 'popper'

            }, [h(
              'div',
              { class: [{ arrow: this.showArrow }], style: this.arrowStyle },
              null
            ), h(
              'div',
              { class: [TYPES[this.type], 'xl-popper-content'], style: this.popStyle },
              h(Scroll, { width: 1, height: 1, ref: 'scroll' }, this.$slots.default())
            )]

          ),
          [[vShow, this.model]]
        )])
      }
    )
    // ,isNaN(this.width) || this.width === 0 || isNaN(this.height) || this.height === 0 ? h(
    //   'div',
    //   { class: [TYPES[this.type], 'xl-hidden-popper'], ref: 'popper', style: this.contentStyle },
    //   h(Scroll, null, this.$slots.default())
    // ) : null
    )
  }
}
</script>

<style lang="less" scoped>
@gap:20px;
.xl-popper{
  position: absolute;
  z-index: 100;
  left:0;
  top:0;
  border-radius: 5px;
  box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
  >.arrow{
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
    transform: rotate(45deg);
  }
  >.xl-popper-content{
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}

.xl-popper-primary-style{
  padding:@gap/2 @gap/2 @gap/2 @gap/2;
  background-color: white;
}
.xl-popper-none-style{
  background-color: white;
}
// .xl-hidden-popper{
//   position: absolute;
//   box-sizing: border-box;
//   top:0;
//   overflow: hidden;
//   visibility: hidden;
//   z-index: -100;
// }

.tst-faded-enter-active,
.tst-faded-leave-active {
  opacity: 1;
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top;
}

.tst-faded-enter-from,
.tst-faded-leave-to {
  opacity: 0;
}

// .tst-scale-down-enter-active,
// .tst-scale-down-leave-active {
//   opacity: 1;
//   -webkit-transform: scaleY(1);
//   transform: scaleY(1);
//   -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   -webkit-transform-origin: center top;
//   transform-origin: center top;
// }

// .tst-scale-down-enter-from,
// .tst-scale-down-leave-to {
//   opacity: 0;
//   -webkit-transform: scaleY(0);
//   transform: scaleY(0);
// }

// .tst-scale-up-enter-active,
// .tst-scale-up-leave-active {
//   opacity: 1;
//   -webkit-transform: scaleY(1);
//   transform: scaleY(1);
//   -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   -webkit-transform-origin: center bottom;
//   transform-origin: center bottom;
// }

// .tst-scale-up-enter-from,
// .tst-scale-up-leave-to {
//   opacity: 0;
//   -webkit-transform: scaleY(0);
//   transform: scaleY(0);
// }

// .tst-scale-right-enter-active,
// .tst-scale-right-leave-active {
//   opacity: 1;
//   -webkit-transform: scaleX(1);
//   transform: scaleX(1);
//   -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   -webkit-transform-origin: left center ;
//   transform-origin: left center ;
// }

// .tst-scale-right-enter-from,
// .tst-scale-right-leave-to {
//   opacity: 0;
//   -webkit-transform: scaleX(0);
//   transform: scaleX(0);
// }

// .tst-scale-left-enter-active,
// .tst-scale-left-leave-active {
//   opacity: 1;
//   -webkit-transform: scaleX(1);
//   transform: scaleX(1);
//   -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
//   -webkit-transform-origin: right center ;
//   transform-origin: right center ;
// }

// .tst-scale-left-enter-from,
// .tst-scale-left-leave-to {
//   opacity: 0;
//   -webkit-transform: scaleX(0);
//   transform: scaleX(0);
// }
</style>
