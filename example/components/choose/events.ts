export default [
  {
    eventName: 'label-click',
    eventDesc: 'label点击时触发（model值还未改变）',
    args: '{ model:点击前model的值，value：choose对应的值，event：原生点击event }'
  }, {
    eventName: 'change',
    eventDesc: 'model值改变时触发',
    args: 'value：model的值'
  }
]
