export default {
  pattern: `<XlSelect placeholder="单选">
  <XlSelectOption value="item" />
  <XlSelectOption value="item1" />
  <XlSelectOption value="item2" />
  <XlSelectOption value="item3" />
</XlSelect>
<XlSelect placeholder="多选" multi-select>
  <XlSelectOption value="item" />
  <XlSelectOption value="item1" />
  <XlSelectOption value="item2" />
  <XlSelectOption value="item3" />
  <XlSelectOption value="item4" />
  <XlSelectOption value="item5" />
  <XlSelectOption value="item6" />
  <XlSelectOption value="item7" />
  <XlSelectOption value="item8" />
</XlSelect>`,
  defaultStyle: `<template>
  <XlSelect v-model="selectType" :type="selectType">
    <XlSelectOption :type="selectType" value="primary" />
    <XlSelectOption :type="selectType" value="warn" />
    <XlSelectOption :type="selectType" value="notice" />
    <XlSelectOption :type="selectType" value="error" />
    <XlSelectOption :type="selectType" value="success" />
  </XlSelect>
  <XlSelect v-model="selectType" :type="selectType" light-style>
    <XlSelectOption :type="selectType" value="primary" />
    <XlSelectOption :type="selectType" value="warn" />
    <XlSelectOption :type="selectType" value="notice" />
    <XlSelectOption :type="selectType" value="error" />
    <XlSelectOption :type="selectType" value="success" />
  </XlSelect>
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
import attrs from './attrs'
export default {
  name: 'Select',
  setup () {
    const selectType = ref('primary')
    
    return {
      selectType
    }
  }
}
</script>`,
  size: `<template>
  <p>内置default，small，large三种大小</p>
  <XlSelect v-model="selectSize" :size="selectSize" placeholder="下拉选择size">
    <XlSelectOption value="" label="default" />
    <XlSelectOption value="small" />
    <XlSelectOption value="large" />
  </XlSelect>
  <p>width，height属性：</p>
  <p>自定义设置width，height</p>
  <XlSelect placeholder="下拉选择宽高" :width="selectWidth" :height="selectHeight" :inline="selectInline" @after-select="changeSize">
    <XlSelectOption value="400,60" label="width:400,height:60" />
    <XlSelectOption value="1,80" label="width:1,height:80,inline" />
    <XlSelectOption value="1,80,true" label="width:1,height:80,notInline" />
    <XlSelectOption value="400,1" label="width:400,height:1" />
    <XlSelectOption value="200,200" label="width:200,height:200" />
    <XlSelectOption value="1,1" label="width:1,height:1" />
  </XlSelect>
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup () {
    const selectSize = ref('')
    const selectWidth = ref(400)
    const selectHeight = ref(60)
    const selectInline = ref('true')
    const changeSize = (selected, selectItem) => {
      const size = selectItem.split(',')
      selectWidth.value = size[0]
      selectHeight.value = size[1]
      if (size[2]) {
        selectInline.value = false
      } else {
        selectInline.value = true
      }
    }
    return {
      selectSize,
      changeSize,
      selectWidth,
      selectHeight,
      selectInline
    }
  }
}
</script>`,
  script: `<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup () {
    const selectType = ref('primary')
    const selectSize = ref('')
    const selectWidth = ref(400)
    const selectHeight = ref(60)
    const selectInline = ref('true')
    const changeSize = (selected, selectItem) => {
      const size = selectItem.split(',')
      selectWidth.value = size[0]
      selectHeight.value = size[1]
      if (size[2]) {
        selectInline.value = false
      } else {
        selectInline.value = true
      }
    }
    return {
      selectType,
      selectSize,
      changeSize,
      selectWidth,
      selectHeight,
      selectInline
    }
  }
}
</script>

<style scoped lang="less">
.Select{
  .selects{
    >*{
      margin-bottom: 10px;
      margin-right: 20px;
    }
  }
}
</style>`
}
