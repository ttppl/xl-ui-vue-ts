<template>
  <div class="Drag">
    <h1>Drag</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>拖动元素改变位置(transform位移)</h3>
          <div ref="dragBox" class="drag-box" />
          <h3>拖动元素改变位置（offset定位）</h3>
          <div ref="dragBox1" class="drag-box" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.base }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="目标元素">
        <ExampleForm>
          <h3>目标元素</h3>
          <h4>拖动移动目标元素（建议用于拖动子元素移动父元素）</h4>
          <h4>拖动白块移动整体：</h4>
          <div ref="dragBox2" class="drag-box">
            <div ref="dragBox3" class="drag-box-inner" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.target }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="回调函数">
        <ExampleForm>
          <h3>回调函数</h3>
          <h4>参数：event（mousemoveEvent）</h4>
          <h4>回调函数改变元素颜色：</h4>
          <div ref="dragBox4" class="drag-box" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.callback }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="阻止冒泡">
        <ExampleForm>
          <h3>阻止冒泡</h3>
          <h4>默认是阻止事件冒泡的，可手动关闭</h4>
          <h4>父元素设置mousedown事件，改变边框颜色</h4>
          <div ref="boxContainer" class="box-container" @mousedown="containerMouseDownEvent">
            <div ref="dragBox5" class="drag-box" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.propagation }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="vue指令">
        <ExampleForm>
          <h3>指令v-drag</h3>
          <h4>参数：Object</h4>
          <ul>
            <li>disable:boolean是否禁止</li>
            <li>target：number移动上层几级父元素，0为本身，1为父元素，2为祖父元素，以此类推</li>
            <li>transform：boolean是否以transform移动元素</li>
            <li>callback：回调函数</li>
            <li>propagation：是否冒泡</li>
            <li>cursor:string,鼠标样式，默认move，none为不改变原有样式</li>
          </ul>

          <div v-drag class="drag-box" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.directive }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="script,style">
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
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from '@/utils/dragHandler'
import { onece } from '@/utils/common'
import drag from '@/directives/drag'
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'Drag',

  nameSpace: 'Drag',

  components: {
  },

  directives: { drag },

  props: {
  },

  setup () {
    const dragBox = ref(null)
    const dragBox1 = ref(null)
    const dragBox2 = ref(null)
    const dragBox3 = ref(null)
    const dragBox4 = ref(null)
    const dragBox5 = ref(null)
    const boxContainer = ref(null)
    const draggers = []
    onMounted(() => {
      draggers[0] = new DragHandler(dragBox.value)
      draggers[1] = new DragHandler(dragBox1.value, { transform: false })
      draggers[2] = new DragHandler(dragBox3.value, { target: dragBox2.value })
      draggers[3] = new DragHandler(dragBox4.value, {
        callback: onece(() => {
          dragBox4.value.style.backgroundColor = 'black'
        })
      })
      draggers[4] = new DragHandler(dragBox5.value, { propagation: true })
    })
    onBeforeUnmount(() => {
      draggers.forEach(d => {
        d.off()
      })
    })

    const containerMouseDownEvent = () => {
      boxContainer.value.style.border = '1px solid red'
    }
    return {
      attrs,
      codes,
      dragBox,
      dragBox1,
      dragBox2,
      dragBox3,
      dragBox4,
      dragBox5,
      boxContainer,
      containerMouseDownEvent
    }
  }
}
</script>

<style scoped lang="less">
.Drag{
  .drag-box,.drag-box-black{
      width: 100px;
      height:100px;
      background-color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
      .drag-box-inner{
        width: 50px;
        height: 50px;
        background-color: white;
      }
    }
    .drag-box-black{
      background-color: black;
    }
}
</style>
