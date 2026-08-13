import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'tagall',
  setup(ctx) {
    ctx.command(
      {
        name: 'tagall',
        description: 'Panggil semua anggota grup',
        usage: '<pesan>',
        group: true,
        admin: true,
        cooldown: 30,
      },
      async (c) => {
        const meta = await ctx.client.group.metadata(c.roomId!)
        const members = meta.participants.map((p) => p.id)
        const text = c.args.join(' ') || 'Kumpul!'
        await ctx.client.send(c.roomId!).text(text).mentions(members)
      },
    )
  },
})
