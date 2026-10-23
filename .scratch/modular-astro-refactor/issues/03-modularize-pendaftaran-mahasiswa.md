# 03: Modularisasi Multi-Step Form Pendaftaran Mahasiswa

**What to build:** Pemecahan halaman formulir pendaftaran mahasiswa (`src/pages/pendaftaran-mahasiswa.astro` dari 1.032 baris menjadi < 80 baris) ke dalam komponen terisolasi per langkah di `src/components/mbkm/pendaftaran/` dan script vanilla terpisah di `src/scripts/pendaftaran-stepper.js`.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] `src/pages/pendaftaran-mahasiswa.astro` berukuran < 80 baris.
- [x] Sub-komponen formulir dibuat di `src/components/mbkm/pendaftaran/`:
  - `RegistrationStepper.astro` (< 60 baris): Stepper visual garis terhubung antar-angka (1, 2, 3) biru & abu.
  - `StepIdentitas.astro` (< 130 baris): Dua kartu terpisah ("Identitas Mahasiswa" dan "Data Studi SIAKAD"), field readonly tanpa icon gembok, nomor telepon editable, tanpa tombol kembali di tahap 1.
  - `StepDokumen.astro` (< 150 baris): Input berkas (CV, Portofolio, Sertifikat) dan slot lampiran dinamis.
  - `StepKonfirmasi.astro` (< 90 baris): Review data dan persetujuan komitmen tanpa kotak 20 SKS.
- [x] Tautan navigasi opsi C ("← Kembali ke Detail Program") tetap berada tepat di atas panel pendaftaran.
- [x] Logika dinamis "Tambahkan Lampiran" (maksimal 3 lampiran dengan tombol hapus sampah sejajar label) berfungsi normal di `src/scripts/pendaftaran-stepper.js`.
- [x] `npm run build` berhasil 100% tanpa error.
