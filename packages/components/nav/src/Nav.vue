<template>
  <div class="XlNav">
    <div v-if="hide" class="nav-bar" :style="navBarStyle">
      <Icon :class="{'icon-rotate':position=='left'}" :size="30" icon="menu" :type="theme" @click="popNav=!popNav" />
    </div>
    <div v-else class="slide-bar" :divided="divided" :style="navStyle">
      <Scroll height="1" show-onhover :pop-bar-style="{opacity:'0.4'}"><slot name="nav" /></Scroll>
    </div>
    <div class="content" :style="contentStyle">
      <slot />
    </div>
    <Popup v-model="popNav" :width="0.5" :height="1" :direction="position">
      <slot name="nav" />
    </Popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, computed, onUnmounted } from 'vue'
import size from '@/mixins/size'
import { on, off } from '@/utils/dom'
import { debounce } from '@/utils/common'
import Icon from '@/components/icon/src/Icon'
import Popup from '@/components/popup/src/Popup'
import Scroll from '@/components/scroll'
import { zIndexManager } from '@/utils/zIndexManager'
export default {
  name: 'XlNav',

  nameSpace: 'XlNav',

  components: {
    Icon,
    Popup,
    Scroll
  },

  props: {
    type: {
      type: String,
      default: 'slideBar'
    },

    theme: {
      type: String,
      default: 'notice'
    },

    position: {
      type: String,
      default: 'left'
    },

    width: {
      type: [Number, String],
      default: 100
    },

    divided: Boolean// 分割线
  },

  setup (props, ctx) {
    const { widthC, heightC } = size(props)
    const navStyle = computed(() => {
      const style = {
        left: props.position === 'left' ? 0 : null,
        right: props.position === 'right' ? 0 : null,
        top: ['left', 'right', 'top'].includes(props.position) ? 0 : null,
        width: widthC.value
      }
      return style
    })
    const contentStyle = computed(() => {
      const style = {
        marginLeft: props.position === 'left' && !hide.value ? widthC.value : null,
        marginRight: props.position === 'right' && !hide.value ? widthC.value : null,
        marginTop: hide.value ? '30px' : null
      }
      return style
    })

    // 响应式布局
    const hide = ref(window.innerWidth < 800)
    const isHide = debounce(() => {
      hide.value = window.innerWidth < 800
      popNav.value = window.innerWidth > 800 ? false : popNav.value
    }, 100)
    on(window, 'resize', isHide)
    onUnmounted(() => {
      off(window, 'resize', isHide)
    })
    const index = zIndexManager.nextIndex()
    const navBarStyle = computed(() => {
      const style = {
        textAlign: props.position,
        zIndex: index
      }
      return style
    })
    const popNav = ref(false)
    return {
      widthC,
      heightC,
      navStyle,
      contentStyle,
      hide,
      popNav,
      navBarStyle
    }
  }

}
</script>

<style scoped lang="less">
.XlNav{
  .nav-bar{
    position: fixed;
    top:0;
    left:0;
    padding:0 20px;
    height:30px;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    .icon-rotate{
      transform: rotate(180deg);
    }
  }
  .slide-bar{
    position: fixed;
    height:100%;
    width:25%;
    &[divided="true"]{
      border-right: 1px solid #EBEEF5;
      padding-right: 5px;
    }
  }
}
</style>
