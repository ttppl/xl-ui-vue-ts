<template>
  <div class="XlTableColumn">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'XlTableColumn',

  inject: ['XlTable'],
  props: {
    columnName: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    width: {
      type: Number,
      default: 0
    }
  },

  computed: {
    table () {
      return this.XlTable.value || this.XlTable
    }
  },

  created () {
    if (this.getColumnIndex(this.table.columns, this.label || this.columnName) < 0) {
      this.table.columns.push({
        columnName: this.columnName,
        label: this.label || this.columnName,
        width: this.width,
        header: this.$slots.header ? () => { return this.$slots.header() } : null,
        render: (h, data, $index) => {
          data.$index = $index
          return this.$slots.default ? this.$slots.default(data) : data[this.columnName]
        }
      })
    } else {
      const old = this.table.columns[this.getColumnIndex(this.table.columns, this.label || this.columnName)]
      this.table.columns.splice(this.getColumnIndex(this.table.columns, this.label || this.columnName), 1, {
        columnName: this.columnName,
        label: this.label || this.columnName,
        width: [old.width, this.width],
        header: this.$slots.header ? () => { return this.$slots.header() } : old.header,
        render: [old.render, (h, data, $index) => {
          data.$index = $index
          return this.$slots.default ? this.$slots.default(data) : data[this.columnName]
        }]
      })
    }
  },

  methods: {
    getColumnIndex (columns, columnName) {
      return columns.findIndex((c) => { return c.label === columnName })
    }
  }
}
</script>

<style scoped lang="less">
.XlTableColumn{
//css、less
}
</style>
