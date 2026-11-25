// src/data/mahasiswa/logbookKegiatanData.ts
// Data contoh Logbook Kegiatan (tanpa approval Dosen Pembimbing).

export interface KegiatanLog {
  id: number;
  /** Format ISO yyyy-mm-dd. */
  tanggal: string;
  judul: string;
  deskripsi: string;
  dokumenUrl: string;
}

/** Identitas yang dicetak pada kop laporan PDF. */
export const profilLaporan = {
  nama: "Ahmad Rizky Pratama",
  nim: "A11.2020.00001",
  prodi: "Teknik Informatika",
  program: "Bengkel Koding - Proyek Web & Mobile",
  dospem: "Adhitya Nugraha, S.Kom, M.CS",
  fakultas: "Fakultas Ilmu Komputer",
  universitas: "Universitas Dian Nuswantoro",
  kota: "Semarang",
};

/**
 * Tanggal mulai program (ISO yyyy-mm-dd). Dipakai HANYA sebagai titik hitung "Minggu ke-N"
 * pada pengelompokan logbook. Tanggal kegiatan tetap diisi sendiri oleh mahasiswa.
 */
export const mulaiProgram = "2026-09-07";

/**
 * Menghitung nomor minggu kegiatan dari tanggal kegiatan yang diisi mahasiswa.
 * Minggu 1 = tujuh hari pertama sejak tanggal mulai program. Minimal 1.
 */
export function hitungMinggu(iso: string): number {
  const mulai = new Date(`${mulaiProgram}T00:00:00`);
  const tgl = new Date(`${iso}T00:00:00`);
  const selisihHari = Math.round((tgl.getTime() - mulai.getTime()) / 86_400_000);
  return Math.max(1, Math.floor(selisihHari / 7) + 1);
}

export const kegiatanAwal: KegiatanLog[] = [
  {
    id: 1,
    tanggal: "2026-09-07",
    judul: "Orientasi proyek dan pembagian tugas",
    deskripsi:
      "Mengikuti kick-off bersama mentor mitra, membahas ruang lingkup proyek dashboard monitoring, alur kerja tim, dan pembagian tugas awal.",
    dokumenUrl: "https://drive.google.com/file/d/kegiatan-1/view",
  },
  {
    id: 2,
    tanggal: "2026-09-14",
    judul: "Analisis kebutuhan dan perancangan antarmuka",
    deskripsi:
      "Menyusun daftar kebutuhan fungsional dari hasil diskusi dengan mentor, kemudian membuat wireframe halaman dashboard dan halaman laporan.",
    dokumenUrl: "https://drive.google.com/file/d/kegiatan-2/view",
  },
  {
    id: 3,
    tanggal: "2026-09-23",
    judul: "Implementasi komponen antarmuka",
    deskripsi:
      "Membangun komponen tabel, filter, dan kartu ringkasan menggunakan komponen yang dapat dipakai ulang, disertai penyesuaian tampilan pada layar kecil.",
    dokumenUrl: "https://drive.google.com/file/d/kegiatan-3/view",
  },
  {
    id: 4,
    tanggal: "2026-10-05",
    judul: "Integrasi API dan penanganan galat",
    deskripsi:
      "Menghubungkan antarmuka dengan API layanan data, menambahkan penanganan kondisi gagal muat dan data kosong, serta menguji alur utama secara manual.",
    dokumenUrl: "https://drive.google.com/file/d/kegiatan-4/view",
  },
  {
    id: 5,
    tanggal: "2026-10-16",
    judul: "Pengujian dan perbaikan temuan",
    deskripsi:
      "Melakukan pengujian fungsional bersama tim, mencatat temuan bug, dan memperbaiki masalah validasi formulir serta urutan data pada tabel.",
    dokumenUrl: "https://drive.google.com/file/d/kegiatan-5/view",
  },
];
