// export const colorTypes={
//   primary:'xl-color-primary',
//   white:'xl-color-white',
//   warn:'xl-color-warn',
//   notice:'xl-color-notice',
//   error:'xl-color-error',
//   success:'xl-color-success',
//   ini:'xl-color-white'
// }

// export const bgTypes={
//   primary:'xl-color-black xl-color-bg-white xl-color-bg-hover-primary-light',
//   warn:'xl-color-black xl-color-bg-white xl-color-bg-hover-warn-light',
//   notice:'xl-color-black xl-color-bg-white xl-color-bg-hover-notice-light',
//   error:'xl-color-black xl-color-bg-white xl-color-bg-hover-error-light',
//   success:'xl-color-black xl-color-bg-white xl-color-bg-hover-success-light',
//   ini:'xl-color-black xl-color-bg-white xl-color-bg-hover-notice-light'
// }

// export const baseTypes={
//   primary:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-primary xl-color-bd-focus-primary',
//   warn:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-warn xl-color-bd-focus-warn',
//   notice:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-black xl-color-bd-focus-black',
//   error:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-error xl-color-bd-focus-error',
//   success:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-success xl-color-bd-focus-success',
//   ini:'xl-color-black xl-color-bd-notice xl-color-bg-white xl-color-bd-hover-black xl-color-bd-focus-black'
// }
export const COLORS = {
  primary: '#409EFF', // primary
  white: '#FFFFFF',
  black: '#000000',
  warn: '#e6a23c', // warn
  notice: '#909399', // notice
  error: '#f56c6c', // error
  success: '#67c23a'// success
}
export const TYPES = ['primary', 'warn', 'notice', 'error', 'success', 'ini']

export function themeType (type:string, attr:Nullable<string>, lightStyle:Nullable<boolean>):string {
  return 'xl-color' + (attr ? '-' + attr : '') + '-' + type + (lightStyle ? '-light' : '')
}

export function InputThemeType (type:string, light:boolean):Nullable<string[]> {
  if (!TYPES.includes(type)) {
    return null
  }
  const compType = {
    color: 'black',
    bd: 'notice',
    bg: 'white',
    hover: type,
    focus: type
  }
  switch (type) {
    case 'ini':
      compType.bd = 'notice'
      compType.hover = 'black'
      compType.focus = 'black'
      break
    default:
      break
  }
  if (light) {
    Object.keys(compType).forEach(key => {
      compType[key] += '-light'
    })
  }
  return [themeType(compType.color, null, null), themeType(compType.bd, 'bd', null), themeType(compType.bg, 'bg', null), themeType(compType.hover, 'bd-hover', null), themeType(compType.focus, 'bd-focus', null)]
}

export default { TYPES, COLORS, themeType, InputThemeType }
