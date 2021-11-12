export default [{
  attrName: 'showScroll',
  attrDesc: '显示滚动条，false不显示，x显示横向滚动条，y显示纵向滚动条',
  type: 'Boolean/String',
  accepted: 'true/false/\'x\'/\'y\'',
  default: 'true'
}, {
  attrName: 'showOnhover',
  attrDesc: '元素hover事件触发才显示滚动条',
  type: 'Boolean',
  accepted: 'true/false',
  default: 'false'
},
{
  attrName: 'width',
  attrDesc: '宽度',
  type: 'String, Number',
  accepted: '',
  default: ''
},
{
  attrName: 'height',
  attrDesc: '高度',
  type: 'String, Number',
  accepted: '',
  default: ''
},
{
  attrName: 'maxWidth',
  attrDesc: '最大宽度',
  type: 'String, Number',
  accepted: '',
  default: ''
},
{
  attrName: 'maxHeight',
  attrDesc: '最大高度',
  type: 'String, Number',
  accepted: '',
  default: ''
},
{
  attrName: 'barWidth',
  attrDesc: '滚动条宽度',
  type: 'Number',
  accepted: '',
  default: '5'
},
{
  attrName: 'type',
  attrDesc: '滚动条样式',
  type: 'string',
  accepted: 'primary / warn / notice / error / success',
  default: 'notice'
}, {
  attrName: 'light-style',
  attrDesc: '滚动条浅色风格',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
},
{
  attrName: 'popBarStyle',
  attrDesc: '自定义滚动条style',
  type: 'Object',
  accepted: '',
  default: ''
}]
