<template>
  <div class="Popover">
    <h1>弹框</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem title="弹出位置">
        <ExampleForm>
          <h3>弹出位置</h3>
          <p>可设置位置left, right, top, bottom（默认）</p>
          <div class="popovers">
            <XlPopover position="left" to-body inline>
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
              {{ codes.position }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="触发方式">
        <ExampleForm>
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
              {{ codes.trigger }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="大小设置">
        <ExampleForm>
          <h3>设置宽高</h3>
          <p>接受数字和字符串，其中数字0-1之间的值会转换成百分比</p>
          <div class="popovers">
            <XlPopover inline>
              <template #reference><XlButton>auto</XlButton></template>
              <p>默认根据元素自适应宽高</p>
            </XlPopover>
            <XlPopover inline to-body>
              <template #reference><XlButton>auto(toBody)</XlButton></template>
              <p>toBody,默认根据元素自适应宽高</p>
            </XlPopover>
            <XlPopover width="200" height="200" inline>
              <template #reference><XlButton type="warn">width:200,height:200</XlButton></template>
              宽度200px，高度200px
            </XlPopover>
            <XlPopover width="1" height="200" always-in-view inline>
              <template #reference><XlButton type="primary">width:1(100%),height:200</XlButton></template>
              宽度100%，高度200px
            </XlPopover>
            <XlPopover width="1" height="200" to-body always-in-view inline>
              <template #reference><XlButton type="primary">toBody，width:1(100%),height:200</XlButton></template>
              toBody,宽度100%，高度200px
            </XlPopover>
            <XlPopover width="100" height="1" always-in-view inline>
              <template #reference><XlButton type="primary">width:100,height:1(100%)</XlButton></template>
              宽度100px，高度100%
            </XlPopover>
            <XlPopover width="100" height="1" to-body always-in-view inline>
              <template #reference><XlButton type="primary">toBody，width:100,height:1(100%)</XlButton></template>
              toBody,宽度100px，高度100%
            </XlPopover>
          </div>
          <p>设置最大 / 最小值</p>
          <div class="popovers">
            <XlPopover :pop-style="{padding:0}" inline max-width="400" max-height="400" to-body>
              <template #reference><XlButton>max-height:400,max-height:400</XlButton></template>
              <div class="box" :style="{width:'600px',height:'600px',backgroundColor:'#C7F8FF'}">
                <div class="absolute-center">
                  <p>box-size:600*600,超出最大值显示滚动条</p>
                  <XlButton inline @click="shrinkBox">点击缩小box</XlButton>
                  <XlButton inline type="primary" @click="enlargeBox">点击放大box</XlButton>
                </div>
              </div>
            </XlPopover>
            <XlPopover :pop-style="{padding:0}" inline min-width="400" min-height="400" to-body>
              <template #reference><XlButton>min-height:400,min-height:400</XlButton></template>
              <div class="box" :style="{width:'600px',height:'600px',backgroundColor:'#C7F8FF'}">
                <div class="absolute-center">
                  <p>box-size:600*600,超出会撑大弹出框</p>
                  <XlButton inline @click="shrinkBox">点击缩小box</XlButton>
                  <XlButton inline type="primary" @click="enlargeBox">点击放大box</XlButton>
                </div>
              </div>
            </XlPopover>
            <XlPopover :pop-style="{padding:0}" inline max-width="500" max-height="500" min-width="400" min-height="400" to-body>
              <template #reference><XlButton>max-height:500,max-height:500，min-height:400,min-height:400</XlButton></template>
              <div class="box" :style="{width:'600px',height:'600px',backgroundColor:'#C7F8FF'}">
                <div class="absolute-center">
                  <p>box-size:600*600,同时设置最大最小值</p>
                  <XlButton inline @click="shrinkBox">点击缩小box</XlButton>
                  <XlButton inline type="primary" @click="enlargeBox">点击放大box</XlButton>
                </div>
              </div>
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.size }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="偏移设置">
        <ExampleForm>
          <h3>相对自身偏移</h3>
          <p>offset(正数为右，负数为左)</p>
          <div class="popovers">
            <XlPopover :show-arrow="false" to-body offset="-200" inline>
              <template #reference><XlButton>offset="-200"</XlButton></template>
              <p class="flex-jc-start">向左偏移200</p>
            </XlPopover>
            <XlPopover :show-arrow="false" offset="200" inline>
              <template #reference><XlButton>offset="200"</XlButton></template>
              <p class="flex-jc-start">向右偏移200</p>
            </XlPopover>
          </div>
          <h3>相对父元素偏移</h3>
          <p>offsetParent(正数远离，负数靠近)</p>
          <div class="popovers">
            <XlPopover :show-arrow="false" offset-parent="-20" inline>
              <template #reference><XlButton>offset-parent="-20"</XlButton></template>
              <p class="flex-jc-start">向父元素靠近偏移20</p>
            </XlPopover>
            <XlPopover :show-arrow="false" offset-parent="20" inline>
              <template #reference><XlButton>offset-parent="20"</XlButton></template>
              <p class="flex-jc-start">向父元素远离偏移20</p>
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.offset }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="自定义style">
        <ExampleForm>
          <h3>自定义style</h3>
          <p>pop-style:Object</p>
          <div class="popovers">
            <XlPopover :pop-style="{backgroundImage:'linear-gradient(to right bottom, #31EA41 , #ED9ADB)'}" inline>
              <template #reference><XlButton>背景渐变</XlButton></template>
              <p class="flex-jc-start">自定义渐变背景</p>
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.popStyle }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem title="overflow滚动">
        <ExampleForm>
          <h3>overflow滚动</h3>
          <p>内容溢出后自动滚动</p>
          <div class="popovers">
            <XlPopover position="top" to-body height="400" width="400" inline>
              <template #reference><XlButton>overflow-y</XlButton></template>
              <p>琵琶行</p>
              <br>
              <p>白居易 〔唐代〕</p>
              <br>
              <p>元和十年，予左迁九江郡司马。明年秋，送客湓浦口，闻舟中夜弹琵琶者，听其音，铮铮然有京都声。问其人，本长安倡女，尝学琵琶于穆、曹二善才，年长色衰，委身为贾人妇。遂命酒，使快弹数曲。曲罢悯然，自叙少小时欢乐事，今漂沦憔悴，转徙于江湖间。予出官二年，恬然自安，感斯人言，是夕始觉有迁谪意。因为长句，歌以赠之，凡六百一十六言，命曰《琵琶行》。</p>
              <br>
              <p>浔阳江头夜送客，枫叶荻花秋瑟瑟。</p>
              <p>主人下马客在船，举酒欲饮无管弦。</p>
              <p>醉不成欢惨将别，别时茫茫江浸月。</p>
              <br>
              <p>忽闻水上琵琶声，主人忘归客不发。</p>
              <p>寻声暗问弹者谁，琵琶声停欲语迟。</p>
              <p>移船相近邀相见，添酒回灯重开宴。</p>
              <p>千呼万唤始出来，犹抱琵琶半遮面。</p>
              <p>转轴拨弦三两声，未成曲调先有情。</p>
              <p>弦弦掩抑声声思，似诉平生不得志。</p>
              <p>低眉信手续续弹，说尽心中无限事。</p>
              <p>轻拢慢捻抹复挑，初为《霓裳》后《六幺》。(六幺 一作：绿腰)</p>
              <p>大弦嘈嘈如急雨，小弦切切如私语。</p>
              <p>嘈嘈切切错杂弹，大珠小珠落玉盘。</p>
              <p>间关莺语花底滑，幽咽泉流冰下难。</p>
              <p>冰泉冷涩弦凝绝，凝绝不通声暂歇。(暂歇 一作：渐歇)</p>
              <p>别有幽愁暗恨生，此时无声胜有声。</p>
              <p>银瓶乍破水浆迸，铁骑突出刀枪鸣。</p>
              <p>曲终收拨当心画，四弦一声如裂帛。</p>
              <p>东船西舫悄无言，唯见江心秋月白。</p>
              <br>
              <p>沉吟放拨插弦中，整顿衣裳起敛容。</p>
              <p>自言本是京城女，家在虾蟆陵下住。</p>
              <p>十三学得琵琶成，名属教坊第一部。</p>
              <p>曲罢曾教善才服，妆成每被秋娘妒。(服 一作：伏)</p>
              <p>五陵年少争缠头，一曲红绡不知数。</p>
              <p>钿头银篦击节碎，血色罗裙翻酒污。(银篦 一作：云篦)</p>
              <p>今年欢笑复明年，秋月春风等闲度。</p>
              <p>弟走从军阿姨死，暮去朝来颜色故。</p>
              <p>门前冷落鞍马稀，老大嫁作商人妇。</p>
              <p>商人重利轻别离，前月浮梁买茶去。</p>
              <p>去来江口守空船，绕船月明江水寒。</p>
              <p>夜深忽梦少年事，梦啼妆泪红阑干。</p>
              <br>
              <p>我闻琵琶已叹息，又闻此语重唧唧。</p>
              <p>同是天涯沦落人，相逢何必曾相识！</p>
              <p>我从去年辞帝京，谪居卧病浔阳城。</p>
              <p>浔阳地僻无音乐，终岁不闻丝竹声。</p>
              <p>住近湓江地低湿，黄芦苦竹绕宅生。</p>
              <p>其间旦暮闻何物？杜鹃啼血猿哀鸣。</p>
              <p>春江花朝秋月夜，往往取酒还独倾。</p>
              <p>岂无山歌与村笛，呕哑嘲哳难为听。</p>
              <p>今夜闻君琵琶语，如听仙乐耳暂明。</p>
              <p>莫辞更坐弹一曲，为君翻作《琵琶行》。</p>
              <br>
              <p>感我此言良久立，却坐促弦弦转急。</p>
              <p>凄凄不似向前声，满座重闻皆掩泣。</p>
              <p>座中泣下谁最多？江州司马青衫湿。</p>
            </XlPopover>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.overflow }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>
      <XlCategoryItem class="position" title="script,style">
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
import { ref, reactive } from 'vue'
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'Popover',

  nameSpace: 'Popover',

  components: {
  },

  props: {
  },

  setup (props, ctx) {
    const manualTriger = ref(false)
    const shrinkBox = (e) => {
      const el = findBox(e.target)
      if (el) {
        el.style.width = '300px'
        el.style.height = '300px'
      }
    }
    const enlargeBox = (e) => {
      const el = findBox(e.target)
      if (el) {
        el.style.width = '600px'
        el.style.height = '600px'
      }
    }
    const findBox = (el) => {
      if (el.className?.includes('box')) {
        return el
      } else if (el.parentNode) {
        return findBox(el.parentNode)
      }
    }
    return {
      attrs,
      codes,
      manualTriger,
      shrinkBox,
      enlargeBox
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
.absolute-center{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>
