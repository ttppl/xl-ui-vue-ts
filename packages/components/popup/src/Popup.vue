<template>
  <teleport to="body">
    <transition :name="transition">
      <div v-show="showPopup" ref="content" v-resize="{disable:type!=='dialog'}" class="xl-popup-content" :style="style" :class="classes">
        <!-- <svg v-if="showClose" t="1629881617199" @click="showPopup=false" :style="{zIndex:zIndex+2}" class="xl-close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2735" width="20" height="20"><path d="M937.281581 799.254764 937.281581 799.254764 937.281581 799.254764 937.281581 799.254764zM1002.320395 510.91602c0-270.99506-220.409315-491.404375-491.404375-491.404375-270.99506 0-491.404375 220.409315-491.404375 491.404375 0 270.99506 220.409315 491.404375 491.404375 491.404375C781.91108 1002.320395 1002.320395 781.91108 1002.320395 510.91602M510.91602 931.500353c-231.971771 0-421.306987-188.612562-421.306987-421.306987 0-231.971771 188.612562-421.306987 421.306987-421.306987 231.971771 0 421.306987 188.612562 421.306987 421.306987C931.500353 742.887791 742.887791 931.500353 510.91602 931.500353M712.536344 664.841214l-151.757234-152.479887 151.757234-150.311927c13.730416-13.730416 13.730416-36.132675 0-49.863091-13.730416-13.730416-36.132675-13.730416-49.863091 0L510.91602 462.498236 360.604093 312.186309c-13.730416-13.730416-36.132675-13.730416-49.863091 0-13.730416 13.730416-13.730416 36.132675 0 49.863091l149.589273 150.311927L310.018349 661.227946c-13.730416 13.730416-13.730416 36.132675 0 49.863091 7.226535 7.226535 15.898377 10.117149 24.570219 10.117149 8.671842 0 18.066337-3.613267 24.570219-10.117149l151.03458-149.589273 152.479887 152.479887c6.503881 6.503881 15.898377 10.117149 24.570219 10.117149 8.671842 0 18.066337-3.613267 24.570219-10.117149C725.544107 700.973888 725.544107 678.57163 712.536344 664.841214" p-id="2736" fill="#8a8a8a"></path></svg> -->
        <svg v-if="showClose" :style="{zIndex:zIndex+2}" class="xl-close-icon" t="1630307589611" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4768" width="20" height="20" @click="showPopup=false"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="4769" :fill="iconColor" /></svg>
        <div v-drag="{childLevel:1,disable:type!=='dialog'}" class="xl-popup-content-title"><slot name="title"><p v-if="title">{{ title }}</p></slot></div>
        <Scroll :show-scroll="showScroll" class="xl-popup-content-inner">
          <slot />
        </Scroll>
        <div class="xl-popup-content-footer">
          <slot name="footer">
            <div v-if="type=='dialog'" class="xl-popup-footer-buttons">
              <Button type="notice" plain light-style @click="showPopup=false">Cancle</Button>
              <Button type="primary" light-style>Confirm</Button>
            </div>
          </slot>
        </div>
      </div>
    </transition>
    <div v-show="showPopup" class="xl-popup-mask" :style="{zIndex:zIndex}" :class="{'xl-mask':mask}" @click.capture="clickOutside" />
  </teleport>
</template>

