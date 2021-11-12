import { getElementSize, getOffsetLeft, getOffsetTop, getScrollWidth, hasScrollbar, hasScrollbarX } from './dom'

type POSITION='left'|'right'|'top'|'bottom'
type PositionCalcOptions = {
  initPosition?:POSITION, // 初始位置
  popperPosition?:'absolute'|'fixed', // popper-position属性
  toBody?:boolean// 是否放置在body下
}
type TranslateCalcOptions = {
  position?:POSITION, // 初始位置
  popperPosition?:'absolute'|'fixed', // popper-position属性
  toBody?:boolean// 是否放置在body下
}

export class Popper {
  source:HTMLElement
  popper:HTMLElement
  // source元素大小
  sourceWidth:number
  sourceHeight:number
  sourceTop:number
  sourceLeft:number
  // popper大小
  popperWidth:number
  popperHeight:number
  // 窗口信息
  viewWidth:number
  viewHeight:number
  constructor (source:HTMLElement, popper:HTMLElement) {
    this.source = source
    this.popper = popper
    this.getSourceSize()
    this.getPopperSize()
  }

  getSourceSize ():void{
    // 触发元素大小
    this.sourceWidth = this.source.getBoundingClientRect().width
    this.sourceHeight = this.source.getBoundingClientRect().height
  }

  getSourcePosition (popperPosition:'absolute'|'fixed'):void{
    this.sourceTop = popperPosition === 'absolute' ? getOffsetTop(this.source) : this.source.getBoundingClientRect().top
    this.sourceLeft = popperPosition === 'absolute' ? getOffsetLeft(this.source) : this.source.getBoundingClientRect().left
  }

  getViewSize (popperPosition:'absolute'|'fixed', toBody:boolean) {
    // 获取可视宽高
    const scrollbarWidth = getScrollWidth()
    this.viewWidth = popperPosition === 'absolute'
      ? (toBody ? Math.max((window.innerWidth - (hasScrollbarX() ? scrollbarWidth : 0)), document.body.clientWidth)
        : document.body.clientWidth)
      : (window.innerWidth - (hasScrollbarX() ? scrollbarWidth : 0))
    this.viewHeight = popperPosition === 'absolute'
      ? (toBody ? Math.max((window.innerHeight - (hasScrollbar() ? scrollbarWidth : 0)), document.body.clientHeight)
        : document.body.clientHeight)
      : (window.innerHeight - (hasScrollbar() ? scrollbarWidth : 0))
  }

  getPopperSize ():void{
    // popper大小
    this.popperWidth = this.popper.getBoundingClientRect().width
    this.popperHeight = this.popper.getBoundingClientRect().height
  }

  caculatePosition (options:PositionCalcOptions = {}):POSITION {
    // 参数加上默认值
    options = Object.assign({ initPosition: 'bottom', popperPosition: 'absolute', toBody: false }, options)

    this.getSourcePosition(options.popperPosition)// 获取触发元素位置
    this.getViewSize(options.popperPosition, options.toBody)
    const popperSquare = this.popperWidth * this.popperHeight// 元素面积

    const position:POSITION = options.initPosition as POSITION || 'bottom'
    // 上下左右剩余空间
    const restSpace = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
    // 上下左右显示面积
    const showSqure = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
    // 计算剩余空间
    restSpace.left = this.sourceLeft
    restSpace.right = this.viewWidth - this.sourceLeft - this.sourceWidth
    restSpace.top = this.sourceTop
    restSpace.bottom = this.viewHeight - this.sourceTop - this.sourceHeight
    // 计算显示面积
    showSqure.left = Math.min(this.viewHeight, this.popperHeight) * Math.min(this.viewWidth, restSpace.left)
    showSqure.right = Math.min(this.viewHeight, this.popperHeight) * Math.min(this.viewWidth, restSpace.right)
    showSqure.top = Math.min(this.viewWidth, this.popperWidth) * Math.min(this.viewHeight, restSpace.top)
    showSqure.bottom = Math.min(this.viewWidth, this.popperWidth) * Math.min(this.viewHeight, restSpace.bottom)
    // 判断位置
    if (showSqure[options.initPosition] === popperSquare) {
      return options.initPosition
    } else { // 返回显示面积最大的方向
      const max = Math.max(showSqure.left, showSqure.right, showSqure.top, showSqure.bottom)
      Object.keys(showSqure).forEach(k => {
        if (showSqure[k] === max) { return k }
      })
    }

    return position
  }

  caculateTranslate (options:TranslateCalcOptions = {}):{x:number, y:number} {
    options = Object.assign({ position: 'bottom', popperPosition: 'absolute', toBody: false }, options)
    const translate = { x: 0, y: 0 }
    if (options.popperPosition === 'absolute') {
      if (options.toBody) {
        if (['bottom', 'top'].includes(options.position)) {
          if (this.popperWidth > this.viewHeight) {
            translate.x = -(this.viewHeight - this.popperWidth) / 2
          } else {
            translate.x = Math.max((this.sourceLeft - this.popperWidth / 2), 0)
          }
          translate.y = options.position === 'bottom' ? 0 : 0
        }
      }
    }
    return translate
  }
}
