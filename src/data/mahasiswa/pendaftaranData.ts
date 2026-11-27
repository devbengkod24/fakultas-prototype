// src/data/mahasiswa/pendaftaranData.ts

export interface FormDokumen {
  transkrip: string;
  surekom: string;
  cv: string;
  sertifikat: string;
  lampiran: string[];
}

export interface FormMBKMItem {
  id: string;
  nama: string;
  subnama: string;
  skema: string;
  isSIB: boolean;
  surekomMode?: "mandiri" | "koordinator";
  sks: number;
  logo: string;
  tglDaftar: string;
  screeningLolos: boolean;
  jadwalWawancara: string;
  jadwalWawancaraDetail: string;
  pengumuman: string;
  tglTutup: string;
  isClosed: boolean;
  isRejectedHistory?: boolean;
  noPendaftaran: string;
  dokumen: FormDokumen;
}

export const mockDaftarFormMBKM: FormMBKMItem[] = [
  {
    id: "bk",
    nama: "Bengkel Koding",
    subnama: "Proyek Web & Mobile",
    skema: "Proyek Industri",
    isSIB: false,
    sks: 20,
    logo: "/assets/images/logo-bengkod.png",
    tglDaftar: "10/10/2025",
    screeningLolos: true,
    jadwalWawancara: "22/10/2025",
    jadwalWawancaraDetail: "22/10/2025, 09:00 • Google Meet",
    pengumuman: "N/A",
    tglTutup: "14 Okt 2025, 23:59 WIB",
    isClosed: false,
    isRejectedHistory: false,
    noPendaftaran: "REG-BK-2025-0089",
    dokumen: {
      transkrip: "https://drive.google.com/file/d/1T1r2a3n4s5k6r7i8p_Transkrip_AhmadRizky/view",
      surekom: "",
      cv: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      sertifikat: "https://drive.google.com/file/d/1f2g3h4i5j_Sertifikat_React_Node/view",
      lampiran: [
        "https://drive.google.com/file/d/1k2l3m4n5o_KTM_AhmadRizky/view",
        "https://drive.google.com/file/d/1k2l3m4n5o_Lampiran2_BK/view"
      ]
    }
  },
  {
    id: "idss",
    nama: "IDSS Laboratory",
    subnama: "Riset Decision Support & AI",
    skema: "Publikasi & Riset",
    isSIB: false,
    sks: 20,
    logo: "/assets/images/logo-idss.png",
    tglDaftar: "01/10/2025",
    screeningLolos: false,
    jadwalWawancara: "N/A",
    jadwalWawancaraDetail: "N/A",
    pengumuman: "Ditolak",
    tglTutup: "05 Okt 2025, 23:59 WIB",
    isClosed: true,
    isRejectedHistory: true,
    noPendaftaran: "REG-IDSS-2025-0042",
    dokumen: {
      transkrip: "https://drive.google.com/file/d/1T2r3a4n5s6k7r8i9p_Transkrip_AhmadRizky/view",
      surekom: "",
      cv: "https://drive.google.com/file/d/1CxiNVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      sertifikat: "https://drive.google.com/file/d/1g2h3i4j5k_Sertifikat_Python_DataScience/view",
      lampiran: [
        "https://drive.google.com/file/d/1l2m3n4o5p_KTM_AhmadRizky/view",
        "https://drive.google.com/file/d/1l2m3n4o5p_Lampiran2_IDSS/view"
      ]
    }
  },
  {
    id: "dicoding",
    nama: "Dicoding Indonesia",
    subnama: "Asah AI & Software Engineering",
    skema: "Studi Independen",
    isSIB: true,
    surekomMode: "mandiri",
    sks: 20,
    logo: "/assets/images/logo-dicoding.png",
    tglDaftar: "20/09/2025",
    screeningLolos: false,
    jadwalWawancara: "N/A",
    jadwalWawancaraDetail: "N/A",
    pengumuman: "Ditolak",
    tglTutup: "25 Sep 2025, 23:59 WIB",
    isClosed: true,
    isRejectedHistory: true,
    noPendaftaran: "REG-DCD-2025-0155",
    dokumen: {
      transkrip: "https://drive.google.com/file/d/1T3r4a5n6s7k8r9i0p_Transkrip_AhmadRizky/view",
      surekom: "",
      cv: "https://drive.google.com/file/d/1DxiOVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      sertifikat: "https://drive.google.com/file/d/1h2i3j4k5l_Sertifikat_Dicoding_MenjadiPengembang/view",
      lampiran: []
    }
  }
];
