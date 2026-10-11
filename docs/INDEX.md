# Master Index & Codebase Line Mapping — Fakultas Prototype

> **Tujuan Dokumen**: Peta indeks granular baris kode (`L...`), ID elemen DOM, fungsi JavaScript, dan alur navigasi di seluruh **17.516 baris** prototipe HTML `fakultas-prototype`.  
> **Panduan untuk AI Agent & Pengembang**: **JANGAN membaca file HTML secara utuh** ke dalam memori/token! Gunakan tabel rentang baris (`L...`) di bawah ini bersama parameter `offset` dan `limit` pada tool pembaca file (`Read`) agar query sangat cepat, hemat token, dan tepat sasaran.

---

## 📊 1. Ringkasan Seluruh Berkas HTML Prototipe

Total baris kode: **17.516 baris** (Zero-Build: HTML5 + Tailwind CSS v3.4 CDN + Lucide Icons).

| No | Path Berkas HTML | Jumlah Baris | Peran / Modul Pengguna | Deskripsi Singkat |
|:---|:---|:---:|:---|:---|
| **1** | [`index.html`](../index.html) | 14 Baris | Publik / Root | Redirect instan otomatis ke landing page utama (`mbkm-v1/landingpage.html`). |
| **2** | [`mbkm-v1/landingpage.html`](../mbkm-v1/landingpage.html) | 3.505 Baris | Publik / Tamu | Beranda institusi FIK, navigasi menu "Kampus Berdampak", dan tombol SSO Portal Apps. |
| **3** | [`mbkm-v1/(roots)/(landing)-mbkm/mbkm.html`](../mbkm-v1/(roots)/(landing)-mbkm/mbkm.html) | 492 Baris | Mahasiswa / Publik | Katalog terbuka program MBKM (Riset Lab, Mitra Industri, Asistensi Mengajar). |
| **4** | [`mbkm-v1/(roots)/(landing)-mbkm/detail-mbkm.html`](../mbkm-v1/(roots)/(landing)-mbkm/detail-mbkm.html) | 819 Baris | Mahasiswa / Publik | Rincian silabus program (Dicoding ASAH), showcase karya zigzag, dan daftar track formasi. |
| **5** | [`mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html`](../mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html) | 1.027 Baris | Mahasiswa | Formulir multi-step pendaftaran publik (Stepper 4 tahap, validasi kelayakan, konversi 20 SKS). |
| **6** | [`mbkm-v1/(roots)/apps/apps.html`](../mbkm-v1/(roots)/apps/apps.html) | 1.544 Baris | Civitas Akademika | Portal Single Sign-On (SSO) aplikasi institusi FIK; Card #8 "Kampus Berdampak". |
| **7** | [`mbkm-v1/(subapps)-mbkm/mahasiswa.html`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html) | 2.447 Baris | **Mahasiswa** | Dashboard operasional mahasiswa, validasi SIADIN, form internal, pelacakan status, dan logbook. |
| **8** | [`mbkm-v1/(subapps)-mbkm/contributor.html`](../mbkm-v1/(subapps)-mbkm/contributor.html) | 2.646 Baris | **Contributor Mitra** / Dosen | Ruang kerja mitra & DPL: seleksi pelamar, CMS lowongan riset, direct assign, dan konversi matkul. |
| **9** | [`mbkm-v1/(subapps)-mbkm/admin.html`](../mbkm-v1/(subapps)-mbkm/admin.html) | 5.022 Baris | **Koordinator MBKM** (Bu Nurul) | Dashboard master fakultas: manajemen program & kategori, validasi SuReKom, plotting DPL, konversi SKS. |
| **10** | [`docs/pages/ta-subapps-koordinator.html`](pages/ta-subapps-koordinator.html) | 1.250 Baris | Referensi Internal | Acuan pola desain Kerja Praktek (KP) & Tugas Akhir (TA) untuk standarisasi MBKM. |

---

## ⚠️ 2. Peringatan Penting untuk AI Agent (*Agent Token Safety*)

