<template>
  <div class="Card">
    <h1>卡片</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="类型">
        <ExampleForm>
          <h3>类型</h3>
          <div class="options">
            <div class="item">
              <p>风格类型</p>
              <XlSelect v-model="type" placeholder="选择类型" :show-clear="false">
                <XlSelectOption value="primary" />
                <XlSelectOption value="warn" />
                <XlSelectOption value="notice" />
                <XlSelectOption value="error" />
                <XlSelectOption value="success" />
              </XlSelect>
            </div>
            <div class="item">
              <p>浅色风格</p>
              <XlChooseGroup v-model="lightStyle">
                <XlChoose label="浅色" :enable-cancle="()=>false" :value="true" />
              </XlChooseGroup>
            </div>
          </div>
          <XlCard class="card" :type="type" :light-style="lightStyle" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.type }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="size">
        <ExampleForm>
          <h3>设置宽高</h3>
          <div class="options">
            <div class="item">
              <XlSelect placeholder="选择宽高" :show-clear="false" @after-select="selectWH">
                <XlSelectOption value="1,1" label="width:100%,height:100%" />
                <XlSelectOption value="0.5,1" label="width:50%,height:100%" />
                <XlSelectOption value="200,200" label="width:200px,height:200px" />
                <XlSelectOption value="0.5,200" label="width:50%,height:200px" />
              </XlSelect>
            </div>
          </div>
          <XlCard class="card" :width="width" :height="height" />
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.size }}
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
import { ref } from 'vue'
import codes from './codes'
import attrs from './attrs'
export default {
  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }

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
      script,
      scriptCode,
      scrollToScript,
      attrs,
      codes,
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
</style>
