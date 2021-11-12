<template>
  <transition :name="'tst-'+name">
    <slot />
  </transition>
</template>

<script>
import { addClass, getStyle, removeClass } from '@/utils/dom'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'XlTransition',
  props: {
    name: {
      type: String,
      default: ''
    }
  },

  setup () {
    return {
    }
  }
})
</script>

<style lang="less">
@import '~@/styles/transition.less';
</style>
