# Arsitektur & Struktur Folder MBKM v2

Dokumentasi arsitektur multi-page modular untuk prototipe MBKM v2 Fakultas Ilmu Komputer UDINUS. Struktur ini menyelaraskan tata letak berkas dengan standar rute Next.js App Router (`(roots)` dan `(subapps)`), menerapkan pola **App Shell + Dynamic Fragment** (`_index.html`), serta memisahkan tiap menu sidebar ke dalam berkas HTML tersendiri secara modular.

---

## 1. Struktur Direktori Lengkap

```text
mbkm-v2/
├── README.md                           # Dokumentasi rancangan arsitektur v2
├── landingpage.html                    # Beranda utama institusi FIK & navbar MBKM
│
├── (roots)/                            # Rute publik & portal institusi
│   ├── (landing)-mbkm/
│   │   ├── __index.html                # Index katalog program MBKM (teratas)
│   │   ├── mbkm.html                   # Katalog terbuka program MBKM publik
│   │   ├── detail-mbkm.html            # Detail silabus program & tautan pendaftaran
│   │   └── pendaftaran-mahasiswa.html  # Formulir pendaftaran publik terpadu
│   └── apps/
│       ├── __index.html                # Launcher Single Sign-On (SSO) Portal Apps (teratas)
│       └── apps.html                   # Halaman portal modul institusi FIK
│
└── (subapps)-mbkm/                     # Dashboard modular 3 peran utama
    ├── mahasiswa/                      # Sub-App Mahasiswa Pelamar & Aktif
    │   ├── __index.html                # Master App Shell (teratas di explorer)
    │   ├── _mock-data.js               # Data dummy profil & status mahasiswa
    │   ├── _controller.js              # Logika form submit & evaluasi SIADIN
    │   ├── dashboard.html              # Fragmen Dashboard & validasi syarat DB
    │   ├── pendaftaran.html            # Fragmen Formulir Pendaftaran Mandiri & Upload PDF
    │   └── status.html                 # Fragmen Pelacakan Status & Linimasa Verifikasi
    │
    ├── contributor/                    # Sub-App Contributor Mitra & Dosen Pembimbing
    │   ├── __index.html                # Master App Shell (teratas di explorer)
    │   ├── _mock-data.js               # Data dummy showcase, formasi & matkul
    │   ├── _controller.js              # Logika seleksi & CMS formasi riset
    │   ├── dashboard.html              # Fragmen Dashboard operasional & quick stats
    │   ├── program.html                # Fragmen CMS Kelola Program Binaan & Lowongan
    │   ├── form.html                   # Fragmen Builder Formulir Pendaftaran
    │   ├── seleksi.html                # Fragmen Meja Seleksi Pelamar Mahasiswa
    │   ├── mahasiswa.html              # Fragmen Data Mahasiswa Binaan
    │   └── dosen.html                  # Fragmen Data Dosen Pembina
    │
    └── admin/                          # Sub-App Master Koordinator MBKM & Admin
        ├── __index.html                # Master App Shell (teratas di explorer)
        ├── _mock-data.js               # Kumpulan 18 variabel data dummy array
        ├── _controller.js              # Logika controller interaktif, Alpine store & router
        ├── dashboard.html              # Fragmen Dashboard Koordinator (Ringkasan eksekutif)
        ├── program.html                # Fragmen Daftar Program & Manajemen Kategori
        ├── koordinator.html            # Fragmen Penugasan Dosen Koordinator
        ├── surekom.html                # Fragmen Meja Validasi Surat Rekomendasi & SPTJM
        ├── logbook.html                # Fragmen Monitoring LogBook Harian & Mingguan
        └── laporan.html                # Fragmen Review & Validasi Laporan Akhir
```

---

## 2. Prinsip Arsitektur Modular (Opsi 1)

1. **DRY (Don't Repeat Yourself)**:
   - Sidebar, header atas, token CSS, dan dependensi CDN (Tailwind, Lucide) hanya berada di satu berkas induk: `_index.html`.
   - Modifikasi menu, foto profil, atau navigasi cukup dilakukan di satu tempat tanpa perlu mengubah berkas menu lainnya.
2. **Kemandirian Berkas Per Menu**:
   - Tiap menu dashboard dipecah ke dalam fragmen HTML terpisah (`dashboard.html`, `pendaftaran.html`, `status.html`, dsb.).
   - Bebas duplikasi tag `<html>`, `<head>`, maupun sidebar.
3. **Dual Compatibility (Web Server & `file://`)**:
   - Saat berjalan di web server / Live Server, `_index.html` memuat berkas fragmen secara dinamis via `fetch()`.
   - Mengandung *embedded fallback* sehingga tetap bisa dibuka langsung dengan cara dobel-klik dari Finder tanpa kendala CORS.
4. **v1 Utuh**:
   - Seluruh berkas di `mbkm-v1/` dipertahankan utuh 100% tanpa modifikasi sebagai referensi baku.
