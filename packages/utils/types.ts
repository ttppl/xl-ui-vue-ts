import type { App } from 'vue'// import App类型

// 联合声明：同时具有T和install方法
export type CPNTWithInstall<T> = T & { install(app: App): void; }
