<template>
  <div ref="input" class="XlInput" :class="classes" :style="style">
    <input v-if="textType=='text'" v-model="model" :style="inputStyle" :class="inputClasses" type="text" :placeholder="placeholder"
           @change="change" @blur="blur" @focus="focusevent">
    <textarea v-else v-model="model" :class="inputClasses" :style="inputStyle" :rows="row" :placeholder="placeholder"
              @change="change" @blur="blur" @focus="focusevent" />
    <Icon v-show="showClear&&textType=='text'&&model" icon="close" :size="15" :type="type" class="clear-icon" @click="clear" />
  </div>
</template>

<script type="text/ecmascript-6">
import { InputThemeType } from '../../../types'
import { computed, ref } from '@vue/reactivity'
import { isNull } from '@/utils/common'
import size from '@/mixins/size'
import Icon from '@/components/icon/src/Icon.vue'
export default {
  name: 'XlInput',

  components: {
    Icon
  },

  props: {
    type: {
      type: String,
      default: 'ini'
    },

    textType: {
      type: String,
      default: 'text'
    },

    row: {
      type: String,
      default: '3'
    },

    height: {
      type: [Number, String],
      default: 50
    },

    modelValue: {
      type: String,
      default: null
    },

    placeholder: {
      type: String,
      default: ''
    },

    popClass: {
      type: [Array, String],
      default: () => {
        return []
      }
    },

    popStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    lightStyle: Boolean,
    showClear: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue', 'input', 'change', 'blur', 'focus', 'clear'],
  setup (props, ctx) {
    const localValue = ref('')
    const model = computed({
      get () {
        return isNull(props.modelValue) ? localValue.value : props.modelValue
      },

      set (val) {
        if (isNull(props.modelValue)) {
          localValue.value = val
        } else {
          ctx.emit('update:modelValue', val)
        }
        ctx.emit('input', val)
      }
    })

    const classes = computed(() => {
      const type = InputThemeType(props.type, props.lightStyle) || 'xl-none'
      return type
    })

    const inputClasses = computed(() => {
      const classes = [props.popClass]
      return classes
    })
    const input = ref(null)
    const { widthC, heightC } = size(props)
    const style = computed(() => {
      const style = { ...input.value?.style }
      // 宽高
      if (!style.width && props.width !== 0) { style.width = widthC.value }
      if (!style.borderRadius) { style.borderRadius = '4px' }
      // textarea不设置高度，由row定义
      if (!style.height && props.height !== 0 && props.textType.toLowerCase() !== 'textarea') { style.height = heightC.value }
      // if(props.lightStyle){style.opacity="0.5"}
      return style
    })

    const inputStyle = computed(() => {
      const style = { ...props.popStyle }
      if (!style.height && props.height !== 0 && props.textType.toLowerCase() !== 'textarea') { style.height = heightC.value }
      if (!style.fontSize && props.height > 1) { style.fontSize = `${props.height / 3}px` }
      return style
    })
    const change = () => {
      ctx.emit('change', model.value)
    }

    const blur = () => {
      ctx.emit('blur', model.value)
    }
    const focusevent = (e) => {
      ctx.emit('focus', e)
    }
    const clear = () => {
      ctx.emit('clear', model.value)
      model.value = ''
    }
    function focus () {
      input.value.focus()
    }
    return {
      model,
      classes,
      inputClasses,
      input,
      style,
      inputStyle,
      blur,
      change,
      focus,
      clear,
      focusevent
    }
  }
}
</script>

<style scoped lang="less">
.XlInput{
  display: inline-flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  position: relative;
  >input,textArea{
    border:none;
    outline: none;
    font-size: 18px;
    width: 100%;
    padding: 0 1em 0 1em;
    background-color: transparent;
    position: relative;
    z-index: 10;
  }
  >textArea{
    padding: 1em 1em 1em 1em;
    resize:none;
  }
  >.clear-icon{
    position: absolute;
    right:5px;
    z-index: 11;
    &:hover{
      transform: scale(1.5);
    }
  }
}
</style>
