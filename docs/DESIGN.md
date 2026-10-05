# DESIGN.md — Panduan Desain Sub-App MBKM Mahasiswa

> Dokumen ini adalah panduan desain yang wajib diikuti oleh semua pengembang yang bekerja pada prototipe HTML sub-aplikasi MBKM peran Mahasiswa.

---

## Bab 1 — Design Tokens

### 1.1 Warna

| Token | Nilai | Keterangan |
|-------|-------|------------|
| `--primary` | `#0655A7` | Biru utama (branding FIK/Udinus) |
| `--primary-light` | `#1e7fd9` | Biru terang (hover, aksen) |
| `--primary-subtle` | `#f1f7fe` | Latar aktif menu |
| `--secondary` | `#f4bd45` | Amber/gold (aksen sekunder) |
| `--sidebar-bg` | `#f8f8fb` | Latar sidebar |
| `--border` | `#e5e7eb` | Border standar |
| `--muted-fg` | `#6b7280` | Teks muted/deskripsi |
| `--destructive` | `#dc2626` | Merah (error, warning kritis) |

### 1.2 Tipografi

- **Font Family**: `'Inter', sans-serif` (Google Fonts)
- **Base Size**: `14px` (body)
- **Heading Scale**: `h1→24px`, `h2→20px`, `h3→16px`, `h4→14px bold`
- **Line Height**: `1.5`
- **Letter Spacing**: `0.01em` untuk heading uppercase

### 1.3 Spacing & Radius

- **Radius Standar**: `0.5rem` (8px)
- **Radius Card**: `0.75rem` (12px)
- **Radius Pil/Badge**: `9999px`
- **Padding Card**: `1.25rem` (20px)
- **Gap Grid**: `1rem` (16px)

---

## Bab 2 — Layout & Grid

### 2.1 Root Layout

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (240px fixed left, collapsible)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Header: Logo + AppSwitcher                      │   │
│  │ Content: Navigation menu                        │   │
│  │ Footer: UserCard                                │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  MAIN CANVAS (flex-1, margin-left: sidebar width)      │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Page Header (Breadcrumb + Toggle + Role)        │   │
│  │ Separator                                       │   │
│  │ Page Title + Subtitle                           │   │
│  │ Body Content                                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Responsive Breakpoints

| Breakpoint | Width | Perilaku |
|------------|-------|----------|
| Mobile | `< 768px` | Sidebar overlay/drawer |
| Tablet | `768px – 1024px` | Sidebar collapsed icon-only |
| Desktop | `> 1024px` | Sidebar full expanded |

---

## Bab 3 — Komponen Sidebar

### 3.1 Sidebar Shell

Sidebar menggunakan posisi `fixed left-0` dengan lebar `240px` saat expand dan `60px` saat collapse (icon-only).

- **Background**: `var(--sidebar-bg)` = `#f8f8fb`
- **Border Right**: `1px solid var(--border)`
- **Transition**: `width 0.25s ease`

### 3.2 Sidebar Header

- Logo Udinus + teks nama universitas (sembunyikan saat collapse)
- **AppSwitcher**: Dropdown untuk berpindah sub-app (Global Role Switcher)

### 3.3 Sidebar Navigation Item

**State Normal:**
```css
padding: 12px 16px;
border-radius: 8px;
color: #374151;
display: flex; align-items: center; gap: 8px;
```

**State Active:**
```css
background: #f1f7fe;
color: #0655A7;
/* Left border accent */
::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:4px; background:#0655A7; border-radius:0 4px 4px 0; }
```

**State Hover:**
```css
background: #f3f4f6;
```

### 3.4 Sidebar Footer (User Card)

- Avatar + Nama + Role
- Dropdown: Akun → Profile, Logout

---

## Bab 4 — Komponen Header

### 4.1 Page Header

```html
<header class="page-header">
  <div class="header-left">
    <button class="sidebar-toggle">☰</button>
    <span class="separator-v"></span>
    <nav class="breadcrumb">...</nav>
  </div>
  <div class="header-right">
    <!-- Role Switcher / actions -->
  </div>
</header>
<hr class="header-separator">
<div class="page-title-bar">
  <div>
    <h1 class="page-title">Judul Halaman</h1>
    <p class="page-subtitle">Deskripsi singkat</p>
  </div>
</div>
```

---

## Bab 5 — Komponen Card

```css
.card {
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.card-header { margin-bottom: 12px; }
.card-title { font-size: 14px; font-weight: 600; color: #111827; }
.card-description { font-size: 12px; color: var(--muted-fg); }
```

---

## Bab 6 — Komponen Badge & Status

| Status | Warna BG | Warna Teks |
|--------|----------|------------|
| `accepted` / Diterima | `#dcfce7` | `#166534` |
| `pending` / Menunggu | `#fef9c3` | `#854d0e` |
| `rejected` / Ditolak | `#fee2e2` | `#991b1b` |
| `draft` | `#f3f4f6` | `#374151` |

---

## Bab 7 — Komponen Button

```css
/* Primary */
.btn-primary { background:#0655A7; color:#fff; border-radius:8px; padding:8px 16px; }
.btn-primary:hover { background:#1e7fd9; }

/* Outline */
.btn-outline { border:1px solid var(--border); color:#374151; border-radius:8px; padding:8px 16px; }
.btn-outline:hover { background:#f9fafb; }
```

---

## Bab 8 — Komponen Progress Bar

