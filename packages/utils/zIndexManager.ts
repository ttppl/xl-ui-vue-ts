export const zIndexManager = {
  zIndex: 1000,
  max: 9999,
  nextIndex: () => {
    return Math.min(++zIndexManager.zIndex, zIndexManager.max)
  }
}

export default zIndexManager
