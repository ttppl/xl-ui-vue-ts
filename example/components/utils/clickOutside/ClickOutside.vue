<template>
  <div class="ClickOutside">
    <h1>ClickOutside</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>点击元素内外面改变元素颜色</h3>
          <div ref="clickOutsideBox" class="box" @click="changeColor" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.base }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem title="vue指令">
        <ExampleForm>
          <h3>指令v-clickoutside</h3>
          <h4>参数：回调函数</h4>
          <XlButton @click="show=true">点击显示元素</XlButton>
          <XlCollapse>
            <div v-show="show" v-clickoutside="()=>{show=false}" class="box">
              点击元素外隐藏元素
            </div>
          </XlCollapse>
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
import ClickOutside from '@/utils/clickOutside'
import clickoutside from '@/directives/clickOutside'
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'ClickOutside',

  nameSpace: 'ClickOutside',

  components: {
  },

  directives: { clickoutside },

  props: {
  },

  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }
    const clickOutsideBox = ref(null)
    const clickOutside = new ClickOutside()
    const changeColor = (e) => {
      e.target.style.backgroundColor = 'gray'
    }
    const show = ref(false)
    onMounted(() => {
      clickOutside.addSource(clickOutsideBox.value, {
        callback: (e, el) => {
          el.style.backgroundColor = 'black'
        }
      })
    })
    onBeforeUnmount(() => {
      clickOutside.off()
    })
    return {
      attrs,
      codes,
      script,
      scriptCode,
      scrollToScript,
      clickOutsideBox,
      changeColor,
      show
    }
  }
}
</script>

<style scoped lang="less">
.ClickOutside{
  .box{
    width: 100px;
    height:100px;
    background-color: gray;
  }
}
</style>
