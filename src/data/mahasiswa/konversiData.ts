// src/data/mahasiswa/konversiData.ts
// Data contoh alur Konversi SKS mahasiswa.

/** Nilai lama di transkrip. `null` = belum pernah diambil (matkul baru). Nilai A tidak dapat diulang sehingga tidak ada di katalog. */
export type NilaiLama = "B" | "C" | "D" | "E" | null;

export interface MatkulKatalog {
  kode: string;
  nama: string;
  nilaiLama: NilaiLama;
}

export interface MatkulPengajuan extends MatkulKatalog {
  status: "draft" | "accept" | "decline";
  catatan: string;
  /** Diisi pada tahap Kelompok Matkul. */
  sks: number | null;
  dosen: string;
}

export const MAKS_SKS = 20;

export const katalogMatkul: MatkulKatalog[] = [
  { kode: "A11.54101", nama: "Pemrograman Web Berbasis Komponen", nilaiLama: null },
  { kode: "A11.54102", nama: "Pengembangan Aplikasi Mobile", nilaiLama: null },
  { kode: "A11.54602", nama: "Sistem Basis Data Lanjut", nilaiLama: "C" },
  { kode: "A11.54201", nama: "Komputasi Awan (Cloud Computing)", nilaiLama: null },
  { kode: "A11.54202", nama: "Keamanan Jaringan & Sistem Informasi", nilaiLama: "D" },
  { kode: "A11.54301", nama: "Data Mining & Business Intelligence", nilaiLama: null },
  { kode: "A11.54603", nama: "Kapita Selekta Komputasi Cerdas", nilaiLama: "C" },
  { kode: "A11.54604", nama: "Metodologi Penelitian & Publikasi", nilaiLama: "E" },
  { kode: "A11.54605", nama: "Etika Profesi TI", nilaiLama: "B" },
  { kode: "A11.54601", nama: "Proyek Perangkat Lunak", nilaiLama: null },
];

const pilih = (kode: string): MatkulKatalog =>
  katalogMatkul.find((m) => m.kode === kode) as MatkulKatalog;

export const buatPengajuan = (
  kodeList: string[],
  status: MatkulPengajuan["status"],
): MatkulPengajuan[] =>
  kodeList.map((kode) => ({ ...pilih(kode), status, catatan: "", sks: null, dosen: "" }));

/** Pengajuan awal (tiga matkul): satu di antaranya mengulang. */
export const pengajuanAwal = ["A11.54101", "A11.54602", "A11.54102"];
/** Pengajuan lengkap (lima matkul) untuk simulasi tahap setelah pengajuan pertama. */
export const pengajuanLengkap = [...pengajuanAwal, "A11.54605", "A11.54601"];
