export default {
  type: `<h3>类型</h3>
<XlSelect v-model="type" placeholder="选择类型">
  <XlSelectOption value="primary" />
  <XlSelectOption value="warn" />
  <XlSelectOption value="notice" />
  <XlSelectOption value="error" />
  <XlSelectOption value="success" />
</XlSelect>
<XlChooseGroup v-model="lightStyle" type="checkBox">
  <XlChoose label="浅色风格" :enable-cancle="()=>false" :value="true" />
</XlChooseGroup>
<XlCard class="card" :type="type" :light-style="lightStyle" />`,
  size: `<div class="options">
  <div class="item">
    <XlSelect placeholder="选择宽高" :show-clear="false" @after-select="selectWH">
      <XlSelectOption value="1,1" label="width:100%,height:100%" />
      <XlSelectOption value="0.5,1" label="width:50%,height:100%" />
      <XlSelectOption value="200,200" label="width:200px,height:200px" />
      <XlSelectOption value="0.5,200" label="width:50%,height:200px" />
    </XlSelect>
  </div>
</div>
<XlCard class="card" :width="width" :height="height" />`,
  script: `<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup () {
    const type = ref('primary')
    const lightStyle = ref(false)

    const width = ref(0)
    const height = ref(0)
    function selectWH (v) {
      const size = v.split(',')
      width.value = size[0]
      height.value = size[1]
    }
    return {
      type,
      lightStyle,
      width,
      height,
      selectWH
    }
  }
}
</script>
<style scoped lang="less">
.Card{
  .card{
    margin: 20px 0;
  }
  .options{
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-right: 20px;
    }
  }
}
</style>`
}
