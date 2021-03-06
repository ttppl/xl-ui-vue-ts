type Fun = (...args:Array<unknown>)=>unknown

// export const camelize = function toHump (name:string):string {
//   return name.replace(/-(\w)/g, function (all, letter) {
//     return letter.toUpperCase()
//   })
// }
export { camelize } from '@vue/shared'

export const isObject = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const isFunction = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

export const isBoolean = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}

export const isNumber = function (obj:unknown):boolean {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

export const isNull = function (obj:unknown):boolean {
  return obj === null
}

export const isZero = function (obj:unknown):boolean {
  return obj === 0 || obj === '0'
}

export const isPercent = function (obj:unknown):boolean {
  return isNum(obj) ? (parseFloat(obj as any) > 0 && parseFloat(obj as any) <= 1) : false
}

export const isUndefined = function (obj:unknown):boolean {
  return obj === undefined
}

export const isTrue = function (value:unknown):boolean {
  if (isBoolean(value)) {
    return value as boolean
  } else if (isString(value)) {
    return value === 'true'
  } else {
    return false
  }
}

export const isNum = function (num:unknown):boolean {
  return isNumber(num) ? true : /^-?\d*\.?\d*$/.test(num as any)
}

export const trim = function (s:string):string {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function getDate (dateString:string, format:string):Date {
  if (!dateString) {
    return new Date()
  }
  const formatLower = format.toLowerCase()
  const year:number = parseFloat(dateString.slice(formatLower.indexOf('yyyy'), formatLower.indexOf('yyyy') + 4))
  const month:number = parseFloat(dateString.slice(format.indexOf('MM'), format.indexOf('MM') + 2))
  const day:number = parseFloat(dateString.slice(formatLower.indexOf('dd'), formatLower.indexOf('dd') + 2))
  const hour:number = parseFloat(dateString.slice(formatLower.indexOf('hh'), formatLower.indexOf('hh') + 2))
  const minute:number = parseFloat(dateString.slice(format.indexOf('mm'), format.indexOf('mm') + 2))
  const second:number = parseFloat(dateString.slice(formatLower.indexOf('ss'), formatLower.indexOf('ss') + 2))
  return new Date(year, month - 1, day, hour, minute, second)
}

// ??????
export function debounce (fn:Fun, delay = 300):Fun {
  var timeout = null// ?????????
  var times = 0// ????????????
  return function () {
    clearTimeout(timeout)
    times++
    timeout = setTimeout(() => {
      console.log(`xl-ui??????????????????,???????????????${times}`)
      fn.apply(this, arguments)
    }, delay)
  }
}

// ??????
export function throttle (fn:Fun, delay = 300):Fun {
  let canRun = true // ??????????????????????????????
  return function () {
    // ????????????????????????????????????true?????????true???return
    if (!canRun) return
    // ???????????????false
    canRun = false
    // ???????????????????????????????????????setTimeout???
    setTimeout(() => {
      // ?????????setTimeout????????????????????????????????????true(??????)???????????????????????????????????????
      // ????????????????????????????????????????????????false???????????????return???
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

// ??????????????????
export function onece (fn:Fun):Fun {
  let once = false // ??????????????????????????????
  return function () {
    if (once) return
    once = true
    fn.apply(this, arguments)
  }
}

const checkDevice = ():string => {
  var sUserAgent = navigator.userAgent.toLowerCase()
  var bIsIpad = sUserAgent.match(/ipad/i)?.[0] === 'ipad'
  var bIsIphoneOs = sUserAgent.match(/iphone os/i)?.[0] === 'iphone os'
  var bIsMidp = sUserAgent.match(/midp/i)?.[0] === 'midp'
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i)?.[0] === 'rv:1.2.3.4'
  var bIsUc = sUserAgent.match(/ucweb/i)?.[0] === 'ucweb'
  var bIsAndroid = sUserAgent.match(/android/i)?.[0] === 'android'
  var bIsCE = sUserAgent.match(/windows ce/i)?.[0] === 'windows ce'
  var bIsWM = sUserAgent.match(/windows mobile/i)?.[0] === 'windows mobile'
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'mobile'
  } else {
    return 'pc'
  }
}

export const isMobile = checkDevice() === 'mobile'

export const isServe = typeof window === 'undefined'

export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace'
}

export default {
  isObject,
  trim,
  isArray,
  isString,
  isNum,
  isBoolean,
  isTrue,
  getDate,
  debounce,
  throttle,
  onece,
  isServe,
  EVENT_CODE,
  isMobile
}
