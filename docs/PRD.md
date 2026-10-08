# Product Requirements Document (PRD)
## Modul Kampus Berdampak (MBKM Terpadu) — Fakultas Ilmu Komputer UDINUS

**Fitur:** Kampus Berdampak (MBKM Terpadu FIK)  
**Versi:** 2.0.0 (Pemutakhiran Regulasi Standarisasi MBKM & Matriks 3 Peran Terpadu)  
**Status:** Approved by Koordinator MBKM & Tim Pengembang  
**Target Pembaca:** Frontend Developer, Backend Developer, QA Engineer, UI/UX Designer, Koordinator MBKM, Mitra  
**Dokumen Pendukung UI:** `docs/DESIGN.md` (Strict UI Design Contract)  
**Dokumen Indeks Baris Kode:** `docs/INDEX.md` (Master Index & Line Function Mapping)

---

## 1. Executive Summary & Product Vision

### 1.1 Latar Belakang Masalah
Fakultas Ilmu Komputer (FIK) Universitas Dian Nuswantoro menyelenggarakan program Kampus Berdampak (MBKM Terpadu) yang mencakup kolaborasi mitra laboratorium riset internal (Bengkel Koding, IDSS, Matic, Ryuje) maupun mitra industri dan instansi eksternal. 

Evaluasi operasional dan koordinasi standarisasi bersama stakeholder (Koordinator MBKM, pengelola lab, mitra, dan tim pengembang) mengidentifikasi kebutuhan mendesak untuk menertibkan tata kelola MBKM:
1. **Ketiadaan Standarisasi Baku (Fragmentasi di Tengah Jalan)**:
   - Prosedur MBKM sebelumnya berjalan terlalu fleksibel dan bervariasi antar-mitra/lab, sehingga kerap memicu kebingungan administrasi, keterlambatan pelaporan, dan beban konversi di pertengahan semester.
2. **Ambiguitas Batasan Entitas Mitra vs Dosen**:
   - Terjadi kerancuan antara pengelola program mitra (PIC industri/lab) dengan Dosen Pembimbing Lapangan (DPL). Sering kali mitra mengurusi administrasi kurikulum yang bukan kewenangannya, sementara alokasi DPL resmi dari basis data universitas belum terintegrasi rapi.
3. **Kompleksitas Seleksi & Formulir Rekomendasi (SuReKom)**:
   - Mahasiswa menganggap Surat Rekomendasi (SuReKom) sebagai tiket instan kelulusan, padahal SuReKom adalah instrumen permohonan seleksi awal dekanat sebelum mahasiswa dinilai oleh mitra dan disetujui final oleh Koordinator MBKM.
4. **Validasi Syarat Akademik Belum Otomatis**:
   - Pemeriksaan IPK, semester aktif, dan SKS tempuh masih dilakukan manual, memperbesar risiko lolosnya pendaftar yang belum memenuhi kriteria kualifikasi akademik prodi.
5. **Ketiadaan Target Luaran Terukur**:
   - Banyak kegiatan MBKM berakhir tanpa luaran terstandarisasi yang jelas, menyulitkan program studi dalam memberikan konversi nilai KHS secara akuntabel.

### 1.2 Prinsip Utama Produk (*Guiding Principles*)
1. **Standarisasi Kaku (Sistem Menetapkan Regulasi di Awal)**:
   Sistem FIK Apps yang mendikte dan menetapkan regulasi, format, serta jadwal cut-off di awal semester. Seluruh pihak (mitra, dosen, dan mahasiswa) wajib mematuhi standarisasi sistem tanpa fleksibilitas ad-hoc di tengah semester.
2. **Bengkel Koding (Bengkod) sebagai Baseline Kompleksitas Tertinggi**:
   Alur Bengkel Koding dengan 3 spektrum program (Asistensi, Proyek, Riset/Publikasi) dijadikan standar acuan tertinggi (*worst-case complexity*). Jika alur Bengkod terwadahi penuh, mitra lain (Ryuje, IDSS, Matic, industri) otomatis terfasilitasi secara aman.
