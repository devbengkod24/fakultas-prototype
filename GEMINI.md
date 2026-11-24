# Design System & Coding Standards (Ref: fakultas-fe Tugas Akhir)

Repositori ini (**`fakultas-prototype`**) adalah purwarupa antarmuka untuk ekosistem aplikasi FIK UDINUS.  
**ATURAN MUTLAK:** Seluruh gaya visual (*styling*), tipografi, tata letak, komponen UI, dan hierarki visual **WAJIB 100% SELARAS** dengan modul **Tugas Akhir** pada repositori referensi:  
👉 **`/Users/ditoghifari/development/FIK Apps/fakultas-fe/app/(root)/(subapps)/tugas-akhir/`**

---

## 1. Tipografi & Font Stack

- **Font Family Utama:** **`Inter`** (`Inter, system-ui, -apple-system, sans-serif`).
  - Mengikuti `--font-inter` bawaan `fakultas-fe/app/layout.tsx`.
  - Dimuat langsung via Google Fonts di shell layout:
    ```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
    ```
- **Hierarki Teks:**
  - **Judul Halaman (Page Title):** `text-xl text-[#0f172a] font-normal` (atau `font-semibold text-lg`).
  - **Deskripsi / Subtitle Halaman:** `text-sm text-[#64748b]` / `text-[#71717a]`.
  - **Judul Kartu (Card Title):** `text-sm font-semibold` atau `font-medium text-[#0f172a]` / `text-[#09090b]`.
  - **Subtitle Kartu (Card Meta):** `text-xs text-[#64748b]` / `text-[#71717a]` font-normal.  
    *(DILARANG menggunakan warna aksen primer jenuh atau font tebal pada subtitle biasa).*
  - **Header Tabel:** `text-xs font-semibold text-[#71717a]` uppercase tracking-wider.
  - **Isi Tabel:** Teks utama `text-sm font-medium text-[#09090b]`, teks sekunder `text-xs text-[#71717a]`.

---

## 2. Token Warna Baku (Palette Tokens)

Mengikuti `tailwind.config.ts` dan CSS variables dari `fakultas-fe`:
- **Neutral Dark (Teks & Heading):** `text-[#09090b]` (zinc-950) atau `text-[#0f172a]` (slate-900).
- **Neutral Muted (Subtitle, Keterangan, Ikon Sekunder):** `text-[#71717a]` (zinc-500) atau `text-[#64748b]` (slate-500).
- **Neutral Subtle / Placeholder:** `text-[#a1a1aa]` (zinc-400) atau `text-[#94a3b8]` (slate-400).
- **Borders:** `border-[#e4e4e7]` (zinc-200) atau `border-[#e2e8f0]` (slate-200).
- **Background Utama:** `#f8fafc` (slate-50).
- **Card Background:** `bg-white` (atau `bg-card`).
- **Brand / Primary Accent:**
  - `primary`: `#0655A7` / `#1063B9`
  - Tombol Primer: `bg-[#0655A7] hover:bg-[#0a4682] text-white` atau `bg-[#2563eb] hover:bg-[#1d4ed8] text-white`.
  - Link Aksi: `text-primary text-xs font-medium`.
- **Card Footer Background:** `bg-blue-500/5` dengan border top halus `border-[#f1f5f9]`.
- **Status & Badge Tokens:**
  - **Disetujui / Selesai:** `bg-emerald-50 text-emerald-800 border-emerald-200`
  - **Pending / Perlu Review:** `bg-amber-50 text-amber-800 border-amber-200` (atau `bg-yellow-50 text-yellow-800 border-yellow-200`)
  - **Netral / Kosong:** `bg-slate-50 text-slate-600 border-slate-200`
  - **Ditolak:** `bg-red-50 text-red-700 border-red-200`

---

## 3. Komponen Baku (Sesuai Tugas Akhir `fakultas-fe`)

### A. Menu Cards Utama (Top Grid)
Sesuai `tugas-akhir/_components/dashboard/menu.tsx`:
- Kontainer: `rounded-xl border border-[#e4e4e7] bg-white shadow-none`
- Padding header: `p-4 pb-2`
- Header: Flex horizontal atau vertical rapi dengan judul dan ikon.
- Footer tombol: `rounded-b-xl bg-blue-500/5 px-4 p-2 flex justify-between items-center text-xs text-primary font-medium`
- Teks aksi: `Lihat Selengkapnya` atau `View details` dengan icon `ChevronRight` / `ArrowRight`.

