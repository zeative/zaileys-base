import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'kick',
  aliases: ['tendang'],
  description: 'Keluarkan anggota dari grup',
  usage: '@user',
  group: true,
  admin: true,
  cooldown: 3,

  command: async (c) => {
    if (c.mentions.length === 0) {
      await c.reply('Tag orangnya dulu. Contoh: .kick @user')
      return
    }
    await c.client.group.removeMember(c.roomId!, c.mentions)
    await c.reply(`${c.mentions.length} anggota dikeluarkan.`)
  },
})
