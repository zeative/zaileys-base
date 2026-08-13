import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'kick',
  setup(ctx) {
    ctx.command(
      {
        name: 'kick',
        aliases: ['tendang'],
        description: 'Keluarkan anggota dari grup',
        usage: '@user',
        group: true,
        admin: true,
        cooldown: 3,
      },
      async (c) => {
        if (c.mentions.length === 0) {
          await c.reply('Tag orangnya dulu. Contoh: .kick @user')
          return
        }
        await ctx.client.group.removeMember(c.roomId!, c.mentions)
        await c.reply(`${c.mentions.length} anggota dikeluarkan.`)
      },
    )
  },
})