### B. Periode Aktif Card (Border-Left Accent)
Sesuai `tugas-akhir/_components/dashboard/periode.tsx`:
- Kontainer: `overflow-hidden rounded-xl border border-[#e4e4e7] border-l-4 border-l-blue-500 bg-white shadow-none`
- Padding: `p-3`
- Ikon: `flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0`
- Label: `text-sm text-[#71717a]` (`Periode Aktif`)
- Value: `text-lg font-semibold text-[#09090b]` (`Semester Genap 2024/2025`)
- **Larangan:** Jangan menambahkan progress bar rekaan, timer palsu, atau deadline buatan (*anti-slop*).

### C. Tabel Data & Standar Tipografi Baku (Ref: Koordinator Data-Mahasiswa & Tugas Akhir)
Sesuai `src/pages/koordinator/data-mahasiswa.astro` dan `fakultas-fe` Tugas Akhir:
- **Kontainer Tabel:** `rounded-lg border border-[#e4e4e7] bg-white overflow-hidden shadow-none`
- **Header Tabel (`<th>`):** `h-11 px-4 text-xs font-semibold text-[#71717a] bg-[#fafafa] border-b border-[#e4e4e7]`
- **Tinggi Baris (`<td>`):** `h-[68px] px-4` (memberikan ruang vertikal yang pas dan nyaman di mata).
- **Hover Baris:** `hover:bg-[#f4f4f5]/60 transition-colors`
- **Kolom Identitas Mahasiswa (Avatar, Nama, NIM):**
  - Avatar Fallback: `h-9 w-9 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] text-[#0655a7] font-semibold text-xs flex items-center justify-center shrink-0 tracking-wide`
  - Nama Mahasiswa: **`font-semibold text-sm text-[#09090b] truncate`** (WAJIB Title Case, bold bobot 600, dilarang ALL CAPS atau sekadar font-medium tipis).
  - Subteks NIM: **`text-xs text-[#71717a] mt-0.5`**
- **Kolom Kontak (Email & No. HP):**
  - Kontainer: `flex flex-col gap-1 text-xs`
  - Email: `flex items-center gap-1.5 text-[#09090b] font-normal` dengan icon `w-3.5 h-3.5 text-[#71717a]`
  - No. HP: `flex items-center gap-1.5 text-[#71717a]` dengan icon `w-3.5 h-3.5 text-[#71717a]`
- **Kolom Tanggal / Terakhir Bimbingan:**
  - Teks: **`text-sm text-[#09090b]`** (format tanggal Indonesia jelas 14px, bukan abu-abu pudar 12px).
- **Kolom Logbook / Progres:**
  - Format Reguler Bersih: `<span class="text-sm text-[#09090b]">10 Minggu</span>` (selaras rapi dengan kolom tanggal, tidak tebal/bold agar tidak menyaingi nama mahasiswa).
- **Kolom Status / Skema MBKM:**
  - Badge Seragam: `inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-[#0655a7] border border-blue-200` (seragam soft blue khas branding MBKM, dilarang warna-warni pelangi antar-baris).
- **Kolom Tombol Aksi:**
  - Tombol Outline Shadcn: `inline-flex items-center gap-1.5 h-8 px-3 border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] rounded-md text-xs font-medium transition-colors` dengan icon `w-3.5 h-3.5 text-[#71717a]`.

---

## 4. Prinsip Sibling Parity & Anti-Drift

1. **Keselarasan Elemen Bersaudara:** Seluruh kartu dalam satu container grid wajib memiliki tinggi kontainer, padding, ukuran ikon, dan styling kelas tipografi yang 100% simetris.
2. **Surgical Patching:** Modifikasi hanya baris yang terdampak (`edit_file`). Dilarang me-rewrite file dari awal.
3. **Build Integrity:** Setiap agen atau pengembang wajib menjalankan `npm run build` setelah selesai mengubah antarmuka untuk membuktikan tidak ada regresi atau kesalahan sintaks.
