# 06: Dekomposisi Admin Modals - Master Program & Surat Rekomendasi (Surekom)

**What to build:** Pemisahan modal pengaturan periode, kategori, skema program, penugasan koordinator, dan penelaahan surat rekomendasi (surekom) dari `src/components/admin/Modals.astro` ke berkas komponen modular di `src/components/admin/modals/`.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Berkas komponen terisolasi dibuat di `src/components/admin/modals/`:
  - `ModalMasterProgram.astro` (< 190 baris): `modal-edit-periode`, `modal-crud-kategori`, `modal-crud-skema`, `modal-crud-koordinator`, `modal-assign-program`.
  - `ModalSurekomAdmin.astro` (< 120 baris): `modal-validasi-surekom`, `modal-surekom-doc-viewer`.
- [x] Atribut ID DOM dan form input tetap utuh untuk komunikasi dengan script admin.
- [x] Dialog validasi surekom dan modal pratinjau dokumen draf surat rekomendasi dapat dibuka dan ditutup normal.
- [x] `src/components/admin/Modals.astro` mengimpor kedua komponen baru.
- [x] `npm run build` berhasil 100% tanpa error.
