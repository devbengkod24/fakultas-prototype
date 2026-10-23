# 08: Dekomposisi Halaman Sidang Mahasiswa

**What to build:** Pemecahan halaman pengajuan sidang mahasiswa (`src/pages/mahasiswa/sidang.astro` dari 675 baris menjadi < 100 baris) ke dalam komponen domain di `src/components/mahasiswa/sidang/` dengan tetap mempertahankan arsitektur Tailwind v3 dan terminologi Kontributor.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] `src/pages/mahasiswa/sidang.astro` terpangkas dari 675 baris menjadi < 100 baris.
- [x] Sub-komponen dibuat di `src/components/mahasiswa/sidang/`:
  - `SidangInfoCard.astro` (< 110 baris): Form informasi MBKM dan input judul/luaran kegiatan.
  - `SidangBerkasCard.astro` (< 130 baris): Input unggah laporan akhir & tautan drive luaran.
  - `SidangJadwalCard.astro` (< 140 baris): Card jadwal pelaksanaan sidang, tautan Google Meet, dan kartu tim penguji (Kaprodi, Penguji Akademis, Penilai Kontributor).
  - `ModalRescheduleSidang.astro` (< 90 baris): Modal dialog pengajuan jadwal ulang sidang (`modal-jadwal`).
- [x] Terminologi tetap menggunakan *Kontributor* sesuai standar v3 terbaru.
- [x] Interaksi tombol buka modal reschedule dan tombol cetak bukti sidang berjalan normal.
- [x] `npm run build` berhasil 100% tanpa error.
