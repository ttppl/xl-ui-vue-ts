import DatePicker from './src/DatePicker'

DatePicker.install = (App) => {
  App.component(DatePicker.name, DatePicker)
}

export default DatePicker
