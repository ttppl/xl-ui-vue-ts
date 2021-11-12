export default [{
  attrName: 'type',
  attrDesc: '类型',
  type: 'String',
  accepted: 'default / primary / warn / notice / error / success',
  default: 'default'
},
{
  attrName: 'size',
  attrDesc: '大小',
  type: 'Number, String',
  accepted: '',
  default: '16'
},
{
  attrName: 'position',
  attrDesc: '位置',
  type: 'String',
  accepted: 'left，right，top，bottom自由组合，以-连接',
  default: 'right-top'
},
{
  attrName: 'offset',
  attrDesc: '位置偏移量（属性与position对应）',
  type: 'Object（接受属性left/right/top/bottom:String/Number）',
  accepted: '',
  default: ''
},
{
  attrName: 'label',
  attrDesc: '显示的文本',
  type: 'String',
  accepted: '',
  default: ''
}]
