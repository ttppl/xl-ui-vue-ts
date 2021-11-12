<template>
  <div :id="name" class="example-form">
    <div class="example-view">
      <XlButton class="show-code" plain light-style @click="showCode=!showCode">show code</XlButton>
      <slot />
    </div>
    <div class="example-codes">
      <XlCollapse>
        <div v-show="showCode" v-highlight class="example-code">
          <pre>
            <slot name="code" />
          </pre>
        </div>
      </XlCollapse>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { nextTick, onMounted } from '@vue/runtime-core'
// import hljs from 'highlight.min.js'
export default {
  name: 'ExampleForm',

  nameSpace: 'example-form',

  components: {
  },

  props: {
    name: {
      type: String,
      default: null
    }
  },

  setup (props, ctx) {
    const showCode = ref(false)
    // const exampleHtml = ref(null)
    // const code = ref('')
    // const codeRef = ref(null)
    // onMounted(() => {
    //   code.value = exampleHtml.value.innerHTML
    //   nextTick().then(() => {
    //     hljs.configure({ useBR: true })
    //     const blocks = codeRef.value.querySelectorAll('pre code')
    //     console.log(blocks)
    //     blocks.forEach((block) => {
    //       hljs.highlightBlock(block)
    //     })
    //   })
    // })
    function show () {
      showCode.value = true
    }
    return {
      showCode,
      show
      // exampleHtml,
      // code,
      // codeRef
    }
  }
}
</script>

<style scoped lang="less">
.example-form{
  margin-bottom: 40px;
  .example-view{
    .show-code{
      float: right;
    }
  }
  .example-code{
    font-size: 20px;
    width: 100%;
    // overflow-x: scroll;
  }
}
</style>
