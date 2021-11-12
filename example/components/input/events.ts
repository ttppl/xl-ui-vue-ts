export default [{
  eventName: 'input',
  eventDesc: '输入事件,输入时触发',
  args: 'value:输入的值'
}, {
  eventName: 'change',
  eventDesc: 'input失去焦点且值改变时触发',
  args: 'value:输入的值'
}, {
  eventName: 'blur',
  eventDesc: 'input失去焦点时触发',
  args: 'value:输入的值'
}, {
  eventName: 'focus',
  eventDesc: 'input获取焦点时触发',
  args: 'FocusEvent:聚焦事件'
}, {
  eventName: 'clear',
  eventDesc: 'input清空时触发',
  args: 'value:清空前value'
}]
