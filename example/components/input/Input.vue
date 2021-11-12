<template>
  <div class="Input">
    <h1>输入框</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="style风格">
        <ExampleForm>
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
              {{ codes.defaultStyle }}
            </code>
          </template>
        </ExampleForm>
        <ExampleForm>
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
              {{ codes.lightStyle }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="model">
        <h2>属性</h2>
        <ExampleForm>
          <div class="inputs">
            <h3>v-model</h3>
            <p>绑定值</p>
            <p>model值：{{ userName }}</p>
            <XlInput v-model="userName" type="primary" placeholder="user name" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.model }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="大小">
        <ExampleForm>
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
              {{ codes.size }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="文本类型">
        <ExampleForm>
          <div class="inputs">
            <h3>text-type</h3>
            <p>文本类型，可选text(默认), textarea</p>
            <strong class="emphasize">text-type为textarea时height不生效，可使用row设定高度</strong>
            <div>
              <XlInput text-type="text" type="primary" placeholder="text" />
              <XlInput text-type="textarea" type="primary" placeholder="textarea" />
              <XlInput text-type="textarea" row="6" type="primary" placeholder="textarea row=6" />
            </div>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.textType }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="自定义class">
        <ExampleForm>
          <div class="inputs">
            <h3>pop-class</h3>
            <p>自定义类</p>
            <strong class="emphasize">类选择器必须为全局或深度选择，否则不会生效</strong>
            <div>
              <XlInput pop-class="diy-font-color" text-type="text" type="primary" placeholder="focus字体显示为红色" />
              <XlInput pop-class="diy-placeholder-color" text-type="text" type="primary" placeholder="placeholder字体颜色" />
            </div>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.popClass }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="事件">
        <EventTable :events="events" />
        <ExampleForm>
          <div class="inputs">
            <h3>事件</h3>
            <p>事件触发output:</p>
            <div :style="{color:'red'}">{{ eventTest }}</div>
            <XlInput v-for="evt in events" :key="'event'+evt.eventName" text-type="text" type="primary" :placeholder="evt.eventName+'事件'"
                     @[evt.eventName]="event(evt.eventName,$event) " />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.event }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem class="position" title="script,style">
        <ExampleForm>
          <h3>example scripts and styles</h3>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.script }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
    </XlCategory>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref } from 'vue'
import codes from './codes'
import attrs from './attrs'
import events from './events'
export default {
  name: 'Input',
  setup () {
    const eventTest = ref('event test output')
    const event = (eventName, ...args) => {
      eventTest.value = `${eventName} event triggered:${args}`
    }
    return {
      attrs,
      events,
      userName: ref('Declan'),
      eventTest,
      event,
      codes
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
