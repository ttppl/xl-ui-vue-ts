<template>
  <li class="XlSelectOption" :class="classes" @click="select">
    <slot>
      <div class="label">
        {{ label }}
      </div>
    </slot>
  </li>
</template>

<script type="text/ecmascript-6">
import { TYPES, themeType } from '../../../types'
export default {
  name: 'XlSelectOption',

  components: {
  },

  inject: ['XlSelect'],

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

  data () {
    return {
    }
  },

  computed: {
    multiSelect () {
      return this.xlSelect.multiSelect
    },

    model () {
      return this.xlSelect.model
    },

    checked () {
      const selected = this.model || []
      return Array.isArray(selected) ? selected.indexOf(this.value) > -1 : selected === this.value
    },

    classes () {
      const type = TYPES.includes(this.type) ? this.type : TYPES[0]
      const types = [themeType(type, 'bg-hover', true), themeType('black'), this.checked ? themeType(type, 'bg', true) : themeType('white', 'bg')]
      return [...types]
      // return [types[this.type], types[this.type + (this.checked ? 'Checked' : '')]]
    },

    xlSelect () {
      return this.XlSelect.value || this.XlSelect
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    select (e) {
      if (this.xlSelect.multiSelect) {
        e.stopPropagation()
        const selected = Array.isArray(this.model) ? this.model : this.model ? [this.model] : []
        if (selected.includes(this.value)) {
          selected.splice(selected.indexOf(this.value), 1)
        } else {
          selected.push(this.value)
        }
        this.xlSelect.update(selected)
      } else {
        this.xlSelect.update(this.value)
      }
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
