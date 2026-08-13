import { definePlugin } from "zaileys";

export default definePlugin({
  name: "sticker",
  setup(ctx) {
    ctx.command(
      {
        name: "sticker",
        aliases: ["s"],
        description: "Ubah gambar jadi stiker",
        cooldown: 5,
      },
      async (c) => {
        const media = c.media;
        if (media?.type !== "image") {
          await c.reply(
            "Kirim gambar dengan caption .sticker, atau balas sebuah gambar.",
          );
          return;
        }
        await ctx.client.send(c.roomId!).sticker(await media.buffer());
      },
    );
  },
});
