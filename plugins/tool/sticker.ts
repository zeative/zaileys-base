import { definePlugin } from "zaileys";

export default definePlugin({
  name: "sticker",
  aliases: ["s"],
  description: "Ubah gambar jadi stiker",
  cooldown: 5,

  command: async (ctx) => {
    const media = ctx.media;
    if (media?.type !== "image") {
      await ctx.reply(
        "Kirim gambar dengan caption .sticker, atau balas sebuah gambar.",
      );
      return;
    }
    await ctx.client.send(ctx.roomId!).sticker(await media.buffer());
  },
});
