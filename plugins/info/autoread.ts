import { definePlugin } from 'zaileys'

/** A plugin does not have to be a command — this one only listens. */
export default definePlugin({
  name: 'autoread',

  message: (ctx, plugin) => {
    if (ctx.isOld) return
    void plugin.client.chat.markRead(ctx.roomId!)
  },
})
