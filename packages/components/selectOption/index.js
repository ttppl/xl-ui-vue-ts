import SelectOption from '../select/src/SelectOption'

SelectOption.install = (App) => {
  App.component(SelectOption.name, SelectOption)
}

export default SelectOption
