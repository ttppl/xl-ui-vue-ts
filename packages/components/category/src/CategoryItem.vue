<template>
  <div :id="'category'+index" ref="categoryItem" class="CategoryItem">
    <!-- {{ category }} -->
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, nextTick, inject, onMounted, reactive, toRef } from 'vue'
export default {
  name: 'XlCategoryItem',

  components: {
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  setup (props, ctx) {
    const categoryParent = inject('category')
    const index = categoryParent.categorys.length// 目录长度
    const category = reactive({ })// category需要是响应式的，因为onMounted会加入dom属性
    if (ctx.slots.category) { // 有slot返回render函数
      category.render = ctx.slots.category
    } else if (props.title) { // 返回title作为目录项
      category.title = toRef(props, 'title')
    }
    categoryParent.addCategory(category)

    // 返回dom方便判断是否激活
    const categoryItem = ref(null)// categoryItem-ref
    onMounted(() => {
      nextTick().then(() => {
        category.dom = categoryItem.value
      })
    })
    function scrollInView () { // 滚动到指定index目录内容处
      categoryParent.scrollByIndex(index)
    }
    return {
      index,
      categoryItem,
      scrollInView
    }
    // 不需要render函数，因为categoryItem是作为slot传入的，直接模板渲染即可
  }
}
</script>

<style scoped lang="less">
.CategoryItem{
//css、less
}
</style>
