<template>
  <div class="XlChooseGroup" :class="{'inline-choose-group':inline}">
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
// import { reactive, defineComponent } from 'vue'
import { isNull } from '@/utils/common'
import { getToRef } from '@/utils/vmUtils'
import { defineComponent, computed, provide, ref, reactive, toRef, toRefs, watch } from 'vue'
import props from './props'
export default defineComponent({
  name: 'XlChooseGroup',

  components: {
  },

  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
      default: null
    },

    ...props
  },

  emits: ['update:modelValue', 'label-click', 'change'],

  setup (props, ctx) {
    const genID = (length) => {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    }
    const localValue = ref('')
    const model = computed({
      get () {
        return isNull(props.modelValue) ? localValue.value : props.modelValue
      },
      set (val) {
        if (isNull(props.modelValue)) {
          localValue.value = val
        } else { ctx.emit('update:modelValue', val) }
      }
    })
    function update (value) {
      model.value = value
    }
    function labelClicked (args) {
      ctx.emit('label-click', args)
    }
    function change (nv) {
      ctx.emit('change', nv)
    }
    provide('chooseGroup', reactive({
      name: 'chooseGroup',
      model,
      update,
      change,
      labelClicked,
      ...toRefs(props),
      // ...getToRef(props, 'iconType', 'iconStyleType', 'lightStyle', 'type', 'labelPosition', 'enableCancle', 'inline'),
      serialID: genID()
    }))

    // watch(() => props.modelValue, val => {
    //   console.log(val)
    // })
  }
})
</script>

<style scoped lang="less">
.inline-choose-group{
  display: inline-block;
}
</style>
