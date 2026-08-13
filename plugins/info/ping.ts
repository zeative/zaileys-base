import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'ping',
  description: 'Cek bot hidup atau tidak',

  command: async (c) => {
    const started = Date.now()
    await c.reply('Mengukur…')
    await c.edit(`Pong! ${Date.now() - started} ms`)
  },
})
