# zaileys-base

Base WhatsApp bot for [zaileys](https://zeative.github.io/zaileys/). One file to boot it, one folder
for your commands.

## Jalankan

```bash
npm install
npm run dev
```

Scan QR yang muncul, lalu kirim `.menu` ke bot.

## Menambah perintah

Buat file di dalam `plugins/`. Nama plugin **adalah** nama perintahnya, dan nama foldernya jadi
kategori di menu — keduanya tidak ditulis dua kali.

```ts
// plugins/info/halo.ts
import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'halo',
  description: 'Menyapa',

  command: async (ctx) => {
    await ctx.reply(`Halo ${ctx.senderName}!`)
  },
})
```

Simpan filenya — bot langsung memuat ulang sendiri, tidak perlu restart dan tidak perlu scan QR lagi.

## Membatasi siapa yang boleh pakai

```ts
export default definePlugin({
  name: 'kick',
  aliases: ['tendang'],
  description: 'Keluarkan anggota',
  usage: '@user',
  group: true,     // hanya di grup
  admin: true,     // hanya admin grup
  cooldown: 3,     // jeda 3 detik per orang

  command: async (ctx) => {
    await ctx.client.group.removeMember(ctx.roomId!, ctx.mentions)
  },
})
```

Kalau ditolak, zaileys tidak membalas sendiri — `src/index.ts` yang memutuskan pesannya, jadi
bahasanya tetap milikmu.

## Plugin tanpa perintah

Tidak semua plugin harus berupa perintah. Ada satu method per event, dan argumen keduanya memberi
akses ke client:

```ts
export default definePlugin({
  name: 'autoread',

  message: (ctx, plugin) => {
    if (ctx.isOld) return
    void plugin.client.chat.markRead(ctx.roomId!)
  },
})
```

Tersedia juga `image`, `video`, `audio`, `sticker`, `reaction`, `pollVote`, `groupJoin`,
`callIncoming`, dan sisanya — satu untuk tiap event.

## Isi

```
src/index.ts        koneksi + pesan penolakan & error
plugins/info/       ping, menu, autoread
plugins/group/      kick, tagall
plugins/tool/       sticker
```

`.menu` disusun otomatis dari `description` tiap perintah — tidak ada daftar menu yang harus
dirawat terpisah.

## Catatan

- Prefix: `.`, `!`, `/` — ubah di `src/index.ts`.
- File atau folder berawalan `_` tidak dimuat sebagai plugin, jadi taruh helper di situ.
- Butuh Node 20+.
