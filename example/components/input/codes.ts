export default {
  defaultStyle: `<XlInput placeholder="base" />
<XlInput type="primary" placeholder="primary" />
<XlInput type="warn" placeholder="warn" />
<XlInput type="notice" placeholder="notice" />
<XlInput type="error" placeholder="error" />
<XlInput type="success" placeholder="success" />`,
  lightStyle: `<XlInput light-style placeholder="light-base" />
<XlInput light-style type="primary" placeholder="light-primary" />
<XlInput light-style type="warn" placeholder="light-warn" />
<XlInput light-style type="notice" placeholder="light-notice" />
<XlInput light-style type="error" placeholder="light-error" />
<XlInput light-style type="success" placeholder="light-success" />`,
  model: `
<template>
  <XlInput v-model="userName" type="primary" placeholder="user name" />
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup () {
    return {
      userName: ref('Declan')
    }
  }
}
</script>`,
  size: `<XlInput :width="200" :height="20" type="primary" placeholder="width=&quot;100&quot; height=&quot;20&quot;" />
<XlInput :width="200" :height="40" type="primary" placeholder="width=&quot;200&quot; height=&quot;40&quot;" />
<XlInput :width="0.5" :height="40" type="primary" placeholder="width=&quot;50%&quot; height=&quot;40&quot;" />
<XlInput :width="1" :height="40" type="primary" placeholder="width=&quot;100%&quot; height=&quot;40&quot;" />
<XlInput :width="0" :height="40" type="primary" placeholder="width=&quot;auto&quot; height=&quot;40&quot;" />`,
  textType: `<XlInput text-type="text" type="primary" placeholder="text" />
<XlInput text-type="textarea" type="primary" placeholder="textarea" />
<XlInput text-type="textarea" row="6" type="primary" placeholder="textarea row=6" />`,
  popClass: `<template>
  <XlInput pop-class="diy-font-color" text-type="text" type="primary" placeholder="focus字体显示为红色" />
  <XlInput pop-class="diy-placeholder-color" text-type="text" type="primary" placeholder="placeholder字体颜色" />
</template>
<style scoped lang="less">
/deep/.diy-font-color:focus{
  color: red;
}
/deep/.diy-placeholder-color::-webkit-input-placeholder {
  color: red;
}
</style>`,
  event: `<template>
<div :style="{color:'red'}">{{ eventTest }}</div>
<XlInput v-for="evt in events" :key="'event'+evt.eventName" text-type="text" type="primary" :placeholder="evt.eventName+'事件'"
    @[evt.eventName]="event(evt.eventName,$event) " />
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup () {
    const eventTest = ref('event test output')
    const events = [[{
      eventName: 'input'
    }, {
      eventName: 'change'
    }, {
      eventName: 'blur'
    }, {
      eventName: 'focus'
    }, {
      eventName: 'clear'
    }]]
    const event = (eventName, ...args) => {
      eventTest.value = \`\${eventName} event triggered:\${args}\`
    }
    return {
      eventTest,
      event
    }
  }
}
</script>`,
  script: `<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  name: 'Input',
  setup () {
    const events = [[{
      eventName: 'input'
    }, {
      eventName: 'change'
    }, {
      eventName: 'blur'
    }, {
      eventName: 'focus'
    }, {
      eventName: 'clear'
    }]]
    const eventTest = ref('event test output')
    const event = (eventName, ...args) => {
      eventTest.value = \`\${eventName} event triggered:\${args}\`
    }
    return {
      events,
      userName: ref('Declan'),
      eventTest,
      event,
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
</style>`

}