```css
.progress-track { height:8px; background:#e5e7eb; border-radius:9999px; overflow:hidden; }
.progress-fill  { height:100%; background: linear-gradient(90deg, #0655A7, #1e7fd9); border-radius:9999px; transition: width 0.5s ease; }
```

---

## Bab 9 — Komponen Alert

```css
.alert { padding:12px 16px; border-radius:8px; border-left:4px solid; display:flex; gap:10px; }
.alert-info        { background:#eff6ff; border-color:#3b82f6; color:#1e40af; }
.alert-warning     { background:#fffbeb; border-color:#f59e0b; color:#92400e; }
.alert-destructive { background:#fef2f2; border-color:#ef4444; color:#991b1b; }
.alert-success     { background:#f0fdf4; border-color:#22c55e; color:#166534; }
```

---

## Bab 10 — Komponen Tabel

```css
.data-table { width:100%; border-collapse:collapse; font-size:13px; }
.data-table thead th { background:#f9fafb; padding:10px 14px; text-align:left; color:var(--muted-fg); font-weight:600; border-bottom:1px solid var(--border); }
.data-table tbody td { padding:10px 14px; border-bottom:1px solid #f3f4f6; }
.data-table tbody tr:hover { background:#f9fafb; }
```

---

## Bab 11 — Ikon

Gunakan **Lucide Icons** via CDN:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<!-- Render: <i data-lucide="home" class="icon"></i> -->
<script>lucide.createIcons();</script>
```

---

## Bab 12 — Animasi & Transisi

```css
/* Standar transisi hover */
transition: all 0.2s ease;

/* Sidebar collapse animation */
transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);

/* Collapsible menu */
.collapsible-content { overflow:hidden; max-height:0; transition: max-height 0.3s ease; }
.collapsible-content.open { max-height:500px; }
```

---

## Bab 13 — Global Role Switcher (AppSwitcher)

Komponen di sidebar header yang memungkinkan berpindah antar sub-app:

```
┌─────────────────────────────────────┐
│ [Icon] Kampus Berdampak             │
│        mahasiswa             ▼      │
└─────────────────────────────────────┘
          ↓ dropdown
┌─────────────────────────────────────┐
│ Layanan Aplikasi                    │
│ [📋] Kampus Berdampak               │
│ [📚] Tugas Akhir          (locked)  │
│ [💼] Kerja Praktek        (locked)  │
└─────────────────────────────────────┘
```

---

## Bab 14 — Form & Input

```css
.form-input { 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 8px 12px;
  font-size: 14px;
  transition: border-color 0.2s;
}
.form-input:focus { border-color: #0655A7; outline: none; box-shadow: 0 0 0 3px rgba(6,85,167,0.1); }
```

---

## Bab 15 — Tata Letak Sub-App

### 15.1 Prinsip Umum

Semua sub-app menggunakan pola **sidebar + main canvas** yang identik. Yang berbeda hanya:
1. Item menu sidebar (icon & label)
2. Konten main canvas

### 15.2 Boilerplate Struktur Sub-App (Template Wajib)

Struktur HTML yang **wajib digunakan** untuk semua halaman sub-app:

```
[html body]
  └── .app-layout                  ← root flex container (row)
        ├── .sidebar                ← sidebar kiri (fixed width)
        │     ├── .sidebar-header   ← logo + app-switcher
        │     ├── .sidebar-nav      ← daftar menu navigasi
        │     └── .sidebar-footer   ← user card
        └── .main-wrapper           ← area kanan (flex: 1)
              └── .main-canvas      ← konten utama (rounded-xl border)
                    ├── .page-header         ← breadcrumb + toggle
                    ├── .page-header-sep     ← separator horizontal
                    ├── .page-title-bar      ← judul + subtitle halaman
                    └── .page-body           ← konten spesifik halaman
```

> **CATATAN**: Lihat file referensi `docs/pages/ta-subapps-koordinator.html` untuk implementasi lengkap boilerplate ini. Pengembang cukup copy struktur tersebut, lalu ganti icon/label menu dan isi konten `.page-body`.

### 15.3 CSS Class Wajib

```css
/* Tersedia di assets/css/layout.css */
.app-layout       → display:flex; height:100vh; overflow:hidden
.sidebar          → lebar 240px, scrollable, fixed structure
.main-wrapper     → flex:1; overflow-y:auto; padding: 1rem
.main-canvas      → background:white; border-radius:12px; border:1px solid; padding:1rem
.page-header      → header breadcrumb area
.page-title-bar   → area judul halaman
.page-body        → area konten utama
```

---

## Bab 16 — Aksesibilitas

- Semua elemen interaktif memiliki `aria-label` atau teks yang deskriptif
- Gunakan tag semantik: `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`
- Minimal contrast ratio 4.5:1 untuk teks normal
- Fokus keyboard terlihat jelas (outline saat `:focus-visible`)

---

## Bab 17 — Anti-Pattern (LARANGAN)

❌ Jangan gunakan `!important` secara berlebihan  
❌ Jangan inline style untuk warna/spacing (gunakan CSS variables)  
❌ Jangan hardcode ukuran pixel tanpa rem/CSS-var  
❌ Jangan modifikasi file apapun di folder `fakultas-fe`  
❌ Jangan membuat komponen baru yang melanggar design token di Bab 1  

---

*Dokumen ini adalah living document — update seiring perkembangan prototipe.*
