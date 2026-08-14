import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'ping',
  description: 'Cek bot hidup atau tidak',

  message: async (ctx) => {
    const started = Date.now()
    await ctx.reply('Mengukur…')
    await ctx.edit(`Pong! ${Date.now() - started} ms`)
  },
})
