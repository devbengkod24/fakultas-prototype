export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface RoleNavConfig {
  role: "admin" | "mahasiswa" | "mitra";
  roleTitle: string;
  items: NavItem[];
}

export const navigationMenus: Record<string, RoleNavConfig> = {
  admin: {
    role: "admin",
    roleTitle: "Koordinator MBKM",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "layout-dashboard" },
      { id: "pengumuman", label: "Pengumuman", href: "/admin/pengumuman", icon: "megaphone" },
      { id: "periode", label: "Periode Ajaran", href: "/admin/periode", icon: "calendar-range" },
      { id: "form-pendaftaran", label: "Form Pendaftaran", href: "/admin/form-pendaftaran", icon: "clipboard-list" },
      { id: "mitra", label: "Mitra", href: "/admin/mitra", icon: "building-2" },
      { id: "pelamar", label: "Pelamar", href: "/admin/pelamar", icon: "user-check" },
      { id: "semua-mahasiswa", label: "Semua Mahasiswa", href: "/admin/semua-mahasiswa", icon: "users" },
      { id: "surekom", label: "Surat Rekomendasi", href: "/admin/surekom", icon: "file-check" },
      { id: "program", label: "Program MBKM", href: "/admin/program", icon: "briefcase" },
      { id: "koordinator", label: "Koordinator", href: "/admin/koordinator", icon: "graduation-cap" },
      { id: "logbook", label: "Logbook Mahasiswa", href: "/admin/logbook", icon: "book-open" },
      { id: "laporan", label: "Laporan & Sidang", href: "/admin/laporan", icon: "file-text" },
    ]
  },
  mahasiswa: {
    role: "mahasiswa",
    roleTitle: "Mahasiswa MBKM",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/mahasiswa/dashboard", icon: "layout-dashboard" },
      { id: "pengumuman", label: "Pengumuman", href: "/mahasiswa/pengumuman", icon: "megaphone" },
      { id: "katalog", label: "Katalog Program", href: "/mahasiswa/katalog", icon: "compass" },
      { id: "pendaftaran", label: "Form Pendaftaran", href: "/mahasiswa/pendaftaran", icon: "clipboard-list" },
      { id: "status", label: "Status Pengajuan", href: "/mahasiswa/status", icon: "file-check" },
      { id: "dosen-pembimbing", label: "Dosen Pembimbing", href: "/mahasiswa/dosen-pembimbing", icon: "graduation-cap" },
      { id: "logbook", label: "Logbook Kegiatan", href: "/mahasiswa/logbook", icon: "book-open" },
      { id: "konversi-sks", label: "Konversi SKS", href: "/mahasiswa/konversi-sks", icon: "layers" },
      { id: "sidang", label: "Sidang Evaluasi", href: "/mahasiswa/sidang", icon: "calendar-check" },
      { id: "sertifikat", label: "Sertifikat & Luaran", href: "/mahasiswa/sertifikat", icon: "award" },
      { id: "log-aktivitas", label: "Log Aktivitas", href: "/mahasiswa/log-aktivitas", icon: "history" },
    ]
  },
  mitra: {
    role: "mitra",
    roleTitle: "Mitra & Kontributor",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/mitra/dashboard", icon: "layout-dashboard" },
      { id: "program", label: "Kelola Program", href: "/mitra/program", icon: "folder-kanban" },
      { id: "form", label: "Form Pendaftaran", href: "/mitra/form", icon: "clipboard-list" },
      { id: "dosen", label: "Dosen Pembina", href: "/mitra/dosen", icon: "graduation-cap" },
      { id: "mahasiswa", label: "Mahasiswa Binaan", href: "/mitra/mahasiswa", icon: "user" },
      { id: "seleksi", label: "Seleksi Pendaftar", href: "/mitra/seleksi", icon: "user-check" },
    ]
  }
};
