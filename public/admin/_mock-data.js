/**
 * ==============================================================================
 * MOCK DATA MBKM V2 — Master Koordinator & Admin
 * Fakultas Ilmu Komputer UDINUS
 * ==============================================================================
 * Kumpulan data dummy, metadata navigasi, dan template workflow MBKM.
 * Terpisah dari controller logic agar bebas CORS saat dibuka via file://.
 */

// Data label navigasi (11 Menu Standar MBKM Koordinator - Issue #16)
const navMeta = {
  dashboard: {
    label: 'Dashboard',
    icon: 'layout-dashboard',
    title: 'Selamat Datang, Koordinator MBKM di Fakultas Ilmu Komputer',
    subtitle: 'Berikut adalah data-data dan ringkasan operasional yang dapat Anda akses.',
  },
  pengumuman: {
    label: 'Pengumuman',
    icon: 'megaphone',
    title: 'Pengumuman MBKM',
    subtitle: 'Broadcast siaran informasi resmi MBKM tingkat program studi dan fakultas.',
    actionButton: '<button type="button" onclick="showBuatPengumumanModal()" class="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-[#0655a7] hover:bg-[#0655a7]/90 text-white transition-colors shadow-none"><i data-lucide="plus" class="w-4 h-4"></i><span>Tambah Pengumuman</span></button>',
  },
  periode: {
    label: 'MBKM / Periode MBKM',
    icon: 'calendar-range',
    parent: 'mbkm',
    title: 'Periode MBKM',
    subtitle: 'Berikut data periode yang sinkron dengan database tahun ajaran pada SIADIN',
    actionButton: '',
  },
  'form-pendaftaran': {
    label: 'MBKM / Form Pendaftaran',
    icon: 'clipboard-list',
    parent: 'mbkm',
    title: 'Form Pendaftaran Mahasiswa',
    subtitle: 'Konfigurasi tahapan identitas, dokumen pendaftaran, dan persetujuan komitmen pendaftar.',
    actionButton: '<div class="flex items-center gap-2.5 shrink-0"><a href="/pendaftaran-mahasiswa" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 h-9 px-3.5 text-xs font-semibold rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-all shadow-2xs"><i data-lucide="external-link" class="w-3.5 h-3.5 text-gray-500"></i><span>Pratinjau Formulir Mahasiswa</span></a><button type="button" onclick="handleSaveFormPendaftaran()" class="inline-flex items-center justify-center gap-2 h-9 px-4 text-xs font-bold rounded-lg bg-[#0655a7] hover:bg-[#114D91] text-white shadow-2xs transition-all active:scale-95 cursor-pointer"><i data-lucide="save" class="w-3.5 h-3.5"></i><span>Simpan Perubahan</span></button></div>',
  },
  kontributor: {
    label: 'Kontributor',
    icon: 'building-2',
    title: 'Kontributor MBKM',
    subtitle: 'Kelola akun kontributor industri, lembaga kontributor, dan instansi magang/studi.',
    actionButton: '',
  },
  kontributor: {
    label: 'Kontributor',
    icon: 'building-2',
    title: 'Kontributor MBKM',
    subtitle: 'Kelola akun kontributor industri, lembaga kontributor, dan instansi magang/studi.',
    actionButton: '',
  },
  'mhs-rekomendasi': {
    label: 'Mahasiswa / Surat Rekomendasi',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Validasi Surat Rekomendasi',
    subtitle: 'Verifikasi dan setujui permohonan surat rekomendasi kontributor mahasiswa.',
  },
  'mhs-pelamar': {
    label: 'Mahasiswa / Pendaftar',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Daftar Pengajuan Mahasiswa Pendaftar',
    subtitle: 'Berikut ini adalah daftar semua pengajuan mahasiswa pendaftar ke program MBKM kontributor eksternal.',
    actionButton: '<button type="button" class="inline-flex items-center gap-2 h-9 px-3.5 text-sm font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"><i data-lucide="help-circle" class="w-4 h-4 text-[#71717a]"></i><span>Lihat Panduan</span></button>',
  },
  'mhs-semua': {
    label: 'Mahasiswa / Semua Mahasiswa',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Semua Mahasiswa MBKM',
    subtitle: 'Direktori seluruh mahasiswa yang sedang aktif menjalani program MBKM di kontributor industri.',
    actionButton: '<button type="button" onclick="exportDataMahasiswa()" class="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"><i data-lucide="download" class="w-4 h-4 text-[#71717a]"></i><span>Export Data</span></button>',
  },
  'semua-mahasiswa': {
    label: 'Mahasiswa / Semua Mahasiswa',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Semua Mahasiswa MBKM',
    subtitle: 'Direktori seluruh mahasiswa yang sedang aktif menjalani program MBKM di kontributor industri.',
    actionButton: '<button type="button" onclick="exportDataMahasiswa()" class="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"><i data-lucide="download" class="w-4 h-4 text-[#71717a]"></i><span>Export Data</span></button>',
  },
  'mhs-data': {
    label: 'Mahasiswa / Data Mahasiswa',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Data Mahasiswa MBKM',
    subtitle: 'Kelola basis data mahasiswa peserta program MBKM, plotting dosen pembimbing, dan sinkronisasi berkas master.',
    actionButton: '<button type="button" class="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"><i data-lucide="download" class="w-4 h-4 text-[#71717a]"></i><span>Export Data</span></button>',
  },
  'data-mahasiswa': {
    label: 'Mahasiswa / Data Mahasiswa',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Data Mahasiswa MBKM',
    subtitle: 'Kelola basis data mahasiswa peserta program MBKM, plotting dosen pembimbing, dan sinkronisasi berkas master.',
    actionButton: '<button type="button" class="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"><i data-lucide="download" class="w-4 h-4 text-[#71717a]"></i><span>Export Data</span></button>',
  },
  'dosen-data': {
    label: 'Dosen Pembimbing / Data Dosen',
    icon: 'user-check',
    parent: 'dosen',
    title: 'Data Dosen Pembimbing',
    subtitle: 'Daftar dosen pembimbing yang ditarik dari basis data UDI.',
    actionButton: '<div class="flex items-center gap-2"><button type="button" onclick="syncDataDosenUdi()" class="px-3 py-1.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[#09090b] text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"><i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-[#71717a]"></i><span>Sync Data UDI</span></button><button type="button" onclick="openModalTambahDosen()" class="px-3.5 py-1.5 rounded-lg bg-[#0655a7] hover:bg-[#114d91] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors shrink-0"><i data-lucide="user-plus" class="w-3.5 h-3.5"></i><span>Tambah Dosen</span></button></div>',
  },
  'dosen-kuota': {
    label: 'Dosen Pembimbing / Kuota Dosen',
    icon: 'user-check',
    parent: 'dosen',
    title: 'Kuota Dosen Pembimbing',
    subtitle: 'Monitoring beban bimbingan maksimal per dosen per semester.',
  },
  'dosen-update': {
    label: 'Mahasiswa / Update Dosen',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Update Dosen Pembimbing',
    subtitle: 'Ubah dosen pembimbing mahasiswa dan batalkan ACC dosen jika diperlukan.',
  },
  'update-dosen': {
    label: 'Mahasiswa / Update Dosen',
    icon: 'graduation-cap',
    parent: 'mahasiswa',
    title: 'Update Dosen Pembimbing',
    subtitle: 'Ubah dosen pembimbing mahasiswa dan batalkan ACC dosen jika diperlukan.',
  },
  logbook: {
    label: 'Logbook Mahasiswa',
    icon: 'book-marked',
    title: 'Logbook Mahasiswa',
    subtitle: 'Pemantauan kepatuhan pengisian logbook mingguan seluruh mahasiswa & verifikasi DPL.',
  },
  konversi: {
    label: 'Konversi SKS',
    icon: 'arrow-left-right',
    title: 'Konversi SKS',
    subtitle: 'Penyetujuan, revisi, dan penguncian konversi matkul/SKS mahasiswa terhadap CPL.',
  },
  sidang: {
    label: 'Sidang',
    icon: 'award',
    title: 'Sidang MBKM',
    subtitle: 'Penjadwalan sidang akhir, penginputan nilai gabungan, dan rekap kelulusan kegiatan.',
  },
  gelombang: {
    label: 'Sidang / Gelombang Sidang',
    icon: 'calendar-days',
    parent: 'sidang',
    title: 'Gelombang Sidang MBKM',
    subtitle: 'Manajemen periode dan batas pengajuan sidang evaluasi akhir MBKM.',
  },
  'data-pengajuan': {
    label: 'Sidang / Data Pengajuan',
    icon: 'file-check-2',
    parent: 'sidang',
    title: 'Data Pengajuan Sidang MBKM',
    subtitle: 'Verifikasi berkas persyaratan dan kelayakan mahasiswa pendaftar sidang.',
  },
  'plotting-jadwal': {
    label: 'Sidang / Plotting Jadwal',
    icon: 'calendar-clock',
    parent: 'sidang',
    title: 'Plotting Jadwal Sidang MBKM',
    subtitle: 'Atur jadwal, ruang sidang, dan alokasi dosen penguji MBKM.',
  },
  'hasil-sidang': {
    label: 'Sidang / Hasil Sidang',
    icon: 'award',
    parent: 'sidang',
    title: 'Hasil Sidang MBKM',
    subtitle: 'Berikut data sidang yang sudah diploting jadwalnya.',
  },
  sertifikat: {
    label: 'Sertifikat',
    icon: 'badge-check',
    title: 'Sertifikat & Luaran Wajib',
    subtitle: 'Validasi bukti luaran wajib (Publikasi Ilmiah / Sertifikat Kontributor) sebelum sinkronisasi KHS.',
  },
  'log-aktivitas': {
    label: 'Log Aktivitas',
    icon: 'history',
    title: 'Log Aktivitas Sistem',
    subtitle: 'Audit trail transaksional riwayat perubahan data penting pada sistem.',
  },
  // Fallback untuk fungsi lama
  program: {
    label: 'Program',
    icon: 'book-open',
    title: 'Data Program MBKM',
    subtitle: 'Daftar seluruh program MBKM internal dan skema asistensi mengajar terdaftar.',
  },
  koordinator: {
    label: 'Dosen Pembimbing / Data Dosen',
    icon: 'user-check',
    title: 'Data Dosen Pembimbing Lapangan',
    subtitle: 'Daftar dosen pembimbing yang ditarik dari basis data UDI.',
  },
  surekom: {
    label: 'Mahasiswa / Rekomendasi (SuReKom)',
    icon: 'graduation-cap',
    title: 'Validasi Surat Rekomendasi',
    subtitle: 'Verifikasi dan setujui permohonan surat rekomendasi kontributor mahasiswa.',
  },
  laporan: {
    label: 'Sidang',
    icon: 'award',
    title: 'Sidang & Laporan Akhir',
    subtitle: 'Review dan evaluasi akhir kegiatan MBKM mahasiswa.',
  },
};

