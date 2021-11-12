export default [{
  attrName: 'title',
  attrDesc: '标题',
  type: 'String',
  accepted: '',
  default: ''
},
{
  attrName: 'category-style',
  attrDesc: '目录自定义style',
  type: 'Object',
  accepted: '',
  default: ''
},
{
  attrName: 'left',
  attrDesc: '目录位置居左',
  type: 'Boolean',
  accepted: 'true/false',
  default: 'false'
},
{
  attrName: 'hide',
  attrDesc: '宽度小于指定值时隐藏目录，可设置false为永远不隐藏',
  type: 'Boolean, Number, String',
  accepted: '',
  default: '800'
},
// {
//   attrName: 'category-class',
//   attrDesc: '目录自定义class(必须为全局class)',
//   type: 'Object',
//   accepted: '',
//   default: ''
// },
{
  attrName: 'category-width',
  attrDesc: '目录宽度',
  type: 'Number/String',
  accepted: '',
  default: '200'
},
{
  attrName: 'fixed',
  attrDesc: '固定目录位置(需指定width)',
  type: 'Boolean',
  accepted: 'true/false',
  default: 'true'
},
{
  attrName: 'showOrder',
  attrDesc: '显示目录编号',
  type: 'Boolean',
  accepted: 'true/false',
  default: 'true'
}
]
