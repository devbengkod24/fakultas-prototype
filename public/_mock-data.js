/**
 * MOCK DATA — Mahasiswa MBKM v2
 */

let appState = {
  isEligible: true, // Cabang: Lolos vs Tidak Lolos
  student: {
    name: 'Ahmad Rizky Pratama',
    nim: 'A11.2022.14253',
    prodi: 'Teknik Informatika',
    smt: 6,
    ipk: 3.72,
    sks: 104
  },
  registration: {
    program: 'Magang Mandiri',
    mitra: 'PT Telkom Indonesia (Persero) Tbk',
    posisi: 'Software Engineer Intern',
    durasi: '1 Semester (6 Bulan)',
    transkripName: 'Transkrip_Nilai_Ahmad_Rizky.pdf',
    cvName: 'CV_Ahmad_Rizky_Pratama.pdf',
    tanggal: '10 Oktober 2025'
  },
  trackingStatus: 'pending' // 'pending' | 'accepted' | 'rejected'
};
