# Spesifikasi Teknis: Antarmuka & Navigasi Per Role (Mahasiswa & Koordinator)

**Dokumen:** `docs/spec/03-antarmuka-dan-navigasi-role.md`  
**Status:** Disetujui  
**Versi:** 2.0  
**Tanggal:** 2026-10-26  

---

## 1. Antarmuka Role Mahasiswa

### 1.1 Restrukturisasi Menu Sidang Evaluasi (1 Menu dengan 2 Tab Navigasi)

* **Rute URL:** `/mahasiswa/sidang`
* **Dasar Keputusan Desain:**  
  Sidebar mahasiswa telah memuat 11 item navigasi. Menambah item level-1 baru (`Pengajuan Sidang` dan `Hasil Sidang` terpisah) melanggar *Hick's Law* dan memicu *vertical scroll* yang menurunkan *usability*. Solusi terpilih adalah mempertahankan 1 menu induk bertab.

```
+---------------------------------------------------------------------------------------+
|  Sidang Evaluasi Kampus Berdampak                                                     |
|  Kelola pendaftaran sidang, berkas laporan akhir, serta pantau jadwal & hasil ujian   |
+---------------------------------------------------------------------------------------+
|  [ Tab 1: Pengajuan Sidang ]          |       [ Tab 2: Jadwal & Hasil Sidang ]        |
+---------------------------------------------------------------------------------------+
```

#### Spesifikasi Tab 1: Pengajuan Sidang
1. **Formulir Unggah Berkas Persyaratan:**
   * **Draf Laporan Akhir MBKM:** File PDF (maks. 10MB) dengan status validasi Dospem.
   * **Lembar Penilaian Mitra / Pembimbing Lapangan:** File PDF (skala nilai 0-100 dan deskripsi capaian kerja).
   * **Sertifikat Penyelesaian Program:** File PDF resmi dari mitra industri atau laboratorium.
   * **Tautan Komprehensif (Google Drive / GitHub):** URL repositori luaran kode/proyek atau folder dokumentasi.
2. **Status Validasi Berkas:**
   * Menampilkan kartu progres verifikasi kelayakan sidang oleh Koordinator MBKM: `Menunggu Verifikasi Berkas` $\rightarrow$ `Perlu Revisi Berkas` $\rightarrow$ `Berkas Lengkap (Siap Diuji)`.

#### Spesifikasi Tab 2: Jadwal & Hasil Sidang
1. **Banner Status Penjadwalan:**
   * Menampilkan waktu hitung mundur dan status: `Menunggu Penetapan Jadwal`, `Sidang Terjadwal`, atau `Sidang Selesai`.
2. **Kartu Pelaksanaan Sidang:**
   * Hari, Tanggal, dan Pukul (WIB).
   * Ruangan Fisik (misal: Ruang Sidang Gedung H Lantai 5) dan/atau Tautan Google Meet Daring.
3. **Tim Dosen Penguji:**
   * Dosen Pembimbing (Bobot Penilaian 40%).
   * Dosen Penguji Mandiri Fakultas (Bobot Penilaian 60%).
4. **Berita Acara & Konversi Nilai:**
   * Tabel rekapitulasi nilai evaluasi sidang beserta hasil konversi ke mata kuliah semester.

---

### 1.2 Dosen Pembimbing di Dashboard Mahasiswa & Tautan Grup WhatsApp

* **Perubahan Sidebar:** Menu `Dosen Pembimbing` (`/mahasiswa/dosen-pembimbing`) **dihapus dari navigasi sidebar**.
* **Integrasi Dashboard (`/mahasiswa/dashboard`):** Informasi Dosen Pembimbing dipindahkan ke kartu utama di dashboard mahasiswa.

#### Logika Status Kartu Dospem:
1. **State Kosong (Sebelum KRS Terkunci):**
   * Kartu menampilkan pesan informatif berlatar abu-abu netral:
     > *"Dosen Pembimbing belum ditetapkan. Alokasi dosen pembimbing akan diterbitkan setelah berkas pakta integritas dan konversi KRS divalidasi oleh Koordinator MBKM."*
2. **State Aktif (Setelah Dospem Ditugaskan):**
   * Avatar foto dosen dan nama lengkap bergelar (contoh: *Dr. Ricardus Anggi, M.Kom*).
   * Nomor Induk Dosen (NIDN) dan alamat email institusi (`@dsn.dinus.ac.id`).
   * **Komponen Grup WhatsApp Bimbingan:**
     * Menggantikan tautan nomor WhatsApp pribadi menjadi **Tautan Undangan Grup WhatsApp Resmi**.
     * Dilengkapi input field read-only untuk URL grup (`https://chat.whatsapp.com/...`).
     * Tombol aksi ganda: **[Salin Tautan]** (dengan feedback ikon centang instan) dan **[Buka Grup WhatsApp]** (membuka tab baru).

