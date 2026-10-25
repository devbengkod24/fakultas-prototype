# 09: Modularisasi Shell Layout Admin & Kontributor

**What to build:** Pemisahan duplikasi markup sidebar navigasi, header topbar, dan drawer mobile dari layout shell (`AdminShell.astro` 821 baris dan `KontributorShell.astro` 893 baris) ke dalam komponen layout modular di `src/components/layout/shells/`.

**Blocked by:** None (can start immediately)

**Status:** completed

- [x] Sub-komponen layout shell dibuat di `src/components/layout/shells/`:
  - `SidebarNav.astro` (< 150 baris): Render vertikal menu navigasi berbasis data array menu.
  - `TopbarHeader.astro` (< 100 baris): Sticky topbar dengan breadcrumb, user profile pill, role switcher, dan notification dot.
  - `MobileDrawer.astro` (< 90 baris): Slide-over drawer navigasi mobile/tablet.
- [x] `src/layouts/AdminShell.astro` berkurang dari 821 baris menjadi **< 150 baris**.
- [x] `src/layouts/KontributorShell.astro` berkurang dari 893 baris menjadi **< 150 baris**.
- [x] Navigasi sidebar, toggle submenu (MBKM, Sidang, Dosen), dan role switcher tetap berjalan normal.
- [x] `npm run build` berhasil 100% tanpa error.
