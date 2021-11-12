import { isMobile, isTrue } from './common'
import { createElement, EventManagers, getElementSize, getOffset, getStyle, getTransform, setPositioned, unshiftChild } from './dom'

type Callback = (Element:HTMLElement, options:{direction:string, widthAdd?:number, heightAdd?:number, domClone:HTMLElement})=>void

export default class ResizeHandler {
  dom:HTMLElement
  domClone:HTMLElement
  geometric:boolean// 等比例放宽
  callback:Callback
  eventManagers:EventManagers
  resizeBar:Array<HTMLElement>
  transform:boolean|string// true-transform，false-不移动位置
  barWidth:number
  // origsize:{width:number, height:number}// 原始宽高
  offset:{left:number, top:number}// 偏移量
  transformPos:{x:number, y:number}// trsnsform属性
  constructor (dom:HTMLElement, options:{geometric:boolean, barWidth:number, transform:boolean, callback:any}) {
  // constructor (dom:HTMLElement, ) {
    if (!dom) {
      throw new Error('元素不存在')
    }
    this.dom = dom
    this.geometric = options?.geometric
    this.barWidth = options?.barWidth || 5
    this.transform = options?.transform || this.geometric// 等比例放宽需要位移支持,也可手动关闭
    this.callback = options?.callback
    this.eventManagers = new EventManagers()
    const zIndex:number = parseFloat(getStyle(dom, 'zIndex'))
    const leftBar = createElement('div', { style: { cursor: 'w-resize', width: `${this.barWidth}px`, height: `calc(100% - ${this.barWidth * 4}px)`, position: 'absolute', left: '0', top: `${this.barWidth * 2}px` } })
    const rightBar = createElement('div', { style: { cursor: 'e-resize', width: `${this.barWidth}px`, height: `calc(100% - ${this.barWidth * 4}px)`, position: 'absolute', right: '0', top: `${this.barWidth * 2}px` } })
    const topBar = createElement('div', { style: { cursor: 'n-resize', width: `calc(100% - ${this.barWidth * 4}px)`, height: `${this.barWidth}px`, position: 'absolute', left: `${this.barWidth * 2}px`, top: '0' } })
    const bottomBar = createElement('div', { style: { cursor: 's-resize', width: `calc(100% - ${this.barWidth * 4}px)`, height: `${this.barWidth}px`, position: 'absolute', left: `${this.barWidth * 2}px`, bottom: '0' } })
    const topLeftBar = createElement('div', { style: { cursor: 'nw-resize', width: `${this.barWidth * 2}px`, height: `${this.barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, top: '0', left: 0 } })
    const bottomRightBar = createElement('div', { style: { cursor: 'nw-resize', width: `${this.barWidth * 2}px`, height: `${this.barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, bottom: '0', right: 0 } })
    const topRightBar = createElement('div', { style: { cursor: 'sw-resize', width: `${this.barWidth * 2}px`, height: `${this.barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, top: '0', right: 0 } })
    const bottomLeftBar = createElement('div', { style: { cursor: 'sw-resize', width: `${this.barWidth * 2}px`, height: `${this.barWidth * 2}px`, position: 'absolute', zIndex: zIndex + 1, bottom: '0', left: 0 } })
    this.resizeBar = [leftBar, rightBar, topBar, bottomBar, topLeftBar, bottomRightBar, topRightBar, bottomLeftBar]
    this.eventManagers.addElement(leftBar, 'left')
    this.eventManagers.addElement(rightBar, 'right')
    this.eventManagers.addElement(topBar, 'top')
    this.eventManagers.addElement(bottomBar, 'bottom')
    this.eventManagers.addElement(topLeftBar, 'angle-topleft')
    this.eventManagers.addElement(topRightBar, 'angle-topright')
    this.eventManagers.addElement(bottomRightBar, 'angle-bottomright')
    this.eventManagers.addElement(bottomLeftBar, 'angle-bottomleft')
    this.on()
  }

  resize (startX:number, startY:number, direction:string):void{
    const element = this.dom
    const size = this.getSize()
    const minWidth = parseFloat(getStyle(element, 'minWidth'))
    const minHeight = parseFloat(getStyle(element, 'minHeight'))
    const maxWidth = parseFloat(getStyle(element, 'maxWidth'))
    const maxHeight = parseFloat(getStyle(element, 'maxHeight'))
    const geometricCal = this.geometric ? 2 : 1// 等比例
    const mouseMoveCallback = (widthAdd, heightAdd) => {
      // resize需清除最大最小宽高
      if (minWidth && (minWidth > size.width + widthAdd)) {
        element.style.minWidth = 'initial'
      }
      if (minHeight && (minHeight > size.height + heightAdd)) {
        element.style.minHeight = 'initial'
      }
      if (maxWidth && (maxWidth < size.width + widthAdd)) {
        element.style.maxWidth = 'initial'
      }
      if (maxHeight && (maxHeight < size.height + heightAdd)) {
        element.style.maxHeight = 'initial'
      }
      if (this.transform) { this.calcPosition(direction, widthAdd, heightAdd) }
      // 执行回调函数
      (this.callback || function () {})(this.dom, { direction, widthAdd, heightAdd, domClone: this.domClone })
    }

    let move// touchmove回调函数
    if (['left', 'right'].includes(direction)) {
      if (isMobile) {
        move = (e:TouchEvent) => {
          e.preventDefault()
          const widthAdd = (direction === 'left' ? 1 : -1) * (startX - e.changedTouches[0].pageX) * geometricCal
          element.style.width = `${widthAdd + size.width}px`
          mouseMoveCallback(widthAdd, 0)
        }
        window.addEventListener('touchmove', move, { passive: false })
      } else {
        document.onmousemove = function (e) {
          e.preventDefault()
          const widthAdd = (direction === 'left' ? 1 : -1) * (startX - e.pageX) * geometricCal
          element.style.width = `${widthAdd + size.width}px`
          mouseMoveCallback(widthAdd, 0)
        }
      }
    }
    if (['top', 'bottom'].includes(direction)) {
      if (isMobile) {
        move = (e:TouchEvent) => {
          e.preventDefault()
          const heightAdd = (direction === 'top' ? 1 : -1) * (startY - e.changedTouches[0].pageY) * geometricCal
          element.style.height = `${heightAdd + size.height}px`
          mouseMoveCallback(0, heightAdd)
        }
        window.addEventListener('touchmove', move, { passive: false })
      } else {
        document.onmousemove = function (e) {
          e.preventDefault()
          const heightAdd = (direction === 'top' ? 1 : -1) * (startY - e.pageY) * geometricCal
          element.style.height = `${heightAdd + size.height}px`
          mouseMoveCallback(0, heightAdd)
        }
      }
    }
    if (direction.includes('angle')) {
      let widthAdd:number
      let heightAdd:number
      if (isMobile) {
        move = (e:TouchEvent) => {
          e.preventDefault()
          widthAdd = (direction.includes('left') ? 1 : -1) * (startX - e.changedTouches[0].pageX) * geometricCal
          heightAdd = (direction.includes('top') ? 1 : -1) * (startY - e.changedTouches[0].pageY) * geometricCal
          element.style.width = `${widthAdd + size.width}px`
          element.style.height = `${heightAdd + size.height}px`
          mouseMoveCallback(widthAdd, heightAdd)
        }
        window.addEventListener('touchmove', move, { passive: false })
      } else {
        document.onmousemove = function (e) {
          e.preventDefault()
          widthAdd = (direction.includes('left') ? 1 : -1) * (startX - e.pageX) * geometricCal
          heightAdd = (direction.includes('top') ? 1 : -1) * (startY - e.pageY) * geometricCal
          element.style.width = `${widthAdd + size.width}px`
          element.style.height = `${heightAdd + size.height}px`
          mouseMoveCallback(widthAdd, heightAdd)
        }
      }
    }
    if (isMobile) {
      const touchend = () => {
        window.removeEventListener('touchmove', move)
        window.removeEventListener('touchend', touchend)
      }
      window.addEventListener('touchend', touchend, { passive: false })
    } else {
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }

  // 获取元素宽高
  getSize ():{width:number, height:number} {
    return getElementSize(this.dom)
  }

  calcPosition (direction:string, widthAdd:number, heightAdd:number):void{
    if (isTrue(this.transform)) {
      let translateX = this.transformPos.x
      let translateY = this.transformPos.y
      if (this.geometric) {
        translateX -= widthAdd / 2
        translateY -= heightAdd / 2
      } else {
        if (direction.includes('left')) { translateX -= widthAdd }
        if (direction.includes('top')) { translateY -= heightAdd }
      }
      this.dom.style.transform = `translate(${translateX}px,${translateY}px)`
    } else if (this.transform === 'offset') { // transform不为空
      let left = this.offset.left
      let top = this.offset.top
      if (this.geometric) {
        left -= widthAdd / 2
        top -= heightAdd / 2
      } else {
        if (direction.includes('left')) { left -= widthAdd }
        if (direction.includes('top')) { top -= heightAdd }
      }
      this.dom.style.left = `${left}px`
      this.dom.style.top = `${top}px`
    }
  }

  on ():void{
    setPositioned(this.dom)// 设置position，不能为static，否则resizebar不能定位准确
    unshiftChild(this.dom, this.resizeBar)
    this.eventManagers.ems.forEach(em => {
      em.on(isMobile ? 'touchstart' : 'mousedown', (e:any) => {
        this.domClone = this.dom.cloneNode(true) as any
        if (isTrue(this.transform)) { this.transformPos = getTransform(this.dom) }// 获取元素transform位移值
        if (this.transform === 'offset') this.offset = getOffset(this.dom)// 获取元素偏移量
        const startX = isMobile ? e.changedTouches[0].pageX : e.pageX
        const startY = isMobile ? e.changedTouches[0].pageY : e.pageY
        this.resize(startX, startY, em.name)
      })
    })
  }

  off ():void{
    this.eventManagers.clearAll()
    // todo 删除bar
  }
}
