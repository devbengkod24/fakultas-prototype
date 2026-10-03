# Product Requirements Document (PRD)
## Modul Kampus Berdampak (MBKM Terpadu) — Fakultas Ilmu Komputer UDINUS
**Fitur:** Kampus Berdampak (MBKM Terpadu FIK)  
**Versi:** 1.2.0 (Berdasarkan Briefing Resmi Koordinator KB / Bu Nurul & Alur Sistem)  
**Status:** Approved by Project Manager  
**Target Pembaca:** Frontend Developer, Backend Developer, QA Engineer, UI/UX Designer  
**Dokumen Pendukung UI:** `docs/DESIGN.md` (Strict UI Design Contract)  

---

## 1. Executive Summary & Product Vision

### 1.1 Latar Belakang Masalah
Fakultas Ilmu Komputer (FIK) Universitas Dian Nuswantoro menyelenggarakan program Kampus Berdampak (MBKM) yang mencakup 10 klaster program: dari program internal lab riset, magang industri KKI, studi independen bersertifikat nasional, magang sekolah, hingga kolaborasi joint project pimpinan universitas dan student mobility.

Sebelumnya, operasional Koordinator Kampus Berdampak (**Bu Nurul**) dan mahasiswa menghadapi tantangan:
1. **Perbedaan Mekanisme Intake per Program**:
   - Sebagian program membutuhkan **Pendaftaran Mandiri Mahasiswa** (mengunggah berkas seleksi atau permohonan surat rekomendasi).
   - Sebagian program lain berbasis **Pemberian List Mahasiswa oleh Mitra/Lab**, di mana Koordinator KB menginput langsung (*Direct Batch Input*) mahasiswa yang telah lolos ke sistem.
2. **Kebutuhan Berkas Khusus yang Beragam**:
   - Program seperti Magang KKI & Sekolah membutuhkan Transkrip Nilai & CV.
   - Program Studi Independen (Dicoding ASAH, Vinix) membutuhkan Transkrip Nilai serta **Surat Rekomendasi (Surekom)** bertemplate resmi mitra.
3. **Kompleksitas Pra-KRS & Konversi 20 SKS**:
   - Sebelum masa KRS, mahasiswa semester 6–8 mengajukan permohonan mata kuliah konversi.
   - Karena mata kuliah konversi tidak memiliki kelas reguler (dikelompokkan ke dalam kelas khusus MBKM), Koordinator KB harus merekapitulasi data mahasiswa dan mata kuliah konversi untuk diserahkan ke Program Studi (Prodi).
   - Diperlukan mekanisme komunikasi/rekonsiliasi jika mata kuliah yang diajukan mahasiswa belum sesuai dengan kurikulum MBKM.

### 1.2 Tujuan Produk (*Product Goals*)
1. **Katalog Publik Transparan (Halaman Umum)**: Memperkenalkan seluruh program Kampus Berdampak yang aktif pada semester berjalan secara transparan kepada publik/mahasiswa.
2. **Standardisasi 2 Model Intake Sistem**:
   - **Model A (Pendaftaran Mandiri Mahasiswa)**: Mahasiswa aktif mendaftar, mengunggah berkas sesuai syarat program (Transkrip, CV, atau draft Surekom), dan memantau status.
   - **Model B (Direct Input / Batch Assign oleh Koordinator KB)**: Koordinator KB memasukkan daftar mahasiswa yang diterima langsung dari mitra atau lab riset.
3. **Otomasi Validasi Syarat Akademik (*Zero Error Intake*)**: Sistem memvalidasi parameter kualifikasi utama (Semester 6–8, IPK $\ge$ 3.00, tidak pernah cuti ATAU minimal 100 SKS tempuh) langsung dari database akademik.
4. **Fasilitasi Siklus Konversi Matkul Pra & Pasca-KRS**: Mendukung alur pendataan mata kuliah konversi yang akan dikirimkan Koordinator KB ke Kaprodi sebelum jadwal KRS dibuka.

---