// ====================================================
// DATA WORKFLOW STAGES & FILE BUILDER (DYNAMIC STATE)
// ====================================================
const PRESETS = {
  eksternal: [
    {
      id: 'stage_1',
      name: 'Tahap 1: Pendaftaran Mandiri & Biodata',
      type: 'daftar_mandiri',
      rule: 'Mahasiswa mendaftar mandiri sesuai eligibility semester & IPK',
      files: [
        {
          id: 'f_1',
          label: 'Transkrip Nilai Terakhir (Min. 100 SKS / IPK >= 3.0)',
          format: 'PDF (Maks 2MB)',
          required: true,
        },
        { id: 'f_2', label: 'Curriculum Vitae (CV) & Portofolio', format: 'PDF (Maks 5MB)', required: true },
      ],
    },
    {
      id: 'stage_2',
      name: 'Tahap 2: Seleksi & Tes Kontributor Eksternal',
      type: 'tes_kontributor',
      rule: 'Mahasiswa mengikuti asesmen teknis kontributor (Dicoding / Vinix / Industri)',
      files: [
        {
          id: 'f_3',
          label: 'Bukti Screenshot / Email Lolos Tes Kontributor',
          format: 'PDF / JPG (Maks 2MB)',
          required: false,
        },
      ],
    },
    {
      id: 'stage_3',
      name: 'Tahap 3: Pengajuan & Validasi Surat Rekomendasi',
      type: 'surekom',
      rule: 'Hanya mahasiswa lolos seleksi kontributor yang berhak meminta tanda tangan Koor KB',
      files: [
        {
          id: 'f_4',
          label: 'Draft Surat Rekomendasi Format Resmi Kontributor',
          format: 'DOCX / PDF (Maks 3MB)',
          required: true,
        },
        {
          id: 'f_5',
          label: 'SPTJM (Surat Pernyataan Tanggung Jawab Mutlak)',
          format: 'PDF Bermaterai',
          required: true,
        },
      ],
    },
  ],
  internal: [
    {
      id: 'stage_1',
      name: 'Tahap 1: Rekomendasi & Penugasan Kontributor / Lab',
      type: 'penugasan_internal',
      rule: 'Kontributor/Dosen Pengampu mengirimkan daftar nama mahasiswa terpilih ke Koordinator',
      files: [
        {
          id: 'f_1',
          label: 'Surat Keputusan / Daftar Nominasi Peserta dari Lab/Kontributor',
          format: 'PDF / Excel',
          required: true,
        },
      ],
    },
    {
      id: 'stage_2',
      name: 'Tahap 2: Verifikasi Berkas & Auto-Lolos Sistem',
      type: 'auto_lolos',
      rule: 'Koordinator mengimpor list mahasiswa -> Sistem otomatis setujui (Approved)',
      files: [
        {
          id: 'f_2',
          label: 'Pakta Integritas Mahasiswa Kampus Berdampak',
          format: 'PDF (Hardcopy di meja Koor)',
          required: true,
        },
      ],
    },
  ],
};

// ====================================================
// DATA MASTER PROGRAM MBKM & PAGINATION (10 DATA/PAGE)
// ====================================================
let programListData = [
  {
    id: 'prog_1',
    nama: 'Bengkel Koding Skema Machine Learning',
    dosen: 'Dr. Muljono, S.Si, M.Kom',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'APPROVED',
  },
  {
    id: 'prog_2',
    nama: 'Bengkel Koding Skema Android Programming',
    dosen: 'Nurul Anisa S.W., M.Cs',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'APPROVED',
  },
  {
    id: 'prog_3',
    nama: 'Bengkel Koding Skema Game Programming',
    dosen: 'Ahmad Zainul, M.Kom',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'PENDING',
  },
  {
    id: 'prog_4',
    nama: 'Bengkel Koding Skema Web Programming',
    dosen: 'Budi Setiawan, M.Cs',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'APPROVED',
  },
  {
    id: 'prog_5',
    nama: 'Bengkel Koding Skema Computational Intelligence',
    dosen: 'Dr. Muljono, S.Si, M.Kom',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'DISAPPROVED',
  },
  {
    id: 'prog_6',
    nama: 'Bengkel Koding Skema Computer Vision',
    dosen: 'Nurul Anisa S.W., M.Cs',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'APPROVED',
  },
  {
    id: 'prog_7',
    nama: 'Bengkel Koding Skema Security Data',
    dosen: 'Ahmad Zainul, M.Kom',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'APPROVED',
  },
  {
    id: 'prog_8',
    nama: 'Bengkel Koding Skema Internet of Things',
    dosen: 'Retno Kusumaningrum, M.Kom',
    kategori: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    status: 'PENDING',
  },
  {
    id: 'prog_9',
    nama: 'Dicoding - Mobile & Cloud Computing Architect',
    dosen: 'Dewi Puspitasari, M.Kom',
    kategori: 'MBKM Eksternal - Studi Independen (Dicoding, Vinix)',
    status: 'APPROVED',
  },
  {
    id: 'prog_10',
    nama: 'Vinix - AI & Fullstack Web Developer',
    dosen: 'Budi Setiawan, M.Cs',
    kategori: 'MBKM Eksternal - Studi Independen (Dicoding, Vinix)',
    status: 'APPROVED',
  },
  {
    id: 'prog_11',
    nama: 'Magang Industri Software Engineer di Telkom Corp',
    dosen: 'Dr. Muljono, S.Si, M.Kom',
    kategori: 'MBKM Eksternal - Magang Kuliah Kerja Industri (KKI)',
    status: 'APPROVED',
  },
  {
    id: 'prog_12',
    nama: 'Pengajaran Komputer Cerdas SMA/SMK Negeri 1',
    dosen: 'Nurul Anisa S.W., M.Cs',
    kategori: 'MBKM Eksternal - Magang Berdampak di Sekolah',
    status: 'PENDING',
  },
  {
    id: 'prog_13',
    nama: 'Student Exchange Semester 6 Fakultas Ilmu Komputer UGM',
    dosen: 'Retno Kusumaningrum, M.Kom',
    kategori: 'MBKM Internal - Student Mobility ke UGM',
    status: 'APPROVED',
  },
  {
    id: 'prog_14',
    nama: 'Riset Kolaboratif Big Data & Intelligent Decision Support',
    dosen: 'Ahmad Zainul, M.Kom',
    kategori: 'MBKM Internal - Riset Bersama Bidang Kajian (IDSS, Matics)',
    status: 'APPROVED',
  },
];

// MASTER DATA & CRUD: KATEGORI & SKEMA MBKM (OPSI A)
// ==================================================

let kategoriData = [
  {
    id: 'internal_bengkel',
    nama: 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)',
    type: 'internal',
    sks: 20,
  },
  {
    id: 'eksternal_studi',
    nama: 'MBKM Eksternal - Studi Independen (Dicoding, Vinix)',
    type: 'eksternal',
    sks: 15,
  },
  {
    id: 'eksternal_kki',
    nama: 'MBKM Eksternal - Magang Kuliah Kerja Industri (KKI)',
    type: 'eksternal',
    sks: 20,
  },
  {
    id: 'eksternal_sekolah',
    nama: 'MBKM Eksternal - Magang Berdampak di Sekolah',
    type: 'eksternal',
    sks: 20,
  },
  {
    id: 'internal_lab',
    nama: 'MBKM Internal - Studi Independen (Lab IntSys)',
    type: 'internal',
    sks: 15,
  },
  {
    id: 'internal_riset',
    nama: 'MBKM Internal - Riset Bersama Bidang Kajian (IDSS, Matics)',
    type: 'internal',
    sks: 20,
  },
  {
    id: 'internal_ppk',
    nama: 'MBKM Internal - PPKOrmawa',
    type: 'internal',
    sks: 12,
  },
  {
    id: 'internal_joint',
    nama: 'MBKM Internal - Joint Project (Dinosaurus, BTIK)',
    type: 'internal',
    sks: 20,
  },
  {
    id: 'internal_iv',
    nama: 'MBKM Internal - Industrial Visit ke Luar Negeri',
    type: 'internal',
    sks: 12,
  },
  {
    id: 'internal_kku',
    nama: 'MBKM Internal - Kuliah Kerja Usaha (KKU)',
    type: 'internal',
    sks: 12,
  },
  {
    id: 'internal_ugm',
    nama: 'MBKM Internal - Student Mobility ke UGM',
    type: 'internal',
    sks: 24,
  },
];

let skemaData = {
  internal_bengkel: [
    {
      id: 'skema_1',
      nama: 'Bengkel Koding Skema Machine Learning',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_2',
      nama: 'Bengkel Koding Skema Android Programming',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_3',
      nama: 'Bengkel Koding Skema Game Programming',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_4',
      nama: 'Bengkel Koding Skema Web Programming',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_5',
      nama: 'Bengkel Koding Skema Computational Intelligence',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_6',
      nama: 'Bengkel Koding Skema Computer Vision',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_7',
      nama: 'Bengkel Koding Skema Security Data',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_8',
      nama: 'Bengkel Koding Skema Internet of Things',
      prodi: 'A11',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'internal',
      pendanaan: 'sudah',
    },
  ],
  eksternal_studi: [
    {
      id: 'skema_studi_1',
      nama: 'Dicoding - Mobile & Cloud Computing',
      prodi: 'A11',
      dosen: 'Drs. Supriyono, M.Kom',
      skemaType: 'eksternal',
      pendanaan: 'sudah',
    },
    {
      id: 'skema_studi_2',
      nama: 'Vinix - AI & Fullstack Development',
      prodi: 'A12',
      dosen: 'Nurul Anisa Sri Winarsih, S.Kom, M.Cs',
      skemaType: 'eksternal',
      pendanaan: 'sudah',
    },
  ],
};

