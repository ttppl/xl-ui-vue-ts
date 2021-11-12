export default {
  setHeight: `<XlScroll height="200">
  <p>
    壬戌之秋，七月既望，苏子与客泛舟，游于赤壁之下。
    清风徐来，水波不兴。
    举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。
    白露横江，水光接天。纵一苇之所如，凌万顷之茫然。
    浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。(冯 通：凭)
  </p><br>
  <p>
    于是饮酒乐甚，扣舷而歌之。
    歌曰：“桂棹兮兰桨，击空明兮溯流光。渺渺兮予怀，望美人兮天一方。”
    客有吹洞箫者，倚歌而和之。
    其声呜呜然，如怨如慕，如泣如诉；余音袅袅，不绝如缕。
    舞幽壑之潜蛟，泣孤舟之嫠妇。
  </p>
  <br>
  <p>
    苏子愀然，正襟危坐，而问客曰：“何为其然也？”
    客曰：“‘月明星稀，乌鹊南飞。’此非曹孟德之诗乎？
    西望夏口，东望武昌，山川相缪，郁乎苍苍，此非孟德之困于周郎者乎？
    方其破荆州，下江陵，顺流而东也，舳舻千里，旌旗蔽空，酾酒临江，横槊赋诗，固一世之雄也，而今安在哉？
    况吾与子渔樵于江渚之上，侣鱼虾而友麋鹿，驾一叶之扁舟，举匏樽以相属。
    寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。
    挟飞仙以遨游，抱明月而长终。知不可乎骤得，托遗响于悲风。”
  </p>
  <br>
  <p>
    苏子曰：“客亦知夫水与月乎？
    逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。
    盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！
    且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。
    惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。
    是造物者之无尽藏也，而吾与子之所共适。”(共适 一作：共食)
  </p>
  <br>
  <p>  客喜而笑，洗盏更酌。肴核既尽，杯盘狼籍。相与枕藉乎舟中，不知东方之既白。</p>
</XlScroll>`,
  setMaxHeight: `<template>
  <XlScroll max-height="250">
    <p>江城子·密州出猎</p>
    <p>苏轼〔宋代〕</p>
    <p>老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。</p>
    <p>酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。</p>
    <XlIcon icon="arrowDoubleDown" @click="showMore=!showMore">more</XlIcon>
    <template v-if="showMore">
      <p>雨霖铃·寒蝉凄切</p>
      <p>柳永〔宋代〕</p>
      <p>寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。</p>
      <p>多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？</p>
    </template>
  </XlScroll>
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup (props, ctx) {
    const showMore = ref(false)
    return {
      showMore
    }
  }
}
</script>`,
  setWidth: `<XlScroll class="scroll-x" width="500">
  <p>
    壬戌之秋，七月既望，苏子与客泛舟，游于赤壁之下。
    清风徐来，水波不兴。
    举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。
    白露横江，水光接天。纵一苇之所如，凌万顷之茫然。
    浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。(冯 通：凭)
  </p><br>
  <p>
    于是饮酒乐甚，扣舷而歌之。
    歌曰：“桂棹兮兰桨，击空明兮溯流光。渺渺兮予怀，望美人兮天一方。”
    客有吹洞箫者，倚歌而和之。
    其声呜呜然，如怨如慕，如泣如诉；余音袅袅，不绝如缕。
    舞幽壑之潜蛟，泣孤舟之嫠妇。
  </p>
  <br>
  <p>
    苏子愀然，正襟危坐，而问客曰：“何为其然也？”
    客曰：“‘月明星稀，乌鹊南飞。’此非曹孟德之诗乎？
    西望夏口，东望武昌，山川相缪，郁乎苍苍，此非孟德之困于周郎者乎？
    方其破荆州，下江陵，顺流而东也，舳舻千里，旌旗蔽空，酾酒临江，横槊赋诗，固一世之雄也，而今安在哉？
    况吾与子渔樵于江渚之上，侣鱼虾而友麋鹿，驾一叶之扁舟，举匏樽以相属。
    寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。
    挟飞仙以遨游，抱明月而长终。知不可乎骤得，托遗响于悲风。”
  </p>
  <br>
  <p>
    苏子曰：“客亦知夫水与月乎？
    逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。
    盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！
    且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。
    惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。
    是造物者之无尽藏也，而吾与子之所共适。”(共适 一作：共食)
  </p>
  <br>
  <p>  客喜而笑，洗盏更酌。肴核既尽，杯盘狼籍。相与枕藉乎舟中，不知东方之既白。</p>
</XlScroll>`,
  setMaxWidth: `<template>
  <XlScroll class="scroll-x" max-width="700">
    <p>江城子·密州出猎</p>
    <p>苏轼〔宋代〕</p>
    <p>老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。</p>
    <p>酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。</p>
    <XlIcon icon="arrowDoubleDown" @click="showMore=!showMore">more</XlIcon>
    <template v-if="showMore">
      <p>雨霖铃·寒蝉凄切</p>
      <p>柳永〔宋代〕</p>
      <p>寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。</p>
      <p>多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？</p>
    </template>
  </XlScroll>
</template>
<script type="text/ecmascript-6">
import { ref } from 'vue'
export default {
  setup (props, ctx) {
    const showMore = ref(false)
    return {
      showMore
    }
  }
}
</script>`,
  barStyle: `<template>
  <p>滚动条宽度,点击切换</p>
  <div class="buttons">
    <XlButton @click="barWidth=5">5px</XlButton>
    <XlButton @click="barWidth=10">10px</XlButton>
    <XlButton @click="barWidth=20">20px</XlButton>
  </div>
  <p>滚动条颜色</p>
  <div class="buttons">
    <XlButton type="primary" @click="barType='primary'">primary</XlButton>
    <XlButton type="warn" @click="barType='warn'">warn</XlButton>
    <XlButton type="notice" @click="barType='notice'">notice</XlButton>
    <XlButton type="success" @click="barType='success'">success</XlButton>
    <XlButton type="black" @click="barType='black'">black</XlButton>
    <XlButton type="error" @click="barType='error'">error</XlButton>
    <XlButton type="primary" @click="lightStyle=!lightStyle">lightStyle</XlButton>
  </div>
  <p>浅色风格</p>
  <div class="buttons">
    <XlButton type="primary" @click="lightStyle=!lightStyle">lightStyle</XlButton>
  </div>
  <p>自定义</p>
  <div class="buttons">
    <XlButton :pop-style="{backgroundColor:'#00FFFF'}" @click="barStyle.backgroundColor='#00FFFF'">#00FFFF</XlButton>
  </div>
  <XlScroll height="200" :bar-width="barWidth" :type="barType" :light-style="lightStyle" :pop-bar-style="barStyle" width="500">
    <p>岳阳楼记</p>
    <br>
    <p>范仲淹〔宋代〕</p>
    <br>
    <p>庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。(具 通：俱)</p>
    <br>
    <p>予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？</p>
    <br>
    <p>若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空，日星隐曜，山岳潜形，商旅不行，樯倾楫摧，薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。(隐曜 一作：隐耀；淫雨 通：霪雨)</p>
    <br>
    <p>至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。</p>
    <br>
    <p>嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲，居庙堂之高则忧其民，处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎！噫！微斯人，吾谁与归？时六年九月十五日。</p>
    <br>
  </XlScroll>
</template>
<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
export default {
  setup (props, ctx) {
    const barWidth = ref(10)
    const barType = ref('notice')
    const lightStyle = ref(false)
    const barStyle = reactive({})
    return {
      barWidth,
      barType,
      lightStyle,
      barStyle
    }
  }
}
</script>`,
  script: `<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
export default {
  setup (props, ctx) {
    const showMore = ref(false)
    const barWidth = ref(10)
    const barType = ref('notice')
    const lightStyle = ref(false)
    const barStyle = reactive({})
    return {
      showMore,
      barWidth,
      barType,
      lightStyle,
      barStyle
    }
  }
}
</script>

<style scoped lang="less">
.Scroll{
  .title{
    padding-top: 20px;
  }
  .scroll-x{
    p{
      white-space: nowrap;
    }
  }
  .buttons{
    >*{
      margin:10px 10px 10px 0;
    }
  }
}
</style>`
}
