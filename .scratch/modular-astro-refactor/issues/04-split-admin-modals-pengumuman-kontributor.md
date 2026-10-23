# 04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase

**What to build:** Pemisahan kelompok modal pengumuman, kontributor, dan showcase proyek dari `src/components/admin/Modals.astro` ke berkas komponen modular di `src/components/admin/modals/` dengan mempertahankan ID DOM dan struktur class persis sama.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Berkas komponen terisolasi dibuat di `src/components/admin/modals/`:
  - `ModalPengumuman.astro` (< 110 baris): `modal-buat-pengumuman`, `modal-delete-pengumuman`, `modal-detail-pengumuman`.
  - `ModalKontributorAdmin.astro` (< 130 baris): `modal-tambah-kontributor`, `modal-toggle-status-kontributor`.
  - `ModalShowcase.astro` (< 100 baris): `modal-showcase-proyek`.
- [x] Seluruh atribut `id`, `name`, dan `class` tetap identik sehingga handler di `public/admin/_controller.js` tetap berfungsi tanpa regresi.
- [x] `src/components/admin/Modals.astro` mengimpor dan me-mount ketiga komponen baru tersebut.
- [x] `npm run build` berhasil 100% tanpa error.
