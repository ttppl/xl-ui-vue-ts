import dom from './dom'
const barWidth = 5

const resize = function (e, direction, element) {
  const size = dom.getElementSize(element)
  const startX = e.pageX
  const startY = e.pageY
  const left = element.offsetLeft
  const top = element.offsetTop
  if (['left', 'right'].includes(direction)) {
    document.onmousemove = function (e) {
      e.preventDefault()
      element.style.width = `${(direction === 'left' ? 1 : -1) * (startX - e.pageX) + size.width}px`
      element.style.left = `${(direction === 'left' ? (e.pageX - startX) : 0) + left}px`
    }
  }
  if (['top', 'bottom'].includes(direction)) {
    document.onmousemove = function (e) {
      e.preventDefault()
      element.style.height = `${(direction === 'top' ? 1 : -1) * (startY - e.pageY) + size.height}px`
      element.style.top = `${(direction === 'top' ? (e.pageY - startY) : 0) + top}px`
    }
  }
  if (direction.includes('angle')) {
    document.onmousemove = function (e) {
      e.preventDefault()
      element.style.width = `${(direction.includes('left') ? 1 : -1) * (startX - e.pageX) + size.width}px`
      element.style.left = `${(direction.includes('left') ? (e.pageX - startX) : 0) + left}px`
      element.style.height = `${(direction.includes('top') ? 1 : -1) * (startY - e.pageY) + size.height}px`
      element.style.top = `${(direction.includes('top') ? (e.pageY - startY) : 0) + top}px`
    }
  }
  document.onmouseup = function () {
    // bar.style.width=`${element.style.width.replace('px','')/1 - barWidth*4}px`
    // bar.style.height=`${element.style.height.replace('px','')/1 - barWidth*4}px`
    document.onmousemove = document.onmouseup = null
  }
}

export default {
  // beforeMount(el){
  //   // const style = {width:'100%' , height:'100%', position:'absolute'}
  //   // const resizer = dom.createElement('div',{style:style})
  //   // const barWidth = '5px'
  //   // const leftBar = dom.createElement('div',{style:{cursor:'w-resize',width:barWidth,height:'100%',position:'absolute',left:'0'}})
  //   // const rightBar = dom.createElement('div',{style:{cursor:'e-resize',width:barWidth,height:'100%',position:'absolute',right:'0'}})
  //   // const topBar = dom.createElement('div',{style:{cursor:'n-resize',width:'100%',height:barWidth,position:'absolute',top:'0'}})
  //   // const tbpttomBar = dom.createElement('div',{style:{cursor:'s-resize',width:'100%',height:barWidth,position:'absolute',bottom:'0'}})
  //   // const angleWidth = '10px'
  //   // const topLeftBar = dom.createElement('div',{style:{cursor:'nw-resize',width:angleWidth,height:angleWidth,position:'absolute',top:'0',left:0}})
  //   // const resizeBar = [leftBar,rightBar,topBar,tbpttomBar,topLeftBar]
  //   // dom.unshiftChild(resizer,resizeBar)
  //   // dom.unshiftChild(el,resizer)
  //   // console.log(dom.getElementSize(el));
  // },
  mounted (el, binding) {
    if (binding.value?.disable) {
      return
    }
    // const size = dom.getElementSize(el)
    // const style = {width:'100%' , height:'100%', position:'absolute'}
    // const resizer = dom.createElement('div',{style:style})
    const zIndex = dom.getStyle(el, 'zIndex') / 1
    const leftBar = dom.createElement('div', { style: { cursor: 'w-resize', width: `${barWidth}px`, height: '100%', position: 'absolute', left: '0', top: `${barWidth * 2}px` } })
    const rightBar = dom.createElement('div', { style: { cursor: 'e-resize', width: `${barWidth}px`, height: '100%', position: 'absolute', right: '0', top: `${barWidth * 2}px` } })
    const topBar = dom.createElement('div', { style: { cursor: 'n-resize', width: '100%', height: `${barWidth}px`, position: 'absolute', left: `${barWidth * 2}px`, top: '0' } })
    const bottomBar = dom.createElement('div', { style: { cursor: 's-resize', width: '100%', height: `${barWidth}px`, position: 'absolute', left: `${barWidth * 2}px`, bottom: '0' } })
    const topLeftBar = dom.createElement('div', { style: { cursor: 'nw-resize', width: `${barWidth * 2}px`, height: `${barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, top: '0', left: 0 } })
    const bottomRightBar = dom.createElement('div', { style: { cursor: 'nw-resize', width: `${barWidth * 2}px`, height: `${barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, bottom: '0', right: 0 } })
    const topRightBar = dom.createElement('div', { style: { cursor: 'sw-resize', width: `${barWidth * 2}px`, height: `${barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, top: '0', right: 0 } })
    const bottomLeftBar = dom.createElement('div', { style: { cursor: 'sw-resize', width: `${barWidth * 2}px`, height: `${barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, bottom: '0', left: 0 } })
    leftBar.onmousedown = (e) => { resize(e, 'left', el) }
    rightBar.onmousedown = (e) => { resize(e, 'right', el) }
    topBar.onmousedown = (e) => { resize(e, 'top', el) }
    bottomBar.onmousedown = (e) => { resize(e, 'bottom', el) }
    topLeftBar.onmousedown = (e) => { resize(e, 'angle-topleft', el) }
    topRightBar.onmousedown = (e) => { resize(e, 'angle-topright', el) }
    bottomRightBar.onmousedown = (e) => { resize(e, 'angle-bottomright', el) }
    bottomLeftBar.onmousedown = (e) => { resize(e, 'angle-bottomleft', el) }
    const resizeBar = [leftBar, rightBar, topBar, bottomBar, topLeftBar, bottomRightBar, topRightBar, bottomLeftBar]
    // dom.unshiftChild(resizer,resizeBar)
    dom.unshiftChild(el, resizeBar)
  },
  unmounted () {
  }
}
