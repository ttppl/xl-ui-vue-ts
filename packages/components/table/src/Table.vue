<script type="text/ecmascript-6">
import { h, defineComponent, vShow, withDirectives, computed } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'
import Pagenation from '../../pagenation/src/Pagenation'
import Icon from '../../icon/src/Icon'
import { themeType } from '../../../types'
export default defineComponent({
  name: 'XlTable',

  nameSpace: 'XlTable',

  components: {
    Tooltip,
    Pagenation
  },

  provide () {
    return {
      XlTable: computed(() => {
        return {
          columns: this.columns
        }
      })
    }
  },

  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },

    currPage: {
      type: Number,
      default: 1
    },

    total: {
      type: Number,
      default: 0
    },

    pageSize: {
      type: Number,
      default: 10
    },

    type: {
      type: String,
      default: 'primary'
    },

    showArrow: Boolean,

    border: {
      type: Boolean,
      default: true
    },

    width: {
      type: [String, Number],
      default: '100%'
    },

    height: {
      type: [String, Number],
      default: ''
    },

    columnHeight: {
      type: [String, Number],
      default: ''
    },

    popHeaderStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    popDataStyle: {
      type: Object,
      default: () => {
        return null
      }
    }

  },

  emits: ['update:currPage', 'change-page'],

  data () {
    return { columns: [] }
  },

  computed: {

    headerClass () {
      const classes = []
      classes.push(themeType(this.type, 'bg', true))
      if (this.border) {
        classes.push('xl-table-border')
      }
      return classes
    },

    dataClass () {
      const classes = []
      if (this.border) {
        classes.push('xl-table-border')
      }
      return classes
    }
  },

  methods: {
    calcWidthStyle (width) {
      if (Array.isArray(width)) {
        return width.reduce((pre, cur) => pre + cur)
      }
      return { width: width !== 0 ? `${width}px` : 'auto', height: `${this.columnHeight}px` }
    },

    getHeader () {
      const headChildren = []
      const renderHearder = (c, colspan) => {
        headChildren.push(h('td', { class: [...this.headerClass], colspan: colspan, style: Object.assign(this.calcWidthStyle(c.width), this.popHeaderStyle) },
          h('div', { class: 'xl-table-head-column xl-table-column-flex-center', style: this.calcWidthStyle(c.width) }, c.header ? c.header(h) : (c.label || c.columnName))))
      }
      this.columns.forEach(c => {
        if (c.render instanceof Array) {
          renderHearder(c, c.render.length)
        } else {
          renderHearder(c)
        }
      })
      if (this.$slots.expand && this.showArrow) {
        headChildren.push(h('td', { width: '30px', class: ['xl-table-arrow', 'xl-color-bg-white'] }))
      }
      return h('thead', { class: 'table-head' }, h('tr', null, headChildren))
    },

    getColumnsrender () {
      const children = []
      this.dataList.forEach((d, index) => {
        const trChildren = []
        const renderDataColumn = (c, width, slot, render) => {
          trChildren.push(h('td', { class: [...this.dataClass], style: Object.assign(this.calcWidthStyle(width), this.popDataStyle), onClick: (e) => { this.click(d, e) } },
            h('div', { class: ['xl-table-column-flex-center xl-table-data-column'], style: this.calcWidthStyle(width) },
              !slot ? h(Tooltip, { width: width }, render(h, d, index)) : h('div', null, render(h, d, index)))))
        }
        this.columns.forEach(c => {
          if (typeof c.render === 'function') {
            renderDataColumn(c, c.width, c.slot, c.render)
          } else if (c.render instanceof Array) {
            c.render.forEach((r, index) => {
              renderDataColumn(c, c.width[index], c.slot[index], r)
            })
          }
        })
        if (this.$slots.expand && this.showArrow) {
          trChildren.push(h('td', { class: ['xl-table-arrow'], width: '30px', onClick: () => { this.expand(d) } },
            h(Icon, { class: ['xl-table-arrow-init', { 'xl-table-arrow-down': d.expand }], icon: 'arrowDown', size: 20, type: 'notice' })))
        }
        children.push(h('tr', {}, trChildren))
        if (this.$slots.expand) {
          d.$index = index
          children.push(withDirectives(h('tr', {}, h('td', { class: [...this.dataClass, 'xl-table-expand xl-table-data-column'], style: this.popDataStyle, colspan: this.getExpandCols() },
            this.$slots.expand(d))), [[vShow, d.expand]]))
        }
      })

      return children
    },

    getExpandCols () {
      let sum = 0
      this.columns.forEach(c => {
        if (typeof c.render === 'function') {
          sum++
        } else if (c.render instanceof Array) {
          sum += c.render.length
        }
      })
      return sum
    },

    expand (d) {
      d.expand = !d.expand
    },

    click (d) {
      if (!this.showArrow) {
        d.expand = !d.expand
      }
    },

    changeCurrPage (page) {
      this.$emit('update:currPage', page)
      this.$emit('change-page', page)
    }
  },

  render () {
    return [h('div', { ref: 'table', class: ['XlTable'], style: { width: typeof this.width === 'number' ? `${this.width + 20}px` : this.width, height: this.height } },
      [h('div', { class: 'xl-table-hiddenc-column' }, this.$slots.default()),
        h('table', { class: 'xl-table', border: 0, cellspacing: 0, cellpadding: 0, style: { width: '100%' } },
          [this.getHeader(), this.getColumnsrender()])
      ]), this.total > this.pageSize ? h(Pagenation,
      {
        total: this.total,
        pageSize: this.pageSize,
        currPage: this.currPage,
        class: ['pagenation'],
        type: this.type,
        onChangeCurrpage: this.changeCurrPage
      }) : null]
  }
})
</script>

<style scoped lang="less">
.XlTable{
  position: relative;
  width:auto;
  overflow-x: auto;
  overflow-y: hidden;
  .xl-table-hiddenc-column{
    visibility: hidden;
    position: absolute;
    z-index: -100;
  }
  .xl-table{
    width: auto;
    border-collapse: collapse;
    .xl-table-border{
      border:1px solid #DBDBDB;
    }
    .xl-table-head-column{
      min-height: 60px;
      font-size: 18px;
      font-family: Arial;
      font-weight: bold;
      text-align: center;
      white-space: nowrap;
    }
    .xl-table-data-column{
      font-size: 15px;
      font-family: Arial;
      font-weight: bold;
      vertical-align: middle;
      text-align: center;
      min-height: 60px;
      padding:5px 8px;
      text-overflow:ellipsis;
    }
    .xl-table-column-flex-center{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .xl-table-arrow{
      position:sticky;
      right:0;
      background-color: white;
      cursor: pointer;
      // border: 1px solid white;
      .xl-table-arrow-init{
        display: inline-block;
        vertical-align: middle;
        transition-duration: .5s;
      }
      .xl-table-arrow-down{
        transform: rotate(180deg);
        transition-duration: .5s;
      }
    }
  }
  .pagenation{
    margin-top: 10px;
    // position: absolute;
  }
}
</style>
