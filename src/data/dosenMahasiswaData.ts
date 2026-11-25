// src/data/dosenMahasiswaData.ts

export interface LogbookLampiran {
  judul: string;
  gambarUrl: string;
  tipe?: string;
}

export interface LogbookEntry {
  minggu: number;
  tanggalMulai: string;
  tanggalSelesai: string;
  kegiatan: string[];
  hasil: string[];
  lampiran?: LogbookLampiran[];
  deskripsi: string;
  buktiLink: string;
  status: "Disetujui" | "Perlu Review" | "Belum Diisi";
  catatanDosen: string;
}

export interface Student {
  id: number;
  nama: string;
  nim: string;
  prodi: string;
  email: string;
  telepon: string;
  terakhirBimbingan: string;
  statusMbkm: string;
  statusVariant: string;
  logbookProgress: number;
  logbookTotal: number;
  logbookPendingReview: number;
  skema: string;
  mitra: string;
  posisi: string;
  sks: number;
  periodeAktif: string;
  linkFolder: string;
  dosenPembimbing: string;
  logbookEntries: LogbookEntry[];
}

// Generator helper untuk 24 minggu logbook MBKM
export function build24Logbook(
  filledCount: number,
  pendingWeeks: number[],
  customDescs: Record<number, string>,
  customNotes: Record<number, string>,
  linkPrefix: string,
  customDetails?: Record<number, { kegiatan: string[]; hasil: string[]; lampiran?: LogbookLampiran[] }>
): LogbookEntry[] {
  const startBase = new Date(2026, 1, 2); // 2 Feb 2026 (Senin)
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"];
  const entries: LogbookEntry[] = [];

  for (let w = 1; w <= 24; w++) {
    const sDate = new Date(startBase.getTime() + (w - 1) * 7 * 86400000);
    const eDate = new Date(sDate.getTime() + 4 * 86400000); // Senin - Jumat (5 hari kerja)
    const fmt = (d: Date) => `${d.getDate()} ${months[d.getMonth()]} 2026`;

    let status: "Disetujui" | "Perlu Review" | "Belum Diisi" = "Belum Diisi";
    let desc = "";
    let note = "";
    let link = "";
    let kegiatan: string[] = [];
    let hasil: string[] = [];
    let lampiran: LogbookLampiran[] | undefined = undefined;

    if (w <= filledCount) {
      if (pendingWeeks.includes(w)) {
        status = "Perlu Review";
      } else {
        status = "Disetujui";
      }
      desc = customDescs[w] || `Mengerjakan aktivitas program magang, standup meeting, dan dokumentasi progres di minggu ke-${w}.`;
      note = customNotes[w] || (status === "Disetujui" ? "Progres terverifikasi dengan baik." : "");
      link = `https://drive.google.com/file/d/${linkPrefix}-m${w}`;

      if (customDetails && customDetails[w]) {
        kegiatan = customDetails[w].kegiatan;
        hasil = customDetails[w].hasil;
        lampiran = customDetails[w].lampiran;
      } else {
        kegiatan = [
          `Melaksanakan aktivitas teknis modul minggu ke-${w} sesuai rencana kegiatan.`,
          `Mengikuti sinkronisasi harian (daily standup) dan koordinasi bersama mentor industri.`,
          `Mengerjakan penugasan terstruktur serta pembaruan lembar kerja progres.`
        ];
        hasil = [
          `Menuntaskan seluruh target capaian dan deliverables minggu ke-${w}.`,
          `Memperoleh konfirmasi validasi tugas dari mentor lapangan.`
        ];
        lampiran = [
          {
            judul: `Laporan Progres Minggu ke-${w}`,
            gambarUrl: "/assets/images/DicodingAsah.jpg",
            tipe: "image"
          }
        ];
      }
    }

    entries.push({
      minggu: w,
      tanggalMulai: fmt(sDate),
      tanggalSelesai: fmt(eDate),
      kegiatan,
      hasil,
      lampiran,
      deskripsi: desc,
      buktiLink: link,
      status,
      catatanDosen: note,
    });
  }
  return entries;
}

