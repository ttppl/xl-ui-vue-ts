import { isFunction } from '@vue/shared'
import { isBoolean, isMobile } from './common'
import { EventManager, Listener, getStyle, setStyle, getTransform, getOffset } from './dom'

type Callback = (event?:Event)=>void
type Options = { target?: HTMLElement, callback:Callback, transform:boolean, propagation:boolean}
export default class DragHandler {
  dom:HTMLElement// 触发事件的元素
  target:HTMLElement// 移动的元素
  callback:Callback
  em:EventManager
  emDocument:EventManager
  startEvent:Listener
  transform:boolean// 位移方式，默认transform属性，否则使用offset
  propagation:boolean
  position:string// 目标元素的position属性，用于offset移动计算位置
  constructor (source:HTMLElement, options:Options = { target: null, callback: () => {}, transform: true, propagation: false }) {
    if (!source) {
      throw new Error('源元素不能为空')
    }
    this.dom = source
    this.target = options.target || source
    this.callback = isFunction(options.callback) ? options.callback : () => {}
    this.transform = isBoolean(options.transform) ? options.transform : true
    this.propagation = options.propagation
    this.em = new EventManager(source)
    this.emDocument = new EventManager(document)
    this.on()
  }

  on ():void{
    const element = this.target
    if (!this.transform) { // offset方式移动需position部位static
      const style = getStyle(element, 'position')
      if (style === 'static') {
        setStyle(element, 'position', 'relative')
        this.position = 'relative'
      } else {
        this.position = style
      }
    }
    if (isMobile) {
      this.startEvent = this.em.on('touchstart', (e:TouchEvent) => {
        e.preventDefault()
        if (!this.propagation) { e.stopPropagation() }
        const posStart = e.changedTouches[0]
        let moveEvent:Listener
        if (this.transform) { // transform位移
          const transform = getTransform(this.target)
          const disx = posStart.pageX
          const disy = posStart.pageY
          moveEvent = this.emDocument.on('touchmove', (e:TouchEvent) => {
            e.preventDefault()
            e.stopPropagation()
            const posMove = e.changedTouches[0]
            element.style.transform = `translate(${transform.x + posMove.pageX - disx}px,${transform.y + posMove.pageY - disy}px)`
            this.callback(e)
          })
        } else { // offset定位
          const position = this.position === 'relative' ? { left: parseFloat(getStyle(this.target, 'left')), top: parseFloat(getStyle(this.target, 'top')) } : getOffset(this.target)
          const disx = posStart.pageX
          const disy = posStart.pageY
          moveEvent = this.emDocument.on('touchmove', (e:TouchEvent) => {
            e.preventDefault()
            e.stopPropagation()
            const posMove = e.changedTouches[0]
            element.style.left = `${position.left + posMove.pageX - disx}px`
            element.style.top = `${position.top + posMove.pageY - disy}px`
            this.callback(e)
          })
        }
        const toucheEnd = this.emDocument.on('touchend', () => {
          e.preventDefault()
          e.stopPropagation()
          this.emDocument.off(moveEvent)
          this.emDocument.off(toucheEnd)
        })
      })
    } else {
      this.startEvent = this.em.on('mousedown', (e:MouseEvent) => {
        e.preventDefault()
        if (!this.propagation) { e.stopPropagation() }
        let mousemove:Listener
        if (this.transform) {
          const disx = e.pageX
          const disy = e.pageY
          const transform = getTransform(this.target)
          mousemove = this.emDocument.on('mousemove', (e:MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            element.style.transform = `translate(${transform.x + e.pageX - disx}px,${transform.y + e.pageY - disy}px)`
            this.callback(e)
          })
        } else {
          const position = this.position === 'relative' ? { left: parseFloat(getStyle(this.target, 'left')), top: parseFloat(getStyle(this.target, 'top')) } : getOffset(this.target)
          const disx = e.pageX
          const disy = e.pageY
          mousemove = this.emDocument.on('mousemove', (e:MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
            element.style.left = `${position.left + e.pageX - disx}px`
            element.style.top = `${position.top + e.pageY - disy}px`
            this.callback(e)
          })
        }
        const mouseup = this.emDocument.on('mouseup', (e:MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          this.emDocument.off(mousemove)
          this.emDocument.off(mouseup)
          // this.em.off(mouseleave)
        })
        // const mouseleave = this.em.on('mouseleave', (e:MouseEvent) => {
        //   e.preventDefault()
        //   e.stopPropagation()
        //   this.em.off(mousemove)
        //   this.em.off(mouseup)
        //   this.em.off(mouseleave)
        // })
      }, true)
    }
  }

  pause ():void{
    this.em.off(this.startEvent)
  }

  off ():void{
    this.em.clear()
  }
}
