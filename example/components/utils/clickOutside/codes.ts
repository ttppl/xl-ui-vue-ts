export default {
  base: `<h3>点击元素内外面改变元素颜色</h3>
<div ref="clickOutsideBox" class="box" @click="changeColor" />`,
  directive: `<XlButton @click="show=true">点击显示元素</XlButton>
<XlCollapse>
  <div v-show="show" v-clickoutside="()=>{show=false}" class="box">
    点击元素外隐藏元素
  </div>
</XlCollapse>`,
  script: `<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import ClickOutside from 'xl-ui-vue/utils/clickOutside'
import clickoutside from 'xl-ui-vue/directives/clickOutside'
export default {
  directives: { clickoutside },
  setup () {
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
</style>`
}