export const students: Student[] = [
  {
    id: 1,
    nama: "Wanda Putri Lestari",
    nim: "A11.2023.15257",
    prodi: "S1 Teknik Informatika",
    email: "111202315257@mhs.dinus.ac.id",
    telepon: "082328498200",
    terakhirBimbingan: "14 Feb 2026",
    statusMbkm: "Magang Industri (MSIB / Mandiri)",
    statusVariant: "magang",
    logbookProgress: 10,
    logbookTotal: 24,
    logbookPendingReview: 2,
    skema: "Magang Industri (MSIB / Mandiri)",
    mitra: "PT Telkom Indonesia (Persero) Tbk",
    posisi: "Frontend Developer Intern",
    sks: 20,
    periodeAktif: "Februari – Juli 2026",
    linkFolder: "https://drive.google.com/drive/folders/wanda-mbkm-telkom",
    dosenPembimbing: "Adhitya Nugraha, S.Kom., M.T.",
    logbookEntries: build24Logbook(
      10,
      [9, 10],
      {
        1: "Orientasi lingkungan kerja, setup repositori proyek internal, dan pengenalan tim pengembang.",
        2: "Mempelajari design system Telkom dan implementasi komponen reusable pada Storybook.",
        3: "Slicing antarmuka dashboard monitoring jaringan menggunakan React dan Tailwind CSS.",
        4: "Integrasi REST API dashboard monitoring dengan backend service dan implementasi caching TanStack Query.",
        5: "Pengerjaan modul filter analitik data pelanggan dan ekspor data laporan format CSV/Excel.",
        6: "Refactoring state management global serta pengujian fungsionalitas UI komponen.",
        7: "Optimasi performa halaman web monitoring (Lighthouse score naik ke 94).",
        8: "Implementasi autentikasi SSO berbasis OAuth2 dan error boundary handling.",
        9: "Pengerjaan fitur ekspor grafik PDF dan integrasi reporting service berkala.",
        10: "Review integrasi end-to-end sprint 5 bersama lead developer Telkom."
      },
      {
        1: "Bagus, pelajari workflow git tim.",
        2: "Perhatikan konsistensi token warna.",
        3: "Pastikan responsif di mobile dan tablet.",
        4: "Bagus, perhatikan error state.",
        9: "Perbaiki format margin pada ekspor grafik PDF.",
        10: "Mohon sertakan test coverage report sprint 5."
      },
      "wanda-telkom",
      {
        1: {
          kegiatan: [
            "Mengikuti sesi orientasi divisi Digital Enterprise and Infrastructure PT Telkom.",
            "Setup repositori monorepo, credential vault internal, dan environment development.",
            "Pengenalan coding guideline dan branching strategy tim frontend."
          ],
          hasil: [
            "Memahami arsitektur aplikasi internal Telkom dan standard operating procedure.",
            "Konfigurasi local dev environment tuntas tanpa kendala."
          ],
          lampiran: [
            {
              judul: "Dokumen Onboarding PT Telkom",
              gambarUrl: "/assets/images/DicodingAsah.jpg",
              tipe: "image"
            }
          ]
        },
        2: {
          kegiatan: [
            "Mempelajari implementasi Telkom Design System (TDS) versi terbaru.",
            "Membuat unit komponen UI button, card data, dan badge status di Storybook.",
            "Melakukan verifikasi aksesibilitas dan semantic HTML pada komponen."
          ],
          hasil: [
            "Tersedianya 8 komponen UI atomik yang telah disetujui lead developer.",
            "Storybook component library terupdate pada repositori tim."
          ],
          lampiran: [
            {
              judul: "Preview Storybook TDS Component",
              gambarUrl: "/assets/images/DicodingAsah.jpg",
              tipe: "image"
            }
          ]
        }
      }
    )
  },
  {
    id: 2,
    nama: "Selfi Choiriyah",
    nim: "A11.2023.15154",
    prodi: "S1 Teknik Informatika",
    email: "111202315154@mhs.dinus.ac.id",
    telepon: "088803904628",
    terakhirBimbingan: "16 Feb 2026",
    statusMbkm: "Studi Independen Bersertifikat",
    statusVariant: "studi-independen",
    logbookProgress: 14,
    logbookTotal: 24,
    logbookPendingReview: 0,
    skema: "Studi Independen Bersertifikat",
    mitra: "Dicoding Indonesia (Bangkit Academy)",
    posisi: "Android Developer Trainee",
    sks: 20,
    periodeAktif: "Februari – Juli 2026",
    linkFolder: "https://drive.google.com/drive/folders/selfi-mbkm-dicoding",
    dosenPembimbing: "Adhitya Nugraha, S.Kom., M.T.",
    logbookEntries: build24Logbook(
      14,
      [],
      {
        1: "Onboarding program Studi Independen Dicoding dan pembelajaran dasar Kotlin.",
        2: "Mempelajari OOP Kotlin, Collections, dan dasar-dasar Android Studio.",
        3: "Membuat aplikasi Android pertama: Layouting dengan XML dan Activity Lifecycle.",
        4: "Penerapan Navigation Component, Intent, dan Fragment pada aplikasi multi-layar.",
        5: "Integrasi API publik menggunakan Retrofit, Moshi converter, dan Coroutine.",
        6: "Penerapan Clean Architecture dan Repository pattern untuk memisahkan domain logic.",
        7: "Implementasi Dependency Injection menggunakan Hilt pada aplikasi multi-modul.",
        8: "Modern Android UI dengan Jetpack Compose, state hoisting, dan navigasi modular.",
        9: "Penulisan Unit Testing dengan MockK dan UI Testing dengan Compose Test Rule.",
        10: "Pengerjaan proyek akhir Capstone: Aplikasi deteksi hama tanaman berbasis Computer Vision.",
        11: "Optimasi model TensorFlow Lite pada pipeline background threading Android.",
        12: "Implementasi offline cache via Room Database dan background sync WorkManager.",
        13: "Pengujian fungsionalitas dan integrasi telemetry monitoring.",
        14: "Presentasi akhir Capstone Project dan submission sertifikasi Google Associate Android Developer."
      },
      {
        10: "Proyek capstone sangat komprehensif, selamat!",
        14: "Luar biasa, capaian tepat waktu dan tuntas."
      },
      "selfi-dicoding",
      {
        1: {
          kegiatan: [
            "Mengikuti Opening Sesion dan Technical Briefing dari bangkit.",
            "Belajar melalui platform Dicoding dan Coursera sesuai dengan token/undangan yang telah diberikan melalui email.",
            "Mengerjakan kuis dan mengirimkan tugas melalui platform tersebut untuk mendapatkan sertifikat."
          ],
          hasil: [
            "Mendapatkan informasi mengenai kegiatan Bangkit selama 6 bulan kedepan",
            "Memperoleh sertifikat dari Dicoding dan Coursera"
          ],
          lampiran: [
            {
              judul: "Sertifikat Dicoding - Basic Android",
              gambarUrl: "/assets/images/DicodingAsah.jpg",
              tipe: "image"
            },
            {
              judul: "Sertifikat Coursera - Technical Briefing",
              gambarUrl: "/assets/images/DicodingAsah.jpg",
              tipe: "image"
            }
          ]
        },
        2: {
          kegiatan: [
            "Mengerjakan Course",
            "Mengikuti ILT yang diadakan oleh Bangkit Academy.",
            "Mengikuti Weekly Consultasion dengan fasilitator.",
            "Mengikuti Sesi Guest Speaker dengan Puja Pramudya."
          ],
          hasil: [
            "Memperoleh sertifikat dari Coursera",
            "Memperoleh ilmu mengenai Bagaimana Menjadi Software Engineer Profesional"
          ],
          lampiran: [
            {
              judul: "Sertifikat Coursera - Software Engineer Professional",
              gambarUrl: "/assets/images/DicodingAsah.jpg",
              tipe: "image"
            }
          ]
        }
      }
    )
  },
  {
    id: 3,
    nama: "Dimas Arya Pratama",
    nim: "A11.2023.14980",
    prodi: "S1 Teknik Informatika",
    email: "111202314980@mhs.dinus.ac.id",
    telepon: "081390234112",
    terakhirBimbingan: "12 Feb 2026",
    statusMbkm: "Bengkel Koding (Internal Fakultas)",
    statusVariant: "bengkel-koding",
    logbookProgress: 8,
    logbookTotal: 24,
    logbookPendingReview: 1,
    skema: "Bengkel Koding (Internal Fakultas)",
    mitra: "Fakultas Ilmu Komputer UDINUS",
    posisi: "Asisten Lab Web & Mobile Development",
    sks: 20,
    periodeAktif: "Februari – Juli 2026",
    linkFolder: "https://drive.google.com/drive/folders/dimas-mbkm-bengkoding",
    dosenPembimbing: "Adhitya Nugraha, S.Kom., M.T.",
    logbookEntries: build24Logbook(
      8,
      [8],
      {
        1: "Penyusunan silabus pembelajaran Bengkel Koding dan pembagian kelompok praktikum mahasiswa.",
        2: "Pembuatan modul praktikum dasar Git, GitHub Workflow, dan CI/CD pipeline.",
        3: "Penyelenggaraan sesi mentoring langsung pengembangan web modern dengan Astro & Tailwind CSS.",
        4: "Review code dan evaluasi tugas mingguan mahasiswa peserta Bengkel Koding.",
        5: "Pendampingan penyelesaian error dan debugging kode frontend mahasiswa bimbingan.",
        6: "Pengembangan repositori starter kit project capstone internal fakultas.",
        7: "Simulasi deploy aplikasi web ke platform cloud dan konfigurasi domain.",
        8: "Evaluasi capaian paruh program Bengkel Koding dan rekapitulasi nilai praktikum."
      },
      {
        1: "Silabus sudah terstruktur rapi.",
        4: "Berikan feedback konstruktif pada review code mahasiswa."
      },
      "dimas-bengkoding"
    )
  },
  {
    id: 4,
    nama: "Evan William Setyawan",
    nim: "A11.2023.15006",
    prodi: "S1 Teknik Informatika",
    email: "111202315006@mhs.dinus.ac.id",
    telepon: "081231083446",
    terakhirBimbingan: "10 Feb 2026",
    statusMbkm: "Kampus Mengajar / PMM",
    statusVariant: "kampus-mengajar",
    logbookProgress: 6,
    logbookTotal: 24,
    logbookPendingReview: 1,
    skema: "Kampus Mengajar / PMM",
    mitra: "SDN Kalibanteng Kulon 01",
    posisi: "Mahasiswa Mengajar Bidang Teknologi & Literasi",
    sks: 15,
    periodeAktif: "Februari – Juli 2026",
    linkFolder: "https://drive.google.com/drive/folders/evan-mbkm-mengajar",
    dosenPembimbing: "Adhitya Nugraha, S.Kom., M.T.",
    logbookEntries: build24Logbook(
      6,
      [6],
      {
        1: "Penerjunan ke lokasi sekolah, koordinasi dengan kepala sekolah dan guru pamong.",
        2: "Observasi kebutuhan literasi digital siswa dan asesmen kemampuan awal TIK.",
        3: "Pelatihan dasar pengenalan komputer dan software edukatif untuk siswa kelas 5.",
        4: "Pendampingan guru dalam pembuatan media pembelajaran interaktif berbasis Canva & Quizizz.",
        5: "Penyelenggaraan workshop literasi digital dan keamanan internet ramah anak.",
        6: "Penyusunan modul ajar digital dan evaluasi hasil belajar siswa pasca-pelatihan."
      },
      {
        1: "Jaga komunikasi baik dengan pihak sekolah.",
        2: "Sesuaikan materi dengan kurikulum yang berlaku.",
        3: "Metode pengajaran interaktif sudah baik.",
        4: "Media ajar yang dibuat sangat aplikatif.",
        5: "Teruskan inisiatif positifnya."
      },
      "evan-mengajar"
    )
  },
  {
    id: 5,
    nama: "Nurul Hidayah",
    nim: "A11.2023.15340",
    prodi: "S1 Sistem Informasi",
    email: "111202315340@mhs.dinus.ac.id",
    telepon: "085712398455",
    terakhirBimbingan: "15 Feb 2026",
    statusMbkm: "Riset / Proyek Kemanusiaan / Kewirausahaan",
    statusVariant: "riset",
    logbookProgress: 12,
    logbookTotal: 24,
    logbookPendingReview: 2,
    skema: "Riset / Proyek Kemanusiaan / Kewirausahaan",
    mitra: "Pusat Studi AI & Robotika FIK",
    posisi: "Junior Computer Vision Researcher",
    sks: 20,
    periodeAktif: "Februari – Juli 2026",
    linkFolder: "https://drive.google.com/drive/folders/nurul-mbkm-riset",
    dosenPembimbing: "Adhitya Nugraha, S.Kom., M.T.",
    logbookEntries: build24Logbook(
      12,
      [11, 12],
      {
        1: "Studi literatur algoritma YOLOv8 dan Vision Transformer untuk deteksi citra medis.",
        2: "Pengumpulan dan anotasi dataset citra penyakit tanaman lokal dengan Roboflow.",
        3: "Preprocessing data citra: data augmentation, normalisasi, dan train-test split.",
        4: "Training model baseline Convolutional Neural Network menggunakan PyTorch di Google Colab.",
        5: "Eksperimen fine-tuning arsitektur transfer learning (ResNet50 vs EfficientNet).",
        6: "Evaluasi performa model: perhitungan confusion matrix, Precision, Recall, dan F1-score.",
        7: "Optimasi hyperparameter dengan Optuna dan teknik pruning model.",
        8: "Penyusunan draf awal paper riset ilmiah untuk publikasi prosiding terindeks.",
        9: "Integrasi model AI ke dalam antarmuka web prototipe untuk pengujian pengguna.",
        10: "Uji coba inferensi real-time pada perangkat edge computing Raspberry Pi.",
        11: "Penyusunan laporan kemajuan riset tengah semester dan evaluasi pembimbing riset.",
        12: "Revisi naskah publikasi berdasarkan telaah awal dosen pembimbing."
      },
      {
        1: "Literatur riset sudah relevan.",
        6: "Pastikan validasi silang (cross-validation) sudah diterapkan.",
        8: "Format penulisan paper harap disesuaikan dengan template IEEE."
      },
      "nurul-riset"
    )
  }
];
