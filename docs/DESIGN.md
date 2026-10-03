# Design System & UI/UX Standards: Fakultas Prototype
**Workspace:** FIK Apps — Fakultas Prototype (`fakultas-prototype`)  
**Tujuan Dokumen:** Acuan desain UI murni (*Strict UI Design Contract*) untuk developer dan AI Coding Agent (Claude, Cursor, Copilot).  
**Teknologi:** HTML5 murni, Tailwind CSS CDN (v3.4+), Lucide Icons CDN, Google Fonts Inter.

---

> ### Notes
> 1. **Dilarang Improvisasi Warna**: Gunakan HANYA token warna resmi: **Maritime Blue** (`primary-50` s/d `primary-950`), **Dinus Gold** (`secondary-50` s/d `secondary-600`), dan **Semantic Status** (`emerald` untuk sukses/lolos, `amber` untuk pending/menunggu, `rose` untuk gagal/ditolak).
> 2. **Dilarang Menggunakan Icon Library Lain**: WAJIB menggunakan **Lucide Icons** dengan tag `<i data-lucide="nama-ikon" class="..."></i>`. Jangan gunakan FontAwesome, Heroicons, atau SVG mentah acak.
> 3. **Dilarang Mengubah Border Radius**:
>    - Tombol, Input Form, Badge: `rounded-lg` (8px) atau `rounded-md` (6px).
>    - Card Konten, Dropzone, Modal, Box: `rounded-xl` (12px) atau `rounded-[12px]`.
>    - Avatar & Tag Kategori: `rounded-full`.
> 4. **Wajib Copy-Paste Komponen Resmi**: Semua komponen UI (Card, Tombol, Table, Stepper, Form, Tabs, Modal) **telah disediakan markup HTML-nya di dokumen ini**. Salin langsung markup tersebut dan ganti konten teks/data sesuai kebutuhan halaman. Jangan merancang ulang dari nol.

---

