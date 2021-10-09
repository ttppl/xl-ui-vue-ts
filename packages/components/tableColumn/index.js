import TableColumn from '../table/src/TableColumn.vue'

TableColumn.install = (App) => {
  App.component(TableColumn.name, TableColumn)
}

export default TableColumn
