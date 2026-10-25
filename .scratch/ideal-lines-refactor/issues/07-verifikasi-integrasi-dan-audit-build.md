# 07: Verifikasi Integrasi Global, Audit Build, dan Penegakan ESLint Max-Lines

**What to build:** Pengujian menyeluruh (*end-to-end*) terhadap seluruh halaman dan rute statis setelah dekomposisi komponen dan modularisasi controller selesai, memastikan 64 static routes terkompilasi 100% tanpa error, tidak ada tautan atau interaksi yang rusak, dan seluruh berkas telah memenuhi standar batas ideal (< 150–200 baris untuk komponen dan < 300 baris untuk modul skrip). Menambahkan konfigurasi linter ESLint dengan aturan `max-lines` sebagai gembok otomatis agar berkas monolitik tidak pernah muncul kembali.

**Blocked by:** 00, 01, 02, 03, 04, 05, 06

**Status:** ready-for-agent

- [ ] Jalankan `npm run build` dan pastikan 64/64 static routes terkompilasi sukses 100% tanpa error.
- [ ] Pasang ESLint & plugin Astro (`eslint eslint-plugin-astro`) di `devDependencies`.
- [ ] Konfigurasikan aturan batas baris pada `eslint.config.js`:
  - `max-lines`: `["warn", { max: 300, skipBlankLines: true, skipComments: true }]`.
  - Pengecualian batas baris diberikan khusus untuk berkas mock data (`src/data/**`, `public/**/_mock-data.js`).
- [ ] Lakukan audit baris kode seluruh berkas `.astro` dan `.js` untuk memverifikasi tidak ada lagi berkas > 300 baris di luar mock data.
- [ ] Uji navigasi lintas persona: Mahasiswa, Dosen, Kontributor, dan Koordinator Admin.
- [ ] Uji interaktivitas modal dialog: pembukaan dan penutupan 22 modal admin berjalan mulus tanpa error konsol.
- [ ] Verifikasi tidak ada perubahan styling visual (zero visual regression) pada Landing Page, Portal Apps, dan Detail MBKM.
