<template>
  <div ref="xlchoose" class="XlChoose" :checked="isCheck" :show-icon="attrs.showIcon" :class="{'inline-choose':attrs.inline}">
    <input :id="serialID" ref="choose" v-model="model" hidden :checked="isCheck"
           :value="value" :type="attrs.type" :name="nameC" @click="change">
    <label v-if="attrs.labelPosition=='left'" class="label" :disabled="isDisable" :for="serialID" @click="labelClicked">
      <slot><div class="label-left pointer">{{ label||value }}</div></slot>
      <div v-if="attrs.showIcon" :class="iconClass" class="check-icon-right pointer"><div class="icon-inner" :class="iconInnerClass" /></div>
    </label>
    <label v-if="attrs.labelPosition=='right'" class="label" :disabled="isDisable" :for="serialID" @click="labelClicked">
      <div v-if="attrs.showIcon" :class="iconClass" class="check-icon-left pointer"><div class="icon-inner" :class="iconInnerClass" /></div>
      <slot><div class="label-right pointer">{{ label||value }}</div></slot>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
import { computed, ref } from '@vue/reactivity'
import { themeType } from '../../../types'
import { inject, nextTick, onBeforeMount, onMounted, watch } from '@vue/runtime-core'
import { isFunction } from '@/utils/common'
import props from './props'
import useProps from './useProps'
export default {
  name: 'XlChoose',

  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    name: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number, Boolean],
      default: ''
    },

    checked: Boolean,

    disabled: Boolean,

    ...props
  },

  emits: ['update:modelValue', 'label-click', 'change'],
  setup (props, ctx) {
    const chooseGroup = inject('chooseGroup')
    const { isGroup, attrs } = useProps(chooseGroup, props)
    const model = computed({
      get () {
        const val = isGroup.value ? chooseGroup.model : props.modelValue
        if (attrs.value.type === 'checkbox') {
          return Array.isArray(val) ? val : (val ? [val] : [])
        } else {
          return Array.isArray(val) ? val[0] : val
        }
      },

      set (val) {
        console.log(val)
        isGroup.value ? chooseGroup.update(val) : ctx.emit('update:modelValue', val)
      }
    })
    watch(() => model.value, (nv) => { // change事件
      ctx.emit('change', nv)
      isGroup.value && chooseGroup.change(nv)
    })
    onMounted(() => {
      if (props.checked) {
        if (attrs.value.type === 'checkbox' && Array.isArray(model.value) && !model.value.includes(props.value)) {
          model.value.push(props.value)
          // 重新赋值model触发set函数
          const t = model.value
          model.value = t
        } else { model.value = props.value }
      }
    })
    const isCheck = computed(() => {
      // if (props.checked) return true
      if (attrs.value.type === 'checkbox' && Array.isArray(model.value)) {
        return model.value.includes(props.value)
      } else { return model.value === props.value }
    })
    const choose = ref(null)
    // 监听类型的改变
    const xlchoose = ref(null)
    watch(() => isCheck.value, (nv) => {
      if (nv) {
        nextTick().then(() => {
          choose.value.checked = true
          xlchoose.value.setAttribute('checked', true)
        })
      } else {
        nextTick().then(() => {
          xlchoose.value.removeAttribute('checked')
        })
      }
    }, { immediate: true })

    // 生成唯一标识
    function genID (length) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    }
    const serialID = ref(genID())// 默认生成的name，唯一标识

    // // 初始化model值
    // if (attrs.value.type === 'radio') {
    //   model.value = Array.isArray(model.value) ? (model.value[0] || '') : model.value
    // }
    // if (attrs.value.type === 'checkbox') {
    //   model.value = Array.isArray(model.value) ? model.value : model.value ? [model.value] : []
    // }

    const iconClass = computed(() => {
      const checkbox = []
      if (attrs.value.iconType === 'checkbox') {
        checkbox.push('checkbox-icon')
        checkbox.push(isCheck.value ? themeType(attrs.value.iconStyleType, 'bd') : themeType('notice', 'bd'))
        if (!isDisable.value) { checkbox.push(themeType(attrs.value.iconStyleType, 'bd-hover')) }
      }
      const radio = []
      if (attrs.value.iconType === 'radio') {
        radio.push('radio-icon')
        radio.push(isCheck.value ? themeType(attrs.value.iconStyleType, 'bd') : themeType('notice', 'bd'))
        if (!isDisable.value) { radio.push(themeType(attrs.value.iconStyleType, 'bd-hover')) }
      }
      let theme = ''
      if (isCheck.value) {
        if (attrs.value.iconType === 'checkbox') { theme = themeType(attrs.value.iconStyleType, 'bg', attrs.value.lightStyle) }
        if (attrs.value.iconType === 'radio') { theme = themeType(attrs.value.iconStyleType, 'bg-bd', attrs.value.lightStyle) }
      }
      return [...checkbox, ...radio, theme]
    })

    const iconInnerClass = computed(() => {
      let theme = ''
      if (attrs.value.iconType === 'radio') { theme = themeType(attrs.value.iconStyleType, 'bg', attrs.value.lightStyle) }
      return theme
    })

    const nameC = computed(() => {
      return props.name || (isGroup.value ? chooseGroup.serialID : serialID.value)
    })

    function change () { // radio可取消
      if (attrs.value.enableCancle && attrs.value.type === 'radio' && model.value === props.value) {
        if (isFunction(attrs.value.enableCancle)) {
          model.value = props.enableCancle()
        } else { model.value = '' }
      }
    }

    function labelClicked (e) {
      if (isDisable.value) { // 禁用不能被选择
        e.preventDefault()
      }
      ctx.emit('label-click', { model: model.value, value: props.value, event: e })
      isGroup.value && chooseGroup.labelClicked({ model: model.value, value: props.value, event: e })
    }

    const isDisable = computed(() => {
      if (props.disabled) {
        return true
      } else if (!isCheck.value && (attrs.value.type === 'checkbox' && attrs.value.max >= 0 && model.value.length >= attrs.value.max)) {
        return true
      } else {
        return false
      }
    })
    return {
      serialID,
      choose,
      xlchoose,
      model,
      nameC,
      attrs,
      iconClass,
      iconInnerClass,
      change,
      labelClicked,
      isCheck,
      isDisable
    }
  }
}
</script>

