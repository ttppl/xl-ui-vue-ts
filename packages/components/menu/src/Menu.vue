<template>
  <div class="XlMenu" :style="style">
    <p class="title" :style="titleStyle">{{title}}</p>
    <slot>
      <template v-if="items">
        <div v-for="(item,key) in items" :key="'menu'+key">
          <SubMenu :index="key" :deep="indent/1+1" :label="item.label" v-if="item.subs" :items="item.subs"></SubMenu>
          <MenuItem :index="key" :to="item.to" :deep="indent" v-else :label="item.label"></MenuItem>
        </div>
      </template>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, provide, computed, toRef } from 'vue'
import size from '@/mixins/size'
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import { getToRef } from '@/utils/PIutils'
export default {
  name: 'XlMenu',

  nameSpace: 'XlMenu',

  components: {
    SubMenu,
    MenuItem
  },

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    lightStyle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: 1
    },
    height: {
      type: [Number, String],
      default: 0
    },
    items: {
      type: Array,
      default: () => {
        return null
      }
    },
    collapse: {
      type: Boolean,
      default: true
    },
    keepOneOpen: {
      type: Boolean,
      default: true
    },
    indent: {
      type: [String, Number],
      default: 0
    },
    float: {
      type: String,
      default: 'left'
    },
    activeItem: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 20
    }
  },

  setup (props, ctx) {
    provide('XlMenu', {
      ...getToRef(props, 'width', 'height', 'collapse', 'type', 'lightStyle', 'keepOneOpen', 'fontSize', 'float'),
      activeSub: ref(props.activeItem),
      activeItem: ref(props.activeItem)
    })
    const { widthC, heightC } = size(props)
    const style = computed(() => {
      const style = {
        width: widthC.value,
        height: heightC.value,
        textAlign: props.float
      }
      return style
    })
    const titleStyle = computed(() => {
      const style = { }
      if (props.float === 'left') {
        style.textIndent = `${props.indent * 20}px`
      } else {
        style.paddingRight = `${props.indent * 20}px`
      }
      return style
    })
    return {
      style,
      titleStyle
    }
  }

}
</script>

<style scoped lang="less">
.XlMenu{
  .title{
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
