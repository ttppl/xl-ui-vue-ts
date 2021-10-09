s<template>
  <div v-clickoutside="closePicker" class="XlDatePicker">
    <div ref="datePicker" :style="style" :class="classes" class="input" @click="showPicker=!showPicker">
      <Icon :light-style="lightStyle" :type="showPicker?type:'notice'" icon="calender" class="icon" size="30" />
      <span class="label xl-color-notice">{{ filter?filterDate:formatDate }}</span>
    </div>
    <Popper ref="datePickerPopper" v-model="showPicker" type="select" width="500" height="360" :pop-style="{backgroundColor:'white'}">
      <div class="datepicker" @click.stop="regenPosition">
        <div class="datepicker-year-month">
          <div>
            <Icon :light-style="lightStyle" type="notice" icon="arrowDoubleDown" class="arrow-left" @click="addYear(-1)" />
            <Icon v-show="pickerOption!=='year'" :light-style="lightStyle" type="notice" icon="arrowDown" class="arrow-left" @click="addMonth(-1)" />
          </div>
          <div class="label">
            <span class="label-year" @click="pickYear">{{ year }}</span>
            <span class="label-month" @click="pickerOption='month'">{{ getMonth(month) }}</span>
          </div>

          <div>
            <Icon v-show="pickerOption!=='year'" :light-style="lightStyle" type="notice" icon="arrowDown" class="arrow-right" @click="addMonth(1)" />
            <Icon :light-style="lightStyle" type="notice" icon="arrowDoubleDown" class="arrow-right" @click="addYear(1)" />
          </div>
        </div>
        <div class="datepicker-panel">
          <transition name="tst-scale">
            <div v-if="pickerOption==='day'" class="datepicker-day">
              <table class="picker-days">
                <thead>
                  <tr>
                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                  </tr>
                </thead>
                <tr v-for="(ds,key) in days" :key="'tr'+key">
                  <td v-for="(d,dkey) in ds" :key="'tr'+dkey" class="picker-day"
                      :class="[{'last-month-date':d.last,'next-month-date':d.next},d.curr&&d.date==day?themeType(type,'bg',true):'',themeType(type,'bg-hover',true)]"
                      @click="setDay(d)">
                    {{ d.date }}
                  </td>
                </tr>
              </table>
            </div>
          </transition>
          <transition name="tst-scale">
            <div v-if="pickerOption==='month'" class="datepicker-month">
              <table class="picker-months">
                <template v-for="(mon,index) in months">
                  <tr v-if="(index+1)%4==1" :key="'months-'+index">
                    <td v-for="i in 4" :key="'month-'+index+i" class="picker-month"
                        :class="[month==index+i?themeType(type,'bg',true):'',themeType(type,'bg-hover',true)]"
                        @click="setMonth(index+i)">
                      {{ months[index+i-1] }}
                    </td>
                  </tr>
                </template>
              </table>
            </div>
          </transition>
          <transition name="tst-scale">
            <div v-if="pickerOption==='year'" class="datepicker-year">
              <table class="picker-years">
                <template v-for="(y,key,index) in years">
                  <tr v-if="(index+1)%5==1" :key="'years-'+index">
                    <td v-for="i in 5" :key="'year-'+index+i" class="picker-year"
                        :class="[years[index+i-1]==year?themeType(type,'bg',true):'',themeType(type,'bg-hover',true)]"
                        @click="setYear(years[index+i-1])">
                      {{ years[index+i-1] }}
                    </td>
                  </tr>
                </template>
              </table>
            </div>
          </transition>
        </div>
      </div>
    </Popper>
  </div>
</template>

