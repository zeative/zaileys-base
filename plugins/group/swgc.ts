import { definePlugin } from "zaileys";

export default definePlugin({
  name: "swgc",
  aliases: ["sw"],
  description: "Jadikan media status grup",
  usage: "<caption>",
  group: true,
  cooldown: 10,

  message: async (ctx) => {
    const source = (await ctx.replied()) ?? ctx;
    const caption = ctx.args.join(" ");

    await ctx.send().groupStatus(source, caption ? { caption } : undefined);
    await ctx.react("✅");
  },
});
