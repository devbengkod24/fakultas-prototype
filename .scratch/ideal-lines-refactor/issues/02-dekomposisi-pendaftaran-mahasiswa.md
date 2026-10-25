# 02: Dekomposisi Halaman Pendaftaran Mahasiswa ke Komponen Stepper

**What to build:** Pemecahan berkas `src/pages/pendaftaran-mahasiswa.astro` (1.032 baris) menjadi subkomponen terisolasi di folder `src/components/mbkm/pendaftaran/`. Berkas halaman utama `pendaftaran-mahasiswa.astro` hanya mengorkestrasi stepper navigasi dan merender sub-step (< 70 baris). Alur pendaftaran 3 tahap, validasi form, dan ringkasan konfirmasi tetap berfungsi 100% normal.

**Blocked by:** 00: Setup Helper Styling Komponen & Utilitas Tailwind

**Status:** completed

- [x] Folder baru `src/components/mbkm/pendaftaran/` dibuat.
- [x] Subkomponen diekstrak dengan ukuran masing-masing < 150 baris:
  - `RegistrationStepper.astro` (85 baris, target < 90 baris): Visual bar indikator progress 3 tahap dan navigasi tombol langkah.
  - `StepIdentitas.astro` (68 baris, target < 120 baris): Form identitas mahasiswa, data akademik, dan pemilihan program.
  - `StepDokumen.astro` (78 baris, target < 130 baris): Form unggah dokumen persyaratan (CV ATS, Portofolio, Sertifikat).
  - `StepKonfirmasi.astro` (68 baris, target < 120 baris): Resume pratinjau data pendaftar dan checkbox persetujuan komitmen.
  - `ModalSuksesPendaftaran.astro` (59 baris, target < 80 baris): Modal dialog sukses submit pendaftaran.
- [x] Gunakan utilitas `cn(...)` dari `src/utils/cn.ts` untuk conditional class styling step aktif/selesai.
- [x] Halaman `src/pages/pendaftaran-mahasiswa.astro` dirombak menjadi orkestrator ramping (66 baris, target < 70 baris).
- [x] ID elemen form, listener step click, dan integrasi skrip pendaftaran tetap utuh.
- [x] Verifikasi `npm run build` berhasil tanpa error.
