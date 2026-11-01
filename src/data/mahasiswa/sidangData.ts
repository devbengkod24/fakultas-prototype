// src/data/mahasiswa/sidangData.ts

export interface BerkasSidang {
  nama: string;
  kategori: string;
  ukuran: string;
  status: string;
  link: string;
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
  berkas: BerkasSidang[];
  folderDrive: string;
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
  alamatPerusahaan: "Jl. Pahlawan No. 10, Pleburan, Kec. Semarang Selatan, Kota Semarang, Jawa Tengah 50241",
  dosenPembimbing: "Dr. Ricardus Anggi, M.Kom",
  linkSuratDiterima: "https://drive.google.com/file/d/demo-surat-magang/view",
  penyelia: {
    nama: "Budi Santoso, S.Kom.",
    posisi: "Senior Lead Software Engineer",
    perusahaan: "PT Telkom Indonesia",
    telepon: "081234567891",
    nilaiEvaluasi: "90",
  },
  berkas: [
    {
      nama: "Laporan_Akhir_Kampus_Berdampak_A11.2020.00001.pdf",
      kategori: "Draf Laporan Akhir Kampus Berdampak",
      ukuran: "4.8 MB",
      status: "Terverifikasi Dospem",
      link: "https://drive.google.com/file/d/laporan-akhir-Kampus-Berdampak-a11.pdf",
    },
    {
      nama: "Lembar_Penilaian_Evaluasi_Penyelia.pdf",
      kategori: "Formulir Nilai Pembimbing Lapangan",
      ukuran: "1.5 MB",
      status: "Nilai: 90 (A)",
      link: "https://drive.google.com/file/d/lembar-nilai-penyelia.pdf",
    },
    {
      nama: "Sertifikat_Penyelesaian_Magang_Telkom.pdf",
      kategori: "Sertifikat Resmi Kontributor",
      ukuran: "1.2 MB",
      status: "Terverifikasi Kontributor",
      link: "https://drive.google.com/file/d/sertifikat-telkom.pdf",
    },
    {
      nama: "Rekap_Logbook_Kegiatan_Kampus_Berdampak.pdf",
      kategori: "Rekapitulasi Logbook Mingguan",
      ukuran: "850 KB",
      status: "Lengkap (100%)",
      link: "https://drive.google.com/file/d/rekap-logbook.pdf",
    },
  ],
  folderDrive: "https://drive.google.com/drive/folders/berkas-sidang-Kampus-Berdampak-a11-2020-00001",
  jadwal: {
    tanggal: "Kamis, 15 Januari 2027",
    waktu: "09:00 - 10:30 WIB",
    lokasi: "Lab Bengkel Koding (Gedung H Lt. 5) & Google Meet Daring",
    ruang: "Ruang Sidang H.5.2",
    linkMeet: "https://meet.google.com/Kampus-Berdampak-sidang-a11",
  },
  penguji: [
    {
      inisial: "RA",
      nama: "Dr. Ricardus Anggi, M.Kom",
      peran: "Penguji Akademis 1 & Dosen Pembimbing",
      bobot: "40%",
    },
    {
      inisial: "EM",
      nama: "Dr. Ir. Edi Mulyanto, M.Kom",
      peran: "Penguji Akademis 2 (Reviewer Prodi)",
      bobot: "30%",
    },
    {
      inisial: "BS",
      nama: "Budi Santoso, S.Kom.",
      peran: "Penilai Kinerja Kontributor (Penyelia Mitra)",
      bobot: "30%",
    },
  ],
  hasil: {
    status: "Lulus dengan Pujian",
    nilaiAkhir: "91.50",
    nilaiMutu: "A",
    catatan: "Presentasi dan luaran proyek dashboard sistem magang dinilai sangat baik oleh dewan penguji.",
    komponen: [
      {
        nama: "Nilai Kinerja Mitra Kontributor",
        bobot: "30%",
        nilai: "90.00",
        penilai: "Budi Santoso, S.Kom.",
      },
      {
        nama: "Nilai Pembimbingan Dosen Pembimbing",
        bobot: "40%",
        nilai: "92.50",
        penilai: "Dr. Ricardus Anggi, M.Kom",
      },
      {
        nama: "Nilai Pengujian Sidang Evaluasi",
        bobot: "30%",
        nilai: "92.00",
        penilai: "Dr. Ir. Edi Mulyanto, M.Kom",
      },
    ],
  },
};
