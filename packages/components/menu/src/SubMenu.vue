<template>
  <div class="XlSubMenu">
  <MenuItem :index="index" sub-menu :deep="deep-1" :label="label" v-if="label" @click="clickSubmenu"></MenuItem>
  <Collapse v-if="items">
    <div v-show="isOpen">
      <slot>
          <template v-for="(item,key) in items" :key="'menu'+key">
            <SubMenu :index="index+'-'+key" :deep="deep+1" :label="item.label" v-if="item.subs" :items="item.subs"></SubMenu>
            <MenuItem :index="index+'-'+key" :to="item.to" :deep="deep" v-else :label="item.label"></MenuItem>
          </template>
      </slot>
    </div>
  </Collapse>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, computed, inject } from 'vue'
import size from '@/mixins/size'
import Collapse from '@/components/collapse'
import MenuItem from './MenuItem'
export default {
  name: 'XlSubMenu',

  nameSpace: 'XlSubMenu',

  components: {
    Collapse,
    MenuItem
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {
        return null
      }
    },
    label: {
      type: String,
      default: ''
    },
    deep: {
      type: [String, Number],
      default: 0
    },
    index: {
      type: [String, Number],
      default: 0
    },
    active: Boolean
  },

  setup (props, ctx) {
    const menu = inject('XlMenu')
    const opened = ref(menu.activeItem.value.toString().startsWith(props.index))
    const isOpen = computed(() => {
      if (!menu.collapse.value) {
        return true
      }
      if (menu.keepOneOpen.value) {
        return menu.activeSub.value.toString().startsWith(props.index)
      } else {
        return opened.value
      }
    })
    const clickSubmenu = () => {
      if (menu.collapse.value) {
        if (menu.keepOneOpen.value) {
          if (menu.activeSub.value.toString().startsWith(props.index.toString())) {
            menu.activeSub.value = props.index.toString().slice(0, -2)
          } else {
            menu.activeSub.value = props.index.toString()
          }
        } else {
          opened.value = !opened.value
        }
      }
    }
    return {
      isOpen,
      clickSubmenu
    }
  }

}
</script>

<style scoped lang="less">
.XlSubMenu{
  .submenus{
    padding-left: 20px;
  }

}
</style>
