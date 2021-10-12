<template>
  <div id="app">
    <Nav :width="200" position="left">
      <template #nav>
        <Menu title="xl-ui" :collapse="false" float="left" :keep-one-open="false" type="notice" :items="menus" :light-style="true" indent="1" active-item="1-1-0"></Menu>
      </template>
      <router-view name="main" />
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
        label: 'guide  摘要',
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
      }])
    return {
      menus
    }
  }
}
</script>

<style lang="css" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}

/* 全局css */
::v-deep .emphasize{
  color: red;
  display: block;
}
</style>
