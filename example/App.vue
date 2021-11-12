<template>
  <div id="app">
    <Nav :width="250" position="left" divided>
      <template #nav>
        <Menu class="menu" title="xl-ui" :collapse="false" float="left" :keep-one-open="false" type="notice" :items="menus" :light-style="true" indent="1" active-item="1-1-0" />
      </template>
      <router-view class="main" name="main" />
    </Nav>
  </div>
</template>

<script lang="ts">
// import message from '@/components/message'
import Nav from '@/components/nav'
import Menu from '@/components/menu'
import { reactive } from 'vue'
export default {
  name: 'App',
  components: {
    Menu,
    Nav
  },

  setup () {
    // message('sss')
    const menus = reactive([
      {
        label: 'guide  指引',
        to: 'guide'
      }, {
        label: 'form  表单',
        subs: [
          {
            label: 'button  按钮',
            to: 'button'
          }, {
            label: 'input  输入框',
            to: 'input'
          }, {
            label: 'select  选择框',
            to: 'select'
          }, {
            label: 'choose  选择按钮',
            to: 'choose'
          }
        ]
      }, {
        label: 'nav 导航',
        subs: [
          {
            label: 'category  目录',
            to: 'category'
          }
        ]
      }, {
        label: 'data-view 数据展示',
        subs: [
          {
            label: 'tag  标签',
            to: 'tag'
          }, {
            label: 'scroll 滚动条',
            to: 'scroll'
          }, {
            label: 'popover 页面弹框',
            to: 'popover'
          }, {
            label: 'popup 窗口弹框',
            to: 'popup'
          }, {
            label: 'card 卡片',
            to: 'card'
          }
        ]
      }, {
        label: 'interactive 交互',
        subs: [
          {
            label: 'message  消息提示',
            to: 'message'
          }
        ]
      }, {
        label: 'utils 工具',
        subs: [
          {
            label: 'resizer  元素缩放',
            to: 'resizer'
          }, {
            label: 'dragger  元素拖动',
            to: 'dragger'
          }, {
            label: 'clickOutside  元素外点击事件管理',
            to: 'clickOutside'
          }, {
            label: 'resizeDetector  元素大小变化监测',
            to: 'resizeDetector'
          }
        ]
      }])
    return {
      menus
    }
  }
}
</script>

<style lang="less">
@import '~./styles/flex.less';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // height:100%;
  .menu{
    padding-bottom: 80px;
  }
  .main{
    text-align: left;
    overflow: hidden;
    // width: 100%;
    padding:20px;
  }
}

/* 全局css */
::v-deep .emphasize{
  color: red;
  display: block;
}
</style>
