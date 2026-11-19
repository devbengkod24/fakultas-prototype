export type LogbookStatus = 'Diterima' | 'Menunggu' | 'Revisi';

export interface LogbookEntry {
  id: string;
  tanggal: string;
  status: LogbookStatus;
  deskripsi: string;
  dokumenNama: string;
  catatanDospem?: string;
}

export interface WeeklyLogbook {
  minggu: number;
  status: LogbookStatus;
  terakhir: string;
  entries: LogbookEntry[];
}

export interface MahasiswaLogbookRecord {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  mitra: string;
  program: string;
  dosenPembimbing: string;
  mingguAktif: number;
  totalMinggu: number;
  statusProgres: 'aktif' | 'selesai' | 'belum';
  weeks: WeeklyLogbook[];
}

const sampleTopics = [
  'Orientasi lingkungan kerja mitra, pengenalan alur proyek, dan penyusunan rencana kerja mingguan.',
  'Analisis kebutuhan sistem, perancangan arsitektur modul, dan sinkronisasi backlog bersama mentor industri.',
  'Implementasi komponen antarmuka utama dan integrasi endpoint REST API tahap awal.',
  'Pengujian fungsional fitur, perbaikan bug integrasi, dan review kode mingguan bersama tim.',
  'Optimasi performa query, penyusunan dokumentasi teknis, serta evaluasi capaian sprint.',
  'Penyusunan laporan kemajuan berkala, konsultasi dengan Dosen Pembimbing, dan validasi luaran.',
];

function buildWeeks(studentId: number, count: number, hasPendingLast = false, hasRevisionAt?: number): WeeklyLogbook[] {
  const weeks: WeeklyLogbook[] = [];
  const startBase = new Date(2026, 7, 17); // 17 Agu 2026
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const bulanPendek = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  for (let w = 1; w <= count; w++) {
    const endDate = new Date(startBase.getTime() + (w * 7 - 2) * 86400000);
    const midDate = new Date(endDate.getTime() - 3 * 86400000);
    const formatLong = (d: Date) => `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    const formatShort = (d: Date) => `${hari[d.getDay()]}, ${d.getDate()} ${bulanPendek[d.getMonth()]} ${d.getFullYear()}`;

    let status: LogbookStatus = 'Diterima';
    if (hasRevisionAt && w === hasRevisionAt) status = 'Revisi';
    else if (hasPendingLast && w === count) status = 'Menunggu';

    const topic = sampleTopics[(w + studentId) % sampleTopics.length];
    const entries: LogbookEntry[] = [
      {
        id: `${studentId}-w${w}-1`,
        tanggal: formatShort(endDate),
        status,
        deskripsi: `Aktivitas Minggu ${w}: ${topic}`,
        dokumenNama: `Logbook_Minggu_${w}_Mhs${studentId}.pdf`,
        catatanDospem:
          status === 'Revisi'
            ? 'Mohon lengkapi bukti dokumentasi screenshot progres dan detail jam kerja.'
            : status === 'Diterima'
              ? 'Progres sesuai target mingguan.'
              : undefined,
      },
    ];

    if (w % 3 === 1) {
      entries.push({
        id: `${studentId}-w${w}-2`,
        tanggal: formatShort(midDate),
        status: 'Diterima',
        deskripsi: `Catatan harian & koordinasi tim mitra pada awal Minggu ${w} terkait pembagian tugas dan target mingguan.`,
        dokumenNama: `Catatan_Koordinasi_M${w}.pdf`,
      });
    }

    weeks.push({
      minggu: w,
      status,
      terakhir: formatLong(endDate),
      entries,
    });
  }

  return weeks;
}

export const logbookKegiatanList: MahasiswaLogbookRecord[] = [
  {
    id: 1,
    nama: 'Faisal Rahman',
    nim: 'A11.2022.13901',
    prodi: 'Teknik Informatika',
    mitra: 'Dicoding',
    program: 'Studi Independen Cloud & DevOps',
    dosenPembimbing: 'Dr. M. Arief Soeleman, M.Kom',
    mingguAktif: 14,
    totalMinggu: 24,
    statusProgres: 'aktif',
    weeks: buildWeeks(1, 14, true),
  },
  {
    id: 2,
    nama: 'Tarissa Aura Azzahra',
    nim: 'A11.2020.13158',
    prodi: 'Teknik Informatika',
    mitra: 'Vinix',
    program: 'Magang Backend Engineer',
    dosenPembimbing: 'Affandy, Ph.D',
    mingguAktif: 24,
    totalMinggu: 24,
    statusProgres: 'selesai',
    weeks: buildWeeks(2, 24, false),
  },
  {
    id: 3,
    nama: 'Nabila Zahra Putri',
    nim: 'A12.2022.09842',
    prodi: 'Sistem Informasi',
    mitra: 'IDSS',
    program: 'Studi Independen Front-End & Back-End',
    dosenPembimbing: 'Christy Atika Sari, M.Kom',
    mingguAktif: 9,
    totalMinggu: 24,
    statusProgres: 'aktif',
    weeks: buildWeeks(3, 9, false, 9),
  },
  {
    id: 4,
    nama: 'Rizky Aditya Pratama',
    nim: 'A11.2022.14012',
    prodi: 'Teknik Informatika',
    mitra: 'Matics',
    program: 'Magang Sistem Informasi Publik',
    dosenPembimbing: 'Eko Hari Rachmawanto, M.Kom',
    mingguAktif: 3,
    totalMinggu: 24,
    statusProgres: 'aktif',
    weeks: buildWeeks(4, 3, true),
  },
  {
    id: 5,
    nama: 'Dimas Wahyu Nugroho',
    nim: 'A11.2021.13450',
    prodi: 'Teknik Informatika',
    mitra: 'BTIK',
    program: 'Magang Data Analytics',
    dosenPembimbing: 'Dr. Muljono, S.Si, M.Kom',
    mingguAktif: 19,
    totalMinggu: 24,
    statusProgres: 'aktif',
    weeks: buildWeeks(5, 19, false),
  },
  {
    id: 6,
    nama: 'Dewi Lestari Kusuma',
    nim: 'A14.2022.03211',
    prodi: 'Desain Komunikasi Visual',
    mitra: 'MBKM Bengkel Koding',
    program: 'Magang UI/UX Product Design',
    dosenPembimbing: 'Ajib Susanto, M.Kom',
    mingguAktif: 0,
    totalMinggu: 24,
    statusProgres: 'belum',
    weeks: [],
  },
];
