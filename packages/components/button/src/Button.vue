<template>
  <div ref="XlButton" class="XlButton" :style="styleC" :class="classC" @click.stop="clickHandler">
    <span class="label"><slot>{{ label }}</slot></span>
  </div>
</template>

<script type="text/ecmascript-6">
import whCompute from '../../../mixins/whCompute'
import { themeType } from '../../../types'
export default {
  name: 'XlButton',

  components: {
  },

  mixins: [whCompute],

  props: {
    type: {
      type: String,
      default: 'notice'
    },

    lightStyle: Boolean,
    plain: Boolean,
    popStyle: {
      type: Object,
      default () {
        return null
      }
    },

    circle: {
      type: Boolean,
      default: false
    },

    label: { // 内容
      type: String,
      default: ''
    },

    to: {
      type: String,
      default: ''
    }
  },

  emits: ['click'],

  data () {
    return {
      maxSize: 0
    }
  },

  computed: {

    styleC () {
      const style = { ...this.popStyle }
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      if (this.circle) {
        style.width = `${this.maxSize}px`
        style.height = `${this.maxSize}px`
        style.borderRadius = '50%'
      }
      if (this.classC.join().includes('-bd-')) {
        style.borderWidth = '0.5px'
        style.borderStyle = 'solid'
      }
      return style
    },

    classC () {
      const bg = this.plain ? themeType('white', 'bg') : themeType(this.type, 'bg', this.lightStyle)
      const color = this.plain ? themeType(this.type, null)
        : this.lightStyle ? themeType(this.type, null)
          : themeType('white', null)
      const border = this.plain ? themeType(this.type, 'bd', true)
        : this.lightStyle ? themeType(this.type, 'bd', true) : ''
      const bgHover = this.plain ? themeType(this.type, 'bg-hover', this.lightStyle)
        : this.lightStyle ? themeType(this.type, 'bg-hover')
          : themeType(this.type, 'bg-hover') + ' ' + 'xl-color-hover-brightness'
      const colorHover = this.plain ? this.lightStyle ? themeType(this.type, 'hover')
        : themeType('white', 'hover') : themeType('white', 'hover')
      const borderHover = this.plain ? themeType(this.type, 'bd-hover', true) : ''
      return [bg, bgHover, color, colorHover, border, borderHover]
    }

  },

  created () {
  },

  mounted () {
    this.$nextTick().then(() => {
      this.maxSize = Math.max(this.$refs.XlButton.clientWidth, this.$refs.XlButton.clientHeight) + 10
    })
  },

  methods: {
    clickHandler () {
      this.go()
      this.$emit('click')
    },

    go () {
      if (this.to && this.$router) {
        if (this.to === '-1') {
          this.$router.go(-1)
        } else if (typeof this.to === 'string') {
          if (this.to.slice(0, 1) !== '/') {
            this.$router.push({ name: this.to })
          } else {
            this.$router.push({ path: this.to })
          }
        } else {
          this.$router.push(this.to)
        }
      }
    }
  }
}
</script>

<style lang="less">
.XlButton{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-width: 56px;
  min-height: 14px;
  @gap:10px;
  padding: @gap/2 @gap @gap/2 @gap;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  .label{
    padding : 5px 8px;
    font-size: 16px;
  }
}
@brightness:1.1;
.xl-color-hover-brightness:hover{
  -webkit-filter:brightness(@brightness);//兼容不同浏览器
  -o-filter:brightness(@brightness);
  -moz-filter:brightness(@brightness);
  filter:brightness(@brightness);
}
</style>
