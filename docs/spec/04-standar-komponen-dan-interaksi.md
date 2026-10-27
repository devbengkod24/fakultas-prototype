# Spesifikasi Teknis: Standar Komponen & Interaksi UI MBKM

**Dokumen:** `docs/spec/04-standar-komponen-dan-interaksi.md`  
**Status:** Disetujui  
**Versi:** 2.0  
**Tanggal:** 2026-10-26  

---

## 1. Komponen Auto-Scroll ke Tombol Daftar (`detail-mbkm.astro`)

### 1.1 Masalah Pengalaman Pengguna (UX Friction)
Halaman detail program MBKM (`src/pages/detail-mbkm.astro`) memiliki konten panjang yang mencakup:
1. Hero Header & Video Showcase
2. Deskripsi & Tombol Pendaftaran Utama (`#tentang-program`)
3. Tab Informasi, Persyaratan, dan Kontributor (`#informasi-program`)
4. Linimasa Seleksi & Pelaksanaan (`#timeline`)
5. Showcase Portofolio Proyek Alumni (`#showcase`)
6. Tanya Jawab Umum (`#faq`)
7. Footer Institusi

Saat calon pendaftar membaca halaman hingga bagian FAQ atau Footer paling bawah, tombol aksi pendaftaran (*Call to Action / CTA*) berada jauh di atas, sehingga pengguna harus melakukan *manual scrolling* yang melelahkan.

### 1.2 Spesifikasi Perilaku & Interaksi
1. **Trigger Visibilitas:**
   * Script mendengarkan event `window.addEventListener('scroll', ...)`.
   * Tombol muncul (*fade-in / slide-in*) ketika posisi scroll pengguna telah melewati batas section `#tentang-program` (misal: `scrollY > 600px`).
   * Tombol disembunyikan (*fade-out*) ketika pengguna kembali berada di area atas.
2. **Posisi & Visual Styling:**
   * Tombol berupa *floating action button* / *sticky pill* di pojok kanan bawah (atau pojok kanan atas sticky header):
     * Ikon: `arrow-up` atau `chevron-up` + teks ringkas `"Daftar Program"`.
     * Styling: Background warna aksen primer (`#0655a7` / `#1E7FD9`), teks putih font semi-bold, rounded-full, bayangan lembut (`shadow-lg`), efek hover elevasi.
3. **Aksi Klik:**
   * Menjalankan fungsi JavaScript:
     ```javascript
     function scrollToDaftar() {
       const target = document.getElementById('tentang-program') || document.querySelector('a[href="/pendaftaran-mahasiswa"]');
       if (target) {
         target.scrollIntoView({ behavior: 'smooth', block: 'center' });
         // Berikan efek highlight/pulse sementara pada tombol pendaftaran
         const btnDaftar = target.querySelector('a[href="/pendaftaran-mahasiswa"]') || target;
         btnDaftar.classList.add('ring-4', 'ring-[#F3BC45]', 'transition-all');
         setTimeout(() => btnDaftar.classList.remove('ring-4', 'ring-[#F3BC45]'), 1500);
       }
     }
     ```

---

## 2. Standarisasi Penomoran Tabel Data (`Numbering Column Convention`)

### 2.1 Masalah Inkonsistensi Saat Ini
Audit antarmuka menemukan beberapa variasi format tabel:
* Beberapa tabel memiliki kolom `#`, yang lain `No`, dan sebagian langsung menampilkan kolom identitas (NIM/Nama) tanpa kolom nomor urut.
* Pada beberapa tabel dengan paginasi, nomor urut me-reset kembali ke angka `1` di setiap pergantian halaman alih-alih menghitung indeks baris global.

### 2.2 Aturan Baku Penomoran Kolom
Seluruh tabel data di modul Mahasiswa, Koordinator, Kontributor, dan Dosen wajib mematuhi aturan berikut:

1. **Struktur Header Kolom Pertama:**
   * Label: **`No.`** (menggunakan huruf kapital 'N', kecil 'o', dan titik).
   * Alignment: **Rata Tengah (`text-center`)**.
   * Lebar Kolom: Tetap (*fixed width*) antara `w-12` (48px) hingga `w-14` (56px) agar tidak terdistorsi oleh lebar kolom konten teks lainnya.
2. **Formula Penomoran Berbasis Paginasi:**
   Indeks nomor baris dihitung secara global berdasarkan halaman aktif dan ukuran halaman:
   $$\text{Nomor Baris} = (\text{currentPage} - 1) \times \text{pageSize} + (\text{index} + 1)$$
   *Contoh:* Pada halaman ke-2 dengan 10 baris per halaman, baris pertama bernomor `11`, bukan `1`.
