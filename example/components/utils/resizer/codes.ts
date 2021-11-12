export default {
  base: `<h4>拖动元素边缘缩放元素大小(单纯改变大小，不进行其他操作)</h4>
<div class="box-container">
  <div ref="resizeBox" class="resize-box" />
</div>`,
  positionChange: `<h4>根据元素大小变化元素位置（改变transform）</h4>
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
</div>`,
  geometric: `<h4>等比例缩放（默认位置会发生改变，同上建议使用在absolute元素上）</h4>
<div class="box-container">
  <div ref="resizeBox5" class="resize-box-absolute translated" />
</div>`,
  callback: `<h4>回调函数解决元素位移问题（手动给元素设置定位）</h4>
<div class="box-container">
  <div ref="resizeBox6" class="resize-box translated" />
</div>`,
  directive: `<div class="box-container">
  <div v-resize="{geometric:true,callback:directiveCallBack}" class="resize-box translated" />
</div>`,
  script: `<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import ResizeHandler from 'xl-ui-vue/utils/resizeHandler'
import { getElementSize, setPositioned, setStyle } from 'xl-ui-vue/utils/dom'
import { onece } from 'xl-ui-vue/utils/common'
import resize from 'xl-ui-vue/directives/resize'
export default {
  directives: { resize },

  setup () {
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
      setStyle(el.parentNode, 'height', \`\${size.height}px\`)
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
</style>`
}
