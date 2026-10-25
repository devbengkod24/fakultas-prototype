// src/data/dosen/mock-data.ts
import type {
  DosenProfile,
  MahasiswaBinaan,
  LogbookMingguan,
  PengajuanSidangDosen,
  SidangDosen,
  PengumumanDosenItem,
  LogAktivitasDosenItem
} from './types';

export const DOSEN_PROFILE: DosenProfile = {
  nidn: "0686.11.1993.102",
  nama: "Dr. Muljono",
  gelar: "S.Si, M.Kom",
  email: "dosen_a11@dev",
  prodi: "S1 Teknik Informatika (A11)",
  avatar: "MJ",
  kuotaMax: 8,
  kuotaTerpakai: 6,
  waGroupLink: "https://chat.whatsapp.com/demo-mbkm-dosen-muljono",
  waGroupName: "Bimbingan MBKM 2026/2027 — Dr. Muljono"
};

export const MOCK_MAHASISWA_BINAAN: MahasiswaBinaan[] = [
  {
    id: "mhs-1",
    nim: "A11.2021.13782",
    nama: "Ahmad Rizky Pratama",
    avatar: "AR",
    email: "111202113782@mhs.dinus.ac.id",
    noWa: "081234567890",
    prodi: "S1 Teknik Informatika",
    kontributor: "PT Telkom Indonesia (Persero) Tbk",
    skema: "Magang Industri",
    posisi: "Cloud Infrastructure Specialist",
    mentor: "Hendro Wibowo, S.T. (Senior Cloud Architect)",
    status: "Aktif",
    progressLogbook: 75,
    mingguTerakhir: 8,
    totalLogbook: 8,
    hasUnapprovedLogbook: true,
    ipk: 3.82,
    sksTempuh: 114,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54301", nama: "Cloud Computing Enterprise", sks: 4, status: "disetujui" },
      { kode: "A11.54302", nama: "DevOps & CI/CD Pipeline", sks: 4, status: "disetujui" },
      { kode: "A11.54303", nama: "Keamanan Sistem Jaringan Lanjut", sks: 3, status: "disetujui" },
      { kode: "A11.54304", nama: "Proyek Kolaboratif Industri", sks: 6, status: "disetujui" },
      { kode: "A11.54305", nama: "Komunikasi Profesional & Leadership", sks: 3, status: "disetujui" }
    ]
  },
  {
    id: "mhs-2",
    nim: "A11.2021.13801",
    nama: "Siti Nurhaliza",
    avatar: "SN",
    email: "111202113801@mhs.dinus.ac.id",
    noWa: "081234567891",
    prodi: "S1 Teknik Informatika",
    kontributor: "Dicoding Indonesia",
    skema: "Studi Independen",
    posisi: "Machine Learning & AI Developer",
    mentor: "Adrianus Bagus, M.Sc (Lead AI Instructor)",
    status: "Aktif",
    progressLogbook: 62,
    mingguTerakhir: 8,
    totalLogbook: 7,
    hasUnapprovedLogbook: true,
    ipk: 3.74,
    sksTempuh: 110,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54401", nama: "Kecerdasan Buatan Terapan", sks: 4, status: "disetujui" },
      { kode: "A11.54402", nama: "Deep Learning & Computer Vision", sks: 4, status: "disetujui" },
      { kode: "A11.54403", nama: "Etika Data & AI Governance", sks: 2, status: "disetujui" },
      { kode: "A11.54404", nama: "Capstone Project AI Solution", sks: 6, status: "disetujui" },
      { kode: "A11.54405", nama: "Problem Solving Industri", sks: 4, status: "disetujui" }
    ]
  },
  {
    id: "mhs-3",
    nim: "A11.2021.13840",
    nama: "Budi Santoso",
    avatar: "BS",
    email: "111202113840@mhs.dinus.ac.id",
    noWa: "081234567892",
    prodi: "S1 Teknik Informatika",
    kontributor: "GoTo Impact Foundation",
    skema: "Studi Independen",
    posisi: "Fullstack Web & Mobile Track",
    mentor: "Rina Kusuma (Tech Lead GoTo)",
    status: "Aktif",
    progressLogbook: 87,
    mingguTerakhir: 8,
    totalLogbook: 8,
    hasUnapprovedLogbook: false,
    ipk: 3.65,
    sksTempuh: 108,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54501", nama: "Rekayasa Perangkat Lunak Lanjut", sks: 4, status: "disetujui" },
      { kode: "A11.54502", nama: "Pengembangan Web Skala Enterprise", sks: 4, status: "disetujui" },
      { kode: "A11.54503", nama: "Mobile Application Engineering", sks: 4, status: "disetujui" },
      { kode: "A11.54504", nama: "Kerja Praktik Lapangan", sks: 4, status: "disetujui" },
      { kode: "A11.54505", nama: "Manajemen Proyek Agile", sks: 4, status: "disetujui" }
    ]
  },
  {
    id: "mhs-4",
    nim: "A11.2021.13910",
    nama: "Dimas Wahyu Pratama",
    avatar: "DW",
    email: "111202113910@mhs.dinus.ac.id",
    noWa: "081234567893",
    prodi: "S1 Teknik Informatika",
    kontributor: "PT Bank Mandiri (Persero) Tbk",
    skema: "Magang Industri",
    posisi: "Cyber Security & SOC Analyst",
    mentor: "Bambang Sudibyo (Head of IT Security)",
    status: "Perlu Supervisi",
    progressLogbook: 43,
    mingguTerakhir: 6,
    totalLogbook: 5,
    hasUnapprovedLogbook: true,
    ipk: 3.51,
    sksTempuh: 104,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54601", nama: "Audit & Kepatuhan Keamanan Siber", sks: 4, status: "disetujui" },
      { kode: "A11.54602", nama: "Analisis Forensik Digital", sks: 4, status: "disetujui" },
      { kode: "A11.54603", nama: "Keamanan FinTech & API", sks: 4, status: "disetujui" },
      { kode: "A11.54604", nama: "Mitigasi Insiden Keamanan", sks: 4, status: "disetujui" },
      { kode: "A11.54605", nama: "Kecakapan Kerja Industri", sks: 4, status: "disetujui" }
    ]
  },
  {
    id: "mhs-5",
    nim: "A11.2021.13955",
    nama: "Fani Rahmawati",
    avatar: "FR",
    email: "111202113955@mhs.dinus.ac.id",
    noWa: "081234567894",
    prodi: "S1 Teknik Informatika",
    kontributor: "Traveloka Services Pte Ltd",
    skema: "Magang Industri",
    posisi: "Product Operations Analyst",
    mentor: "Jessica Tan (Product Operations Lead)",
    status: "Aktif",
    progressLogbook: 94,
    mingguTerakhir: 8,
    totalLogbook: 8,
    hasUnapprovedLogbook: false,
    ipk: 3.88,
    sksTempuh: 118,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54701", nama: "Analisis Kebutuhan Bisnis TI", sks: 4, status: "disetujui" },
      { kode: "A11.54702", nama: "Product Discovery & Validasi UX", sks: 4, status: "disetujui" },
      { kode: "A11.54703", nama: "E-Commerce System Analytics", sks: 4, status: "disetujui" },
      { kode: "A11.54704", nama: "Studi Lapangan Industri", sks: 4, status: "disetujui" },
      { kode: "A11.54705", nama: "Komunikasi Multikultural", sks: 4, status: "disetujui" }
    ]
  },
  {
    id: "mhs-6",
    nim: "A11.2021.14002",
    nama: "Kevin Sanjaya Putra",
    avatar: "KS",
    email: "111202114002@mhs.dinus.ac.id",
    noWa: "081234567895",
    prodi: "S1 Teknik Informatika",
    kontributor: "Tokopedia (GoTo Group)",
    skema: "Magang Industri",
    posisi: "Backend Microservices Developer",
    mentor: "Teguh Santosa (Principal Engineer)",
    status: "Aktif",
    progressLogbook: 100,
    mingguTerakhir: 8,
    totalLogbook: 8,
    hasUnapprovedLogbook: true,
    ipk: 3.78,
    sksTempuh: 116,
    dosenPA: "Dr. Muljono, S.Si, M.Kom",
    konversiMatkul: [
      { kode: "A11.54801", nama: "Arsitektur Microservices Lanjut", sks: 4, status: "disetujui" },
      { kode: "A11.54802", nama: "High Performance Database Design", sks: 4, status: "disetujui" },
      { kode: "A11.54803", nama: "Distributed Event-Driven Architecture", sks: 4, status: "disetujui" },
      { kode: "A11.54804", nama: "Penerapan Industri Nyata", sks: 4, status: "disetujui" },
      { kode: "A11.54805", nama: "Etika Rekayasa Perangkat Lunak", sks: 4, status: "disetujui" }
    ]
  }
];

