import { toRef } from 'vue'

export const hasClick = (ctx) => {
  if (!ctx || !ctx.attrs) { return false }
  return ctx.attrs.onClick || ctx.attrs.onClickCapture
}

export const getToRef = (target, ...attrs) => {
  const activeData = {}
  attrs.forEach(key => {
    activeData[key] = toRef(target, key)
  })
  return activeData
}

export default { hasClick, getToRef }
