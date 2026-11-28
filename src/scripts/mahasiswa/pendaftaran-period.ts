// src/scripts/mahasiswa/pendaftaran-period.ts
//
// Modul domain pendaftaran MBKM — satu sumber kebenaran untuk:
//   1. periode akademik berjalan (dibaca dari src/data/academic/periods.json),
//   2. urutan riwayat pengajuan (terbaru → terlama),
//   3. aturan "satu pendaftaran per periode": hanya program terbaru pada
//      periode berjalan yang detailnya boleh dibuka.
//
// Dipakai oleh Dashboard Mahasiswa dan halaman Pendaftaran, sehingga aturan
// tidak hidup di dalam markup dan tidak bisa dilewati dari sisi tampilan.
// Relasi periode masih implisit pada data lama: pengajuan tanpa `periode`
// dianggap milik periode berjalan, sehingga riwayat periode sebelumnya tetap
// tersimpan dan tidak pernah terhapus.
import periodsData from "../../data/academic/periods.json";

export interface PeriodeAkademik {
  id: number;
  kode: string;
  tahun: string;
  mulai: string;
  akhir: string;
  status: number;
}

/** Bentuk minimum data pengajuan yang dibutuhkan modul ini. */
export interface PendaftaranRingkas {
  id: string;
  tglDaftar: string;
  periode?: string;
}

export const periodeAkademik = periodsData as PeriodeAkademik[];

const BULAN: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, mei: 4, may: 4, jun: 5,
  jul: 6, agu: 7, aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, des: 11, dec: 11,
};

/** Periode akademik yang sedang berjalan (status = 1). */
export function getPeriodeAktif(): PeriodeAkademik | undefined {
  return periodeAkademik.find((p) => p.status === 1);
}

/** Kode periode berjalan, mis. "20261". String kosong bila tidak ada yang aktif. */
export function kodePeriodeAktif(): string {
  return getPeriodeAktif()?.kode ?? "";
}

/** Periode pemilik sebuah pengajuan; data lama tanpa `periode` = periode berjalan. */
export function periodeDari(item: PendaftaranRingkas): string {
  return item.periode ?? kodePeriodeAktif();
}

/** Ubah tanggal pengajuan ("10/10/2025" atau "10 Okt 2025") menjadi epoch ms. */
export function waktuDaftar(item: PendaftaranRingkas): number {
  const teks = (item.tglDaftar ?? "").trim();

  const garisMiring = teks.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (garisMiring) {
    return Date.UTC(Number(garisMiring[3]), Number(garisMiring[2]) - 1, Number(garisMiring[1]));
  }

  const berspasi = teks.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (berspasi) {
    const bulan = BULAN[berspasi[2].slice(0, 3).toLowerCase()];
    if (bulan !== undefined) return Date.UTC(Number(berspasi[3]), bulan, Number(berspasi[1]));
  }

  return 0;
}

/** Riwayat pengajuan terbaru → terlama. */
export function urutkanTerbaruDulu<T extends PendaftaranRingkas>(items: T[]): T[] {
  return [...items].sort((a, b) => waktuDaftar(b) - waktuDaftar(a));
}

/** Pengajuan pada satu periode, terbaru lebih dulu. */
export function pendaftaranPeriode<T extends PendaftaranRingkas>(items: T[], kode: string): T[] {
  return urutkanTerbaruDulu(items.filter((item) => periodeDari(item) === kode));
}

/** Pengajuan terbaru pada satu periode — satu-satunya yang detailnya boleh dibuka. */
export function pendaftaranTerbaru<T extends PendaftaranRingkas>(
  items: T[],
  kode: string,
): T | undefined {
  return pendaftaranPeriode(items, kode)[0];
}

/** Riwayat siap tampil: terbaru di atas + penanda hanya-terbaru-yang-bisa-dibuka. */
export function riwayatSiapTampil<T extends PendaftaranRingkas>(
  items: T[],
  kode: string = kodePeriodeAktif(),
): (T & { bolehBukaDetail: boolean })[] {
  const terbaruId = pendaftaranTerbaru(items, kode)?.id;
  return urutkanTerbaruDulu(items).map((item) => ({
    ...item,
    bolehBukaDetail: item.id === terbaruId,
  }));
}
