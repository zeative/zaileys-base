import { definePlugin } from "zaileys";

export default definePlugin({
  name: "tagall",
  description: "Panggil semua anggota grup",
  usage: "<pesan>",
  group: true,
  admin: true,
  cooldown: 30,

  message: async (ctx) => {
    const meta = await ctx.client.group.metadata(ctx.roomId!);
    const members = meta.participants.map((p) => p.id);
    
    const text = ctx.args.join(" ") || "Kumpul!";
    await ctx.send().text(text).mentions(members);
  },
});
