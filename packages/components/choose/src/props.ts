export default {
  labelPosition: {
    type: String,
    default: 'right'
  },

  iconType: {
    type: String,
    default: 'radio'
  },

  iconStyleType: {
    type: String,
    default: 'primary'
  },

  lightStyle: Boolean,

  enableCancle: { // 可取消
    type: [Boolean, Function],
    default: null
  },

  type: {
    type: String,
    default: 'radio'
  },
  max: {
    type: Number,
    default: -1
  },

  inline: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  }
}
