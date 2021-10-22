<script type="text/ecmascript-6">
import { defineComponent, provide, reactive, h, onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import { on, off, scrollTo } from '../../../utils/dom'
import { debounce } from '../../../utils/utils'
export default defineComponent({
  name: 'XlCategory',

  components: {
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    categoryStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    left: Boolean,
    neverHide: Boolean,
    // showCategory: {
    //   type: Boolean,
    //   default: true
    // },

    categoryClass: {
      type: Object,
      default: () => {
        return null
      }
    },

    categoryWidth: { //
      type: [Number, String],
      default: 0
    },

    fixed: {
      type: Boolean,
      default: true
    },

    showOrder: {
      type: Boolean,
      default: true
    }

    // container: {
    //   type: Object,
    //   default: () => undefined
    // }
  },

  setup (props, ctx) {
    // 目录数组
    const categorys = reactive([])
    provide('category', reactive({
      categorys,
      addCategory: (c) => {
        categorys.push(c)
      }
    }))

    // active目录判断
    const activeCategoryIndex = ref(0)
    const getScrollTop = (e) => {
      for (let i = 0; i < categorys.length; i++) {
        // if (categorys[i].dom?.getBoundingClientRect()?.bottom > document.documentElement.clientHeight / 5) {
        if (categorys[i].dom?.getBoundingClientRect()?.top > 0) {
          activeCategoryIndex.value = i
          break
        }
      }
    }

    // 内容位置
    const contentStyle = computed(() => {
      const style = {}
      if (props.fixed) {
        style.flex = `0 1 ${window.innerWidth - ctgRef.value?.getBoundingClientRect().width}`
      }
      // style.paddingRight = `${ctgRef.value?.getBoundingClientRect().width}px`
      return style
    })

    // 目录style
    const ctgRef = ref(null)
    const transform = reactive({})
    let initTop = 0
    const setTransform = debounce(() => {
      transform.transform = `translateY(${Math.max(document.documentElement.scrollTop - initTop, 0)}px)`
    }, 100)

    const categoryStyleC = computed(() => {
      const style = { ...props.categoryStyle }
      if (!props.fixed) {
        Object.assign(style, transform)
      } else {
        style.width = `${props.categoryWidth || 200}px`
        style.right = style.right || '20px'
        style.top = style.top || '80px'
      }
      return style
    })

    const showCategory = ref(window.innerWidth > 800)
    const isHide = debounce(() => {
      showCategory.value = window.innerWidth > 800
    }, 100)
    if (props.neverHide) {
      showCategory.value = true
    } else {
      on(window, 'resize', isHide)
    }

    onMounted(() => {
      nextTick().then(() => {
        initTop = ctgRef.value?.getBoundingClientRect().top + document.documentElement.scrollTop - 20
      })
      on(document, 'scroll', getScrollTop)
      if (!props.fixed) {
        on(document, 'scroll', setTransform)
      }
    })
    onUnmounted(() => {
      if (!props.neverHide) {
        off(window, 'resize', isHide)
      }
      off(document, 'scroll', getScrollTop)
      if (!props.fixed) {
        off(document, 'scroll', setTransform)
      }
    })

    return {
      ctgRef,
      categorys,
      showCategory,
      activeCategoryIndex,
      contentStyle,
      categoryStyleC
    }
  },

  render () {
    const renderCategory = () => { // 渲染目录
      const categorysRender = []
      const ancherTo = (index) => { // 锚点跳转
        const anchorElement = document.getElementById(`category${index}`)
        if (anchorElement) {
          // anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
          scrollTo(document.documentElement, anchorElement, -document.documentElement.clientHeight / 5)
          this.activeCategoryIndex = index
        }
      }
      const renderAncher = (index, content) => { // 渲染锚点
        return h('span', { class: ['category-ancher'], onClick: () => { ancherTo(index) } }, content)
      }

      const renderCategoryItem = (index, ctg) => {
        const attr = { class: [{ 'active-bar': !this.showOrder && index === this.activeCategoryIndex }] }
        if (ctg.render) {
          return h('div', attr, renderAncher(index, ctg.render()))
        } else if (ctg.title) {
          return h('p', attr, renderAncher(index, ctg.title))
        }
      }
      const renderList = (index, ctg) => {
        return h('li', { class: [{ active: index === this.activeCategoryIndex }] }, renderCategoryItem(index, ctg))
      }
      this.categorys.forEach((ctg, index) => {
        categorysRender.push(renderList(index, ctg))
      })
      return categorysRender
    }
    return h('div', { class: ['Category', { 'Category-reverse': this.left }] },
      [h('div', { class: 'content', style: this.contentStyle }, this.$slots.default()),
        this.showCategory ? h('div', { ref: 'ctgRef', class: ['categorys', this.fixed ? 'fixed-category' : 'relative-category'], style: this.categoryStyleC },
          [this.title ? h('p', { class: 'title' }, this.title) : null, h('ol', { class: ['categoty-list', { 'none-order-list': !this.showOrder }] }, renderCategory())]) : null,
        this.showCategory && this.fixed ? h('div', { style: { width: `${this.categoryWidth}px`, flexShrink: 0 } }, '') : null])
  }
})
</script>

<style scoped lang="less">
@activeColor:#409EFF;
.Category{
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  .content{
    box-sizing: border-box;
    flex-grow: 1;
    flex-shrink: 3;
    width:0;//避免overflow失效
  }
  .categorys{
    box-sizing: border-box;
    height:0;
    flex-shrink:7;
    flex-grow: 0;
    // line-height: 25px;
    .title{
      font-weight: bold;
      font-size: 18px;
    }
    .categoty-list{
      >li:hover{
        color: @activeColor;
      }
      .active{
        color: @activeColor;
      }
      .active-bar{
        // display: flex;
        position: relative;
      }
      .active-bar::before{
        content: '\00A0';
        display: block;
        width:4px;
        height:100%;
        position: absolute;
        left:-10px;
        border-radius: 2px;
        background-color: @activeColor;
      }
      .category-ancher{
        cursor: pointer;
      }
    }
    .none-order-list{
      list-style: none;
      padding: 0;
    }
  }
  .fixed-category{
    position: fixed;
    white-space : normal;
    word-break:break-all;
  }
  .relative-category{
    position: relative;
    // position: absolute;
    // top: 0;
    // right:0;
    padding: 0 10px;
    transition: transform 1000ms cubic-bezier(0.23, 1, 0.32, 1);
  }
}

.Category-reverse{
  flex-direction: row-reverse;
}
</style>