3. **Pemisahan Tegas Entitas Contributor Mitra vs Dosen Pembimbing (DPL)**:
   Contributor Mitra adalah entitas pengguna mandiri (*invite-only* oleh Koordinator), bukan akun dosen biasa. Mitra dilarang keras mengakses kurikulum/matkul mahasiswa. DPL resmi ditarik dari database UDI dan dialokasikan terpusat oleh Koordinator MBKM untuk mengawal logbook berkala.
4. **Target Luaran Wajib Terstandarisasi (*Measurable Outputs*)**:
   Setiap kegiatan MBKM wajib menghasilkan luaran final berupa **Publikasi Ilmiah** (ber-DOI / LoA) dan/atau **Sertifikat Kelulusan Resmi Mitra** sebagai syarat mutlak pengesahan nilai konversi ke KHS.
5. **Target Kesiapan Uji Coba**:
   Sistem prototipe dan fungsional wajib siap diuji coba secara komprehensif oleh Koordinator MBKM (Bu Nurul) sebelum masa pergantian semester baru dimulai.

---

## 2. Arsitektur 3 Peran Utama & Matriks Kewenangan

Sistem MBKM FIK Apps mengintegrasikan **3 Peran Utama** (*Three Core Roles*) yang berinteraksi secara simetris dan aman:

