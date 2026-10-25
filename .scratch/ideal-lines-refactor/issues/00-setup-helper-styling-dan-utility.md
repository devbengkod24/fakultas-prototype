# 00: Setup Helper Styling Komponen & Utilitas Tailwind

**What to build:** Pemasangan dependensi fondasi styling (`clsx`, `tailwind-merge`, `class-variance-authority`) dan pembuatan berkas utilitas terpusat `src/utils/cn.ts` di `fakultas-prototype`. Utilitas ini menjadi standar baku yang dipakai oleh seluruh komponen baru untuk mengombinasikan class Tailwind secara dinamis, mencegah konflik class utility, dan mendukung pembuatan varian komponen yang bersih.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Install dependensi produksi: `npm install clsx tailwind-merge class-variance-authority`.
- [ ] Buat berkas helper `src/utils/cn.ts` yang mengekspor fungsi `cn(...inputs)` berbasis `twMerge(clsx(inputs))`.
- [ ] Verifikasi `npm run build` tetap berjalan lancar tanpa konflik versi dengan Tailwind v4 dan Vite plugin.
- [ ] Utilitas `cn(...)` siap diimpor oleh seluruh tiket dekomposisi komponen berikutnya.
