import { toRef } from 'vue'
export const getToRef = (target, ...attrs) => {
  const activeData = {}
  attrs.forEach(key => {
    activeData[key] = toRef(target, key)
  })
  return activeData
}

export default { getToRef }