1. **Aset Bitmap Inline Raksasa pada Landing Page**:
   - Berkas: [`mbkm-v1/landingpage.html`](../mbkm-v1/landingpage.html) pada **`L2708`**.
   - Berisi blok string Base64 gambar bitmap berukuran **>9 MB**.
   - **Tindakan**: DILARANG membaca baris 2700–2720 secara utuh. Lewati baris ini atau batasi rentang offset!
2. **Utang Teknis Tag `<style>` pada Subapp Mahasiswa**:
   - Berkas: [`mbkm-v1/(subapps)-mbkm/mahasiswa.html`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html) pada **`L15 - L1263`**.
   - Berisi 1.248 baris raw CSS non-Tailwind. Jika hanya ingin memeriksa struktur UI atau logika JavaScript, mulai pembacaan dari **`L1264`** ke bawah.
3. **Logika JavaScript Controller Raksasa pada Subapp Admin**:
   - Berkas: [`mbkm-v1/(subapps)-mbkm/admin.html`](../mbkm-v1/(subapps)-mbkm/admin.html) pada **`L2236 - L5022`**.
   - Berisi 2.786 baris controller interaktif dan data dummy JSON. Gunakan peta sub-fungsi di Bagian 3.8 untuk melompat ke fungsi tertentu.

---

## 🧭 3. Pemetaan Granular Baris Kode per Berkas

### 3.1 [`mbkm-v1/landingpage.html`](../mbkm-v1/landingpage.html) (3.505 Baris)
*Beranda institusi Fakultas Ilmu Komputer UDINUS.*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L1 - L150`** | Header Dokumen & Resource | `<head>`, CDN Tailwind, CDN Lucide | Setup viewport dan font institusi. |
| **`L151 - L2707`** | Konten Beranda Fakultas | `.hero-section`, `.stats-counter` | Beranda umum profil fakultas, prodi, dan riset. |
| **`L2708`** | ⚠️ **Aset Bitmap Base64** | `<img>` inline | **JANGAN DIBACA UTUH** (>9 MB Base64 string). |
| **`L2709 - L3375`** | Section Berita & Pengumuman | `.news-grid`, `.event-card` | Feed berita kampus. |
| **`L3376 - L3405`** | **Navbar Kampus Berdampak** | `.nav-item-mbkm`, `.gold-badge` | Menu navbar ke katalog: `(roots)/(landing)-mbkm/mbkm.html`. |
| **`L3410 - L3430`** | **Tombol SSO Portal Apps** | `#btn-portal-apps` | Tombol CTA kanan atas ke: `(roots)/apps/apps.html`. |
| **`L3431 - L3505`** | Footer Institusi & Script | `<footer>`, `lucide.createIcons()` | Footer dekanat dan inisialisasi icon. |

---

### 3.2 [`mbkm-v1/(roots)/(landing)-mbkm/mbkm.html`](../mbkm-v1/(roots)/(landing)-mbkm/mbkm.html) (492 Baris)
*Katalog publik program Kampus Berdampak.*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L1 - L153`** | Header Dokumen & Resource | `<head>`, CDN Tailwind, Meta | Setup tema Maritime Blue & Dinus Gold. |
| **`L154 - L213`** | Top Navbar & Breadcrumb | `#top-navbar`, `#logo-dinus` | Navigasi kembali dan tombol pintas ke `../apps/apps.html`. |
| **`L214 - L228`** | Hero Banner Katalog | `.hero-banner-mbkm` | Judul: *"Katalog Program Kampus Berdampak 2026/2027"*. |
| **`L230 - L248`** | Filter Kategori & Search Bar | `#search-program`, `.filter-tab` | Search realtime dan filter `[Semua]`, `[Riset]`, `[Mitra]`. |
| **`L249 - L325`** | **Grid Kartu Lowongan Program** | `.program-card-grid` | 7 Program: IntSys (`L264`), IDSS (`L282`), Bengkod (`L292`), PPKOrmawa (`L299`), Dicoding (`L306` ➔ tautan `detail-mbkm.html`), Vinix (`L312`), BTIK (`L318`). |
| **`L326 - L396`** | Kontrol Paginasi | `.pagination-wrapper` | Navigasi halaman katalog lowongan. |
| **`L397 - L492`** | Footer & Inisialisasi Script | `<footer>`, `lucide.createIcons()` | Kontak dekanat dan inisialisasi Lucide. |