// ====================================================
// DATA MASTER KOORDINATOR DOSEN (1 KOORDINATOR : N PROGRAM)
// ====================================================
let koordinatorData = [
  {
    id: 'kord_1',
    nama: 'Dr. Muljono, S.Si, M.Kom',
    nidn: '0686.11.1993.001',
    prodi: 'S1 Teknik Informatika',
    email: 'muljono@fik.dinus.ac.id',
  },
  {
    id: 'kord_2',
    nama: 'Nurul Anisa S.W., M.Cs',
    nidn: '0686.11.2008.354',
    prodi: 'S1 Tenik Informatika',
    email: 'nurul.anisa@fik.dinus.ac.id',
  },
  {
    id: 'kord_3',
    nama: 'Ahmad Zainul, M.Kom',
    nidn: '0686.11.2012.441',
    prodi: 'S1 Teknik Informatika',
    email: 'ahmad.zainul@fik.dinus.ac.id',
  },
  {
    id: 'kord_4',
    nama: 'Retno Kusumaningrum, M.Kom',
    nidn: '0686.11.2015.512',
    prodi: 'S1 Desain Komunikasi Visual',
    email: 'retno.k@fik.dinus.ac.id',
  },
  {
    id: 'kord_5',
    nama: 'Budi Setiawan, M.Cs',
    nidn: '0686.11.2018.631',
    prodi: 'S1 Ilmu Komunikasi',
    email: 'budi.setiawan@fik.dinus.ac.id',
  },
  {
    id: 'kord_6',
    nama: 'Dewi Puspitasari, M.Kom',
    nidn: '0686.11.2020.719',
    prodi: 'S1 Film dan Televisi',
    email: 'dewi.puspita@fik.dinus.ac.id',
  },
  {
    id: 'kord_7',
    nama: 'Eko Hari Rachmawanto, M.Kom',
    nidn: '0686.11.2016.589',
    prodi: 'S1 Teknik Informatika',
    email: 'eko.hari@fik.dinus.ac.id',
  },
];

// ====================================================
// DASHBOARD INTERACTIVE WIDGETS
// ====================================================
const SKS_PIPELINE_DATA = {
  10: {
    request: '12 Mhs',
    review: '11 Mhs',
    mapping: '10 Mhs',
    sk: '10 Mhs',
    totalText: '100 / 120 SKS (83%)',
  },
  12: {
    request: '16 Mhs',
    review: '14 Mhs',
    mapping: '12 Mhs',
    sk: '12 Mhs',
    totalText: '144 / 192 SKS (75%)',
  },
  15: {
    request: '20 Mhs',
    review: '18 Mhs',
    mapping: '17 Mhs',
    sk: '16 Mhs',
    totalText: '240 / 300 SKS (80%)',
  },
  20: {
    request: '48 Mhs',
    review: '42 Mhs',
    mapping: '38 Mhs',
    sk: '35 Mhs',
    totalText: '912 / 960 SKS (95%)',
  },
  24: {
    request: '8 Mhs',
    review: '7 Mhs',
    mapping: '6 Mhs',
    sk: '5 Mhs',
    totalText: '120 / 192 SKS (63%)',
  },
};

// ==================================================
// DATA & LOGIKA TABEL SUREKOM DENGAN PAGINATION & MODAL POPUP
// ==================================================
const surekomListData = [
  {
    id: 1,
    nama: 'Calvin Revianto',
    nim: 'A11.2021.13782',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Bengkel Koding',
    kontributor: 'Inkubator Bisnis FIK',
    ipk: '3.42',
    sksLulus: 112,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '24 Sep 2026',
    catatan: ''
  },
  {
    id: 2,
    nama: 'Budi Santoso',
    nim: 'A11.2021.13201',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Magang Berdampak',
    kontributor: 'PT Telkom Indonesia',
    ipk: '3.70',
    sksLulus: 104,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '25 Sep 2026',
    catatan: ''
  },
  {
    id: 3,
    nama: 'Siti Aminah',
    nim: 'A12.2022.06543',
    prodi: 'SISTEM INFORMASI S1',
    program: 'Studi Independen',
    kontributor: 'Dicoding Indonesia',
    ipk: '3.62',
    sksLulus: 92,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '26 Sep 2026',
    catatan: ''
  },
  {
    id: 4,
    nama: 'Rizky Pratama',
    nim: 'A15.2021.01988',
    prodi: 'ILMU KOMUNIKASI S1',
    program: 'Pertukaran Mahasiswa Merdeka',
    kontributor: 'Universitas Indonesia',
    ipk: '3.78',
    sksLulus: 106,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '27 Sep 2026',
    catatan: ''
  },
  {
    id: 5,
    nama: 'Dewi Lestari',
    nim: 'A14.2020.03456',
    prodi: 'DESAIN KOMUNIKASI VISUAL S1',
    program: 'Kampus Mengajar',
    kontributor: 'SD Negeri 01 Semarang',
    ipk: '3.55',
    sksLulus: 120,
    semester: 'Semester 7',
    status: 'approved',
    tanggal: '20 Sep 2026',
    catatan: 'Dokumen lengkap dan memenuhi syarat IPK.'
  },
  {
    id: 6,
    nama: 'Ahmad Fauzi',
    nim: 'A11.2021.13890',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Riset / Penelitian',
    kontributor: 'IDSS Laboratory',
    ipk: '3.85',
    sksLulus: 110,
    semester: 'Semester 5',
    status: 'approved',
    tanggal: '21 Sep 2026',
    catatan: 'Direkomendasikan langsung oleh Kepala Lab.'
  },
  {
    id: 7,
    nama: 'Nabila Putri',
    nim: 'A12.2022.06712',
    prodi: 'SISTEM INFORMASI S1',
    program: 'Studi Independen',
    kontributor: 'Bangkit Academy',
    ipk: '3.91',
    sksLulus: 116,
    semester: 'Semester 5',
    status: 'approved',
    tanggal: '22 Sep 2026',
    catatan: 'Syarat portofolio dan bahasa Inggris sangat baik.'
  },
  {
    id: 8,
    nama: 'Dimas Anggara',
    nim: 'A11.2020.12908',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Magang Berdampak',
    kontributor: 'PT Telkom Indonesia',
    ipk: '2.85',
    sksLulus: 76,
    semester: 'Semester 5',
    status: 'rejected',
    tanggal: '23 Sep 2026',
    catatan: 'IPK di bawah 3.00 dan SKS lulus belum mencapai 80 SKS.'
  },
  {
    id: 9,
    nama: 'Fajar Nugraha',
    nim: 'A15.2021.02111',
    prodi: 'ILMU KOMUNIKASI S1',
    program: 'Kegiatan Wirausaha',
    kontributor: 'Inkubator Bisnis FIK',
    ipk: '3.48',
    sksLulus: 102,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '28 Sep 2026',
    catatan: ''
  },
  {
    id: 10,
    nama: 'Anisa Rahmawati',
    nim: 'A14.2021.03789',
    prodi: 'DESAIN KOMUNIKASI VISUAL S1',
    program: 'Magang Berdampak',
    kontributor: 'Ryuje Tech Studio',
    ipk: '3.65',
    sksLulus: 98,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '29 Sep 2026',
    catatan: ''
  },
  {
    id: 11,
    nama: 'Gilang Ramadhan',
    nim: 'A11.2022.14120',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Studi Independen',
    kontributor: 'Dicoding Indonesia',
    ipk: '3.72',
    sksLulus: 96,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '30 Sep 2026',
    catatan: ''
  },
  {
    id: 12,
    nama: 'Putri Handayani',
    nim: 'A12.2021.06102',
    prodi: 'SISTEM INFORMASI S1',
    program: 'Pertukaran Mahasiswa Merdeka',
    kontributor: 'Institut Teknologi Bandung',
    ipk: '3.80',
    sksLulus: 114,
    semester: 'Semester 5',
    status: 'approved',
    tanggal: '19 Sep 2026',
    catatan: 'Memenuhi kuota pertukaran mahasiswa PMM.'
  },
  {
    id: 13,
    nama: 'Hendro Kusuma',
    nim: 'A11.2021.13555',
    prodi: 'TEKNIK INFORMATIKA S1',
    program: 'Riset / Penelitian',
    kontributor: 'Bengkel Koding',
    ipk: '3.60',
    sksLulus: 108,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '01 Okt 2026',
    catatan: ''
  },
  {
    id: 14,
    nama: 'Tiara Maharani',
    nim: 'A15.2022.02340',
    prodi: 'ILMU KOMUNIKASI S1',
    program: 'Magang Berdampak',
    kontributor: 'PT Matic Edukasi Mandiri',
    ipk: '3.68',
    sksLulus: 94,
    semester: 'Semester 5',
    status: 'pending',
    tanggal: '02 Okt 2026',
    catatan: ''
  },
];

// ==================================================
// DATA & LOGIKA TABEL LOGBOOK DENGAN PAGINATION
// ==================================================
const logbookListData = [
  { id: 1, nama: "SYIFA AIN'NUR MANZILA", nim: 'A11.2019.12233' },
  { id: 2, nama: 'Salwa Salsabila', nim: 'A11.2020.12864' },
  { id: 3, nama: 'Fakhrurrozi', nim: 'A11.2020.12592' },
  { id: 4, nama: 'Khalivio Rahmiyanto Putra', nim: 'A11.2020.12969' },
  { id: 5, nama: 'Tarissa Aura Azzahra', nim: 'A11.2020.13158' },
  { id: 6, nama: 'Calvin Revianto', nim: 'A11.2021.13782' },
  { id: 7, nama: 'Budi Santoso', nim: 'A11.2021.13201' },
  { id: 8, nama: 'Siti Aminah', nim: 'A12.2022.06543' },
  { id: 9, nama: 'Rizky Pratama', nim: 'A15.2021.01988' },
  { id: 10, nama: 'Dewi Lestari', nim: 'A14.2020.03456' },
  { id: 11, nama: 'Ahmad Fauzi', nim: 'A11.2021.13890' },
  { id: 12, nama: 'Nabila Putri', nim: 'A12.2022.06712' },
  { id: 13, nama: 'Dimas Anggara', nim: 'A11.2020.12908' },
  { id: 14, nama: 'Anisa Rahmawati', nim: 'A14.2021.03789' },
];