## DAFTAR ISI
1. [Boilerplate Template HTML5](#1-boilerplate-template-html5)
2. [Tipografi & Hirarki Teks](#2-tipografi--hirarki-teks)
3. [Palet Warna & Design Tokens](#3-palet-warna--design-tokens)
4. [Elevation, Border & Radius](#4-elevation-border--radius)
5. [Layout, Container & Breakpoints](#5-layout-container--breakpoints)
6. [Sistem Tombol (Buttons) & Semua States](#6-sistem-tombol-buttons--semua-states)
7. [Sistem Card & Container](#7-sistem-card--container)
8. [Sistem Badge, Pill & Status Tag](#8-sistem-badge-pill--status-tag)
9. [Komponen Filter Tabs & Segmented Control](#9-komponen-filter-tabs--segmented-control)
10. [Formulir, Input Field & Upload Dropzone](#10-formulir-input-field--upload-dropzone)
11. [Komponen Eligibility Checker (Syarat Akademik)](#11-komponen-eligibility-checker-syarat-akademik)
12. [Komponen Stepper / Timeline Tracker Alur](#12-komponen-stepper--timeline-tracker-alur)
13. [Komponen Tabel Data, Search & Pagination](#13-komponen-tabel-data-search--pagination)
14. [Alert, Notification Banner & Toast](#14-alert-notification-banner--toast)
15. [Navbar Portal & Sub-App Sidebar](#15-navbar-portal--sub-app-sidebar)
16. [Modal Dialog & Confirmation Popup](#16-modal-dialog--confirmation-popup)
17. [Loading Skeletons & Empty State](#17-loading-skeletons--empty-state)
18. [Kamus Ikonografi Lucide Resmi](#18-kamus-ikonografi-lucide-resmi)

---

## 1. Boilerplate Template HTML5

Setiap halaman HTML di `fakultas-prototype` **wajib** menggunakan struktur dasar berikut:

```html
<!DOCTYPE html>
<html lang="id" class="h-full">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kampus Berdampak | Fakultas Ilmu Komputer UDINUS</title>
  
  <!-- Font Google Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
  
  <!-- Tailwind CSS CDN (v3) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          },
          colors: {
            primary: {
              50: '#F1F7FE',
              100: '#E2EEFC',
              200: '#BFDBF8',
              300: '#86BEF3',
              400: '#1E7FD9',
              500: '#1E7FD9',
              600: '#1063B9',
              700: '#114D91',
              800: '#10447C',
              900: '#133A67',
              950: '#0D2544',
            },
            secondary: {
              50: '#FEFAEC',
              100: '#FCEEC9',
              200: '#F8DB8F',
              300: '#F4BD45',
              400: '#F2AB2D',
              500: '#F3BC45',
              600: '#D0670F',
            }
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="font-sans bg-[#FAFAFA] text-gray-900 antialiased min-h-screen flex flex-col selection:bg-primary-100 selection:text-primary-800">

  <!-- ==================== CONTENT ==================== -->

  <!-- Inisialisasi Otomatis Ikon Lucide -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
    });
  </script>
</body>
</html>
```

---

## 2. Tipografi & Hirarki Teks

Font resmi adalah **Inter**. Gunakan kelas Tailwind berikut untuk konsistensi hirarki:

| Level Tipografi | Ukuran & Weight | Kelas Tailwind Wajib | Digunakan Untuk |
|:---|:---|:---|:---|
| **Hero / H1** | 48px Bold | `text-3xl md:text-5xl font-bold tracking-tight text-white` | Headline utama banner atas |
| **Section / H2** | 32px-36px Bold | `text-2xl md:text-3xl font-bold text-gray-900` | Judul seksi halaman (Katalog, Dashboard) |
| **Card Title / H3** | 18px-20px Semibold | `text-lg md:text-xl font-semibold text-gray-900` | Judul kartu program, judul box widget |
| **Sub-Header / H4** | 16px Semibold | `text-base font-semibold text-gray-800` | Judul bagian form, judul tabel |
| **Body Regular** | 14px-16px Regular | `text-sm md:text-base text-gray-600 leading-relaxed` | Paragraf penjelasan, deskripsi program |
| **Body Small** | 13px-14px Medium | `text-xs md:text-sm text-gray-600` | Label form, isi sel tabel, deskripsi singkat |
| **Caption / Helper**| 12px Regular | `text-xs text-gray-500` | Teks bantuan input, timestamp riwayat |
| **Micro Badge** | 10px-11px Semibold | `text-[11px] font-semibold uppercase tracking-wider` | Pill kategori eksternal/internal |

---

## 3. Palet Warna & Design Tokens

### 3.1 Primary Scale — Maritime Blue (Identitas FIK)
- **`primary-600` (`#1063B9`)**: Warna tombol utama, link interaktif, icon aksen.
- **`primary-700` (`#114D91`)**: Warna dasar header navbar, start gradient banner.
- **`primary-50` (`#F1F7FE`)**: Background kartu aktif, hover navigasi samping, latar icon box.
- **`primary-100` (`#E2EEFC`)**: Border halus elemen aktif, badge info primer.

### 3.2 Secondary Scale — Dinus Gold & Yellow
- **`secondary-500` (`#F3BC45`)**: Warna tombol login SSO, badge PMB, tombol aksi sorotan.
- **`secondary-300` (`#F4BD45`)**: Teks menu aktif di navbar header.
- **`secondary-50` (`#FEFAEC`)**: Latar badge emas subtle.

### 3.3 Neutral & Surface Scale (Sesuai Referensi Pencil)
- **`bg-white` (`#FFFFFF`)**: Background kartu, modal, container form, table body.
- **`bg-[#FAFAFA]`**: Background dasar canvas seluruh halaman prototipe.
- **`border-gray-200` (`#E5E7EB` / `#E4E4E7`)**: Border wajib untuk seluruh kartu, container, dan divider.
- **`text-gray-900` (`#111827`)**: Teks judul utama & nama profil.
- **`text-gray-600` (`#4B5563`)**: Teks deskripsi & isi paragraf.
- **`text-gray-400` (`#9CA3AF`)**: Placeholder & icon tidak aktif.

### 3.4 Semantic Status Tokens (MBKM)
- **Accepted / Lolos**: `bg-emerald-50 text-emerald-700 border-emerald-200` (Icon: `check-circle-2`).
- **Pending / Seleksi**: `bg-amber-50 text-amber-800 border-amber-200` (Icon: `clock`).
- **Rejected / Ditolak**: `bg-rose-50 text-rose-700 border-rose-200` (Icon: `x-circle`).
- **Eksternal Mitra**: `bg-blue-50 text-blue-700 border-blue-200`.
- **Internal Lab/Riset**: `bg-purple-50 text-purple-700 border-purple-200`.

---

## 4. Elevation, Border & Radius

| Elemen | Border Radius | Border Style | Shadow Token |
|:---|:---|:---|:---|
| **Card Katalog & Widget** | `rounded-xl` (`12px`) | `border border-gray-200` | `shadow-xs hover:shadow-lg transition-all` |
| **Tombol Standar** | `rounded-lg` (`8px`) | *none* atau `border border-gray-300` | `shadow-xs hover:shadow` |
| **Input & Select Field** | `rounded-lg` (`8px`) | `border border-gray-300 focus:border-[#1063B9]` | *none* (`focus:ring-2 focus:ring-[#1063B9]/15`) |
| **Dropzone Upload File** | `rounded-xl` (`12px`) | `border-2 border-dashed border-gray-300` | *none* |
| **Badge / Pill** | `rounded-full` | `border border-*` | *none* |
| **Modal Dialog** | `rounded-2xl` (`16px`)| `border border-gray-200` | `shadow-xl` |

---

## 5. Layout, Container & Breakpoints

- **Container Halaman Publik**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (1280px).
- **Container Portal Apps**: `max-w-6xl mx-auto px-6 py-12` (1152px).
- **Layout Sub-App Workspace**:
  ```html
  <div class="flex min-h-screen bg-[#FAFAFA]">
    <!-- Sidebar: Lebar tetap 256px -->
    <aside class="w-64 shrink-0 bg-white border-r border-gray-200 min-h-screen flex flex-col">...</aside>
    <!-- Content Area: Fleksibel -->
    <main class="flex-1 min-w-0 p-6 lg:p-8 bg-[#FAFAFA]">...</main>
  </div>
  ```

---

## 6. Sistem Tombol (Buttons) & Semua States

### 6.1 Primary Button (Aksi Utama / Daftar / Submit)
```html
<button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1063B9] hover:bg-[#0E4F96] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1063B9]/30 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none">
  <span>Daftar Program</span>
  <i data-lucide="arrow-right" class="w-4 h-4"></i>
</button>
```

### 6.2 Secondary Gold Button (Aksi Sorotan / Login)
```html
<button type="button" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F3BC45] hover:bg-[#E0A832] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F3BC45]/40 active:scale-[0.98]">
  <i data-lucide="log-in" class="w-4 h-4"></i>
  <span>Login SSO UDINUS</span>
</button>
```

### 6.3 Outline Button (Aksi Sekunder / Kembali / Batalkan)
```html
<button type="button" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 rounded-lg shadow-2xs hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
  <i data-lucide="arrow-left" class="w-4 h-4 text-gray-500"></i>
  <span>Kembali ke Katalog</span>
</button>
```

### 6.4 Table Row Action Button (Lihat / Unduh)
```html
<button type="button" class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold rounded-md border border-primary-200 transition-all">
  <i data-lucide="eye" class="w-3.5 h-3.5"></i>
  <span>Lihat Berkas</span>
</button>
```

### 6.5 Destructive Button (Tolak Pelamar)
```html
<button type="button" class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-2xs transition-all focus:ring-2 focus:ring-red-400/30">
  <i data-lucide="user-x" class="w-4 h-4"></i>
  <span>Tolak Pelamar</span>
</button>
```

### 6.6 Disabled Button (Syarat Terkunci)
```html
<button type="button" disabled class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed select-none border border-gray-200">
  <i data-lucide="lock" class="w-4 h-4 text-gray-400"></i>
  <span>Pendaftaran Terkunci</span>
</button>
```

---

## 7. Sistem Card & Container

### 7.1 Card Katalog Program (`mbkm.html`)
```html
<div class="group relative bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary-300">
  <div>
    <!-- Badges & Quota -->
    <div class="flex items-center justify-between gap-2 mb-3.5">
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Eksternal Mitra
      </span>
      <span class="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
        <i data-lucide="users" class="w-3.5 h-3.5 text-gray-400"></i>
        <span>Sisa: <strong>12</strong> / 20 Mhs</span>
      </span>
    </div>

    <!-- Title & Mitra -->
    <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-1">
      Studi Independen Bersertifikat — Dicoding Asah
    </h3>
    <div class="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
      <i data-lucide="building-2" class="w-3.5 h-3.5 text-gray-400"></i>
      <span>PT. Presentologics (Dicoding Indonesia)</span>
    </div>
    <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
      Pelatihan intensif pengembangan aplikasi multi-platform, machine learning, dan cloud computing terstandarisasi industri.
    </p>
  </div>

  <!-- Footer Syarat & Action -->
  <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
    <div class="flex flex-col">
      <span class="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Syarat Min</span>
      <span class="text-xs font-semibold text-gray-700">Smt 6 • IPK ≥ 3.00</span>
    </div>
    <a href="detail-mbkm.html" class="inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white rounded-lg text-xs font-semibold transition-all duration-200">
      <span>Detail Program</span>
      <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
    </a>
  </div>
</div>
```

### 7.2 Card Portal Pemilihan Aplikasi (`apps.html`)
Diambil persis dari rancangan Pencil:
```html
<div class="group relative bg-white rounded-[12px] border border-[#e5e7eb] p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-[#1063b9]/40 cursor-pointer flex flex-col justify-between">
  <div class="flex flex-col items-center text-center">
    <div class="mb-6 p-4 bg-[#f1f7fe] rounded-[12px] text-[#1063b9] transition-all duration-200 group-hover:scale-110 group-hover:bg-[#e2eefc]">
      <i data-lucide="award" class="w-8 h-8"></i>
    </div>
    <h3 class="text-[20px]/[28px] font-semibold text-[#111827] mb-2">Kampus Berdampak</h3>
    <p class="text-[14px]/[20px] text-[#4b5563] leading-relaxed mb-6 max-w-[220px]">
      Portal magang industri, riset bidang kajian, dan studi independen mahasiswa FIK.
    </p>
  </div>
  <div class="flex justify-center">
    <a href="../(subapps)-mbkm/mahasiswa.html" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1063b9] hover:bg-[#0e4f96] text-white text-[14px]/[20px] font-semibold rounded-[6px] shadow-sm transition-all duration-200 group-hover:shadow">
      <span>Buka Aplikasi</span>
      <i data-lucide="external-link" class="w-4 h-4"></i>
    </a>
  </div>
</div>
```

---

## 8. Sistem Badge, Pill & Status Tag

| Jenis Tag | Tampilan Visual | Markup HTML Wajib |
|:---|:---|:---|
| **Eksternal (Mitra)** | Biru Muda | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"><span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>Eksternal</span>` |
| **Internal (Lab / Riset)** | Ungu Muda | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200"><span class="w-1.5 h-1.5 rounded-full bg-purple-600"></span>Internal</span>` |
| **Status: PENDING** | Kuning / Amber | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200"><i data-lucide="clock" class="w-3 h-3 text-amber-600"></i>Menunggu Seleksi</span>` |
| **Status: ACCEPTED** | Hijau / Emerald | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"><i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i>Diterima</span>` |
| **Status: REJECTED** | Merah / Rose | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200"><i data-lucide="x-circle" class="w-3 h-3 text-rose-600"></i>Tidak Lolos</span>` |
| **Role Contributor** | Indigo | `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">Dosen Pembimbing</span>` |

---

## 9. Komponen Filter Tabs & Segmented Control

```html
<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
  <!-- Segmented Control Tabs -->
  <div class="inline-flex p-1 bg-gray-100/80 rounded-xl border border-gray-200">
    <button type="button" class="px-4 py-2 text-xs font-semibold rounded-lg bg-white text-gray-900 shadow-sm transition-all">
      Semua Program <span class="ml-1 px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded text-[10px]">12</span>
    </button>
    <button type="button" class="px-4 py-2 text-xs font-medium rounded-lg text-gray-600 hover:text-gray-900 transition-all">
      Internal Lab & Riset <span class="ml-1 px-1.5 py-0.2 bg-purple-100 text-purple-700 rounded text-[10px]">5</span>
    </button>
    <button type="button" class="px-4 py-2 text-xs font-medium rounded-lg text-gray-600 hover:text-gray-900 transition-all">
      Eksternal Mitra <span class="ml-1 px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded text-[10px]">7</span>
    </button>
  </div>

  <!-- Search Input Bar -->
  <div class="relative w-full sm:w-72">
    <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
    <input 
      type="text" 
      placeholder="Cari mitra, bidang riset..." 
      class="w-full pl-9 pr-4 py-2 text-xs bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
    />
  </div>
</div>
```

---

## 10. Formulir, Input Field & Upload Dropzone

### 10.1 Input Teks Standar
```html
<div class="space-y-1.5">
  <label for="whatsapp" class="block text-sm font-semibold text-gray-700">
    Nomor WhatsApp Aktif <span class="text-red-500">*</span>
  </label>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
      <i data-lucide="phone" class="w-4 h-4"></i>
    </div>
    <input 
      type="tel" 
      id="whatsapp"
      placeholder="081234567890" 
      class="w-full pl-10 pr-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-[#1063B9] focus:ring-2 focus:ring-[#1063B9]/15 outline-none transition-all duration-200"
    />
  </div>
  <p class="text-xs text-gray-500">Nomor ini digunakan koordinator untuk konfirmasi wawancara.</p>
</div>
```

### 10.2 File Upload Dropzone (Transkrip Nilai & CV)
```html
<div class="space-y-1.5">
  <label class="block text-sm font-semibold text-gray-700">
    Unggah Transkrip Nilai Akademik Terakhir (PDF) <span class="text-red-500">*</span>
  </label>
  <div class="relative border-2 border-dashed border-gray-300 hover:border-primary-400 bg-gray-50/60 hover:bg-primary-50/20 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group">
    <input type="file" accept=".pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="p-3 bg-white rounded-full border border-gray-200 text-primary-600 shadow-2xs group-hover:scale-105 transition-transform">
        <i data-lucide="file-up" class="w-6 h-6"></i>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-700">
          <span class="text-primary-600 font-semibold group-hover:underline">Pilih file PDF</span> atau seret ke kotak ini
        </p>
        <p class="text-xs text-gray-400 mt-0.5">Format dokumen PDF asli dari SIAKAD (Maksimal 2MB)</p>
      </div>
    </div>
  </div>
</div>
```

---

## 11. Komponen Eligibility Checker (Syarat Akademik)

### A. State: Lolos Kualifikasi (Memenuhi Syarat MBKM)
```html
<div class="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 mb-6">
  <div class="flex items-start gap-3.5">
    <div class="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
      <i data-lucide="check-circle-2" class="w-5 h-5"></i>
    </div>
    <div class="flex-1">
      <h4 class="text-sm font-bold text-emerald-900 mb-1">Status Akademik: Memenuhi Syarat Program MBKM</h4>
      <p class="text-xs text-emerald-800 leading-relaxed mb-3">
        Data akademik Anda telah diverifikasi oleh sistem. Anda berhak mendaftar seluruh program Kampus Berdampak semester ini.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-200/60 text-xs">
        <div class="flex items-center gap-2 text-emerald-900 font-medium">
          <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
          <span>Semester Aktif: <strong>Semester 6</strong></span>
        </div>
        <div class="flex items-center gap-2 text-emerald-900 font-medium">
          <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
          <span>IPK Kumulatif: <strong>3.45</strong> (Min. 3.00)</span>
        </div>
        <div class="flex items-center gap-2 text-emerald-900 font-medium">
          <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
          <span>SKS Lulus: <strong>108 SKS</strong> (Min. 100)</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### B. State: Belum Lolos Kualifikasi (Pendaftaran Dikunci)
```html
<div class="rounded-xl border border-rose-200 bg-rose-50/70 p-5 mb-6">
  <div class="flex items-start gap-3.5">
    <div class="p-2 bg-rose-100 text-rose-700 rounded-lg shrink-0">
      <i data-lucide="alert-triangle" class="w-5 h-5"></i>
    </div>
    <div class="flex-1">
      <h4 class="text-sm font-bold text-rose-900 mb-1">Pendaftaran Terkunci: Belum Memenuhi Syarat Minimal</h4>
      <p class="text-xs text-rose-800 leading-relaxed mb-3">
        Berdasarkan regulasi akademik FIK, program MBKM dikhususkan bagi mahasiswa semester 6-8 dengan minimal 100 SKS dan IPK $\ge$ 3.00.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-rose-200/60 text-xs">
        <div class="flex items-center gap-2 text-emerald-800 font-medium">
          <i data-lucide="check" class="w-4 h-4 text-emerald-600 shrink-0"></i>
          <span>Semester Aktif: <strong>Semester 6</strong></span>
        </div>
        <div class="flex items-center gap-2 text-rose-800 font-semibold">
          <i data-lucide="x" class="w-4 h-4 text-rose-600 shrink-0"></i>
          <span>IPK: <strong>2.85</strong> (Kurang dari 3.00)</span>
        </div>
        <div class="flex items-center gap-2 text-rose-800 font-semibold">
          <i data-lucide="x" class="w-4 h-4 text-rose-600 shrink-0"></i>
          <span>SKS: <strong>88 SKS</strong> (Kurang dari 100)</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 12. Komponen Stepper / Timeline Tracker Alur

```html
<div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
  <h4 class="text-sm font-bold text-gray-900 mb-6">Status Alur Pengajuan: Magang KKI PT. Saloka</h4>
  <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
    
    <!-- Step 1: Selesai -->
    <div class="flex items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
      <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
        <i data-lucide="check" class="w-4 h-4"></i>
      </div>
      <div>
        <span class="text-xs font-bold text-gray-900 block">Pendaftaran Terkirim</span>
        <span class="text-[11px] text-gray-500">12 Okt 2026, 09:30</span>
      </div>
    </div>

    <!-- Step 2: Selesai -->
    <div class="flex items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
      <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
        <i data-lucide="check" class="w-4 h-4"></i>
      </div>
      <div>
        <span class="text-xs font-bold text-gray-900 block">Validasi Database</span>
        <span class="text-[11px] text-emerald-600 font-medium">Lolos Kualifikasi</span>
      </div>
    </div>

    <!-- Step 3: Sedang Berjalan -->
    <div class="flex items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2">
      <div class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-primary-100 shrink-0">
        <i data-lucide="clock" class="w-4 h-4"></i>
      </div>
      <div>
        <span class="text-xs font-bold text-primary-700 block">Review Dosen/Mitra</span>
        <span class="text-[11px] text-gray-500">Dalam Proses Seleksi</span>
      </div>
    </div>

    <!-- Step 4: Menunggu -->
    <div class="flex items-center sm:flex-col sm:items-center text-left sm:text-center gap-3 sm:gap-2 opacity-50">
      <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0">
        4
      </div>
      <div>
        <span class="text-xs font-bold text-gray-700 block">Keputusan Akhir</span>
        <span class="text-[11px] text-gray-500">Pengumuman Resmi</span>
      </div>
    </div>
  </div>
</div>
```

---

## 13. Komponen Tabel Data, Search & Pagination

```html
<div class="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          <th class="py-3.5 px-4">Mahasiswa</th>
          <th class="py-3.5 px-4">Program Tujuan</th>
          <th class="py-3.5 px-4">Akademik</th>
          <th class="py-3.5 px-4">Dokumen</th>
          <th class="py-3.5 px-4">Status</th>
          <th class="py-3.5 px-4 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 text-sm">
        <tr class="hover:bg-gray-50/70 transition-colors">
          <td class="py-3.5 px-4">
            <div class="font-semibold text-gray-900">Muhammad Raihan</div>
            <div class="text-xs text-gray-500 font-mono">A11.2023.14920 • TI-S1</div>
          </td>
          <td class="py-3.5 px-4">
            <span class="font-medium text-gray-800">Magang KKI PT. Saloka</span>
            <div class="text-xs text-gray-500">Jalur Mandiri</div>
          </td>
          <td class="py-3.5 px-4 text-xs">
            <div>IPK: <strong>3.72</strong></div>
            <div class="text-gray-500">104 SKS • Smt 6</div>
          </td>
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-1.5">
              <a href="#" class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 text-xs rounded font-medium transition-colors">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-primary-600"></i> Transkrip
              </a>
              <a href="#" class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 text-xs rounded font-medium transition-colors">
                <i data-lucide="file-badge" class="w-3.5 h-3.5 text-amber-600"></i> CV
              </a>
            </div>
          </td>
          <td class="py-3.5 px-4">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Menunggu
            </span>
          </td>
          <td class="py-3.5 px-4 text-right">
            <div class="inline-flex items-center gap-1.5">
              <button class="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors" title="Terima Pelamar">
                <i data-lucide="check" class="w-4 h-4"></i>
              </button>
              <button class="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition-colors" title="Tolak Pelamar">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination Footer -->
  <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
    <span>Menampilkan <strong>1 - 10</strong> dari <strong>45</strong> pendaftar</span>
    <div class="inline-flex items-center gap-1">
      <button class="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40">Sebelumnya</button>
      <button class="px-3 py-1.5 bg-primary-600 text-white rounded-md font-semibold">1</button>
      <button class="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">2</button>
      <button class="px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">3</button>
      <button class="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">Selanjutnya</button>
    </div>
  </div>
</div>
```

---

## 14. Alert, Notification Banner & Toast

### 14.1 Info Box (Batas Waktu Pendaftaran)
```html
<div class="flex items-start gap-3 p-4 rounded-xl border border-blue-200 bg-blue-50/70 text-blue-900 text-sm">
  <i data-lucide="info" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5"></i>
  <div class="leading-relaxed">
    <strong class="font-semibold block mb-0.5">Periode Pendaftaran Semester Ganjil 2026/2027</strong>
    Pendaftaran mandiri dibuka hingga <strong>25 Oktober 2026 pukul 23:59 WIB</strong>.
  </div>
</div>
```

### 14.2 Toast Notification
```html
<div class="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl border border-gray-800">
  <div class="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
    <i data-lucide="check-circle" class="w-4 h-4"></i>
  </div>
  <div class="text-xs">
    <p class="font-semibold">Pendaftaran Berhasil Dikirim</p>
    <p class="text-gray-400">Berkas Anda akan diverifikasi dalam 1-3 hari kerja.</p>
  </div>
  <button class="text-gray-400 hover:text-white ml-2 p-1">
    <i data-lucide="x" class="w-3.5 h-3.5"></i>
  </button>
</div>
```

---

## 15. Navbar Portal & Sub-App Sidebar

### 15.1 Navbar Header Landing Page
```html
<header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#114D91] to-[#1E7FD9] shadow-lg shadow-black/10">
  <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
    <a href="../landingpage.html" class="flex items-center gap-3">
      <img src="https://dinus.ac.id/img/logo-dinus.png" alt="Logo UDINUS" class="h-9 w-auto" />
      <div class="flex flex-col leading-tight font-extrabold uppercase tracking-wider text-white">
        <span class="text-xs">FAKULTAS ILMU KOMPUTER</span>
        <span class="text-[10px] text-primary-200 font-medium">UNIVERSITAS DIAN NUSWANTORO</span>
      </div>
    </a>

    <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
      <a href="../landingpage.html" class="text-white/80 hover:text-white transition-colors">Beranda</a>
      <a href="../profil.html" class="text-white/80 hover:text-white transition-colors">Profil</a>
      <a href="../inovasi.html" class="text-white/80 hover:text-white transition-colors">Inovasi</a>
      <a href="../publikasi.html" class="text-white/80 hover:text-white transition-colors">Publikasi</a>
      
      <!-- MENU BARU: KAMPUS BERDAMPAK -->
      <a href="mbkm.html" class="relative text-[#F3BC45] font-semibold flex items-center gap-1.5 transition-colors group">
        <span>Kampus Berdampak</span>
        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#F3BC45] text-[#114D91] uppercase tracking-wide">
          MBKM
        </span>
      </a>

      <a href="../pengumuman.html" class="text-white/80 hover:text-white transition-colors">Pengumuman</a>
      <a href="../berita.html" class="text-white/80 hover:text-white transition-colors">Berita Kegiatan</a>
    </nav>

    <div class="hidden sm:flex items-center gap-3">
      <a href="https://pmb.dinus.ac.id/" target="_blank" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/80 text-white hover:bg-white hover:text-[#114D91] text-xs font-semibold transition-all">
        <span>Pendaftaran</span>
        <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
      </a>
      <a href="../(roots)-apps/apps.html" class="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F3BC45] hover:bg-[#E0A832] text-white text-xs font-bold shadow transition-all">
        <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
        <span>Portal Apps</span>
      </a>
    </div>
  </div>
</header>
```

### 15.2 Sidebar & Content Layout Standar Sub-App (Acuan: `ta-subapps-koordinator.html`)

Struktur tata letak sub-aplikasi (Mahasiswa, Contributor Dosen, dan Admin Superfakultas) **wajib mengikuti arsitektur dan styling dari `pages/ta-subapps-koordinator.html`**. 

**Prinsip Desain:**
1. **Background Canvas**: Seluruh halaman menggunakan kanvas luar `bg-[#fafafa]` (Zinc-50).
2. **Sidebar Standar (`w-64` / `w-[256px]` shrink-0)**:
   - Berada di sisi kiri dengan background `bg-[#fafafa]`.
   - **Header Sidebar**: Logo institusi UDINUS (`text-[#114d91] font-extrabold text-[12px]`) dan Kartu Identitas Sub-App (`bg-white border border-[#e4e4e7] rounded-lg p-2`).
   - **Navigasi Menu**:
     - *Menu Aktif*: Memiliki garis penanda (*indicator bar*) vertikal `w-1 bg-[#0655a7] rounded-r-md`, teks berwarna `#0655a7 font-medium`.
     - *Menu Tidak Aktif*: Teks berwarna `#3f3f46 font-normal hover:bg-black/5`.
   - **Footer Sidebar**: Kartu profil pengguna (`bg-white border border-[#e4e4e7] rounded-lg p-2`).
3. **Main Content Container**:
   - Container kartu putih `flex-1 bg-white border border-[#e4e4e7] rounded-[12px] p-4 m-4 ml-0`.
   - Bagian atas kartu memuat Header Navigasi (Toggle button & Breadcrumb badge `bg-[#fafafa] border border-[#e4e4e7] rounded-lg`).
   - Garis pembatas horizontal `border-b border-[#e4e4e7]`.
   - Header judul halaman (`h2 text-[20px] font-normal text-[#09090b]` & `p text-[14px] text-[#71717a]`).
   - Area konten utama (*Body Content Slot*).

#### Kode Template Siap Pakai (Boilerplate Sub-App):
> *Rekan pengembang cukup menduplikasi kode berikut, lalu **tinggal mengganti icon dan label navigasi** pada sidebar serta **mengisi konten halaman** pada slot yang tersedia.*

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sub-App Kampus Berdampak - FIK UDINUS</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              DEFAULT: '#0655a7',
              dark: '#114d91',
              light: '#f1f7fe'
            }
          }
        }
      }
    };
  </script>
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-[#fafafa] text-[#09090b] antialiased">
  <div class="flex min-h-screen w-full bg-[#fafafa]">

    <!-- ========================================== -->
    <!-- 1. SIDEBAR (TINGGAL GANTI ICON & LABEL)    -->
    <!-- ========================================== -->
    <aside class="w-64 shrink-0 min-h-screen flex flex-col justify-between p-2 bg-[#fafafa]">
      <div class="flex flex-col gap-2">
        <!-- Logo Universitas Dian Nuswantoro (dapat menggunakan ../../assets/logo.png atau URL CDN) -->
        <div class="flex items-center gap-2 p-2 mb-2">
          <img src="../../assets/logo.png" alt="Logo UDINUS" class="w-9 h-9 object-contain" onerror="this.src='https://dinus.ac.id/img/logo-dinus.png'" />
          <div class="flex flex-col leading-tight">
            <span class="text-[12px] font-extrabold text-[#114d91] tracking-wider uppercase">UNIVERSITAS</span>
            <span class="text-[12px] font-extrabold text-[#114d91] tracking-wider uppercase">DIAN NUSWANTORO</span>
          </div>
        </div>

        <!-- Kartu Identitas Modul / Sub-App Switcher -->
        <div class="w-full h-12 p-2 flex items-center justify-between bg-white border border-[#e4e4e7] rounded-lg shadow-2xs">
          <div class="flex items-center gap-2.5 overflow-hidden">
            <div class="w-8 h-8 rounded bg-[#114d91] text-white flex items-center justify-center shrink-0">
              <i data-lucide="award" class="w-4 h-4"></i>
            </div>
            <div class="flex flex-col leading-tight overflow-hidden">
              <span class="text-[14px] font-semibold text-[#3f3f46] truncate">Kampus Berdampak</span>
              <span class="text-[12px] text-[#71717a] truncate">Modul MBKM Terpadu</span>
            </div>
          </div>
          <i data-lucide="chevrons-up-down" class="w-4 h-4 text-[#71717a] shrink-0"></i>
        </div>

        <!-- Daftar Menu Navigasi Sidebar -->
        <nav class="flex flex-col gap-1 mt-2">
          <!-- Item Menu 1 (Contoh Aktif) -->
          <a href="#" class="relative flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] text-[#0655a7] font-medium bg-transparent hover:bg-black/5 transition-colors">
            <!-- Active Indicator Bar -->
            <span class="absolute left-0 top-2 bottom-2 w-1 bg-[#0655a7] rounded-r-md"></span>
            <i data-lucide="layout-dashboard" class="w-4 h-4 text-[#0655a7] shrink-0"></i>
            <span class="truncate">Dashboard</span>
          </a>

          <!-- Item Menu 2 (Contoh Inaktif: Tinggal ganti icon & label) -->
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] text-[#3f3f46] font-normal hover:bg-black/5 hover:text-[#09090b] transition-colors">
            <i data-lucide="file-text" class="w-4 h-4 text-[#71717a] shrink-0"></i>
            <span class="truncate">Menu Kedua</span>
          </a>

          <!-- Item Menu 3 (Contoh Inaktif: Tinggal ganti icon & label) -->
          <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] text-[#3f3f46] font-normal hover:bg-black/5 hover:text-[#09090b] transition-colors">
            <i data-lucide="clock" class="w-4 h-4 text-[#71717a] shrink-0"></i>
            <span class="truncate">Menu Ketiga</span>
          </a>
        </nav>
      </div>

      <!-- Footer Profil Pengguna Sidebar -->
      <div class="mt-auto pt-2">
        <div class="w-full h-12 p-2 flex items-center justify-between bg-white border border-[#e4e4e7] rounded-lg shadow-2xs">
          <div class="flex items-center gap-2.5 overflow-hidden">
            <div class="w-8 h-8 rounded-full bg-[#f4f4f5] text-[#3f3f46] font-medium text-xs flex items-center justify-center shrink-0">
              UD
            </div>
            <div class="flex flex-col leading-tight overflow-hidden">
              <span class="text-[14px] font-medium text-[#3f3f46] truncate">Nama Pengguna</span>
              <span class="text-[10px] text-[#71717a] font-medium px-1.5 py-0.5 border border-[#e4e4e7] rounded bg-[#fafafa] w-fit truncate">
                Peran Pengguna
              </span>
            </div>
          </div>
          <a href="../(roots)-apps/apps.html" title="Kembali ke Portal Apps" class="text-[#71717a] hover:text-[#09090b] p-1">
            <i data-lucide="log-out" class="w-4 h-4"></i>
          </a>
        </div>
      </div>
    </aside>

    <!-- ========================================== -->
    <!-- 2. MAIN CONTENT (TINGGAL GANTI KONTENNYA)  -->
    <!-- ========================================== -->
    <main class="flex-1 min-h-screen flex flex-col p-4 pl-0">
      <!-- Kartu Canvas Utama Berlatar Putih -->
      <div class="w-full flex-1 flex flex-col p-4 bg-white border border-[#e4e4e7] rounded-[12px] shadow-2xs">
        
        <!-- Header Kartu: Toggle & Breadcrumb Badge -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <button type="button" class="w-7 h-7 flex items-center justify-center rounded-md border border-[#e4e4e7] text-[#09090b] hover:bg-gray-50">
              <i data-lucide="panel-left" class="w-4 h-4"></i>
            </button>
            <div class="w-[1px] h-4 bg-[#e4e4e7]"></div>
            <div class="px-2 py-1 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-[14px] text-[#09090b] font-normal">
              Dashboard
            </div>
          </div>
          <!-- Global Role Switcher Demo (Mahasiswa / Dosen / Admin) -->
          <div class="flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-lg text-xs">
            <span class="px-2 py-0.5 font-medium text-[#71717a]">Demo Role:</span>
            <a href="mahasiswa.html" class="px-2 py-0.5 rounded font-medium hover:bg-white transition-colors">Mahasiswa</a>
            <a href="contributor.html" class="px-2 py-0.5 rounded font-medium hover:bg-white transition-colors">Dosen</a>
            <a href="admin.html" class="px-2 py-0.5 rounded font-medium hover:bg-white transition-colors">Admin</a>
          </div>
        </div>

        <div class="w-full h-[1px] bg-[#e4e4e7] mb-4"></div>

        <!-- Banner Salam / Header Judul Halaman -->
        <div class="mb-6">
          <h2 class="text-[20px] leading-[28px] font-normal text-[#09090b]">
            Judul Halaman
          </h2>
          <p class="text-[14px] leading-[20px] text-[#71717a]">
            Deskripsi atau informasi pendukung mengenai data yang dapat diakses pada halaman ini.
          </p>
        </div>

        <!-- SLOT KONTEN UTAMA (ISI KONTEN HALAMAN DI SINI) -->
        <div class="flex-1 w-full">
          <!-- Contoh Kartu Konten Standar (Style ta-subapps-koordinator.html) -->
          <div class="bg-white border border-[#e4e4e7] rounded-[12px] p-4 shadow-2xs">
            <!-- Konten komponen sub-app diletakkan di sini -->
          </div>
        </div>

      </div>
    </main>

  </div>

  <script>
    // Inisialisasi ikon Lucide
    lucide.createIcons();
  </script>
</body>
</html>
```

---

## 16. Modal Dialog & Confirmation Popup

```html
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
  <div class="bg-white rounded-2xl border border-gray-200 max-w-md w-full p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
    <div class="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
      <h3 class="text-base font-bold text-gray-900 flex items-center gap-2">
        <i data-lucide="check-circle" class="w-5 h-5 text-primary-600"></i>
        <span>Konfirmasi Pendaftaran</span>
      </h3>
      <button class="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
    <p class="text-sm text-gray-600 leading-relaxed mb-6">
      Apakah Anda yakin ingin mengirim pendaftaran untuk program <strong>Magang KKI PT. Saloka</strong>? Pastikan berkas transkrip nilai yang diunggah sudah valid.
    </p>
    <div class="flex items-center justify-end gap-3">
      <button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
        Periksa Kembali
      </button>
      <button type="button" class="px-4 py-2 bg-[#1063B9] hover:bg-[#0E4F96] text-white text-sm font-semibold rounded-lg shadow-sm">
        Ya, Kirim Pendaftaran
      </button>
    </div>
  </div>
</div>
```

---

## 17. Loading Skeletons & Empty State

### 17.1 Shimmer Skeleton (Loading Card)
```html
<div class="animate-pulse bg-white rounded-xl border border-gray-200 p-6 space-y-4">
  <div class="flex justify-between items-center">
    <div class="h-5 w-20 bg-gray-200 rounded-full"></div>
    <div class="h-4 w-24 bg-gray-200 rounded"></div>
  </div>
  <div class="h-6 w-3/4 bg-gray-200 rounded"></div>
  <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
  <div class="space-y-2 py-2">
    <div class="h-3 w-full bg-gray-200 rounded"></div>
    <div class="h-3 w-5/6 bg-gray-200 rounded"></div>
  </div>
  <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
    <div class="h-4 w-28 bg-gray-200 rounded"></div>
    <div class="h-8 w-24 bg-gray-200 rounded-lg"></div>
  </div>
</div>
```

### 17.2 Empty State (Pencarian Katalog Tidak Ditemukan)
```html
<div class="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center">
  <div class="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
    <i data-lucide="search-x" class="w-7 h-7"></i>
  </div>
  <h4 class="text-base font-bold text-gray-900 mb-1">Tidak Ada Program yang Sesuai</h4>
  <p class="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
    Tidak ditemukan penawaran program untuk kategori atau kata kunci yang Anda pilih. Coba atur ulang filter pencarian Anda.
  </p>
  <button class="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50">
    <i data-lucide="rotate-ccw" class="w-4 h-4 text-gray-400"></i>
    <span>Reset Semua Filter</span>
  </button>
</div>
```

---

## 18. Kamus Ikonografi Lucide Resmi

| Konteks / Fitur | Nama Icon Lucide Wajib |
|:---|:---|
| **Portal Card "Kampus Berdampak"** | `award` |
| **Mitra Industri (Eksternal)** | `building-2` atau `briefcase` |
| **Riset / Internal Lab** | `microscope` atau `flask-conical` |
| **Katalog Penawaran** | `compass` atau `layout-grid` |
| **Pendaftar Mahasiswa** | `users` atau `graduation-cap` |
| **Dokumen Transkrip / CV** | `file-text`, `file-up`, `file-badge` |
| **Status: Pending** | `clock` |
| **Status: Diterima** | `check-circle-2` |
| **Status: Ditolak** | `x-circle` |
| **Aksi Direct Assign Dosen** | `user-plus` |
| **Batch Import Admin** | `upload-cloud` |
| **Statistik Fakultas** | `bar-chart-3` |
