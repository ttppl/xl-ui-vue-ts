export default [{
  attrName: '参数1',
  attrDesc: '源元素（触发drag事件的元素）',
  type: 'HTMLElement',
  accepted: '',
  default: ''
}, {
  attrName: '参数2对象属性:target',
  attrDesc: '目标元素(触发drag事件后移动的元素，如未指定默认为源元素)',
  type: 'HTMLElement',
  accepted: '',
  default: ''
}, {
  attrName: '参数2对象属性:transform',
  attrDesc: '是否通过transform位移，false则通过offset位移',
  type: 'Boolean',
  accepted: 'true/false',
  default: 'true'
}, {
  attrName: '参数2对象属性:callback',
  attrDesc: '回调函数(参数：event)',
  type: 'function',
  accepted: '',
  default: ''
},
{
  attrName: '参数2对象属性:propagation',
  attrDesc: '允许事件冒泡',
  type: 'boolean',
  accepted: 'true/false',
  default: 'false'
}]
