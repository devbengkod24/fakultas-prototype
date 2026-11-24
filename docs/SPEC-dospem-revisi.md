# SPEC: Revisi Modul Dosen Pembimbing (Dospem) — MBKM

**Branch:** `feat/dospem`  
**Base:** `mbkm-v3`  
**Stack:** Astro + Tailwind CSS + Alpine.js  
**Dibuat:** 2026-11-18  
**Status:** FINAL — semua poin disetujui

---

## 1. Problem Statement

Modul Dosen Pembimbing pada `fakultas-prototype` saat ini mengandung struktur navigasi dan konten yang tidak sesuai dengan konteks MBKM:

- **Navigasi sidebar** memiliki menu "Logbook Mahasiswa" (`/dosen/logbook`) yang merupakan halaman terpisah, padahal informasi logbook seharusnya diakses melalui detail mahasiswa (bukan halaman independen).
- **Dashboard** masih menampilkan panel "Informasi Kuota Bimbingan" (Total Kuota, Sisa Kuota, Total Pengajuan, Jumlah Diterima) yang merupakan konsep KP/TA, bukan MBKM. Metrik yang ditampilkan tidak relevan untuk peran Dosen Pembimbing MBKM.
- **Chart logbook** di dashboard menggunakan model Bab 1–5 (konsep skripsi/KP), tidak relevan untuk MBKM yang berbasis logbook mingguan.
- **Halaman Mahasiswa Bimbingan** tidak memiliki kolom progress logbook dan tidak ada mekanisme untuk melihat detail mahasiswa beserta validasi logbook mingguan.
- **Halaman Sidang** menggunakan pola tab (Data Pengajuan / Hasil) dan tidak memiliki modal penilaian sidang terintegrasi.
- **Label "Laporan Akhir"** pada menu dan halaman tidak tepat untuk konteks MBKM — harus diganti menjadi "Logbook Bimbingan".

---

## 2. Solution Overview

Revisi bertahap pada enam komponen utama modul Dospem dengan prinsip **surgical edit** (tidak menulis ulang file dari awal). Setiap perubahan bersifat _pure extraction_ sesuai spesifikasi.

---

## 3. User Stories

### US-01 — Dashboard: Metrik Operasional
> Sebagai Dosen Pembimbing, saya ingin melihat 4 metrik operasional yang relevan (jumlah mahasiswa bimbingan, logbook belum diperiksa, laporan masuk, jadwal sidang terplot) di dashboard agar saya bisa mengetahui status pembimbingan secara cepat.

### US-02 — Dashboard: Badge Jumlah Mahasiswa
> Sebagai Dosen Pembimbing, saya ingin kartu menu "Mahasiswa Bimbingan" menampilkan badge angka total mahasiswa (mis. "2 Mahasiswa Bimbingan") agar saya tahu secara langsung berapa mahasiswa yang saya bimbing.

### US-03 — Dashboard: Progress Logbook Mingguan
> Sebagai Dosen Pembimbing, saya ingin chart/widget progress logbook mingguan mahasiswa (bukan per BAB) agar saya bisa memantau perkembangan pengisian logbook secara akurat sesuai model MBKM.

### US-04 — Dashboard: Redirect Kartu "Logbook Bimbingan"
> Sebagai Dosen Pembimbing, saya ingin kartu menu kedua di dashboard berlabel "Logbook Bimbingan" dan mengarah ke `/dosen/laporan-akhir` (bukan `/dosen/logbook`).

### US-05 — Sidebar: Hapus Menu Logbook, Ganti Label Laporan Akhir
> Sebagai Dosen Pembimbing, saya ingin sidebar tidak lagi menampilkan menu "Logbook Mahasiswa" dan menu "Laporan Akhir" diganti menjadi "Logbook Bimbingan" agar navigasi lebih selaras dengan alur kerja MBKM.

### US-06 — Halaman Mahasiswa: Kolom Baru & Ganti Label
> Sebagai Dosen Pembimbing, saya ingin halaman Mahasiswa Bimbingan memiliki:
> - Header kolom "Status MBKM" diganti menjadi "Skema MBKM"
> - Kolom "Logbook Kegiatan" (badge progress: `8/16 Minggu` atau `2 Perlu Review`)
> - Kolom "Aksi" dengan tombol "Detail"

### US-07 — Halaman Mahasiswa: Modal Detail Mahasiswa
> Sebagai Dosen Pembimbing, saat saya klik tombol "Detail" pada baris mahasiswa, saya ingin melihat slide-over drawer berisi: (a) biodata mahasiswa, (b) info MBKM (skema, mitra, posisi, SKS), (c) accordion logbook per minggu dengan status validasi, tombol "Validasi", dan input "Catatan Dosen".

