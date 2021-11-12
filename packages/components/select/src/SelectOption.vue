<template>
  <li class="XlSelectOption" :class="classes" @click.capture="selectOption">
    <slot>
      <div class="label">
        {{ label||value }}
      </div>
    </slot>
  </li>
</template>

<script type="ts">
import { computed } from '@vue/reactivity'
import { TYPES, themeType } from '../../../types'
import { inject } from '@vue/runtime-core'
export default {
  name: 'XlSelectOption',

  components: {
  },

  props: {
    value: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'notice'
    }
  },

  setup (props, ctx) {
    const Select = inject('XlSelect')
    const selected = computed(() => {
      return Array.isArray(Select.model) ? Select.model : Select.model ? [Select.model] : []
    })
    if (props.label) {
      Select.addLabel(props.value, props.label)
    }

    const checked = computed(() => {
      return selected.value.includes(props.value)
    })

    const classes = computed(() => {
      const type = TYPES.includes(props.type) ? props.type : TYPES[0]
      const types = [themeType(type, 'bg-hover', true), themeType('black'), checked.value ? themeType(type, 'bg', true) : themeType('white', 'bg')]
      return [...types]
    })
    const selectOption = () => {
      if (Select.multiSelect) {
        // e.stopPropagation()// 阻止冒泡导致弹框关闭
        const selectedTmp = selected.value
        if (checked.value) {
          // selectedTmp.splice(selectedTmp.indexOf(props.value), 1)
          selectedTmp.filter((s) => s !== props.value)
        } else {
          selectedTmp.push(props.value)
        }
        Select.update(selectedTmp)
        Select.afterSelect(selectedTmp, props.value)
      } else {
        Select.update(props.value)
        Select.afterSelect(props.value, props.value)
        Select.closeSelect()
      }
    }
    return {
      classes,
      selectOption
    }
  }
}
</script>

<style lang="less">
.XlSelectOption{
  list-style-type:none;
  cursor: default;
  text-align: center;
  >.label{
    padding: 10px 0 10px 0;
  }
}
</style>
