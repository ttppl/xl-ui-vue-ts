export default [{
  attrName: 'modelValue',
  attrDesc: 'model绑定',
  type: 'boolean',
  accepted: 'true / false',
  default: ''
}, {
  attrName: 'inline',
  attrDesc: '触发元素显示为行内元素',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'toBody',
  attrDesc: '将弹出框放置到body中',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'width',
  attrDesc: '宽度',
  type: 'String / Number',
  accepted: '',
  default: ''
},
{
  attrName: 'height',
  attrDesc: '高度',
  type: 'String / Number',
  accepted: '',
  default: ''
},
{
  attrName: 'min-width',
  attrDesc: '最小宽度',
  type: 'String / Number',
  accepted: '',
  default: ''
},
{
  attrName: 'max-width',
  attrDesc: '最大宽度',
  type: 'String / Number',
  accepted: '',
  default: ''
},
{
  attrName: 'min-height',
  attrDesc: '最小高度',
  type: 'String / Number',
  accepted: '',
  default: ''
},
{
  attrName: 'max-height',
  attrDesc: '最大高度',
  type: 'String / Number',
  accepted: '',
  default: ''
}, {
  attrName: 'offset',
  attrDesc: '弹出框自身偏移值',
  type: 'Number / String',
  accepted: '',
  default: ''
}, {
  attrName: 'offsetParent',
  attrDesc: '弹出框相对于父元素的偏移值',
  type: 'Number / String',
  accepted: '',
  default: ''
}, {
  attrName: 'trigger',
  attrDesc: '触发方式',
  type: 'String',
  accepted: 'click / hover / manual',
  default: 'click'
}, {
  attrName: 'popStyle',
  attrDesc: '弹出框自定义style',
  type: 'Object',
  accepted: '',
  default: ''
}, {
  attrName: 'showArrow',
  attrDesc: '是否显示箭头',
  type: 'boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'position',
  attrDesc: '弹出框位置',
  type: 'String',
  accepted: 'left / right / top / bottom',
  default: 'bottom'
}
// , {
//   attrName: 'alwaysGivenPosition',
//   attrDesc: '弹框固定显示在指定位置，不根据页面改变自适应',
//   type: 'boolean',
//   accepted: 'true / false',
//   default: 'false'
// }, {
//   attrName: 'alwaysInView',
//   attrDesc: '保持弹窗在页面可视范围内',
//   type: 'boolean',
//   accepted: 'true / false',
//   default: 'true'
// }
]