## 2. Taksonomi 10 Klaster Program Kampus Berdampak (Semester Aktif)

Berikut adalah taksonomi resmi program beserta mekanisme pendaftaran dan persyaratan berkasnya:

| No | Klaster Program | Entitas / Mitra Program | Mekanisme Intake | Persyaratan Dokumen & Alur Khusus |
|:---|:---|:---|:---|:---|
| **1** | **Studi Independen Bersertifikat** | **Dicoding ASAH** *(Eksternal)* | Pendaftaran Mandiri Mahasiswa | Mhs daftar mandiri $\rightarrow$ tes mitra $\rightarrow$ unggah data diri, **PDF Transkrip Nilai**, dan **PDF/Word Surat Rekomendasi (Surekom)** template mitra. |
| | | **Vinix** *(Eksternal)* | Pendaftaran Mandiri Mahasiswa | Mhs daftar mandiri $\rightarrow$ tes mitra $\rightarrow$ lolos $\rightarrow$ unggah data diri, **PDF Transkrip Nilai**, dan **PDF/Word Surekom** template mitra. |
| | | **Lab Intelligent Systems (IntSys)** *(Internal)* | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Tidak perlu upload mandiri. Mitra/Lab menyetorkan daftar mahasiswa lolos, Koordinator KB menginput ke sistem. |
| **2** | **Riset Bersama Bidang Kajian** | **IDSS** & **Matics** *(Internal)* | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Penugasan riset bidang kajian. Koordinator KB menginput daftar mahasiswa ke sistem. |
| **3** | **PPKOrmawa** | Kemahasiswaan & Ormawa FIK *(Internal)* | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Tim ormawa menyetorkan daftar anggota tim pelaksana, Koordinator KB menginput ke sistem. |
| **4** | **Joint Project** | **Proyek Khusus Rektor** (misal: Koding Dinosaurus - Pak Hanny) & **BTIK** | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Penugasan khusus pimpinan universitas/instansi mitra ke sistem. |
| **5** | **Industrial Visit Luar Negeri** | Mitra Perguruan Tinggi / Industri Luar Negeri | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Delegasi mahasiswa terpilih diinput langsung oleh Koordinator KB. |
| **6** | **Kuliah Kerja Usaha (KKU)** | Inkubator Bisnis / Wirausaha Mahasiswa | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Daftar mahasiswa wirausaha binaan diinput langsung oleh Koordinator KB. |
| **7** | **Magang Kuliah Kerja Industri (KKI)** | Mitra dinamis tiap semester:<br>1. **BTIK Dikbud Jateng**<br>2. **PT. Lumintu Sejahtera Mandiri**<br>3. **PT. Happy Dining (OTI)**<br>4. **PT. Panorama Indah Permai (Saloka)**<br>5. **The Grandia Group**<br>6. **BPMPTP Dinas Pendidikan Jateng** | Pendaftaran Mandiri Mahasiswa | Mhs mengisi formulir pendaftaran terbuka $\rightarrow$ upload **PDF Transkrip Nilai** & **PDF CV terkini**. |
| **8** | **Magang Berdampak di Sekolah** | Mitra dinamis tiap semester:<br>1. **SMA Negeri 1 Semarang**<br>2. **SMA Mardisiswa Semarang** | Pendaftaran Mandiri Mahasiswa | Mhs mengisi formulir pendaftaran terbuka $\rightarrow$ upload **PDF Transkrip Nilai** & **PDF CV terkini**. |
| **9** | **MBKM Bengkel Koding** | Pengelola Bengkel Koding FIK *(Internal)* | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Asisten instruktur pemrograman diinput langsung oleh Koordinator KB. |
| **10** | **Student Mobility ke UGM** | Universitas Gadjah Mada *(Eksternal)* | Mitra memberi list mhs $\rightarrow$ Koor. KB input ke sistem | Mahasiswa alih kredit semester terpilih diinput langsung oleh Koordinator KB. |

---

## 3. Aturan Bisnis & Logika Kualifikasi (Business Rules)

