<template>
  <Table column-height="30" type="notice" :keep-inline="false" distinguish-row :data-list="attrs"
          text-align="left" :pop-data-style="dataStyle" :popHeaderStyle="headerStyle" :border='false'>
    <TableColumn :width="column.width" v-for="column in columns" :key="'column'-column.name" :label="column.label" :column-name="column.name"></TableColumn>
  </Table>
</template>

<script type="text/ecmascript-6">
import { ref, reactive } from 'vue'
import Table from '@/components/table/src/Table'
import TableColumn from '@/components/table/src/TableColumn'
export default {
  name: 'AttrTable',

  nameSpace: 'AttrTable',

  components: {
    Table,
    TableColumn
  },

  props: {
    attrs: {
      type: Array,
      default: () => []
    }
  },

  setup (props, ctx) {
    const columns = [{
      name: 'attrName',
      label: '属性',
      width: 200
    }, {
      name: 'attrDesc',
      label: '描述',
      width: 400
    },
    {
      name: 'type',
      label: '参数类型',
      width: 400
    },
    {
      name: 'accepted',
      label: '可选值',
      width: 200
    },
    {
      name: 'default',
      label: '默认值'
    }]
    const headerStyle = {
      backgroundColor: 'transparent',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      height: '40px'
    }
    const dataStyle = {
      borderBottom: '0.5px solid rgb(218, 218, 218)'
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
.AttrTable{
  .null{
    color:rgb(218, 218, 218);
  }
}
</style>
