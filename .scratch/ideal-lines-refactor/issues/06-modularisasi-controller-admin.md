# 06: Modularisasi Admin Master Controller ke TypeScript & Adopsi Alpine Plugins

**What to build:** Pemecahan skrip monolitik `public/admin/_controller.js` (6.023 baris) menjadi modul-modul logika TypeScript terisolasi dan type-safe di folder `src/scripts/admin/*.ts`. Modul-modul ini di-bundle secara native oleh Vite/Astro, menurunkan ukuran berkas ke < 300 baris per modul, menghilangkan script inline `public/`, dan mengadopsi plugin resmi Alpine (`@alpinejs/collapse` untuk animasi accordion dan `@alpinejs/persist` untuk persistensi tab) tanpa memutus reaktivitas `Alpine.store('mbkm')`.

**Blocked by:** 01: Dekomposisi Admin Modals ke Komponen Atomik (agar ID DOM modal sudah stabil)

**Status:** ready-for-agent

- [ ] Folder baru `src/scripts/admin/` dibuat.
- [ ] Pasang plugin resmi Alpine `@alpinejs/collapse` dan `@alpinejs/persist` di `package.json`.
- [ ] Logika modular diekstrak menjadi berkas TypeScript terpisah (< 300 baris per file):
  - `main.ts` (< 60 baris): Entrypoint utama yang menginisialisasi plugin Alpine, mendaftarkan store, dan memuat semua handler.
  - `store-navigation.ts` (< 180 baris): State global navigasi tab, sidebar state, switchTab, dan sinkronisasi URL hash / localStorage via `$persist`.
  - `handler-pelamar.ts` (< 220 baris): Logika modal detail pelamar, transkrip nilai, dan aksi verifikasi berkas type-safe.
  - `handler-sidang.ts` (< 200 baris): Logika plotting jadwal sidang, filter ruangan/jam, dan assign dosen penguji.
  - `handler-surekom.ts` (< 190 baris): Logika telaah dokumen surat rekomendasi, preview PDF, dan validasi persetujuan.
  - `handler-periode-skema.ts` (< 160 baris): CRUD master periode, skema konversi, dan kategori program.
  - `handler-kuota-dosen.ts` (< 150 baris): Pengaturan batas bimbingan dan kuota dosen DPL.
- [ ] Berkas `src/layouts/AdminShell.astro` dan `KontributorShell.astro` diperbarui: mengganti `<script is:inline src="/admin/_controller.js">` dengan `<script src="../../scripts/admin/main.ts"></script>`.
- [ ] Berkas peninggalan `public/admin/_controller.js` diarsipkan atau dikurangi menjadi compatibility shim ramping (< 30 baris).
- [ ] Verifikasi seluruh aksi interaktif dashboard admin berjalan lancar dengan compile type-check TypeScript 100% hijau.
