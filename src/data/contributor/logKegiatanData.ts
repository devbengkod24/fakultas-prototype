// src/data/contributor/logKegiatanData.ts
// Data contoh Logbook Kegiatan mahasiswa binaan untuk portal Kontributor (hanya dilihat, tanpa ubah data).
// Kunci = NIM, sama dengan baris pada tabel Daftar Mahasiswa (Kelola Anggota).
import { kegiatanAwal, type KegiatanLog } from "../mahasiswa/logbookKegiatanData";

export interface LogbookMahasiswa {
  nama: string;
  nim: string;
  prodi: string;
  dospem: string;
  entries: KegiatanLog[];
}

export const logbookMahasiswa: Record<string, LogbookMahasiswa> = {
  "A11.2021.13782": {
    nama: "Calvin Revianto",
    nim: "A11.2021.13782",
    prodi: "S1 Teknik Informatika",
    dospem: "Nurul Anisa S.W., M.Cs",
    entries: kegiatanAwal,
  },
  "A11.2022.14101": {
    nama: "Dimas Wahyu Saputra",
    nim: "A11.2022.14101",
    prodi: "S1 Teknik Informatika",
    dospem: "Dr. Ricardus Anggi, M.Kom.",
    entries: [
      {
        id: 1,
        tanggal: "2026-09-08",
        judul: "Pengenalan lingkungan kerja dan alat kolaborasi",
        deskripsi: "Mengikuti pengenalan repositori, alur pull request, dan papan tugas tim bersama mentor mitra.",
        dokumenUrl: "https://drive.google.com/file/d/dimas-1/view",
      },
      {
        id: 2,
        tanggal: "2026-09-19",
        judul: "Pengumpulan dan pembersihan dataset",
        deskripsi: "Mengumpulkan citra permukaan logam, menyeragamkan resolusi, dan melabeli sampel cacat untuk data latih.",
        dokumenUrl: "https://drive.google.com/file/d/dimas-2/view",
      },
      {
        id: 3,
        tanggal: "2026-10-03",
        judul: "Pelatihan awal model deteksi",
        deskripsi: "Melatih model deteksi objek tahap pertama dan mencatat metrik akurasi untuk dibahas pada sesi mentoring.",
        dokumenUrl: "https://drive.google.com/file/d/dimas-3/view",
      },
    ],
  },
  "A11.2022.14150": {
    nama: "Siti Nurhaliza",
    nim: "A11.2022.14150",
    prodi: "S1 Teknik Informatika",
    dospem: "Dr. Ricardus Anggi, M.Kom.",
    entries: [
      {
        id: 1,
        tanggal: "2026-09-10",
        judul: "Studi literatur segmentasi citra medis",
        deskripsi: "Menelaah beberapa arsitektur segmentasi dan merangkum kelebihan masing-masing untuk citra USG.",
        dokumenUrl: "https://drive.google.com/file/d/siti-1/view",
      },
      {
        id: 2,
        tanggal: "2026-10-01",
        judul: "Implementasi arsitektur segmentasi",
        deskripsi: "Mengimplementasikan model segmentasi dasar dan menyiapkan skrip evaluasi pada data validasi.",
        dokumenUrl: "https://drive.google.com/file/d/siti-2/view",
      },
    ],
  },
  "A11.2022.14205": {
    nama: "Bagus Wicaksono",
    nim: "A11.2022.14205",
    prodi: "S1 Sistem Informasi",
    dospem: "Dr. Aris Kusumawati, M.Cs.",
    entries: [],
  },
  "A12.2022.09876": {
    nama: "Fajar Nugroho",
    nim: "A12.2022.09876",
    prodi: "S1 Sistem Informasi",
    dospem: "Dr. Muljono, S.Si, M.Kom",
    entries: [],
  },
};
