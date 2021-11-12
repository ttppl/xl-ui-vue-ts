export default [{
  attrName: 'type',
  attrDesc: '类型',
  type: 'String',
  accepted: 'primary / warn / notice / error / success',
  default: 'primary'
},
{
  attrName: 'light-style',
  attrDesc: '浅色风格',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
},
{
  attrName: 'textType',
  attrDesc: '输入框类型',
  type: 'String',
  accepted: 'text(文本框) / textarea(文本域)',
  default: 'text'
},
{
  attrName: 'row',
  attrDesc: '文本域行数（只有textType为textarea时生效）',
  type: 'String',
  accepted: '',
  default: '3'
},
{
  attrName: 'height',
  attrDesc: '高度（只有textType为text时生效）',
  type: 'Number / String',
  accepted: '',
  default: '50'
},
{
  attrName: 'modelValue',
  attrDesc: 'v-model双向绑定',
  type: 'String',
  accepted: '',
  default: ''
},
{
  attrName: 'placeholder',
  attrDesc: '提示语',
  type: 'String',
  accepted: '',
  default: ''
},
{
  attrName: 'popClass',
  attrDesc: '自定义class（必须为全局class）',
  type: 'Array /  String',
  accepted: '',
  default: ''
},
{
  attrName: 'popStyle',
  attrDesc: '自定义style',
  type: 'Object',
  accepted: '',
  default: ''
}, {
  attrName: 'showClear',
  attrDesc: '显示清空图标',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'true'
}]
