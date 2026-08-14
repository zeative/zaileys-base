# zaileys-base

Bot WhatsApp siap pakai dengan [zaileys](https://zeative.github.io/zaileys/). Satu file untuk
menyalakan, satu folder untuk perintahmu.

```
src/index.ts     koneksi + pesan penolakan & error
plugins/         satu file = satu perintah
```

---

## Mulai

```bash
npm install
npm run dev
```

Scan QR yang muncul, lalu kirim `.menu` ke bot kamu.

> **Jangan pakai `tsx watch` untuk file plugin.** zaileys sudah memuat ulang plugin sendiri saat
> filenya berubah, tanpa memutus sambungan. Kalau prosesnya ikut restart tiap simpan, bot menyambung
> ulang berkali-kali dan WhatsApp bisa memutus perangkatnya. `npm run dev:watch` hanya untuk saat
> kamu mengubah `src/index.ts`.

---

## Bikin perintah pertama

Buat file di `plugins/`. **Nama plugin jadi nama perintah**, dan **nama folder jadi kategori** di menu.

```ts
// plugins/info/halo.ts
import { definePlugin } from 'zaileys'

export default definePlugin({
  name: 'halo',
  description: 'Menyapa',

  message: async (ctx) => {
    await ctx.reply(`Halo ${ctx.senderName}!`)
  },
})
```

Simpan — bot langsung memuatnya. Tidak perlu restart, tidak perlu scan QR lagi. Kirim `.halo`.

Prefix bawaan: `.`, `!`, `/` — ubah di `src/index.ts`.

---

## Membatasi siapa yang boleh pakai

```ts
export default definePlugin({
  name: 'kick',
  aliases: ['tendang'],
  description: 'Keluarkan anggota',
  usage: '@user',
  group: true,     // hanya di dalam grup
  admin: true,     // hanya admin grup
  cooldown: 3,     // jeda 3 detik per orang

  message: async (ctx) => {
    await ctx.client.group.removeMember(ctx.roomId!, ctx.mentions)
  },
})
```

Kalau ditolak, zaileys **tidak membalas sendiri** — `src/index.ts` yang menentukan kalimatnya, jadi
bahasanya tetap milikmu.

| Field | Untuk apa |
| --- | --- |
| `name` | Nama perintah. `name: 'kick'` → `.kick` |
| `aliases` | Nama lain untuk perintah yang sama |
| `description` | Muncul di `.menu` |
| `usage` | Contoh argumen, ikut tampil di menu |
| `group` / `private` | Batasi ke grup / chat pribadi |
| `admin` | Hanya admin grup |
| `cooldown` | Jeda per orang, dalam detik |
| `hidden` | Tetap bisa dipakai, tapi tidak muncul di menu |

---

## Yang ada di `ctx`

```ts
message: async (ctx) => {
  ctx.text          // isi pesan
  ctx.args          // ['halo', 'dunia'] — kata setelah perintah
  ctx.senderId      // pengirim
  ctx.roomId        // chat asal
  ctx.isGroup
  ctx.media         // gambar/video/audio, kalau ada

  await ctx.reply('balas pesan ini')
  await ctx.react('👍')
  await ctx.send().sticker(buffer)              // kirim ke chat ini
  await ctx.send('628xxx@s.whatsapp.net').text('halo')  // ke chat lain

  ctx.client        // seluruh API zaileys: group, chat, profile, ...
}
```

Daftar lengkapnya ada di [Message Payload](https://zeative.github.io/zaileys/message-payload/).

---

## Plugin tanpa perintah

Tidak semua plugin harus berupa perintah. Ada satu method untuk tiap event:

```ts
export default definePlugin({
  name: 'autoread',

  setup(ctx) {
    ctx.on('message', (msg) => {
      if (msg.isOld) return          // lewati pesan lama saat bot baru nyala
      void ctx.client.chat.markRead(msg.roomId!)
    })
  },
})
```

Untuk tipe tertentu, pakai method-nya langsung: `image`, `video`, `audio`, `sticker`, `reaction`,
`pollVote`, `groupJoin`, `callIncoming`, dan seterusnya.

---

## Isi bawaan

| Perintah | Fungsi |
| --- | --- |
| `.menu` | Daftar perintah, disusun otomatis dari `description` |
| `.ping` | Cek bot hidup |
| `.ctx [field]` | Lihat isi payload pesan — reply sebuah pesan untuk membedah pesan itu |
| `.kick @user` | Keluarkan anggota (grup, admin) |
| `.tagall <pesan>` | Panggil semua anggota (grup, admin) |
| `.swgc <caption>` | Jadikan media status grup — kirim dengan caption, atau reply medianya |
| `.sticker` | Ubah gambar jadi stiker |
| `.mail` | Buat email sementara |
| `.inbox <alamat>` | Baca email masuk |

`.menu` tidak perlu dirawat — isinya dibangun dari perintah yang terdaftar.

`.ctx` berguna saat bikin plugin baru: kirim `.ctx` untuk melihat semua field yang tersedia, atau
`.ctx senderId` untuk satu field saja. Status grup (`.swgc`) menerima teks, gambar, video, dan voice
note — stiker tidak didukung WhatsApp.

---

## Memakai API luar (zpi)

`.mail` dan `.inbox` memakai [zpi](https://zpi.web.id) lewat `src/api.ts`. Isi API key kamu di sana.

Supaya parameternya ikut ter-autocomplete:

```bash
npx zpi codegen --scan . --out ./src/zpi.d.ts
```

Perintah itu membaca kodemu, mencari scraper yang benar-benar kamu panggil, dan hanya menuliskan
itu. Hasil respons sengaja dibiarkan bebas tipe — bentuknya milik situs sumber dan bisa berubah.

---

## Dokumentasi zaileys

Base ini hanya menyentuh sebagian kecil dari yang bisa dilakukan zaileys.

| Halaman | Isi |
| --- | --- |
| [Getting Started](https://zeative.github.io/zaileys/getting-started/) | Pengenalan dan contoh pertama |
| [Configuration](https://zeative.github.io/zaileys/configuration/) | Semua opsi `new Client({ ... })` |
| [Commands](https://zeative.github.io/zaileys/commands/) | Prefix, alias, argumen, flag, middleware, guard |
| [Plugins](https://zeative.github.io/zaileys/plugins/) | Loader, hot reload, seluruh bentuk plugin |
| [Events](https://zeative.github.io/zaileys/events/) | Semua event yang bisa didengarkan |
| [Message Payload](https://zeative.github.io/zaileys/message-payload/) | Tiap field di `ctx` |
| [Sending Messages](https://zeative.github.io/zaileys/sending-messages/) | Teks, media, tombol, status, album |
| [Groups](https://zeative.github.io/zaileys/groups/) | Kelola grup dan anggota |
| [Media](https://zeative.github.io/zaileys/media/) | Unduh, stiker, konversi |
| [Interactive](https://zeative.github.io/zaileys/interactive/) | Tombol, list, carousel |
| [Storage](https://zeative.github.io/zaileys/storage/) | Penyimpanan pesan dan sesi |
| [Error Handling](https://zeative.github.io/zaileys/error-handling/) | Kode error dan cara menangkapnya |
| [API Reference](https://zeative.github.io/zaileys/api-reference/) | Seluruh permukaan API |

Semua halaman: **[zeative.github.io/zaileys](https://zeative.github.io/zaileys/)**

---

## Catatan

- Butuh Node 20+.
- File atau folder berawalan `_` tidak dimuat sebagai plugin — taruh helper di situ.
- Sesi tersimpan di `.zaileys/`. Hapus foldernya kalau mau ganti akun.
