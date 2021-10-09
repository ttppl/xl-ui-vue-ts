<template>
  <div class="Input">
    <h1>输入框</h1>
    <h2>基本使用</h2>
    <ExampleForm name="type">
      <div class="inputs">
        <h3>默认style</h3>
        <p>type属性：primary, warn, notice, error, success</p>
        <XlInput placeholder="base" />
        <XlInput type="primary" placeholder="primary" />
        <XlInput type="warn" placeholder="warn" />
        <XlInput type="notice" placeholder="notice" />
        <XlInput type="error" placeholder="error" />
        <XlInput type="success" placeholder="success" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlInput placeholder="base" />
          \n<XlInput type="primary" placeholder="primary" />
          \n<XlInput type="warn" placeholder="warn" />
          \n<XlInput type="notice" placeholder="notice" />
          \n<XlInput type="error" placeholder="error" />
          \n<XlInput type="success" placeholder="success" />` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="light-style">
      <div class="inputs">
        <h3>light-style</h3>
        <XlInput light-style placeholder="light-base" />
        <XlInput light-style type="primary" placeholder="light-primary" />
        <XlInput light-style type="warn" placeholder="light-warn" />
        <XlInput light-style type="notice" placeholder="light-notice" />
        <XlInput light-style type="error" placeholder="light-error" />
        <XlInput light-style type="success" placeholder="light-success" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlInput light-style placeholder="light-base" />
          \n<XlInput light-style type="primary" placeholder="light-primary" />
          \n<XlInput light-style type="warn" placeholder="light-warn" />
          \n<XlInput light-style type="notice" placeholder="light-notice" />
          \n<XlInput light-style type="error" placeholder="light-error" />
          \n<XlInput light-style type="success" placeholder="light-success" />` }}
        </code>
      </template>
    </ExampleForm>

    <h2>属性</h2>
    <ExampleForm name="light-style">
      <div class="inputs">
        <h3>v-model</h3>
        <p>绑定值</p>
        <p>model值：{{ userName }}</p>
        <XlInput v-model="userName" type="primary" placeholder="user name" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<template>
            \n  <p>model值：\{\{ userName \}\}</p>
            \n  <XlInput v-model="userName" type="primary" placeholder="user name" />
            \n</template>\n
          \n<script type="text/ecmascript-6">
            \nimport { ref } from 'vue'
            \nexport default {
            \n  setup () {
            \n    return {
            \n      userName: ref('Declan')
            \n    }
            \n  }
            \n}
            \n</script>` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="light-style">
      <div class="inputs">
        <h3>size</h3>
        <p>宽度Width, 高度height, 接受数字，小于等于0取auto，1取100%，大于1取固定px，小于1取百分比</p>
        <XlInput :width="200" :height="20" type="primary" placeholder="width=&quot;100&quot; height=&quot;20&quot;" />
        <XlInput :width="200" :height="40" type="primary" placeholder="width=&quot;200&quot; height=&quot;40&quot;" />
        <XlInput :width="0.5" :height="40" type="primary" placeholder="width=&quot;50%&quot; height=&quot;40&quot;" />
        <XlInput :width="1" :height="40" type="primary" placeholder="width=&quot;100%&quot; height=&quot;40&quot;" />
        <XlInput :width="0" :height="40" type="primary" placeholder="width=&quot;auto&quot; height=&quot;40&quot;" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlInput :width="200" :height="20" type="primary" placeholder="width=&quot;100&quot; height=&quot;20&quot;" />
          \n<XlInput :width="200" :height="40" type="primary" placeholder="width=&quot;200&quot; height=&quot;40&quot;" />
          \n<XlInput :width="0.5" :height="40" type="primary" placeholder="width=&quot;50%&quot; height=&quot;40&quot;" />
          \n<XlInput :width="1" :height="40" type="primary" placeholder="width=&quot;100%&quot; height=&quot;40&quot;" />
          \n<XlInput :width="0" :height="40" type="primary" placeholder="width=&quot;auto&quot; height=&quot;40&quot;" />` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="light-style">
      <div class="inputs">
        <h3>text-type</h3>
        <p>文本类型，可选text(默认), textarea</p>
        <strong class="emphasize">text-type为textarea时height不生效，可使用row设定高度</strong>
        <XlInput text-type="text" type="primary" placeholder="text" />
        <XlInput text-type="textarea" type="primary" placeholder="textarea" />
        <XlInput text-type="textarea" row="6" type="primary" placeholder="textarea row=6" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<XlInput text-type="text" type="primary" placeholder="text" />
          \n<XlInput text-type="textarea" type="primary" placeholder="textarea" />
          \n<XlInput text-type="textarea" row="6" type="primary" placeholder="textarea row=6" />` }}
        </code>
      </template>
    </ExampleForm>
    <ExampleForm name="light-style">
      <div class="inputs">
        <h3>pop-class</h3>
        <p>自定义类</p>
        <strong class="emphasize">类选择器必须为全局或深度选择，否则不会生效</strong>
        <XlInput pop-class="diy-font-color" text-type="text" type="primary" placeholder="focus字体显示为红色" />
        <XlInput pop-class="diy-placeholder-color" text-type="text" type="primary" placeholder="placeholder字体颜色" />
      </div>
      <template #code>
        <code v-codeFormat class="language-html">
          {{ `<template>
            \n  <XlInput pop-class="diy-font-color" text-type="text" type="primary" placeholder="focus字体显示为红色" />
            \n  <XlInput pop-class="diy-placeholder-color" text-type="text" type="primary" placeholder="placeholder字体颜色" />
            \n</template>\n
          \n<style scoped lang="less">
            \n/deep/.diy-font-color:focus{
            \n  color: red;
            \n}\n
            \n/deep/.diy-placeholder-color::-webkit-input-placeholder {
            \n  color: red;
            \n}
            \n</style>` }}
        </code>
      </template>
    </ExampleForm>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  name: 'Input',
  setup () {
    return {
      userName: ref('Declan')
    }
  }
}
</script>

<style scoped lang="less">
.Input{
  text-align: left;
  overflow: hidden;
  padding:20px;
  .inputs{
    >div{
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
/deep/.diy-font-color:focus{
  color: red;
}
/deep/.diy-placeholder-color::-webkit-input-placeholder {
  color: red;
}
</style>