---

### 3.3 [`mbkm-v1/(roots)/(landing)-mbkm/detail-mbkm.html`](../mbkm-v1/(roots)/(landing)-mbkm/detail-mbkm.html) (819 Baris)
*Halaman detail program, silabus, showcase karya mahasiswa, dan daftar formasi kuota.*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L41 - L100`** | Header & Breadcrumb | `#detail-breadcrumb` | Navigasi `Beranda > Kampus Berdampak > Dicoding ASAH`. *(Catatan L41: typo `src="../../assets/logo.png'"`)*. |
| **`L101 - L230`** | Hero Banner & Profil Koordinator | `.program-header-box` | Badge 20 SKS (`L139`), judul program Dicoding ASAH 2026, dan foto transparan Koordinator MBKM (`L195-L225`). |
| **`L231 - L450`** | **Section Showcase Capstone Project** | `.showcase-section` | Pola zigzag karya peserta batch sebelumnya: Project 1 Smart Energy (`L260-L324`), Project 2 Vision Attendance (`L325-L384`), Project 3 Serverless Microservices (`L385-L447`). |
| **`L451 - L693`** | **Daftar Formasi Jalur & Kuota** | `.track-cards-wrapper` | Alert syarat akademik (`L482-L492`), Track 1 AI/ML (`L497`), Track 2 Cloud Backend (`L559`), Tombol CTA pendaftaran `<a href="pendaftaran-mahasiswa.html">` (`L613`), Track 3 Mobile App (`L622`). |
| **`L694 - L709`** | Sticky Bottom Bar | `.sticky-bottom-cta` | Tombol daftar mengambang di layar bawah. |
| **`L710 - L819`** | Footer & Skrip | `<footer>`, `lucide.createIcons()` | Penutup halaman dan icon initialization. |

---

### 3.4 [`mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html`](../mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html) (1.027 Baris)
*Formulir pendaftaran multi-step terpadu (Stepper 4 tahap, validasi kelayakan, pemilihan konversi matkul).*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L121 - L175`** | **Stepper Bar Navigasi 4-Tahap** | `#step-tab-1` s/d `#step-tab-4`, `#step-circle-1` s/d `#step-circle-4` | Indikator progres tahapan pendaftaran. |
| **`L181 - L320`** | **Step 1: Identitas & Akademik** | `#step-content-1`, `.academic-summary-box` | Rekap data SIADIN otomatis (IPK 3.68, SKS 112) dan input form kontak identitas mahasiswa. |
| **`L321 - L440`** | **Step 2: Unggah Dokumen Syarat** | `#step-content-2`, `#file-transkrip`, `#file-cv`, `#file-ortu` | Upload berkas Transkrip Nilai, CV ATS, dan Surat Izin Orang Tua dengan pratinjau realtime. |
| **`L441 - L580`** | **Step 3: Konversi 20 SKS Matkul** | `#step-content-3`, `.matkul-checkbox`, `#sks-counter` | Pilihan checkbox mata kuliah ekuivalensi, counter SKS otomatis (`XX / 20 SKS`), alert kuota SKS. |
| **`L581 - L740`** | **Step 4: Pakta Integritas & Kirim** | `#step-content-4`, `#agree-check`, `#btn-submit` | Persetujuan butir integritas dan tombol final submit. |
| **`L745 - L830`** | **Success Screen & Tracking** | `#success-screen` | Layar sukses submit dan pelacak 4 status pasca-pengajuan. |
| **`L921 - L1025`** | **Logika JavaScript Form Controller** | `goToStep()`, `handleFileSelected()`, `updateSksCount()`, `handleFormSubmit()` | Navigasi step tab, perhitungan total SKS, validasi berkas, dan penanganan submit form. |

---

