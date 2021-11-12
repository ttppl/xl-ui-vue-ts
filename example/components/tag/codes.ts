export default {
  position: `<div class="tags">
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
</div>`,
  offset: `<div class="tags">
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
</div>`,
  type: `<div class="tags">
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
</div>`,
  tagSlot: `<div class="tags">
  <XlTag :offset="{right:20,top:50}" class="diy-tag">
    <template #tag>
      <XlIcon color="red" size="50" /><span class="label">100+</span>
    </template>
    <img class="logo" :src="logo">
  </XlTag>
</div>`,
  script: `<style scoped lang="less">
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
</style>`
}
