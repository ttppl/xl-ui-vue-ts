import Menu from './src/Menu.vue'
import type { CPNTWithInstall } from '@/utils/types'

Menu.install = app => {
  app.component(Menu.name, Menu)
}

const _Menu: CPNTWithInstall<typeof Menu> = Menu as CPNTWithInstall<typeof Menu>

export default _Menu
