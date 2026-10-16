export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface RoleNavConfig {
  role: 'admin' | 'mahasiswa' | 'mitra';
  roleTitle: string;
  items: NavItem[];
}

export const navigationMenus: Record<string, RoleNavConfig> = {
  admin: {
    role: 'admin',
    roleTitle: 'Koordinator MBKM',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: 'layout-dashboard' },
      { id: 'pengumuman', label: 'Pengumuman', href: '/admin/pengumuman', icon: 'megaphone' },
      { id: 'periode', label: 'Periode Ajaran', href: '/admin/periode', icon: 'calendar-range' },
      { id: 'form-pendaftaran', label: 'Form Pendaftaran', href: '/admin/form-pendaftaran', icon: 'clipboard-list' },
      { id: 'mitra', label: 'Mitra', href: '/admin/mitra', icon: 'building-2' },
      { id: 'pelamar', label: 'Pelamar', href: '/admin/pelamar', icon: 'user-check' },
      { id: 'semua-mahasiswa', label: 'Semua Mahasiswa', href: '/admin/semua-mahasiswa', icon: 'users' },
      { id: 'surekom', label: 'Surat Rekomendasi', href: '/admin/surekom', icon: 'file-check' },
      { id: 'program', label: 'Program MBKM', href: '/admin/program', icon: 'briefcase' },
      { id: 'koordinator', label: 'Koordinator', href: '/admin/koordinator', icon: 'graduation-cap' },
      { id: 'logbook', label: 'Logbook Mahasiswa', href: '/admin/logbook', icon: 'book-open' },
      { id: 'laporan', label: 'Laporan & Sidang', href: '/admin/laporan', icon: 'file-text' },
    ]
  },
  mahasiswa: {
    role: 'mahasiswa',
    roleTitle: 'Mahasiswa MBKM',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/mahasiswa/dashboard', icon: 'layout-dashboard' },
      { id: 'eksplorasi', label: 'Eksplorasi Program', href: '/mahasiswa/eksplorasi', icon: 'compass' },
      { id: 'lamaran', label: 'Lamaran Saya', href: '/mahasiswa/lamaran', icon: 'send' },
      { id: 'logbook', label: 'Logbook Harian', href: '/mahasiswa/logbook', icon: 'book-open' },
      { id: 'laporan', label: 'Laporan Akhir', href: '/mahasiswa/laporan', icon: 'file-text' },
    ]
  },
  mitra: {
    role: 'mitra',
    roleTitle: 'Mitra & Kontributor',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/mitra/dashboard', icon: 'layout-dashboard' },
      { id: 'program', label: 'Kelola Program', href: '/mitra/program', icon: 'briefcase' },
      { id: 'seleksi', label: 'Seleksi Pelamar', href: '/mitra/seleksi', icon: 'user-check' },
      { id: 'anggota', label: 'Anggota & Dosen', href: '/mitra/anggota', icon: 'users' },
    ]
  }
};
