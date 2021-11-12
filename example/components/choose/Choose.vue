<template>
  <div class="Choose">
    <h1>选择按钮</h1>
    <h1>Choose属性</h1>
    <AttrTable :attrs="attrs" />
    <h1>ChooseGroup属性</h1>
    <AttrTable :attrs="groupAttrs" />
    <XlCategory title="目录" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <h2>基本使用</h2>
      <XlCategoryItem title="基本使用">
        <ExampleForm>
          <h3>分组</h3>
          <div class="options">
            <div class="item">
              <p>图标风格</p>
              <XlSelect v-model="iconType" placeholder="选择图标风格" :show-clear="false">
                <XlSelectOption value="primary" />
                <XlSelectOption value="warn" />
                <XlSelectOption value="notice" />
                <XlSelectOption value="error" />
                <XlSelectOption value="success" />
              </XlSelect>
            </div>
            <div class="item">
              <p>图标类型</p>
              <XlChooseGroup v-model="icon" :inline="false">
                <XlChoose value="checkbox" />
                <XlChoose value="radio" />
              </XlChooseGroup>
            </div>
            <div class="item">
              <p>浅色风格</p>
              <XlChoose v-model="lightStyle" :enable-cancle="()=>false" label="浅色" :value="true" />
            </div>
            <div class="item">
              <p>label位置</p>
              <XlChooseGroup v-model="labelPosition" :inline="false">
                <XlChoose value="left" />
                <XlChoose value="right" />
              </XlChooseGroup>
            </div>
            <div class="item">
              <p>行内显示</p>
              <XlChoose v-model="inline" :enable-cancle="()=>false" label="inline" :value="true" />
            </div>
            <div class="item">
              <p>显示图标</p>
              <XlChoose v-model="showIcon" :enable-cancle="()=>false" label="图标" :value="true" />
            </div>
          </div>
          <p>绑定值：{{ value }}</p>
          <p>多选</p>
          <XlChooseGroup v-model="value" :show-icon="showIcon" :inline="inline" :light-style="lightStyle"
                         :label-position="labelPosition" :icon-type="icon" :icon-style-type="iconType"
                         type="checkbox">
            <XlChoose value="option1" />
            <XlChoose value="option2" />
            <XlChoose value="option3" />
          </XlChooseGroup>
          <p>单选：</p>
          <XlChooseGroup v-model="value" :show-icon="showIcon" :inline="inline" :light-style="lightStyle"
                         :label-position="labelPosition" :icon-type="icon" :icon-style-type="iconType"
                         type="radio">
            <XlChoose value="option1" />
            <XlChoose value="option2" />
            <XlChoose value="option3" />
          </XlChooseGroup>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.group }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="单独使用">
        <ExampleForm>
          <h3>单独使用</h3>
          <p>绑定值:{{ value2 }}</p>
          <XlChoose v-model="value2" value="option1">
            我是自定义label1
          </XlChoose>
          <XlChoose v-model="value2" value="option2">
            我是自定义label2
          </XlChoose>
          <XlChoose v-model="value2" value="option3">
            我是自定义label3
          </XlChoose>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.single }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="自定义label">
        <ExampleForm>
          <h3>自定义label</h3>
          <p>绑定值:{{ value3 }}</p>
          <XlChooseGroup v-model="value3" type="radio">
            <XlChoose value="option1">
              我是自定义label1
            </XlChoose>
            <XlChoose value="option2">
              我是自定义label2
            </XlChoose>
            <XlChoose value="option3">
              我是自定义label3
            </XlChoose>
          </XlChooseGroup>
          <h4>完全自定义label(去除icon)</h4>
          <XlChooseGroup v-model="value3" class="slot-choose-group" :show-icon="false">
            <XlChoose class="slot-choose" value="option1">
              <div class="label">我是自定义label1</div>
            </XlChoose>
            <XlChoose class="slot-choose" value="option2">
              <div class="label">我是自定义label2</div>
            </XlChoose>
            <XlChoose class="slot-choose" value="option3">
              <div class="label">我是自定义label3</div>
            </XlChoose>
          </XlChooseGroup>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.label }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="禁用与最大选择项">
        <ExampleForm>
          <h3>禁用与最大选择项</h3>
          <p>绑定值:{{ value4 }}</p>
          <XlChooseGroup v-model="value4" type="checkbox" :max="2">
            <XlChoose value="option1" />
            <XlChoose value="option2" />
            <XlChoose value="option3" />
            <XlChoose value="option4" />
            <XlChoose value="option5" label="禁用项" disabled />
          </XlChooseGroup>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.disabledAndMax }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="默认选中">
        <ExampleForm>
          <h3>默认选中</h3>
          <p>绑定值:{{ value5 }}</p>
          <XlChooseGroup v-model="value5" type="checkbox">
            <XlChoose value="option1" />
            <XlChoose value="option2" checked />
            <XlChoose value="option3" />
            <XlChoose value="option4" />
          </XlChooseGroup>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.checked }}
            </code>
            <XlButton @click.capture="scrollToScript">查看script/style</XlButton>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <h2>事件</h2>
      <EventTable :events="events" />
      <XlCategoryItem title="事件">
        <ExampleForm>
          <h3>基本事件(Choose与ChooseGroup一致)</h3>
          <p class="event-output">事件回调：{{ eventOutput }}</p>
          <template v-for="evt in eventNames" :key="`event${evt}}`">
            <h3>{{ evt }}事件</h3>
            <XlChooseGroup type="radio" @[evt]="event(evt,$event)">
              <XlChoose value="option1" />
              <XlChoose value="option2" />
              <XlChoose value="option3" />
            </XlChooseGroup>
          </template>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.events }}
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
import attrs, { groupAttrs } from './attrs'
import events from './events'
export default {
  name: 'Select',
  setup () {
    const script = ref(null)
    const scriptCode = ref(null)
    function scrollToScript () {
      script.value.scrollInView()
      scriptCode.value.show()
    }

    const iconType = ref('primary')
    const lightStyle = ref(false)
    const icon = ref('checkbox')
    const labelPosition = ref('right')
    const inline = ref(true)
    const showIcon = ref(true)
    const value = ref('option1')
    const value2 = ref('option1')
    const value3 = ref('option1')
    const value4 = ref([])
    const value5 = ref('')
    const eventOutput = ref('')
    const eventNames = ['label-click', 'change']
    function event (name, args) {
      eventOutput.value = `event ${name} triggered,arguments: ${JSON.stringify(args)}`
    }
    return {
      script,
      scriptCode,
      scrollToScript,
      attrs,
      groupAttrs,
      events,
      iconType,
      lightStyle,
      icon,
      labelPosition,
      inline,
      showIcon,
      codes,
      value,
      value2,
      value3,
      value4,
      value5,
      eventOutput,
      event,
      eventNames
    }
  }
}
</script>

<style scoped lang="less">
.Choose{
  .options{
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-right: 20px;
    }
  }
  .slot-choose-group{//group样式，没有group可用任何container代替
    border-radius: 6px;
    overflow: hidden;
    border:1px solid #c0c4cc;
    .slot-choose{//label基本样式
      background-color: white;
      border-right: 1px solid #c0c4cc;
      &:last-child{
        border:none;
      }
      @height:50px;
      height:@height;
      line-height: @height;
      width: 200px;
      text-align: center;
      &[checked="true"]{//选中后的样式
        background-color: #A9C6EE;
        color:white;
      }
    }
  }
  .event-output{
    color: red;
  }
}
</style>
