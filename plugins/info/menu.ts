import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'menu',
  aliases: ['help'],
  description: 'Daftar perintah',

  command: async (ctx) => {
    const groups = new Map<string, string[]>()

    for (const cmd of ctx.client.commands()) {
      if (cmd.hidden === true) continue
      const category = cmd.category ?? 'lainnya'
      const usage = cmd.usage === undefined ? '' : ` ${cmd.usage}`
      groups.set(category, [
        ...(groups.get(category) ?? []),
        `• .${cmd.name}${usage} — ${cmd.description ?? ''}`,
      ])
    }

    const body = [...groups]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, lines]) => `*${category.toUpperCase()}*\n${lines.sort().join('\n')}`)
      .join('\n\n')

    await ctx.reply(`Halo ${ctx.senderName ?? 'kamu'} 👋\n\n${body}`)
  },
})