### 3.1 Aturan Kualifikasi Akademik Mahasiswa
Sistem secara otomatis mengevaluasi parameter database akademik sebelum membuka akses pendaftaran:

| Parameter | Kriteria Kelayakan | Logika Sistem (*System Logic*) |
|:---|:---|:---|
| **Semester Akademik** | Semester 6, 7, atau 8 | Jika semester < 6: Formulir pendaftaran **Terkunci (*Disabled*)**. |
| **IPK Kumulatif** | $\ge$ 3.00 | Jika IPK < 3.00: Formulir pendaftaran **Terkunci (*Disabled*)**. |
| **Riwayat Akademik** | **Tidak pernah cuti kuliah** ATAU **Telah menempuh $\ge$ 100 SKS** | Jika mahasiswa pernah cuti DAN SKS tempuh < 100: Pendaftaran **Terkunci (*Disabled*)**. |

### 3.2 Aturan Batas Pengajuan Tunggal (*Single Active Application*)
1. Setiap mahasiswa hanya diperbolehkan memiliki **maksimal 1 pendaftaran aktif** pada periode semester yang sama.
2. Jika mahasiswa sudah berstatus `Pending (Menunggu)` atau `Accepted (Diterima)` pada salah satu program, seluruh tombol pendaftaran program lain dinonaktifkan.
3. Mahasiswa baru dapat mengajukan pendaftaran ke program lain apabila status pengajuan sebelumnya dinyatakan `Rejected (Ditolak)`.

### 3.3 Aturan Dokumen & Spesifikasi Berkas
- **Format Transkrip Nilai & CV**: Wajib berformat **PDF (`.pdf`)** dengan batas maksimal **2.0 MB**.
- **Format Surat Rekomendasi (Surekom)**: Menerima format **PDF (`.pdf`)** atau **Word (`.docx`)** yang disesuaikan dengan template resmi dari mitra (Dicoding / Vinix).

---

## 4. Alur Kerja Koordinator Kampus Berdampak (Bu Nurul) & Siklus Konversi Matkul

Operasional Kampus Berdampak terbagi dalam 3 tahapan utama:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   FASE 1: PRA-KRS (SEBELUM PERIODE KRS)                │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Mahasiswa Semester 6, 7, 8 mengajukan Form Request Matkul Konversi  │
│    (Memilih mata kuliah yang diajukan untuk disetarakan ke MBKM)       │
│                                                                        │
│ 2. Bu Nurul merekapitulasi data konversi:                              │
│    - Karena matkul konversi tidak memiliki kelas reguler (masuk kelas  │
│      khusus MBKM), Bu Nurul menyerahkan daftar matkul & jumlah mhs     │
│      ke masing-masing Program Studi (Prodi) untuk plotting kelas.      │
│                                                                        │
│ 3. Rekonsiliasi Personal:                                              │
│    - Jika terdapat usulan konversi yang tidak sesuai (misal: mhs A     │
│      mengajukan matkul AA yang tidak relevan), Bu Nurul menghubungi    │
│      mahasiswa secara personal via WhatsApp untuk penyesuaian.         │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                FASE 2: PAKTA INTEGRITAS MAHASISWA (OFFLINE)            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Mahasiswa mengunduh template Word Pakta Integritas resmi.           │
│ 2. Mahasiswa Semester 6, 7, 8 dapat langsung mengisi pakta.            │
│ 3. Kasus Khusus (Semester 1–5): Wajib bertemu tatap muka dengan        │
│    Bu Nurul untuk kesepakatan konversi (diutamakan Matkul Umum).       │
│ 4. Berkas fisik pakta integritas ditandatangani dan diserahkan         │
│    langsung di meja kerja Bu Nurul.                                    │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  FASE 3: PASCA-KRS (SETELAH PERIODE KRS)               │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Seluruh mahasiswa Kampus Berdampak yang telah mengisi KRS menginput │
│    konfirmasi final kelompok mata kuliah konversi yang diambil.        │
│ 2. Sistem mencatat mapping final antara mahasiswa, program MBKM, dan   │
│    kode kelas mata kuliah konversi untuk pelaporan akademik fakultas.  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Arsitektur Peran Pengguna & Matriks Wewenang

