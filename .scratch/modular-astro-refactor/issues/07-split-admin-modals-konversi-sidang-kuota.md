# 07: Dekomposisi Admin Modals - Konversi SKS, Sidang, & Kuota Dosen

**What to build:** Pemisahan sisa modal dari `src/components/admin/Modals.astro` (telaah konversi SKS, pengaturan batas kuota dosen, input nilai sidang, dan penjadwalan sidang baru) ke berkas komponen modular di `src/components/admin/modals/`. Setelah tiket ini selesai, berkas `src/components/admin/Modals.astro` hanya menjadi agregator ringkas (< 40 baris).

**Blocked by:** 04, 05, 06 (Dapat dimulai paralel setelah struktur folder `src/components/admin/modals/` tersedia)

**Status:** completed

- [x] Berkas komponen terisolasi dibuat di `src/components/admin/modals/`:
  - `ModalKonversiSks.astro` (< 170 baris): `modal-info-skema-sks`, `modal-telaah-konversi`.
  - `ModalDosenKuota.astro` (< 120 baris): `modal-atur-kuota-dosen`, `modal-edit-batas-dosen`.
  - `ModalSidangAdmin.astro` (< 160 baris): `modal-input-nilai-sidang`, `modal-jadwal-sidang`, `modal-preview-dokumen-luaran`.
- [x] Berkas `src/components/admin/Modals.astro` terpangkas dari 2.044 baris menjadi **< 40 baris** (hanya memuat import dan render komponen modular).
- [x] Fitur telaah konversi mata kuliah, input nilai sidang, dan preview dokumen luaran berfungsi normal.
- [x] `npm run build` berhasil 100% tanpa error.
