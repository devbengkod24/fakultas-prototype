export interface UserAccount {
  name: string;
  email: string;
  password: string;
  role: "admin" | "mitra" | "mahasiswa";
  roleName: string;
  identifier: string;
  avatar: string;
  redirectUrl: string;
  description: string;
}

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    name: "Nurul Anisa Sri Winarsih, S.Kom, M.Cs",
    email: "admin@dinus.ac.id",
    password: "password",
    role: "admin",
    roleName: "Koordinator MBKM / Admin",
    identifier: "0686.11.2012.441",
    avatar: "NA",
    redirectUrl: "/admin/dashboard",
    description: "Akses penuh kelola mitra, validasi SuReKom, seleksi, konversi SKS, dan monitoring mahasiswa."
  },
  {
    name: "Dr. Ricardus Anggi, M.Kom.",
    email: "mitra@dinus.ac.id",
    password: "password",
    role: "mitra",
    roleName: "Dosen Pembimbing / Kontributor Mitra",
    identifier: "0686.11.2001.289",
    avatar: "RA",
    redirectUrl: "/mitra/dashboard",
    description: "Kelola program industri, seleksi pendaftar, direct assign, dan bimbingan anggota binaan."
  },
  {
    name: "Ahmad Rizky Pratama",
    email: "mahasiswa@dinus.ac.id",
    password: "password",
    role: "mahasiswa",
    roleName: "Mahasiswa MBKM",
    identifier: "A11.2021.13782",
    avatar: "AR",
    redirectUrl: "/mahasiswa/dashboard",
    description: "Eksplorasi katalog mitra, form pendaftaran 3 tahap, cek status pengajuan, dan logbook kegiatan."
  }
];
