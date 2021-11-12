export default {
  base: '<div ref="box" class="box" @click="changeSize($event,200)" />',
  directive: '<div v-resizeDetect="{callback:showMessage}" class="box" @click="changeSize($event,200)" />',
  script: `<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import ResizeDetector from 'xl-ui-vue/utils/ResizeDetector'
import Message from 'xl-ui-vue/components/message'
import resizeDetect from 'xl-ui-vue/directives/resizeDetect'
export default {
  directives: { resizeDetect },
  setup () {
    function changeSize (e, size) {
      if (parseFloat(e.target.style.width) === size) {
        e.target.style.width = '100px'
        e.target.style.height = '100px'
      } else {
        e.target.style.width = \`\${size}px\`
        e.target.style.height = \`\${size}px\`
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
</style>`
}