### 5.1 Mahasiswa
- **Akses Publik**: Eksplorasi katalog 10 klaster program Kampus Berdampak tanpa perlu login.
- **Setelah Login SSO**:
  - Memeriksa validasi kualifikasi database secara otomatis.
  - Mengisi formulir pendaftaran untuk program jalur mandiri (Dicoding, Vinix, KKI Industri, Magang Sekolah).
  - Mengunggah berkas wajib (Transkrip, CV, Surekom mitra).
  - Melacak status pengajuan: `Pending (Menunggu)`, `Accepted (Diterima)`, `Rejected (Ditolak)`.
  - Mengisi permohonan mata kuliah konversi pada fase pra-KRS dan konfirmasi kelompok pasca-KRS.

### 5.2 Contributor (Dosen Pembimbing / Lab Riset)
- **Prasyarat**: Memiliki akun Dosen dan telah diberikan izin akses (*Granted Access*) oleh Admin Superfakultas.
- **Wewenang**:
  - Mengelola pelamar masuk pada program internal yang ditugaskan (Lab IntSys, Riset IDSS/Matics, PPKOrmawa, Joint Project).
  - **Jalur 1 (Seleksi Pendaftar Mandiri)**: Memeriksa transkrip/CV pelamar dan menetapkan keputusan *Terima* / *Tolak*.
  - **Jalur 2 (Direct Assign)**: Memasukkan langsung NIM mahasiswa bimbingan tugas akhir / riset lab binaan.

### 5.3 Admin (Superfakultas / Bu Nurul)
- **Wewenang Master**:
  1. **Kelola Hak Akses Contributor**: Mencari akun dosen FIK dan menetapkan izin kelola MBKM (*Assign Akses MBKM*).
  2. **Kelola Program & Kuota Mitra Eksternal**: Mengatur alokasi kuota mitra dinamis (PT. Saloka, OTI, BTIK, Dicoding, Vinix, BPMPTP, Grandia, SMAN 1, Mardisiswa, dll).
  3. **Penerimaan Mahasiswa Eksternal**:
     - *Jalur Mandiri*: Review dan persetujuan pendaftar KKI Industri & Magang Sekolah.
     - *Jalur Mitra*: **Direct Batch Import / Input** daftar mahasiswa yang telah disetorkan oleh mitra (Dicoding, Vinix, Lab IntSys, IDSS/Matics, PPKOrmawa, Joint Project Rektor, KKI, Bengkod, UGM).
  4. **Manajemen Konversi & Komunikasi Prodi**: Mengunduh rekapitulasi request matkul konversi mahasiswa untuk diserahkan ke Program Studi, serta mencatat status rekonsiliasi mahasiswa.
  5. **Monitoring & Rekap Statistik**: Dashboard analitik keterisian kuota dan mahasiswa aktif MBKM tingkat fakultas.

---

## 6. Standar Kualitas & Non-Functional Requirements

1. **Zero-Build Architecture**: Antarmuka prototipe dibangun menggunakan HTML5 murni, Tailwind CSS CDN v3.4+, dan Lucide Icons CDN tanpa ketergantungan compiler/bundler.
2. **Kepatuhan Desain Mutlak (*Strict Design Contract*)**: Seluruh komponen visual wajib mematuhi standar token warna Maritime Blue (`#1063B9`), Dinus Gold (`#F3BC45`), dan komponen baku di `docs/DESIGN.md`.
3. **Prototipe Role Switcher**: Prototipe menyediakan navigasi cepat untuk beralih peran secara instan (*Mahasiswa*, *Dosen*, *Admin Superfakultas*) demi kelancaran demo alur kerja ke klien dan stakeholder.
4. **Keamanan & Privasi**: Sistem tidak menampilkan token otentikasi atau data sensitif mahasiswa di luar konteks verifikasi akademik.
