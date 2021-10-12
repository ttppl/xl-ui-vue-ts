import Nav from './src/Nav.vue'
import type { CPNTWithInstall } from '@/utils/types'

Nav.install = app => {
  app.component(Nav.name, Nav)
}

const _Nav: CPNTWithInstall<typeof Nav> = Nav as CPNTWithInstall<typeof Nav>

export default _Nav
