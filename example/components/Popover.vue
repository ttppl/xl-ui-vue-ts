<template>
  <div class="Popover">
    <h1>弹框</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="弹出位置">
        <ExampleForm name="position">
          <h3>弹出位置</h3>
          <p>可设置位置left, right, top, bottom（默认）</p>
          <div class="popovers">
            <XlPopover position="left" inline>
              <template #reference><XlButton>left</XlButton></template>
              left弹框
            </XlPopover>
            <XlPopover position="right" inline>
              <template #reference><XlButton type="warn">right</XlButton></template>
              right弹框
            </XlPopover>
            <XlPopover position="bottom" inline>
              <template #reference><XlButton type="primary">bottom</XlButton></template>
              bottom弹框
            </XlPopover>
            <XlPopover position="top" inline>
              <template #reference><XlButton type="success">top</XlButton></template>
              top弹框
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ `<XlPopover position="left" inline>
                \n  <template #reference><XlButton>left</XlButton></template>
                \n  left弹框
                \n</XlPopover>
              \n<XlPopover position="right" inline>
                \n  <template #reference><XlButton type="warn">right</XlButton></template>
                \n  right弹框
                \n</XlPopover>
              \n<XlPopover position="bottom" inline>
                \n  <template #reference><XlButton type="primary">bottom</XlButton></template>
                \n  bottom弹框
                \n</XlPopover>
              \n<XlPopover position="top" inline>
                \n  <template #reference><XlButton type="success">top</XlButton></template>
                \n  top弹框
                \n</XlPopover>` }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="触发方式">
        <ExampleForm name="trigger">
          <h3>触发方式</h3>
          <p>click（默认），hover，manual</p>
          <div class="popovers">
            <XlPopover trigger="click" inline>
              <template #reference><XlButton>click</XlButton></template>
              click触发弹框
            </XlPopover>
            <XlPopover trigger="hover" inline>
              <template #reference><XlButton type="warn">hover</XlButton></template>
              hover触发弹框
            </XlPopover>
            <XlPopover v-model="manualTriger" trigger="manual" inline>
              <template #reference><XlButton type="primary" @click="manualTriger=!manualTriger">manul</XlButton></template>
              manul触发弹框
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ `<template>
                \n  <XlPopover trigger="click" inline>
                  \n    <template #reference><XlButton>click</XlButton></template>
                  \n    click触发弹框
                  \n  </XlPopover>
                \n  <XlPopover trigger="hover" inline>
                  \n    <template #reference><XlButton type="warn">hover</XlButton></template>
                  \n    hover触发弹框
                  \n  </XlPopover>
                \n  <XlPopover v-model="manualTriger" trigger="manual" inline>
                  \n    <template #reference><XlButton type="primary" @click="manualTriger=!manualTriger">manul</XlButton></template>
                  \n    manul触发弹框
                  \n  </XlPopover>
                \n</template>
              \n<script type="text/ecmascript-6">
                \nimport { ref } from 'vue'
                \nexport default {
                \n  setup () {
                \n    const manualTriger = ref(false)
                \n    return {
                \n      manualTriger
                \n    }
                \n  }
                \n}
                \n</script>` }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="大小设置">
        <ExampleForm name="size">
          <h3>设置宽高</h3>
          <p>接受数字和字符串，其中数字0-1之间的值会转换成百分比</p>
          <div class="popovers">
            <XlPopover inline>
              <template #reference><XlButton>auto</XlButton></template>
              <p>默认根据元素自适应宽高</p>
            </XlPopover>
            <XlPopover width="200" height="200" inline>
              <template #reference><XlButton type="warn">width:200,height:200</XlButton></template>
              宽度200px，高度200px
            </XlPopover>
            <XlPopover width="1" height="200" always-in-view inline>
              <template #reference><XlButton type="primary">width:1(100%),height:200</XlButton></template>
              宽度100%，高度200px
            </XlPopover>
          </div>
          <p>always-in-view强制显示元素在窗口内</p>
          <div class="popovers">
            <XlPopover height="5000" width="5000" inline>
              <template #reference><XlButton>not always-in-view</XlButton></template>
              <p class="flex-jc-start">宽5000px，高5000px会溢出屏幕外</p>
            </XlPopover>
            <XlPopover width="5000" height="5000" always-in-view inline>
              <template #reference><XlButton type="primary">always-in-view</XlButton></template>
              <div class="flex-center">设置always-in-view，元素溢出屏幕会重置宽高，宽5000px，高5000px不会溢出屏幕外</div>
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ `<p>接受数字和字符串，其中数字0-1之间的值会转换成百分比</p>
              \n<div class="popovers">
                \n  <XlPopover inline>
                  \n    <template #reference><XlButton>auto</XlButton></template>
                  \n    <p>默认根据元素自适应宽高</p>
                  \n  </XlPopover>
                \n  <XlPopover width="200" height="200" inline>
                  \n    <template #reference><XlButton type="warn">width:200,height:200</XlButton></template>
                  \n    宽度200px，高度200px
                  \n  </XlPopover>
                \n  <XlPopover width="1" height="200" always-in-view inline>
                  \n    <template #reference><XlButton type="primary">width:1(100%),height:200</XlButton></template>
                  \n    宽度100%，高度200px
                  \n  </XlPopover>
                \n</div>
              \n<p>always-in-view强制显示元素在窗口内</p>
              \n<div class="popovers">
                \n  <XlPopover height="5000" width="5000" inline>
                  \n    <template #reference><XlButton>not always-in-view</XlButton></template>
                  \n    <p class="flex-jc-start">宽5000px，高5000px会溢出屏幕外</p>
                  \n  </XlPopover>
                \n  <XlPopover width="5000" height="5000" always-in-view inline>
                  \n    <template #reference><XlButton type="primary">always-in-view</XlButton></template>
                  \n    <div class="flex-center">设置always-in-view，元素溢出屏幕会重置宽高，宽5000px，高5000px不会溢出屏幕外</div>
                  \n  </XlPopover>
                \n</div>` }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
    </XlCategory>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
export default {
  name: 'Popover',

  nameSpace: 'Popover',

  components: {
  },

  props: {
  },

  setup (props, ctx) {
    const manualTriger = ref(false)
    return {
      manualTriger
    }
  }

}
</script>

<style scoped lang="less">
@rowGap:20px;//行间距
.Popover{
  .popovers{
    display: flex;
    flex-flow: wrap;
    margin-bottom: -@rowGap;
    /deep/.XlPopover{
      margin-right: 60px;
      margin-bottom:@rowGap;
    }
  }
}
.flex-center{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-jc-start{
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
