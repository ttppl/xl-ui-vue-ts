<template>
  <div class="XlSelect" :style="containerStyle">
    <div ref="select" v-clickoutside="closeSelect" tabindex="0" :class="classes" class="xl-select-label" :style="styleInner" @click="showList">
      <span v-if="selected" :style="textStyle" class="selected">{{ selected }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
      <svg v-if="!(showClear&&model?.length>0)" t="1629969520836" class="select-icon" :class="{'select-icon-checked':showSelectMenu,'select-icon-light':lightStyle}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2710" :width="arrowSize" :height="arrowSize"><path d="M132.577882 283.648c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 10.992941 0 21.534118 4.517647 29.214118 12.589176L514.349176 619.218824l318.644706-330.812236c7.710118-8.041412 18.251294-12.589176 29.214118-12.589176 11.023059 0 21.534118 4.517647 29.244235 12.589176 8.071529 8.372706 12.107294 19.335529 12.107294 30.328471 0 10.992941-4.065882 21.985882-12.107294 30.32847L543.533176 710.234353a40.448 40.448 0 0 1-29.214117 12.589176c-10.992941 0-21.504-4.517647-29.214118-12.589176L132.577882 344.304941a44.001882 44.001882 0 0 1 0-60.656941z" p-id="2711" :fill="themeColor" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" :width="arrowSize" :height="arrowSize" class="clear-icon pointer" version="1.1" @click.stop="model=''">
        <line x1="0" y1="0" x2="100%" y2="100%" :style="`stroke:${themeColor};stroke-width:1`" />
        <line x1="100%" y1="0" x2="0" y2="100%" :style="`stroke:${themeColor};stroke-width:1`" />
      </svg>
    </div>

    <Popper ref="popper" v-model="showSelectMenu" min-width="1" :transform="false" transition="tst-scale-down" position="bottom" always-in-view :pop-style="{padding:'10px 0'}" :max-height="panelHeight">
      <div class="options">
        <slot><div class="no-data-tip">No data</div></slot>
      </div>
    </Popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '@/directives/clickOutside'
import { computed, provide, reactive, ref, watch } from 'vue'
import { InputThemeType, themeType, COLORS } from '../../../types'
import Popper from '@/components/popover/src/Popper.vue'
import size from '@/mixins/size'
import { isNull } from '@/utils/common'
export default {
  name: 'XlSelect',

  directives: { clickoutside },

  components: {
    Popper
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
      default: null
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
    },

    inline: {
      type: Boolean,
      default: true
    }
  },

  emits: ['update:modelValue', 'after-select'],

  setup (props, ctx) {
    const showSelectMenu = ref(false)
    const defaultValue = ref('')
    const model = computed({
      get () {
        return isNull(props.modelValue) ? defaultValue.value : props.modelValue
      },

      set (val) {
        if (!isNull(props.modelValue)) { ctx.emit('update:modelValue', val) } else { defaultValue.value = val }
      }
    })
    const labels = ref(new Map())
    provide('XlSelect', reactive({
      model: model,
      multiSelect: props.multiSelect,
      update: (nv) => {
        model.value = nv
      },
      addLabel: (value, label) => {
        labels.value.set(value, label)
      },
      closeSelect: () => { // 关闭下拉框
        showSelectMenu.value = false
      },
      afterSelect: (selected, selectItem) => {
        ctx.emit('after-select', selected, selectItem)
      }
    }))
    provide('XlPopperTrigger', reactive({
      dom: () => {
        return select.value
      }
    }))

    const classes = computed(() => {
      const cls = props.popClass || []
      const type = InputThemeType(props.type || 'primary', props.lightStyle)
      if (showSelectMenu.value) {
        type.splice(1, 1, themeType(props.type || 'primary', 'bd', props.lightStyle))
      }
      return [...type, ...cls]
    })

    const themeColor = computed(() => {
      return showSelectMenu.value ? COLORS[props.type] || '#bfbfbf' : '#bfbfbf'
    })

    const selected = computed(() => {
      if (Array.isArray(model.value)) {
        if (props.multiSelect) {
          const label = model.value.map(e => {
            return labels.value.get(e) || e
          })
          return label.join(',')
        } else {
          return labels.value.get(model.value[0]) || model.value[0]
        }
      } else {
        return labels.value.get(model.value) || model.value
      }
    })

    const styleInner = computed(() => {
      const style = { ...props.popStyle }
      if (props.size === 'small') {
        style.height = '30px'
        style.width = '255px'
      } else if (props.size === 'large') {
        style.height = '60px'
        style.width = '400px'
      } else {
        const { widthC, heightC } = size(props)
        if (props.width !== 0) {
          style.width = widthC.value
        }
        if (props.height !== 0) {
          style.height = heightC.value
        }
      }
      // if(this.lightStyle){style.opacity="0.5"}
      return style
    })

    const arrowSize = computed(() => {
      if (props.size === 'small') {
        return 10
      }
      return props.height / 4
    })

    const showList = () => {
      showSelectMenu.value = !showSelectMenu.value
    }
    const popper = ref(null)
    const closeSelect = (e) => {
      if (!popper.value?.contains(e.target)) {
        showSelectMenu.value = false
      }
    }

    const select = ref(null)
    watch(() => showSelectMenu, (nv) => {
      if (nv) {
        select.value.focus()
      }
    })

    const containerStyle = computed(() => {
      const style = {}
      if (props.inline) {
        style.display = 'inline-block'
      }
      return style
    })

    return {
      showSelectMenu,
      model,
      classes,
      themeColor,
      selected,
      styleInner,
      arrowSize,
      showList,
      closeSelect,
      select,
      popper,
      containerStyle
    }
  }
}
</script>

<style lang="less">
.XlSelect{
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
        overflow: hidden;
        text-overflow: ellipsis;
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