<script type="text/ecmascript-6">
import clickoutside from '../../../utils/clickouside'
import WHcomputed from '../../../mixins/whCompute'
import { getDate } from '../../../utils/utils'
import { computed } from 'vue'
import Popper from '../../popover/src/Popper'
import Icon from '../../icon/src/Icon'
import { themeType } from '../../../types'
export default {
  name: 'XlDatePicker',

  nameSpace: 'XlDatePicker',

  components: {
    Popper,
    Icon
  },

  directives: { clickoutside },

  mixins: [WHcomputed],
  provide () {
    return {
      XlPopperTrigger: computed(() => {
        return {
          dom: () => {
            return this.$refs.datePicker
          }
        }
      })
    }
  },

  props: {
    width: {
      type: [Number, String],
      default: 200
    },

    height: {
      type: [Number, String],
      default: 50
    },

    popStyle: {
      type: Object,
      default: () => {
        return null
      }
    },

    type: {
      type: String,
      default: 'primary'
    },

    lightStyle: Boolean,

    popClass: {
      type: [String, Object, Array],
      default: ''
    },

    modelValue: {
      type: [String, Date],
      default: ''
    },

    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },

    filter: {
      type: [Boolean, Function],
      default: false
    }
  },

  emits: ['update:modelValue'],
  data () {
    return {
      dataStringType: false,
      showPicker: false,
      pickerOption: 'day',
      year: 0,
      month: 0,
      day: 0,
      week: 0,
      hour: 0,
      minute: 0,
      second: 0,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [],
      maxYearCount: 21
    }
  },

  computed: {
    model: {
      get () {
        if (this.dataStringType) {
          return getDate(this.modelValue, this.format)
        } else {
          return this.modelValue
        }
      },

      set (nv) {
        if (this.dataStringType) {
          this.$emit('update:modelValue', this.formatDate)
        } else {
          this.$emit('update:modelValue', getDate(nv, this.format))
        }
      }
    },

    formatDate () {
      return this.format.replace('MM', (Array(2).join(0) + this.month).slice(-2)).toLowerCase().replace('yyyy', this.year)
        .replace('dd', (Array(2).join(0) + this.day).slice(-2)).replace('hh', this.hour).replace('mm', this.minute).replace('ss', this.second)
    },

    filterDate () {
      const filter = typeof this.filter === 'function' ? this.filter : (date) => {
        const day = date.getDate()
        const suffix = ['st', 'nd', 'rd', 'th']
        return `${day}${day < 4 ? suffix[day - 1] : suffix[3]} ${this.months[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`
      }
      return filter(getDate(this.formatDate, this.format))
    },

    days () {
      const lastDay = new Date(this.year, this.month, 0).getDate()
      const days = []
      for (let i = 1; i < lastDay + 1; i++) {
        days.push({ curr: true, date: i })
      }
      const firstDayWeek = new Date(this.year, this.month - 1, 1).getDay() || 7

      const lastMonthLastDay = new Date(this.year, this.month - 1, 0).getDate()
      for (let i = 0; i < firstDayWeek; i++) {
        days.unshift({ last: true, date: lastMonthLastDay - i })
      }

      const lastDayWeek = new Date(this.year, this.month, 0).getDay()
      for (let i = 1; i <= 7 - lastDayWeek - 1; i++) {
        days.push({ next: true, date: i })
      }
      if (days.length < 42) {
        const lastDay = days[days.length - 1].date
        for (let i = 1; days.length < 42; i++) {
          days.push({ next: true, date: lastDay + i })
        }
      }
      var list = {}
      for (const key in days) {
        list[Math.floor(key / 7)] = list[Math.floor(key / 7)] || {}
        list[Math.floor(key / 7)][key % 7] = days[key]
      }
      return list
    },

    style () {
      const style = { ...this.popStyle }
      style.width = style.width || this.widthC
      style.height = style.height || this.heightC
      return style
    },

    classes () {
      const classes = Array.isArray(this.popClass) ? [...this.popClass] : [this.popClass]
      const border = this.showPicker ? themeType(this.type, 'bd', this.lightStyle) : themeType('notice', 'bd', this.lightStyle)
      // classes.push(themeType(this.type, 'bd', this.lightStyle))
      return [...classes, border]
    }
  },

  created () {
    this.dataStringType = typeof this.modelValue === 'string'
    this.setDate(this.dataStringType ? getDate(this.modelValue, this.format) : this.modelValue)
    this.themeType = themeType
  },

  mounted () {
  },

  methods: {
    setDate (date) {
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.week = date.getDay()
      this.day = date.getDate()
      this.hour = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()
    },

    closePicker () {
      if (this.showPicker === false) {
        return
      }
      this.showPicker = false
    },

    addYear (num) {
      if (this.pickerOption !== 'year') {
        this.year += num
      } else {
        const yearsOld = Object.values(this.years)
        const years = []
        if (num > 0) {
          const year = yearsOld[yearsOld.length - 1]
          for (let i = 1; i < this.maxYearCount; i++) {
            years.push(year + i)
          }
        } else {
          const year = yearsOld[0]
          for (let i = 1; i < this.maxYearCount; i++) {
            years.unshift(year - i)
          }
        }

        this.years = { ...years }
      }
    },

    addMonth (num) {
      const newMonth = this.month + num
      if (newMonth > 12) {
        this.month = newMonth % 12
        this.addYear(Math.floor(newMonth / 12))
      } else if (newMonth < 1) {
        this.month = newMonth % 12 + 12
        this.addYear(Math.ceil(-newMonth / 12) - 1)
      } else { this.month = newMonth }
    },

    setDay (day) {
      this.day = day.date
      this.addMonth(day.last ? -1 : day.next ? 1 : 0)
    },

    setMonth (month) {
      this.month = month
      this.pickerOption = 'day'
    },

    setYear (year) {
      this.year = year
      this.pickerOption = 'month'
    },

    getMonth (month) {
      return this.months[month - 1]
    },

    pickYear () {
      const years = [this.year]
      for (let i = 1; i < Math.ceil(this.maxYearCount / 2); i++) {
        years.push(this.year + i)
        years.unshift(this.year - i)
      }
      this.years = { ...years.slice(0, -1) }
      this.pickerOption = 'year'
    },

    regenPosition () {
      this.model = this.formatDate
      this.$refs.datePickerPopper.calcPosition()
    }
  }
}
</script>

