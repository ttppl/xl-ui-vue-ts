<template>
  <div class="XlPagenation">
    <div v-if="pages" class="xl-pagenation-content">
      <svg title="第一页" t="1631606343071" class="xl-page-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5320" width="20" height="20" @click="changePage(1)"><path d="M269.25 512l271.53-271.53a32 32 0 0 0-45.25-45.25L201.37 489.38a32 32 0 0 0 0 45.25l294.16 294.16a32 32 0 0 0 45.25-45.25z" p-id="5321" :fill="themeColor" /><path d="M551.1 512l271.53-271.53a32 32 0 0 0-45.26-45.25L483.22 489.38a32 32 0 0 0 0 45.25l294.15 294.16a32 32 0 1 0 45.26-45.25z" p-id="5322" :fill="themeColor" /></svg>
      <svg title="上一页" t="1631690884690" class="xl-page-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5636" width="20" height="20" @click="changePage(currPage-1)"><path d="M413.696 494.364444l265.272889-216.348444a28.444444 28.444444 0 1 0-35.953778-44.032L351.800889 471.438222a28.444444 28.444444 0 0 0-0.853333 43.349334l291.214222 257.479111a28.444444 28.444444 0 1 0 37.660444-42.666667L413.696 494.364444z" :fill="themeColor" p-id="5637" /></svg>
      <template v-for="(page,key,index) in pages">
        <div v-if="page/1>0" :key="'pagenation-'+index" :class="buttonClasses(page)" class="xl-page-button" @click="changePage(page)">{{ page }}</div>
        <div v-if="page/1==0" :key="'pagenation-'+index" :class="fontColor">...</div>
      </template>

      <svg title="下一页" t="1631690884690" class="xl-page-icon-right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5636" width="20" height="20" @click="changePage(currPage+1)"><path d="M413.696 494.364444l265.272889-216.348444a28.444444 28.444444 0 1 0-35.953778-44.032L351.800889 471.438222a28.444444 28.444444 0 0 0-0.853333 43.349334l291.214222 257.479111a28.444444 28.444444 0 1 0 37.660444-42.666667L413.696 494.364444z" :fill="themeColor" p-id="5637" /></svg>
      <svg title="最后一页" t="1631606343071" class="xl-page-icon-right" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5320" width="20" height="20" @click="changePage(-1)"><path d="M269.25 512l271.53-271.53a32 32 0 0 0-45.25-45.25L201.37 489.38a32 32 0 0 0 0 45.25l294.16 294.16a32 32 0 0 0 45.25-45.25z" p-id="5321" :fill="themeColor" /><path d="M551.1 512l271.53-271.53a32 32 0 0 0-45.26-45.25L483.22 489.38a32 32 0 0 0 0 45.25l294.15 294.16a32 32 0 1 0 45.26-45.25z" p-id="5322" :fill="themeColor" /></svg>

      <span class="xl-jump-to" :class="fontColor">跳转</span>
      <Select v-model="currentPage" :text-style="{color:themeColor}" :type="type" width="50" height="20" :pop-style="{borderRadius:'2px'}">
        <SelectOption v-for="page in Math.ceil(total / pageSize)" :key="'page-select'+page" :type="type" :value="page"><div class="xl-select-option">第{{ page }}页</div></SelectOption>
      </Select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Select from '../../select/src/Select'
import SelectOption from '../../select/src/SelectOption'
import { themeType, COLORS } from '../../../types'
export default {
  name: 'XlPagenation',

  nameSpace: 'XlPagenation',

  components: {
    Select,
    SelectOption
  },

  props: {
    type: {
      type: String,
      default: 'primary'
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
    }
  },

  emits: ['update:currPage', 'change-currpage'],

  data () {
    return {
    }
  },

  computed: {
    buttonClasses () {
      return function (page) {
        const classes = [themeType(this.type, 'bg-hover', true),
          themeType(this.type, 'bd', true),
          themeType(this.type)
        ]
        if (page === this.currPage) { classes.push(themeType(this.type, 'bg', true)) }
        return classes
      }
    },

    fontColor () {
      return themeType(this.type)
    },

    themeColor () {
      return COLORS[this.type] || '#bfbfbf'
    },

    pages () {
      const totalPage = Math.ceil(this.total / this.pageSize)
      if (totalPage < 2) {
        return null
      }
      let pages = []
      if (totalPage <= 11) {
        for (let i = 1; i <= totalPage; i++) {
          pages.push(i)
        }
      } else {
        pages = [
          1,
          2,
          this.currPage <= 5 ? 3 : -1,
          this.currPage <= 5 ? 4 : -1,
          this.currPage <= 5 ? 5 : -1,
          this.currPage <= 5 ? 6 : -1,
          this.currPage <= 5 ? 7 : -1,
          0,
          this.currPage > 5 && this.currPage < totalPage - 4 ? this.currPage - 2 : -1,
          this.currPage > 5 && this.currPage < totalPage - 4 ? this.currPage - 1 : -1,
          this.currPage > 5 && this.currPage < totalPage - 4 ? this.currPage : -1,
          this.currPage > 5 && this.currPage < totalPage - 4 ? this.currPage + 1 : -1,
          this.currPage > 5 && this.currPage < totalPage - 4 ? this.currPage + 2 : -1,
          0,
          this.currPage >= totalPage - 4 ? totalPage - 6 : -1,
          this.currPage >= totalPage - 4 ? totalPage - 5 : -1,
          this.currPage >= totalPage - 4 ? totalPage - 4 : -1,
          this.currPage >= totalPage - 4 ? totalPage - 3 : -1,
          this.currPage >= totalPage - 4 ? totalPage - 2 : -1,
          totalPage - 1,
          totalPage
        ]
      }

      var list = {}
      for (var key in pages) {
        list[key] = pages[key]
      }
      return list
    },

    currentPage: {
      get () {
        return this.currPage
      },

      set (nv) {
        this.changePage(nv)
      }
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    changePage (page) {
      const total = Math.ceil(this.total / this.pageSize)
      if (page === -1 || page > total) {
        page = total
      }
      if (page === 0) {
        page = 1
      }
      this.$emit('update:currPage', page)
      this.$emit('change-currpage', page)
    }
  }
}
</script>

 <style scoped lang="less">
 .XlPagenation{
   display: flex;
   justify-content: flex-end;
   .xl-pagenation-content{
    display: flex;
    margin-top: 30px;
    .xl-page-icon{
      width: 20px;
      height:20px;
      cursor: pointer;
    }
    .xl-page-icon-right{
      width: 20px;
      height:20px;
      cursor: pointer;
      transform: rotate(180deg);
    }
    .xl-page-button{
      cursor: pointer;
      margin: 0 5px;
      width: 20px;
      height:20px;
      border-style: solid;
      border-width: 1px;
      line-height: 20px;
      border-radius: 4px;
    }
    .xl-jump-to{
      font-size: 14px;
      margin: 0 10px 0 20px;
    }
   }

 }
.xl-select-option{
  padding: 5px;
}
 </style>