```text
                        ┌───────────────────────────────┐
                        │            FIK Apps           │
                        │    (Ekosistem Kampus Terpadu) │
                        └───────────────┬───────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│     Koordinator MBKM    │   │        Mahasiswa        │   │    Contributor Mitra    │
│  (Bu Nurul / Per-Prodi) │   │ (Basis Data EWS 50.000) │   │  (Bengkod, Matic, dsb)  │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

### 2.1 Koordinator MBKM (Regulator Fakultas / Prodi)
- **Karakteristik Akun**: Akun regulator tingkat program studi / fakultas (arsitektur siap-SaaS multi-prodi), dipegang oleh Koordinator MBKM (Bu Nurul).
- **Kewenangan & Tanggung Jawab**:
  1. **Timeline & Periode**: Mengatur kalender pembukaan, cut-off permohonan SuReKom, batas seleksi mitra, hingga batas input nilai akhir semester.
  2. **Manajemen Akun Mitra**: Membuat dan meng-generate akun PIC Mitra secara *invite-only* via tombol toolbar `+ Tambah Mitra` (Nama Mitra, Nama PIC, Email PIC).
  3. **Validasi SuReKom**: Memverifikasi antrean permohonan Surat Rekomendasi (SuReKom) mahasiswa berbasis validasi syarat akademik otomatis dari database akademik.
  4. **Final Approval Pendaftar**: Menyetujui pendaftar yang telah dinyatakan lolos rekomendasi awal oleh mitra sebelum resmi menjadi peserta aktif.
  5. **Penugasan Dospem (DPL)**: Mengalokasikan Dosen Pembimbing Lapangan resmi (data ditarik langsung dari database UDI) ke mahasiswa yang diterima di mitra.
  6. **Persetujuan & Penguncian Konversi SKS**: Memeriksa usulan draf mata kuliah konversi mahasiswa terhadap Capaian Pembelajaran Lulusan (CPL), menyetujui, dan mengunci beban konversi (maksimal 20 SKS per semester).
  7. **Visibilitas Portal**: Mengatur toggle visibilitas menu MBKM pada portal utama `apps.html`.
  8. **Evaluasi Akhir & Luaran**: Mengawasi kepatuhan logbook makro, mengelola jadwal sidang evaluasi, dan memvalidasi luaran wajib (Publikasi/Sertifikat) sebelum disinkronkan ke KHS.

### 2.2 Mahasiswa (Pelamar & Peserta Aktif)
- **Karakteristik Akun**: Menggunakan akun Single Sign-On (SSO) terintegrasi basis data EWS (telah mencakup ±50.000 akun mahasiswa aktif).
- **Kewenangan & Tanggung Jawab**:
  1. **Eksplorasi Katalog**: Menjelajahi katalog program resmi mitra dengan filter kategori 3 skema baku (Asistensi, Proyek, Riset/Publikasi).
  2. **Pendaftaran 3-Tahap Mandatori**: Mengisi formulir pendaftaran terpadu (Validasi Syarat Akademik EWS ➔ Input Tautan Google Drive Portofolio ➔ Kesepakatan Hak & Kewajiban + Draf Konversi SKS + Permohonan SuReKom).
  3. **Aturan Satu Pendaftaran Aktif (*Single-Application Active*)**: Hanya dapat memiliki 1 permohonan aktif pada satu periode semester (analog dengan aturan pemilihan dosen TA/Skripsi).
  4. **Pelacakan Status Transparan**: Memantau 5 fase seleksi (*Terkirim ➔ Review SuReKom Koordinator ➔ Seleksi Internal Mitra ➔ Rekomendasi Mitra Terkirim ➔ Final Approval Koordinator*).
  5. **Transisi Dashboard Dinamis**:
     - *Saat Mendaftar*: Tampilan berfokus pada katalog, form pendaftaran 3 tahap, dan pelacakan status.
     - *Setelah Diterima*: Form pendaftaran **dihilangkan otomatis**, tampilan berganti penuh ke modul operasional kegiatan (Tautan WhatsApp Group resmi mitra, profil DPL UDI, jurnal logbook mingguan, tabel konversi SKS terkunci, pendaftaran sidang, dan unggah dokumen luaran wajib).

### 2.3 Contributor Mitra (Operator Industri & Lab Riset)
- **Karakteristik Akun**: Entitas akun pengguna mandiri (*bukan akun dosen biasa*), dibuat secara *invite-only* oleh Koordinator MBKM / Admin FIK (misal: PIC Bengkel Koding, Matic, Ryuje, IDSS, atau Mitra Industri).
- **Kewenangan & Tanggung Jawab**:
  1. **Kelola Lowongan Program (CMS Mitra)**: Membuat dan menerbitkan program kegiatan (skema Asistensi, Proyek, Riset), kapasitas kuota, durasi kegiatan (1 atau 2 semester), tag keahlian, dan tautan resmi grup koordinasi (WhatsApp/Telegram).
  2. **Konfigurasi Hak & Kewajiban**: Menjabarkan butir-butir kewajiban program secara detail dalam bentuk toggle/checklist yang wajib disetujui mahasiswa.
  3. **Pencatatan Dosen Pembina Mitra**: Mencatat nama-nama kontributor/dosen pembina internal yang membina program tersebut.
  4. **Seleksi Pelamar**: Meninjau berkas pelamar masuk (pratinjau IPK/SKS, jawaban formulir khusus, berkas CV/Portofolio Google Drive), mengelola status seleksi internal (*Menunggu Review, Wawancara, Lolos Internal, Gugur*).
  5. **Pengiriman Rekomendasi**: Mengunci kandidat yang lolos seleksi internal dan mengirimkan rekomendasi resmi ke Koordinator MBKM melalui tombol toolbar **`Kirim Rekomendasi ke Koordinator`**.
  6. **Mentoring & Bimbingan Lapangan**: Mengawasi aktivitas lapangan, memverifikasi jurnal logbook mingguan, memberikan catatan review, serta menginput rubrik nilai evaluasi sidang akhir kegiatan (kinerja industri & laporan).
  7. **Batasan Keamanan Kaku (*Strict Boundary*)**: Mitra **sama sekali TIDAK memiliki akses** ke data kurikulum akademik, riwayat KRS, atau pengelolaan mata kuliah mahasiswa.

---

## 3. Taksonomi 3 Skema Baku Program Mitra

Seluruh program yang ditawarkan mitra diwajibkan masuk ke dalam **3 Skema Baku Terstandarisasi** untuk menyederhanakan klasifikasi dan konversi:

| No | Skema Program Baku | Karakteristik Kegiatan | Contoh Penerapan Mitra | Target Luaran Wajib |
|:---|:---|:---|:---|:---|
| **1** | **Asistensi** | Kegiatan asistensi pengajaran, instruktur pelatihan pemrograman dasar, pengawalan praktikum lab, dan bimbingan teknis mahasiswa junior. | Bengkel Koding (Instruktur Web/Mobile/Daspro), Lab Basis Data. | Sertifikat Pengajar / Instruktur Resmi & Laporan Asistensi. |
| **2** | **Proyek (Project)** | Pengembangan sistem perangkat lunak nyata, implementasi arsitektur microservices, integrasi API, atau proyek komersial/industri langsung. | Joint Project Industri, BTIK Dikbud, Koding Dinosaurus, Studio Matic. | Repositori Kode, Laporan Proyek, & Sertifikat Kompetensi Industri. |
| **3** | **Publikasi / Riset** | Pelaksanaan riset terapan bidang kajian, eksperimen kecerdasan buatan, visual data mining, hingga penulisan naskah artikel ilmiah. | Lab Intelligent Systems (IntSys), Riset IDSS, Ryuje Vision Lab. | Naskah Publikasi Ilmiah (LoA Jurnal/Prosiding ber-DOI) & Laporan Riset. |

*Catatan Durasi:* Program berdurasi panjang (2 semester / 1 tahun) wajib mencantumkan butir kewajiban bertahap yang diverifikasi per semester.

---

## 4. Alur Kerja End-to-End (Workflow MBKM Terpadu)

```text
[1. Koordinator MBKM] ──> Set Jadwal & Periode Pendaftaran (Cut-off SuReKom & Seleksi)
       │
