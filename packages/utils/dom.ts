import { camelize, isObject, trim, isArray, isString } from './common'

export function createElement (name:string, options:Record<string, string|Array<unknown>|Record<string, unknown>>):HTMLElement {
  const el = document.createElement(name)
  addClass(el, options.class)
  if (isObject(options.style)) {
    Object.keys(options.style).forEach(key => {
      setStyle(el, key, options.style[key])
    })
  }
  return el
}

export function addChild (el:HTMLElement, chil:HTMLElement|NodeList|Array<HTMLElement>):void {
  if (isArray(chil) || Object.prototype.toString.call(chil) === '[object NodeList]') {
    (chil as NodeList|Array<HTMLElement>).forEach(chi => {
      el.appendChild(chi)
    })
  } else {
    el.appendChild(chil as HTMLElement)
  }
}

export function unshiftChild (el:HTMLElement, chil:HTMLElement|NodeList|Array<HTMLElement>):void {
  const ele = el.firstChild
  if (isArray(chil) || Object.prototype.toString.call(chil) === '[object NodeList]') {
    (chil as NodeList|Array<HTMLElement>).forEach(chi => {
      unshiftChild(el, chi)
    })
  } else {
    el.insertBefore(chil as HTMLElement, ele)
  }
}

export function hasClass (el:HTMLElement, cls:string):boolean {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.') }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

function getClasses (cls:string|Array<unknown>|Record<string, unknown>):Array<string> {
  let classes = []
  if (isString(cls)) {
    classes = (cls as string || '').split(' ')
  } else if (isArray(cls)) {
    for (let i = 0, j = cls.length; i < j; i++) {
      classes = [...classes, ...getClasses(cls[i])]
      // classes = classes.concat(getClasses(cls))
    }
  } else if (isObject(cls)) {
    Object.keys(cls).forEach(key => {
      if (cls[key]) {
        // classes = classes.concat(getClasses(key))
        classes = [...classes, ...getClasses(key)]
      }
    })
  }
  return classes
}

export function addClass (el:HTMLElement, cls:string|Array<unknown>|Record<string, unknown>):void {
  if (!el) return
  let curClass = el.className
  const classes = getClasses(cls)
  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass (el:HTMLElement, cls:string):void {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const getStyle = function (element:HTMLElement, styleName:string):string {
  if (!element || !styleName) return null
  styleName = camelize(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const style = element.style[styleName]
    if (style) return style
    const computed = document.defaultView.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}

export function setStyle (element:HTMLElement, styleName:string, value:string):void {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    Object.keys(styleName).forEach(prop => {
      setStyle(element, prop, styleName[prop])
    })
  } else {
    styleName = camelize(styleName)
    element.style[styleName] = value
  }
}

export function removeStyle (element:HTMLElement, style:string):void {
  if (!element || !style) return

  if (isObject(style)) {
    Object.keys(style).forEach(prop => {
      setStyle(element, prop, '')
    })
  } else {
    setStyle(element, style, '')
  }
}

function isNoneDisplay (el:HTMLElement):{isNone:boolean, ele:HTMLElement} {
  const display = getStyle(el, 'display')
  if (display !== 'none') {
    if (el && el.parentNode && el.parentNode.nodeName !== 'BODY') {
      return isNoneDisplay(el.parentNode as HTMLElement)
    } else {
      return { isNone: false, ele: el }
    }
  } else {
    return { isNone: true, ele: el }
  }
}

export function getElementSize (el:HTMLElement, elPos = 'absolute'):{width:number, height:number} {
  const size = {
    width: 0,
    height: 0
  }
  const displayNone = isNoneDisplay(el)
  if (displayNone.isNone) {
    const position = getStyle(displayNone.ele, 'position')
    const zIndex = getStyle(displayNone.ele, 'zIndex')
    const visibility = getStyle(displayNone.ele, 'visibility')
    const display = getStyle(displayNone.ele, 'display')
    setStyle(displayNone.ele, 'position', elPos)
    setStyle(displayNone.ele, 'zIndex', '-100')
    setStyle(displayNone.ele, 'visibility', 'hidden')
    setStyle(displayNone.ele, 'display', 'block')
    size.width = displayNone.ele.getBoundingClientRect().width
    size.height = displayNone.ele.getBoundingClientRect().height
    setStyle(displayNone.ele, 'position', position)
    setStyle(displayNone.ele, 'zIndex', zIndex)
    setStyle(displayNone.ele, 'visibility', visibility)
    setStyle(displayNone.ele, 'display', display)
  } else {
    size.width = el.getBoundingClientRect().width
    size.height = el.getBoundingClientRect().height
  }
  return size
}

export function on (
  element:HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false):void {
  element.addEventListener(event, handler, useCapture)
}

export function off (
  element:HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false):void {
  element.removeEventListener(event, handler, useCapture)
}

export interface Listener{
  id:number
  event:string
  handler:EventListenerOrEventListenerObject
  useCapture:boolean
}
export class EventManager {
  dom:HTMLElement | Document | Window;
  listeners:Map<number, Listener>;
  idCount:number;
  name:string;
  constructor (dom:HTMLElement | Document | Window, name?:string) {
    this.dom = dom
    this.listeners = new Map()
    this.idCount = 1
    this.name = name
  }

  on (event: string, handler: EventListenerOrEventListenerObject, useCapture = false): Listener {
    const listener = { id: this.idCount++, event: event, handler: handler, useCapture: useCapture }
    this.listeners.set(listener.id, listener)
    on(this.dom, event, handler, useCapture)
    return listener
  }

  off (listener:Listener):boolean {
    // const index = this.listeners.findIndex(e => { return e.id === listener.id })
    listener = this.listeners.get(listener.id)
    if (listener) {
      off(this.dom, listener.event, listener.handler, listener.useCapture)
      // this.listeners.splice(index, 1)
      this.listeners.delete(listener.id)
      return true
    } else {
      return false
    }
  }

  clear ():void {
    this.listeners.forEach((listener) => {
      this.off(listener)
    })
  }
}

export class EventManagers {
  ems:Array<EventManager>
  constructor () {
    this.ems = []
  }

  addElement (dom:HTMLElement | Document | Window, name?:string):EventManager {
    const em = new EventManager(dom, name)
    if (em) {
      this.ems.push(em)
    }
    return em
  }

  on (em:EventManager, event: string, handler: EventListenerOrEventListenerObject, useCapture = false): Listener {
    return em?.on(event, handler, useCapture)
  }

  off (em:EventManager, listener:Listener):boolean {
    return em?.off(listener)
  }

  getEventManagerByName (name:string):EventManager {
    return this.ems[this.ems.findIndex(e => { return e.name === name })]
  }

  clear (em:EventManager):void {
    em.listeners.forEach((listener) => {
      em.off(listener)
    })
  }

  clearAll ():void {
    this.ems.forEach((em) => {
      this.clear(em)
    })
  }
}

export const getOffsetTop = (el:HTMLElement):number => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }

  return offset
}
export const getOffsetLeft = (el:HTMLElement):number => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent.offsetLeft
    parent = parent.offsetParent as HTMLElement
  }

  return offset
}

