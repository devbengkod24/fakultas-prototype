# Spesifikasi Teknis MBKM V2 (`fakultas-prototype`)

Dokumen ini memuat kumpulan spesifikasi arsitektur antarmuka, siklus hidup pendaftaran (*state machine*), alur proses (*flow*), dan standarisasi interaksi untuk modul Kampus Berdampak / MBKM di repositori `fakultas-prototype`.

Spesifikasi ini dirumuskan berdasarkan hasil rapat koordinasi evaluasi prototipe tanggal 25 Oktober 2026 dan keputusan penyelarasan alur bisnis bersama Koordinator MBKM dan Tim Pengembang.

---

## 📑 Daftar Berkas Spesifikasi

| Dokumen | Topik & Cakupan Utama | Target Berkas Terkait |
| :--- | :--- | :--- |
| **[[01-flow-mbkm.md\|01. Alur Bisnis & User Journey MBKM]]** | Alur proses end-to-end, perjalanan per peran (Mahasiswa, Kontributor, Koordinator, Dospem), aturan bisnis kunci, dan penanganan jalur alternatif (*exception flows*). | `src/pages/mbkm.astro`, `src/pages/detail-mbkm.astro`, `src/pages/mahasiswa/` |
| **[[02-state-machine-mbkm.md\|02. State Machine & Siklus Hidup Data]]** | 18 state formal, diagram state machine, matriks transisi & guard conditions, invarian sistem, dan mapping state ke reaktivitas Alpine.js `$store.mahasiswaSim`. | `src/components/mbkm/pendaftaran/`, `src/pages/mahasiswa/dashboard.astro`, store data |
| **[[03-antarmuka-dan-navigasi-role.md\|03. Antarmuka & Navigasi Per Role]]** | Standarisasi menu Mahasiswa (Sidang 2 tab, Dospem di dashboard + WAG) dan Koordinator (Tabel Dospem di Kontributor, Dropzone CMS, Export Excel, Berkas Sertifikat). | `src/layouts/MahasiswaShell.astro`, `src/pages/mahasiswa/sidang.astro`, `src/components/admin/kontributor/` |
| **[[04-standar-komponen-dan-interaksi.md\|04. Standar Komponen & Interaksi UI]]** | Perilaku auto-scroll tombol daftar pada halaman detail program, standarisasi kolom penomoran tabel (`No.`), dan mekanisme template generator pakta integritas kontributor. | `src/pages/detail-mbkm.astro`, `src/components/ui/DataTable.astro`, generator pakta |

---

## 🎯 6 Prinsip Kunci Revisi

1. **Pemisahan Alur (Flow) dan State Machine:**  
   Alur proses (*"siapa melakukan apa, dalam urutan apa"*) dan State Machine (*"status data apa yang sah, dan apa aturan transisinya"*) dipisahkan ke dua berkas independen untuk mencegah kebingungan logika antar tim pengembang.
2. **Pergeseran Posisi Pakta Integritas Formal:**  
   Pendaftaran awal (Tahap 3) hanya berupa persetujuan ketentuan umum (*general agreement* berupa checkbox). Penandatanganan pakta formal digeser ke tahap **pasca-diterima** oleh mitra/dosen sebelum pengajuan konversi SKS.
3. **Dualitas Pakta (General vs Kontributor Generated):**  
   Pakta Kontributor di-generate dinamis oleh sistem berbasis profil mahasiswa dan klausul mitra, berkekuatan hukum spesifik.
4. **KRS Siadin sebagai Gatekeeper Penetapan Dosen Pembimbing:**  
   Pengumuman seleksi mitra selesai sebelum masa KRS. Dosen Pembimbing baru dapat di-assign oleh Koordinator setelah konversi mata kuliah berstatus `KRS_LOCKED_VERIFIED`.
5. **Penyederhanaan Navigasi Mahasiswa (Hick's Law):**  
   Menu `Dosen Pembimbing` di sidebar dihapus dan dilebur ke kartu Dashboard (kontak WA diganti link WAG resmi). Menu `Sidang Evaluasi` tetap tunggal dengan 2 sub-tab navigasi.
6. **Visibilitas Dosen Pembimbing di Profil Kontributor & Konsistensi UI:**  
   Koordinator dapat langsung memantau dosen pembimbing fakultas yang mengawal mahasiswa di tiap mitra melalui tab terdedikasi. Seluruh tabel data memiliki kolom nomor urut (`No.`) yang konsisten.
