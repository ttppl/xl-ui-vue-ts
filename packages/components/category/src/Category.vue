<script type="text/ecmascript-6">
import { defineComponent, provide, reactive, h, onMounted, ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { on, off, scrollTo } from '@/utils/dom'
import { debounce, isNum, isTrue } from '@/utils/common'
export default defineComponent({
  name: 'XlCategory',

  components: {
  },

  props: {
    title: { // 目录标题
      type: String,
      default: ''
    },

    categoryStyle: { // 目录部分style
      type: Object,
      default: () => {
        return null
      }
    },

    left: Boolean, // 目录居左，默认在右边
    hide: { // 宽度小于指定值时隐藏目录，可设置false为永远不隐藏
      type: [Boolean, Number, String],
      default: 800
    },

    // categoryClass: {
    //   type: Object,
    //   default: () => {
    //     return null
    //   }
    // },

    categoryWidth: { // 目录宽度
      type: [Number, String],
      default: 0
    },

    fixed: { // 固定目录位置(需指定width)
      type: Boolean,
      default: true
    },

    showOrder: { // 显示目录编号
      type: Boolean,
      default: true
    }
  },

  setup (props, ctx) {
    // 目录数组
    const categorys = reactive([])
    provide('category', reactive({
      categorys,
      addCategory: (c) => {
        categorys.push(c)
      },
      scrollByIndex
    }))

    // active目录判断
    const activeCategoryIndex = ref(0)// 被激活的目录index
    const getActiveIndex = () => {
      for (let i = 0; i < categorys.length; i++) {
        if (categorys[i].dom?.getBoundingClientRect()?.top > 0) {
          activeCategoryIndex.value = i
          break
        }
      }
    }
    // 是否隐藏目录判断
    // const showCategory = ref(!props.hide && (isNum(props.hide) ? window.innerWidth > (props.hide / 1) : false))
    const showCategory = ref(isTrue(props.hide) ? false : (isNum(props.hide) ? window.innerWidth > (parseFloat(props.hide)) : true))
    const isHide = debounce(() => {
      showCategory.value = window.innerWidth > (props.hide / 1)
    }, 100)
    if (isNum(props.hide)) {
      on(window, 'resize', isHide)
    }

    // 计算目录位移距离
    const transform = reactive({})// transform对象
    let initTop = 0// 初始目录距离页面顶端的距离
    const setTransform = debounce(() => {
      transform.transform = `translateY(${Math.max(document.documentElement.scrollTop - initTop, 0)}px)`
    }, 100)

    const ctgRef = ref(null)// 目录-ref
    onMounted(() => {
      nextTick().then(() => {
        initTop = ctgRef.value?.getBoundingClientRect().top + document.documentElement.scrollTop - 20
      })
      on(document, 'scroll', getActiveIndex)// active目录判断
      if (!props.fixed) {
        on(document, 'scroll', setTransform)// 计算目录位移距离
      }
    })
    onBeforeUnmount(() => {
      if (isNum(props.hide)) {
        off(window, 'resize', isHide)
      }
      off(document, 'scroll', getActiveIndex)
      if (!props.fixed) {
        off(document, 'scroll', setTransform)
      }
    })

    // 内容位置
    const contentStyle = computed(() => {
      const style = {}
      if (props.fixed) { // 采用flex布局可伸缩
        style.flex = `0 1 ${window.innerWidth - ctgRef.value?.getBoundingClientRect().width}`
      }
      // style.paddingRight = `${ctgRef.value?.getBoundingClientRect().width}px`
      return style
    })

    // 目录style
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

    function scrollByIndex (index) {
      const anchorElement = document.getElementById(`category${index}`)
      if (anchorElement) {
        // anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        // 滚动到锚点位置，scrollIntoView兼容性不好，直接自定义实现
        scrollTo(document.documentElement, anchorElement, -document.documentElement.clientHeight / 5)
        this.activeCategoryIndex = index
      }
    }

    return {
      ctgRef,
      categorys,
      showCategory,
      activeCategoryIndex,
      contentStyle,
      categoryStyleC,
      scrollByIndex
    }
  },

  render () {
    // 渲染目录
    const renderCategory = () => {
      const categorysRender = []// category渲染结果
      // 锚点跳转
      const ancherTo = (index) => {
        this.scrollByIndex(index)
      }
      // 渲染锚点
      const renderAncher = (index, content) => {
        return h('span', { class: ['category-ancher'], onClick: () => { ancherTo(index) } }, content)
      }

      // 渲染目录子项
      const renderCategoryItem = (index, ctg) => {
        const attr = { class: [{ 'active-bar': !this.showOrder && index === this.activeCategoryIndex }] }
        // 自定义目录通过render函数渲染
        if (ctg.render) {
          return h('div', attr, renderAncher(index, ctg.render()))
        } else if (ctg.title) {
          return h('p', attr, renderAncher(index, ctg.title))
        }
      }
      // 子项是作为list渲染的，须包裹li标签
      const renderList = (index, ctg) => {
        return h('li', { class: [{ active: index === this.activeCategoryIndex }] }, renderCategoryItem(index, ctg))
      }
      // 遍历categorys渲染每个子项
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