---

## 2. Antarmuka Role Koordinator MBKM

### 2.1 Menu Kontributor: Pemetaan Dosen Pembimbing & Mahasiswa Ditempatkan

* **Lokasi Komponen:** `src/components/admin/kontributor/KontributorDetail.astro`
* **Kebutuhan:** Koordinator MBKM memerlukan visibilitas cepat terkait dosen fakultas yang mendampingi mahasiswa pada masing-masing mitra industri/laboratorium.

#### Spesifikasi Tab "Mahasiswa & Dospem":
Di dalam detail profil kontributor, ditambahkan tab navigasi data yang menyajikan tabel relasi terpadu:

```
+----+---------------+-------------------------+--------------------+----------------------------+---------------+
| No |      NIM      |      Nama Mahasiswa     |   Program/Posisi   |  Dosen Pembimbing Fakultas | Status Bimb.  |
+----+---------------+-------------------------+--------------------+----------------------------+---------------+
| 1  | A11.2021.13245| Ahmad Rizky Pratama     | Fullstack Engineer | Dr. Ricardus Anggi, M.Kom  | Aktif (W-08)  |
| 2  | A11.2021.13890| Salsabila Putri         | UI/UX Designer     | Adhitya Nugraha, M.CS      | Aktif (W-08)  |
+----+---------------+-------------------------+--------------------+----------------------------+---------------+
```

* Setiap baris memuat badge status bimbingan (misal: *Minggu ke-8/16*, *Logbook Lancar*, atau *Peringatan Presensi*).

---

### 2.2 CMS Kontributor: Upload File Dropzone untuk Foto Profil & Banner

* **Lokasi Komponen:** `src/components/admin/kontributor/cms/TabProfilHero.astro`
* **Masalah Awal:** Input URL foto mengharuskan admin mengunggah gambar ke hosting eksternal terlebih dahulu lalu menyalin tautan teks mentah.
* **Solusi Antarmuka:** Mengganti input string URL dengan **Interactive Drag-and-Drop File Uploader**:
  1. Area dropzone bergaris putus-putus (*dashed border*) dengan ikon upload dan teks instruksi.
  2. Mendukung pemilihan file dari perangkat (*file picker dialog*) dan *drag-and-drop*.
  3. **Instant Client-Side Preview:** Menggunakan JavaScript `URL.createObjectURL(file)` untuk menampilkan pratinjau gambar seketika tanpa perlu dependensi backend.
  4. Tombol aksi cepat: **[Ganti Gambar]** dan **[Hapus Gambar]**.
  5. Batasan teknis: Format file gambar (`.png`, `.jpg`, `.jpeg`, `.webp`), rekomendasi rasio 16:9 untuk banner hero dan 1:1 untuk logo profil, ukuran maksimal 2MB.

---

### 2.3 Menu Mahasiswa Pendaftar (Pelamar): Export Excel & Lampiran Berkas Sertifikat

* **Lokasi Berkas:** `src/pages/admin/pelamar.astro` dan `src/components/admin/modals/ModalDetailPelamar.astro`

#### Fitur Export Excel:
1. Tombol aksi sekunder **[Export Excel]** terletak di sisi kanan atas tabel/kartu pendaftar.
2. Saat diklik, sistem mengekspor data pendaftar yang sedang aktif difilter ke dalam file berformat spreadsheet (`.xlsx` atau `.csv`).
3. Kolom data ekspor mencakup:
   * `No`, `NIM`, `Nama Lengkap`, `Program Studi`, `IPK`, `SKS Tempuh`, `Nama Program`, `Mitra Kontributor`, `Tanggal Pengajuan`, `Status Seleksi`, `Status Pakta Integritas`, `Dosen Pembimbing`.

#### Penambahan Lampiran Berkas Sertifikat:
1. Pada modal detail pelamar (`ModalDetailPelamar.astro`), bagian berkas dokumen pendukung kini memuat 3 komponen berkas lengkap:
   * **Curriculum Vitae (CV ATS):** Tombol unduh / tinjau dokumen PDF.
   * **Portofolio Karya:** Tautan tautan proyek (GitHub / Behance / Web).
   * **Sertifikat Kompetensi / Prestasi:** Tautan/dokumen sertifikasi keahlian yang relevan dengan posisi yang dilamar.
