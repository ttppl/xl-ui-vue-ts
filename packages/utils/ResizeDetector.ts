import { getStyle, setPositioned, setStyle } from '@/utils/dom'

interface ResizerDetector{
  listenTo,
  removeListener,
  remove
}

interface listeners {
  id:number
  source:HTMLElement
  static:boolean
  obj:HTMLObjectElement
  callback: Array<any>
}

interface Options{
  console:boolean,
  important:boolean
}

export default function (options:Options = { console: true, important: false }):ResizerDetector {
  let id = 1
  const listeners:listeners[] = []
  function logConsole (...msg) {
    if (options.console) { console.log(...msg) }
  }
  function buildCssTextString (rules) {
    var seperator = options.important ? ' !important; ' : '; '
    return (rules.join(seperator) + seperator).trim()
  }
  const listenTo = (element:HTMLElement, callback):number => {
    setPositioned(element)
    var OBJECT_STYLE = buildCssTextString(['display: block', 'position: absolute', 'top: 0', 'left: 0', 'width: 100%', 'height: 100%', 'border: none', 'padding: 0', 'margin: 0', 'opacity: 0', 'z-index: -1000', 'pointer-events: none'])
    var object = document.createElement('object')
    object.style.cssText = OBJECT_STYLE
    object.tabIndex = -1
    object.type = 'text/html'
    object.setAttribute('aria-hidden', 'true')
    logConsole('creating resize detector...')
    object.onload = () => {
      // logConsole(element)
      logConsole('resize detector onready')
    }
    element.appendChild(object)
    const callbackProxy = () => {
      logConsole('resize event detected')
      callback(element)
    }
    const listener = {
      id: id++,
      source: element,
      static: getStyle(element, 'position') === 'static',
      obj: object,
      callback: [callbackProxy]
    }

    if (!object.contentDocument) {
      element.removeChild(object)
      logConsole('resize detector error:display none can\'t find contentDocument')
      throw new Error('resize detector error')
    } else {
      object.contentDocument.defaultView.addEventListener('resize', callbackProxy)
      listeners.push(listener)
      logConsole('listner added!count:' + listeners.length)
    }

    return id
  }

  function removeListener (id:number, callback) {
    logConsole('ready to remove listener,id:' + id)
    const index = listeners.findIndex((e) => { return e.id === id })
    const listener = listeners[index]

    if (listener) {
      const callbackIndex = listener.callback.findIndex((e) => { return e === callback })
      listener.obj.contentDocument.defaultView.removeEventListener('resize', listener.callback[callbackIndex || 0])
      listener.source.removeChild(listener.obj)
      if (listener.static) {
        setStyle(listener.source, 'position', 'static')
      }
      listeners.splice(index, 1)
      logConsole('listener removed,rest:', listeners.length)
    } else {
      logConsole('no listener finded')
    }
  }

  function remove (el:HTMLElement) {
    const listner = listeners.find((e) => { e.source = el })
    if (listner) {
      if (Array.isArray(listner.callback)) {
        listner.callback.forEach(c => {
          removeListener(listner.id, c as any)
        })
      } else { removeListener(listner.id, listner.callback as any) }
    }
  }

  return {
    listenTo,
    removeListener,
    remove
  }
}
