export default [{
  attrName: 'modelValue',
  attrDesc: 'model绑定',
  type: 'boolean',
  accepted: 'true / false',
  default: ''
}, {
  attrName: 'toBody',
  attrDesc: '将弹框放置到body中',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'direction',
  attrDesc: '弹框位置',
  type: 'String',
  accepted: 'center / left / right / top / bottom',
  default: 'center'
}, {
  attrName: 'showClose',
  attrDesc: '显示关闭按钮',
  type: 'boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'lockScreen',
  attrDesc: '弹框显示时锁定滚动',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'closeIcon',
  attrDesc: '关闭按钮类型',
  type: 'string',
  accepted: 'primary / warn / notice / error / success',
  default: ''
}, {
  attrName: 'mask',
  attrDesc: '显示遮罩层',
  type: 'boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'type',
  attrDesc: '弹框类型（drawer抽屉，dialog对话框）',
  type: 'string',
  accepted: 'drawer / dialog',
  default: 'drawer'
}, {
  attrName: 'draggable',
  attrDesc: '弹框可拖动位置，type为dialog时生效',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'resizable',
  attrDesc: '弹框可缩放，type为dialog时生效',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'showScroll',
  attrDesc: '显示滚动条',
  type: 'String, Boolean',
  accepted: 'true / false / \'x\' / \'y\'',
  default: 'true'
}, {
  attrName: 'closeOnPressEscape',
  attrDesc: '按ESC键关闭弹框',
  type: 'boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'closeOnClickMask',
  attrDesc: '点击遮罩层关闭弹框',
  type: 'boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'popStyle',
  attrDesc: '自定义弹框style',
  type: 'Object',
  accepted: '',
  default: ''
}, {
  attrName: 'popClass',
  attrDesc: '自定义弹框class（全局或带穿透的class）',
  type: 'Array / String / Object',
  accepted: '',
  default: ''
}, {
  attrName: 'title',
  attrDesc: '标题',
  type: 'String',
  accepted: '',
  default: ''
}, {
  attrName: 'width',
  attrDesc: '宽度',
  type: 'String / Number',
  accepted: '',
  default: '200'
},
{
  attrName: 'height',
  attrDesc: '高度',
  type: 'String / Number',
  accepted: '',
  default: '200'
}]