### US-08 — Mock Data: Perluas Field Mahasiswa
> Sebagai developer, saya membutuhkan field tambahan pada mock data mahasiswa: `logbookProgress`, `logbookTotal`, `logbookPendingReview`, `skema`, `mitra`, `posisi`, `sks`, beserta array `logbookEntries` per minggu.

### US-09 — Hapus Halaman Logbook Standalone
> Sebagai developer, saya ingin menghapus `src/pages/dosen/logbook.astro` dan folder `src/pages/dosen/logbook/` agar tidak ada rute obsolete.

### US-10 — Ganti Label Laporan Akhir → Logbook Bimbingan
> Sebagai Dosen Pembimbing, saya ingin halaman `/dosen/laporan-akhir` menampilkan label, pageTitle, breadcrumb, dan subtitle "Logbook Bimbingan" (bukan "Laporan Akhir").

### US-11 — Sidang: Tabel Tunggal Jadwal & Penilaian
> Sebagai Dosen Pembimbing, saya ingin halaman Sidang menampilkan satu tabel "Jadwal & Penilaian Sidang" tanpa tab bar, berisi kolom: mahasiswa, gelombang, tanggal sidang, ruangan, status, dan tombol aksi "Nilai".

### US-12 — Sidang: Modal Penilaian
> Sebagai Dosen Pembimbing, saya ingin modal penilaian sidang dengan: Nilai Pembimbing (editable), Nilai Penyelia/Mitra (editable, opsional), Nilai Penguji 1/2/3 (view-only), dan kalkulasi Nilai Akhir otomatis.

---

## 4. Implementation Decisions

### 4.1 Stack & Constraints
- **Framework:** Astro (SSG) — tidak ada server-side state
- **Styling:** Tailwind CSS via CDN (konfigurasi di DosenShell)
- **Interaktivitas:** Alpine.js v3.14.8 (`x-data`, `x-show`, `x-for`, `x-model`, `@click`)
- **Ikon:** Lucide Icons CDN, diinisiasi via `window.lucide.createIcons()`
- **Batas baris:** Komponen ≤ 150–200 baris; halaman ≤ 100 baris
- **Verifikasi:** `npm run build` wajib dijalankan setelah setiap tiket selesai

### 4.2 Keputusan Arsitektur
- **Slide-over drawer** mahasiswa menggunakan Alpine.js `x-show` + `x-data` di dalam halaman `mahasiswa.astro` (tidak dibuat komponen terpisah, mengingat batas ukuran file ~200 baris — jika terlalu panjang, diekstrak ke komponen `.astro`)
- **Accordion logbook** per minggu menggunakan Alpine.js `x-data` dengan state `openWeek` per mahasiswa
- **Modal penilaian sidang** menggunakan pola yang sama dengan modal TTD yang sudah ada di `sidang.astro`
- **Mock data logbook**: array `logbookEntries[]` didefinisikan inline di frontmatter halaman `mahasiswa.astro` (bukan file terpisah)
- **Naming convention**: Ikuti CLAUDE.md — gunakan "Logbook Bimbingan" untuk label menu/halaman; "Dospem" hanya untuk badge/kolom sempit

### 4.3 Rute & Navigasi Akhir
```
Dashboard          → /dosen/dashboard
Mahasiswa Bimbingan → /dosen/mahasiswa
Logbook Bimbingan  → /dosen/laporan-akhir   ← (menu baru, rute lama)
Sidang             → /dosen/sidang
Log Aktivitas      → /dosen/log-aktivitas
```
> Rute `/dosen/logbook` dan `/dosen/logbook/[id]` **dihapus**.

### 4.4 Kalkulasi Nilai Akhir Sidang
Nilai Akhir = rata-rata dari semua komponen yang sudah diisi (Pembimbing + Penyelia/Mitra jika ada + Penguji yang sudah diisi koordinator). Implementasi murni di Alpine.js dengan getter computed.

---

## 5. Testing Decisions

- **Build Check:** `npm run build` harus selesai tanpa error/warning pada setiap tiket
- **Rute obsolete:** Setelah T-02, navigasi ke `/dosen/logbook` harus menghasilkan 404 (Astro static)
- **UI Verification:** Setiap tiket memiliki acceptance criteria visual yang bisa dicek secara manual di browser (`npm run dev`)
- **No unit tests** untuk prototipe ini (konsisten dengan pola existing codebase)

---

## 6. Out of Scope

- Koneksi ke API backend / database nyata
- Autentikasi dan session management
- Halaman `laporan-akhir/[id].astro` (tidak dimodifikasi kontennya)
- Halaman `log-aktivitas.astro` (tidak termasuk dalam revisi ini)
- Fitur upload TTD di halaman Sidang (sudah ada, tidak diubah)
- Pagination dinamis (tetap statis seperti existing)
