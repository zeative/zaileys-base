import { definePlugin } from 'zaileys'
import { zpi } from '../../src/api'

export default definePlugin({
  name: 'mail',
  aliases: ['tempmail'],
  description: 'Buat alamat email sementara',
  cooldown: 10,

  message: async (ctx) => {
    const mail = await zpi.run('temp-mail:mail-gw', 'create')

    await ctx.reply(`📧 *${mail.address}*\n\nKetik .inbox ${mail.address} untuk membaca.`)
  },
})