3. **Daftar Tabel Target Standarisasi:**
   * `src/pages/admin/pelamar.astro` (Tabel Pendaftar & Modal Transkrip)
   * `src/pages/admin/data-mahasiswa.astro` (Tabel Mahasiswa Aktif MBKM)
   * `src/pages/admin/dosen-data.astro` & `dosen-kuota.astro`
   * `src/pages/admin/konversi.astro` & `surekom.astro`
   * `src/pages/mahasiswa/konversi-sks.astro` (Tabel Daftar Mata Kuliah)
   * `src/components/admin/kontributor/KontributorTable.astro`
   * `src/components/admin/kontributor/KontributorDetail.astro` (Tab Relasi Mahasiswa-Dospem)

---

## 3. Spesifikasi Generator Dokumen Pakta Integritas Kontributor

### 3.1 Konsep Dokumen
Pakta Integritas Kontributor adalah dokumen kesepakatan tripartit resmi antara Mahasiswa, Kontributor (Mitra/Lab), dan Fakultas Ilmu Komputer UDINUS. Dokumen ini dibuat otomatis (*auto-generated*) oleh sistem setelah mahasiswa menerima penawaran kelolosan.

### 3.2 Struktur & Variabel Template Dokumen
Sistem memetakan variabel dinamis ke dalam template dokumen resmi:

```
[KOP SURAT FAKULTAS ILMU KOMPUTER / KAMPUS BERDAMPAK]

PAKTA INTEGRITAS & SURAT PERNYATAAN KOMITMEN MBKM
Nomor Dokumen: PI-MBKM/{{TAHUN}}/{{KODE_PROGRAM}}/{{NIM}}

Yang bertanda tangan di bawah ini:
1. Data Mahasiswa:
   - Nama Lengkap    : {{MAHASISWA_NAMA}}
   - NIM             : {{MAHASISWA_NIM}}
   - Program Studi   : {{MAHASISWA_PRODI}}
   - IPK / SKS       : {{MAHASISWA_IPK}} / {{MAHASISWA_SKS}}

2. Data Program & Kontributor:
   - Penyelenggara   : {{MITRA_NAMA}} ({{MITRA_KATEGORI}})
   - Nama Posisi     : {{PROGRAM_JUDUL}}
   - Periode         : {{PERIODE_MULAI}} s.d. {{PERIODE_SELESAI}}
   - PIC Kontributor : {{MITRA_PIC}}

Dengan ini menyatakan bersedia mematuhi kewajiban spesifik program:
{{DAFTAR_KEWAJIBAN_KONTRIBUTOR}}

Semarang, {{TANGGAL_SEKARANG}}

Pihak Mahasiswa,                              Mengetahui,
Materai Rp 10.000                             Koordinator MBKM FIK,

( {{MAHASISWA_NAMA}} )                        ( Nurul Anisa, M.Cs )
NIM. {{MAHASISWA_NIM}}                        NPP. 0686.11.2014.582
```

### 3.3 Alur Kerja Antarmuka Frontend
1. **Penerbitan Dokumen:**
   * Di dashboard mahasiswa (`/mahasiswa/dashboard`), saat status `OFFER_ACCEPTED`, kartu menyajikan tombol:
     * **[Unduh Draf Pakta Integritas (PDF)]**
2. **Pengunggahan Dokumen Ber-Materai:**
   * Mahasiswa mengunduh file PDF yang sudah terisi otomatis data dirinya.
   * Mahasiswa membubuhkan tanda tangan fisik + materai 10.000 atau tanda tangan elektronik / e-materai.
   * Pada modal/kotak upload di dashboard mahasiswa, mahasiswa mengunggah kembali file PDF yang telah ditandatangani.
3. **Verifikasi Koordinator:**
   * Berkas masuk ke antrean Koordinator di `/admin/pelamar` (Kolom Status Pakta: *Menunggu Verifikasi*).
   * Koordinator memiliki tombol aksi:
     * **[Setujui Pakta]** $\rightarrow$ Membuka alur pengajuan konversi SKS.
     * **[Minta Revisi]** $\rightarrow$ Muncul modal input alasan (misal: *"Materai belum ditandatangani"*). Status mahasiswa berubah menjadi `PAKTA_REVISION` tanpa membatalkan kelulusan mahasiswa.
