export type BimbinganStatus = 'Diterima' | 'Menunggu' | 'Revisi';

export interface BimbinganEntry {
  id: string;
  pertemuan: number; // 1..5
  tanggal: string;
  topik: string;
  uraian: string;
  dokumenNama?: string;
  status: BimbinganStatus;
  catatanVerifikasi?: string;
}

export interface MahasiswaBimbinganRecord {
  id: number;
  nama: string;
  nim: string;
  skema: string;
  mitra: string;
  targetBimbingan: number; // 5
  entries: BimbinganEntry[];
}

export interface DosenBimbinganRecord {
  id: number;
  nama: string;
  npp: string;
  email: string;
  mahasiswa: MahasiswaBimbinganRecord[];
}

export const logbookBimbinganList: DosenBimbinganRecord[] = [
  {
    id: 1,
    nama: 'Dr. M. Arief Soeleman, M.Kom',
    npp: '0612047801',
    email: 'arief.soeleman@dsn.dinus.ac.id',
    mahasiswa: [
      {
        id: 101,
        nama: 'Faisal Rahman',
        nim: 'A11.2022.13901',
        skema: 'KB Bengkel Koding',
        mitra: 'Bengkel Koding UDINUS',
        targetBimbingan: 5,
        entries: [
          {
            id: '101-1a',
            pertemuan: 1,
            tanggal: '21 Agustus 2026',
            topik: 'Konsultasi BAB 1',
            uraian: 'Konsultasi BAB 1: Identifikasi profil mitra dan perumusan rencana kerja proyek Kampus Berdampak.',
            dokumenNama: 'Konsultasi_BAB1_Faisal.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Lanjutkan penyempurnaan batasan masalah.'
          },
          {
            id: '101-1b',
            pertemuan: 1,
            tanggal: '24 Agustus 2026',
            topik: 'Revisi BAB 1',
            uraian: 'Revisi BAB 1: Perbaikan batasan masalah dan tujuan pengembangan sistem sesuai arahan pembimbing.',
            dokumenNama: 'Revisi_BAB1_Faisal.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Rencana kerja sudah sesuai capaian pembelajaran.'
          },
          {
            id: '101-2',
            pertemuan: 2,
            tanggal: '1 September 2026',
            topik: 'Review Arsitektur & Desain Database',
            uraian: 'Konsultasi perancangan ERD dan relasi antar tabel untuk sistem backend.',
            dokumenNama: 'ERD_Sistem_Faisal.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Struktur relasi tabel sudah baik.'
          },
          {
            id: '101-3',
            pertemuan: 3,
            tanggal: '15 September 2026',
            topik: 'Evaluasi Progres Sprint 1 & API Endpoint',
            uraian: 'Pemaparan hasil implementasi autentikasi dan modul CRUD utama serta perbaikan validasi input.',
            dokumenNama: 'Progres_Sprint1_Faisal.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Lanjutkan ke tahap integrasi frontend.'
          },
          {
            id: '101-4',
            pertemuan: 4,
            tanggal: '29 September 2026',
            topik: 'Pengujian Integrasi & Penyusunan Draft Laporan',
            uraian: 'Konsultasi hasil testing end-to-end serta penyesuaian format bab pendahuluan dan implementasi.',
            dokumenNama: 'Draft_Laporan_B4_Faisal.pdf',
            status: 'Menunggu'
          }
        ]
      },
      {
        id: 102,
        nama: 'Bagas Prasetyo',
        nim: 'A11.2022.14105',
        skema: 'Magang Kuliah Kerja Industri (KKI)',
        mitra: 'PT. Lumintu Sejahtera Mandiri',
        targetBimbingan: 5,
        entries: [
          {
            id: '102-1',
            pertemuan: 1,
            tanggal: '19 Agustus 2026',
            topik: 'Orientasi & Pengenalan Studi Kasus Mitra',
            uraian: 'Pelaporan tugas awal di mitra dan penyelarasan target luaran KKI.',
            dokumenNama: 'Proposal_KKI_Bagas.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Disetujui.'
          },
          {
            id: '102-2',
            pertemuan: 2,
            tanggal: '2 September 2026',
            topik: 'Analisis Kebutuhan Sistem Mitra',
            uraian: 'Validasi kebutuhan fungsional dan alur bisnis proses gudang di mitra.',
            status: 'Diterima',
            catatanVerifikasi: 'Sesuai.'
          },
          {
            id: '102-3',
            pertemuan: 3,
            tanggal: '16 September 2026',
            topik: 'Review Implementasi Modul Inventory',
            uraian: 'Demo fitur pencatatan stok masuk/keluar dan ekspor laporan.',
            dokumenNama: 'Demo_Inventory_Bagas.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Bagus, lanjutkan penyusunan laporan.'
          },
          {
            id: '102-4',
            pertemuan: 4,
            tanggal: '30 September 2026',
            topik: 'Konsultasi Draft Laporan Akhir',
            uraian: 'Pemeriksaan kelengkapan lampiran dokumentasi serta lembar pengesahan mitra.',
            dokumenNama: 'Draft_Laporan_Bagas.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Siap menuju bimbingan final.'
          },
          {
            id: '102-5',
            pertemuan: 5,
            tanggal: '14 Oktober 2026',
            topik: 'Finalisasi Laporan & Persiapan Sidang',
            uraian: 'Review akhir slide presentasi dan kelengkapan berkas sidang Kampus Berdampak.',
            dokumenNama: 'Slide_Sidang_Bagas.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Lengkap, disetujui untuk maju sidang.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    nama: 'Affandy, Ph.D',
    npp: '0617087502',
    email: 'affandy@dsn.dinus.ac.id',
    mahasiswa: [
      {
        id: 201,
        nama: 'Dimas Bagus Setiawan',
        nim: 'A12.2022.09915',
        skema: 'Industrial Visit ke Luar Negri',
        mitra: 'Universiti Teknologi Malaysia (UTM)',
        targetBimbingan: 5,
        entries: [
          {
            id: '201-1',
            pertemuan: 1,
            tanggal: '20 Agustus 2026',
            topik: 'Persiapan Agenda & Luaran Industrial Visit',
            uraian: 'Penetapan fokus observasi industri dan format laporan kunjungan internasional.',
            dokumenNama: 'Rencana_Kunjungan_Dimas.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Oke, catat seluruh sesi seminar.'
          },
          {
            id: '201-2',
            pertemuan: 2,
            tanggal: '5 September 2026',
            topik: 'Laporan Observasi & Studi Komparasi',
            uraian: 'Menyerahkan ringkasan hasil kunjungan ke lab riset dan perusahaan teknologi.',
            dokumenNama: 'Ringkasan_Observasi_Dimas.pdf',
            status: 'Menunggu'
          },
          {
            id: '201-3',
            pertemuan: 3,
            tanggal: '21 September 2026',
            topik: 'Penyusunan Bab Analisis & Rekomendasi',
            uraian: 'Konsultasi hasil analisis komparasi implementasi teknologi cloud.',
            status: 'Menunggu'
          }
        ]
      },
      {
        id: 202,
        nama: 'Putra Mahendra',
        nim: 'A11.2022.14308',
        skema: 'Student Mobility ke UGM',
        mitra: 'Universitas Gadjah Mada',
        targetBimbingan: 5,
        entries: [
          {
            id: '202-1',
            pertemuan: 1,
            tanggal: '22 Agustus 2026',
            topik: 'Penyelarasan KRS & Konversi SKS',
            uraian: 'Verifikasi daftar mata kuliah yang diambil di kampus tujuan agar ekuivalen 20 SKS.',
            dokumenNama: 'KRS_Mobility_Putra.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Ekuivalensi SKS sudah sesuai.'
          },
          {
            id: '202-2',
            pertemuan: 2,
            tanggal: '10 September 2026',
            topik: 'Evaluasi Tengah Semester Perkuliahan',
            uraian: 'Pelaporan progres proyek kelompok pada mata kuliah Kecerdasan Buatan di UGM.',
            status: 'Revisi',
            catatanVerifikasi: 'Mohon lampirkan bukti presensi dan nilai tugas tengah semester.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nama: 'Christy Atika Sari, M.Kom',
    npp: '0629038401',
    email: 'christy.atika@dsn.dinus.ac.id',
    mahasiswa: [
      {
        id: 301,
        nama: 'Nabila Zahra Putri',
        nim: 'A12.2022.09842',
        skema: 'Studi Independen',
        mitra: 'Dicoding',
        targetBimbingan: 5,
        entries: [
          {
            id: '301-1',
            pertemuan: 1,
            tanggal: '21 Agustus 2026',
            topik: 'Pemetaan Kurikulum Studi Independen',
            uraian: 'Konsultasi silabus Front-End & Back-End Web Developer di Dicoding.',
            dokumenNama: 'Silabus_Dicoding_Nabila.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Sesuai dengan konversi mata kuliah.'
          },
          {
            id: '301-2',
            pertemuan: 2,
            tanggal: '8 September 2026',
            topik: 'Review Submission & Capstone Plan',
            uraian: 'Penyerahan sertifikat modul dasar dan rancangan proyek capstone tim.',
            dokumenNama: 'Capstone_Plan_Nabila.pdf',
            status: 'Menunggu'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    nama: 'Dr. Muljono, S.Si, M.Kom',
    npp: '0619087201',
    email: 'muljono@dsn.dinus.ac.id',
    mahasiswa: [
      {
        id: 401,
        nama: 'Annisa Tri Rahayu',
        nim: 'A11.2022.14201',
        skema: 'Joint Project',
        mitra: 'IDSS',
        targetBimbingan: 5,
        entries: [
          {
            id: '401-1',
            pertemuan: 1,
            tanggal: '24 Agustus 2026',
            topik: 'Perancangan Metodologi Riset & Dataset',
            uraian: 'Pembahasan skema preprocessing dataset citra untuk proyek bersama.',
            dokumenNama: 'Metodologi_Annisa.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Lanjutkan ke tahap eksperimen baseline.'
          },
          {
            id: '401-2',
            pertemuan: 2,
            tanggal: '12 September 2026',
            topik: 'Evaluasi Akurasi Model Tahap Awal',
            uraian: 'Diskusi hasil pelatihan model baseline dan strategi augmentasi data.',
            dokumenNama: 'Evaluasi_Model_Annisa.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Hasil cukup menjanjikan.'
          },
          {
            id: '401-3',
            pertemuan: 3,
            tanggal: '26 September 2026',
            topik: 'Review Draf Artikel & Laporan Joint Project',
            uraian: 'Konsultasi struktur penulisan artikel luaran dan bab hasil penelitian.',
            dokumenNama: 'Draft_Artikel_Annisa.pdf',
            status: 'Menunggu'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    nama: 'Eko Hari Rachmawanto, M.Kom',
    npp: '0615098301',
    email: 'eko.hari@dsn.dinus.ac.id',
    mahasiswa: [
      {
        id: 501,
        nama: 'Rizky Aditya Pratama',
        nim: 'A11.2022.14012',
        skema: 'Riset bersama Bidang Kajian',
        mitra: 'Matics',
        targetBimbingan: 5,
        entries: [
          {
            id: '501-1',
            pertemuan: 1,
            tanggal: '25 Agustus 2026',
            topik: 'Studi Literatur & Penentuan Parameter Riset',
            uraian: 'Review 10 paper referensi dan perumusan masalah riset bidang kajian.',
            dokumenNama: 'Literatur_Rizky.pdf',
            status: 'Menunggu'
          }
        ]
      },
      {
        id: 502,
        nama: 'Siti Aminah',
        nim: 'A12.2022.09911',
        skema: 'Kuliah Kerja Usaha',
        mitra: 'Vinix',
        targetBimbingan: 5,
        entries: [
          {
            id: '502-1',
            pertemuan: 1,
            tanggal: '26 Agustus 2026',
            topik: 'Validasi Rencana Bisnis KKU',
            uraian: 'Review Business Model Canvas dan target penjualan mitra UMKM.',
            status: 'Diterima',
            catatanVerifikasi: 'BMC sudah jelas.'
          },
          {
            id: '502-2',
            pertemuan: 2,
            tanggal: '14 September 2026',
            topik: 'Evaluasi Strategi Pemasaran Digital',
            uraian: 'Analisis performa konten sosial media dan katalog digital UMKM.',
            dokumenNama: 'Laporan_Digital_Siti.pdf',
            status: 'Diterima',
            catatanVerifikasi: 'Pertahankan tren peningkatan.'
          }
        ]
      }
    ]
  }
];
