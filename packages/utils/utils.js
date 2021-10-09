export const camelize = function toHump (name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

export const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

export const isString = function (obj) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export const trim = function (s) {
  return (s || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export const getWindowSize = function () {
  const size = {}
  size.width = window.innerWidth
  size.height = window.innerHeight
  return size
}

export function getDate (dateString, format) {
  if (!dateString) {
    return new Date()
  }
  const formatLower = format.toLowerCase()
  const year = dateString.slice(formatLower.indexOf('yyyy'), formatLower.indexOf('yyyy') + 4) / 1
  const month = dateString.slice(format.indexOf('MM'), format.indexOf('MM') + 2) / 1
  const day = dateString.slice(formatLower.indexOf('dd'), formatLower.indexOf('dd') + 2) / 1
  const hour = dateString.slice(formatLower.indexOf('hh'), formatLower.indexOf('hh') + 2) / 1
  const minute = dateString.slice(format.indexOf('mm'), format.indexOf('mm') + 2) / 1
  const second = dateString.slice(formatLower.indexOf('ss'), formatLower.indexOf('ss') + 2) / 1
  return new Date(year, month - 1, day, hour, minute, second)
}

// 防抖
export function debounce (fn, delay) {
  var timeout = null// 定时器
  var times = 0// 次数统计
  return function (e) {
    clearTimeout(timeout)
    times++
    timeout = setTimeout(() => {
      console.log(`执行防抖函数,节省次数：${times}`)
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流
export function throttle (fn, delay) {
  let canRun = true // 通过闭包保存一个标记
  return function () {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) return
    // 立即设置为false
    canRun = false
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}

export default { camelize, isObject, trim, isArray, isString, getWindowSize, getDate, debounce, throttle }
