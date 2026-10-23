# 04: Dekomposisi Halaman Portal Apps FIK

**What to build:** Pemecahan berkas `src/pages/apps.astro` (1.544 baris) menjadi subkomponen modular di folder `src/components/portal/`. Berkas halaman utama `apps.astro` hanya mengorkestrasi layout dan grid kategori kartu aplikasi (< 90 baris). Seluruh tampilan kartu sistem akademik, tautan navigasi SSO, dan atribut visual `data-pencil-name` tetap utuh.

**Blocked by:** 00: Setup Helper Styling Komponen & Utilitas Tailwind

**Status:** resolved

- [x] Folder baru `src/components/portal/` dibuat.
- [x] Subkomponen diekstrak dengan ukuran masing-masing < 140 baris:
  - `PortalHero.astro` (< 110 baris): Banner selamat datang, tombol kembali ke beranda, dan kotak pencarian portal.
  - `PortalCardMbkm.astro` (< 130 baris): Kartu unggulan Kampus Berdampak / MBKM beserta deskripsi dan tombol akses.
  - `PortalCardAkademik.astro` (< 140 baris): Kartu-kartu sistem tridharma (Tugas Akhir, Kerja Praktek, Bimbingan Karir).
  - `PortalCardLayanan.astro` (< 120 baris): Kartu layanan mahasiswa & dosen (Alumni Tracer, EWS, Publikasi).
  - `PortalFooter.astro` (< 90 baris): Footer portal aplikasi FIK.
- [x] Gunakan utilitas `cn(...)` dari `src/utils/cn.ts` untuk penggabungan kelas styling kartu.
- [x] Halaman `src/pages/apps.astro` dirombak menjadi orkestrator ramping (< 90 baris).
- [x] Visual pixel-perfect dan tautan role-based routing tetap berjalan normal.
- [x] Verifikasi `npm run build` berhasil tanpa error.
