export default [{
  attrName: 'model',
  attrDesc: '绑定值',
  type: 'String / Number / Boolean / Array',
  accepted: '',
  default: ''
}, {
  attrName: 'type',
  attrDesc: '类型',
  type: 'String',
  accepted: 'radio / checkbox',
  default: 'radio'
}, {
  attrName: 'max',
  attrDesc: '最大选择项（type为checkbox时生效，0为全部禁用）',
  type: 'Number',
  accepted: '',
  default: '-1'
}, {
  attrName: 'value',
  attrDesc: '选择后赋的值',
  type: 'String / Number / Boolean',
  accepted: '',
  default: ''
}, {
  attrName: 'label',
  attrDesc: '标签',
  type: 'String',
  accepted: '',
  default: ''
}, {
  attrName: 'name',
  attrDesc: '原生name属性',
  type: 'String',
  accepted: '',
  default: ''
}, {
  attrName: 'iconType',
  attrDesc: '图标类型',
  type: 'String',
  accepted: '',
  default: 'radio'
}, {
  attrName: 'iconStyleType',
  attrDesc: '图标风格',
  type: 'String',
  accepted: 'primary / warn / notice / error / success',
  default: 'primary'
}, {
  attrName: 'lightStyle',
  attrDesc: '明亮风格',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'inline',
  attrDesc: '显示为行内元素',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'showIcon',
  attrDesc: '是否显示图标',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'enableCancle',
  attrDesc: '是否可取消（type为radio时生效）',
  type: 'Boolean / Function',
  accepted: '',
  default: 'null'
}, {
  attrName: 'disabled',
  attrDesc: '是否禁用',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'checked',
  attrDesc: '是否被选中',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
}
]

export const groupAttrs = [{
  attrName: 'model',
  attrDesc: '绑定值',
  type: 'String / Number / Boolean / Array',
  accepted: '',
  default: ''
}, {
  attrName: 'type',
  attrDesc: '类型',
  type: 'String',
  accepted: 'radio / checkbox',
  default: 'radio'
}, {
  attrName: 'max',
  attrDesc: '最大选择项（type为checkbox时生效，0为全部禁用）',
  type: 'Number',
  accepted: '',
  default: '-1'
}, {
  attrName: 'iconType',
  attrDesc: '图标类型',
  type: 'String',
  accepted: '',
  default: 'radio'
}, {
  attrName: 'iconStyleType',
  attrDesc: '图标风格',
  type: 'String',
  accepted: 'primary / warn / notice / error / success',
  default: 'primary'
}, {
  attrName: 'lightStyle',
  attrDesc: '明亮风格',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'false'
}, {
  attrName: 'inline',
  attrDesc: '显示为行内元素',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'showIcon',
  attrDesc: '是否显示图标',
  type: 'Boolean',
  accepted: 'true / false',
  default: 'true'
}, {
  attrName: 'enableCancle',
  attrDesc: '是否可取消（type为radio时生效）',
  type: 'Boolean / Function',
  accepted: '',
  default: 'null'
}
]
