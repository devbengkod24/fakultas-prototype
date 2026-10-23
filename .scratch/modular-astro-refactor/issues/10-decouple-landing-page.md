# 10: Dekomposisi Landing Page Utama (index.astro)

**What to build:** Pemecahan landing page monolitik raksasa `src/pages/index.astro` (3.505 baris menjadi < 120 baris) ke dalam seksi komponen terisolasi di `src/components/landing/`.

**Blocked by:** 01: Ekstraksi Komponen Global Navbar dan Footer UDINUS

**Status:** done

- [x] `src/pages/index.astro` berkurang dari 3.505 baris menjadi **< 120 baris**.
- [x] Komponen seksi dibuat di `src/components/landing/`:
  - `DeanGreetingSection.astro` (< 160 baris): Foto Dekan, sambutan, visi misi FIK UDINUS.
  - `ProgramsGridSection.astro` (< 180 baris): Grid program studi sarjana & vokasi FIK.
  - `NewsAndEventsSection.astro` (< 150 baris): Berita terbaru dan agenda kegiatan akademik mahasiswa.
  - `KampusBerdampakHeroSection.astro` (< 130 baris): Highlight pilar MBKM / Kampus Berdampak.
- [x] Desain visual, SVG grafis, dan layout kanvas responsif tetap identik 100%.
- [x] Menggunakan `GlobalNavbar` dan `GlobalFooter` (dari TICKET-01).
- [x] `npm run build` berhasil 100% tanpa error.