[2. Contributor Mitra] ──> Terbitkan Program (Asistensi / Proyek / Riset) + Checklist Kewajiban
       │
[3. Mahasiswa] ──> Ajukan Pendaftaran Terpadu (Filter 3-Tahap + Permohonan SuReKom)
       │
[4. Koordinator MBKM] ──> Verifikasi Otomatis Syarat Akademik & Terbitkan SuReKom Digital
       │
[5. Contributor Mitra] ──> Seleksi Internal (Review Berkas GDrive) ──> Kirim Rekomendasi Lolos
       │
[6. Koordinator MBKM] ──> Final Approval Rekomendasi ──> Alokasikan DPL UDI ──> Kunci Konversi SKS
       │
[7. Transisi Pelaksanaan] ──> Dashboard Mahasiswa Berganti (Form Tutup ➔ Logbook & WA Aktif)
       │
[8. Bimbingan & Evaluasi] ──> Logbook Mingguan (DPL) ──> Sidang Akhir ──> Validasi Luaran (Publikasi/Sertifikat)
```

### 4.1 Rincian Filter Pendaftaran 3-Tahap (Sisi Mahasiswa)
1. **Tahap 1 - Syarat Akademik (Identitas Diri & Database EWS)**:
   - Sistem melakukan pengecekan instan terhadap basis data akademik:
     - Minimal Semester 5 (atau Semester 6–8 sesuai ketentuan program).
     - Minimal SKS tempuh $\ge$ 80 SKS (atau $\ge$ 100 SKS jika memiliki riwayat cuti).
     - IPK Kumulatif $\ge$ 3.00.
   - *Behavior Sistem:* Jika salah satu parameter tidak terpenuhi, formulir otomatis terkunci (*disabled*) dengan peringatan jelas, mencegah mahasiswa melanjutkan ke tahap berikutnya.
2. **Tahap 2 - Portofolio & Berkas Keterampilan**:
   - Mahasiswa menginput **1 Tautan Google Drive** (dengan izin akses terbuka/view-only) yang memuat:
     - Curiculum Vitae (CV) ATS format PDF.
     - Portofolio karya/proyek terkait format PDF/tautan live.
     - Sertifikat keahlian atau bukti pengalaman pendukung.
3. **Tahap 3 - Kesepakatan Program & Permohonan SuReKom**:
   - **Checklist Kewajiban**: Mahasiswa wajib mengaktifkan toggle/centang persetujuan pada setiap butir hak dan kewajiban program yang ditetapkan mitra.
   - **Draf Usulan Matkul Konversi**: Mahasiswa memilih draf mata kuliah yang ingin dikonversi (maksimal 20 SKS). Mahasiswa dilarang meminta konversi tanpa dasar; draf ini wajib disahkan dan dapat disesuaikan oleh Koordinator MBKM.
   - **Permohonan SuReKom**: Sistem men-generate permohonan Surat Rekomendasi Dekanat secara digital untuk diajukan ke antrean verifikasi Koordinator MBKM.

---

## 5. Spesifikasi Navigasi Antarmuka (Peta Dashboard Peran)

Sesuai dengan standarisasi arsitektur antarmuka dan pemetaan pada [`docs/INDEX.md`](INDEX.md), setiap peran memiliki struktur menu sidebar terstandarisasi yang selaras dengan pola modul eksisting Kerja Praktek (KP) dan Bimbingan Karir (BK):

### 5.1 Dashboard Koordinator MBKM (`admin.html`)
1. **Dashboard**: Ringkasan metrik kuota DPL, antrean SuReKom, pemantauan logbook, dan pintasan aksi cepat.
2. **Pengumuman**: Broadcast informasi resmi MBKM tingkat fakultas/prodi.
3. **Periode Ajaran**: Pengaturan rentang waktu semester, cut-off pendaftaran, seleksi, dan batas nilai.
4. **Mitra**: Direktori mitra dengan tombol toolbar `+ Tambah Mitra` (modal invite-only akun PIC) serta halaman detail bertab (*Tab Program*, *Tab Dosen*, *Tab Mahasiswa*).
5. **Mahasiswa**:
   - *Sub-menu Rekomendasi*: Antrean validasi syarat akademik dan persetujuan penerbitan SuReKom digital.
   - *Sub-menu Pelamar*: Antrean *Final Approval* kandidat rekomendasi dari mitra.
   - *Sub-menu Semua Mahasiswa*: Direktori seluruh mahasiswa aktif di seluruh mitra.
6. **Dosen Pembimbing**:
   - *Sub-menu Data Dosen*: Master data dosen ditarik dari database UDI.
   - *Sub-menu Kuota Dosen*: Monitoring beban maksimal bimbingan dosen per semester.
   - *Sub-menu Update Dospem*: Alokasi/plotting DPL bagi mahasiswa yang diterima di mitra.
7. **Logbook Mahasiswa**: Pemantauan kepatuhan logbook mingguan dan catatan verifikasi DPL se-fakultas.
8. **Konversi SKS**: Antrean penelaahan usulan matkul, verifikasi kesesuaian CPL, dan penguncian SKS resmi (maks 20 SKS).
9. **Sidang**: Penjadwalan sidang evaluasi akhir, penginputan nilai gabungan (mentor mitra + DPL), dan rekap kelulusan.
10. **Sertifikat**: Validasi bukti luaran wajib (LoA/DOI Publikasi Ilmiah atau Sertifikat Kelulusan Mitra).
11. **Log Aktivitas**: Audit trail transaksional riwayat perubahan data pada sistem.

### 5.2 Dashboard Mahasiswa (`mahasiswa.html`)
1. **Dashboard**:
   - *Fase Pendaftar*: Kartu verifikasi syarat akademik EWS, pelacakan SuReKom, hitung mundur pendaftaran, pintasan katalog.
   - *Fase Peserta Aktif*: Tautan resmi WhatsApp Group mitra, kartu profil & kontak DPL UDI, progress bar logbook mingguan, hitung mundur laporan akhir.
2. **Pengumuman**: Broadcast informasi resmi dari Koordinator MBKM dan mitra penempatan.
3. **Pendaftaran MBKM** *(Hanya tampil pada Fase Pendaftar)*:
   - *Sub-menu Katalog Program*: Eksplorasi program 3 skema mitra dengan kartu detail kuota & kewajiban.
   - *Sub-menu Form Pendaftaran*: Antarmuka formulir terpadu Filter 3-Tahap Mandatori.
   - *Sub-menu Status Pengajuan*: Pelacakan transparansi status 5 fase seleksi & tombol unduh PDF SuReKom digital.
4. **Dosen Pembimbing** *(Aktif pada Fase Peserta)*: Informasi profil DPL resmi UDI, kontak koordinasi WhatsApp, dan catatan bimbingan.
5. **Logbook Kegiatan** *(Aktif pada Fase Peserta)*: Formulir input jurnal mingguan, tautan bukti Google Drive, dan pemantauan catatan verifikasi DPL (*Disetujui / Perlu Revisi*).
6. **Konversi SKS** *(Aktif pada Fase Peserta)*: Tabel ekuivalensi mata kuliah resmi yang telah diverifikasi dan dikunci oleh Koordinator MBKM.
7. **Sidang** *(Aktif pada Fase Peserta)*: Pendaftaran evaluasi akhir, unggah draf laporan akhir, jadwal penguji, dan pratinjau rekapitulasi nilai.
8. **Sertifikat** *(Aktif pada Fase Peserta)*: Formulir unggah dokumen luaran wajib (Bukti Publikasi Ilmiah atau Sertifikat Resmi Mitra) untuk syarat penerbitan nilai ke KHS.
9. **Log Aktivitas**: Rekam jejak audit aktivitas personal mahasiswa pada sistem.

### 5.3 Dashboard Contributor Mitra (`contributor.html`)
1. **Dashboard**: Ringkasan metrik lowongan program, total pelamar masuk, mahasiswa bimbingan aktif, dan antrean logbook belum direview.
2. **Pengumuman**: Broadcast informasi resmi mitra untuk mahasiswa binaan via tombol `+ Tambah Pengumuman`.
3. **Kelola Program**: Inventarisasi lowongan mitra (skema Asistensi, Proyek, Riset), kapasitas kuota, dan konfigurasi butir kewajiban via tombol `+ Tambah Program`.
4. **Anggota**:
   - *Sub-menu Dosen*: Direktori dosen pembimbing UDI yang dialokasikan Koordinator di mitra ini (*read-only*).
   - *Sub-menu Mahasiswa*: Direktori mahasiswa bimbingan aktif di mitra ini.
5. **Pendaftar**: Papan seleksi pelamar masuk, review berkas Google Drive, scoring/wawancara, dan tombol toolbar utama **`Kirim Rekomendasi ke Koordinator`**.
6. **Logbook Mahasiswa**: Pemantauan jurnal berkala mahasiswa, drawer pemberian catatan evaluasi, dan aksi approval mingguan (*Disetujui / Perlu Revisi*).
7. **Sidang**: Penilaian sidang evaluasi akhir, pengisian rubrik evaluasi kinerja industri dan laporan akhir, serta rekapitulasi nilai sidang.
8. **Log Aktivitas**: Audit trail kronologis seluruh tindakan operasional yang dilakukan akun mitra.

---

## 6. Pemisahan Fitur Showcase

- **Ketentuan Showcase**: Fitur pameran karya atau showcase proyek hasil karya mahasiswa (misalnya demo proyek IoT, Vision Attendance, Serverless App) **wajib dipisahkan ke menu/halaman pameran publik tersendiri** (seperti pada katalog publik `detail-mbkm.html` atau portal galeri kampus).
- Menu showcase **dilarang dicampuradukkan** dengan menu operasional harian MBKM di dalam subapps dashboard.

---

## 7. Standar Teknis & Kebutuhan Non-Fungsional

1. **Zero-Build Architecture**: Seluruh antarmuka prototipe dibangun menggunakan HTML5, Tailwind CSS CDN v3.4+, dan Lucide Icons CDN tanpa compiler/bundler untuk menjaga kecepatan iterasi dan demonstrasi.
2. **Strict UI Design Contract (`docs/DESIGN.md`)**: Wajib menggunakan palet warna Maritime Blue (`#1063B9`), Dinus Gold (`#F3BC45`), State Neutral Slate, serta sistem typography Inter Font.
3. **Role Switcher & Demo Simulator**: Prototipe wajib mempertahankan banner switcher peran instan (*Koordinator MBKM*, *Mahasiswa*, *Contributor Mitra*) agar alur end-to-end dapat diuji coba dengan lancar di hadapan stakeholder.
4. **Keamanan & Pembatasan Akses**:
   - Mitra tidak boleh memiliki akses HTTP endpoint atau UI kurikulum mata kuliah.
   - Pendaftaran dibatasi ketat 1 pengajuan aktif per mahasiswa per semester.
   - Form pendaftaran mahasiswa terkunci permanen jika syarat akademik database tidak terpenuhi.
