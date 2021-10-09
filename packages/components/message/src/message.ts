import { isVNode, createVNode, render } from 'vue'
import MessageConstructor from './Message.vue'

const instances = []
let seed = 1

const Message = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      message: opts
    }
  }

  let options = opts

  let verticalOffset = opts.offset || 20
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el.offsetHeight || 0) + 16
  })
  verticalOffset += 16

  const id = 'message_' + seed++
  const userOnClose = options.onClose

  options = {
    ...options,
    onClose: () => {
      close(id, userOnClose)
    },
    offset: verticalOffset,
    id,
    zIndex: 10000
  }

  const container = document.createElement('div')

  container.className = `container_${id}`

  const message = options.message
  const vm = createVNode(
    MessageConstructor,
    options,
    isVNode(options.message) ? { default: () => message } : null
  )

  vm.props.onDestroy = () => {
    render(null, container)
  }

  render(vm, container)
  instances.push({ vm })
  document.body.appendChild(container.firstElementChild)

  return {
    close: () => { (vm.component.proxy as any).visible = false }
  }
}

export function close (id, userOnClose) {
  const idx = instances.findIndex(({ vm: vm2 }) => {
    const { id: _id } = vm2.component.props
    return id === _id
  })
  if (idx === -1) {
    return
  }
  const { vm } = instances[idx]
  if (!vm) { return }
  // eslint-disable-next-line no-void
  userOnClose == null ? void 0 : userOnClose(vm)
  const removedHeight = vm.el.offsetHeight
  instances.splice(idx, 1)
  const len = instances.length
  if (len < 1) { return }
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style.top, 10) - removedHeight - 16
    instances[i].vm.component.props.offset = pos
  }
}

export function closeAll () {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component
    instance.ctx.close()
  }
}

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type
      }
    } else {
      options.type = type
    }
    return Message(options)
  }
})

Message.closeAll = closeAll
export default Message