// ==================================================
// DATA & LOGIKA TABEL LAPORAN AKHIR DENGAN PAGINATION
// ==================================================
const laporanListData = [
  { id: 1, nama: 'Wahyu Adi Nugroho', nim: 'A11.2019.12310' },
  { id: 2, nama: 'Muhammad Ifka Nabilah', nim: 'A11.2020.12419' },
  { id: 3, nama: 'YUDHA BAYU PRASTYO', nim: 'A11.2020.12501' },
  { id: 4, nama: 'Calvin Revianto', nim: 'A11.2021.13782' },
  { id: 5, nama: 'Salwa Salsabila', nim: 'A11.2020.12864' },
  { id: 6, nama: 'Fakhrurrozi', nim: 'A11.2020.12592' },
  { id: 7, nama: 'Khalivio Rahmiyanto Putra', nim: 'A11.2020.12969' },
  { id: 8, nama: 'Tarissa Aura Azzahra', nim: 'A11.2020.13158' },
  { id: 9, nama: 'Budi Santoso', nim: 'A11.2021.13201' },
  { id: 10, nama: 'Siti Aminah', nim: 'A12.2022.06543' },
  { id: 11, nama: 'Rizky Pratama', nim: 'A15.2021.01988' },
  { id: 12, nama: 'Dewi Lestari', nim: 'A14.2020.03456' },
];

// 2. MODUL PENGUMUMAN MBKM (MOCK DATA LENGKAP & CONTROLLER - SESUAI FAKULTAS-FE)
let pengumumanListData = [
  {
    id: 1,
    judul: 'Sosialisasi Alur Pengajuan Surat Rekomendasi (SuReKom) MBKM Gasal 2026/2027',
    sasaran: 'semua_mhs',
    sasaranLabel: 'Semua Mahasiswa MBKM',
    status: 'published',
    tgl: '12 Okt 2026',
    jam: '09:00 WIB',
    author: 'Nurul Anisa, M.Cs',
    isi: 'Diberitahukan kepada seluruh mahasiswa Fakultas Ilmu Komputer calon peserta MBKM Semester Gasal 2026/2027 bahwa pengajuan Surat Rekomendasi (SuReKom) wajib memenuhi batas IPK minimal 3.00 dan telah menempuh minimal 80 SKS. Pengajuan dilakukan secara mandiri melalui menu Rekomendasi sebelum batas akhir pendaftaran kontributor industri.',
    file: 'Panduan_SuReKom_MBKM_FIK_2026.pdf',
    pinned: true
  },
  {
    id: 2,
    judul: 'Batas Akhir Seleksi Administrasi & Rekomendasi Kontributor Industri Batch 1',
    sasaran: 'kontributor_dpl',
    sasaranLabel: 'Kontributor & DPL',
    status: 'published',
    tgl: '10 Okt 2026',
    jam: '14:30 WIB',
    author: 'Nurul Anisa, M.Cs',
    isi: 'Batas akhir pengunggahan hasil seleksi internal kontributor dan pengiriman daftar pelamar yang direkomendasikan adalah tanggal 20 Oktober 2026 pukul 23:59 WIB. Mohon PIC kontributor dan Dosen Pembimbing Lapangan segera memverifikasi kelengkapan berkas mahasiswa.',
    file: 'Format_Berita_Acara_Seleksi_Kontributor.xlsx',
    pinned: true
  },
  {
    id: 3,
    judul: 'Pembukaan Formasi Magang Baru di Bengkel Koding & PT Matic Edukasi Mandiri',
    sasaran: 'magang',
    sasaranLabel: 'Peserta Magang Industri',
    status: 'published',
    tgl: '08 Okt 2026',
    jam: '10:15 WIB',
    author: 'Tim MBKM FIK',
    isi: 'Telah dibuka 25 formasi kuota tambahan untuk track Fullstack Web Developer, UI/UX Designer, dan Mobile Flutter Developer di PT Bengkel Koding dan PT Matic Edukasi Mandiri. Mahasiswa yang telah disetujui SuReKom-nya dapat langsung mengajukan lamaran.',
    file: 'Silabus_Kompetensi_BengkelKoding_2026.pdf',
    pinned: false
  },
  {
    id: 4,
    judul: 'Jadwal Coaching Clinic Konversi 20 SKS MBKM & Pemetaan CPL Prodi',
    sasaran: 'semua_mhs',
    sasaranLabel: 'Semua Mahasiswa MBKM',
    status: 'published',
    tgl: '05 Okt 2026',
    jam: '13:00 WIB',
    author: 'Nurul Anisa, M.Cs',
    isi: 'Sesi pendampingan penyusunan konversi mata kuliah MBKM ke Capaian Pembelajaran Lulusan (CPL) program studi (Teknik Informatika, Sistem Informasi, dan DKV) akan diselenggarakan via Zoom Meeting pada hari Jumat, 16 Oktober 2026.',
    file: 'Matriks_Konversi_20_SKS_MBKM_FIK.pdf',
    pinned: false
  },
  {
    id: 5,
    judul: 'Sosialisasi Program MSIB Mandiri & Magang Bersertifikat Kementerian Batch 7',
    sasaran: 'semua_mhs',
    sasaranLabel: 'Semua Mahasiswa MBKM',
    status: 'published',
    tgl: '02 Okt 2026',
    jam: '08:45 WIB',
    author: 'Biro Administrasi Akademik',
    isi: 'Kementerian Pendidikan Tinggi telah membuka pendaftaran MSIB Mandiri dan Magang Bersertifikat Batch 7. Mahasiswa wajib melampirkan SPTJM dan Surat Rekomendasi Dekan FIK sebelum mengunggah berkas ke portal nasional.',
    file: 'Template_SPTJM_MSIB_2026.docx',
    pinned: false
  },
  {
    id: 6,
    judul: 'Ketentuan Penulisan & Validasi Logbook Mingguan Mahasiswa Magang Industri',
    sasaran: 'magang',
    sasaranLabel: 'Peserta Magang Industri',
    status: 'published',
    tgl: '28 Sep 2026',
    jam: '11:00 WIB',
    author: 'Nurul Anisa, M.Cs',
    isi: 'Setiap mahasiswa peserta magang industri wajib mengisi logbook aktivitas mingguan minimal 4 entry per minggu dengan menyertakan bukti dokumentasi pekerjaan. Validasi oleh DPL dilakukan maksimal setiap hari Minggu pukul 23:59 WIB.',
    file: 'Panduan_Pengisian_Logbook_MBKM.pdf',
    pinned: false
  },
  {
    id: 7,
    judul: 'Penetapan Dosen Pembimbing Lapangan (DPL) MBKM Semester Gasal 2026/2027',
    sasaran: 'kontributor_dpl',
    sasaranLabel: 'Kontributor & DPL',
    status: 'published',
    tgl: '25 Sep 2026',
    jam: '16:00 WIB',
    author: 'Dekanat FIK',
    isi: 'Surat Keputusan Dekan mengenai penetapan DPL untuk seluruh mahasiswa peserta MBKM aktif telah diterbitkan. Dosen pembimbing dapat melihat daftar mahasiswa bimbingan masing-masing pada menu Dosen Pembimbing.',
    file: 'SK_Dekan_Penetapan_DPL_MBKM_2026.pdf',
    pinned: false
  },
  {
    id: 8,
    judul: 'Pembekalan Pra-Magang & Etika Kerja Profesional bagi Peserta Studi Independen',
    sasaran: 'studi_independen',
    sasaranLabel: 'Peserta Studi Independen',
    status: 'published',
    tgl: '20 Sep 2026',
    jam: '09:30 WIB',
    author: 'Tim MBKM FIK',
    isi: 'Kuliah pembekalan umum mengenai integritas akademik, manajemen waktu pada platform LMS kontributor, serta etika komunikasi profesional akan dilaksanakan secara hybrid di Aula Gedung H lantai 7.',
    file: '',
    pinned: false
  },
  {
    id: 9,
    judul: 'Draf Panduan Pengajuan Perpanjangan Masa Magang Industri 6 Bulan',
    sasaran: 'magang',
    sasaranLabel: 'Peserta Magang Industri',
    status: 'draft',
    tgl: '15 Sep 2026',
    jam: '15:20 WIB',
    author: 'Nurul Anisa, M.Cs',
    isi: 'Draf prosedur perpanjangan masa magang bagi mahasiswa yang mendapatkan penawaran extend kontrak dari kontributor industri hingga 1 tahun penuh. Menunggu penyesuaian regulasi konversi SKS lanjutan.',
    file: '',
    pinned: false
  },
  {
    id: 10,
    judul: 'Draf Alur Evaluasi Tengah Semester (Mid-Term Monitoring & Evaluation)',
    sasaran: 'kontributor_dpl',
    sasaranLabel: 'Kontributor & DPL',
    status: 'draft',
    tgl: '10 Sep 2026',
    jam: '10:00 WIB',
    author: 'Koordinator MBKM FIK',
    isi: 'Format instrumen asesmen monev tengah semester oleh mentor industri dan DPL untuk mengevaluasi capaian kompetensi mahasiswa di lapangan.',
    file: '',
    pinned: false
  },
  {
    id: 11,
    judul: 'Arsip Panduan Monev & Format Logbook MBKM Semester Genap 2025/2026',
    sasaran: 'semua_mhs',
    sasaranLabel: 'Semua Mahasiswa MBKM',
    status: 'archived',
    tgl: '15 Jan 2026',
    jam: '08:00 WIB',
    author: 'Koordinator MBKM FIK',
    isi: 'Dokumentasi arsip pelaksanaan monitoring dan evaluasi MBKM periode lampau untuk referensi format pengisian rekap kegiatan mingguan dan penyusunan laporan akhir.',
    file: 'Arsip_Format_Logbook_Genap_2025.pdf',
    pinned: false
  },
  {
    id: 12,
    judul: 'Arsip Rekapitulasi Konversi SKS & Nilai Akhir MBKM Periode 20252',
    sasaran: 'semua_mhs',
    sasaranLabel: 'Semua Mahasiswa MBKM',
    status: 'archived',
    tgl: '20 Des 2025',
    jam: '11:30 WIB',
    author: 'Koordinator MBKM FIK',
    isi: 'Laporan arsip rekapitulasi konversi nilai 20 SKS mahasiswa peserta magang dan studi independen periode semester genap 2025/2026 yang telah disahkan ke SIADIN.',
    file: 'Arsip_Rekap_Nilai_MBKM_20252.pdf',
    pinned: false
  }
];

