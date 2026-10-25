# 01: Dekomposisi Admin Modals ke Komponen Atomik

**What to build:** Pemecahan berkas monolitik `src/components/admin/Modals.astro` (2.044 baris) menjadi 22 berkas modal atomik terisolasi di dalam direktori `src/components/admin/modals/`. Berkas `Modals.astro` induk dijadikan barrel registry bersih (< 40 baris) yang hanya mengimpor dan merender komponen-komponen modal tersebut. Seluruh dialog modal (buka/tutup, form, tombol aksi) tetap berfungsi 100% normal tanpa perubahan ID DOM.

**Blocked by:** 00: Setup Helper Styling Komponen & Utilitas Tailwind

**Status:** completed

- [x] Folder baru `src/components/admin/modals/` dibuat.
- [x] Seluruh 22 modal diekstrak ke berkas mandiri dengan ukuran < 180 baris per file:
  - `ModalBuatPengumuman.astro` (id: `#modal-buat-pengumuman`)
  - `ModalDeletePengumuman.astro` (id: `#modal-delete-pengumuman`)
  - `ModalDetailPengumuman.astro` (id: `#modal-detail-pengumuman`)
  - `ModalTambahKontributor.astro` (id: `#modal-tambah-kontributor`)
  - `ModalShowcaseProyek.astro` (id: `#modal-showcase-proyek`)
  - `ModalDetailPelamar.astro` (id: `#modal-detail-pelamar`)
  - `ModalEditPeriode.astro` (id: `#modal-edit-periode`)
  - `ModalCrudKategori.astro` (id: `#modal-crud-kategori`)
  - `ModalCrudSkema.astro` (id: `#modal-crud-skema`)
  - `ModalCrudKoordinator.astro` (id: `#modal-crud-koordinator`)
  - `ModalAssignProgram.astro` (id: `#modal-assign-program`)
  - `ModalTambahCustomField.astro` (id: `#modal-tambah-custom-field`)
  - `ModalPreviewPendaftaran.astro` (id: `#modal-preview-pendaftaran-mhs`)
  - `ModalTranskripPelamar.astro` (id: `#modal-transkrip-pelamar`)
  - `ModalValidasiSurekom.astro` (id: `#modal-validasi-surekom`)
  - `ModalSurekomDocViewer.astro` (id: `#modal-surekom-doc-viewer`)
  - `ModalInfoSkemaSks.astro` (id: `#modal-info-skema-sks`)
  - `ModalTelaahKonversi.astro` (id: `#modal-telaah-konversi`)
  - `ModalAturKuotaDosen.astro` (id: `#modal-atur-kuota-dosen`)
  - `ModalEditBatasDosen.astro` (id: `#modal-edit-batas-dosen`)
  - `ModalJadwalSidang.astro` (id: `#modal-jadwal-sidang`)
  - `ModalToggleStatusKontributor.astro` (id: `#modal-toggle-status-kontributor`)
- [x] Berkas `src/components/admin/Modals.astro` dirombak menjadi orkestrator ramping (< 40 baris) yang mengimpor seluruh modal di atas.
- [x] Seluruh ID DOM (`#modal-...`), class Tailwind, dan atribut event handler tetap identik 100%.
- [x] Verifikasi `npm run build` berhasil tanpa error.
