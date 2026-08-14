import { definePlugin } from 'zaileys'

/**
 * A plugin does not have to be a command. `message` names the command handler, so watching every
 * inbound message goes through `setup` instead.
 */
export default definePlugin({
  name: 'autoread',

  setup(ctx) {
    ctx.on('message', (msg) => {
      if (msg.isOld) return
      void ctx.client.chat.markRead(msg.roomId!)
    })
  },
})
