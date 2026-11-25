// src/data/mahasiswa/sidangData.ts

export interface PersyaratanSidang {
  id: string;
  nama: string;
  keterangan: string;
  tipe: "file" | "link";
  /** Nama berkas (tipe file) atau URL (tipe link). Kosong = belum dipenuhi. */
  nilai: string;
  /** Tautan untuk melihat berkas yang sudah diunggah. */
  tautan: string;
}

export interface PengujiSidang {
  inisial: string;
  nama: string;
  peran: string;
  bobot: string;
}

export interface KomponenNilai {
  nama: string;
  bobot: string;
  nilai: string;
  penilai: string;
}

export interface SidangData {
  status: string;
  judulKB: string;
  perusahaan: string;
  posisi: string;
  periodeMulai: string;
  periodeSelesai: string;
  alamatPerusahaan: string;
  dosenPembimbing: string;
  linkSuratDiterima: string;
  penyelia: {
    nama: string;
    posisi: string;
    perusahaan: string;
    telepon: string;
    nilaiEvaluasi: string;
  };
  persyaratan: PersyaratanSidang[];
  folderDrive: string;
  linkVideoSosialMedia: string;
  jadwal: {
    tanggal: string;
    waktu: string;
    lokasi: string;
    ruang: string;
    linkMeet: string;
  };
  penguji: PengujiSidang[];
  hasil: {
    status: string;
    nilaiAkhir: string;
    nilaiMutu: string;
    catatan: string;
    komponen: KomponenNilai[];
  };
}

export const sidangData: SidangData = {
  status: "Sudah Terjadwal",
  judulKB: "Pengembangan Sistem Dashboard Monitoring Magang Berbasis Web",
  perusahaan: "PT Telkom Indonesia",
  posisi: "Fullstack Developer",
  periodeMulai: "Minggu, 23 Agustus 2026",
  periodeSelesai: "Sabtu, 21 November 2026",
  alamatPerusahaan:
    "Jl. Pahlawan No. 10, Pleburan, Kec. Semarang Selatan, Kota Semarang, Jawa Tengah 50241",
  dosenPembimbing: "Dr. Ricardus Anggi, M.Kom",
  linkSuratDiterima: "https://drive.google.com/file/d/demo-surat-magang/view",
  penyelia: {
    nama: "Budi Santoso, S.Kom.",
    posisi: "Senior Lead Software Engineer",
    perusahaan: "PT Telkom Indonesia",
    telepon: "081234567891",
    nilaiEvaluasi: "90",
  },
  persyaratan: [
    {
      id: "laporan",
      nama: "Laporan Akhir",
      keterangan: "Berkas PDF, maksimal 25 MB",
      tipe: "file",
      nilai: "Laporan_Akhir_Kampus_Berdampak_A11.2020.00001.pdf",
      tautan:
        "https://drive.google.com/file/d/laporan-akhir-Kampus-Berdampak-a11.pdf",
    },
    {
      id: "logbook",
      nama: "Rekap Logbook Kegiatan",
      keterangan: "Berkas PDF hasil unduhan Logbook Kegiatan",
      tipe: "file",
      nilai: "Rekap_Logbook_Kegiatan_Kampus_Berdampak.pdf",
      tautan: "https://drive.google.com/file/d/rekap-logbook.pdf",
    },
    {
      id: "nilai-mitra",
      nama: "Nilai dari Mitra",
      keterangan: "Lembar penilaian dari mentor mitra (PDF)",
      tipe: "file",
      nilai: "Lembar_Penilaian_Evaluasi_Penyelia.pdf",
      tautan: "https://drive.google.com/file/d/lembar-nilai-penyelia.pdf",
    },
    {
      id: "sertifikat",
      nama: "Sertifikat",
      keterangan: "Sertifikat penyelesaian program dari mitra (PDF)",
      tipe: "file",
      nilai: "",
      tautan: "",
    },
    {
      id: "video",
      nama: "Video Sosial Media",
      keterangan:
        "Tautan video dokumentasi kegiatan di Instagram, YouTube, atau TikTok",
      tipe: "link",
      nilai: "",
      tautan: "",
    },
  ],
  folderDrive:
    "https://drive.google.com/drive/folders/berkas-sidang-Kampus-Berdampak-a11-2020-00001",
  linkVideoSosialMedia:
    "https://instagram.com/reel/example-video-kegiatan-mbkm",
  jadwal: {
    tanggal: "Kamis, 15 Januari 2027",
    waktu: "09:00 - 10:30 WIB",
    lokasi: "Google Meet Daring",
    ruang: "Google Meet Daring",
    linkMeet: "https://meet.google.com/Kampus-Berdampak-sidang-a11",
  },
  penguji: [
    {
      inisial: "RA",
      nama: "Dr. Ricardus Anggi, M.Kom",
      peran: "Penguji Akademis 1 & Dosen Pembimbing",
    },
    {
      inisial: "EM",
      nama: "Dr. Ir. Edi Mulyanto, M.Kom",
      peran: "Penguji Akademis 2 (Reviewer Prodi)",
    },
  ],
  hasil: {
    status: "Lulus dengan Pujian",
    nilaiAkhir: "91.50",
    nilaiMutu: "A",
    catatan: "",
    komponen: [
      {
        nama: "Nilai Pembimbingan Dosen Pembimbing",
        nilai: "92.50",
        penilai: "Dr. Ricardus Anggi, M.Kom",
      },
      {
        nama: "Nilai Pengujian Sidang",
        nilai: "92.00",
        penilai: "Dr. Ir. Edi Mulyanto, M.Kom",
      },
    ],
  },
};
