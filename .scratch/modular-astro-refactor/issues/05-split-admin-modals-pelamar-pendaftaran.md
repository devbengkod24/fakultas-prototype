# 05: Dekomposisi Admin Modals - Pelamar & Pratinjau Pendaftaran

**What to build:** Pemisahan modal verifikasi pelamar, preview form pendaftaran, transkrip nilai pelamar, dan penambahan custom field dari `src/components/admin/Modals.astro` ke berkas komponen modular di `src/components/admin/modals/`.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Berkas komponen terisolasi dibuat di `src/components/admin/modals/`:
  - `ModalPelamarAdmin.astro` (< 160 baris): `modal-detail-pelamar`, `modal-transkrip-pelamar`.
  - `ModalPreviewPendaftaran.astro` (< 140 baris): `modal-preview-pendaftaran-mhs`.
  - `ModalCustomField.astro` (< 110 baris): `modal-tambah-custom-field`.
- [x] Atribut ID DOM (seperti `#modal-detail-pelamar`, `#modal-transkrip-pelamar`) tetap identik.
- [x] Interaksi buka dialog pratinjau pelamar dan transkrip nilai mahasiswa dari tabel admin tetap berjalan normal.
- [x] `src/components/admin/Modals.astro` mengimpor komponen baru.
- [x] `npm run build` berhasil 100% tanpa error.
