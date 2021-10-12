<template>
  <div class="XlMenuItem" @click="selectMenu" :class="classes" :style="style">
    <slot>
      {{label}}
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, inject, computed } from 'vue'
import { themeType } from '@/types'
import { useRouter } from 'vue-router'
import { go } from '@/utils/router'
export default {
  name: 'XlMenuItem',

  nameSpace: 'XlMenuItem',

  components: {
  },

  props: {
    label: {
      type: String,
      default: ''
    },
    subMenu: Boolean,
    deep: {
      type: [String, Number],
      default: 0
    },
    index: {
      type: [String, Number],
      default: 0
    },
    to: {
      type: String,
      default: ''
    }
  },

  setup (props, ctx) {
    const router = useRouter()
    const menu = inject('XlMenu')
    const isActive = computed(() => {
      return menu.activeItem.value.toString().startsWith(props.index)
    })
    const classes = computed(() => {
      const bg = isActive.value ? themeType(menu.type.value, menu.lightStyle.value ? '' : 'bg', !menu.lightStyle.value)
        : menu.collapse.value || !props.subMenu ? themeType(menu.type.value, menu.lightStyle.value ? 'hover' : 'bg-hover', !menu.lightStyle.value) : ''
      const hover = !props.subMenu ? 'xl-pointer' : 'xl-default'
      // const color = themeType(menu.type.value, null, null)
      return [bg, 'xl-color-hover-brightness', hover]
    })
    const style = computed(() => {
      const style = {
        fontWeight: props.subMenu ? 'bold' : 'normal',
        fontSize: `${Math.max(menu.fontSize.value - props.deep, 16)}px`
      }
      if (menu.float.value === 'left') {
        style.textIndent = `${props.deep * 20}px`
      } else {
        style.paddingRight = `${props.deep * 20}px`
      }
      return style
    })
    const selectMenu = () => {
      if (props.subMenu) {
        return
      }
      if (menu.activeItem.value === props.index) {
        menu.activeItem.value = props.index.toString().slice(0, -2)
      } else {
        menu.activeItem.value = props.index
      }
      go(props.to, router)
    }
    return {
      classes,
      style,
      selectMenu
    }
  }

}
</script>

<style scoped lang="less">
.XlMenuItem{
  padding:10px 0;
}
.xl-pointer{
  cursor: pointer;
}
.xl-default{
  cursor:default;
}
</style>
