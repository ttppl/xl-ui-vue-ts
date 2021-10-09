<template>
  <transition name="sp-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :id="id" role="alert"
         :class="classes"
         :style="customStyle"
         @mouseenter="clearTimer" @mouseleave="startTimer"
    >
      <i v-if="type || iconClass" :class="[typeClass, iconClass]" />
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="sp-message__content">{{ message }}</p>
        <p v-else class="sp-message__content" v-html="message" />
      </slot>
      <svg v-if="showClose" t="1628760798220" class="icon sp-message__closeBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2029" width="20" height="20" @click.stop="close"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128L512.128 467.904l-263.04-263.84c-12.448-12.48-32.704-12.544-45.248-0.064-12.512 12.48-12.544 32.736-0.064 45.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248a31.937 31.937 0 0 0 22.688 9.44c8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408a31.94 31.94 0 0 0 22.592-9.344c12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2030" fill="#bfbfbf" /></svg>
    </div>
  </transition>
</template>

<script lang="javascript">
// eslint-disable-next-line no-unused-vars
import { defineComponent, computed, ref, PropType, onMounted, onBeforeUnmount } from 'vue'
import { EVENT_CODE } from '@/ts/utils'
import { on, off } from '@/utils/dom'
const TypeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default defineComponent({
  name: 'ElMessage',
  props: {
    customClass: { type: String, default: '' },
    center: { type: Boolean, default: false },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 3000 },
    iconClass: { type: String, default: '' },
    id: { type: String, default: '' },
    message: {
      type: [String, Object],
      default: ''
    },

    onClose: {
      type: Function,
      required: true
    },

    showClose: { type: Boolean, default: false },
    type: { type: String, default: 'info' },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 }
  },

  emits: ['destroy'],
  setup (props) {
    const classes = computed(() => {
      return ['sp-message',
        props.type && !props.iconClass ? `sp-message--${props.type}` : '',
        props.center ? 'is-center' : '',
        props.showClose ? 'is-closable' : '', props.customClass]
    })

    const typeClass = computed(() => {
      const type = props.type
      return type && TypeMap[type]
        ? `sp-message__icon el-icon-${TypeMap[type]}`
        : ''
    })
    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex
      }
    })

    const visible = ref(false)
    let timer = null

    function startTimer () {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close()
          }
        }, props.duration)
      }
    }

    function clearTimer () {
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
      classes,
      typeClass,
      customStyle,
      visible,

      close,
      clearTimer,
      startTimer
    }
  }
})
</script>

<style scoped lang="less">
.sp-message {
    min-width: 380px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: #EBEEF5;
    position: fixed;
    left: 50%;
    top: 20px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background-color: #edf2fc;
    -webkit-transition: opacity .3s, top .4s, -webkit-transform .4s;
    transition: opacity .3s, top .4s, -webkit-transform .4s;
    transition: opacity .3s, transform .4s, top .4s;
    transition: opacity .3s, transform .4s, top .4s, -webkit-transform .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.sp-message.is-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center
}

.sp-message.is-closable .sp-message__content {
    padding-right: 16px
}

.sp-message p {
    margin: 0
}

.sp-message--info .sp-message__content {
    color: #909399
}

.sp-message--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8
}

.sp-message--success .sp-message__content {
    color: #67C23A
}

.sp-message--warning {
    background-color: #fdf6ec;
    border-color: #faecd8
}

.sp-message--warning .sp-message__content {
    color: #E6A23C
}

.sp-message--error {
    background-color: #fef0f0;
    border-color: #fde2e2
}

.sp-message--error .sp-message__content {
    color: #F56C6C
}

.sp-message__icon {
    margin-right: 10px
}

.sp-message__content {
    padding: 0;
    font-size: 14px;
    line-height: 1
}

.sp-message__content:focus {
    outline-width: 0
}

.sp-message__closeBtn {
    position: absolute;
    top: 50%;
    right: 15px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
    color: #C0C4CC;
    font-size: 16px
}

.sp-message__closeBtn:focus {
    outline-width: 0
}

.sp-message__closeBtn:hover {
    color: #909399
}

.sp-message .el-icon-success {
    color: #67C23A
}

.sp-message .el-icon-error {
    color: #F56C6C
}

.sp-message .el-icon-info {
    color: #909399
}

.sp-message .el-icon-warning {
    color: #E6A23C
}

.sp-message-fade-enter-from,
.sp-message-fade-leave-to {
    opacity: 0;
    -webkit-transform: translate(-50%, -100%);
    transform: translate(-50%, -100%)
}
</style>
