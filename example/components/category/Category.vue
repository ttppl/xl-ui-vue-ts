<template>
  <div class="Category">
    <h1>目录</h1>
    <AttrTable :attrs="attrs" />
    <h2>基本使用</h2>
    <example-form>
      <h3>默认style</h3>
      <!-- <XlCategory title="目录" :category-style="{top:'300px'}" :show-order="false" :fixed="false"> -->
      <XlCategory title="目录" :hide="false" :category-style="{width:'250px'}" :show-order="false" :fixed="false">
        <XlCategoryItem class="content" title="将进酒">
          <p>《将进酒》</p>
          <p>作者：李白</p>
          <p><br></p>
          <p>君不见，黄河之水天上来，奔流到海不复回。</p>
          <p>君不见，高堂明镜悲白发，朝如青丝暮成雪！</p>
          <p>人生得意须尽欢，莫使金樽空对月。</p>
          <p>天生我材必有用，千金散尽还复来。</p>
          <p>烹羊宰牛且为乐，会须一饮三百杯。</p>
          <p>岑夫子，丹丘生，将进酒，杯莫停。</p>
          <p>与君歌一曲，请君为我倾耳听。</p>
          <p>钟鼓馔玉不足贵，但愿长醉不复醒。</p>
          <p>古来圣贤皆寂寞，惟有饮者留其名。</p>
          <p>陈王昔时宴平乐，斗酒十千恣欢谑。</p>
          <p>主人何为言少钱，径须沽取对君酌。</p>
          <p>五花马、千金裘，呼儿将出换美酒，与尔同销万古愁！</p>
        </XlCategoryItem>
        <XlCategoryItem class="content" title="无题·相见时难别亦难">
          <p>《无题·相见时难别亦难》</p>
          <p>李商隐</p>
          <p><br></p>
          <p>相见时难别亦难，东风无力百花残。</p>
          <p>春蚕到死丝方尽，蜡炬成灰泪始干。</p>
          <p>晓镜但愁云鬓改，夜吟应觉月光寒。</p>
          <p>蓬山此去无多路，青鸟殷勤为探看。</p>
        </XlCategoryItem>
        <XlCategoryItem class="content">
          <p>《江城子·乙卯正月二十日夜记梦》</p>
          <p>北宋-苏轼</p>
          <p><br></p>
          <p>十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。</p>
          <p>夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。</p>
          <template #category>
            <div>《江城子·乙卯正月二十日夜记梦》</div>
            <div>北宋-苏轼</div>
          </template>
        </XlCategoryItem>
      </XlCategory>
      <template #code>
        <code v-codeFormat class="language-html">
          {{codes.base}}
        </code>
      </template>
    </example-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
import attrs from './attrs'
import codes from './codes'
export default {
  name: 'Category',

  nameSpace: 'Category',

  props: {
  },

  setup () {
    return {
      attrs,
      codes
    }
  }
}
</script>

<style scoped lang="less">
.Category{
  text-align: left;
  padding: 20px;
  .content{
    margin-bottom: 100px;
  }
}
</style>
