<template>
  <div class="XlChoose">
    <input :id="serialID" ref="choose" v-model="model" hidden :checked="isCheck" :value="value" :type="inputType" :name="nameC" @click="change">
    <label v-if="labelPosition=='left'" :for="serialID" @click="labelClicked">
      <div class="label-left pointer">
        <slot>{{ label||value }}</slot>
      </div>
      <div :class="iconClass" class="check-icon pointer"><div class="icon-inner" :class="iconInnerClass" /></div>
    </label>
    <label v-if="labelPosition=='right'" :for="serialID" @click="labelClicked">
      <div :class="iconClass" class="check-icon pointer"><div class="icon-inner" :class="iconInnerClass" /></div>
      <div class="label-right pointer"><slot>{{ label||value }}</slot></div>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
import { themeType } from '../../../types'
export default {
  name: 'XlChoose',

  inject: ['chooseGroup'],

  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },

    label: {
      type: String,
      default: ''
    },

    iconType: {
      type: String,
      default: 'checkbox'
    },

    iconStyleType: {
      type: String,
      default: 'primary'
    },

    lightStyle: Boolean,

    name: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: 'value'
    },

    type: {
      type: String,
      default: 'radio'
    },

    modelValue: {
      type: [String, Array],
      default: ''
    }
  },

  emits: ['update:modelValue', 'label-click'],
  data () {
    return {
      serialID: ''// 默认生成的name，唯一标识
    }
  },

  computed: {

    isGroup () {
      return this.chooseGroup
    },

    model: {
      get () {
        return this.isGroup ? this.chooseGroup.modelValue.value : this.modelValue
      },

      set (val) {
        this.isGroup ? this.chooseGroup.modelValue.value = val : this.$emit('update:modelValue', val)
        this.$refs.choose && (this.$refs.choose.checked = this.isCheck)
      }
    },

    inputType () {
      return this.isGroup ? this.chooseGroup.type : this.type
    },

    isCheck () {
      if ((this.isGroup ? this.chooseGroup.type : this.type) === 'checkbox') {
        return Array.isArray(this.model) ? this.model.includes(this.value) : this.model === this.value
      }
      return this.model === this.value
    },

    checkIcon () {
      return this.isGroup ? this.chooseGroup.iconType : this.iconType
    },

    iconStyle () {
      return this.chooseGroup.iconStyleType || this.iconStyleType
    },

    light () {
      return this.chooseGroup.lightStyle || this.lightStyle
    },

    iconClass () {
      const checkbox = []
      if (this.checkIcon === 'checkbox') {
        checkbox.push('checkbox-icon')
        checkbox.push(this.isCheck ? themeType(this.iconStyle, 'bd') : themeType('notice', 'bd'))
        checkbox.push(themeType(this.iconStyle, 'bd-hover'))
      }
      const radio = []
      if (this.checkIcon === 'radio') {
        radio.push('radio-icon')
        radio.push(this.isCheck ? themeType(this.iconStyle, 'bd') : themeType('notice', 'bd'))
        radio.push(themeType(this.iconStyle, 'bd-hover'))
      }
      let theme = ''
      if (this.isCheck) {
        if (this.checkIcon === 'checkbox') { theme = themeType(this.iconStyle, 'bg', this.light) }
        if (this.checkIcon === 'radio') { theme = themeType(this.iconStyle, 'bg-bd', this.light) }
      }
      return [...checkbox, ...radio, theme]
    },

    iconInnerClass () {
      let theme = ''
      if (this.checkIcon === 'radio') { theme = themeType(this.iconStyle, 'bg', this.light) }
      return theme
    },

    nameC () {
      return this.name || (this.isGroup ? this.chooseGroup.serialID : this.serialID)
    }
  },

  watch: {
  },

  created () {
    this.serialID = this.genID()
    if (this.inputType === 'radio') {
      this.model = Array.isArray(this.model) ? (this.model[0] || '') : this.model
    }
    if (this.inputType === 'checkbox') {
      this.model = Array.isArray(this.model) ? this.model : [this.model]
    }
  },

  methods: {
    genID (length) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },

    change () {
      if (this.model === this.value) {
        this.model = ''
      }
    },

    labelClicked (e) {
      this.$emit('label-click', e)
    }
  }
}
</script>

<style lang="less">
@gap:20px;
.XlChoose{
  position: relative;
  label{
    white-space:nowrap;
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
    border-width: 0.5px;
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
    border-width: 0.5px;
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
</style>