### 3.5 [`mbkm-v1/(roots)/apps/apps.html`](../mbkm-v1/(roots)/apps/apps.html) (1.544 Baris)
*Portal launcher Single Sign-On (SSO) institusi FIK UDINUS.*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L1 - L120`** | Header, Topbar, & Profile Widget | `#search-app-input`, `.user-profile-widget` | Pencarian aplikasi dan identitas login civitas. |
| **`L121 - L1390`** | Grid Modul Aplikasi Eksisting | `.app-card-grid` | Kartu modul SIAKAD, EWS, Tugas Akhir, Kerja Praktek, Bebas Lab, Yudisium, dll. |
| **`L1391 - L1480`** | **Card #8: Modul Kampus Berdampak** | `.app-card-mbkm` | Card pintu masuk MBKM: tombol `<a href="../../(subapps)-mbkm/mahasiswa.html">` *"Buka Aplikasi"*. |
| **`L1481 - L1544`** | Footer & Script | `<footer>`, `lucide.createIcons()` | Penutup portal SSO. |

---

### 3.6 [`mbkm-v1/(subapps)-mbkm/mahasiswa.html`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html) (2.447 Baris)
*Dashboard layanan mandiri mahasiswa MBKM.*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L15 - L1263`** | ⚠️ **Tag `<style>` Raw Custom CSS** | `.subapp-layout`, `.app-sidebar`, dll. | 1.248 baris CSS kustom non-Tailwind. Lewati saat menelusuri UI. |
| **`L1275 - L1387`** | Sidebar Navigasi & Profil Mhs | `#menu-dashboard`, `#menu-validasi`, `#menu-pendaftaran`, `#menu-status` | Menu navigasi internal dan profil mock: **Ahmad Rizky Pratama (A11.2022.14253)**. |
| **`L1388 - L1420`** | Topbar & Global Role Switcher | `.role-switcher-banner` | Switcher peran prototipe: `[Mahasiswa]`, `[Contributor]`, `[Admin]`. |
| **`L1466 - L1521`** | **Widget Validasi SIADIN** | `#val-ipk-box`, `#val-sks-box`, `#val-status-box` | Indikator kelayakan akademik otomatis (IPK 3.45 / SKS 108). |
| **`L1645 - L1850`** | **Formulir Pendaftaran Internal** | `#form-pendaftaran-mbkm`, `#reg-program`, `#file-transkrip`, `#file-cv` | Form pendaftaran jalur mandiri di dalam dashboard. |
| **`L1851 - L2050`** | **Modul Pelacakan Status Pengajuan** | `#card-status-pending`, `#card-status-accepted`, `#card-status-rejected`, `#feedback-box` | Tampilan status dinamis 3 state: Menunggu, Diterima, Ditolak dengan alasan resmi. |
| **`L2051 - L2444`** | **JavaScript State Simulator** | `switchTab()`, `updateUI()`, `updateTrackingUI()`, `setEligibility()`, `setTrackingStatus()`, `handleFormSubmit()` | Logika perpindahan tab, render status pelacakan, dan simulator pengajuan pendaftaran. |

---

