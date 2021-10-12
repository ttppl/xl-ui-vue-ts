import DatePicker from './src/DatePicker.vue'

DatePicker.install = (App) => {
  App.component(DatePicker.name, DatePicker)
}

export default DatePicker
