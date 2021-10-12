import SelectOption from '../select/src/SelectOption.vue'

SelectOption.install = (App) => {
  App.component(SelectOption.name, SelectOption)
}

export default SelectOption
