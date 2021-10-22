<template>
  <div id="app">
    <Nav :width="200" position="left">
      <template #nav>
        <Menu title="xl-ui" :collapse="false" float="left" :keep-one-open="false" type="notice" :items="menus" :light-style="true" indent="1" active-item="1-1-0" />
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
      },
      {
        label: 'form  表单',
        subs: [
          {
            label: 'button  按钮',
            to: 'button'
          },
          {
            label: 'input  输入框',
            to: 'input'
          }
        ]
      },
      {
        label: 'nav 导航',
        subs: [
          {
            label: 'category  目录',
            to: 'category'
          }
        ]
      },
      {
        label: 'data-view 数据展示',
        subs: [
          {
            label: 'tag  标签',
            to: 'tag'
          },
          {
            label: 'scroll 滚动条',
            to: 'scroll'
          },
          {
            label: 'popover 弹框',
            to: 'popover'
          }
        ]
      }])
    return {
      menus
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
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
