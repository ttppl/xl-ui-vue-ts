<template>
  <div id="app">
    <router-view name="main" />
  </div>
</template>

<script lang="ts">
import message from '@/components/message'
export default {
  name: 'App',
  components: {
  },

  setup () {
    message('sss')
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
::v-deep .emphasize{
  color: red;
  display: block;
}
</style>
