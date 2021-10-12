import { computed } from 'vue'
interface propsType{
  width:string|number,
  height:string|number
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
