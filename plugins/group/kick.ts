import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'kick',
  aliases: ['tendang'],
  description: 'Keluarkan anggota dari grup',
  usage: '@user',
  group: true,
  admin: true,
  cooldown: 3,

  message: async (ctx) => {
    if (ctx.mentions.length === 0) {
      await ctx.reply('Tag orangnya dulu. Contoh: .kick @user')
      return
    }
    await ctx.client.group.removeMember(ctx.roomId!, ctx.mentions)
    await ctx.reply(`${ctx.mentions.length} anggota dikeluarkan.`)
  },
})