### 3.7 [`mbkm-v1/(subapps)-mbkm/contributor.html`](../mbkm-v1/(subapps)-mbkm/contributor.html) (2.646 Baris)
*Dashboard Contributor Mitra & Dosen Pembimbing Lapangan (DPL).*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L77 - L191`** | Sidebar Navigasi Sub-App | `#nav-dash`, `#nav-program`, `#nav-form`, `#nav-group`, `#nav-seleksi` | Navigasi mitra/dosen dan profil: **Dr. Ricardus Anggi, M.Kom.** |
| **`L195 - L225`** | Topbar & Role Switcher | `.role-switcher-wrapper` | Switcher peran: `[Mahasiswa]`, `[Contributor]`, `[Admin]`. |
| **`L226 - L300`** | Ringkasan Metrik KPI Mitra | `#kpi-total-pelamar`, `#kpi-kuota-terisi`, `#kpi-proyek-aktif` | Counter pelamar masuk (24), kuota terisi (8/15), dan proposal riset aktif (3). |
| **`L301 - L950`** | **Tabel Seleksi Pelamar Mahasiswa** | `#tablePelamarBody`, `#filterStatusPelamar`, `#modalAksiSeleksi`, `#modalPreviewDokumen` | Seleksi pelamar masuk, review CV PDF via iframe, tombol terima/tolak pelamar. |
| **`L960 - L1260`** | **CMS Lowongan Riset / Proyek Lab** | `#tracksListContainer`, `#btnOpenTrackModal`, `#trackModal`, `#trackForm` | Tambah/kelola formasi program riset, kuota, durasi, dan kualifikasi keahlian. |
| **`L1264 - L1550`** | **Modal Direct Assign Mahasiswa TA** | `#modalDirectAssign`, `#formDirectAssign`, `#inputAssignNim`, `#selectAssignTrack` | Form penetapan mahasiswa bimbingan langsung tanpa melalui jalur seleksi publik. |
| **`L2150 - L2400`** | **CMS Konfigurasi Matkul Konversi** | `#matkulModal`, `#matkulForm`, `#inputMatkulCode`, `#inputMatkulSks` | Pengaturan draf mata kuliah ekuivalensi yang dapat diklaim mahasiswa bimbingan. |
| **`L2401 - L2646`** | **JavaScript Handlers & Interaksi** | `saveTrackModal()`, `toggleTrackStatus()`, `saveFormConfig()`, `openMatkulModal()`, `filterPelamarTable()`, `handleSeleksiAction()` | Penanganan form track, toggle status buka/tutup lowongan, filter pelamar, dan aksi seleksi. |

---

### 3.8 [`mbkm-v1/(subapps)-mbkm/admin.html`](../mbkm-v1/(subapps)-mbkm/admin.html) (5.022 Baris)
*Dashboard master fakultas — Koordinator MBKM (Bu Nurul).*

| Rentang Baris | Elemen / Bagian UI | ID DOM / Class Kunci | Keterangan & Tujuan |
|:---|:---|:---|:---|
| **`L102 - L274`** | Sidebar Navigasi Master Koordinator | `#nav-dashboard`, `#nav-program`, `#nav-koordinator`, `#nav-surekom`, `#nav-logbook`, `#nav-laporan` | Navigasi admin master dan profil: **Nurul Anisa Sri Winarsih, S.Kom, M.Cs**. |
| **`L278 - L315`** | Topbar & Role Switcher | `#breadcrumb-text`, `#breadcrumb-badge` | Switcher peran: `[Mahasiswa]`, `[Contributor]`, `[Admin]`. |
| **`L316 - L715`** | **Section Dashboard Makro Fakultas** | `#section-dashboard`, `.metric-card-grid` | Metrik kuota nasional, mahasiswa aktif se-fakultas, rasio SuReKom, distribusi per prodi. |
| **`L716 - L1160`** | **Section Manajemen Program MBKM** | `#section-program`, `#subview-program-list`, `#subview-program-edit`, `#subview-program-kategori` | CRUD master program, filter prodi/kategori, pagination tabel, dan manajemen kategori. |
| **`L1162 - L1350`** | **Section Validasi SuReKom Dekanat** | `#section-surekom`, `.surekom-queue-table` | Antrean verifikasi permohonan surat rekomendasi mahasiswa untuk program eksternal. |
| **`L1354 - L1680`** | **Section Hak Akses Dosen / Koordinator** | `#section-koordinator`, `#koordinator-table-tbody` | Daftar dosen pembimbing/koordinator dan pemberian izin akses modul MBKM. |
| **`L1685 - L2050`** | **Section Data Logbook & Nilai Konversi** | `#section-logbook`, `#section-laporan` | Rekap logbook mingguan dan sinkronisasi nilai akhir kegiatan ke kurikulum. |
| **`L2080 - L2235`** | **Modal Dialog Alokasi Program (1:N)** | `#modal-assign-program`, `#modal-assign-program-list` | Modal alokasi multiple program ke satu akun dosen koordinator. |
| **`L2236 - L5022`** | **JavaScript Controller Master (2.786 Baris)** | `switchTab()`, `renderProgramTable()`, `renderWorkflowStages()`, `openAssignProgramModal()`, `handleSaveProgramAssignment()`, dll. | State machine controller master, pagination, modal logic, event listener, dan mock data array. |

