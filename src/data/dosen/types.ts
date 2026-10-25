// src/data/dosen/types.ts

export interface DosenProfile {
  nidn: string;
  nama: string;
  gelar: string;
  email: string;
  prodi: string;
  avatar: string;
  kuotaMax: number;
  kuotaTerpakai: number;
  waGroupLink: string;
  waGroupName: string;
}

export interface MatriksKonversiMhs {
  kode: string;
  nama: string;
  sks: number;
  nilai?: string;
  status: "disetujui" | "pending";
}

export interface MahasiswaBinaan {
  id: string;
  nim: string;
  nama: string;
  avatar: string;
  email: string;
  noWa: string;
  prodi: string;
  kontributor: string;
  kontributorLogo?: string;
  skema: "Magang Industri" | "Studi Independen";
  posisi: string;
  mentor: string;
  status: "Aktif" | "Perlu Supervisi";
  progressLogbook: number; // 0 - 100
  mingguTerakhir: number; // misal: 8 dari 16
  totalLogbook: number;
  hasUnapprovedLogbook: boolean;
  ipk: number;
  sksTempuh: number;
  dosenPA: string;
  konversiMatkul: MatriksKonversiMhs[];
}

export interface LogbookMingguan {
  id: string;
  mahasiswaId: string;
  mingguKe: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  uraian: string;
  status: "accepted" | "pending" | "revised";
  lampiran?: string;
  catatanRevisi?: string;
  updatedAt: string;
}

export interface PengajuanSidangDosen {
  id: string;
  mahasiswaId: string;
  judulLaporan: string;
  kontributor: string;
  mentor: string;
  dokumenLaporanPdf: string;
  dokumenNilaiKontributorPdf: string;
  nilaiKontributor: number; // 0 - 100 (bobot 60%)
  tanggalPengajuan: string;
  status: "menunggu_review" | "acc_maju_sidang" | "revisi";
  catatanDpl?: string;
}

export interface SidangDosen {
  id: string;
  mahasiswaId: string;
  judulLaporan: string;
  tanggalSidang: string;
  jamSidang: string;
  ruangMeeting: string;
  linkMeeting?: string;
  nilaiKontributor: number; // Bobot 60%
  nilaiDpl: number | null; // Bobot 40% (null jika belum sidang)
  nilaiAkhir: number | null; // Komposit 60% Kontributor + 40% Dospem
  grade: string | null; // A, AB, B, dsb
  status: "terjadwal" | "selesai" | "menunggu_nilai";
}

export interface PengumumanDosenItem {
  id: string;
  judul: string;
  tanggal: string;
  waktu: string;
  pengirim: string;
  kategori: "Bimbingan Dospem" | "Sidang Evaluasi" | "Kebijakan Fakultas" | "Umum";
  ringkasan: string;
  kontenLengkap: string;
  lampiranNama?: string;
  lampiranUrl?: string;
  isPinned: boolean;
}

export interface LogAktivitasDosenItem {
  id: string;
  timestamp: string;
  modul: "Logbook Mahasiswa" | "Laporan Akhir" | "Sidang Evaluasi" | "Bimbingan";
  aksi: string;
  mahasiswaNama: string;
  mahasiswaNim: string;
  rincian: string;
}
