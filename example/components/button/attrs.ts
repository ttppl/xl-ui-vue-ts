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
  accepted: 'trur / false',
  default: 'false'
},
{
  attrName: 'plain',
  attrDesc: '边框风格',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
},
{
  attrName: 'popStyle',
  attrDesc: '自定义style',
  type: 'Object',
  accepted: '',
  default: ''
},
{
  attrName: 'circle',
  attrDesc: '圆形按钮',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
},
{
  attrName: 'label',
  attrDesc: '按钮文字',
  type: 'String',
  accepted: '',
  default: ''
},
{
  attrName: 'to',
  attrDesc: '路由地址',
  type: 'String / Object',
  accepted: 'routerArgsObject / routerName / routerPath',
  default: ''
}
]