---

## 🗺️ 4. Matriks Pemetaan 3 Peran Utama vs File Kode

| Fitur & Tanggung Jawab | Koordinator MBKM | Mahasiswa | Contributor Mitra | Lokasi Baris Kode Implementasi |
|:---|:---:|:---:|:---:|:---|
| **Eksplorasi Katalog Program** | Review | **Akses Utama** | - | [`mbkm.html:249-325`](../mbkm-v1/(roots)/(landing)-mbkm/mbkm.html#L249), [`detail-mbkm.html:451-693`](../mbkm-v1/(roots)/(landing)-mbkm/detail-mbkm.html#L451) |
| **Pendaftaran & Syarat EWS** | - | **Input Mandiri** | - | [`pendaftaran-mahasiswa.html:121-740`](../mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html#L121), [`mahasiswa.html:1645-1850`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html#L1645) |
| **Permohonan SuReKom** | **Verifikasi & Terbitkan** | Ajukan Permohonan | - | [`admin.html:1162-1350`](../mbkm-v1/(subapps)-mbkm/admin.html#L1162), [`mahasiswa.html:1851-2050`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html#L1851) |
| **Kelola Lowongan (CMS)** | - | - | **Buat & Sunting** | [`contributor.html:960-1260`](../mbkm-v1/(subapps)-mbkm/contributor.html#L960) |
| **Seleksi & Rekomendasi Pelamar** | **Final Approval** | Terima Keputusan | **Scoring & Rekomendasi** | [`contributor.html:301-950`](../mbkm-v1/(subapps)-mbkm/contributor.html#L301), [`admin.html:716-1160`](../mbkm-v1/(subapps)-mbkm/admin.html#L716) |
| **Penugasan DPL (Dospem UDI)** | **Alokasi Terpusat** | Terima Pembimbing | Read-Only | [`admin.html:1354-1680`](../mbkm-v1/(subapps)-mbkm/admin.html#L1354), [`contributor.html:1264-1550`](../mbkm-v1/(subapps)-mbkm/contributor.html#L1264) |
| **Verifikasi Logbook Berkala** | Monitoring Makro | **Isi Logbook Mingguan** | **ACC / Review Mingguan** | [`mahasiswa.html:1851-2050`](../mbkm-v1/(subapps)-mbkm/mahasiswa.html#L1851), [`contributor.html:301-950`](../mbkm-v1/(subapps)-mbkm/contributor.html#L301), [`admin.html:1685-2050`](../mbkm-v1/(subapps)-mbkm/admin.html#L1685) |
| **Konversi SKS & Mata Kuliah** | **Sahkan & Kunci SKS** | Ajukan Draf (Maks 20 SKS) | Dilarang Akses | [`admin.html:1685-2050`](../mbkm-v1/(subapps)-mbkm/admin.html#L1685), [`pendaftaran-mahasiswa.html:441-580`](../mbkm-v1/(roots)/(landing)-mbkm/pendaftaran-mahasiswa.html#L441) |
| **Luaran (Publikasi/Sertifikat)** | **Validasi KHS** | **Unggah Bukti Luaran** | Input Nilai Sidang | [`admin.html:1685-2050`](../mbkm-v1/(subapps)-mbkm/admin.html#L1685), [`contributor.html:2401-2646`](../mbkm-v1/(subapps)-mbkm/contributor.html#L2401) |

---

## 🔗 5. Referensi Silang Dokumentasi Terkait

- **Spesifikasi Kebutuhan & Regulasi Produk**: [`docs/PRD.md`](PRD.md) (Versi 2.0.0 — Regulasi MBKM Terpadu).
- **Kontrak Desain & Token Visual**: [`docs/DESIGN.md`](DESIGN.md) (Standar Warna Maritime Blue `#1063B9`, Dinus Gold `#F3BC45`, & Typography Inter).
- **Benchmark Desain Navigasi Eksisting**: [`docs/pages/ta-subapps-koordinator.html`](pages/ta-subapps-koordinator.html) (Pola Sidebar KP/TA).
