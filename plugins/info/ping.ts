import { definePlugin } from "zaileys";

export default definePlugin({
  name: "ping",
  setup(ctx) {
    ctx.command(
      {
        name: "ping",
        description: "Cek bot hidup atau tidak",
      },
      async (c) => {
        const started = Date.now();
        await c.reply("Mengukur…");
        await c.edit(`Pong! ${Date.now() - started} ms`);
      },
    );
  },
});
