import { Client } from 'zaileys'

const client = new Client({
  commandPrefix: ['.', '!', '/'],
  autoRejectCall: true,
  plugins: { dir: './plugins' },
})

client.on('connect', ({ me }) => console.log(`Tersambung sebagai ${me.name ?? me.id}`))

client.on('command-blocked', ({ ctx, reason, retryIn }) => {
  const guard = {
      'group-only': 'Perintah ini hanya untuk grup.',
      'private-only': 'Perintah ini hanya lewat chat pribadi.',
      'admin-only': 'Khusus admin grup.',
      cooldown: `Sabar, tunggu ${retryIn} detik lagi.`,
    }[reason]

  ctx.reply(guard)
})

client.on('command-error', ({ command, error, ctx }) => {
  console.error(`Perintah ${command} gagal`, error)
  ctx.reply('Maaf, terjadi kesalahan.')
})
