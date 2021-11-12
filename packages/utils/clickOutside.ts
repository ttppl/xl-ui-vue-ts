
import { isMobile } from '@/utils/common'
import { EventManager, Listener } from '@/utils/dom'
import { isFunction } from '@vue/shared'

type Callback = (e:Event, el:HTMLElement)=>void

type Options = {
  callback:Callback
}
export default class ClickOutside {
  em:EventManager
  targets:Map<HTMLElement, Options>
  startEvent:Listener
  constructor () {
    this.em = new EventManager(document)
    this.targets = new Map()
    this.on()
  }

  addSource (target:HTMLElement, options:Options):void{
    if (target && isFunction(options.callback)) { this.targets.set(target, options) }
  }

  removeSource (dom:HTMLElement):void{
    this.targets.delete(dom)
  }

  on ():void{
    this.startEvent = this.em.on(isMobile ? 'touchstart' : 'mousedown', () => {
      const mouseUp = this.em.on(isMobile ? 'touchend' : 'mouseup', (e:MouseEvent) => {
        this.em.off(mouseUp)// 清除mouseUp事件
        this.targets.forEach((v, k) => {
          if (!k.contains(e.target as any)) {
            v.callback(e, k)
          }
        })
      })
    })
  }

  pause ():void{ // 暂停
    this.em.off(this.startEvent)
  }

  off ():void{ // 销毁
    this.em.clear()
    this.targets = null
  }
}
