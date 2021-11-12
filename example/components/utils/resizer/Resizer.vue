<template>
  <div class="Resizer">
    <h1>resizer</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>改变宽高</h3>
          <h4>拖动元素边缘缩放元素大小(单纯改变大小，不进行其他操作)</h4>
          <div class="box-container">
            <div ref="resizeBox" class="resize-box" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.base }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem title="位置变化">
        <ExampleForm>
          <h3>位置变化</h3>
          <h4>根据元素大小变化元素位置（改变transform）</h4>
          <div class="box-container">
            <div ref="resizeBox1" class="resize-box translated" />
          </div>
          <h5>注：位置虽然改变了，但宽高变化仍然会影响到父元素，建议使用在absolute/fixed定位的元素上,如下：</h5>
          <div class="box-container">
            <div ref="resizeBox2" class="resize-box-absolute translated" />
          </div>
          <h4>根据元素大小变化元素位置（改变offset）</h4>
          <div class="box-container">
            <div ref="resizeBox3" class="resize-box translated" />
          </div>
          <h5>注：同上，建议使用在absolute/fixed定位的元素上,如下：</h5>
          <div class="box-container">
            <div ref="resizeBox4" class="resize-box-absolute translated" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.positionChange }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="等比例缩放">
        <ExampleForm>
          <h3>等比例缩放</h3>
          <h4>等比例缩放（默认位置会发生改变，同上建议使用在absolute元素上）</h4>
          <div class="box-container">
            <div ref="resizeBox5" class="resize-box-absolute translated" />
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.geometric }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="回调函数">
        <ExampleForm>
          <h3>回调函数</h3>
          <h4>参数</h4>
          <ul>
            <li>element：元素本身></li>
            <li>
              options：object
              <ul>
                <li>direction:触发的操作条</li>
                <li>heightAdd：增加的高度</li>
                <li>domClone：元素本身(变化前的克隆节点)</li>
              </ul>
            </li>
          </ul>
          <h4>回调函数解决元素位移问题（手动给元素设置定位）</h4>
          <div class="box-container">
            <div ref="resizeBox6" class="resize-box translated" />
          </div>

          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.callback }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="vue指令">
        <ExampleForm>
          <h3>指令v-resize</h3>
          <h4>参数:OBJECT</h4>
          <ul>
            <li>disable:boolean是否禁止</li>
            <li>geometric：boolean是否等比例缩放</li>
            <li>transform：boolean/'offset'是否移动元素/移动的方式</li>
            <li>callback：回调函数}</li>
          </ul>

          <div class="box-container">
            <div v-resize="{geometric:true,callback:directiveCallBack}" class="resize-box translated" />
          </div>

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
import ResizeHandler from '@/utils/resizeHandler'
import { getElementSize, setPositioned, setStyle } from '@/utils/dom'
import { onece } from '@/utils/common'
import resize from '@/directives/resize'
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'Resizer',

  nameSpace: 'Resizer',

  components: {
  },

  directives: { resize },

  props: {
  },

  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }
    const resizeBox = ref(null)
    const resizeBox1 = ref(null)
    const resizeBox2 = ref(null)
    const resizeBox3 = ref(null)
    const resizeBox4 = ref(null)
    const resizeBox5 = ref(null)
    const resizeBox6 = ref(null)
    const resizers = []
    const fixedParent = (el) => {
      // 固定父元素高度，设置子元素为absolute
      const size = getElementSize(el.parentNode)
      setStyle(el.parentNode, 'height', `${size.height}px`)
      setPositioned(el.parentNode)// 父元素需为可定位
      setStyle(el, 'position', 'absolute')
    }
    const directiveCallBack = onece(fixedParent)// once只执行第一次
    onMounted(() => {
      resizers[0] = new ResizeHandler(resizeBox.value)
      resizers[1] = new ResizeHandler(resizeBox1.value, { transform: true })
      resizers[2] = new ResizeHandler(resizeBox2.value, { transform: true })
      resizers[3] = new ResizeHandler(resizeBox3.value, { transform: 'offset' })
      resizers[4] = new ResizeHandler(resizeBox4.value, { transform: 'offset' })
      resizers[5] = new ResizeHandler(resizeBox5.value, { geometric: true })
      resizers[6] = new ResizeHandler(resizeBox6.value, {
        transform: true,
        geometric: true,
        callback: onece(fixedParent)// once只执行第一次
      })
    })
    onBeforeUnmount(() => {
      resizers.forEach(r => {
        r.off()
      })
    })
    return {
      attrs,
      codes,
      script,
      scriptCode,
      scrollToScript,
      resizeBox,
      resizeBox1,
      resizeBox2,
      resizeBox3,
      resizeBox4,
      resizeBox5,
      resizeBox6,
      directiveCallBack
    }
  }
}
</script>

<style scoped lang="less">
.Resizer{
  .box-container{
    position: relative;
    min-height: 100px;
    .resize-box{
      width: 100px;
      height:100px;
      background-color: gray;
    }
    .resize-box-absolute{
      width: 100px;
      height:100px;
      background-color: gray;
      position: absolute;
    }
    .translated{
      transform: translate(100px,0px);
    }
  }
}
</style>