export const MOCK_LOGBOOK_MINGGUAN: LogbookMingguan[] = [
  {
    id: "lb-1",
    mahasiswaId: "mhs-1",
    mingguKe: 8,
    tanggalMulai: "12 Okt 2026",
    tanggalSelesai: "16 Okt 2026",
    uraian: "Optimasi latensi API gateway Telkom menggunakan cluster Redis caching dan konfig auto-scaling grup k8s.",
    status: "pending",
    lampiran: "https://example.com/laporan-m8-ahmad.pdf",
    updatedAt: "17 Okt 2026, 09:14 WIB"
  },
  {
    id: "lb-2",
    mahasiswaId: "mhs-1",
    mingguKe: 7,
    tanggalMulai: "05 Okt 2026",
    tanggalSelesai: "09 Okt 2026",
    uraian: "Implementasi monitoring service berbasis Prometheus dan Grafana alert manager untuk pipeline microservices.",
    status: "accepted",
    lampiran: "https://example.com/laporan-m7-ahmad.pdf",
    updatedAt: "10 Okt 2026, 14:30 WIB"
  },
  {
    id: "lb-3",
    mahasiswaId: "mhs-2",
    mingguKe: 8,
    tanggalMulai: "12 Okt 2026",
    tanggalSelesai: "16 Okt 2026",
    uraian: "Fine-tuning model YOLOv8 untuk deteksi cacat visual komponen elektronik dan integrasi ke backend FastAPI.",
    status: "pending",
    lampiran: "https://example.com/laporan-m8-siti.pdf",
    updatedAt: "17 Okt 2026, 11:45 WIB"
  },
  {
    id: "lb-4",
    mahasiswaId: "mhs-2",
    mingguKe: 7,
    tanggalMulai: "05 Okt 2026",
    tanggalSelesai: "09 Okt 2026",
    uraian: "Eksplorasi augmentasi dataset citra dan hyperparameter tuning pada convolutional neural networks.",
    status: "revised",
    catatanRevisi: "Tolong lengkapi metrik evaluasi F1-Score dan Confusion Matrix per kelas sebelum di-ACC.",
    updatedAt: "08 Okt 2026, 16:00 WIB"
  },
  {
    id: "lb-5",
    mahasiswaId: "mhs-4",
    mingguKe: 6,
    tanggalMulai: "28 Sep 2026",
    tanggalSelesai: "02 Okt 2026",
    uraian: "Simulasi penetration testing berkala pada internal endpoint staging Bank Mandiri dan penyusunan mitigasi CVE.",
    status: "pending",
    lampiran: "https://example.com/laporan-m6-dimas.pdf",
    updatedAt: "03 Okt 2026, 13:20 WIB"
  },
  {
    id: "lb-6",
    mahasiswaId: "mhs-6",
    mingguKe: 8,
    tanggalMulai: "12 Okt 2026",
    tanggalSelesai: "16 Okt 2026",
    uraian: "Pengujian beban (stress test) payment gateway microservice menggunakan Apache JMeter hingga 10.000 RPS.",
    status: "pending",
    lampiran: "https://example.com/laporan-m8-kevin.pdf",
    updatedAt: "17 Okt 2026, 15:30 WIB"
  }
];