<style lang="less" scoped>
@gap:20px;
.XlChoose{
  position: relative;
  &[show-icon="true"]{
    margin: 10px 0;
  }
  label{
    cursor: pointer;
    white-space:nowrap;
    &[disabled="true"]{
      cursor: not-allowed;
      opacity: 0.5;
    }
    >*{
      display: inline-block;
      vertical-align: middle;
      text-overflow:ellipsis;
    }
  }
  .label-right{
    margin-left: @gap/2;
  }
  .label-left{
    margin-right: @gap/2;
  }
  .checkbox-icon{
    display: inline-block;
    width: 15px;
    height:15px;
    border-width: 1px;
    border-style: solid;
    position: relative;
  }
  input:checked+label>.checkbox-icon>.icon-inner {
    position: absolute;
    top: -2px;
    left: 4px;
    content: "";
    width: 5px;
    height: 12px;
    border: 3px solid white;
    border-top: none;
    border-left: none;
    transform: rotate(47deg);
  }
  .radio-icon{
    display: inline-block;
    @size:15px;
    width: @size;
    height:@size;
    border-radius: @size;
    border-width: 1px;
    border-style: solid;
    position: relative;

  }
  input:checked+label>.radio-icon>.icon-inner {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    @innersize:10px;
    width: @innersize;
    height: @innersize;
    border-radius: @innersize;
  }
}
.inline-choose{
  display: inline-block;
  &[show-icon="true"]{
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
