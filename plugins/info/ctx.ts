import { inspect } from "node:util";
import { definePlugin } from "zaileys";

export default definePlugin({
  name: "ctx",
  description: "Lihat isi payload pesan",
  usage: "[field]",

  message: async (ctx) => {
    const target = (await ctx.replied()) ?? ctx;
    const { client: _, ...payload } = target as unknown as Record<string, unknown>;
    const field = ctx.args[0];

    await ctx.reply(inspect(field ? payload[field] : payload, { depth: null }));
  },
});