// 3. MODUL PERIODE AJARAN (PERSIS GAMBAR SCREENSHOT bimbingan-karir/periode-ajaran)
let periodeDataList = [
  { id: 1, kode: '20262', tahun: '2026/2027', mulai: '-', akhir: '-', status: 0 },
  { id: 2, kode: '20261', tahun: '2026/2027', mulai: '14 Sep 2026', akhir: '01 Okt 2026', status: 1 },
  { id: 3, kode: '20254', tahun: '2025/2026', mulai: '-', akhir: '-', status: 0 },
  { id: 4, kode: '20252', tahun: '2025/2026', mulai: '-', akhir: '-', status: 0 },
  { id: 5, kode: '20251', tahun: '2025/2026', mulai: '-', akhir: '-', status: 0 },
  { id: 6, kode: '20244', tahun: '2024/2025', mulai: '-', akhir: '-', status: 0 },
  { id: 7, kode: '20242', tahun: '2024/2025', mulai: '-', akhir: '-', status: 0 },
  { id: 8, kode: '20241', tahun: '2024/2025', mulai: '-', akhir: '-', status: 0 },
  { id: 9, kode: '20234', tahun: '2023/2024', mulai: '-', akhir: '-', status: 0 },
  { id: 10, kode: '20232', tahun: '2023/2024', mulai: '-', akhir: '-', status: 0 },
];
// Generate riwayat hingga 82 entri (Page 1 of 9) persis screenshot
(function initPeriodeHistoryData() {
  const tahunList = [
    '2023/2024', '2022/2023', '2021/2022', '2020/2021', '2019/2020',
    '2018/2019', '2017/2018', '2016/2017', '2015/2016', '2014/2015'
  ];
  let idCounter = 11;
  tahunList.forEach((th, tIdx) => {
    const baseYear = 2023 - tIdx;
    [4, 2, 1].forEach((sem) => {
      if (periodeDataList.length < 82) {
        periodeDataList.push({
          id: idCounter++,
          kode: `${baseYear}${sem}`,
          tahun: th,
          mulai: '-',
          akhir: '-',
          status: 0
        });
      }
    });
  });
})();

// ====================================================
// 3.B MODUL STANDARISASI FORM PENDAFTARAN MBKM (V2)
// ====================================================
let formPendaftaranConfig = {
  activeTab: 'akademik',
  ipkMin: 3.0,
  sksMin: 80,
  semesterMin: 5,
  bebasSanksi: true,
  terdaftarAktif: true,
  singleApp: true,
  docs: {
    cv: { label: 'Curriculum Vitae (CV ATS)', active: true, required: true, format: 'PDF (Maks 5 MB)' },
    portofolio: { label: 'Portofolio Karya & Repositori Proyek', active: true, required: true, format: 'Tautan Google Drive / Live URL' },
    transkrip: { label: 'Transkrip Nilai Akademik Terkini', active: true, required: true, format: 'PDF Resmi SIADIN' },
    izin: { label: 'Surat Pernyataan Komitmen & Izin Wali', active: true, required: false, format: 'PDF Bertandatangan Wali' },
  },
  customFields: [
    {
      id: 'cf-1',
      label: 'Tautan Profil LinkedIn / Portofolio Web Pribadi',
      type: 'url',
      placeholder: 'https://linkedin.com/in/username atau https://portofolio.dev',
      required: true,
    },
    {
      id: 'cf-2',
      label: 'Motivasi Singkat & Relevansi Minat dengan Kontributor (Maks 150 Kata)',
      type: 'textarea',
      placeholder: 'Jelaskan mengapa Anda tertarik dengan kontributor ini dan proyek apa yang ingin dikerjakan...',
      required: false,
    },
  ],
  konversiSksMax: 20,
  durasiMinimal: 5,
  wajibDrafMk: true,
  paktaIntegritas: true,
  surekomTemplate:
    'Dengan ini Koordinator MBKM Fakultas Ilmu Komputer Universitas Dian Nuswantoro menerangkan bahwa mahasiswa yang bersangkutan:\n\nNama: {nama_mahasiswa}\nNIM: {nim}\nProgram Studi: {program_studi}\nIPK Kumulatif: {ipk} ({sks_lulus} SKS)\n\nTelah memenuhi seluruh persyaratan akademik dan dinyatakan LAYAK serta DIREKOMENDASIKAN untuk mengikuti seleksi program MBKM pada instansi {nama_kontributor} untuk periode {semester_ajaran}.',
  surekomCutoff: '2026-10-25T23:59',
  ttdDigital: true,
};