export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement):number => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl))
}

const cubic = (value) => Math.pow(value, 3)

const easeInOutCubic = (value) => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2

export const scrollTo = (container:HTMLElement = document.documentElement || document.body, el:HTMLElement, offset = 0):void => {
  const beginTime = Date.now()
  const beginValue = container.scrollTop || window.pageYOffset
  const distance = getOffsetTopDistance(container, el) - beginValue + offset
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      container.scrollTop = beginValue + distance * easeInOutCubic(progress)
      rAF(frameFunc)
    } else {
      container.scrollTop = beginValue + distance
    }
  }
  rAF(frameFunc)
}

export const getScrollWidth = ():number => {
  const oDiv = document.createElement('DIV')
  oDiv.style.cssText = 'position:absolute; top:9999px; width:100px; height:100px; overflow:hidden;'
  const noScroll = document.body.appendChild(oDiv).clientWidth * 1
  oDiv.style.overflowY = 'scroll'
  const scroll = oDiv.clientWidth * 1
  document.body.removeChild(oDiv)
  return (noScroll - scroll) + 20
  // return window.innerWidth-document.body.clientWidth
}

type Size = {width:number, height:number}
export const getWindowSize = function ():Size {
  const size:Size = { width: 0, height: 0 }
  size.width = document.body.offsetWidth || (window.innerWidth - (hasScrollbar() ? getScrollWidth() : 0))
  size.height = window.innerHeight
  return size
}
export const hasScrollbar = ():boolean => {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
}

export const hasScrollbarX = ():boolean => {
  return document.body.scrollWidth > (window.innerWidth || document.documentElement.clientWidth)
}

export const setPositioned = (el:HTMLElement):void => {
  const position = getStyle(el, 'position')
  if (position === 'static') {
    setStyle(el, 'position', 'relative')
  }
}

export const getTransform = (el:HTMLElement):{x:number, y:number} => {
  const domTransform:string = getStyle(el, 'transform')
  let transletex = 0
  let translatey = 0
  if (domTransform.includes('matrix')) {
    const domTransforms = domTransform.split(',')
    transletex = parseFloat(domTransforms[domTransforms.length - 2])
    translatey = parseFloat(domTransforms[domTransforms.length - 1].slice(0, -1))
  } else if (domTransform.includes('translate')) {
    const domTransforms = domTransform.match(/translate\((.*),(.*)\)/)
    transletex = parseFloat(domTransforms[1])
    translatey = parseFloat(domTransforms[2])
  }
  return { x: transletex, y: translatey }
}

export const getOffset = (el:HTMLElement):{left:number, top:number} => {
  return { left: el.offsetLeft, top: el.offsetTop }
}

export default {
  createElement,
  addClass,
  hasClass,
  removeClass,
  getStyle,
  setStyle,
  removeStyle,
  addChild,
  unshiftChild,
  getElementSize,
  on,
  off,
  EventManager,
  getOffsetTop,
  getOffsetLeft,
  getOffsetTopDistance,
  scrollTo,
  getScrollWidth,
  getWindowSize,
  hasScrollbar
}
