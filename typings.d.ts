/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'highlight.min.js' {
  import hljs from 'highlight.min.js'
  const classes: typeof hljs
  export default classes
}

declare type Nullable<T> = T | null;
