# 03: Dekomposisi Halaman Detail Program MBKM

**What to build:** Pemecahan berkas `src/pages/detail-mbkm.astro` (2.168 baris) menjadi subkomponen modular di folder `src/components/mbkm/detail/`. Berkas halaman utama `detail-mbkm.astro` hanya mengorkestrasi layout, meta, dan mengimpor seksi detail (< 80 baris). Seluruh informasi program, tab interaktif (Tentang, Alur Kegiatan, Showcase, FAQ), dan tombol aksi daftar tetap berfungsi 100% normal.

**Blocked by:** 00: Setup Helper Styling Komponen & Utilitas Tailwind

**Status:** completed

- [x] Folder baru `src/components/mbkm/detail/` dibuat.
- [x] Subkomponen diekstrak dengan ukuran masing-masing < 160 baris:
  - `DetailHero.astro` (< 140 baris): Banner header, breadcrumb, logo mitra, judul program, dan badge kuota.
  - `DetailTabs.astro` (< 110 baris): Tabbar navigasi sticky (Tentang, Alur, Showcase, FAQ) beserta state switcher.
  - `DetailAbout.astro` (< 150 baris): Deskripsi lengkap program, capaian pembelajaran, fasilitas, dan persyaratan akademik.
  - `DetailTimeline.astro` (< 120 baris): Alur kegiatan per tahapan dan rentang waktu pelaksanaan.
  - `DetailShowcase.astro` (< 130 baris): Galeri hasil karya / portofolio capstone project mahasiswa sebelumnya.
  - `DetailFaq.astro` (< 100 baris): Accordion tanya jawab seputar program dan mitra.
  - `DetailFooter.astro` (< 90 baris): Footer spesifik halaman publik detail program.
- [x] Gunakan utilitas `cn(...)` dari `src/utils/cn.ts` untuk tabbar state dan status pills.
- [x] Halaman `src/pages/detail-mbkm.astro` dirombak menjadi orkestrator ramping (< 80 baris).
- [x] Logika tab switcher JS dan tautan pendaftaran mahasiswa tetap bekerja normal.
- [x] Verifikasi `npm run build` berhasil tanpa error.
