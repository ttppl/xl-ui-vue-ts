import { computed } from '@vue/reactivity'
import prop from './props'
export default (chooseGroup, props) => {
  const isGroup = computed(() => {
    return !!chooseGroup
  })
  // 属性
  // const attrs = { type: null }
  // const base = isGroup.value ? chooseGroup : props
  // Object.keys(props).forEach(name => {
  //   attrs[name] = computed(() => {
  //     return base[name]
  //   })
  // })
  // attrs.type = computed(() => {
  //   return base.type?.toLowerCase()
  // })
  const attrs = computed(() => {
    const base = isGroup.value ? chooseGroup : props
    const attrs = {}
    Object.keys(prop).forEach(name => {
      attrs[name] = base[name] ?? props[name]
    })
    // return {
    //   type: base.type?.toLowerCase(),
    //   iconType: base.iconType,
    //   iconStyleType: base.iconStyleType,
    //   lightStyle: base.lightStyle,
    //   labelPosition: base.labelPosition,
    //   enableCancle: base.enableCancle,
    //   inline: base.inline
    // }
    return attrs
  })
  return { isGroup, attrs }
}
