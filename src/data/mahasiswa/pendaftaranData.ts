// src/data/mahasiswa/pendaftaranData.ts

export interface FormDokumen {
  cv: string;
  portofolio: string;
  sertifikat: string;
  surekom: string;
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
      cv: "CV_AhmadRizky_WebDev.pdf",
      portofolio: "https://github.com/ahmadrizky/fullstack-projects",
      sertifikat: "Sertifikat_React_NodeJS.pdf",
      surekom: "SuReKom_DrMuljono_TTE.pdf"
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
      cv: "CV_AhmadRizky_DataAI.pdf",
      portofolio: "https://github.com/ahmadrizky/ai-dss-paper",
      sertifikat: "Sertifikat_Python_DataScience.pdf",
      surekom: "SuReKom_DrMuljono_TTE.pdf"
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
      cv: "CV_AhmadRizky_SoftwareEng.pdf",
      portofolio: "https://github.com/ahmadrizky/dicoding-submissions",
      sertifikat: "Sertifikat_Dicoding_MenjadiPengembang.pdf",
      surekom: "SuReKom_DrMuljono_TTE.pdf"
    }
  }
];
