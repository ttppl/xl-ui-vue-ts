<template>
  <div class="ResizeDetector">
    <h1>ResizeDetector</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>点击元素改变大小</h3>
          <div ref="box" class="box" @click="changeSize($event,200)" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.base }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem title="指令">
        <ExampleForm>
          <h3>vue指令</h3>
          <h4>参数:OBJECT</h4>
          <ul>
            <li>disable:boolean是否禁止</li>
            <li>callback：回调函数}</li>
          </ul>
          <div v-resizeDetect="{callback:showMessage}" class="box" @click="changeSize($event,200)" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.directive }}
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
import ResizeDetector from '@/utils/ResizeDetector'
import Message from '@/components/message'
import resizeDetect from '@/directives/resizeDetect'
export default {
  name: 'ResizeDetector',

  nameSpace: 'ResizeDetector',

  components: {
  },

  directives: { resizeDetect },

  props: {
  },

  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }

    function changeSize (e, size) {
      if (parseFloat(e.target.style.width) === size) {
        e.target.style.width = '100px'
        e.target.style.height = '100px'
      } else {
        e.target.style.width = `${size}px`
        e.target.style.height = `${size}px`
      }
    }
    function showMessage () {
      Message('resize detected!')
    }
    const box = ref(null)
    const resizeDetector = new ResizeDetector()
    onMounted(() => {
      resizeDetector.listenTo(box.value, () => {
        showMessage()
      })
    })
    onBeforeUnmount(() => {
      resizeDetector.remove(box.value)
    })

    return {
      attrs,
      codes,
      script,
      scriptCode,
      scrollToScript,
      changeSize,
      showMessage,
      box
    }
  }
}
</script>

<style scoped lang="less">
.ResizeDetector{
  .box{
    width: 100px;
    height:100px;
    background-color: gray;
  }
}
</style>
