import { definePlugin } from "zaileys";

export default definePlugin({
  name: "sticker",
  aliases: ["s"],
  description: "Ubah gambar jadi stiker",
  cooldown: 5,

  message: async (ctx) => {
    const quoted = await ctx.replied();
    const media = ctx.media?.type === "image" ? ctx.media : quoted?.media;

    if (media?.type !== "image") {
      await ctx.reply(
        "Kirim gambar dengan caption .sticker, atau balas sebuah gambar.",
      );
      return;
    }

    await ctx.send().sticker(await media.buffer());
  },
});
