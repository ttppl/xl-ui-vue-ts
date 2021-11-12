<template>
  <Table column-height="30" type="notice" :keep-inline="false" distinguish-row :data-list="events"
         text-align="left" :pop-data-style="dataStyle" :pop-header-style="headerStyle" :border="false">
    <TableColumn v-for="column in columns" :key="'column'-column.name" :width="column.width" :label="column.label" :column-name="column.name" />
  </Table>
</template>

<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
import Table from '@/components/table/src/Table'
import TableColumn from '@/components/table/src/TableColumn'
export default {
  name: 'EventTable',

  nameSpace: 'EventTable',

  components: {
    Table,
    TableColumn
  },

  props: {
    events: {
      type: Array,
      default: () => []
    }
  },

  setup (props, ctx) {
    const columns = [{
      name: 'eventName',
      label: '事件',
      width: 200
    }, {
      name: 'eventDesc',
      label: '描述',
      width: 400
    },
    {
      name: 'args',
      label: '回调参数',
      width: 400
    }]
    const headerStyle = {
      backgroundColor: 'transparent',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      height: '40px'
    }
    const dataStyle = {
      borderBottom: '1px solid rgb(218, 218, 218)'
    }
    return {
      columns,
      headerStyle,
      dataStyle
    }
  }

}
</script>

<style scoped lang="less">
.EventTable{
  .null{
    color:rgb(218, 218, 218);
  }
}
</style>
