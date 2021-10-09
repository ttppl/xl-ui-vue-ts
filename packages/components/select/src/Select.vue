<template>
  <div class="XlSelect">
    <div ref="select" v-clickoutside="closeSelect" tabindex="0" :class="classes" class="xl-select-label" :style="styleInner" @click="showList">
      <span v-if="selected" :style="textStyle" class="selected">{{ selected }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <svg v-if="!(showClear&&model?.length>0)" t="1629969520836" class="select-icon" :class="{'select-icon-checked':showSelectMenu,'select-icon-light':lightStyle}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2710" :width="arrowSize" :height="arrowSize"><path d="M132.577882 283.648c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 10.992941 0 21.534118 4.517647 29.214118 12.589176L514.349176 619.218824l318.644706-330.812236c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 11.023059 0 21.534118 4.517647 29.244235 12.589176 8.071529 8.372706 12.107294 19.335529 12.107294 30.328471 0 10.992941-4.065882 21.985882-12.107294 30.32847L543.533176 710.234353a40.448 40.448 0 0 1-29.214117 12.589176c-10.992941 0-21.504-4.517647-29.214118-12.589176L132.577882 344.304941a44.001882 44.001882 0 0 1 0-60.656941z" p-id="2711" :fill="themeColor" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" :width="arrowSize" :height="arrowSize" class="clear-icon pointer" version="1.1" @click.stop="model=''">
        <line x1="0" y1="0" x2="100%" y2="100%" :style="`stroke:${themeColor};stroke-width:1`" />
        <line x1="100%" y1="0" x2="0" y2="100%" :style="`stroke:${themeColor};stroke-width:1`" />
      </svg>
    </div>
    <Popper v-model="showSelectMenu" type="select" :max-height="panelHeight" min-width-follow-parent>
      <div class="options">
        <slot><div class="no-data-tip">No data</div></slot>
      </div>
    </Popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../../utils/clickouside'
import { computed } from 'vue'
import { InputThemeType, themeType, COLORS } from '../../../types'
import Popper from '../../popover/src/Popper.vue'
import whCompute from '../../../mixins/whCompute'
export default {
  name: 'XlSelect',

  directives: { clickoutside },

  components: {
    Popper
  },

  mixins: [whCompute],

  provide () {
    return {
      XlSelect: computed(() => {
        return {
          name: 'XlSelect',
          model: this.model,
          multiSelect: this.multiSelect,
          update: (nv) => {
            this.model = nv
          }
        }
      }),

      XlPopperTrigger: computed(() => {
        return {
          dom: () => {
            return this.$refs.select
          }
        }
      })
    }
  },

  props: {
    type: {
      type: String,
      default: 'primary'
    },

    size: {
      type: String,
      default: ''
    },

    multiSelect: Boolean,

    lightStyle: Boolean,

    showClear: {
      type: Boolean,
      default: true
    },

    modelValue: {
      type: [String, Array],
      required: true,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    width: {
      type: [Number, String],
      default: 240
    },

    height: {
      type: [Number, String],
      default: 50
    },

    panelHeight: {
      type: Number,
      default: 300
    },

    popClass: {
      type: Array,
      default: () => {
        return null
      }
    },

    // outerStyle: {
    //   type: Object,
    //   default: () => {
    //     return null
    //   }
    // },

    popStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    textStyle: {
      type: Object,
      default: () => {
        return null
      }
    }
  },

  emits: ['update:modelValue'],

  data () {
    return {
      showSelectMenu: false
    }
  },

  computed: {
    classes () {
      const cls = this.popClass || []
      const type = InputThemeType(this.type || 'primary', this.lightStyle)
      if (this.showSelectMenu) {
        type.splice(1, 1, themeType(this.type || 'primary', 'bd', this.lightStyle))
      }
      return [...type, ...cls, focus]
    },

    themeColor () {
      return this.showSelectMenu ? COLORS[this.type] || '#bfbfbf' : '#bfbfbf'
    },

    model: {
      get () {
        return this.modelValue
      },

      set (val) {
        if (!val && Array.isArray(this.modelValue)) {
          this.$emit('update:modelValue', [])
        } else { this.$emit('update:modelValue', val) }
      }
    },

    selected () {
      if (Array.isArray(this.model)) {
        if (this.multiSelect) {
          return this.model.join(',')
        } else {
          return this.model
        }
      } else {
        return this.model
      }
    },

    // style () {
    //   const style = this.outerStyle || {}
    //   if (this.width !== 0) {
    //     style.width = this.widthC
    //   }
    //   if (this.height !== 0) {
    //     style.height = this.heightC
    //   }
    //   if (this.size === 'small') {
    //     style.height = '30px'
    //     style.width = '255px'
    //   }
    //   return style
    // },

    styleInner () {
      const style = { ...this.popStyle }
      if (this.size === 'small') {
        style.height = '30px'
        style.width = '255px'
      } else {
        if (this.width !== 0) {
          style.width = this.widthC
        }
        if (this.height !== 0) {
          style.height = this.heightC
        }
      }
      // if(this.lightStyle){style.opacity="0.5"}
      return style
    },

    arrowSize () {
      if (this.size === 'small') {
        return 20
      }
      return this.height / 4
    }
  },

  watch: {
    showSelectMenu (nv) {
      if (nv) {
        this.$refs.select.focus()
      }
    }
  },

  methods: {
    showList () {
      this.showSelectMenu = !this.showSelectMenu
    },

    closeSelect () {
      if (this.showSelectMenu === false) {
        return
      }
      this.showSelectMenu = false
    }
  }
}
</script>

<style lang="less">
// @import '../../styles/transition.less';
.XlSelect{
  display: inline-block;
  position: relative;
  >.xl-select-label{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    border-style: solid;
    border-width: 1px;
    outline: none;
    border-radius: 3px;
      >.selected{
        text-indent: 1em;
      }
      >.placeholder{
        text-indent: 1em;
        color: #909399;
      }
      >.select-icon,.clear-icon{
        cursor: pointer;
        text-align: left;
        right:5%;
        position: relative;
        vertical-align: middle;
        transition-duration: 0.5s;
      }
      .clear-icon:hover{
        transform: scale(1.5,1.5);
        transition-duration: 0.5s;
      }
      >.select-icon-checked{
        transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
        transition-duration: 0.5s;
      }
      >.select-icon-light{
        opacity: 0.2;
      }
  }
}
// .xl-select-list{
//   position: absolute;
//   background-color: transparent;
//   z-index: 9999;
//   >.xl-select-options{
//     background-color: white;
//     box-shadow: 0px 3px 21px 0px rgba(0, 0, 0, 0.17);
//     padding: 10px 0 10px 0;
//     >.no-data-tip{
//       padding: 10px 0 10px 0;
//       text-align: center;
//       cursor: default;
//     }
//   }
// }
// .xl-select-list::before{
//   content: '';
//   display: block;
//   width: 0;
//   height: 0;
//   border: 10px solid;
//   position: relative;
//   margin: 0 auto;
//   border-color: transparent transparent white;
// }
</style>
