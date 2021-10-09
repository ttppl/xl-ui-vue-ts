<template>
  <div class="XlBookmark" :class="classes" :style="style" @click="clickHandler">
    <div class="xl-bookmark-label" :class="classesInner">
      <div><slot>{{ label }}</slot></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { themeType } from '../../../types'
import whCompute from '../../../mixins/whCompute'
export default {
  name: 'XlBookmark',

  components: {
  },

  mixins: [whCompute],
  inject: ['XlBookmarkGroup'],

  props: {
    modelValue: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'primary'
    },

    lightStyle: Boolean,

    label: {
      type: String,
      default: ''
    },

    clickHandle: {
      type: Function,
      default () {
        return ''
      }
    },

    to: {
      type: [String, Object],
      default: ''
    }
  },

  emits: ['update:modelValue', 'click-handle'],

  data () {
    return {
      clicked: false
    }
  },

  computed: {
    xlBookmarkGroup () {
      return this.XlBookmarkGroup.value || this.XlBookmarkGroup
    },

    isGroup () {
      return this.xlBookmarkGroup.name === 'XlBookmarkGroup'
    },

    isLight () {
      return this.isGroup ? this.xlBookmarkGroup.lightStyle : this.lightStyle
    },

    themeType () {
      return this.isGroup ? this.xlBookmarkGroup.type : this.type
    },

    model: {
      get () {
        return this.isGroup ? this.xlBookmarkGroup.modelValue : this.modelValue
      },

      set (nv) {
        this.isGroup ? this.xlBookmarkGroup.update(nv) : this.$emit('update:modelValue', nv)
      }
    },

    classes () {
      const classes = [themeType(this.themeType, 'bookmark-bg', this.isLight), themeType(this.themeType, '', this.isLight)]
      return classes
    },

    classesInner () {
      let classes = [themeType('white', 'bookmark-bg')]
      if (this.model === this.label) {
        classes = [themeType(this.themeType, 'bookmark-bg', this.isLight), themeType('white')]
      }
      return [...classes]
    },

    style () {
      const style = {}
      if (this.width !== 0) {
        style.width = this.widthC
      }
      if (this.height !== 0) {
        style.height = this.heightC
      }
      return style
    }
  },

  watch: {
  },

  created () {
    if (this.model === this.label) {
      this.go()
    }
  },

  mounted () {
  },

  methods: {
    clickHandler (e) {
      e.stopPropagation()
      this.model = this.label
      this.go()
      this.$emit('click-handle', this.label)
      this.XlBookmarkGroup.clickHandle(this.label)
    },

    go () {
      // 设置路由跳转
      if (this.to && this.$router) {
        if (typeof this.to === 'string') {
          if (this.to?.slice(1) !== '/') {
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
.XlBookmark{
  @gap:20px;
  margin-right: @gap/4;
  width:fit-content;
  width:-webkit-fit-content;
  width:-moz-fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 1px;
  cursor: pointer;
  >.xl-bookmark-label{
    width: 100%;
    height: 100%;
    padding:0 (@gap+5) 0 15px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
