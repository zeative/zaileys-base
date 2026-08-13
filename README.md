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

Buat file di dalam `plugins/`. Nama foldernya jadi kategori di menu — tidak perlu ditulis lagi.

```ts
// plugins/info/halo.ts
import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'halo',
  setup(ctx) {
    ctx.command({ name: 'halo', description: 'Menyapa' }, async (c) => {
      await c.reply(`Halo ${c.senderName}!`)
    })
  },
})
```

Simpan filenya — bot langsung memuat ulang sendiri, tidak perlu restart dan tidak perlu scan QR lagi.

## Membatasi siapa yang boleh pakai

```ts
ctx.command(
  {
    name: 'kick',
    description: 'Keluarkan anggota',
    usage: '@user',
    group: true,     // hanya di grup
    admin: true,     // hanya admin grup
    cooldown: 3,     // jeda 3 detik per orang
  },
  async (c) => { /* ... */ },
)
```

Kalau ditolak, zaileys tidak membalas sendiri — `src/index.ts` yang memutuskan pesannya, jadi
bahasanya tetap milikmu.

## Isi

```
src/index.ts        koneksi + pesan penolakan & error
plugins/info/       ping, menu
plugins/group/      kick, tagall
plugins/tool/       sticker
```

`.menu` disusun otomatis dari `description` tiap perintah — tidak ada daftar menu yang harus
dirawat terpisah.

## Catatan

- Prefix: `.`, `!`, `/` — ubah di `src/index.ts`.
- File atau folder berawalan `_` tidak dimuat sebagai plugin, jadi taruh helper di situ.
- Butuh Node 20+.
