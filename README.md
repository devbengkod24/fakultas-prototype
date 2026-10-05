# 🎓 Sub-App MBKM — Mahasiswa (Kampus Berdampak)

Repositori ini berisi prototipe antarmuka (pure HTML/CSS/JS) untuk sub-aplikasi **Kampus Berdampak** khusus peran **Mahasiswa** di lingkungan Fakultas Ilmu Komputer (FIK) Universitas Dian Nuswantoro.

---

## 📁 Struktur Folder

```
Mahasiswa/
├── assets/
│   └── images/     → Logo, ikon, dan gambar aset
├── docs/
│   ├── DESIGN.md   → Panduan desain & komponen (Bab 15.x)
│   ├── PRD.md      → Product Requirements Document
│   └── pages/      → Halaman referensi HTML boilerplate
│       └── ta-subapps-koordinator.html
├── mbkm-v1/
│   └── (subapps)-mbkm/
│       └── mahasiswa.html  → ← Target halaman dashboard mahasiswa
├── .gitignore
└── README.md
```

---

## 🎨 Tema & Desain

Desain mengikuti secara ketat tema yang ada di `fakultas-fe` (Next.js app):

- **Warna Utama**: `#0655A7` (primary blue) & `#1e7fd9` (light blue)
- **Warna Sekunder**: `#f4bd45` (gold/amber)
- **Font**: Inter (Google Fonts)
- **Radius**: `0.5rem` (rounded-md standar)
- **Sidebar**: Collapsible inset sidebar dengan nav-user di footer
- **Header**: Breadcrumb + SidebarTrigger + Global Role Switcher

---

## 🗂️ Halaman

| File | Deskripsi |
|------|-----------|
| `mbkm-v1/(subapps)-mbkm/mahasiswa.html` | Dashboard utama mahasiswa MBKM |
| `docs/pages/ta-subapps-koordinator.html` | Referensi boilerplate layout sidebar & konten |

---

## 🚀 Cara Menjalankan

Karena ini adalah proyek pure HTML, cukup buka file `.html` langsung di browser:

```bash
# Windows
start mbkm-v1/(subapps)-mbkm/mahasiswa.html
```

Atau gunakan ekstensi **Live Server** di VS Code untuk hot-reload.

---

## 🔗 Referensi Desain

- Ikuti panduan di [`docs/DESIGN.md`](docs/DESIGN.md) — khususnya **Bab 15.2** untuk struktur sidebar & main canvas
- Referensi layout: [`docs/pages/ta-subapps-koordinator.html`](docs/pages/ta-subapps-koordinator.html)
- Referensi PRD: [`docs/PRD.md`](docs/PRD.md)

---

## ⚠️ Aturan Penting

> **JANGAN** memodifikasi file apapun di folder `fakultas-fe`. Folder `Mahasiswa` adalah prototipe terpisah berbasis HTML statis.

---

*FIK Universitas Dian Nuswantoro © 2026*
