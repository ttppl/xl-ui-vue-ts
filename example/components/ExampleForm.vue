<template>
  <div :id="name" class="example-form">
    <div class="example-view">
      <XlButton class="show-code" plain light-style @click="showCode=!showCode">show code</XlButton>
      <slot />
    </div>
    <div class="example-code">
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

  data () {
    return {
      showCode: false
    }
  },

  computed: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
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
  }
}
</style>
