const zIndexManager = {
  zIndex: 1000,
  nextIndex: () => {
    return ++zIndexManager.zIndex
  }
}

export default zIndexManager
