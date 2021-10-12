export const go = (to, router) => {
  if (to && router) {
    if (to.toString() === '-1') {
      router.go(-1)
    } else if (typeof to === 'string') {
      if (to.slice(0, 1) !== '/') {
        router.push({ name: to })
      } else {
        router.push({ path: to })
      }
    } else {
      router.push(to)
    }
  }
}

export default { go }