export const MOCK_PENGAJUAN_SIDANG: PengajuanSidangDosen[] = [
  {
    id: "ps-1",
    mahasiswaId: "mhs-1",
    judulLaporan: "Implementasi Arsitektur Multi-Cloud dan Monitoring Otomatis pada Infrastruktur Layanan Telkom",
    kontributor: "PT Telkom Indonesia (Persero) Tbk",
    mentor: "Hendro Wibowo, S.T.",
    dokumenLaporanPdf: "https://example.com/laporan-akhir-ahmad-rizky.pdf",
    dokumenNilaiKontributorPdf: "https://example.com/lembar-nilai-kontributor-ahmad.pdf",
    nilaiKontributor: 90.5,
    tanggalPengajuan: "15 Okt 2026",
    status: "menunggu_review"
  },
  {
    id: "ps-2",
    mahasiswaId: "mhs-5",
    judulLaporan: "Optimasi Alur Konversi Tiket Perjalanan Melalui Analisis Pola Interaksi Pengguna di Traveloka",
    kontributor: "Traveloka Services Pte Ltd",
    mentor: "Jessica Tan",
    dokumenLaporanPdf: "https://example.com/laporan-akhir-fani.pdf",
    dokumenNilaiKontributorPdf: "https://example.com/lembar-nilai-kontributor-fani.pdf",
    nilaiKontributor: 92.0,
    tanggalPengajuan: "14 Okt 2026",
    status: "acc_maju_sidang"
  },
  {
    id: "ps-3",
    mahasiswaId: "mhs-6",
    judulLaporan: "Rancang Bangun Resilient Message Broker Menggunakan Apache Kafka pada Transaksi Pembayaran Tokopedia",
    kontributor: "Tokopedia (GoTo Group)",
    mentor: "Teguh Santosa",
    dokumenLaporanPdf: "https://example.com/laporan-akhir-kevin.pdf",
    dokumenNilaiKontributorPdf: "https://example.com/lembar-nilai-kontributor-kevin.pdf",
    nilaiKontributor: 94.0,
    tanggalPengajuan: "10 Okt 2026",
    status: "acc_maju_sidang"
  }
];

