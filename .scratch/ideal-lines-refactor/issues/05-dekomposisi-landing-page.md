# 05: Dekomposisi Beranda Landing Page FIK

**What to build:** Pemecahan berkas `src/pages/index.astro` (3.505 baris) menjadi subkomponen modular di folder `src/components/landing/`. Berkas `index.astro` utama hanya mengorkestrasi frame dasar dan memanggil seksi-seksi beranda (< 100 baris). Seluruh atribut desain `data-pencil-name`, susunan layout absolut/flex, dan font/styling Figma tetap presisi 100%.

**Blocked by:** 00: Setup Helper Styling Komponen & Utilitas Tailwind

**Status:** completed

- [x] Folder baru `src/components/landing/` dibuat.
- [x] Subkomponen diekstrak dengan mempertahankan 100% markup dan atribut `data-pencil-name`:
  - `LandingNavbar.astro` (134 baris): Top navigation bar dan tautan menu utama fakultas.
  - `LandingHero.astro` (382 baris): Banner headline utama FIK, CTA button, dan visual showcase beranda.
  - `LandingBeritaKegiatan.astro` (533 baris): Feed berita terkini, update pengumuman, dan agenda akademik.
  - `LandingSambutanDekan.astro` (203 baris): Seksi kutipan dan sambutan Dekan FIK UDINUS.
  - `LandingProgramStudi.astro` (1.722 baris): Daftar program studi sarjana (S1) dan diploma (D3/SST).
  - `LandingFooter.astro` (412 baris): Informasi kontak universitas, map pin, dan direktori link footer.
- [x] Berkas `src/pages/index.astro` dirombak menjadi orkestrator ramping (83 baris, target < 100 baris).
- [x] Layout visual dan atribut `data-pencil-name` tetap utuh.
- [x] Verifikasi `npm run build` berhasil tanpa error.
