// src/data/mahasiswa/pendaftaranData.ts

export interface FormDokumen {
  cv: string;
  portofolio: string;
  sertifikat: string;
  lampiran: string[];
}

export interface FormMBKMItem {
  id: string;
  nama: string;
  subnama: string;
  skema: string;
  sks: number;
  logo: string;
  tglDaftar: string;
  jadwalWawancara: string;
  pengumuman: string;
  tglTutup: string;
  isClosed: boolean;
  noPendaftaran: string;
  dokumen: FormDokumen;
}

export const mockDaftarFormMBKM: FormMBKMItem[] = [
  {
    id: "bk",
    nama: "Bengkel Koding",
    subnama: "Proyek Web & Mobile",
    skema: "Proyek Industri",
    sks: 20,
    logo: "/assets/images/logo-bengkod.png",
    tglDaftar: "10 Okt 2025",
    jadwalWawancara: "22 Okt 2025",
    pengumuman: "N/A",
    tglTutup: "14 Okt 2025, 23:59 WIB",
    isClosed: true,
    noPendaftaran: "REG-BK-2025-0089",
    dokumen: {
      cv: "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      portofolio: "https://github.com/ahmadrizky/fullstack-projects",
      sertifikat: "https://drive.google.com/file/d/1f2g3h4i5j_Sertifikat_React_Node/view",
      lampiran: [
        "https://drive.google.com/file/d/1k2l3m4n5o_KTM_AhmadRizky/view",
        "https://drive.google.com/file/d/1p2q3r4s5t_Transkrip_Akademik/view"
      ]
    }
  },
  {
    id: "idss",
    nama: "IDSS Laboratory",
    subnama: "Riset Decision Support & AI",
    skema: "Publikasi & Riset",
    sks: 20,
    logo: "/assets/images/logo-idss.png",
    tglDaftar: "15 Okt 2025",
    jadwalWawancara: "18 Okt 2025",
    pengumuman: "N/A",
    tglTutup: "17 Okt 2025, 23:59 WIB",
    isClosed: false,
    noPendaftaran: "REG-IDSS-2025-0042",
    dokumen: {
      cv: "https://drive.google.com/file/d/1CxiNVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      portofolio: "https://github.com/ahmadrizky/ai-dss-paper",
      sertifikat: "https://drive.google.com/file/d/1g2h3i4j5k_Sertifikat_Python_DataScience/view",
      lampiran: [
        "https://drive.google.com/file/d/1l2m3n4o5p_KTM_AhmadRizky/view"
      ]
    }
  },
  {
    id: "dicoding",
    nama: "Dicoding Indonesia",
    subnama: "Asah AI & Software Engineering",
    skema: "Studi Independen",
    sks: 20,
    logo: "/assets/images/logo-dicoding.png",
    tglDaftar: "16 Okt 2025",
    jadwalWawancara: "24 Okt 2025",
    pengumuman: "25 Okt 2025",
    tglTutup: "20 Okt 2025, 23:59 WIB",
    isClosed: false,
    noPendaftaran: "REG-DCD-2025-0155",
    dokumen: {
      cv: "https://drive.google.com/file/d/1DxiOVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view",
      portofolio: "https://github.com/ahmadrizky/dicoding-submissions",
      sertifikat: "https://drive.google.com/file/d/1h2i3j4k5l_Sertifikat_Dicoding_MenjadiPengembang/view",
      lampiran: []
    }
  }
];