export const MOCK_JADWAL_SIDANG: SidangDosen[] = [
  {
    id: "sd-1",
    mahasiswaId: "mhs-5",
    judulLaporan: "Optimasi Alur Konversi Tiket Perjalanan Melalui Analisis Pola Interaksi Pengguna di Traveloka",
    tanggalSidang: "22 Okt 2026",
    jamSidang: "09:30 - 11:00 WIB",
    ruangMeeting: "Ruang Sidang H.4.2 / Google Meet",
    linkMeeting: "https://meet.google.com/fik-mbkm-eval",
    nilaiKontributor: 92.0,
    nilaiDpl: null,
    nilaiAkhir: null,
    grade: null,
    status: "terjadwal"
  },
  {
    id: "sd-2",
    mahasiswaId: "mhs-6",
    judulLaporan: "Rancang Bangun Resilient Message Broker Menggunakan Apache Kafka pada Transaksi Pembayaran Tokopedia",
    tanggalSidang: "23 Okt 2026",
    jamSidang: "13:00 - 14:30 WIB",
    ruangMeeting: "Ruang Sidang H.4.3 / Google Meet",
    linkMeeting: "https://meet.google.com/fik-mbkm-eval-2",
    nilaiKontributor: 94.0,
    nilaiDpl: 91.0,
    nilaiAkhir: 92.8,
    grade: "A",
    status: "selesai"
  }
];

