# PRD.md — Product Requirements Document
# Sub-App MBKM Mahasiswa — Kampus Berdampak

**Versi**: 1.0  
**Status**: Draft Prototipe  
**Penulis**: Tim FIK — Universitas Dian Nuswantoro  
**Tanggal**: Oktober 2026  

---

## 1. Latar Belakang

Program **Kampus Berdampak** (MBKM — Merdeka Belajar Kampus Merdeka) adalah inisiatif Kemendikbud yang memungkinkan mahasiswa melakukan kegiatan di luar kampus selama 1–2 semester. FIK Udinus memerlukan sistem digital untuk mengelola alur MBKM dari sisi mahasiswa, koordinator, dan fakultas.

Dokumen ini mendefinisikan kebutuhan produk untuk sub-aplikasi khusus **peran Mahasiswa** dalam ekosistem platform FIK.

---

## 2. Tujuan Produk

Menyediakan antarmuka digital bagi mahasiswa untuk:
1. **Verifikasi kelayakan** akademik sebelum mendaftar MBKM
2. **Pendaftaran program** MBKM yang tersedia
3. **Pengunggahan berkas** persyaratan
4. **Pelacakan status** pendaftaran & progres kegiatan

---

## 3. Pengguna (Persona)

| Persona | Deskripsi |
|---------|-----------|
| **Mahasiswa Aktif** | Mahasiswa semester 5–7 FIK Udinus yang memenuhi syarat MBKM |
| **Mahasiswa Peserta** | Mahasiswa yang sudah lolos seleksi dan sedang menjalani MBKM |

---

## 4. Alur Utama Pengguna

### 4.1 Alur Login & Onboarding
```
SSO FIK Login → Redirect ke /mbkm/mahasiswa → Cek kelengkapan profil
  ├── [Profil Belum Lengkap] → Alert + CTA ke halaman onboarding
  └── [Profil Lengkap] → Dashboard mahasiswa
```

### 4.2 Alur Pendaftaran Program MBKM
```
Dashboard → Daftar Program → Pilih Program → Cek Kelayakan
  ├── [Tidak Layak] → Tampilkan syarat yang belum terpenuhi
  └── [Layak] → Form Pendaftaran → Upload Berkas → Submit → Status: Pending
```

### 4.3 Alur Pelacakan Status
```
Dashboard → Status Pendaftaran → Detail Pengajuan
  ├── Pending → Menunggu review koordinator
  ├── Disetujui → Akses modul kegiatan (logbook, laporan)
  └── Ditolak → Catatan penolakan + opsi revisi
```

---

## 5. Fitur

### 5.1 Dashboard (Halaman Utama)

**[P0 — Wajib]**
- Widget statistik: Progress kelayakan, Status pengajuan, Periode aktif
- Checklist kelayakan akademik (IPK, SKS, dsb.)
- Daftar pengumuman terbaru dari koordinator
- Aksi cepat (Quick Actions)
- Alert profil belum lengkap (jika berlaku)

### 5.2 Profil & Kelayakan Akademik

**[P0 — Wajib]**
- Tampilkan data akademik (NIM, Prodi, Semester, IPK, SKS)
- Status kelayakan MBKM (layak/tidak layak + alasan)
- Tombol lengkapi profil (jika ada data yang kurang)

### 5.3 Pendaftaran Program MBKM

**[P0 — Wajib]**
- List program MBKM yang tersedia (dengan quota, tanggal, jenis)
- Filter & pencarian program
- Form pendaftaran + checklist persyaratan
- Upload dokumen (surat rekomendasi, transkrip, dll.)
- Konfirmasi & submit pendaftaran

### 5.4 Status & Tracking

**[P0 — Wajib]**
- Riwayat pendaftaran (per gelombang)
- Status real-time (pending, disetujui, ditolak)
- Catatan dari koordinator/dosen
- Notifikasi status berubah

### 5.5 Logbook & Laporan (Post-Approval)

**[P1 — Penting]**
- Input logbook kegiatan harian/mingguan
- Upload laporan kemajuan
- Lihat feedback dari supervisor

### 5.6 Pengumuman

**[P1 — Penting]**
- Daftar pengumuman dari koordinator MBKM
- Filter berdasarkan program/kategori
- Tandai sudah dibaca

---

## 6. Kebutuhan Non-Fungsional

| Kebutuhan | Target |
|-----------|--------|
| **Performa** | First Contentful Paint < 2 detik |
| **Kompatibilitas** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| **Responsif** | Mobile-first, breakpoint 768px & 1024px |
| **Aksesibilitas** | WCAG 2.1 Level AA |
| **Keamanan** | SSO via akun FIK, sesi auto-expire |

---

## 7. Batasan Prototipe (v1)

Untuk versi prototipe HTML statis ini:
- **Tidak ada** koneksi backend nyata — data menggunakan mock/dummy
- **Tidak ada** autentikasi nyata — simulasi user yang sudah login
- **Tidak ada** upload file nyata — UI form saja
- Fokus pada **struktur tata letak**, **desain**, dan **alur navigasi**

---

## 8. Acceptance Criteria Halaman Dashboard

| Kriteria | Status |
|----------|--------|
| Header dengan breadcrumb & Global Role Switcher terpasang | ✅ |
| Sidebar dengan menu navigasi MBKM mahasiswa terpasang | ✅ |
| UserCard di footer sidebar dengan avatar, nama, role | ✅ |
| Main canvas dengan border, rounded, padding sesuai layout | ✅ |
| Widget stats (progress, status, periode) terpasang | ✅ |
| Checklist kelayakan akademik ditampilkan | ✅ |
| Quick actions / aksi cepat terpasang | ✅ |
| Alert profil belum lengkap (conditional) | ✅ |
| Responsif mobile & desktop | ✅ |
| Mengikuti design tokens DESIGN.md Bab 1 | ✅ |

---

## 9. Struktur Navigasi Sidebar Mahasiswa

```
📋 Kampus Berdampak (AppSwitcher)
──────────────────────────────────
🏠 Dashboard
📢 Pengumuman
📋 Kelayakan & Profil
🎯 Daftar Program MBKM
📂 Pengajuan Saya
  └── Status Pendaftaran
  └── Unggah Berkas
📓 Logbook & Laporan
```

---

## 10. Rencana Iterasi

| Versi | Scope |
|-------|-------|
| **v1 (saat ini)** | Dashboard layout, sidebar, header, konten mock |
| **v2** | Halaman form pendaftaran, upload berkas |
| **v3** | Halaman logbook, status tracking detail |
| **v4** | Integrasi API backend nyata |

---

*Dokumen ini akan diperbarui seiring perkembangan prototipe.*
