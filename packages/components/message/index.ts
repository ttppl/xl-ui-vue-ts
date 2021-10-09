import Message from './src/message'
import type { CPNTWithInstall } from '@/ts/types'

const _Message: CPNTWithInstall<typeof Message> = Message as CPNTWithInstall<typeof Message>

_Message.install = app => {
  app.config.globalProperties.$message = _Message
}

export default _Message
