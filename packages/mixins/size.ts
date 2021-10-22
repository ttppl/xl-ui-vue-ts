import { computed } from 'vue'
interface propsType{
  width:string|number,
  height:string|number
}

export const computeSize = (size:number|string):string => {
  if (isNaN(size as number)) {
    return size as string
  }
  if (size === 0) {
    return 'auto'
  } else if (size > 1) {
    return `${size}px`
  } else if (size < 1) {
    return `${size as number * 100}%`
  } else {
    return '100%'
  }
}

export default function (props:propsType) {
  const widthC = computed(():string => {
    if (isNaN(props.width as number)) {
      return props.width as string
    }
    if (props.width === 0) {
      return 'auto'
    } else if (props.width > 1) {
      return `${props.width}px`
    } else if (props.width < 1) {
      return `${props.width as number * 100}%`
    } else {
      return '100%'
    }
  })

  const heightC = computed(():string => {
    if (isNaN(props.height as number)) {
      return props.height as string
    }
    if (props.height === 0) {
      return 'auto'
    } else if (props.height > 1) {
      return `${props.height}px`
    } else if (props.height < 1) {
      return `${props.height as number * 100}%`
    } else {
      return '100%'
    }
  })
  return {
    widthC,
    heightC
  }
}