let kontributorListData = [
  // --- KONTRIBUTOR INTERNAL (Akun login contributor masing-masing) ---
  {
    id: 1,
    nama: 'PT Bengkel Koding Nusantara',
    tipe: 'internal',
    deskripsi: 'Software house dan platform edukasi teknologi fokus pada fullstack web & mobile app.',
    sektor: 'Teknologi Informasi & Software',
    picNama: 'Dimas Wicaksono, M.T.',
    picEmail: 'dimas@bengkod.id',
    picPhone: '0812-3456-7890',
    role: 'mbkm_contributor',
    status: 'aktif',
    mou: '042/MoU/FIK-UDINUS/2026',
    alamat: 'Gedung Inkubator Bisnis UDINUS Lantai 3, Jl. Imam Bonjol No. 207, Semarang',
    avatar: 'BK',
    dosen: [
      { nama: 'Nurul Anisa S.W., M.Cs', nidn: '0686.11.2005.002', prodi: 'S1 Teknik Informatika', mhsCount: 5 },
      { nama: 'Dr. Muljono, S.Si, M.Kom', nidn: '0686.11.1993.001', prodi: 'S1 Teknik Informatika', mhsCount: 6 }
    ],
    mhs: [
      { nama: 'Calvin Revianto', nim: 'A11.2021.13782', prodi: 'S1 Teknik Informatika', posisi: 'Fullstack Web Developer', dpl: 'Nurul Anisa S.W., M.Cs', status: 'Aktif' },
      { nama: 'Salwa Salsabila', nim: 'A11.2020.12864', prodi: 'S1 Teknik Informatika', posisi: 'Cyber Security & Network', dpl: 'Nurul Anisa S.W., M.Cs', status: 'Aktif' },
      { nama: 'Fakhrurrozi', nim: 'A11.2020.12592', prodi: 'S1 Teknik Informatika', posisi: 'Fullstack Web Developer', dpl: 'Dr. Muljono, S.Si, M.Kom', status: 'Aktif' }
    ]
  },
  {
    id: 2,
    nama: 'PT Matic Edukasi Mandiri',
    tipe: 'internal',
    deskripsi: 'Penyelenggara pelatihan sertifikasi IT dan pengembangan talenta digital industri.',
    sektor: 'Edutech & Pelatihan',
    picNama: 'Rian Pratama, S.Kom',
    picEmail: 'rian@matic.co.id',
    picPhone: '0813-9876-5432',
    role: 'mbkm_contributor',
    status: 'aktif',
    mou: '051/MoU/FIK-UDINUS/2026',
    alamat: 'Rukan Sinpasa Commercial Blok A-12, Summarecon, Bekasi',
    avatar: 'ME',
    dosen: [
      { nama: 'Dr. Muljono, S.Si, M.Kom', nidn: '0686.11.1993.001', prodi: 'S1 Teknik Informatika', mhsCount: 6 }
    ],
    mhs: [
      { nama: "SYIFA AIN'NUR MANZILA", nim: 'A11.2019.12233', prodi: 'S1 Teknik Informatika', posisi: 'Mobile Developer (Flutter)', dpl: 'Dr. Muljono, S.Si, M.Kom', status: 'Aktif' },
      { nama: 'Tarissa Aura Azzahra', nim: 'A11.2020.13158', prodi: 'S1 Teknik Informatika', posisi: 'Mobile Developer (Flutter)', dpl: 'Nurul Anisa S.W., M.Cs', status: 'Aktif' }
    ]
  },
  {
    id: 3,
    nama: 'Ryuje Tech Studio',
    tipe: 'internal',
    deskripsi: 'Creative digital studio yang berfokus pada UI/UX design system dan pengembangan game indie.',
    sektor: 'Startup & Game Dev',
    picNama: 'Arya Putra, S.Ds',
    picEmail: 'arya@ryuje.studio',
    picPhone: '0821-4567-8901',
    role: 'mbkm_contributor',
    status: 'aktif',
    mou: '058/MoU/FIK-UDINUS/2026',
    alamat: 'Creative Hub Semarang, Jl. Pemuda No. 142, Semarang',
    avatar: 'RT',
    dosen: [
      { nama: 'Ahmad Zainul, M.Kom', nidn: '0686.11.2012.003', prodi: 'S1 Desain Komunikasi Visual', mhsCount: 4 }
    ],
    mhs: [
      { nama: 'Dewi Lestari', nim: 'A14.2020.03456', prodi: 'S1 DKV', posisi: 'UI/UX & Product Design', dpl: 'Ahmad Zainul, M.Kom', status: 'Aktif' }
    ]
  },
  {
    id: 4,
    nama: 'IDSS Laboratory FIK',
    tipe: 'internal',
    deskripsi: 'Laboratorium riset Intelligent Decision Support System Fakultas Ilmu Komputer UDINUS.',
    sektor: 'Laboratorium & Riset AI',
    picNama: 'Dr. Ricardus Anggi, M.Kom',
    picEmail: 'ricardus@dinus.ac.id',
    picPhone: '0811-2233-4455',
    role: 'mbkm_contributor',
    status: 'aktif',
    mou: '012/Internal/FIK-UDINUS/2026',
    alamat: 'Gedung H Lantai 6, Kampus Udinus, Jl. Nakula I No. 5-11, Semarang',
    avatar: 'ID',
    dosen: [
      { nama: 'Dr. Ricardus Anggi, M.Kom', nidn: '0686.11.2001.004', prodi: 'S1 Teknik Informatika', mhsCount: 6 }
    ],
    mhs: [
      { nama: 'Ahmad Fauzi', nim: 'A11.2021.13890', prodi: 'S1 Teknik Informatika', posisi: 'AI & Data Science Researcher', dpl: 'Dr. Ricardus Anggi, M.Kom', status: 'Aktif' },
      { nama: 'Khalivio Rahmiyanto Putra', nim: 'A11.2020.12969', prodi: 'S1 Teknik Informatika', posisi: 'AI Researcher', dpl: 'Dr. Ricardus Anggi, M.Kom', status: 'Aktif' }
    ]
  },

  // --- KONTRIBUTOR EKSTERNAL (Dikelola 1 Koordinator MBKM / Direct LoA - TANPA AKUN PORTAL) ---
  {
    id: 9,
    nama: 'PT. Presentologics (Dicoding Indonesia)',
    tipe: 'eksternal',
    deskripsi: 'Platform edukasi teknologi terakreditasi Kemendikbudristek untuk program pengembang AI dan cloud software engineering.',
    sektor: 'Edutech & Software Engineering',
    picNama: 'Narenda Wicaksono',
    picEmail: '',
    picPhone: '022-7564108',
    role: 'external_partner',
    status: 'aktif',
    mou: '085/MoU/FIK-UDINUS/2026',
    alamat: 'Jl. Batik Kumeli No. 50, Sukaluyu, Cibeunying Kaler, Bandung',
    avatar: 'DC',
    dosen: [
      { nama: 'Nurul Anisa S.W., M.Cs', nidn: '0686.11.2005.002', prodi: 'S1 Teknik Informatika', mhsCount: 4 }
    ],
    mhs: [
      {
        nama: 'Calvin Revianto',
        nim: 'A11.2021.13782',
        prodi: 'S1 Teknik Informatika',
        posisi: 'Machine Learning Cohort',
        noLoa: 'LoA-DCD/ASAH-7/2026/088',
        dpl: 'Nurul Anisa S.W., M.Cs',
        status: 'Disahkan (Aktif)'
      }
    ]
  },
  {
    id: 5,
    nama: 'PT Telekomunikasi Selular (Telkomsel)',
    tipe: 'eksternal',
    deskripsi: 'Operator telekomunikasi seluler digital terdepan di Indonesia untuk track Cyber Security & Big Data.',
    sektor: 'Telekomunikasi & Jaringan',
    picNama: 'Budi Santoso, M.Kom',
    picEmail: '', // Tanpa akun portal
    picPhone: '0811-9876-0001',
    role: 'external_partner',
    status: 'aktif',
    mou: '061/MoU/FIK-UDINUS/2026',
    alamat: 'Telkomsel Smart Office, Jl. Jend. Gatot Subroto Kav. 52, Jakarta Selatan',
    avatar: 'TS',
    dosen: [
      { nama: 'Nurul Anisa S.W., M.Cs', nidn: '0686.11.2005.002', prodi: 'S1 Teknik Informatika', mhsCount: 1 },
      { nama: 'Dr. Ricardus Anggi, M.Kom', nidn: '0686.11.2001.004', prodi: 'S1 Teknik Informatika', mhsCount: 1 }
    ],
    mhs: [
      {
        nama: 'Muhammad Rizky',
        nim: 'A11.2021.13901',
        prodi: 'S1 Teknik Informatika',
        posisi: 'Data Analyst Intern',
        noLoa: 'LoA-TS/MSIB-7/2026/0142',
        dpl: 'Nurul Anisa S.W., M.Cs',
        status: 'Disahkan (Aktif)'
      },
      {
        nama: 'Adinda Putri Rahayu',
        nim: 'A11.2020.12980',
        prodi: 'S1 Teknik Informatika',
        posisi: 'Cyber Security Defense',
        noLoa: 'LoA-TS/MSIB-7/2026/0199',
        dpl: 'Dr. Ricardus Anggi, M.Kom',
        status: 'Disahkan (Aktif)'
      }
    ]
  },
  {
    id: 6,
    nama: 'PT Bank Central Asia Tbk (BCA)',
    tipe: 'eksternal',
    deskripsi: 'Institusi perbankan swasta terbesar nasional dengan divisi IT inovasi perbankan digital & Core Banking.',
    sektor: 'Fintech & Perbankan',
    picNama: 'Maya Kartika, S.T.',
    picEmail: '', // Tanpa akun portal
    picPhone: '0812-8899-7711',
    role: 'external_partner',
    status: 'aktif',
    mou: '070/MoU/FIK-UDINUS/2026',
    alamat: 'Menara BCA Grand Indonesia, Jl. M.H. Thamrin No. 1, Jakarta Pusat',
    avatar: 'BC',
    dosen: [
      { nama: 'Dr. Muljono, S.Si, M.Kom', nidn: '0686.11.1993.001', prodi: 'S1 Teknik Informatika', mhsCount: 2 }
    ],
    mhs: [
      {
        nama: 'Indah Puspitasari',
        nim: 'A11.2020.12450',
        prodi: 'S1 Teknik Informatika',
        posisi: 'Backend Banking Engineer',
        noLoa: 'SK-BCA-MAGANG/2026/045',
        dpl: 'Dr. Muljono, S.Si, M.Kom',
        status: 'Disahkan (Aktif)'
      },
      {
        nama: 'Geraldo Bagas Wicaksono',
        nim: 'A11.2021.13755',
        prodi: 'S1 Teknik Informatika',
        posisi: 'IT Quality Assurance',
        noLoa: 'SK-BCA-MAGANG/2026/078',
        dpl: 'Dr. Muljono, S.Si, M.Kom',
        status: 'Disahkan (Aktif)'
      }
    ]
  },
  {
    id: 7,
    nama: 'PT Tokopedia (GoTo Group)',
    tipe: 'eksternal',
    deskripsi: 'Perusahaan teknologi terkemuka Indonesia di bidang e-commerce dan ekosistem marketplace digital skala besar.',
    sektor: 'E-Commerce & Digital Platform',
    picNama: 'Agus Setiawan, S.Kom',
    picEmail: '', // Tanpa akun portal
    picPhone: '0813-1122-3344',
    role: 'external_partner',
    status: 'aktif',
    mou: '075/MoU/FIK-UDINUS/2026',
    alamat: 'Tokopedia Tower Ciputra World 2, Jl. Prof. DR. Satrio Kav. 11, Jakarta Selatan',
    avatar: 'TK',
    dosen: [
      { nama: 'Nurul Anisa S.W., M.Cs', nidn: '0686.11.2005.002', prodi: 'S1 Teknik Informatika', mhsCount: 1 }
    ],
    mhs: [
      {
        nama: 'Bambang Triatmojo',
        nim: 'A11.2021.13920',
        prodi: 'S1 Teknik Informatika',
        posisi: 'Frontend Engineer',
        noLoa: 'GOTO/INTERN/2026/092',
        dpl: 'Nurul Anisa S.W., M.Cs',
        status: 'Disahkan (Aktif)'
      }
    ]
  },
  {
    id: 8,
    nama: 'Badan Siber dan Sandi Negara (BSSN)',
    tipe: 'eksternal',
    deskripsi: 'Lembaga pemerintah non-kementerian di bidang keamanan siber, kriptografi, dan ketahanan siber nasional.',
    sektor: 'Keamanan Siber & Pemerintah',
    picNama: 'Kol. Ir. Wahyu Hidayat, M.T.',
    picEmail: '', // Tanpa akun portal
    picPhone: '021-7890-1234',
    role: 'external_partner',
    status: 'aktif',
    mou: '080/MoU/FIK-UDINUS/2026',
    alamat: 'Kantor BSSN Ragunan, Jl. Harsono RM No. 70, Ragunan, Jakarta Selatan',
    avatar: 'BS',
    dosen: [
      { nama: 'Dr. Ricardus Anggi, M.Kom', nidn: '0686.11.2001.004', prodi: 'S1 Teknik Informatika', mhsCount: 1 }
    ],
    mhs: [
      {
        nama: 'Dinda Ayu Lestari',
        nim: 'A11.2021.13945',
        prodi: 'S1 Teknik Informatika',
        posisi: 'SOC Analyst Intern',
        noLoa: 'BSSN/DIKTI/2026/011',
        dpl: 'Dr. Ricardus Anggi, M.Kom',
        status: 'Disahkan (Aktif)'
      }
    ]
  }
];

// Master list kontributor untuk tab 'Pilih dari List'
const masterKontributorList = [
  {
    id: 101,
    nama: 'PT Telekomunikasi Selular (Telkomsel)',
    deskripsi: 'Operator telekomunikasi digital terdepan di Indonesia untuk track Cyber Security & Big Data Analytics.',
    email: 'partnership@telkomsel.co.id',
    picNama: 'Budi Santoso, M.Kom',
    sektor: 'Telekomunikasi & Jaringan',
    alamat: 'Jl. Jend. Gatot Subroto Kav. 52, Jakarta Selatan',
    avatar: 'TS'
  },
  {
    id: 102,
    nama: 'PT Bank Central Asia Tbk (BCA)',
    deskripsi: 'Institusi perbankan swasta terbesar nasional dengan divisi IT inovasi perbankan digital & Core Banking.',
    email: 'career.it@bca.co.id',
    picNama: 'Maya Kartika, S.T.',
    sektor: 'Fintech & Perbankan',
    alamat: 'Menara BCA Grand Indonesia, Jakarta Pusat',
    avatar: 'BC'
  },
  {
    id: 103,
    nama: 'PT Tokopedia (GoTo Group)',
    deskripsi: 'Perusahaan teknologi terkemuka Indonesia di bidang e-commerce dan ekosistem marketplace digital skala besar.',
    email: 'campus.relations@tokopedia.com',
    picNama: 'Agus Setiawan, S.Kom',
    sektor: 'E-Commerce & Digital Platform',
    alamat: 'Tokopedia Tower, Jl. Prof. DR. Satrio, Jakarta Selatan',
    avatar: 'TK'
  },
  {
    id: 104,
    nama: 'PT Astra International Tbk',
    deskripsi: 'Konglomerat multinasional dengan unit bisnis digital transformation & otomasi logistik manufaktur.',
    email: 'talent.mbkm@astra.co.id',
    picNama: 'Hendro Wijaya, S.T.',
    sektor: 'Manufaktur & Transformasi Digital',
    alamat: 'Menara Astra, Jl. Jend. Sudirman Kav. 5-6, Jakarta Pusat',
    avatar: 'AI'
  },
  {
    id: 105,
    nama: 'Badan Siber dan Sandi Negara (BSSN)',
    deskripsi: 'Lembaga pemerintah non-kementerian di bidang keamanan siber, kriptografi, dan ketahanan siber nasional.',
    email: 'kerjasama.akademik@bssn.go.id',
    picNama: 'Kol. Ir. Wahyu Hidayat, M.T.',
    sektor: 'Keamanan Siber & Pemerintah',
    alamat: 'Jl. Harsono RM No. 70, Ragunan, Jakarta Selatan',
    avatar: 'BS'
  },
  {
    id: 106,
    nama: 'PT Djarum Indonesia (Djarum Group)',
    deskripsi: 'Divisi Business Technology & Information System untuk supply chain dan enterprise ERP.',
    email: 'recruitment.ti@djarum.com',
    picNama: 'Dra. Ratna Juwita, M.M.',
    sektor: 'Enterprise & Supply Chain',
    alamat: 'Jl. Ahmad Yani No. 28, Kudus, Jawa Tengah',
    avatar: 'DJ'
  },
  {
    id: 107,
    nama: 'PT Shopee International Indonesia (Sea Group)',
    deskripsi: 'Platform e-commerce global terkemuka untuk pengembangan talenta software engineering dan machine learning.',
    email: 'sea.labs@shopee.co.id',
    picNama: 'Kevin Jonathan, B.Sc',
    sektor: 'E-Commerce & AI',
    alamat: 'Pacific Century Place, SCBD Lot 10, Jakarta Selatan',
    avatar: 'SH'
  },
  {
    id: 108,
    nama: 'PT Indosat Ooredoo Hutchison',
    deskripsi: 'Penyedia telekomunikasi digital inovatif dengan fokus cloud computing dan IoT enterprise.',
    email: 'academy@ioh.co.id',
    picNama: 'Faisal Ramadhan, M.T.',
    sektor: 'Telekomunikasi & Cloud',
    alamat: 'Jl. Medan Merdeka Barat No. 21, Jakarta Pusat',
    avatar: 'IO'
  }
];

