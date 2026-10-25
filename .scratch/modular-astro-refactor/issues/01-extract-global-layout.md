# 01: Ekstraksi Komponen Global Navbar dan Footer UDINUS

**What to build:** Komponen navigasi atas dan footer resmi fakultas yang reusable di seluruh halaman publik (`mbkm.astro`, `detail-mbkm.astro`, `index.astro`). Komponen navbar mendukung highlight menu aktif (khususnya "Kampus Berdampak" dengan warna emas `#F3BC45`) dan drawer navigasi mobile responsif yang dapat dibuka/tutup dengan lancar.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Komponen `src/components/layout/GlobalNavbar.astro` terbuat (< 120 baris) dengan logo resmi `/assets/images/logo-dinus.png` dan prop `activeMenu`.
- [x] Komponen `src/components/layout/GlobalFooter.astro` terbuat (< 140 baris) memuat tautan resmi, kontak, dan portal prodi/kontributor.
- [x] Halaman `src/pages/mbkm.astro` diperbarui menggunakan `GlobalNavbar` dan `GlobalFooter` baru.
- [x] Navigasi drawer mobile (hamburger button) berfungsi interaktif.
- [x] `npm run build` berhasil 100% tanpa error.
