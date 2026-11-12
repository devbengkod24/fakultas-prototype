// @ts-nocheck
// ==============================================================================
// CORE REACTIVE STORE & ALPINE STATE
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

/**
 * ==============================================================================
 * ALPINE.JS REACTIVE GLOBAL STORE & STATE MANAGEMENT
 * Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
 * ==============================================================================
 * Mengelola state global reaktif: navigasi tab, live data, modal state,
 * serta sinkronisasi URL hash dan pembaruan Lucide icons.
 */

document.addEventListener('alpine:init', () => {
  Alpine.store('mbkm', {
    // Navigasi & Shell State
    currentTab: 'dashboard',
    mahasiswaSubmenuOpen: false,
    dosenSubmenuOpen: false,
    sidebarCollapsed: false,

    // Resolusi nama section aktif
    get currentSection() {
      if (this.currentTab === 'mhs-rekomendasi') return 'surekom';
      if (this.currentTab === 'dosen-data') return 'dosen-data';
      if (this.currentTab === 'mhs-pendaftar') return 'mhs-pelamar';
      return this.currentTab;
    },

    // Metadata header & breadcrumb berdasarkan tab aktif
    get activeMeta() {
      const meta = typeof navMeta !== 'undefined' ? navMeta[this.currentTab] : null;
      return meta || {
        label: 'Dashboard',
        title: 'Selamat Datang, Koordinator MBKM di Fakultas Ilmu Komputer',
        subtitle: 'Berikut adalah data-data dan ringkasan operasional yang dapat Anda akses.'
      };
    },

    // Fungsi Pindah Tab Reaktif
    switchTab(tabKey) {
      if (tabKey === 'mhs-pendaftar') tabKey = 'mhs-pelamar';
      this.currentTab = tabKey;

      // Sinkronkan state submenu jika tab berada di bawah parent
      if (['mhs-semua', 'mhs-data', 'mhs-pelamar', 'mhs-rekomendasi'].includes(tabKey)) {
        this.mahasiswaSubmenuOpen = true;
      }
      if (['dosen-data', 'dosen-kuota', 'dosen-update', 'update-dosen'].includes(tabKey)) {
        this.dosenSubmenuOpen = true;
      }

      // Update URL hash jika berbeda
      if (window.location.hash !== '#' + tabKey) {
        history.replaceState(null, '', '#' + tabKey);
      }

      // Jalankan fungsi controller legacy agar view yang belum direfactor tetap render
      if (typeof window.switchTab === 'function') {
        window.switchTab(tabKey);
      }

      // Re-inisialisasi ikon Lucide di DOM baru
      this.refreshIcons();
    },

    // Toggle Submenu Sidebar
    toggleMahasiswaSubmenu(force) {
      this.mahasiswaSubmenuOpen = force !== undefined ? force : !this.mahasiswaSubmenuOpen;
      this.refreshIcons();
    },

    toggleDosenSubmenu(force) {
      this.dosenSubmenuOpen = force !== undefined ? force : !this.dosenSubmenuOpen;
      this.refreshIcons();
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.toggle('-ml-64', this.sidebarCollapsed);
    },

    // Helper Refresh Icon Lucide
    refreshIcons() {
      if (typeof Alpine !== 'undefined' && Alpine.nextTick) {
        Alpine.nextTick(() => {
          if (window.lucide) window.lucide.createIcons();
        });
      } else if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    // Inisialisasi awal saat Alpine store dimuat
    init() {
      const hash = window.location.hash.replace('#', '');
      let tab = 'dashboard';
      if (hash && typeof navMeta !== 'undefined' && navMeta[hash]) {
        tab = hash;
      } else if (typeof window !== 'undefined' && window.__CURRENT_TAB__) {
        tab = window.__CURRENT_TAB__;
      } else if (typeof window !== 'undefined') {
        const slug = window.location.pathname.replace(/\/$/, '').split('/').pop();
        const slugMap = {
          'pelamar': 'mhs-pelamar',
          'surekom': 'mhs-rekomendasi',
          'semua-mahasiswa': 'mhs-semua',
          'koordinator': 'dosen-data',
          'laporan': 'laporan',
          'sidang': 'laporan',
        };
        tab = slugMap[slug] || slug || 'dashboard';
      }
      this.currentTab = tab;
      if (['mhs-semua', 'mhs-data', 'mhs-pelamar', 'mhs-rekomendasi'].includes(tab)) {
        this.mahasiswaSubmenuOpen = true;
      }
      if (['dosen-data', 'dosen-kuota', 'dosen-update', 'update-dosen'].includes(tab)) {
        this.dosenSubmenuOpen = true;
      }
      if (['form-pendaftaran', 'periode'].includes(tab)) {
        this.mbkmSubmenuOpen = true;
      }
      if (['gelombang', 'data-pengajuan', 'plotting-jadwal', 'hasil-sidang'].includes(tab)) {
        this.sidangSubmenuOpen = true;
      }
      this.refreshIcons();
    }
  });
});
/**
 * ==============================================================================
 * ALPINE.JS COMPONENT: PROGRAM MBKM & KATEGORI
 * Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
 * ==============================================================================
 * Komponen reaktif untuk modul Program MBKM: tabel berpaginasi, live search,
 * form builder workflow stages, dan modal kategori.
 */

document.addEventListener('alpine:init', () => {
  /**
   * Komponen direktori kontributor: state tab, pencarian, dan override status.
   * Dipakai oleh tabel Astro statis di KontributorTable.astro agar badge status reaktif.
   */
  Alpine.data('kontributorDirectory', () => ({
    activeTab: 'eksternal',
    searchQuery: '',
    statusOverrides: {},
    isAktif(id, fallback) {
      const v = this.statusOverrides[id];
      if (v !== undefined) return v;
      return String(fallback ?? '').trim().toLowerCase() === 'aktif';
    },
    setStatus(id, aktif) {
      this.statusOverrides[id] = aktif;
    }
  }));

  Alpine.data('programManager', () => ({
    searchQuery: '',
    currentPage: 1,
    perPage: 10,
    currentSubview: 'list', // 'list' | 'edit' | 'kategori'
    isNewProgram: false,
    editTitle: '',

    // Form Edit State
    form: {
      nama: '',
      dosen: '',
      kategori: '',
      sks: 20,
      ipk: 3.00,
      kuota: 4,
    },

    get filteredPrograms() {
      const q = (this.searchQuery || '').toLowerCase().trim();
      return (typeof programListData !== 'undefined' ? programListData : []).filter((p) => {
        if (!q) return true;
        return (
          (p.nama && p.nama.toLowerCase().includes(q)) ||
          (p.dosen && p.dosen.toLowerCase().includes(q)) ||
          (p.kategori && p.kategori.toLowerCase().includes(q)) ||
          (p.status && p.status.toLowerCase().includes(q))
        );
      });
    },

    get totalPages() {
      return Math.max(1, Math.ceil(this.filteredPrograms.length / this.perPage));
    },

    get startIndex() {
      return (this.currentPage - 1) * this.perPage;
    },

    get paginatedPrograms() {
      const start = this.startIndex;
      return this.filteredPrograms.slice(start, start + this.perPage);
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.refreshIcons();
      }
    },

    showEdit(title, isNew = false) {
      this.isNewProgram = isNew;
      this.editTitle = isNew ? 'Tambah Program Baru' : 'Ubah Program';
      this.currentSubview = 'edit';
      if (isNew) {
        this.form = { nama: '', dosen: 'Ahmad Zainul, M.Kom', kategori: 'Magang', sks: 20, ipk: 3.0, kuota: 4 };
      } else {
        const item = (typeof programListData !== 'undefined' ? programListData : []).find((p) => p.nama === title);
        if (item) {
          this.form = { ...item };
        }
      }
      this.refreshIcons();
    },

    showList() {
      this.currentSubview = 'list';
      this.refreshIcons();
    },

    showKategori() {
      this.currentSubview = 'kategori';
      this.refreshIcons();
    },

    refreshIcons() {
      if (typeof Alpine !== 'undefined' && Alpine.nextTick) {
        Alpine.nextTick(() => {
          if (window.lucide) window.lucide.createIcons();
        });
      } else if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    init() {
      this.refreshIcons();
    },
  }));
});
/**
 * ==============================================================================
 * CONTROLLER & INTERACTION LOGIC — Master Koordinator & Admin
 * Fakultas Ilmu Komputer UDINUS
 * ==============================================================================
 * Menangani state machine, routing tab, rendering tabel dinamis, modal dialog,
 * dan event listeners. Data dummy dimuat dari mock-data.js.
 */

// Inisialisasi ikon
lucide.createIcons();


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
}