// Repository CMS Data per Kontributor (Indeks ID Kontributor)
const kontributorCmsDataMap = {
  9: {
    kontributor: 'PT. Presentologics (Dicoding Indonesia)',
    sektor: 'Edutech & Software Engineering',
    lokasi: 'Hybrid (Daring & Lab FIK UDINUS)',
    periode: 'Semester Gasal 2026/2027',
    mou: '085/MoU/FIK-UDINUS/2026',
    badge: 'Kontributor Unggulan Nasional',
    deadline: '25 Oktober 2026 • 23:59 WIB',
    deskripsiHero: 'Program kerja sama strategis Dicoding Indonesia bersama Kampus Berdampak FIK UDINUS dirancang untuk membekali mahasiswa dengan keahlian industri tingkat lanjut di bidang Machine Learning, Full-Stack Engineering, dan Cloud Infrastructure.\n\nSelama satu semester (5 bulan penuh), peserta akan dibimbing langsung oleh mentor industri kelas dunia, menyelesaikan proyek nyata skala enterprise, serta memperoleh hak konversi akademik otomatis hingga 20 SKS ke mata kuliah konsentrasi program studi.',
    poin1: 'Sertifikasi Global Dicoding & Partner',
    poin2: 'Uang Saku Pembinaan Kontributor',
    poin3: 'Kelas Khusus MBKM Pra-KRS',
    koorNama: 'Jane Doe',
    koorJabatan: 'Koordinator Kampus Berdampak FIK UDINUS',
    koorFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    showcases: [
      {
        id: 'PRJ-2026-01',
        batch: 'Capstone Project Batch 6',
        kategori: 'Smart Energy • IoT & ML',
        judul: 'Smart Energy & Air Quality Monitoring Campus FIK',
        deskripsi: 'Sistem prediksi konsumsi daya listrik cerdas dan pemantauan kualitas udara di gedung perkuliahan FIK secara real-time berbasis sensor ESP32, model prediktif LSTM, dan dashboard visual analitik.',
        tech: ['Python', 'TensorFlow', 'React.js', 'Google Cloud']
      },
      {
        id: 'PRJ-2026-02',
        batch: 'Capstone Project Batch 5',
        kategori: 'Attendance AI • Computer Vision',
        judul: 'Vision-Based Automated Academic Attendance & Fraud Detection',
        deskripsi: 'Implementasi sistem absensi presensi wajah otomatis dengan deteksi liveness anti-spoofing menggunakan kamera CCTV kelas perkuliahan terintegrasi sistem presensi akademik FIK.',
        tech: ['Python', 'PyTorch', 'YOLOv8', 'FastAPI']
      },
      {
        id: 'PRJ-2026-03',
        batch: 'Capstone Project Batch 5',
        kategori: 'Robotics • Robotics & AI',
        judul: 'Autonomous Robotic Trash Segregator for Green Campus',
        deskripsi: 'Robot pemilah sampah otomatis berbasis sensor spektrometri dan vision classifier yang memisahkan sampah organik, anorganik, dan B3 pada area kantin dan selasar kampus FIK.',
        tech: ['ROS2', 'OpenCV', 'Edge TPU', 'C++']
      }
    ]
  },
  1: {
    kontributor: 'PT Bengkel Koding Nusantara',
    sektor: 'Teknologi Informasi & Software',
    lokasi: 'Luring (Lab Inkubator FIK UDINUS)',
    periode: 'Semester Gasal 2026/2027',
    mou: '042/MoU/FIK-UDINUS/2026',
    badge: 'Kontributor Unggulan Kampus',
    deadline: '20 Oktober 2026 • 23:59 WIB',
    deskripsiHero: 'Platform inkubasi teknologi dan software house internal kampus yang berfokus pada pengembangan perangkat lunak skala enterprise berbasis Laravel, Next.js, dan cloud microservices terdistribusi.',
    poin1: 'Mentoring Intensif Tech Lead Industri',
    poin2: 'Hands-on Production Codebase',
    poin3: 'Akses Workspace Lab Eksklusif',
    koorNama: 'Nurul Anisa S.W., M.Cs',
    koorJabatan: 'Koordinator MBKM FIK UDINUS',
    koorFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    showcases: [
      {
        id: 'PRJ-2026-BK1',
        batch: 'Batch 5',
        kategori: 'Fullstack Web & Cloud',
        judul: 'Sistem Informasi Presensi Kampus Berdampak Realtime',
        deskripsi: 'Platform presensi berbasis GPS geofencing dan integrasi Telegram Bot untuk pemantauan kehadiran magang mahasiswa.',
        tech: ['Laravel 11', 'Next.js 14', 'MySQL', 'Tailwind CSS']
      }
    ]
  }
};

