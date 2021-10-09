<template>
  <div :id="'category'+index" ref="refs" class="CategoryItem">
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
    const index = categoryParent.categorys.length
    const category = reactive({ })
    if (ctx.slots.category) {
      category.render = ctx.slots.category
      // categoryParent.addCategory({ render: ctx.slots.category })
    } else if (props.title) {
      category.title = toRef(props, 'title')
      // categoryParent.addCategory({ title: props.title })
    }
    categoryParent.addCategory(category)

    // 返回dom方便判断是否激活
    const refs = ref(null)
    onMounted(() => {
      nextTick().then(() => {
        category.dom = refs.value
      })
    })
    return {
      index,
      refs
    }
  }
}
</script>

<style scoped lang="less">
.CategoryItem{
//css、less
}
</style>
