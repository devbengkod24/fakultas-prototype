# 02: Dekomposisi Halaman Detail MBKM ke Komponen Domain Modular

**What to build:** Pemecahan halaman detail program MBKM (`src/pages/detail-mbkm.astro` dari 2.170 baris menjadi < 80 baris) ke dalam komponen modular di `src/components/mbkm/detail/`. Halaman tetap menampilkan banner hero Dicoding ASAH, seksi tentang program, 3 tab panel (Informasi, Persyaratan, Kontributor) dengan perataan tengah presisi dan batas tinggi `min-h-[220px]`, serta accordion FAQ interaktif.

**Blocked by:** 01: Ekstraksi Komponen Global Navbar dan Footer UDINUS

**Status:** completed

- [x] `src/pages/detail-mbkm.astro` terpangkas dari 2.170 baris menjadi < 80 baris.
- [x] Sub-komponen domain dibuat di `src/components/mbkm/detail/`:
  - `DetailHero.astro` (< 100 baris)
  - `DetailAbout.astro` (< 110 baris)
  - `DetailTabs.astro` (< 220 baris)
  - `DetailFaq.astro` (< 130 baris)
- [x] Tab Informasi, Persyaratan, dan Kontributor dapat beralih panel dengan mulus tanpa pergeseran layout (*layout shift*).
- [x] Nama dosen di tab kontributor tetap memiliki wrapping rapi (`whitespace-nowrap`) dan tinggi kartu seragam.
- [x] `npm run build` berhasil 100% tanpa error.