let pelamarListData = [
  {
    id: 1,
    nama: 'Muhammad Hafizh Izzuddin',
    nim: 'A11.2020.13188',
    email: '111202013188@mhs.dinus.ac.id',
    noHp: '0882003419451',
    foto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'Dicoding Indonesia',
    kategoriKontributor: 'eksternal',
    program: 'Dicoding ASAH 2026 — Artificial Intelligence & Cloud Computing',
    status: 'baru',
    ipk: '3.82',
    sksLulus: 114,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Projek ini merancang infrastruktur cloud native untuk microservices menggunakan Infrastructure as Code (IaC). Fokusnya pada otomatisasi deployment, auto-scaling, serta peningkatan keandalan dan efisiensi biaya operasional aplikasi.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54802', nama: 'Proyek Perangkat Lunak Terapan', sks: 6 },
      { kode: 'A11.54803', nama: 'Cloud Computing & DevOps', sks: 6 }
    ],
    minat: ['Cloud Computing', 'DevOps'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Kamis, 24 September 2026, 17:33'
  },
  {
    id: 2,
    nama: 'Adhitya Nugraha',
    nim: 'A11.2021.13450',
    email: '111202113450@mhs.dinus.ac.id',
    noHp: '081298765432',
    foto: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'Bangkit Academy',
    kategoriKontributor: 'eksternal',
    program: 'Bangkit Academy 2026 by Google, GoTo, Traveloka — Machine Learning Cohort',
    status: 'baru',
    ipk: '3.75',
    sksLulus: 108,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Fokus pada pengembangan model deep learning computer vision untuk deteksi anomali pada citra satelit dan deployment model ke arsitektur mobile edge menggunakan TensorFlow Lite.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54804', nama: 'Machine Learning Lanjut', sks: 6 },
      { kode: 'A11.54805', nama: 'Deep Learning Terapan', sks: 6 }
    ],
    minat: ['Machine Learning', 'Computer Vision'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Jumat, 25 September 2026, 09:15'
  },
  {
    id: 3,
    nama: 'Anindya Putri Maharani',
    nim: 'A12.2021.06642',
    email: '112202106642@mhs.dinus.ac.id',
    noHp: '082155443322',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Sistem Informasi',
    kontributor: 'PT Telkom Indonesia',
    kategoriKontributor: 'eksternal',
    program: 'Digital Amoeba Telkom — Business Process Digitalization & IT Analyst',
    status: 'baru',
    ipk: '3.88',
    sksLulus: 118,
    semester: 'Semester 6',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Analisis rekayasa proses bisnis enterprise dan perancangan arsitektur data warehouse untuk mendukung sistem intelijen bisnis pemantauan performa layanan telekomunikasi regional.',
    matkulDiambil: [
      { kode: 'A12.54801', nama: 'Magang Industri Sistem Informasi', sks: 8 },
      { kode: 'A12.54802', nama: 'Business Intelligence & Big Data', sks: 6 },
      { kode: 'A12.54803', nama: 'Enterprise Architecture', sks: 6 }
    ],
    minat: ['Business Analysis', 'Data Warehouse'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Senin, 28 September 2026, 14:20'
  },
  {
    id: 4,
    nama: 'Fauzan Akbar Rabbani',
    nim: 'A11.2021.13902',
    email: '111202113902@mhs.dinus.ac.id',
    noHp: '085712345678',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'Dicoding Indonesia',
    kategoriKontributor: 'eksternal',
    program: 'Dicoding ASAH 2026 — Multi-Platform Web & Mobile App Engineering',
    status: 'baru',
    ipk: '3.65',
    sksLulus: 98,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Membangun aplikasi mobile cross-platform berbasis Flutter terintegrasi microservice backend Node.js dan PostgreSQL dengan pengujian unit test dan pipeline CI/CD otomatis.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54806', nama: 'Pemrograman Mobile Framework', sks: 6 },
      { kode: 'A11.54807', nama: 'Arsitektur Perangkat Lunak', sks: 6 }
    ],
    minat: ['Mobile Development', 'Flutter'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Selasa, 29 September 2026, 11:05'
  },
  {
    id: 5,
    nama: 'Budi Santoso',
    nim: 'A11.2021.13201',
    email: '111202113201@mhs.dinus.ac.id',
    noHp: '081324567890',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'Bengkel Koding',
    kategoriKontributor: 'internal',
    program: 'Bengkel Koding Batch 6 — Jalur Asistensi Project Perangkat Lunak',
    status: 'baru',
    ipk: '3.70',
    sksLulus: 104,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Pengembangan modul e-commerce terintegrasi payment gateway dan webhook otomatis untuk UMKM binaan kampus FIK.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54802', nama: 'Proyek Perangkat Lunak Terapan', sks: 6 },
      { kode: 'A11.54803', nama: 'Cloud Computing & DevOps', sks: 6 }
    ],
    minat: ['Fullstack Web', 'Laravel & React'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Rabu, 30 September 2026, 16:45'
  },
  {
    id: 6,
    nama: 'Siti Aminah',
    nim: 'A12.2022.06543',
    email: '112202206543@mhs.dinus.ac.id',
    noHp: '087811223344',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Sistem Informasi',
    kontributor: 'PT Matic Edukasi Mandiri',
    kategoriKontributor: 'internal',
    program: 'Matic Edukasi — EduTech System & LMS Platform Engineering',
    status: 'baru',
    ipk: '3.62',
    sksLulus: 92,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Pengembangan fitur gamifikasi dan interactive quiz real-time berbasis WebSockets pada aplikasi pembelajaran daring.',
    matkulDiambil: [
      { kode: 'A12.54801', nama: 'Magang Industri Sistem Informasi', sks: 8 },
      { kode: 'A12.54804', nama: 'Pengembangan Aplikasi Web Lanjut', sks: 6 },
      { kode: 'A12.54805', nama: 'Interaksi Manusia dan Komputer', sks: 6 }
    ],
    minat: ['Frontend', 'Edutech'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Kamis, 01 Oktober 2026, 13:10'
  },
  {
    id: 7,
    nama: 'Rizky Pratama',
    nim: 'A15.2021.01988',
    email: '115202101988@mhs.dinus.ac.id',
    noHp: '089677889900',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 DKV',
    kontributor: 'Ryuje Tech Studio',
    kategoriKontributor: 'internal',
    program: 'Ryuje Studio — 3D Asset Design & Interactive Animation',
    status: 'baru',
    ipk: '3.78',
    sksLulus: 106,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Pembuatan aset karakter 3D low-poly dan animasi mekanik interaktif untuk aplikasi edukasi virtual reality kampus.',
    matkulDiambil: [
      { kode: 'A15.54801', nama: 'Proyek Desain Komunikasi MBKM', sks: 8 },
      { kode: 'A15.54802', nama: 'Animasi 3D Karakter', sks: 6 },
      { kode: 'A15.54803', nama: 'Desain Interaktif & VR', sks: 6 }
    ],
    minat: ['3D Modeling', 'Blender'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Jumat, 02 Oktober 2026, 10:30'
  },
  {
    id: 8,
    nama: 'Nabila Putri Cahyani',
    nim: 'A12.2022.06712',
    email: '112202206712@mhs.dinus.ac.id',
    noHp: '081233445566',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Sistem Informasi',
    kontributor: 'Dicoding Indonesia',
    kategoriKontributor: 'eksternal',
    program: 'Dicoding ASAH 2026 — Artificial Intelligence & Cloud Computing',
    status: 'diterima',
    ipk: '3.91',
    sksLulus: 116,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Pengembangan data pipeline ETL dan dashboard visualisasi performa model analitik berbasis cloud BigQuery.',
    matkulDiambil: [
      { kode: 'A12.54801', nama: 'Magang Industri Sistem Informasi', sks: 8 },
      { kode: 'A12.54802', nama: 'Business Intelligence & Big Data', sks: 6 },
      { kode: 'A12.54803', nama: 'Enterprise Architecture', sks: 6 }
    ],
    minat: ['Data Engineering', 'BigQuery'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Senin, 21 September 2026, 08:30'
  },
  {
    id: 9,
    nama: 'Farhan Maulana',
    nim: 'A11.2021.13880',
    email: '111202113880@mhs.dinus.ac.id',
    noHp: '082244668800',
    foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'Bangkit Academy',
    kategoriKontributor: 'eksternal',
    program: 'Bangkit Academy 2026 — Cloud Computing Track',
    status: 'diterima',
    ipk: '3.80',
    sksLulus: 110,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Implementasi arsitektur serverless microservices di Google Cloud Platform menggunakan Cloud Run dan Firestore.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54802', nama: 'Proyek Perangkat Lunak Terapan', sks: 6 },
      { kode: 'A11.54803', nama: 'Cloud Computing & DevOps', sks: 6 }
    ],
    minat: ['Cloud Architecture', 'GCP'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Selasa, 22 September 2026, 14:00'
  },
  {
    id: 10,
    nama: 'Dimas Anggara Kusuma',
    nim: 'A11.2020.12908',
    email: '111202012908@mhs.dinus.ac.id',
    noHp: '081399887766',
    foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=256',
    prodi: 'S1 Teknik Informatika',
    kontributor: 'PT Telkom Indonesia',
    kategoriKontributor: 'eksternal',
    program: 'Digital Amoeba Telkom — Cloud Infrastructure & Cyber Defense',
    status: 'ditolak',
    ipk: '2.85',
    sksLulus: 76,
    semester: 'Semester 5',
    semesterAjaran: 'Gasal 2026/2027',
    deskripsi: 'Pendaftaran belum memenuhi batas ambang minimal IPK 3.00 dan SKS lulus 80 SKS sesuai regulasi MBKM.',
    matkulDiambil: [
      { kode: 'A11.54801', nama: 'Praktik Kerja Lapangan MBKM', sks: 8 },
      { kode: 'A11.54802', nama: 'Proyek Perangkat Lunak Terapan', sks: 6 },
      { kode: 'A11.54803', nama: 'Cloud Computing & DevOps', sks: 6 }
    ],
    minat: ['Cyber Security', 'Network'],
    links: [
      { label: 'CV', url: 'https://drive.google.com/file/d/cv/view', wajib: true },
      { label: 'Portfolio', url: 'https://drive.google.com/file/d/portfolio/view', wajib: true }
    ],
    tanggalPengajuan: 'Rabu, 23 September 2026, 11:20'
  }
];

// 6. MODUL SEMUA MAHASISWA (DIREKTORI PESERTA AKTIF)
let semuaMhsListData = [
  {
    id: 1,
    nama: 'Calvin Revianto',
    nim: 'A11.2021.13782',
    prodi: 'S1 Teknik Informatika',
    email: 'calvin@mhs.dinus.ac.id',
    phone: '0812-3456-7890',
    kontributor: 'Bengkel Koding',
    posisi: 'Fullstack Web Developer',
    dpl: 'Nurul Anisa S.W., M.Cs',
    logbookFilled: 12,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 2,
    nama: 'Salwa Salsabila',
    nim: 'A11.2020.12864',
    prodi: 'S1 Teknik Informatika',
    email: 'salwa@mhs.dinus.ac.id',
    phone: '0813-1122-3344',
    kontributor: 'Bengkel Koding',
    posisi: 'Cyber Security Specialist',
    dpl: 'Nurul Anisa S.W., M.Cs',
    logbookFilled: 14,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 3,
    nama: "SYIFA AIN'NUR MANZILA",
    nim: 'A11.2019.12233',
    prodi: 'S1 Teknik Informatika',
    email: 'syifa@mhs.dinus.ac.id',
    phone: '0812-9988-7766',
    kontributor: 'PT Matic Edukasi Mandiri',
    posisi: 'Mobile Application Developer',
    dpl: 'Dr. Muljono, S.Si, M.Kom',
    logbookFilled: 10,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 4,
    nama: 'Dewi Lestari',
    nim: 'A14.2020.03456',
    prodi: 'S1 DKV',
    email: 'dewi@mhs.dinus.ac.id',
    phone: '0815-4433-2211',
    kontributor: 'Ryuje Tech Studio',
    posisi: 'UI/UX & Product Design',
    dpl: 'Ahmad Zainul, M.Kom',
    logbookFilled: 13,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 5,
    nama: 'Ahmad Fauzi',
    nim: 'A11.2021.13890',
    prodi: 'S1 Teknik Informatika',
    email: 'fauzi@mhs.dinus.ac.id',
    phone: '0819-0011-2233',
    kontributor: 'IDSS Laboratory',
    posisi: 'AI & Data Science Researcher',
    dpl: 'Dr. Ricardus Anggi, M.Kom',
    logbookFilled: 12,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 6,
    nama: 'Fakhrurrozi',
    nim: 'A11.2020.12592',
    prodi: 'S1 Teknik Informatika',
    email: 'fakhrur@mhs.dinus.ac.id',
    phone: '0821-3344-5566',
    kontributor: 'Bengkel Koding',
    posisi: 'Fullstack Web Developer',
    dpl: 'Dr. Muljono, S.Si, M.Kom',
    logbookFilled: 11,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 7,
    nama: 'Tarissa Aura Azzahra',
    nim: 'A11.2020.13158',
    prodi: 'S1 Teknik Informatika',
    email: 'tarissa@mhs.dinus.ac.id',
    phone: '0822-7788-9900',
    kontributor: 'PT Matic Edukasi Mandiri',
    posisi: 'Mobile Application Developer',
    dpl: 'Nurul Anisa S.W., M.Cs',
    logbookFilled: 14,
    logbookTotal: 16,
    status: 'Aktif'
  },
  {
    id: 8,
    nama: 'Khalivio Rahmiyanto Putra',
    nim: 'A11.2020.12969',
    prodi: 'S1 Teknik Informatika',
    email: 'khalivio@mhs.dinus.ac.id',
    phone: '0813-5566-7788',
    kontributor: 'IDSS Laboratory',
    posisi: 'AI Researcher',
    dpl: 'Dr. Ricardus Anggi, M.Kom',
    logbookFilled: 12,
    logbookTotal: 16,
    status: 'Aktif'
  }
];

