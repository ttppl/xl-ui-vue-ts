<template>
  <transition :name="`tst-fade${'-'+position}`" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :id="id" role="alert"
         class="message-box"
         :class="classes"
         :style="customStyle"
         :show-close="!autoClose||showClose"
         :show-icon="icon!==false"
         :position="position"
         @mouseenter="clearTimer" @mouseleave="startTimer"
    >
      <Icon v-if="icon!==false" class="message-icon" :type="type" :icon="iconType" />
      <slot>
        <p v-if="!html" :center="center" class="message-content">{{ message }}</p>
        <p v-else class="message-content" :center="center" v-html="message" />
      </slot>
      <Icon v-if="!autoClose||showClose" :type="type" icon="close" class="message-close-btn" @click.stop="close" />
    </div>
  </transition>
</template>

<script lang="javascript">
// eslint-disable-next-line no-unused-vars
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { EVENT_CODE } from '@/utils'
import { on, off } from '@/utils/dom'
import Icon from '@/components/icon'
import { isBoolean } from '@/utils/common'
import { themeType } from '@/types'
const IconMap = {
  success: 'emj-happy',
  primary: 'emj-smile',
  warn: 'emj-none',
  error: 'emj-fail',
  notice: 'emj-smile'
}
export default defineComponent({
  name: 'XlMessage',
  components: { Icon },
  props: {
    message: { type: [String, Object], default: '' },
    position: { type: String, default: 'center' },
    type: { type: String, default: 'primary' },
    showClose: { type: Boolean, default: false },
    icon: { type: [String, Boolean], default: true },
    duration: { type: Number, default: 3000 },
    id: { type: String, default: '' },
    center: { type: Boolean, default: false },
    html: { type: Boolean, default: false },
    onClose: { type: Function, required: true },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 }
  },

  emits: ['destroy'],
  setup (props) {
    const classes = computed(() => {
      const bg = themeType(props.type, 'bg', true)
      return [bg]
      // return [
      //   props.type && !props.iconClass ? `sp-message--${props.type}` : '',
      //   props.center ? 'is-center' : '',
      //   props.showClose ? 'is-closable' : '', props.customClass]
    })
    const iconType = computed(() => {
      return isBoolean(props.icon) ? IconMap[props.type] : props.icon
    })
    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex
      }
    })

    const visible = ref(false)
    let timer = null
    const autoClose = computed(() => {
      return parseFloat(props.duration) !== 0
    })
    function startTimer () {
      if (!autoClose.value) return
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close()
          }
        }, props.duration)
      }
    }

    function clearTimer () {
      if (!autoClose.value) return
      clearTimeout(timer)
      timer = null
    }

    function close () {
      visible.value = false
    }

    function keydown (code) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        if (visible.value) {
          close()
        }
      } else {
        startTimer() // resume timer
      }
    }

    onMounted(() => {
      startTimer()
      visible.value = true
      on(document, 'keydown', keydown)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', keydown)
    })

    return {
      iconType,

      classes,
      // typeClass,
      customStyle,
      visible,
      autoClose,

      close,
      clearTimer,
      startTimer
    }
  }
})
</script>

<style scoped lang="less">
.tst-fade-center-enter-from,
.tst-fade-center-leave-to {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%) !important;
  transform: translate(-50%, -100%) !important;
}
.tst-fade-enter-from,
.tst-fade-leave-to {
  opacity: 0;
  -webkit-transform: translate(-50%, -100%);
  transform: translate(-50%, -100%);
}
.tst-fade-left-enter-from,
.tst-fade-left-leave-to {
  opacity: 0;
  transform: translate(-100%,-100%);
}
.tst-fade-right-enter-from,
.tst-fade-right-leave-to {
  opacity: 0;
  transform: translate(100%,-100%);
}

.message-box {
  min-width: 380px;
  min-height: 40px;
  max-width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #EBEEF5;
  position: fixed;
  -webkit-transition: opacity .3s, top .4s, -webkit-transform .4s;
  transition: opacity .3s, top .4s, -webkit-transform .4s;
  transition: opacity .3s, transform .4s, top .4s;
  transition: opacity .3s, transform .4s, top .4s, -webkit-transform .4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  top: 20px;
  &[position="center"]{
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  &[position="left"]{
    left:20px;
  }
  &[position="right"]{
    right:20px;
  }
  .message-icon{
    margin-right: 10px;
    position: absolute;
    top: 13px;
    left: 15px;
  }
  &[show-close="true"] .message-content{
    padding-right: 20px;
  }
  &[show-icon="true"] .message-content{
    padding-left: 25px;
  }
  .message-content{
    font-size: 16px;
    line-height: 1;
    // word-wrap:break-word;
    word-break: break-all;
    margin:0;
    &[center="true"]{
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
  .message-close-btn{
    opacity: 0.5;
    position: absolute;
    top: 13px;
    right: 15px;
    // -webkit-transform: translateY(-50%);
    // transform: translateY(-50%);
    cursor: pointer;
    font-size: 16px;
    &:hover{
      transition: transform .3s;
      transform: scale(1.3);
    }
  }
}
</style>