export const MOCK_PENGUMUMAN_DOSEN: PengumumanDosenItem[] = [
  {
    id: "pg-1",
    judul: "Jadwal Pengisian Nilai Sidang Evaluasi Akhir MBKM Gasal 2026/2027",
    tanggal: "16 Okt 2026",
    waktu: "08:30 WIB",
    pengirim: "Nurul Anisa, M.Cs (Koordinator MBKM)",
    kategori: "Sidang Evaluasi",
    ringkasan: "Batas akhir penginputan nilai sidang evaluasi Dosen Pembimbing dan penutupan berita acara resmi prodi.",
    kontenLengkap: "Diberitahukan kepada seluruh Dosen Pembimbing MBKM bahwa masa input nilai evaluasi akhir melalui portal dosen akan ditutup pada tanggal 30 Oktober 2026 pukul 23:59 WIB. Pastikan lembar penilaian kinerja industri dari mentor (bobot 60%) telah diverifikasi sebelum melakukan input nilai penguji Dosen Pembimbing (bobot 40%).",
    lampiranNama: "Panduan_Input_Nilai_Sidang_MBKM.pdf",
    lampiranUrl: "https://example.com/panduan-nilai.pdf",
    isPinned: true
  },
  {
    id: "pg-2",
    judul: "Panduan Review dan ACC Logbook Mingguan Mahasiswa di Industri",
    tanggal: "10 Okt 2026",
    waktu: "13:15 WIB",
    pengirim: "Dekanat FIK Udinus",
    kategori: "Bimbingan Dospem",
    ringkasan: "SOP pemeriksaan kepatuhan logbook mingguan dan tata cara pemberian catatan revisi berkala.",
    kontenLengkap: "Dosen Pembimbing diwajibkan melakukan peninjauan logbook mahasiswa binaan minimal satu minggu sekali. Jika mahasiswa tidak mengisi logbook selama 2 minggu berturut-turut, Dospem dimohon melakukan supervisi atau mengontak mahasiswa dan mentor kontributor terkait.",
    lampiranNama: "SOP_Supervisi_Logbook_Dospem_2026.pdf",
    lampiranUrl: "https://example.com/sop-logbook.pdf",
    isPinned: false
  },
  {
    id: "pg-3",
    judul: "Format Standar Penulisan Laporan Akhir & Verifikasi Luaran Wajib",
    tanggal: "02 Okt 2026",
    waktu: "10:00 WIB",
    pengirim: "Tim Kurikulum FIK",
    kategori: "Kebijakan Fakultas",
    ringkasan: "Template resmi naskah laporan akhir dan dokumen kelayakan konversi mata kuliah hingga 20 SKS.",
    kontenLengkap: "Format penulisan laporan akhir MBKM disesuaikan dengan Capaian Pembelajaran Lulusan (CPL) program studi. Berkas draf wajib disetujui Dosen Pembimbing sebelum pendaftaran jadwal sidang dapat disahkan oleh koordinator.",
    lampiranNama: "Template_Laporan_Akhir_MBKM_FIK.docx",
    lampiranUrl: "https://example.com/template-laporan.docx",
    isPinned: false
  }
];

export const MOCK_LOG_AKTIVITAS_DOSEN: LogAktivitasDosenItem[] = [
  {
    id: "log-1",
    timestamp: "18 Okt 2026, 14:10 WIB",
    modul: "Logbook Mahasiswa",
    aksi: "Persetujuan Logbook M-7",
    mahasiswaNama: "Budi Santoso",
    mahasiswaNim: "A11.2021.13840",
    rincian: "Menyetujui entri catatan mingguan ke-7 tanpa catatan revisi."
  },
  {
    id: "log-2",
    timestamp: "17 Okt 2026, 16:30 WIB",
    modul: "Sidang Evaluasi",
    aksi: "Input Nilai Sidang Akhir",
    mahasiswaNama: "Kevin Sanjaya Putra",
    mahasiswaNim: "A11.2021.14002",
    rincian: "Menginput nilai evaluasi Dosen Pembimbing 91.00 (Nilai Komposit: 92.80, Grade A). Berita acara diterbitkan."
  },
  {
    id: "log-3",
    timestamp: "16 Okt 2026, 10:20 WIB",
    modul: "Laporan Akhir",
    aksi: "Validasi Kelayakan Maju Sidang",
    mahasiswaNama: "Fani Rahmawati",
    mahasiswaNim: "A11.2021.13955",
    rincian: "Menyetujui draf laporan akhir dan dokumen nilai mentor Traveloka (92.00)."
  },
  {
    id: "log-4",
    timestamp: "14 Okt 2026, 11:05 WIB",
    modul: "Logbook Mahasiswa",
    aksi: "Kirim Catatan Revisi",
    mahasiswaNama: "Siti Nurhaliza",
    mahasiswaNim: "A11.2021.13801",
    rincian: "Meminta revisi entri logbook M-7 untuk melengkapi grafik metrik evaluasi F1-Score model."
  },
  {
    id: "log-5",
    timestamp: "10 Okt 2026, 09:15 WIB",
    modul: "Bimbingan",
    aksi: "Koordinasi Pembimbingan Mandiri",
    mahasiswaNama: "Ahmad Rizky Pratama",
    mahasiswaNim: "A11.2021.13782",
    rincian: "Review progres arsitektur deployment cloud Telkom via WhatsApp Group bimbingan."
  }
];
