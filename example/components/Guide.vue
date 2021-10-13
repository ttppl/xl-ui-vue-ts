<template>
  <div class="Guide">
    <h1>开始</h1>
    <h2>安装</h2>
    <div v-highlight class="example-code">
      <pre>
        <code v-codeFormat class="language-shell">
          {{`\nnpm install xl-ui-vue -S`}}
        </code>
      </pre>
    </div>
    <h2>使用</h2>
    <div v-highlight class="example-code">
      <pre>
        <code v-codeFormat class="language-js">
          {{`\nimport xlui from 'xl-ui-vue'
          \nimport 'xl-ui-vue/lib/xl-ui.css'
          \nimport { createApp } from 'vue'
          \nimport App from './App.vue'\n
          \nconst app = createApp(App)
          \napp.use(xlui)`}}
        </code>
      </pre>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Guide',

  nameSpace: 'Guide',

  components: {
  },

  props: {
  },

  setup () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.Guide{
  text-align: left;
}
</style>
