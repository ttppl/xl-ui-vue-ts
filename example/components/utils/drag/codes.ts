export default {
  base: `<template>
  <h3>拖动元素改变位置(transform位移)</h3>
  <div ref="dragBox" class="drag-box" />
  <h3>拖动元素改变位置（offset定位）</h3>
  <div ref="dragBox1" class="drag-box" />
</template>
<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from 'xl-ui-vue/utils/dragHandler'
export default {
  setup () {
    const dragBox = ref(null)
    const dragBox1 = ref(null)
    const draggers = []
    onMounted(() => {
      draggers[0] = new DragHandler(dragBox.value)
      draggers[1] = new DragHandler(dragBox1.value, { transform: false })
    })
    onBeforeUnmount(() => {
      draggers.forEach(d => {
        d.off()
      })
    })
    return {
      dragBox,
      dragBox1
    }
  }
}
</script>`,
  target: `<template>
  <h4>拖动移动目标元素（建议用于拖动子元素移动父元素）</h4>
  <h4>拖动白块移动整体：</h4>
  <div ref="dragBox2" class="drag-box">
    <div ref="dragBox3" class="drag-box-inner" />
  </div>
</template>
<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from 'xl-ui-vue/utils/dragHandler'
export default {
  setup () {
    const dragBox2 = ref(null)
    const dragBox3 = ref(null)
    onMounted(() => {
      draggers[2] = new DragHandler(dragBox3.value, { target: dragBox2.value })
    })
    onBeforeUnmount(() => {
      draggers.forEach(d => {
        d.off()
      })
    })
    return {
      dragBox2,
      dragBox3
    }
  }
}
</script>`,
  callback: `<template>
  <h4>回调函数改变元素颜色：</h4>
  <div ref="dragBox4" class="drag-box" />
</template>
<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from 'xl-ui-vue/utils/dragHandler'
import { onece } from 'xl-ui-vue/utils/common'
export default {
  setup () {
    const dragBox4 = ref(null)
    const draggers = []
    onMounted(() => {
      draggers[3] = new DragHandler(dragBox4.value, {
        callback: onece(() => {
          dragBox4.value.style.backgroundColor = 'black'
        })
      })
    })
    onBeforeUnmount(() => {
      draggers.forEach(d => {
        d.off()
      })
    })
    return {
      dragBox4
    }
  }
}
</script>`,
  propagation: `<template>
  <h4>父元素设置mousedown事件，改变边框颜色</h4>
  <div ref="boxContainer" class="box-container" @mousedown="containerMouseDownEvent">
    <div ref="dragBox5" class="drag-box" />
  </div>
</template>
<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from 'xl-ui-vue/utils/dragHandler'
export default {
  setup () {
    const dragBox5 = ref(null)
    const boxContainer = ref(null)
    const draggers = []
    onMounted(() => {
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
      dragBox5,
      boxContainer,
      containerMouseDownEvent
    }
  }
}
</script>`,
  directive: `<template>
  <div v-drag class="drag-box" />
</template>
<script type="text/ecmascript-6">
import drag from 'xl-ui-vue/directives/drag'
export default {
  directives: { drag },
}
</script>`,
  script: `<script type="text/ecmascript-6">
import { ref } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import DragHandler from 'xl-ui-vue/utils/dragHandler'
import { onece } from 'xl-ui-vue/utils/common'
import drag from 'xl-ui-vue/directives/drag'
export default {
  directives: { drag },

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
</style>`
}
