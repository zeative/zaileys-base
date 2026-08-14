import { definePlugin } from "zaileys";
import { zpi } from "../../src/api.js";

export default definePlugin({
  name: "inbox",
  description: "Baca email masuk",
  usage: "<alamat>",
  cooldown: 5,

  message: async (ctx) => {
    const address = ctx.args[0];
    if (address === undefined) {
      await ctx.reply("Contoh: .inbox nama@domain.com");
      return;
    }

    const inbox = await zpi.run("temp-mail:mail-gw", "inbox", { address });

    if (inbox.count === 0) {
      await ctx.reply(`📥 *${inbox.address}*\n\nBelum ada email masuk.`);
      return;
    }

    const lines: string[] = [];
    for (const m of inbox.items) {
      lines.push(
        `*${lines.length + 1}. ${m.subject || "(tanpa subjek)"}*\n_${m.from}_\n${m.content || m.preview}`,
      );
    }

    await ctx.reply(
      `📥 *${inbox.address}* — ${inbox.count} pesan\n\n${lines.join("\n\n")}`,
    );
  },
});
