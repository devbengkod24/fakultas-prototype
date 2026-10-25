# Panduan Pengembangan Prototipe MBKM (`fakultas-prototype`)

Panduan ini mengatur standar arsitektur, konvensi kode, terminologi, dan tata kelola prototipe frontend Kampus Berdampak (MBKM) Fakultas Ilmu Komputer (FIK) UDINUS.

---

## 1. Standarisasi Istilah & Naming Conventions

### Dosen Pembimbing (Wajib)
- **Gunakan:** **"Dosen Pembimbing"** untuk label formal, judul halaman, header kartu, navigasi utama, dan teks dokumen.
- **Gunakan:** **"Dospem"** hanya untuk konteks ringkas seperti label kolom tabel yang sempit atau badge status.
- **DILARANG MENGGUNAKAN:** **"DPL"** (Dosen Pembimbing Lapangan) di seluruh antarmuka, teks, breadcrumb, dan mock data.
- **Alasan:** Harmonisasi dengan modul Kerja Praktek (KP) dan Tugas Akhir (TA) di ekosistem FIK Apps yang telah baku menggunakan istilah *Dosen Pembimbing / Dospem*. Selain itu, istilah "Lapangan" rancu dengan peran *Mentor Industri / Pembimbing Mitra*.

### Istilah Peran & Persona
- **Koordinator MBKM**: Penanggung jawab akademik fakultas (mengelola periode, kuota, validasi SuReKom, plotting dospem, dan pengesahan konversi SKS).
- **Kontributor / Mitra**: Pihak industri atau laboratorium penyelenggara program MBKM (mengelola CMS lowongan, seleksi pelamar, dan monitoring kehadiran).
- **Dosen Pembimbing (Dospem)**: Dosen akademik fakultas yang membimbing kegiatan, memvalidasi logbook berkala, dan menguji sidang evaluasi.
- **Mahasiswa**: Peserta atau pendaftar program MBKM.

---

## 2. Batas Ukuran Berkas & Modularitas (Ideal Lines)

- **Komponen UI (`.astro`)**: Maksimal **150 – 200 baris**. Jika melebihi batas, wajib didekomposisi ke folder subkomponen atomik.
- **Orkestrator Halaman (`src/pages/*.astro`)**: Maksimal **100 baris**. Halaman bertindak sebagai orkestrator yang mengimpor layout dan seksi-seksi komponen.
- **Modul Skrip / Logika (`src/scripts/**/*.ts`)**: Maksimal **250 – 300 baris** per modul domain.
- **Utilitas Styling**: Selalu gunakan fungsi `cn(...)` dari `src/utils/cn.ts` untuk penggabungan kelas styling Tailwind dinamis dan pencegahan konflik class.
- **Type Safety**: Seluruh logika script baru di dalam `src/` wajib menggunakan **TypeScript (`.ts`)**, bukan JavaScript mentah (`.js`).

---

## 3. Disiplin Refaktorisasi & Zero Improvisation

- **Pure Extraction**: Dilarang mengimprovisasi elemen fiktif (seperti komponen, badge, atau button yang tidak ada dalam spesifikasi/desain).
- **Preservasi Kontrak DOM**: Jangan mengubah atribut `id`, atribut `name`, listener event, atau atribut visual Figma (`data-pencil-name`) yang masih dibutuhkan untuk menjaga stabilitas kontroler dan visual styling.
- **Verifikasi Build**: Setiap selesai melakukan perubahan, jalankan `npm run build` untuk memastikan seluruh rute statis terkompilasi 100% tanpa error.

---

## 4. Aturan Git & Repositori

- **Operasi Git Read-Only secara Default**: Agen AI dilarang keras menjalankan mutasi Git (`commit`, `push`, `merge`, `rebase`, `reset`) tanpa persetujuan eksplisit.
- **Protokol Konfirmasi**: Setiap perintah commit/push wajib dikonfirmasi terlebih dahulu kepada pengguna melalui dialog interaktif sebelum dieksekusi.
