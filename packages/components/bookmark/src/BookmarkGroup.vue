<template>
  <div class="XlBookmarkGroup">
    <Bookmark v-for="(bookmark,index) in bookmarks" :key="index" v-model="model" :label="$l(bookmark.label)" @click-handle="bookmark.clickHandle" />
    <slot />
  </div>
</template>

<script type="text/ecmascript-6">
import Bookmark from './Bookmark'
import { computed } from 'vue'

export default {
  name: 'XlBookmarkGroup',

  components: {
    Bookmark
  },

  provide () {
    return {
      XlBookmarkGroup: computed(() => {
        return {
          name: 'XlBookmarkGroup',
          modelValue: this.model,
          type: this.type,
          lightStyle: this.lightStyle,
          update: (nv) => {
            this.$emit('update:modelValue', nv)
          },
          clickHandle: (label) => {
            this.$emit('click-handle', label)
          }
        }
      })
    }
  },

  props: {
    bookmarks: {
      type: Array,
      default () {
        return []
      }
    },

    modelValue: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'primary'
    },

    lightStyle: Boolean
  },

  emits: ['update:modelValue', 'click-handle'],

  computed: {
    model: {
      get () {
        return this.modelValue
      }
    }
  }
}
</script>

<style lang="less">
.XlBookmarkGroup{
  display: flex;
}
</style>
