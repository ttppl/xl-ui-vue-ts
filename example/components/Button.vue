<template>
  <div class="Buttons">
    <h1>按钮</h1>
    <h2>基本使用</h2>
    <ExampleForm name="type">
      <div class="buttons">
        <h3>默认style</h3>
        <p>type属性：primary, warn, notice, black, error, success</p>
        <XlButton>Base</XlButton>
        <XlButton type="primary">primary</XlButton>
        <XlButton type="warn">warn</XlButton>
        <XlButton type="notice">notice</XlButton>
        <XlButton type="black">black</XlButton>
        <XlButton type="error">error</XlButton>
        <XlButton type="success">success</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton>Base</XlButton>
          \n<XlButton type="primary">primary</XlButton>
          \n<XlButton type="warn">warn</XlButton>
          \n<XlButton type="notice">notice</XlButton>
          \n<XlButton type="black">black</XlButton>
          \n<XlButton type="error">error</XlButton>
          \n<XlButton type="success">success</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="light-style">
      <div class="buttons">
        <h3>明亮style</h3>
        <p>light-style属性</p>
        <XlButton light-style>Base</XlButton>
        <XlButton light-style type="primary">primary</XlButton>
        <XlButton light-style type="warn">warn</XlButton>
        <XlButton light-style type="notice">notice</XlButton>
        <XlButton light-style type="black">black</XlButton>
        <XlButton light-style type="error">error</XlButton>
        <XlButton light-style type="success">success</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton light-style>Base</XlButton>
          \n<XlButton light-style type="primary">primary</XlButton>
          \n<XlButton light-style type="warn">warn</XlButton>
          \n<XlButton light-style type="notice">notice</XlButton>
          \n<XlButton light-style type="black">black</XlButton>
          \n<XlButton light-style type="error">error</XlButton>
          \n<XlButton light-style type="success">success</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="plain">
      <div class="buttons">
        <h3>边框style</h3>
        <p>plain属性</p>
        <XlButton plain>Base</XlButton>
        <XlButton plain type="primary">primary</XlButton>
        <XlButton plain type="warn">warn</XlButton>
        <XlButton plain type="notice">notice</XlButton>
        <XlButton plain type="black">black</XlButton>
        <XlButton plain type="error">error</XlButton>
        <XlButton plain type="success">success</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton plain>Base</XlButton>
          \n<XlButton plain type="primary">primary</XlButton>
          \n<XlButton plain type="warn">warn</XlButton>
          \n<XlButton plain type="notice">notice</XlButton>
          \n<XlButton plain type="black">black</XlButton>
          \n<XlButton plain type="error">error</XlButton>
          \n<XlButton plain type="success">success</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="circle">
      <div class="buttons">
        <h3>圆形style</h3>
        <p>circle属性</p>
        <XlButton circle>Base</XlButton>
        <XlButton circle type="primary">primary</XlButton>
        <XlButton circle type="warn">warn</XlButton>
        <XlButton circle type="notice">notice</XlButton>
        <XlButton circle type="black">black</XlButton>
        <XlButton circle type="error">error</XlButton>
        <XlButton circle type="success">success</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton circle>Base</XlButton>
          \n<XlButton circle type="primary">primary</XlButton>
          \n<XlButton circle type="warn">warn</XlButton>
          \n<XlButton circle type="notice">notice</XlButton>
          \n<XlButton circle type="black">black</XlButton>
          \n<XlButton circle type="error">error</XlButton>
          \n<XlButton circle type="success">success</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="composite">
      <div class="buttons">
        <h3>组合style</h3>
        <strong class="emphasize">以上style可自由组合，如：</strong>
        <p>明亮边框圆形style</p>
        <p>light-style plain circle type="primary"</p>
        <XlButton light-style plain circle type="primary">primary</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton light-style plain circle type="primary">primary</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <h2>属性</h2>
    <ExampleForm name="label">
      <div class="buttons">
        <h3>label</h3>
        <p>定义按钮标签内容</p>
        <XlButton light-style type="primary" label="自定义label" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton light-style type="primary" label="自定义label" />` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="pop-style">
      <div class="buttons">
        <h3>pop-style</h3>
        <p>接受对象类型数据，自定义style</p>
        <p>自定义实现渐变按钮</p>
        <XlButton light-style type="primary" :pop-style="{backgroundImage: 'linear-gradient(to right, #A3D9D7 , #3EDAD4)'}">primary</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton light-style type="primary" :pop-style="{backgroundImage: 'linear-gradient(to right, #A3D9D7 , #3EDAD4)'}">primary</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="to">
      <div class="buttons">
        <h3>to</h3>
        <p>路由跳转</p>
        <p>接受参数：对象，字符串（path,name）</p>
        <XlButton light-style type="primary" to="-1">back</XlButton>
        <XlButton light-style type="primary" to="index">to index by name</XlButton>
        <XlButton light-style type="primary" to="/">to index by path</XlButton>
        <XlButton light-style type="primary" :to="{path:'/'}">to index by router object</XlButton>
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlButton light-style type="primary" to="-1">back</XlButton>
          \n<XlButton light-style type="primary" to="index">to index by name</XlButton>
          \n<XlButton light-style type="primary" to="/">to index by path</XlButton>
          \n<XlButton light-style type="primary" :to="{path:'/'}">to index by router object</XlButton>` }}
        </code>
      </template>
    </ExampleForm>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Buttons',

  nameSpace: 'Buttons',

  components: {
  },

  props: {
  },

  data () {
    return {
      showCode: {}
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
.Buttons{
  text-align: left;
  padding:20px;
  .buttons >*{
    margin:10px 10px;
  }
}
</style>
