<template>
  <div class="Message">
    <h1>Message</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>构造函数方式</h3>
          <div class="options">
            <div class="item">
              <p>类型图标</p>
              <XlSelect v-model="icon" placeholder="选择图标" :show-clear="false">
                <XlSelectOption :value="true" label="默认图标" />
                <XlSelectOption :value="false" label="不显示图标" />
                <XlSelectOption value="heart" label="自定义heart图标" />
              </XlSelect>
            </div>
            <div class="item">
              <p>关闭按钮</p>
              <XlChoose v-model="showClose" :enable-cancle="()=>false" label="显示关闭按钮" :value="true" />
            </div>
            <div class="item">
              <p>居中</p>
              <XlChoose v-model="center" :enable-cancle="()=>false" label="居中" :value="true" />
            </div>
            <div class="item">
              <p>位置</p>
              <XlSelect v-model="position" placeholder="选择消息位置" :show-clear="false">
                <XlSelectOption value="center" label="居中" />
                <XlSelectOption value="left" label="偏左" />
                <XlSelectOption value="right" label="偏右" />
              </XlSelect>
            </div>
            <div class="item">
              <p>关闭倒计时</p>
              <XlSelect v-model="duration" placeholder="关闭倒计时" :show-clear="false">
                <XlSelectOption value="1000" label="1s后关闭" />
                <XlSelectOption value="3000" label="3s后关闭" />
                <XlSelectOption value="5000" label="5s后关闭" />
                <XlSelectOption value="0" label="不自动关闭" />
              </XlSelect>
            </div>
          </div>
          <div class="buttons">
            <XlButton type="primary" label="primary" @click="showMessage('primary')" />
            <XlButton type="success" label="success" @click="showMessage('success')" />
            <XlButton type="warn" label="warn" @click="showMessage('warn')" />
            <XlButton type="error" label="error" @click="showMessage('error')" />
            <XlButton type="notice" label="notice" @click="showMessage('notice')" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.base }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem ref="script" title="script,style">
        <ExampleForm ref="scriptCode">
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
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import attrs from './attrs'
import codes from './codes'
import Message from '@/components/message'
export default {
  name: 'Message',

  nameSpace: 'Message',

  components: {
  },

  props: {
  },

  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }

    const icon = ref(true)
    const showClose = ref(false)
    const position = ref('center')
    const duration = ref(3000)
    const center = ref(false)
    function showMessage (type) {
      Message({
        type: type,
        icon: icon.value,
        showClose: showClose.value,
        position: position.value,
        duration: duration.value,
        center: center.value,
        message: `${type} message!`
      })
    }

    return {
      attrs,
      codes,
      script,
      scriptCode,
      scrollToScript,

      icon,
      showClose,
      position,
      duration,
      center,
      showMessage
    }
  }
}
</script>

<style scoped lang="less">
.Message{
  .options{
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-right: 20px;
    }
  }
  .buttons{
    >*{
      margin: 10px 20px 10px 0;
    }
  }
}
</style>
