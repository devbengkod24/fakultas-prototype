export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface RoleNavConfig {
  role: "admin" | "mahasiswa" | "kontributor";
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
      { id: "kontributor", label: "Kontributor", href: "/admin/kontributor", icon: "building-2" },
      { id: "semua-mahasiswa", label: "Semua Mahasiswa", href: "/admin/semua-mahasiswa", icon: "users" },
      { id: "data-mahasiswa", label: "Data Mahasiswa", href: "/admin/data-mahasiswa", icon: "user-check" },
      { id: "pelamar", label: "Pendaftar", href: "/admin/pelamar", icon: "users" },
      { id: "surekom", label: "Validasi Surekom", href: "/admin/surekom", icon: "file-check" },
      { id: "dosen-update", label: "Plotting Dosen", href: "/admin/dosen-update", icon: "user-plus" },
      { id: "dosen-data", label: "Data Dosen", href: "/admin/dosen-data", icon: "graduation-cap" },
      { id: "dosen-kuota", label: "Kuota Dosen", href: "/admin/dosen-kuota", icon: "pie-chart" },
      { id: "logbook", label: "Logbook Mahasiswa", href: "/admin/logbook", icon: "book-open" },
      { id: "konversi", label: "Validasi Konversi SKS", href: "/admin/konversi", icon: "arrow-left-right" },
      { id: "gelombang", label: "Gelombang Sidang", href: "/admin/gelombang", icon: "calendar-days" },
      { id: "data-pengajuan", label: "Data Pengajuan", href: "/admin/data-pengajuan", icon: "file-check-2" },
      { id: "plotting-jadwal", label: "Plotting Jadwal", href: "/admin/plotting-jadwal", icon: "calendar-clock" },
      { id: "hasil-sidang", label: "Hasil Sidang", href: "/admin/hasil-sidang", icon: "award" },
      { id: "form-pendaftaran", label: "Form Pendaftaran", href: "/admin/form-pendaftaran", icon: "clipboard-list" },
      { id: "periode", label: "Periode MBKM", href: "/admin/periode", icon: "calendar-range" },
      { id: "log-aktivitas", label: "Log Aktivitas", href: "/admin/log-aktivitas", icon: "history" },
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
  kontributor: {
    role: "kontributor",
    roleTitle: "Kontributor",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/contributor/dashboard", icon: "layout-dashboard" },
      { id: "program", label: "Kelola Program", href: "/contributor/program", icon: "folder-kanban" },
      { id: "anggota", label: "Anggota", href: "/contributor/anggota", icon: "users" },
      { id: "seleksi", label: "Pendaftar", href: "/contributor/seleksi", icon: "user-check" },
      { id: "log-aktivitas", label: "Log Aktivitas", href: "/contributor/log-aktivitas", icon: "history" },
    ]
  },
  contributor: {
    role: "contributor",
    roleTitle: "Kontributor Industri",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/contributor/dashboard", icon: "layout-dashboard" },
      { id: "program", label: "Kelola Program", href: "/contributor/program", icon: "folder-kanban" },
      { id: "anggota", label: "Anggota", href: "/contributor/anggota", icon: "users" },
      { id: "seleksi", label: "Pendaftar", href: "/contributor/seleksi", icon: "user-check" },
      { id: "log-aktivitas", label: "Log Aktivitas", href: "/contributor/log-aktivitas", icon: "history" },
    ]
  },
  dosen: {
    role: "dosen",
    roleTitle: "Dosen Pembimbing",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dosen/dashboard", icon: "layout-dashboard" },
      { id: "pengumuman", label: "Pengumuman", href: "/dosen/pengumuman", icon: "megaphone" },
      { id: "mahasiswa", label: "Mahasiswa Bimbingan", href: "/dosen/mahasiswa", icon: "users" },
      { id: "logbook", label: "Logbook Mahasiswa", href: "/dosen/logbook", icon: "book-open" },
      { id: "sidang", label: "Sidang Evaluasi", href: "/dosen/sidang", icon: "calendar-check" },
      { id: "log-aktivitas", label: "Log Aktivitas", href: "/dosen/log-aktivitas", icon: "history" },
    ]
  }
};
