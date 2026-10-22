// src/types/index.ts
// Definisi tipe data entitas ekosistem MBKM FIK UDINUS

export interface PartnerDosen {
  nama: string;
  nidn: string;
  prodi: string;
  mhsCount: number;
}

export interface PartnerStudent {
  nama: string;
  nim: string;
  prodi: string;
  posisi: string;
  dpl: string;
  status: string;
}

export interface Partner {
  id: number | string;
  nama: string;
  tipe: 'internal' | 'eksternal';
  deskripsi: string;
  sektor: string;
  picNama: string;
  picEmail: string;
  picPhone?: string;
  role?: string;
  status: 'aktif' | 'nonaktif' | string;
  mou?: string;
  alamat?: string;
  avatar?: string;
  dosen?: PartnerDosen[];
  mhs?: PartnerStudent[];
}

export interface Applicant {
  id: number | string;
  nama: string;
  nim: string;
  prodi?: string;
  email?: string;
  phone?: string;
  program?: string;
  kontributor?: string;
  posisi?: string;
  ipk?: string | number;
  sks?: number;
  status?: string;
  tanggal?: string;
}

export interface Program {
  id: string;
  nama: string;
  dosen: string;
  kategori: string;
  status: 'APPROVED' | 'PENDING' | 'DISAPPROVED' | string;
}

export interface Coordinator {
  id: string;
  nama: string;
  nidn: string;
  prodi: string;
  email: string;
}

export interface Period {
  id: number;
  kode: string;
  tahun: string;
  mulai: string;
  akhir: string;
  status: number; // 1 = aktif, 0 = nonaktif
}

export interface Announcement {
  id: number;
  judul: string;
  sasaran: string;
  sasaranLabel: string;
  status: string;
  tgl: string;
  jam: string;
  author: string;
  isi: string;
  file?: string;
  pinned?: boolean;
}

export interface DataTableTab {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}
