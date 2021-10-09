<template>
  <div class="XlChooseGroup">
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
// import { reactive, defineComponent } from 'vue'
import { defineComponent, computed, provide } from 'vue'
export default defineComponent({
  name: 'XlChooseGroup',

  components: {
  },

  props: {
    modelValue: {
      type: [String, Array],
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

    type: {
      type: String,
      default: 'radio'
    }
  },

  emits: ['update:modelValue'],

  setup (props, ctx) {
    const update = value => {
      ctx.emit('update:modelValue', value)
    }

    const genID = (length) => {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    }

    const modelValue = computed({
      get () {
        return props.modelValue
      },
      set (val) {
        update(val)
      }
    })

    provide('chooseGroup', {
      name: 'chooseGroup',
      modelValue,
      iconType: props.iconType,
      iconStyleType: props.iconStyleType,
      lightStyle: props.lightStyle,
      type: props.type,
      serialID: genID()
    })

    // watch(() => props.modelValue, val => {
    //   console.log(val)
    // })
  }
})
</script>
