<template>
  <div class="Popup-example">
    <h1>滚动条</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <XlCategory title="" :category-style="{width:'250px',paddingLeft:'20px'}" :show-order="false" :fixed="false">
      <XlCategoryItem class="position" title="弹出位置">
        <ExampleForm>
          <h3>弹出位置</h3>
          <p>center（默认），left，right，top，bottom</p>
          <div class="buttons">
            <XlButton label="center" @click="showPopup(1)" />
            <XlPopup v-model="showPop[1]">
              <div class="center">我在页面中心位置</div>
            </XlPopup>
            <XlButton label="left" @click="showPopup(2)" />
            <XlPopup v-model="showPop[2]" direction="left">
              <div class="center">我在页面靠左位置</div>
            </XlPopup>
            <XlButton label="right" @click="showPopup(3)" />
            <XlPopup v-model="showPop[3]" direction="right">
              <div class="center">我在页面靠右位置</div>
            </XlPopup>
            <XlButton label="top" @click="showPopup(4)" />
            <XlPopup v-model="showPop[4]" direction="top">
              <div class="center">我在页面靠上位置</div>
            </XlPopup>
            <XlButton label="bottom" @click="showPopup(5)" />
            <XlPopup v-model="showPop[5]" direction="bottom">
              <div class="center">我在页面靠下位置</div>
            </XlPopup>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.position }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="position" title="设置宽高">
        <ExampleForm>
          <h3>设置宽高</h3>
          <p>width，height，接收Number（1-0为百分比），String</p>
          <div class="buttons">
            <XlButton label="center width:100%" @click="showPopup(201)" />
            <XlPopup v-model="showPop[201]" :width="1">
              <div class="center">宽度100%</div>
            </XlPopup>
            <XlButton label="center height:100%" @click="showPopup(202)" />
            <XlPopup v-model="showPop[202]" :height="1">
              <div class="center">高度100%</div>
            </XlPopup>
            <XlButton label="left width:100%" @click="showPopup(203)" />
            <XlPopup v-model="showPop[203]" direction="left" :width="1">
              <div class="center">宽度100%</div>
            </XlPopup>
            <XlButton label="left height:100%" @click="showPopup(204)" />
            <XlPopup v-model="showPop[204]" direction="left" :height="1">
              <div class="center">高度100%</div>
            </XlPopup>
            <XlButton label="right width:100%" @click="showPopup(205)" />
            <XlPopup v-model="showPop[205]" direction="right" :width="1">
              <div class="center">宽度100%</div>
            </XlPopup>
            <XlButton label="right height:100%" @click="showPopup(206)" />
            <XlPopup v-model="showPop[206]" direction="right" :height="1">
              <div class="center">高度100%</div>
            </XlPopup>
            <XlButton label="top width:100%" @click="showPopup(207)" />
            <XlPopup v-model="showPop[207]" direction="top" :width="1">
              <div class="center">宽度100%</div>
            </XlPopup>
            <XlButton label="top height:100%" @click="showPopup(208)" />
            <XlPopup v-model="showPop[208]" direction="top" :height="1">
              <div class="center">高度100%</div>
            </XlPopup>
            <XlButton label="bottom width:100%" @click="showPopup(209)" />
            <XlPopup v-model="showPop[209]" direction="bottom" :width="1">
              <div class="center">宽度100%</div>
            </XlPopup>
            <XlButton label="bottom height:100%" @click="showPopup(210)" />
            <XlPopup v-model="showPop[210]" direction="bottom" :height="1">
              <div class="center">高度100%</div>
            </XlPopup>
            <XlButton label="fullScreen" type="primary" @click="showPopup(211)" />
            <XlPopup v-model="showPop[211]" :width="1" :height="1">
              <div class="center">宽度100%，高度100%</div>
            </XlPopup>
            <XlButton label="overflow-y" type="warn" @click="showPopup(212)" />
            <XlPopup v-model="showPop[212]" :width="400" :height="400">
              <p>圆圆曲</p>
              <p>吴伟业 〔清代〕</p>
              <p>鼎湖当日弃人间，破敌收京下玉关。</p>
              <p>恸哭六军俱缟素，冲冠一怒为红颜。</p>
              <p>红颜流落非吾恋，逆贼天亡自荒宴。</p>
              <p>电扫黄巾定黑山，哭罢君亲再相见。</p>
              <p>相见初经田窦家，侯门歌舞出如花。</p>
              <p>许将戚里箜篌伎，等取将军油壁车。</p>
              <p>家本姑苏浣花里，圆圆小字娇罗绮。</p>
              <p>梦向夫差苑里游，宫娥拥入君王起。</p>
              <p>前身合是采莲人，门前一片横塘水。</p>
              <p>横塘双桨去如飞，何处豪家强载归。</p>
              <p>此际岂知非薄命，此时唯有泪沾衣。</p>
              <p>薰天意气连宫掖，明眸皓齿无人惜。</p>
              <p>夺归永巷闭良家，教就新声倾坐客。</p>
              <p>坐客飞觞红日暮，一曲哀弦向谁诉？</p>
              <p>白晳通侯最少年，拣取花枝屡回顾。</p>
              <p>早携娇鸟出樊笼，待得银河几时渡？</p>
              <p>恨杀军书抵死催，苦留后约将人误。</p>
              <p>相约恩深相见难，一朝蚁贼满长安。</p>
              <p>可怜思妇楼头柳，认作天边粉絮看。</p>
              <p>遍索绿珠围内第，强呼绛树出雕阑。</p>
              <p>若非壮士全师胜，争得蛾眉匹马还？</p>
              <p>蛾眉马上传呼进，云鬟不整惊魂定。</p>
              <p>蜡炬迎来在战场，啼妆满面残红印。</p>
              <p>专征萧鼓向秦川，金牛道上车千乘。</p>
              <p>斜谷云深起画楼，散关月落开妆镜。</p>
              <p>传来消息满江乡，乌桕红经十度霜。</p>
              <p>教曲伎师怜尚在，浣纱女伴忆同行。</p>
              <p>旧巢共是衔泥燕，飞上枝头变凤凰。</p>
              <p>长向尊前悲老大，有人夫婿擅侯王。</p>
              <p>当时只受声名累，贵戚名豪竞延致。</p>
              <p>一斛明珠万斛愁，关山漂泊腰肢细。</p>
              <p>错怨狂风飏落花，无边春色来天地。</p>
              <p>尝闻倾国与倾城，翻使周郎受重名。</p>
              <p>妻子岂应关大计，英雄无奈是多情。</p>
              <p>全家白骨成灰土，一代红妆照汗青。</p>
              <p>君不见，馆娃初起鸳鸯宿，越女如花看不足。</p>
              <p>香径尘生乌自啼，屧廊人去苔空绿。</p>
              <p>换羽移宫万里愁，珠歌翠舞古梁州。</p>
              <p>为君别唱吴宫曲，汉水东南日夜流！</p>
            </XlPopup>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.size }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="position" title="对话框类型">
        <ExampleForm>
          <h3>对话框类型</h3>
          <p>type</p>
          <div class="buttons">
            <XlButton label="dialog" @click="showPopup(301)" />
            <XlPopup v-model="showPop[301]" type="dialog" title="who am I?">
              I'm dialog
            </XlPopup>
            <XlButton type="primary" label="dragable" @click="showPopup(302)" />
            <XlPopup v-model="showPop[302]" draggable type="dialog" title="who am I?">
              I'm dragable dialog
            </XlPopup>
            <XlButton type="primary" label="resizable" @click="showPopup(303)" />
            <XlPopup v-model="showPop[303]" resizable type="dialog" title="who am I?">
              I'm resizable dialog
            </XlPopup>
            <XlButton type="primary" label="resizable-geometric" @click="showPopup(304)" />
            <XlPopup v-model="showPop[304]" resizable="geometric" type="dialog" title="who am I?">
              I'm geometric resizable dialog
            </XlPopup>
            <XlButton type="warn" label="draggable and resizable" @click="showPopup(305)" />
            <XlPopup v-model="showPop[305]" draggable resizable type="dialog" title="who am I?">
              I'm draggable and resizable dialog
            </XlPopup>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.type }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="position" title="其他">
        <ExampleForm>
          <h3>close图标</h3>
          <p>showClose（默认true）</p>
          <div class="buttons">
            <XlButton label="no close icon" @click="showPopup(401)" />
            <XlPopup v-model="showPop[401]" :show-close="false">
              <div class="center">no close icon</div>
            </XlPopup>
          </div>
          <h3>锁定滚动</h3>
          <p>lockScreen（默认false）</p>
          <div class="buttons">
            <XlButton label="lockScreen" @click="showPopup(402)" />
            <XlPopup v-model="showPop[402]" lock-screen>
              <div class="center">lockScreen</div>
            </XlPopup>
          </div>
          <h3>遮罩层</h3>
          <p>mask（默认true）</p>
          <div class="buttons">
            <XlButton label="no mask" @click="showPopup(403)" />
            <XlPopup v-model="showPop[403]" :mask="false" :pop-style="{border:'1px solid #909399'}">
              <div class="center">no mask</div>
            </XlPopup>
          </div>
          <h3>esc键关闭</h3>
          <p>closeOnPressEscape（默认false）</p>
          <div class="buttons">
            <XlButton label="closeOnPressEscape" @click="showPopup(404)" />
            <XlPopup v-model="showPop[404]" close-on-press-escape>
              <div class="center">closeOnPressEscape</div>
            </XlPopup>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.other }}
            </code>
          </template>
        </ExampleForm>
      </XlCategoryItem>

      <XlCategoryItem class="position" title="自定义class，style">
        <ExampleForm>
          <h3>自定义class,style</h3>
          <p>pop-class接受对象，数组，字符串（需为全局class或深度选择class）</p>
          <div class="buttons">
            <XlButton label="渐变背景class" @click="showPopup(501)" />
            <XlPopup v-model="showPop[501]" width="auto" pop-class="linear-background">
              <div class="center">
                .linear-background{ background-image: linear-gradient(to right,#52F943,#0A11DB);}
              </div>
            </XlPopup>
          </div>
          <p>pop-style接受对象，数组</p>
          <div class="buttons">
            <XlButton label="渐变背景style" @click="showPopup(502)" />
            <XlPopup v-model="showPop[502]" width="auto" :pop-style="{backgroundImage:'linear-gradient(to right,#A3DB0A,#EB2D76)'}">
              <div class="center">
                :pop-style="{backgroundImage:'linear-gradient(to right,#A3DB0A,#EB2D76)'}"
              </div>
            </XlPopup>
          </div>
          <template #code>
            <code v-codeFormat class="language-html">
              {{ codes.popStyle }}
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
  name: 'Popup',

  nameSpace: 'Popup',

  components: {
  },

  props: {
  },

  setup (props, ctx) {
    const showPop = ref([])
    const showPopup = (index) => {
      showPop.value[index] = !showPop.value[index]
    }
    return {
      attrs,
      codes,
      showPop,
      showPopup
    }
  }

}
</script>

<style lang="less">
.Popup-example{
  .buttons{
    // padding-top: 20px;
    .XlButton{
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
.center{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.linear-background{
  background-image: linear-gradient(to right,#52F943,#0A11DB);
}
</style>
