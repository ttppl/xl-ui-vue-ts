<template>
  <Teleport to="body" :disabled="!toBody">
    <Transition :name="transition">
      <div v-show="model" ref="popper" :class="classC" class="xl-popper" :style="popperStyle"
           @mouseenter="mouseenter" @mousemove="mousemove">
        <div v-show="showArrow" ref="arrow" class="arrow" />
        <Scroll ref="scroll" height="1" width="1" :max-width="maxWidth" :max-height="maxHeight" :style="scrollStyle" class="scroll">
          <slot />
        </Scroll>
      </div>
    </Transition>
  </Teleport>
</template>

<script type="text/ecmascript-6">
import { ref, inject, computed, watch, onMounted, nextTick } from 'vue'
import zIndexManager from '@/utils/zIndexManager'
import Scroll from '@/components/scroll/src/Scroll'
import size, { computeSize } from '@/mixins/size'
import { createPopper } from '@popperjs/core'
import { isPercent, isZero } from '@/utils/common'
import ResizeDetector from '@/utils/ResizeDetector'
export default {
  name: 'XlPropper',
  components: {
    Scroll
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

    minWidth: {
      type: [Number, String],
      default: 0
    },

    minHeight: {
      type: [Number, String],
      default: 0
    },

    maxWidth: {
      type: [Number, String],
      default: 0
    },

    maxHeight: {
      type: [Number, String],
      default: 0
    },

    position: {
      type: String,
      default: 'bottom'
    },

    popStyle: {
      type: Object,
      default: null
    },

    class: {
      type: [String, Object, Array],
      default: null
    },

    style: {
      type: [Object],
      default: null
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
      default: 'tst-faded'
    },

    transform: {
      type: Boolean,
      default: true
    }

  },

  emits: ['update:modelValue', 'close', 'mouseenter', 'mouseleave'],

  setup (props, ctx) {
    const model = computed({
      get () {
        return props.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    })
    const popper = ref(null)// popper-el
    const arrow = ref(null)// arrow-el
    const scroll = ref(null)// scroll-el
    const contains = (target) => { // teleport导致$el失效，需重写contains方法
      return popper.value?.contains(target)
    }
    const XlPopperTrigger = inject('XlPopperTrigger')
    const xlPopperTrigger = computed(() => { // 兼容传递普通对象和compute对象
      return XlPopperTrigger.value || XlPopperTrigger
    })
    let popperInstance
    const initPopper = () => { // 初始化popper
      if (!popperInstance) {
        popperInstance = createPopper(xlPopperTrigger.value.dom(), popper.value,
          {
            placement: props.position,
            strategy: 'absolute',
            modifiers: [{
              name: 'arrow',
              enabled: props.showArrow,
              options: {
                element: arrow.value,
                padding: 10
              }
            }, {
              name: 'offset',
              options: {
                offset: () => {
                  return [parseFloat(props.offset), 10 + parseFloat(props.offsetParent)]
                }
              }
            },
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: props.transform,
                adaptive: props.transform
              }
            }, {
              name: 'preventOverflow',
              options: {
                mainAxis: true,
                padding: 0
                // mainAxis: boolean, // true
                // altAxis: boolean, // false
                // padding: Padding, // 0
                // boundary: Boundary, // "clippingParents"
                // altBoundary: boolean, // 基于上下文,默认false
                // rootBoundary: RootBoundary, // "viewport"
                // tether: boolean, // true
                // tetherOffset: TetherOffset, // 0
              }
            }
            // ,{
            //   name: 'transition',
            //   phase: 'beforeRead',
            //   enabled: true,
            //   fn ({ state }) {
            //     console.log(state)
            //     if (state.placement === 'top') {
            //       transitionLocal.value = 'scale-up'
            //     }
            //   }
            // }
            ]
          })
      }
      popperInstance.update()
    }

    let resizer
    // 检测resize事件
    const resizeDetector = new ResizeDetector({ console: false })
    watch(() => props.modelValue, (nv) => { // 监听弹框
      if (nv) {
        initPopper()
        scroll.value.initScroll()// 初始化scroll
        if (!resizer) {
          nextTick().then(() => {
            try {
              resizer = resizeDetector.listenTo(popper.value, () => {
                popperInstance.update()
              })
            } catch (e) {
              // console.log(e)
            }
          })
        }
      }
    })
    onMounted(() => {
      initPopper()
    })

    // popper计算style
    const zIndex = zIndexManager.nextIndex()// 元素层级
    const popperStyle = computed(() => {
      const { widthC, heightC } = size(props)
      const style = props.style || {}
      if (!isZero(props.width)) { style.width = widthC.value }
      if (!isZero(props.height)) { style.height = heightC.value }
      if (isPercent(props.maxHeight)) {
        // delete style.height
        style.height = computeSize(1)
      }
      if (isPercent(props.maxWidth)) {
        // delete style.width
        style.width = computeSize(1)
      }
      if (!isZero(props.minWidth)) {
        style.minWidth = computeSize(props.minWidth)
      }
      if (!isZero(props.minHeight)) {
        style.minHeight = computeSize(props.minHeight)
      }
      style.zIndex = zIndex
      // style.padding = '20px'
      return style
    })

    const classC = computed(() => {
      const classes = [props.class]
      return classes
    })

    const scrollStyle = computed(() => {
      const style = { padding: '10px' }
      return Object.assign(style, props.popStyle)
    })

    const mouseenter = (e) => {
      ctx.emit('mouseenter', e)
    }

    const mouseleave = (e) => {
      ctx.emit('mouseleave', e)
    }

    return {
      model,
      popperStyle,
      classC,
      mouseenter,
      mouseleave,
      popper,
      scroll,
      contains,
      arrow,
      scrollStyle
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/transition.less';
.xl-popper{
  border-radius: 5px;
  background-color: white;
  border :1px solid #e4e7ed;
  box-sizing: border-box;
  box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
  height:auto;
  font-size: 0;//inline-block间隙问题
  .arrow{
    width:10px;
    height:10px;
    z-index: -100;
    position: absolute;
  }
  @placements: {
    top: bottom;
    bottom: top;
    left: right;
    right: left;
  }
  each(@placements,{
    &[data-popper-placement="@{key}"] > .arrow{
      @{value}: -5px;
      &:before{
        position: absolute;
        width: 10px;
        height: 10px;
        content: " ";
        border-left:1px solid #e4e7ed;
        border-top:1px solid #e4e7ed;
        transform: if((@key=top), rotate(-135deg), if((@key=bottom), rotate(45deg), if((@key=left), rotate(135deg), rotate(-45deg))));
        background: white;
        box-sizing: border-box;
      }
    }
  })
  >.scroll{
    position: relative;
  }
}
</style>