<script type="text/ecmascript-6">
import zIndexManager from '../../../utils/zIndexManager'
import Scroll from '../../scroll'
import whCompute from '../../../mixins/whCompute'
import Button from '../../button'
import dragHandler from '../../../utils/dragHandler'
import resizeHandler from '../../../utils/resizeHandler'
import { getElementSize } from '../../../utils/dom'
import { getWindowSize } from '../../../utils/utils'
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
    Button
  },

  directives: { drag: dragHandler, resize: resizeHandler },

  mixins: [whCompute],

  props: {
    modelValue: Boolean,
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

    showScroll: {
      type: Boolean,
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
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      zIndex: 100,
      size: {},
      windowSize: {}
    }
  },

  computed: {
    showPopup: {
      get () {
        return this.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    },

    transition () {
      if (this.type === 'dialog') {
        return 'tst-popup-scale-center'
      }
      switch (this.direction) {
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
    },

    classes () {
      let classes = this.popClass || []
      if (typeof classes === 'string') {
        classes = [classes]
      }

      const posClass = {
        'xl-pos-center': this.direction === 'center',
        'xl-pos-left': this.direction === 'left',
        'xl-pos-right': this.direction === 'right',
        'xl-pos-top': this.direction === 'top',
        'xl-pos-bottom': this.direction === 'bottom',
        'xl-dialog': this.type === 'dialog'
      }
      return [posClass, ...classes]
    },

    style () {
      const style = {}
      style.zIndex = this.zIndex + 1
      if (this.type === 'dialog') {
        return style
      }
      if (!style.width && this.width !== 0) {
        style.width = this.widthC
      }
      if (!style.height && this.height !== 0) {
        style.height = this.heightC
      }
      if (this.direction === 'center') {
        style.left = `${this.windowSize.width / 2 - this.size.width / 2}px`
        style.top = `${this.windowSize.height / 2 - this.size.height / 2}px`
      }
      if (this.direction === 'left') {
        style.left = '0px'
        style.top = `${this.windowSize.height / 2 - this.size.height / 2}px`
      }
      if (this.direction === 'right') {
        style.right = '0px'
        style.top = `${this.windowSize.height / 2 - this.size.height / 2}px`
      }
      if (this.direction === 'top') {
        style.left = `${this.windowSize.width / 2 - this.size.width / 2}px`
        style.top = '0px'
      }
      if (this.direction === 'bottom') {
        style.left = `${this.windowSize.width / 2 - this.size.width / 2}px`
        style.bottom = '0px'
      }
      return style
    },

    iconColor () {
      return colors[this.closeIcon] || '#bfbfbf'
    }
  },

  watch: {
    modelValue (nv) { // 控制scroll滑动
      if (nv) {
        if (this.lockScreen) {
          if (document.body.scrollHeight > window.innerHeight) {
            document.body.style.left = '0'
            document.body.style.right = `${window.innerWidth - document.body.clientWidth}px`
            // document.getElementById('app').style.paddingRight = '100px'
          }
          document.body.style.overflow = 'hidden'
        }
        if (this.closeOnPressEscape) { document.addEventListener('keydown', this.onKeyPress) }
      } else {
        document.body.style.right = '0'
        document.body.style.overflow = 'auto'
        if (this.closeOnPressEscape) { document.removeEventListener('keydown', this.onKeyPress) }
      }
    }
  },

  created () {
    this.zIndex = zIndexManager.nextIndex()// 初始化层级，mask
    zIndexManager.nextIndex()// popup层级
    zIndexManager.nextIndex()// close图标层级
    // this.getWindowSize()
    this.windowSize = getWindowSize()
  },

  mounted () {
    this.size = getElementSize(this.$refs.content)
    window.addEventListener('resize', this.getWindowSize)
  },

  unmounted () {
    window.removeEventListener('resize', this.getWindowSize)
  },

  methods: {
    getWindowSize () {
      this.windowSize = getWindowSize()
    },

    onKeyPress (e) {
      console.log('escape')
      if (!this.closeOnPressEscape) return
      if (e.code === 'Escape') {
        e.stopPropagation()
        this.closePop()
      }
    },

    closePop () {
      this.showPopup = false
    },

    clickOutside (e) {
      e.stopPropagation()
      if (this.closeOnClickMask) {
        this.closePop()
      }
    }
  }
}
</script>

<style lang="less">
// @import '../../styles/transition.less';
.xl-mask{
  width: 100%;
  height: 100%;
  background:rgba(0, 0, 0, 0.4);
}
.xl-popup-mask{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
}
.xl-popup-content{
  position: fixed;
  min-width: 20%;
  min-height: 20%;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  .xl-popup-content-inner{
    padding : 0 8px;
  }
  .xl-popup-content-title{
    font-size: 18px;
    font-family: Arial;
    font-weight: 700;
    color: black;
    text-align: center;
  }
  .xl-popup-content-footer{
    padding: 20px 0;
    .xl-popup-footer-buttons{
      -webkit-display:flex;
      -ms-display:flex;
      display:flex;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      -ms-justify-content: space-around;
    }
  }

  overflow: hidden;
  >.xl-close-icon{
    cursor: pointer;
    position: absolute;
    top:3px;
    right:5px;
  }
  >.content-default{
    background-color: white;
  }

}

.xl-pos-left{
  height:100%;
  width: 30%;
  min-width: 20%;
}
.xl-pos-right{
  height:100%;
  width: 30%;
  min-width: 20%;
}
.xl-pos-top{
  width:100%;
  height:30%;
  min-height: 20%;
}
.xl-pos-bottom{
  width:100%;
  height:30%;
  min-height: 20%;
}
.xl-dialog{
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  min-width: 400px;
  min-height: 200px;
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 0px 4px 27px 0px rgba(0, 0, 0, 0.25);
}

.tst-popup-scale-center-enter-active,
.tst-popup-scale-center-leave-active {
  opacity: 1;
  -webkit-transform: translate(-50%,-50%) scale(1,1) !important;
  transform: translate(-50%,-50%) scale(1,1) !important;
  -webkit-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}

.tst-popup-scale-center-enter-from,
.tst-popup-scale-center-leave-to {
  opacity: 0;
  -webkit-transform: translate(-50%,-50%) scale(0,0) !important;
  transform: translate(-50%,-50%) scale(0,0) !important;
}
</style>