<style scoped lang="less">
.XlDatePicker{
  display: inline-flex;
  .input{
    cursor: pointer;
    display: flex;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    .icon{
      padding: 0 10px;
    }
    .label{
      font-size: 20px;
    }
  }
  // .input::before{//居中文字
  //   display: inline-block;
  //   content: "";
  //   height: 100%;
  //   vertical-align: middle;
  // }
}
.datepicker{
  padding:20px;
  .datepicker-year-month{
    display: flex;
    justify-content: space-between;
    .label{
      font-size: 18px;
      font-family: Arial;
      font-weight: 700;
      cursor: pointer;
      .label-month{
        margin-left: 30px;
      }
    }
    .arrow-left{
      cursor: pointer;
      transform: rotate(90deg);
    }
    .arrow-right{
      cursor: pointer;
      transform: rotate(-90deg);
    }
  }
  .datepicker-panel{
    position: relative;
    .datepicker-day{
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid black;
      position: absolute;
      top:0;
      .picker-days{
        width: 100%;
        text-align: center;
        .picker-day{
          cursor: pointer;
          width:60px;
          height:40px;
        }
        .last-month-date,.next-month-date{
          color:fade(black,30);
        }
      }
    }
    .datepicker-month{
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid black;
      position: absolute;
      top:0;
      .picker-months{
        width: 100%;
        text-align: center;
        .picker-month{
          cursor: pointer;
          width:120px;
          height:90px;
        }
      }
    }
    .datepicker-year{
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid black;
      position: absolute;
      top:0;
      .picker-years{
        width: 100%;
        text-align: center;
        .picker-year{
          cursor: pointer;
          width:100px;
          height:65px;
        }
      }
    }
  }
}
.tst-scale-enter-active,.tst-scale-leave-active {
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
.tst-scale-enter-from, .tst-scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0,0);
}
</style>
