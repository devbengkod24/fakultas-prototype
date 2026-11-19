// src/data/mahasiswa/logAktivitasData.ts
// Data contoh Log Aktivitas mahasiswa.

export type KategoriAktivitas = "pendaftaran" | "konversi" | "logbook" | "sidang";

export interface AktivitasMahasiswa {
  id: number;
  kategori: KategoriAktivitas;
  /** Format ISO yyyy-mm-dd. */
  tanggal: string;
  /** Format HH:mm. */
  waktu: string;
  deskripsi: string;
}

export const tabAktivitas: Array<{ status: "all" | KategoriAktivitas; label: string; icon: string }> = [
  { status: "all", label: "Semua", icon: "users" },
  { status: "pendaftaran", label: "Pendaftaran", icon: "clipboard-list" },
  { status: "konversi", label: "Konversi SKS", icon: "layers" },
  { status: "logbook", label: "Logbook", icon: "file-text" },
  { status: "sidang", label: "Sidang", icon: "calendar" },
];

export const aktivitasAwal: AktivitasMahasiswa[] = [
  { id: 1, kategori: "sidang", tanggal: "2026-10-23", waktu: "14:22", deskripsi: "Anda mengunggah Nilai dari Mitra pada Dokumen Persyaratan Sidang." },
  { id: 2, kategori: "sidang", tanggal: "2026-10-23", waktu: "10:05", deskripsi: "Koordinator MBKM menetapkan jadwal sidang Anda pada Kamis, 15 Januari 2027 pukul 09:00 WIB." },
  { id: 3, kategori: "logbook", tanggal: "2026-10-22", waktu: "16:40", deskripsi: "Dosen Pembimbing (Adhitya Nugraha, S.Kom, M.CS) menyetujui logbook bimbingan Bab 5 Anda." },
  { id: 4, kategori: "logbook", tanggal: "2026-10-21", waktu: "09:15", deskripsi: "Anda mengirim logbook bimbingan Bab 5 untuk diverifikasi Dosen Pembimbing." },
  { id: 5, kategori: "konversi", tanggal: "2026-10-20", waktu: "15:30", deskripsi: "Koordinator MBKM menyetujui seluruh mata kuliah pengajuan konversi SKS Anda." },
  { id: 6, kategori: "konversi", tanggal: "2026-10-19", waktu: "11:12", deskripsi: "Anda mengirim ulang pengajuan matkul setelah mengganti Pemrograman Web Berbasis Komponen." },
  { id: 7, kategori: "konversi", tanggal: "2026-10-18", waktu: "13:48", deskripsi: "Koordinator MBKM menolak 1 mata kuliah pada pengajuan konversi SKS Anda." },
  { id: 8, kategori: "konversi", tanggal: "2026-10-16", waktu: "09:30", deskripsi: "Anda mengirim pengajuan matkul konversi SKS (3 mata kuliah)." },
  { id: 9, kategori: "pendaftaran", tanggal: "2026-10-15", waktu: "10:20", deskripsi: "Anda menerima penawaran program Bengkel Koding dan mengunggah Pakta Integritas." },
  { id: 10, kategori: "pendaftaran", tanggal: "2026-10-13", waktu: "16:05", deskripsi: "Status pendaftaran program Bengkel Koding berubah menjadi Lolos Seleksi." },
  { id: 11, kategori: "pendaftaran", tanggal: "2026-10-10", waktu: "14:00", deskripsi: "Anda mengikuti wawancara seleksi program Bengkel Koding." },
  { id: 12, kategori: "pendaftaran", tanggal: "2026-10-08", waktu: "09:45", deskripsi: "Anda mengirim formulir pendaftaran ke program Bengkel Koding." },
];
