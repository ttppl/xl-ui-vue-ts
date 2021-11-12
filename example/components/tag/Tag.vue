<template>
  <div class="Tag">
    <h1>标签</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem class="content" title="position 位置">
        <ExampleForm>
          <h3>tag位置</h3>
          <p>left，right，top，bottom自由组合</p>
          <div class="tags">
            <XlTag label="2000">
              <XlButton plain type="primary">right-top</XlButton>
            </XlTag>
            <XlTag label="2000" position="left-top">
              <XlButton plain type="primary">left-top</XlButton>
            </XlTag>
            <XlTag label="2000" position="right-bottom">
              <XlButton plain type="primary">right-bottom</XlButton>
            </XlTag>
            <XlTag label="2000" position="left-bottom">
              <XlButton plain type="primary">left-bottom</XlButton>
            </XlTag>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.position }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="content" title="offset 位置调整">
        <ExampleForm>
          <h3>offset</h3>
          <p>{left？，right？，top？，bottom？},属性与position对应</p>
          <div class="tags">
            <XlTag label="2000" :offset="{top:'50%',right:-20}">
              <XlButton plain type="primary">top-right({top:'50%',right:-20})</XlButton>
            </XlTag>
            <XlTag label="2000" position="left-top" :offset="{top:'10%',left:20}">
              <XlButton plain type="primary">left-top({top:'10%',left:20})</XlButton>
            </XlTag>
            <XlTag label="2000" position="right-bottom" :offset="{bottom:-10,right:40}">
              <XlButton plain type="primary">right-bottom({bottom:-10,right:40})</XlButton>
            </XlTag>
            <XlTag label="2000" position="left-bottom" :offset="{bottom:'50%',left:'50%'}">
              <XlButton plain type="primary">left-bottom({bottom:'50%',left:'50%'})</XlButton>
            </XlTag>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.offset }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="content" title="type 类型">
        <ExampleForm>
          <h3>风格类型</h3>
          <p>default，primary，warn，notice，error，success</p>
          <div class="tags">
            <XlTag label="1000+">
              <XlButton plain type="primary">default</XlButton>
            </XlTag>
            <XlTag label="1000+" type="primary">
              <XlButton plain type="primary">primary</XlButton>
            </XlTag>
            <XlTag label="1000+" type="warn">
              <XlButton plain type="primary">warn</XlButton>
            </XlTag>
            <XlTag label="1000+" type="notice">
              <XlButton plain type="primary">notice</XlButton>
            </XlTag>
            <XlTag label="1000+" type="error">
              <XlButton plain type="primary">error</XlButton>
            </XlTag>
            <XlTag label="1000+" type="success">
              <XlButton plain type="primary">success</XlButton>
            </XlTag>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.type }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="content" title="slot 自定义内容">
        <ExampleForm>
          <h3>自定义内容</h3>
          <p>slot #tag</p>
          <div class="tags">
            <XlTag :offset="{right:20,top:50}" class="diy-tag">
              <template #tag>
                <XlIcon color="red" size="50" /><span class="label">100+</span>
              </template>
              <img class="logo" :src="logo">
            </XlTag>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.tagSlot }}
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
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'Tag',

  nameSpace: 'Tag',

  components: {
  },

  props: {
  },

  setup (props, ctx) {
    return {
      attrs,
      codes
    }
  }

}
</script>

<style scoped lang="less">
.Tag{
  text-align: left;
  .tags{
    /deep/.XlTag{
      margin-right: 70px;
      margin-top: 20px;
    }
    .logo{
      border-radius: 50%;
    }
    .diy-tag{
      .label{
        color: red;
      }
    }
  }
}
</style>
