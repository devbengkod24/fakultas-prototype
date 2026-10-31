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


// State & Helper Toggle Submenu Mahasiswa, Dosen, MBKM & Sidang
let mahasiswaSubmenuOpen = false;
let dosenSubmenuOpen = false;
let mbkmSubmenuOpen = false;
let sidangSubmenuOpen = false;

function toggleMbkmSubmenu(forceOpen) {
  const submenu = document.getElementById('submenu-mbkm');
  const chevron = document.getElementById('mbkm-chevron');
  if (!submenu) return;
  mbkmSubmenuOpen = forceOpen !== undefined ? forceOpen : !mbkmSubmenuOpen;
  if (mbkmSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

function toggleSidangSubmenu(forceOpen) {
  const submenu = document.getElementById('submenu-sidang');
  const chevron = document.getElementById('sidang-chevron');
  if (!submenu) return;
  sidangSubmenuOpen = forceOpen !== undefined ? forceOpen : !sidangSubmenuOpen;
  if (sidangSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

function toggleMahasiswaSubmenu(forceOpen) {
  const submenu = document.getElementById('submenu-mahasiswa');
  const chevron = document.getElementById('mahasiswa-chevron');
  if (!submenu) return;
  mahasiswaSubmenuOpen = forceOpen !== undefined ? forceOpen : !mahasiswaSubmenuOpen;
  if (mahasiswaSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

function toggleDosenSubmenu(forceOpen) {
  const submenu = document.getElementById('submenu-dosen');
  const chevron = document.getElementById('dosen-chevron');
  if (!submenu) return;
  dosenSubmenuOpen = forceOpen !== undefined ? forceOpen : !dosenSubmenuOpen;
  if (dosenSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.add('rotate-180');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
}

// Controller Breadcrumb Header (Sesuai Desain Asli: Tanpa Icon di Badge Pill)
function updateBreadcrumb(items) {
  const container = document.getElementById('breadcrumb-container');
  if (!container) return;

  let list = Array.isArray(items)
    ? items
    : (items || '').split('/').map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) list = ['Dashboard'];

  // Jika hanya Dashboard
  if (list.length === 1 && list[0].toLowerCase() === 'dashboard') {
    container.innerHTML = `
      <span id="breadcrumb-badge" class="bg-white border border-[#e4e4e7] py-1 px-3 rounded-lg text-sm font-medium text-[#09090b] shadow-none">
        <span id="breadcrumb-text">Dashboard</span>
      </span>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  // Jika selain Dashboard, Dashboard selalu menjadi root
  const fullChain = list[0].toLowerCase() === 'dashboard' ? list : ['Dashboard', ...list];
  const lastIdx = fullChain.length - 1;

  container.innerHTML = fullChain
    .map((label, idx) => {
      if (idx === lastIdx) {
        return `
          <span id="breadcrumb-badge" class="bg-white border border-[#e4e4e7] py-1 px-3 rounded-lg text-sm font-medium text-[#09090b] shadow-none">
            <span id="breadcrumb-text">${label}</span>
          </span>
        `;
      } else {
        return `
          <span class="text-[#71717a] font-normal cursor-default text-sm">${label}</span>
          <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-[#71717a] shrink-0"></i>
        `;
      }
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

// Fungsi ganti tab utama
function switchTab(tabKey) {
  if (tabKey === 'mhs-pendaftar') tabKey = 'mhs-pelamar';

  // Sembunyikan semua tab content
  document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));

  // Resolusi target section dengan alias ke section fungsional eksisting
  let targetId = 'section-' + tabKey;
  if (tabKey === 'mhs-rekomendasi' && !document.getElementById('section-mhs-rekomendasi')) {
    targetId = 'section-surekom';
  } else if (tabKey === 'dosen-data' && !document.getElementById('section-dosen-data')) {
    targetId = 'section-koordinator';
  } else if (tabKey === 'sidang' && !document.getElementById('section-sidang')) {
    targetId = 'section-sidang';
  } else if (tabKey === 'kontributor' && !document.getElementById('section-' + tabKey)) {
    // Halaman kontributor memakai id section-kontributor / section-kontributor-cms / section-kelola-program
    if (document.getElementById('section-kontributor')) targetId = 'section-kontributor';
    else if (document.getElementById('section-kontributor-cms')) targetId = 'section-kontributor-cms';
    else if (document.getElementById('section-kelola-program')) targetId = 'section-kelola-program';
  }

  const targetSec = document.getElementById(targetId);
  if (targetSec) targetSec.classList.remove('hidden');

  // Reset styling semua item menu navigasi
  document.querySelectorAll('.nav-item').forEach((el) => {
    el.classList.remove('nav-active', 'text-[#0655a7]', 'font-medium');
    el.classList.add('text-[#3f3f46]');
    const bar = el.querySelector('.active-bar');
    if (bar) bar.classList.add('hidden');
    const chevron = el.querySelector('[data-lucide="chevron-down"]');
    if (chevron) chevron.classList.remove('text-[#0655a7]');
    const icon = el.querySelector('i:not([data-lucide="chevron-down"])');
    if (icon) {
      icon.classList.remove('text-[#0655a7]');
      icon.classList.add('text-[#71717a]');
    }
  });
  document.querySelectorAll('.nav-sub-item').forEach((el) => {
    el.classList.remove('text-[#0655a7]', 'font-semibold', 'bg-blue-50/80', 'nav-sub-active');
    el.classList.add('text-[#71717a]');
    const subBar = el.querySelector('.sub-active-bar');
    if (subBar) subBar.classList.add('hidden');
  });

  // Set status aktif pada sidebar item
  const meta = navMeta[tabKey];
  if (meta && meta.parent) {
    const parentBtn = document.getElementById('nav-' + meta.parent);
    if (parentBtn) {
      parentBtn.classList.remove('text-[#3f3f46]');
      parentBtn.classList.add('text-[#0655a7]', 'font-medium');
      const bar = parentBtn.querySelector('.active-bar');
      if (bar) bar.classList.add('hidden');
      const icon = parentBtn.querySelector('i:not([data-lucide="chevron-down"])');
      if (icon) {
        icon.classList.remove('text-[#71717a]');
        icon.classList.add('text-[#0655a7]');
      }
      const chevron = parentBtn.querySelector('[data-lucide="chevron-down"]');
      if (chevron) {
        chevron.classList.add('text-[#0655a7]');
      }
    }
    if (meta.parent === 'mbkm') toggleMbkmSubmenu(true);
    if (meta.parent === 'mahasiswa') toggleMahasiswaSubmenu(true);
    if (meta.parent === 'dosen') toggleDosenSubmenu(true);
    if (meta.parent === 'sidang') toggleSidangSubmenu(true);

    let subBtn = document.getElementById('nav-sub-' + tabKey) ||
                 document.getElementById('nav-sub-mhs-' + tabKey) ||
                 document.getElementById('nav-sub-dosen-' + tabKey) ||
                 document.getElementById('nav-sub-mbkm-' + tabKey) ||
                 document.getElementById('nav-sub-sidang-' + tabKey);
    if ((tabKey === 'form-pendaftaran' || tabKey === 'form') && !subBtn) {
      subBtn = document.getElementById('nav-sub-mbkm-form') || document.getElementById('nav-sub-mbkm-form-pendaftaran');
    }
    if ((tabKey === 'periode' || tabKey === 'periode-mbkm') && !subBtn) {
      subBtn = document.getElementById('nav-sub-mbkm-periode');
    }
    if ((tabKey === 'mhs-data' || tabKey === 'data-mahasiswa') && !subBtn) {
      subBtn = document.getElementById('nav-sub-mhs-data');
    }
    if ((tabKey === 'mhs-semua' || tabKey === 'semua-mahasiswa') && !subBtn) {
      subBtn = document.getElementById('nav-sub-mhs-semua');
    }
    if ((tabKey === 'dosen-update' || tabKey === 'update-dosen') && !subBtn) {
      subBtn = document.getElementById('nav-sub-dosen-update') || document.getElementById('nav-sub-mhs-update-dosen');
    }
    if (subBtn) {
      subBtn.classList.remove('text-[#71717a]');
      subBtn.classList.add('nav-sub-active');
      const subBar = subBtn.querySelector('.sub-active-bar');
      if (subBar) subBar.classList.remove('hidden');
    }
  } else {
    let activeBtn = document.getElementById('nav-' + tabKey);
    if (!activeBtn && tabKey === 'kontributor') {
      activeBtn = document.getElementById('nav-kontributor');
    }
    if (activeBtn) {
      activeBtn.classList.add('nav-active');
      const bar = activeBtn.querySelector('.active-bar');
      if (bar) bar.classList.remove('hidden');
    }
  }

  // Update DashboardHeader (Sesuai DashboardHeader di fakultas-fe tanpa icon pada badge)
  if (meta) {
    updateBreadcrumb(meta.label);

    const isCmsStandalone = !!document.getElementById('section-kontributor-cms') || !!document.getElementById('section-kelola-program');
    if (!isCmsStandalone) {
      const hTitle = document.getElementById('header-page-title');
      if (hTitle) hTitle.textContent = meta.title || meta.label;
      const hSub = document.getElementById('header-page-subtitle');
      if (hSub) hSub.textContent = meta.subtitle || '';

      const actionSlot = document.getElementById('header-action-slot');
      if (actionSlot) actionSlot.innerHTML = meta.actionButton || '';
    }
  }
  if (window.lucide) window.lucide.createIcons();

  // Reset & inisialisasi view fungsional jika relevan
  hideSubviews();
  if (tabKey === 'dashboard') {
    renderDashboardKoordinatorWidget();
  } else if (tabKey === 'pengumuman') {
    renderPengumumanCards();
  } else if (tabKey === 'periode') {
    renderPeriodeData();
  } else if (tabKey === 'form-pendaftaran') {
    renderFormPendaftaranUI();
  } else if (tabKey === 'kontributor') {
    renderKontributorTable();
  } else if (tabKey === 'mhs-pelamar') {
    renderPelamarTable();
  } else if (tabKey === 'mhs-semua') {
    renderSemuaMhsTable();
  } else if (tabKey === 'dosen-data' || tabKey === 'koordinator') {
    renderKoordinatorTable();
  } else if (tabKey === 'mhs-rekomendasi' || tabKey === 'surekom') {
    renderSurekomTable();
  } else if (tabKey === 'logbook') {
    renderLogbookTable();
  } else if (tabKey === 'sidang' || tabKey === 'laporan') {
    renderLaporanTable();
  }
  hideSurekomDetail();
  hideLogbookDetail();
  hideKontributorDetail();
  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.remove('hidden');

  // Update URL hash jika sudah ada hash di URL
  if (window.location.hash && window.location.hash !== '#' + tabKey) {
    history.replaceState(null, '', '#' + tabKey);
  }
}

// Toggle Sidebar
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('-ml-64');
}


// State aktif workflow builder
let currentWorkflow = JSON.parse(JSON.stringify(PRESETS.internal));
let activePresetType = 'internal';

function updatePresetButtonsUI(activeType) {
  activePresetType = activeType;
  const btnEks = document.getElementById('btn-preset-eksternal');
  const btnInt = document.getElementById('btn-preset-internal');

  const activeEks =
    'px-2.5 py-1 rounded-lg border-2 border-amber-500 bg-amber-50 font-bold text-amber-900 shadow-sm text-[11px] flex items-center gap-1 transition-all';
  const inactiveEks =
    'px-2.5 py-1 rounded-lg border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[11px] font-medium text-[#3f3f46] flex items-center gap-1 transition-all';

  const activeInt =
    'px-2.5 py-1 rounded-lg border-2 border-[#0655a7] bg-blue-50 font-bold text-[#0655a7] shadow-sm text-[11px] flex items-center gap-1 transition-all';
  const inactiveInt =
    'px-2.5 py-1 rounded-lg border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[11px] font-medium text-[#3f3f46] flex items-center gap-1 transition-all';

  if (btnEks) {
    btnEks.className = activeType === 'eksternal' ? activeEks : inactiveEks;
  }
  if (btnInt) {
    btnInt.className = activeType === 'internal' ? activeInt : inactiveInt;
  }
}

function loadWorkflowPreset(type) {
  if (PRESETS[type]) {
    currentWorkflow = JSON.parse(JSON.stringify(PRESETS[type]));
    updatePresetButtonsUI(type);
    renderWorkflowStages();
  }
}

function handleKategoriChange(val) {
  const item = kategoriData.find((k) => k.id === val);
  const presetType = item ? item.type : val.startsWith('eksternal') ? 'eksternal' : 'internal';
  loadWorkflowPreset(presetType);

  const sksInput = document.getElementById('edit-sks-konversi');
  if (sksInput) {
    if (item && item.sks) {
      sksInput.value = item.sks;
    } else if (presetType === 'eksternal') {
      sksInput.value = val === 'eksternal_studi' ? '15' : '20';
    } else {
      if (val === 'internal_bengkel') sksInput.value = '20';
      else if (val === 'internal_ugm') sksInput.value = '24';
      else if (val === 'internal_lab') sksInput.value = '15';
      else sksInput.value = '12';
    }
  }
}

function renderWorkflowStages() {
  const container = document.getElementById('workflow-stages-container');
  if (!container) return;

  container.innerHTML = currentWorkflow
    .map(
      (stage, sIdx) => `
  <div class="p-3.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] flex flex-col gap-3 transition-all hover:border-[#0655a7]/40">
    <!-- Header Tahapan -->
    <div class="flex items-center justify-between pb-2 border-b border-[#e4e4e7]">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-md bg-[#0655a7] text-white text-xs font-bold flex items-center justify-center shrink-0">
          ${sIdx + 1}
        </span>
        <input type="text" value="${stage.name}" onchange="updateStageName(${sIdx}, this.value)" class="font-semibold text-xs text-[#09090b] bg-transparent border-b border-transparent hover:border-[#e4e4e7] focus:border-[#0655a7] focus:outline-none px-1 py-0.5 w-72 sm:w-96" />
      </div>
      <div class="flex items-center gap-1.5">
        <button type="button" onclick="addFileField(${sIdx})" class="px-2.5 py-1 rounded bg-white border border-[#e4e4e7] hover:border-[#0655a7] text-[11px] font-medium text-[#0655a7] flex items-center gap-1 transition-colors shadow-none">
          <i data-lucide="file-plus" class="w-3 h-3"></i>
          <span>+ Syarat Dokumen</span>
        </button>
        <button type="button" onclick="removeStageCard(${sIdx})" class="flex items-center justify-center w-6 h-6 transition-colors rounded text-rose-500 hover:bg-rose-50" title="Hapus Tahapan">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>

    <!-- Keterangan Aturan Tahap -->
    <div class="text-[11px] text-[#71717a] flex items-center gap-1.5 italic">
      <i data-lucide="info" class="w-3.5 h-3.5 text-blue-500 shrink-0"></i>
      <span>Rule: ${stage.rule}</span>
    </div>

    <!-- Daftar Dokumen yang Wajib Diunggah -->
    <div class="flex flex-col gap-1.5 pl-2 border-l-2 border-blue-200">
      <span class="text-[11px] font-semibold text-[#3f3f46]">Dokumen yang Harus Diunggah Mahasiswa:</span>
      ${stage.files.length === 0 ? '<p class="text-[11px] text-[#a1a1aa] italic">Tidak ada syarat berkas khusus pada tahapan ini.</p>' : ''}
      ${stage.files
        .map(
          (file, fIdx) => `
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white border border-[#e4e4e7] text-xs">
          <div class="flex items-center gap-2 flex-1 min-w-[200px]">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-[#0655a7] shrink-0"></i>
            <input type="text" value="${file.label}" onchange="updateFileLabel(${sIdx}, ${fIdx}, this.value)" class="flex-1 bg-transparent border-b border-transparent hover:border-[#e4e4e7] focus:border-[#0655a7] focus:outline-none px-1 py-0.5 text-xs text-[#09090b] font-medium" />
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-[#71717a]">${file.format}</span>
            <label class="inline-flex items-center gap-1 text-[11px] font-medium text-[#3f3f46] cursor-pointer">
              <input type="checkbox" ${file.required ? 'checked' : ''} onchange="toggleFileRequired(${sIdx}, ${fIdx}, this.checked)" class="rounded text-[#0655a7] focus:ring-0" />
              <span>Wajib</span>
            </label>
            <button type="button" onclick="removeFileField(${sIdx}, ${fIdx})" class="p-1 text-gray-400 hover:text-rose-500" title="Hapus Berkas">
              <i data-lucide="x" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  </div>
`
    )
    .join('');

  lucide.createIcons();
}

function addStageCard() {
  const newStageNum = currentWorkflow.length + 1;
  currentWorkflow.push({
    id: 'stage_' + Date.now(),
    name: `Tahap ${newStageNum}: Tahapan Seleksi Baru`,
    type: 'custom',
    rule: 'Tahapan kustom yang diatur oleh Koordinator MBKM',
    files: [
      { id: 'f_' + Date.now(), label: 'Dokumen Persyaratan Khusus', format: 'PDF (Maks 2MB)', required: true },
    ],
  });
  renderWorkflowStages();
}

function removeStageCard(sIdx) {
  if (currentWorkflow.length <= 1) {
    alert('Minimal harus ada 1 tahapan dalam program!');
    return;
  }
  currentWorkflow.splice(sIdx, 1);
  renderWorkflowStages();
}

function updateStageName(sIdx, val) {
  if (currentWorkflow[sIdx]) currentWorkflow[sIdx].name = val;
}

function addFileField(sIdx) {
  const name = prompt('Masukkan nama dokumen persyaratan:', 'Surat Keterangan Tambahan');
  if (name) {
    currentWorkflow[sIdx].files.push({
      id: 'f_' + Date.now(),
      label: name,
      format: 'PDF (Maks 2MB)',
      required: true,
    });
    renderWorkflowStages();
  }
}

function removeFileField(sIdx, fIdx) {
  currentWorkflow[sIdx].files.splice(fIdx, 1);
  renderWorkflowStages();
}

function updateFileLabel(sIdx, fIdx, val) {
  if (currentWorkflow[sIdx] && currentWorkflow[sIdx].files[fIdx]) {
    currentWorkflow[sIdx].files[fIdx].label = val;
  }
}

function toggleFileRequired(sIdx, fIdx, checked) {
  if (currentWorkflow[sIdx] && currentWorkflow[sIdx].files[fIdx]) {
    currentWorkflow[sIdx].files[fIdx].required = checked;
  }
}

function saveAsTemplate() {
  alert('Konfigurasi tahapan & berkas berhasil disimpan sebagai Template MBKM Baru!');
}


let programCurrentPage = 1;
const programItemsPerPage = 10;
let programSearchQuery = '';
let currentEditingProgramTitle = '';

function handleSearchProgram(query) {
  programSearchQuery = (query || '').toLowerCase().trim();
  programCurrentPage = 1;
  renderProgramTable();
}

function goToProgramPage(page) {
  programCurrentPage = page;
  renderProgramTable();
}

function renderProgramTable() {
  const tbody = document.getElementById('program-table-tbody');
  const countLabel = document.getElementById('program-count-label');
  const infoEl = document.getElementById('program-pagination-info');
  const controlsEl = document.getElementById('program-pagination-controls');
  if (!tbody) return;

  const filtered = programListData.filter(
    (p) =>
      (p.nama && p.nama.toLowerCase().includes(programSearchQuery)) ||
      (p.dosen && p.dosen.toLowerCase().includes(programSearchQuery)) ||
      (p.kategori && p.kategori.toLowerCase().includes(programSearchQuery)) ||
      (p.status && p.status.toLowerCase().includes(programSearchQuery))
  );

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / programItemsPerPage));

  if (programCurrentPage > totalPages) {
    programCurrentPage = totalPages;
  }

  const startIndex = (programCurrentPage - 1) * programItemsPerPage;
  const endIndex = Math.min(startIndex + programItemsPerPage, totalItems);
  const pageItems = filtered.slice(startIndex, endIndex);

  if (countLabel) {
    countLabel.textContent = `Menampilkan ${totalItems} skema aktif`;
  }

  if (totalItems === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-xs text-[#71717a]">Tidak ada data skema program ditemukan.</td></tr>`;
    if (infoEl) infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    if (controlsEl) controlsEl.innerHTML = '';
    return;
  }

  // Render Baris Tabel: No | Nama Program | Dosen | Kategori | Detail
  tbody.innerHTML = pageItems
    .map((item, idx) => {
      const rowNumber = startIndex + idx + 1;
      const escapedNama = item.nama.replace(/'/g, "\\'");
      const dosenName = item.dosen || 'Belum Ditugaskan';

      return `
      <tr class="transition-colors hover:bg-gray-50/80">
        <td class="py-2.5 px-2.5 text-center text-[#71717a] text-[11px]">${rowNumber}</td>
        <td class="py-2.5 px-3">
          <span class="font-medium text-[#09090b] text-xs leading-snug">${item.nama}</span>
        </td>
        <td class="py-2.5 px-3">
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200 font-semibold text-[10px]">
              <i data-lucide="user-check" class="w-3 h-3"></i>
            </div>
            <span class="text-xs font-medium text-[#09090b]">${dosenName}</span>
          </div>
        </td>
        <td class="py-2.5 px-3 text-[#71717a] text-[11px] leading-snug">${item.kategori}</td>
        <td class="px-3 py-2.5 text-center">
          <div class="inline-flex items-center gap-1.5">
            <a
              href="../contributor/__index.html?program=${encodeURIComponent(item.nama)}&id=${item.id}&role=contributor"
              target="_blank"
              class="px-2.5 py-1 rounded bg-[#0655a7] hover:bg-[#114d91] text-white text-[11px] font-medium transition-colors shadow-none inline-flex items-center gap-1"
              title="Buka Halaman Detail / Mode Kontributor"
            >
              <span>Detail</span>
              <i data-lucide="external-link" class="w-3 h-3"></i>
            </a>
            <button
              type="button"
              onclick="showProgramEdit('${escapedNama}')"
              class="px-2 py-1 rounded border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[#3f3f46] text-[11px] font-medium transition-colors"
              title="Edit Skema Program"
            >
              <i data-lucide="edit-3" class="w-3 h-3"></i>
            </button>
            <button
              type="button"
              onclick="confirmDeleteProgram('${escapedNama}')"
              class="px-2 py-1 rounded border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-600 text-[11px] font-medium transition-colors"
              title="Hapus Program"
            >
              <i data-lucide="trash-2" class="w-3 h-3"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join('');

  // Render Pagination Info
  if (infoEl) {
    infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
  }

  // Render Pagination Controls (Kanan Bawah)
  if (controlsEl) {
    let buttonsHtml = '';

    // Prev button
    const prevDisabled = programCurrentPage === 1;
    buttonsHtml += `
      <button
        type="button"
        ${prevDisabled ? 'disabled' : ''}
        onclick="goToProgramPage(${programCurrentPage - 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;

    // Numbered buttons
    for (let p = 1; p <= totalPages; p++) {
      const isCurrent = p === programCurrentPage;
      buttonsHtml += `
        <button
          type="button"
          onclick="goToProgramPage(${p})"
          class="w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-semibold transition-colors ${ isCurrent ? 'bg-[#0655a7] text-white shadow-none' : 'border border-[#e4e4e7] text-[#3f3f46] hover:bg-gray-50' }"
        >
          ${p}
        </button>
      `;
    }

    // Next button
    const nextDisabled = programCurrentPage === totalPages;
    buttonsHtml += `
      <button
        type="button"
        ${nextDisabled ? 'disabled' : ''}
        onclick="goToProgramPage(${programCurrentPage + 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;

    controlsEl.innerHTML = buttonsHtml;
  }

  if (window.lucide) window.lucide.createIcons();
}

// Program Subviews
function showProgramEdit(title, isNew = false) {
  const listView = document.getElementById('subview-program-list');
  if (listView) listView.classList.add('hidden');
  const pesertaView = document.getElementById('subview-program-peserta');
  if (pesertaView) pesertaView.classList.add('hidden');
  const editView = document.getElementById('subview-program-edit');
  if (editView) editView.classList.remove('hidden');
  document.getElementById('edit-program-title').textContent = isNew ? 'Tambah Program Baru' : 'Ubah Program';
  document.getElementById('edit-nama-program').value = isNew ? '' : title;
  currentEditingProgramTitle = isNew ? '' : title;

  const currentProg = !isNew ? programListData.find((p) => p.nama === title) : null;

  // Set Dosen Penanggung Jawab
  const dosenSelect = document.getElementById('edit-dosen-program');
  if (dosenSelect) {
    if (currentProg && currentProg.dosen) {
      dosenSelect.value = currentProg.dosen;
    } else {
      dosenSelect.selectedIndex = 2; // Default Ahmad Zainul
    }
  }

  // Set Kategori Program
  const kategoriSelect = document.getElementById('edit-kategori-program');
  if (kategoriSelect && currentProg && currentProg.kategori) {
    const matchingOption = Array.from(kategoriSelect.options).find(
      (opt) => opt.text.includes(currentProg.kategori) || currentProg.kategori.includes(opt.text)
    );
    if (matchingOption) kategoriSelect.value = matchingOption.value;
  }

  if (isNew) {
    const sksEl = document.getElementById('edit-sks-konversi');
    if (sksEl) sksEl.value = '20';
    const ipkEl = document.getElementById('edit-min-ipk');
    if (ipkEl) ipkEl.value = '3.00';
    const kuotaEl = document.getElementById('edit-kuota-peserta');
    if (kuotaEl) kuotaEl.value = '4';
  }
  lucide.createIcons();
}

let programSubmenuOpen = true;

function toggleProgramSubmenu() {
  const submenu = document.getElementById('submenu-program');
  const chevron = document.getElementById('program-chevron');
  if (!submenu) return;

  programSubmenuOpen = !programSubmenuOpen;
  if (programSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.remove('-rotate-90');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.add('-rotate-90');
  }
}

function updateProgramSubmenuActive(activeSub) {
  const btnDaftar = document.getElementById('nav-sub-daftar-program');
  const btnKategori = document.getElementById('nav-sub-kategori-program');

  const activeClass =
    'px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50/80 text-[#0655a7] text-left transition-colors';
  const inactiveClass =
    'px-2.5 py-1.5 rounded-md text-xs text-[#71717a] hover:text-[#0655a7] hover:bg-blue-50/60 font-medium text-left transition-colors';

  if (btnDaftar) btnDaftar.className = activeSub === 'daftar' ? activeClass : inactiveClass;
  if (btnKategori) btnKategori.className = activeSub === 'kategori' ? activeClass : inactiveClass;
}

function showProgramListView() {
  switchTab('program');
  const listView = document.getElementById('subview-program-list');
  const editView = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (listView) listView.classList.remove('hidden');
  if (editView) editView.classList.add('hidden');
  if (katView) katView.classList.add('hidden');

  updateProgramSubmenuActive('daftar');
  updateBreadcrumb(['Program', 'Daftar Program']);
  if (window.lucide) window.lucide.createIcons();
}

function showKategoriManagementView() {
  switchTab('program');
  const listView = document.getElementById('subview-program-list');
  const editView = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (listView) listView.classList.add('hidden');
  if (editView) editView.classList.add('hidden');
  if (katView) katView.classList.remove('hidden');

  updateProgramSubmenuActive('kategori');
  updateBreadcrumb(['Program', 'Manajemen Kategori']);
  renderKategoriTable();
  if (window.lucide) window.lucide.createIcons();
}

function hideSubviews() {
  const list = document.getElementById('subview-program-list');
  const edit = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (list) list.classList.remove('hidden');
  if (edit) edit.classList.add('hidden');
  if (katView) katView.classList.add('hidden');
  updateProgramSubmenuActive('daftar');
}

function handleProgramSubmit(e) {
  e.preventDefault();
  const namaInput = document.getElementById('edit-nama-program');
  const newNama = namaInput ? namaInput.value.trim() : '';

  const dosenSelect = document.getElementById('edit-dosen-program');
  const newDosen = dosenSelect ? dosenSelect.value : 'Ahmad Zainul, M.Kom';

  const kategoriSelect = document.getElementById('edit-kategori-program');
  const newKategori = kategoriSelect
    ? kategoriSelect.options[kategoriSelect.selectedIndex].text
    : 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)';

  if (currentEditingProgramTitle) {
    const prog = programListData.find((p) => p.nama === currentEditingProgramTitle);
    if (prog) {
      prog.nama = newNama || prog.nama;
      prog.dosen = newDosen;
      prog.kategori = newKategori;
    }
  } else if (newNama) {
    programListData.unshift({
      id: 'prog_' + Date.now(),
      nama: newNama,
      dosen: newDosen,
      kategori: newKategori,
    });
  }

  renderProgramTable();
  alert(`Program berhasil disimpan dengan dosen penanggung jawab: ${newDosen}!`);
  hideSubviews();
}

function confirmDeleteProgram(name) {
  if (confirm(`Apakah Anda yakin ingin menghapus program "${name}"?`)) {
    programListData = programListData.filter((p) => p.nama !== name);
    renderProgramTable();
    alert(`Program "${name}" berhasil dihapus.`);
  }
}

// Stepper Minimal IPK
function stepIpk(delta) {
  const input = document.getElementById('edit-min-ipk');
  if (!input) return;
  let val = parseFloat(input.value) || 0.0;
  val = Math.max(0.0, Math.min(4.0, val + delta));
  input.value = val.toFixed(2);
}

// Stepper Kuota Peserta
function stepKuota(delta) {
  const input = document.getElementById('edit-kuota-peserta');
  if (!input) return;
  let val = parseInt(input.value) || 0;
  val = Math.max(1, Math.min(500, val + delta));
  input.value = val;
}

// ==================================================


let currentActiveKategoriId = 'internal_bengkel';
let kategoriSearchKeyword = '';
let kategoriCurrentPage = 1;
const kategoriItemsPerPage = 10;

function filterKategoriTable(keyword) {
  kategoriSearchKeyword = (keyword || '').toLowerCase().trim();
  kategoriCurrentPage = 1;
  renderKategoriTable();
}

function goToKategoriPage(page) {
  kategoriCurrentPage = page;
  renderKategoriTable();
}

function renderKategoriTable() {
  const tbodyKoordinator = document.getElementById('koordinator-kategori-tbody');
  const tbodyProgram = document.getElementById('kategori-table-tbody');
  const info = document.getElementById('kategori-table-info');
  const controlsEl = document.getElementById('kategori-pagination-controls');

  const filtered = kategoriData.filter(
    (k) =>
      k.nama.toLowerCase().includes(kategoriSearchKeyword) || k.type.toLowerCase().includes(kategoriSearchKeyword)
  );

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / kategoriItemsPerPage));

  if (kategoriCurrentPage > totalPages) {
    kategoriCurrentPage = totalPages;
  }

  const startIndex = (kategoriCurrentPage - 1) * kategoriItemsPerPage;
  const endIndex = Math.min(startIndex + kategoriItemsPerPage, totalItems);
  const pageItems = filtered.slice(startIndex, endIndex);

  // 1. Render untuk Subview Manajemen Kategori Program (#kategori-table-tbody)
  if (tbodyProgram) {
    if (totalItems === 0) {
      tbodyProgram.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-xs text-[#71717a]">Tidak ada kategori program ditemukan.</td></tr>`;
    } else {
      tbodyProgram.innerHTML = pageItems
        .map((item, idx) => {
          const rowNumber = startIndex + idx + 1;
          const badgeClass =
            item.type === 'eksternal'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-blue-50 text-[#0655a7] border-blue-200';

          return `
          <tr class="transition-colors hover:bg-gray-50/80">
            <td class="py-2.5 px-2.5 text-center text-[#71717a] text-[11px]">${rowNumber}</td>
            <td class="py-2.5 px-3">
              <span class="font-medium text-[#09090b] text-xs">${item.nama}</span>
            </td>
            <td class="py-2.5 px-3 text-center">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${badgeClass}">
                ${item.type === 'eksternal' ? 'MBKM Eksternal' : 'MBKM Internal'}
              </span>
            </td>
            <td class="py-2.5 px-3 text-center font-semibold text-[#09090b] text-[11px]">
              <span class="px-2 py-0.5 rounded bg-gray-100 border border-[#e4e4e7]">${item.sks || 20} SKS</span>
            </td>
            <td class="px-3 py-2.5 text-center">
              <div class="flex items-center justify-center gap-1.5">
                <button
                  type="button"
                  onclick="showEditKategoriModal('${item.id}')"
                  class="p-1 rounded text-[#71717a] hover:text-[#0655a7] hover:bg-gray-100 transition-colors"
                  title="Edit Kategori"
                >
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <button
                  type="button"
                  onclick="handleDeleteKategori('${item.id}')"
                  class="p-1 rounded text-[#71717a] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Hapus Kategori"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
        })
        .join('');
    }
  }

  // 2. Render untuk View Koordinator Program (#koordinator-kategori-tbody)
  if (tbodyKoordinator) {
    if (totalItems === 0) {
      tbodyKoordinator.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-xs text-[#71717a]">Tidak ada kategori ditemukan.</td></tr>`;
    } else {
      tbodyKoordinator.innerHTML = pageItems
        .map((item, idx) => {
          const rowNumber = startIndex + idx + 1;
          const badgeClass =
            item.type === 'eksternal'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-blue-50 text-[#0655a7] border-blue-200';
          const skemaCount = (skemaData[item.id] || []).length;

          return `
          <tr class="transition-colors hover:bg-gray-50/80">
            <td class="py-2 px-2.5 text-center text-[#71717a] text-[11px]">${rowNumber}</td>
            <td class="px-3 py-2">
              <div class="font-medium text-[#09090b] text-xs">${item.nama}</div>
              <div class="text-[10px] text-[#71717a] flex items-center gap-2 mt-0.5">
                <span>${skemaCount} skema aktif</span>
              </div>
            </td>
            <td class="px-3 py-2 text-center">
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${badgeClass}">
                ${item.type}
              </span>
            </td>
            <td class="py-2 px-3 text-center font-semibold text-[#09090b] text-[11px]">${item.sks || 20} SKS</td>
            <td class="px-3 py-2 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  type="button"
                  onclick="showKoordinatorDaftarProgram('${item.id}')"
                  class="px-2 py-0.5 rounded bg-[#0655a7] hover:bg-[#114d91] text-white text-[11px] font-medium transition-colors shadow-none flex items-center gap-1"
                  title="Lihat Rincian Skema"
                >
                  <i data-lucide="list" class="w-3 h-3"></i>
                  <span>Daftar Program</span>
                </button>
                <button
                  type="button"
                  onclick="showEditKategoriModal('${item.id}')"
                  class="p-1 rounded text-[#71717a] hover:text-[#0655a7] hover:bg-gray-100 transition-colors"
                  title="Edit Kategori"
                >
                  <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                </button>
                <button
                  type="button"
                  onclick="handleDeleteKategori('${item.id}')"
                  class="p-1 rounded text-[#71717a] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Hapus Kategori"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
        })
        .join('');
    }
  }

  if (info) {
    info.textContent = `Showing ${totalItems === 0 ? 0 : startIndex + 1} to ${endIndex} of ${totalItems} entries`;
  }

  // Render Pagination Controls (Kanan Bawah)
  if (controlsEl) {
    let buttonsHtml = '';

    const prevDisabled = kategoriCurrentPage === 1;
    buttonsHtml += `
      <button
        type="button"
        ${prevDisabled ? 'disabled' : ''}
        onclick="goToKategoriPage(${kategoriCurrentPage - 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      const isCurrent = p === kategoriCurrentPage;
      buttonsHtml += `
        <button
          type="button"
          onclick="goToKategoriPage(${p})"
          class="w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-semibold transition-colors ${ isCurrent ? 'bg-[#0655a7] text-white shadow-none' : 'border border-[#e4e4e7] text-[#3f3f46] hover:bg-gray-50' }"
        >
          ${p}
        </button>
      `;
    }

    const nextDisabled = kategoriCurrentPage === totalPages;
    buttonsHtml += `
      <button
        type="button"
        ${nextDisabled ? 'disabled' : ''}
        onclick="goToKategoriPage(${kategoriCurrentPage + 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;

    controlsEl.innerHTML = buttonsHtml;
  }

  if (window.lucide) window.lucide.createIcons();
}

function showAddKategoriModal() {
  document.getElementById('modal-kategori-title').textContent = 'Tambah Kategori Program';
  document.getElementById('modal-kategori-id').value = '';
  document.getElementById('modal-kategori-nama').value = '';
  document.getElementById('modal-kategori-type').value = 'internal';
  document.getElementById('modal-kategori-sks').value = '20';
  document.getElementById('modal-crud-kategori').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function showEditKategoriModal(id) {
  const item = kategoriData.find((k) => k.id === id);
  if (!item) return;
  document.getElementById('modal-kategori-title').textContent = 'Edit Kategori Program';
  document.getElementById('modal-kategori-id').value = item.id;
  document.getElementById('modal-kategori-nama').value = item.nama;
  document.getElementById('modal-kategori-type').value = item.type;
  document.getElementById('modal-kategori-sks').value = item.sks || 20;
  document.getElementById('modal-crud-kategori').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeKategoriModal() {
  document.getElementById('modal-crud-kategori').classList.add('hidden');
}

function handleSaveKategori(e) {
  e.preventDefault();
  const id = document.getElementById('modal-kategori-id').value;
  const nama = document.getElementById('modal-kategori-nama').value.trim();
  const type = document.getElementById('modal-kategori-type').value;
  const sks = parseInt(document.getElementById('modal-kategori-sks').value) || 20;

  if (id) {
    // Edit existing
    const idx = kategoriData.findIndex((k) => k.id === id);
    if (idx !== -1) {
      kategoriData[idx] = { ...kategoriData[idx], nama, type, sks };
    }
  } else {
    // Add new
    const newId = `${type}_${Date.now()}`;
    kategoriData.push({ id: newId, nama, type, sks });
    skemaData[newId] = [];
  }

  closeKategoriModal();
  renderKategoriTable();
  populateProgramKategoriDropdown();
  alert('Data Kategori Program berhasil disimpan.');
}

function handleDeleteKategori(id) {
  const item = kategoriData.find((k) => k.id === id);
  if (!item) return;
  const skemas = skemaData[id] || [];
  if (
    confirm(
      `Apakah Anda yakin ingin menghapus kategori "${item.nama}"?\n(${skemas.length} skema terkait juga akan terhapus)`
    )
  ) {
    kategoriData = kategoriData.filter((k) => k.id !== id);
    delete skemaData[id];
    renderKategoriTable();
    populateProgramKategoriDropdown();
    alert('Kategori berhasil dihapus.');
  }
}


let koordinatorCurrentPage = 1;
const koordinatorItemsPerPage = 10;
let koordinatorSearchQuery = '';
let koordinatorFilterProdi = '';

function getProgramsForKoordinator(dosenName) {
  if (!dosenName) return [];
  return programListData.filter((p) => p.dosen && p.dosen.trim() === dosenName.trim());
}

function handleSearchKoordinator(query) {
  koordinatorSearchQuery = (query || '').toLowerCase().trim();
  koordinatorCurrentPage = 1;
  renderKoordinatorTable();
}

function handleFilterKoordinatorProdi(prodi) {
  koordinatorFilterProdi = (prodi || '').trim();
  koordinatorCurrentPage = 1;
  renderKoordinatorTable();
}

function goToKoordinatorPage(page) {
  koordinatorCurrentPage = page;
  renderKoordinatorTable();
}

function renderKoordinatorTable() {
  const tbody = document.getElementById('koordinator-table-tbody');
  const infoEl = document.getElementById('koordinator-table-info');
  const controlsEl = document.getElementById('koordinator-pagination-controls');
  if (!tbody) return;

  // Hitung Statistik
  const totalKoord = koordinatorData.length;
  let aktifCount = 0;
  let kosongCount = 0;
  let totalAssignedPrograms = 0;

  koordinatorData.forEach((k) => {
    const progs = getProgramsForKoordinator(k.nama);
    if (progs.length > 0) {
      aktifCount++;
      totalAssignedPrograms += progs.length;
    } else {
      kosongCount++;
    }
  });

  const statTotal = document.getElementById('stat-total-koordinator');
  const statAktif = document.getElementById('stat-aktif-koordinator');
  const statKosong = document.getElementById('stat-kosong-koordinator');
  const statCover = document.getElementById('stat-program-tercover');

  if (statTotal) statTotal.textContent = `${totalKoord} Dosen`;
  if (statAktif) statAktif.textContent = `${aktifCount} Dosen`;
  if (statKosong) statKosong.textContent = `${kosongCount} Dosen`;
  if (statCover) statCover.textContent = `${totalAssignedPrograms} Program`;

  // Filter Data Koordinator
  const filtered = koordinatorData.filter((k) => {
    const matchQuery =
      !koordinatorSearchQuery ||
      k.nama.toLowerCase().includes(koordinatorSearchQuery) ||
      k.nidn.toLowerCase().includes(koordinatorSearchQuery) ||
      k.prodi.toLowerCase().includes(koordinatorSearchQuery) ||
      getProgramsForKoordinator(k.nama).some((p) => p.nama.toLowerCase().includes(koordinatorSearchQuery));

    const matchProdi =
      !koordinatorFilterProdi || k.prodi.toLowerCase().includes(koordinatorFilterProdi.toLowerCase());

    return matchQuery && matchProdi;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / koordinatorItemsPerPage));
  if (koordinatorCurrentPage > totalPages) koordinatorCurrentPage = totalPages;

  const startIndex = (koordinatorCurrentPage - 1) * koordinatorItemsPerPage;
  const endIndex = Math.min(startIndex + koordinatorItemsPerPage, totalItems);
  const pageItems = filtered.slice(startIndex, endIndex);

  if (totalItems === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-xs text-[#71717a]">Tidak ada data koordinator ditemukan.</td></tr>`;
    if (infoEl) infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    if (controlsEl) controlsEl.innerHTML = '';
    return;
  }

  tbody.innerHTML = pageItems
    .map((item, idx) => {
      const rowNumber = startIndex + idx + 1;
      const progs = getProgramsForKoordinator(item.nama);
      const count = progs.length;

      // Badges untuk program diampu (1:N)
      let progsHtml = '';
      if (count === 0) {
        progsHtml = `
          <div class="flex items-center gap-1.5 text-xs">
            <span class="italic text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Belum ada program diampu
            </span>
          </div>
        `;
      } else {
        progsHtml = `
          <div class="flex flex-wrap items-center gap-1.5 max-w-xl">
            ${progs
              .map(
                (p) => `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-[#0655a7] border border-blue-200/80" title="${p.nama} (${p.kategori})">
                <span class="truncate max-w-[210px]">${p.nama}</span>
              </span>
            `
              )
              .join('')}
          </div>
        `;
      }

      // Beban tugas badge
      let bebanBadge = '';
      if (count === 0) {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Tersedia (0)</span>`;
      } else if (count <= 2) {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">${count} Program</span>`;
      } else {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0655a7] border border-blue-200">${count} Program</span>`;
      }

      return `
      <tr class="transition-colors hover:bg-gray-50/80">
        <td class="py-2.5 px-2.5 text-center text-[#71717a] text-[11px]">${rowNumber}</td>
        <td class="py-2.5 px-3">
          <div class="font-semibold text-[#09090b] text-xs">${item.nama}</div>
          <div class="text-[10px] text-[#71717a] flex items-center gap-2 mt-0.5">
            <span class="">NIDN: ${item.nidn}</span>
            <span>•</span>
            <span>${item.email}</span>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <span class="text-xs text-[#3f3f46] font-medium">${item.prodi}</span>
        </td>
        <td class="py-2.5 px-3">
          ${progsHtml}
        </td>
        <td class="py-2.5 px-3 text-center">
          ${bebanBadge}
        </td>
        <td class="px-3 py-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button
              type="button"
              onclick="showAssignProgramModal('${item.id}')"
              class="px-2.5 py-1 rounded-md bg-[#0655a7] hover:bg-[#114d91] text-white text-[11px] font-semibold flex items-center gap-1 shadow-none transition-colors"
              title="Alokasikan Program MBKM yang Diampu Dosen Ini"
            >
              <i data-lucide="layers" class="w-3 h-3"></i>
              <span>Tugaskan</span>
            </button>
            <button
              type="button"
              onclick="showEditKoordinatorModal('${item.id}')"
              class="p-1 rounded text-[#71717a] hover:text-[#0655a7] hover:bg-gray-100 transition-colors"
              title="Edit Profil Koordinator"
            >
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
            <button
              type="button"
              onclick="handleDeleteKoordinator('${item.id}')"
              class="p-1 rounded text-[#71717a] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Hapus Koordinator"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join('');

  if (infoEl) {
    infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
  }

  if (controlsEl) {
    let buttonsHtml = '';
    const prevDisabled = koordinatorCurrentPage === 1;
    buttonsHtml += `
      <button
        type="button"
        ${prevDisabled ? 'disabled' : ''}
        onclick="goToKoordinatorPage(${koordinatorCurrentPage - 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      const isCurrent = p === koordinatorCurrentPage;
      buttonsHtml += `
        <button
          type="button"
          onclick="goToKoordinatorPage(${p})"
          class="w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-semibold transition-colors ${ isCurrent ? 'bg-[#0655a7] text-white shadow-none' : 'border border-[#e4e4e7] text-[#3f3f46] hover:bg-gray-50' }"
        >
          ${p}
        </button>
      `;
    }

    const nextDisabled = koordinatorCurrentPage === totalPages;
    buttonsHtml += `
      <button
        type="button"
        ${nextDisabled ? 'disabled' : ''}
        onclick="goToKoordinatorPage(${koordinatorCurrentPage + 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;

    controlsEl.innerHTML = buttonsHtml;
  }

  renderDashboardKoordinatorWidget();
  if (window.lucide) window.lucide.createIcons();
}


function handleDashboardSksChange(sks) {
  const data = SKS_PIPELINE_DATA[sks] || SKS_PIPELINE_DATA['20'];
  const reqEl = document.getElementById('funnel-sks-request');
  const revEl = document.getElementById('funnel-sks-review');
  const mapEl = document.getElementById('funnel-sks-mapping');
  const skEl = document.getElementById('funnel-sks-sk');
  const totalEl = document.getElementById('dashboard-sks-total');

  if (reqEl) reqEl.textContent = data.request;
  if (revEl) revEl.textContent = data.review;
  if (mapEl) mapEl.textContent = data.mapping;
  if (skEl) skEl.textContent = data.sk;
  if (totalEl) totalEl.textContent = data.totalText;
}

function renderDashboardKoordinatorWidget() {
  const totalCardKoord = document.getElementById('dash-card-total-koordinator');
  const totalCardProg = document.getElementById('dash-card-total-program');

  if (totalCardProg) {
    totalCardProg.textContent = `${programListData.length} Program`;
  }
  if (totalCardKoord) {
    const aktif = koordinatorData.filter((k) => getProgramsForKoordinator(k.nama).length > 0).length;
    const kosong = koordinatorData.length - aktif;
    totalCardKoord.textContent = `${koordinatorData.length} Dosen`;
    const subP = totalCardKoord.nextElementSibling;
    if (subP) subP.textContent = `${aktif} aktif mengampu, ${kosong} belum ditugaskan`;
  }
}

// ====================================================
// CRUD KOORDINATOR DOSEN MODAL
// ====================================================
function showAddKoordinatorModal() {
  document.getElementById('modal-koordinator-title').textContent = 'Tambah Dosen Koordinator';
  document.getElementById('modal-koordinator-id').value = '';
  document.getElementById('modal-koordinator-nama').value = '';
  document.getElementById('modal-koordinator-nidn').value = '';
  document.getElementById('modal-koordinator-prodi').value = 'S1 Teknik Informatika';
  document.getElementById('modal-koordinator-email').value = '';
  document.getElementById('modal-crud-koordinator').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function showEditKoordinatorModal(id) {
  const item = koordinatorData.find((k) => k.id === id);
  if (!item) return;

  document.getElementById('modal-koordinator-title').textContent = 'Edit Profil Dosen Koordinator';
  document.getElementById('modal-koordinator-id').value = item.id;
  document.getElementById('modal-koordinator-nama').value = item.nama;
  document.getElementById('modal-koordinator-nidn').value = item.nidn;
  document.getElementById('modal-koordinator-prodi').value = item.prodi;
  document.getElementById('modal-koordinator-email').value = item.email;
  document.getElementById('modal-crud-koordinator').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeKoordinatorModal() {
  document.getElementById('modal-crud-koordinator').classList.add('hidden');
}

function handleSaveKoordinator(e) {
  e.preventDefault();
  const id = document.getElementById('modal-koordinator-id').value;
  const nama = document.getElementById('modal-koordinator-nama').value.trim();
  const nidn = document.getElementById('modal-koordinator-nidn').value.trim();
  const prodi = document.getElementById('modal-koordinator-prodi').value;
  const email = document.getElementById('modal-koordinator-email').value.trim();

  if (!nama || !nidn) {
    alert('Nama dosen dan NIDN wajib diisi.');
    return;
  }

  if (id) {
    // Edit
    const idx = koordinatorData.findIndex((k) => k.id === id);
    if (idx !== -1) {
      const oldNama = koordinatorData[idx].nama;
      koordinatorData[idx] = {
        ...koordinatorData[idx],
        nama,
        nidn,
        prodi,
        email,
      };
      // Jika nama berubah, update dosen di programListData yang terkait
      if (oldNama !== nama) {
        programListData.forEach((p) => {
          if (p.dosen === oldNama) {
            p.dosen = nama;
          }
        });
        renderProgramTable();
      }
    }
  } else {
    // Add
    const newId = `kord_${Date.now()}`;
    koordinatorData.push({
      id: newId,
      nama,
      nidn,
      prodi,
      email,
    });
  }

  closeKoordinatorModal();
  renderKoordinatorTable();
  populateProgramDosenDropdown();
  alert('Data dosen koordinator berhasil disimpan.');
}

function handleDeleteKoordinator(id) {
  const item = koordinatorData.find((k) => k.id === id);
  if (!item) return;

  const assigned = getProgramsForKoordinator(item.nama);
  let confirmMsg = `Apakah Anda yakin ingin menghapus "${item.nama}" dari daftar koordinator?`;
  if (assigned.length > 0) {
    confirmMsg += `\n\nPerhatian: Dosen ini sedang mengampu ${assigned.length} program. Status pengampu program-program tersebut akan direset menjadi "Belum Ditugaskan".`;
  }

  if (confirm(confirmMsg)) {
    // Reset penugasan program yang diampu dosen ini
    programListData.forEach((p) => {
      if (p.dosen === item.nama) {
        p.dosen = 'Belum Ditugaskan';
      }
    });

    koordinatorData = koordinatorData.filter((k) => k.id !== id);
    renderKoordinatorTable();
    renderProgramTable();
    populateProgramDosenDropdown();
    alert('Koordinator berhasil dihapus.');
  }
}

// ====================================================
// 1-to-N MULTI-SELECT PROGRAM ASSIGNMENT MODAL
// ====================================================
let activeAssignKoordinatorId = null;
let assignSelectedPrograms = new Set();
let assignProgramSearchQuery = '';

function showAssignProgramModal(koordinatorId) {
  const koord = koordinatorData.find((k) => k.id === koordinatorId);
  if (!koord) return;

  activeAssignKoordinatorId = koordinatorId;
  document.getElementById('modal-assign-koordinator-id').value = koord.id;
  document.getElementById('modal-assign-dosen-name').textContent = koord.nama;
  document.getElementById('modal-assign-dosen-meta').textContent = `${koord.prodi} • NIDN: ${koord.nidn}`;

  // Inisialisasi set dengan program yang saat ini diampu oleh dosen ini
  assignSelectedPrograms = new Set();
  programListData.forEach((p) => {
    if (p.dosen && p.dosen.trim() === koord.nama.trim()) {
      assignSelectedPrograms.add(p.nama);
    }
  });

  assignProgramSearchQuery = '';
  const searchInput = document.getElementById('search-assign-program');
  if (searchInput) searchInput.value = '';

  renderAssignProgramList();
  document.getElementById('modal-assign-program').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeAssignProgramModal() {
  document.getElementById('modal-assign-program').classList.add('hidden');
  activeAssignKoordinatorId = null;
}

function handleAssignProgramSearch(query) {
  assignProgramSearchQuery = (query || '').toLowerCase().trim();
  renderAssignProgramList();
}

function handleToggleProgramCheck(progNama, isChecked) {
  if (isChecked) {
    assignSelectedPrograms.add(progNama);
  } else {
    assignSelectedPrograms.delete(progNama);
  }
  updateAssignSelectedCount();
}

function handleSelectAllPrograms(checkAll) {
  const koord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  if (!koord) return;

  programListData.forEach((p) => {
    const match =
      !assignProgramSearchQuery ||
      p.nama.toLowerCase().includes(assignProgramSearchQuery) ||
      p.kategori.toLowerCase().includes(assignProgramSearchQuery);

    if (match) {
      if (checkAll) {
        assignSelectedPrograms.add(p.nama);
      } else {
        assignSelectedPrograms.delete(p.nama);
      }
    }
  });
  renderAssignProgramList();
}

function updateAssignSelectedCount() {
  const countEl = document.getElementById('modal-assign-selected-count');
  if (countEl) {
    countEl.textContent = `${assignSelectedPrograms.size} Program Dipilih`;
  }
}

function renderAssignProgramList() {
  const container = document.getElementById('modal-assign-program-list');
  if (!container) return;

  const currentKoord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  const currentKoordNama = currentKoord ? currentKoord.nama : '';

  const filtered = programListData.filter((p) => {
    if (!assignProgramSearchQuery) return true;
    return (
      p.nama.toLowerCase().includes(assignProgramSearchQuery) ||
      p.kategori.toLowerCase().includes(assignProgramSearchQuery) ||
      (p.dosen && p.dosen.toLowerCase().includes(assignProgramSearchQuery))
    );
  });

  updateAssignSelectedCount();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-xs text-[#71717a]">
        Tidak ada program MBKM yang cocok dengan pencarian.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((p) => {
      const isChecked = assignSelectedPrograms.has(p.nama);
      const isCurrentlyAssignedToAnother =
        p.dosen && p.dosen !== currentKoordNama && p.dosen !== 'Belum Ditugaskan' && p.dosen !== '-';

      return `
      <label class="flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${ isChecked ? 'bg-blue-50/50 border-[#0655a7]/40 ring-1 ring-[#0655a7]/20' : 'bg-white border-[#e4e4e7] hover:bg-gray-50' }">
        <input
          type="checkbox"
          ${isChecked ? 'checked' : ''}
          onchange="handleToggleProgramCheck('${p.nama.replace(/'/g, "\\'")}', this.checked)"
          class="mt-1 w-4 h-4 rounded text-[#0655a7] focus:ring-[#0655a7] border-gray-300 rounded cursor-pointer"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <div class="font-semibold text-xs text-[#09090b] truncate">${p.nama}</div>
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-[#71717a] border border-gray-200 shrink-0">
              ${p.kategori}
            </span>
          </div>
          <div class="text-[11px] text-[#71717a] mt-0.5 flex flex-wrap items-center gap-2">
            <span>Konversi: <b class="text-[#09090b]">${p.sks} SKS</b></span>
            <span>•</span>
            ${
              isCurrentlyAssignedToAnother
                ? `<span class="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">Dialihkan dari: ${p.dosen}</span>`
                : p.dosen === currentKoordNama
                  ? `<span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">Sedang diampu dosen ini</span>`
                  : `<span class="text-[#71717a] text-[10px]">Status: Belum Ditugaskan</span>`
            }
          </div>
        </div>
      </label>
    `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

function handleSaveProgramAssignment(e) {
  e.preventDefault();
  const koord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  if (!koord) return;

  // 1-to-N assignment update:
  programListData.forEach((p) => {
    if (assignSelectedPrograms.has(p.nama)) {
      // Ditugaskan ke dosen ini
      p.dosen = koord.nama;
    } else if (p.dosen === koord.nama) {
      // Dilepas dari dosen ini
      p.dosen = 'Belum Ditugaskan';
    }
  });

  closeAssignProgramModal();
  renderKoordinatorTable();
  renderProgramTable();
  alert(`Penugasan program untuk ${koord.nama} berhasil diperbarui.`);
}

// --------------------------------------------------
// SYNC DYNAMIC DROPDOWN DI FORM PROGRAM (SUBVIEW EDIT)
// --------------------------------------------------
function populateProgramDosenDropdown() {
  const select = document.getElementById('edit-dosen-program');
  if (!select) return;

  const currentVal = select.value;
  let html = '';
  html += `<option value="Belum Ditugaskan">-- Belum Ditugaskan --</option>`;
  koordinatorData.forEach((k) => {
    html += `<option value="${k.nama}">${k.nama} (NIDN: ${k.nidn})</option>`;
  });

  select.innerHTML = html;
  if (currentVal && koordinatorData.some((k) => k.nama === currentVal)) {
    select.value = currentVal;
  } else if (koordinatorData.length > 0) {
    select.value = koordinatorData[0].nama;
  }
}

// --------------------------------------------------
// SYNC DYNAMIC DROPDOWN DI FORM PROGRAM (SUBVIEW EDIT)
// --------------------------------------------------
function populateProgramKategoriDropdown() {
  const select = document.getElementById('edit-kategori-program');
  if (!select) return;

  const currentVal = select.value;
  const eksternalList = kategoriData.filter((k) => k.type === 'eksternal');
  const internalList = kategoriData.filter((k) => k.type === 'internal');

  let html = '';
  if (eksternalList.length > 0) {
    html += `<optgroup label="MBKM Eksternal (Pendaftaran Mandiri & Seleksi)">`;
    eksternalList.forEach((k) => {
      html += `<option value="${k.id}">${k.nama}</option>`;
    });
    html += `</optgroup>`;
  }

  if (internalList.length > 0) {
    html += `<optgroup label="MBKM Internal (Penugasan Kontributor / Auto-Lolos)">`;
    internalList.forEach((k) => {
      html += `<option value="${k.id}">${k.nama}</option>`;
    });
    html += `</optgroup>`;
  }

  select.innerHTML = html;
  if (currentVal && kategoriData.some((k) => k.id === currentVal)) {
    select.value = currentVal;
  } else if (kategoriData.length > 0) {
    select.value = kategoriData[0].id;
  }
}


let surekomCurrentPage = 1;
const surekomItemsPerPage = 8;
let surekomSearchQuery = '';
let surekomFilterStatus = 'pending'; // Default: Menunggu Validasi
let surekomFilterProgram = 'semua';
let surekomFilterProdi = 'semua';
let activeModalSurekomId = null;

function handleSearchSurekom(query) {
  surekomSearchQuery = (query || '').toLowerCase().trim();
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomStatus(val) {
  surekomFilterStatus = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomProgram(val) {
  surekomFilterProgram = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomProdi(val) {
  surekomFilterProdi = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function getFilteredSurekomData() {
  return surekomListData.filter((item) => {
    const matchQuery =
      !surekomSearchQuery ||
      item.nama.toLowerCase().includes(surekomSearchQuery) ||
      item.nim.toLowerCase().includes(surekomSearchQuery) ||
      item.program.toLowerCase().includes(surekomSearchQuery) ||
      (item.kontributor && item.kontributor.toLowerCase().includes(surekomSearchQuery));

    const matchStatus =
      surekomFilterStatus === 'semua' || item.status === surekomFilterStatus;

    const matchProgram =
      surekomFilterProgram === 'semua' ||
      item.program.toLowerCase().includes(surekomFilterProgram.toLowerCase()) ||
      (item.kontributor && item.kontributor.toLowerCase().includes(surekomFilterProgram.toLowerCase()));

    const matchProdi =
      surekomFilterProdi === 'semua' ||
      item.prodi.toUpperCase().includes(surekomFilterProdi.toUpperCase());

    return matchQuery && matchStatus && matchProgram && matchProdi;
  });
}

function renderSurekomTable() {
  const tbody = document.getElementById('surekom-table-tbody');
  const infoEl = document.getElementById('surekom-table-info');
  const paginationControls = document.getElementById('surekom-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredSurekomData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / surekomItemsPerPage) || 1;

  if (surekomCurrentPage > totalPages) {
    surekomCurrentPage = totalPages;
  }

  const startIndex = (surekomCurrentPage - 1) * surekomItemsPerPage;
  const endIndex = Math.min(startIndex + surekomItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-8 text-center text-sm text-[#71717a]">
          Tidak ada permohonan surat rekomendasi yang cocok dengan kriteria filter.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const initials = item.nama
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();

        const statusBadges = {
          pending: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FDE68A] bg-[#FEF3C7] text-[13px] font-medium text-[#92400E]">Menunggu</span>',
          approved: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#BBF7D0] bg-[#DCFCE7] text-[13px] font-medium text-[#15803D]">Disetujui</span>',
          rejected: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FECDD3] bg-[#FFE4E6] text-[13px] font-medium text-[#BE123C]">Ditolak</span>',
        };
        const statusBadge = statusBadges[item.status] || statusBadges.pending;

        const isPending = item.status === 'pending';
        const actionBtn = isPending
          ? `
            <button
              type="button"
              onclick="openValidasiSurekomModal(${item.id})"
              class="h-9 px-3.5 rounded-md bg-[#0655a7] hover:bg-[#0655a7]/90 text-white font-medium text-xs transition-colors shadow-none"
            >
              Validasi
            </button>
          `
          : `
            <button
              type="button"
              onclick="openValidasiSurekomModal(${item.id})"
              class="h-9 px-3.5 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] font-medium text-xs transition-colors"
            >
              Detail
            </button>
          `;

        return `
          <tr class="h-[68px] border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors">
            <td class="px-4 text-center text-sm text-[#71717a]">${rowNum}</td>
            <td class="px-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-[#0655a7] font-bold flex items-center justify-center text-xs shrink-0">
                  ${initials}
                </div>
                <div>
                  <div class="font-medium text-[#09090b] text-sm">${item.nama}</div>
                  <div class="text-[#71717a] text-xs">${item.nim} • ${item.prodi}</div>
                </div>
              </div>
            </td>
            <td class="px-4">
              <div class="text-sm font-medium text-[#09090b]">${item.kontributor}</div>
            </td>
            <td class="px-4 text-center text-sm font-medium text-[#09090b]">${item.ipk}</td>
            <td class="px-4 text-center text-sm text-[#71717a]">${item.sksLulus}</td>
            <td class="px-4 text-center">${statusBadge}</td>
            <td class="px-4 text-center text-sm text-[#71717a]">${item.tanggal}</td>
            <td class="px-4 text-center">${actionBtn}</td>
          </tr>
        `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent =
      totalItems === 0
        ? 'Menampilkan 0 permohonan'
        : `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} permohonan (Halaman ${surekomCurrentPage} dari ${totalPages})`;
  }

  renderSurekomPaginationControls(totalPages);
  if (window.lucide) window.lucide.createIcons();
}

function renderSurekomPaginationControls(totalPages) {
  const controls = document.getElementById('surekom-pagination-controls');
  if (!controls) return;

  let html = '';
  const prevDisabled = surekomCurrentPage === 1;
  html += `
    <button
      type="button"
      onclick="goToSurekomPage(${surekomCurrentPage - 1})"
      ${prevDisabled ? 'disabled' : ''}
      class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Prev
    </button>
  `;

  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === surekomCurrentPage;
    html += `
      <button
        type="button"
        onclick="goToSurekomPage(${p})"
        class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
          isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
        }"
      >
        ${p}
      </button>
    `;
  }

  const nextDisabled = surekomCurrentPage === totalPages;
  html += `
    <button
      type="button"
      onclick="goToSurekomPage(${surekomCurrentPage + 1})"
      ${nextDisabled ? 'disabled' : ''}
      class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  `;

  controls.innerHTML = html;
}

function goToSurekomPage(page) {
  const filtered = getFilteredSurekomData();
  const totalPages = Math.ceil(filtered.length / surekomItemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  surekomCurrentPage = page;
  renderSurekomTable();
}

function openValidasiSurekomModal(id) {
  const item = surekomListData.find((s) => s.id === id);
  if (!item) return;

  activeModalSurekomId = id;
  const modal = document.getElementById('modal-validasi-surekom');
  if (!modal) return;

  const initials = item.nama
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const avatar = document.getElementById('modal-surekom-avatar');
  if (avatar) avatar.textContent = initials;

  const nama = document.getElementById('modal-surekom-nama');
  if (nama) nama.textContent = item.nama;

  const nimProdi = document.getElementById('modal-surekom-nim-prodi');
  if (nimProdi) nimProdi.textContent = `${item.nim} • ${item.prodi}`;

  const program = document.getElementById('modal-surekom-program');
  if (program) program.textContent = item.program;

  const kontributor = document.getElementById('modal-surekom-kontributor');
  if (kontributor) kontributor.textContent = item.kontributor;

  // Isi pratinjau surat langsung di dalam modal
  const previewEl = document.getElementById('modal-surekom-doc-preview');
  if (previewEl) {
    previewEl.textContent = buildSuratRekomendasiText(item);
  }

  // Reset radio decision to Setujui
  const inputCatatan = document.getElementById('modal-surekom-catatan-input');
  if (inputCatatan) {
    inputCatatan.value = item.catatan || '';
    inputCatatan.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
  }
  handleModalSurekomDecisionChange('Setujui');

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeValidasiSurekomModal() {
  const modal = document.getElementById('modal-validasi-surekom');
  if (modal) modal.classList.add('hidden');
  activeModalSurekomId = null;
}

function handleModalSurekomDecisionChange(val) {
  const cardSetujui = document.getElementById('label-radio-surekom-setujui');
  const cardTolak = document.getElementById('label-radio-surekom-tolak');
  const badge = document.getElementById('modal-decision-label-badge');
  const label = document.getElementById('modal-surekom-catatan-label');
  const hint = document.getElementById('modal-surekom-catatan-hint');
  const input = document.getElementById('modal-surekom-catatan-input');

  if (val === 'Setujui') {
    if (cardSetujui) {
      cardSetujui.className = 'h-10 rounded-md border border-[#0655a7] bg-[#0655a7] text-white cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (cardTolak) {
      cardTolak.className = 'h-10 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#3f3f46] cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (badge) {
      badge.textContent = 'Setujui';
      badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]';
    }
    if (label) label.textContent = 'Catatan untuk Mahasiswa';
    if (hint) {
      hint.textContent = 'Opsional';
      hint.className = 'text-[11px] text-[#71717a]';
    }
    if (input) {
      input.required = false;
      input.placeholder = 'Tuliskan catatan atau instruksi revisi...';
      input.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
    }
  } else {
    if (cardTolak) {
      cardTolak.className = 'h-10 rounded-md border border-[#BE123C] bg-[#BE123C] text-white cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (cardSetujui) {
      cardSetujui.className = 'h-10 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#3f3f46] cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (badge) {
      badge.textContent = 'Tolak';
      badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#FFE4E6] text-[#BE123C] border border-[#FECDD3]';
    }
    if (label) label.textContent = 'Alasan Penolakan / Instruksi Revisi *';
    if (hint) {
      hint.textContent = '*Wajib diisi alasan penolakan';
      hint.className = 'text-[11px] font-semibold text-[#BE123C]';
    }
    if (input) {
      input.required = true;
      input.placeholder = 'Wajib masukkan alasan penolakan / instruksi revisi dokumen mahasiswa...';
      input.focus();
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Kirim keputusan validasi SuReKom langsung dari tombol footer.
 * @param {'Setujui'|'Tolak'} decision
 */
function submitValidasiSurekomWithDecision(decision) {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  const input = document.getElementById('modal-surekom-catatan-input');
  const catatan = input ? input.value.trim() : '';

  if (decision === 'Tolak' && !catatan) {
    alert('Alasan penolakan wajib diisi untuk memberikan instruksi revisi kepada mahasiswa.');
    if (input) {
      input.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
      input.focus();
    }
    return;
  }

  item.status = decision === 'Setujui' ? 'approved' : 'rejected';
  item.catatan = catatan;

  alert(`Validasi Surat Rekomendasi Berhasil Disimpan!\nMahasiswa: ${item.nama} (${item.nim})\nKeputusan: ${decision === 'Setujui' ? 'Disetujui (SuReKom Resmi Diterbitkan)' : 'Ditolak (Permintaan Revisi Dikirim)'}\nCatatan: ${catatan || '-'}`);

  closeValidasiSurekomModal();
  renderSurekomTable();
}

function submitValidasiSurekomFromModal() {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  const radio = document.querySelector('input[name="modal_surekom_decision"]:checked');
  const decision = radio ? radio.value : 'Setujui';
  const input = document.getElementById('modal-surekom-catatan-input');
  const catatan = input ? input.value.trim() : '';

  if (decision === 'Tolak' && !catatan) {
    alert('Alasan penolakan wajib diisi untuk memberikan instruksi revisi kepada mahasiswa.');
    if (input) {
      input.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
      input.focus();
    }
    return;
  }

  item.status = decision === 'Setujui' ? 'approved' : 'rejected';
  item.catatan = catatan;

  alert(`Validasi Surat Rekomendasi Berhasil Disimpan!\nMahasiswa: ${item.nama} (${item.nim})\nKeputusan: ${decision === 'Setujui' ? 'Disetujui (SuReKom Resmi Diterbitkan)' : 'Ditolak (Permintaan Revisi Dikirim)'}\nCatatan: ${catatan || '-'}`);

  closeValidasiSurekomModal();
  renderSurekomTable();
}

/**
 * Menyusun isi teks Surat Rekomendasi Dekanat berdasarkan data permohonan.
 * Dipakai untuk pratinjau inline di modal validasi.
 */
function buildSuratRekomendasiText(item) {
  return `SURAT REKOMENDASI DEKANAT
Nomor: 412/A.11/FIK/UDINUS/2026

Yang bertanda tangan di bawah ini:
Nama    : Dr. Guruh Fajar Shidik, S.Kom, M.Cs
Jabatan : Dekan Fakultas Ilmu Komputer
Instansi: Universitas Dian Nuswantoro Semarang

Dengan ini memberikan rekomendasi penuh kepada mahasiswa:
Nama          : ${item.nama}
NIM           : ${item.nim}
Program Studi : ${item.prodi}
Semester      : ${item.semester}
IPK Kumulatif : ${item.ipk} (Total ${item.sksLulus} SKS Lulus)

Untuk mengikuti program ${item.program} pada instansi ${item.kontributor} periode Semester Gasal 2026/2027.

Berdasarkan data akademik EWS & SIADIN, yang bersangkutan dinyatakan memenuhi seluruh persyaratan kualifikasi akademik dan bebas sanksi kode etik.

Demikian surat rekomendasi ini diterbitkan untuk dipergunakan sebagaimana mestinya.

Semarang, ${item.tanggal}
Dekan Fakultas Ilmu Komputer
Universitas Dian Nuswantoro

(Dokumen Resmi Bertanda Tangan Elektronik / TTE Digital Terverifikasi)`;
}

function bukaPratinjauDrafDoc() {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  viewSurekomDoc('Draft Surat Rekomendasi MBKM (' + item.nim + ')', buildSuratRekomendasiText(item));
}

function showSurekomDetailById(id) {
  openValidasiSurekomModal(id);
}

function showSurekomDetail() {
  // Fallback backward compatibility
}

function hideSurekomDetail() {
  closeValidasiSurekomModal();
}

function viewSurekomDoc(title, content) {
  const modal = document.getElementById('modal-surekom-doc-viewer');
  const titleEl = document.getElementById('modal-doc-viewer-title');
  const contentEl = document.getElementById('modal-doc-viewer-content');
  if (!modal || !titleEl || !contentEl) return;

  titleEl.textContent = 'Pratinjau Dokumen: ' + title;
  contentEl.textContent = content;
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeSurekomDocModal() {
  const modal = document.getElementById('modal-surekom-doc-viewer');
  if (modal) modal.classList.add('hidden');
}


let logbookCurrentPage = 1;
const logbookItemsPerPage = 10;
let logbookSearchQuery = '';

function handleSearchLogbook(query) {
  logbookSearchQuery = (query || '').toLowerCase().trim();
  logbookCurrentPage = 1;
  renderLogbookTable();
}

function getFilteredLogbookData() {
  if (!logbookSearchQuery) return logbookListData;
  return logbookListData.filter((item) => {
    return (
      item.nama.toLowerCase().includes(logbookSearchQuery) || item.nim.toLowerCase().includes(logbookSearchQuery)
    );
  });
}

function renderLogbookTable() {
  const tbody = document.getElementById('logbook-table-tbody');
  const infoEl = document.getElementById('logbook-table-info');
  const paginationControls = document.getElementById('logbook-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredLogbookData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / logbookItemsPerPage) || 1;

  if (logbookCurrentPage > totalPages) {
    logbookCurrentPage = totalPages;
  }

  const startIndex = (logbookCurrentPage - 1) * logbookItemsPerPage;
  const endIndex = Math.min(startIndex + logbookItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="py-6 text-center text-xs text-[#71717a]">
          Tidak ada data logbook mahasiswa yang ditemukan.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const safeNama = item.nama.replace(/'/g, "\\'");
        return `
          <tr class="transition-colors hover:bg-gray-50/80">
            <td class="py-2 px-2.5 text-center text-[#71717a] text-[11px]">${rowNum}</td>
            <td class="py-2 px-3 font-medium text-[#09090b] text-[11px]">${item.nama}</td>
            <td class="py-2 px-3 text-[#09090b] text-[11px]">${item.nim}</td>
            <td class="px-3 py-2 text-center">
              <button
                type="button"
                onclick="showLogbookDetail('${safeNama}', '${item.nim}')"
                class="px-2.5 py-1 rounded text-[11px] bg-[#0655a7] hover:bg-[#114d91] text-white font-medium transition-colors shadow-none"
              >
                Detail
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  if (infoEl) {
    if (totalItems === 0) {
      infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    } else {
      infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
    }
  }

  renderLogbookPaginationControls(totalPages);
  if (window.lucide) window.lucide.createIcons();
}

function renderLogbookPaginationControls(totalPages) {
  const controls = document.getElementById('logbook-pagination-controls');
  if (!controls) return;

  let html = '';
  const prevDisabled = logbookCurrentPage === 1;
  html += `
    <button
      type="button"
      onclick="goToLogbookPage(${logbookCurrentPage - 1})"
      ${prevDisabled ? 'disabled' : ''}
      class="px-2 py-0.5 text-[11px] rounded border border-[#e4e4e7] bg-white text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Prev
    </button>
  `;

  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === logbookCurrentPage;
    html += `
      <button
        type="button"
        onclick="goToLogbookPage(${p})"
        class="w-6 h-6 flex items-center justify-center text-[11px] font-medium rounded transition-colors ${ isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#3f3f46] hover:bg-gray-50' }"
      >
        ${p}
      </button>
    `;
  }

  const nextDisabled = logbookCurrentPage === totalPages;
  html += `
    <button
      type="button"
      onclick="goToLogbookPage(${logbookCurrentPage + 1})"
      ${nextDisabled ? 'disabled' : ''}
      class="px-2 py-0.5 text-[11px] rounded border border-[#e4e4e7] bg-white text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  `;

  controls.innerHTML = html;
}

function goToLogbookPage(page) {
  const filtered = getFilteredLogbookData();
  const totalPages = Math.ceil(filtered.length / logbookItemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  logbookCurrentPage = page;
  renderLogbookTable();
}


let laporanCurrentPage = 1;
const laporanItemsPerPage = 10;
let laporanSearchQuery = '';

function handleSearchLaporan(query) {
  laporanSearchQuery = (query || '').toLowerCase().trim();
  laporanCurrentPage = 1;
  renderLaporanTable();
}

function getFilteredLaporanData() {
  if (!laporanSearchQuery) return laporanListData;
  return laporanListData.filter((item) => {
    return (
      item.nama.toLowerCase().includes(laporanSearchQuery) || item.nim.toLowerCase().includes(laporanSearchQuery)
    );
  });
}

function renderLaporanTable() {
  const tbody = document.getElementById('laporan-table-tbody');
  const infoEl = document.getElementById('laporan-table-info');
  const paginationControls = document.getElementById('laporan-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredLaporanData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / laporanItemsPerPage) || 1;

  if (laporanCurrentPage > totalPages) {
    laporanCurrentPage = totalPages;
  }

  const startIndex = (laporanCurrentPage - 1) * laporanItemsPerPage;
  const endIndex = Math.min(startIndex + laporanItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="py-6 text-center text-xs text-[#71717a]">
          Tidak ada data laporan akhir mahasiswa yang ditemukan.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const safeNama = item.nama.replace(/'/g, "\\'");
        return `
          <tr class="transition-colors hover:bg-gray-50/80">
            <td class="py-2 px-2.5 text-center text-[#71717a] text-[11px]">${rowNum}</td>
            <td class="py-2 px-3 font-medium text-[#09090b] text-[11px]">${item.nama}</td>
            <td class="py-2 px-3 text-[#09090b] text-[11px]">${item.nim}</td>
            <td class="px-3 py-2 text-center">
              <button
                type="button"
                onclick="alert('Mengunduh Laporan Akhir: ${safeNama}')"
                class="px-2.5 py-1 rounded text-[11px] bg-[#0655a7] hover:bg-[#114d91] text-white font-medium inline-flex items-center gap-1.5 transition-colors shadow-none"
              >
                <i data-lucide="download" class="w-3 h-3"></i>
                <span>Download</span>
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }

  if (infoEl) {
    if (totalItems === 0) {
      infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    } else {
      infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
    }
  }

  renderLaporanPaginationControls(totalPages);
  if (window.lucide) window.lucide.createIcons();
}

function renderLaporanPaginationControls(totalPages) {
  const controls = document.getElementById('laporan-pagination-controls');
  if (!controls) return;

  let html = '';
  const prevDisabled = laporanCurrentPage === 1;
  html += `
    <button
      type="button"
      onclick="goToLaporanPage(${laporanCurrentPage - 1})"
      ${prevDisabled ? 'disabled' : ''}
      class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-[#71717a] ${prevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f4f4f5] cursor-pointer'} transition-colors"
      title="Sebelumnya"
    >
      <i data-lucide="chevron-left" class="w-4 h-4"></i>
    </button>
  `;

  // Sliding 3-page box window (1-3, 4-6, dst)
  const windowStart = Math.floor((laporanCurrentPage - 1) / 3) * 3 + 1;
  const windowEnd = Math.min(windowStart + 2, totalPages);

  for (let p = windowStart; p <= windowEnd; p++) {
    const isActive = p === laporanCurrentPage;
    html += `
      <button
        type="button"
        onclick="goToLaporanPage(${p})"
        class="h-8 w-8 flex items-center justify-center rounded-md text-xs font-semibold transition-colors cursor-pointer ${
          isActive
            ? 'bg-[#0655a7] text-white shadow-none'
            : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
        }"
      >
        ${p}
      </button>
    `;
  }

  const nextDisabled = laporanCurrentPage >= totalPages;
  html += `
    <button
      type="button"
      onclick="goToLaporanPage(${laporanCurrentPage + 1})"
      ${nextDisabled ? 'disabled' : ''}
      class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-[#09090b] ${nextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f4f4f5] cursor-pointer'} transition-colors"
      title="Selanjutnya"
    >
      <i data-lucide="chevron-right" class="w-4 h-4"></i>
    </button>
    <select
      onchange="changeLaporanItemsPerPage(Number(this.value))"
      class="h-8 rounded-md border border-[#e4e4e7] bg-white px-2 text-xs text-[#09090b] focus:outline-none focus:ring-1 focus:ring-[#0655a7] cursor-pointer ml-1"
    >
      <option value="10" ${laporanItemsPerPage === 10 ? 'selected' : ''}>Show 10 items</option>
      <option value="25" ${laporanItemsPerPage === 25 ? 'selected' : ''}>Show 25 items</option>
      <option value="50" ${laporanItemsPerPage === 50 ? 'selected' : ''}>Show 50 items</option>
    </select>
  `;

  controls.innerHTML = html;
}

function changeLaporanItemsPerPage(newLimit) {
  laporanItemsPerPage = newLimit;
  laporanCurrentPage = 1;
  renderLaporanTable();
}

function goToLaporanPage(page) {
  const filtered = getFilteredLaporanData();
  const totalPages = Math.ceil(filtered.length / laporanItemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  laporanCurrentPage = page;
  renderLaporanTable();
}

// Note: Inisialisasi awal dipindahkan ke initApp() di akhir script agar seluruh data & controller terdefinisi aman.

// Logbook Subviews
function showLogbookDetail(nama, nim) {
  document.getElementById('subview-logbook-list').classList.add('hidden');
  const detail = document.getElementById('subview-logbook-detail');
  detail.classList.remove('hidden');
  document.getElementById('logbook-mhs-nama').textContent = nama;
  document.getElementById('logbook-mhs-nim').textContent = 'NIM: ' + nim;

  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.add('hidden');
}

function hideLogbookDetail() {
  const list = document.getElementById('subview-logbook-list');
  const detail = document.getElementById('subview-logbook-detail');
  if (list) list.classList.remove('hidden');
  if (detail) detail.classList.add('hidden');

  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.remove('hidden');
}

// ====================================================
// MODUL BAGIAN 2: CONTROLLER & MOCK DATA [Issue #18]
// ====================================================

// 1. COUNTDOWN TIMER SEMESTER AKTIF
let countdownTarget = new Date();
countdownTarget.setDate(countdownTarget.getDate() + 14);
countdownTarget.setHours(countdownTarget.getHours() + 8);
countdownTarget.setMinutes(countdownTarget.getMinutes() + 24);

function updateCountdownTimer() {
  const now = new Date();
  const diff = countdownTarget - now;
  if (diff <= 0) {
    const el1 = document.getElementById('dash-countdown-timer');
    const el2 = document.getElementById('periode-countdown');
    if (el1) el1.textContent = 'Pendaftaran Ditutup';
    if (el2) el2.textContent = 'Pendaftaran Ditutup';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = (n) => String(n).padStart(2, '0');
  const strShort = `${days}h ${pad(hours)}j ${pad(minutes)}m ${pad(seconds)}d`;
  const strLong = `${days} Hari ${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`;

  const el1 = document.getElementById('dash-countdown-timer');
  const el2 = document.getElementById('periode-countdown');
  if (el1) el1.textContent = strShort;
  if (el2) el2.textContent = strLong;
}
setInterval(updateCountdownTimer, 1000);
updateCountdownTimer();


let pengumumanSearchQuery = '';
let pengumumanFilterSasaran = 'semua';
let pengumumanFilterStatus = 'semua';
let pengumumanCurrentPage = 1;
const pengumumanItemsPerPage = 5;
let activeDeletePengumumanId = null;

function handleSearchPengumuman(query) {
  pengumumanSearchQuery = (query || '').toLowerCase().trim();
  pengumumanCurrentPage = 1;
  renderPengumumanCards();
}

function handleFilterPengumumanSasaran(val) {
  pengumumanFilterSasaran = val;
  pengumumanCurrentPage = 1;
  renderPengumumanCards();
}

function handleFilterPengumumanStatus(val) {
  pengumumanFilterStatus = val;
  pengumumanCurrentPage = 1;
  renderPengumumanCards();
}

function getFilteredPengumumanData() {
  return pengumumanListData.filter((item) => {
    const matchQuery =
      !pengumumanSearchQuery ||
      item.judul.toLowerCase().includes(pengumumanSearchQuery) ||
      item.isi.toLowerCase().includes(pengumumanSearchQuery) ||
      item.author.toLowerCase().includes(pengumumanSearchQuery);
    const matchSasaran =
      pengumumanFilterSasaran === 'semua' || item.sasaran === pengumumanFilterSasaran;
    const matchStatus =
      pengumumanFilterStatus === 'semua' || item.status === pengumumanFilterStatus;
    return matchQuery && matchSasaran && matchStatus;
  });
}

function renderPengumumanCards() {
  const container = document.getElementById('pengumuman-cards-container');
  const infoEl = document.getElementById('pengumuman-table-info');
  const paginationEl = document.getElementById('pengumuman-pagination-controls');
  if (!container) return;

  const filtered = getFilteredPengumumanData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pengumumanItemsPerPage) || 1;
  if (pengumumanCurrentPage > totalPages) pengumumanCurrentPage = totalPages;

  const startIndex = (pengumumanCurrentPage - 1) * pengumumanItemsPerPage;
  const endIndex = Math.min(startIndex + pengumumanItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    container.innerHTML = `
      <div class="rounded-xl border border-dashed border-[#e4e4e7] p-10 text-center bg-white flex flex-col items-center justify-center">
        <div class="h-12 w-12 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a] mb-3">
          <i data-lucide="megaphone" class="w-6 h-6"></i>
        </div>
        <h4 class="text-sm font-semibold text-[#09090b]">Tidak Ada Pengumuman Ditemukan</h4>
        <p class="text-xs text-[#71717a] mt-1 max-w-sm">Belum ada pengumuman yang sesuai dengan filter atau kata kunci pencarian Anda saat ini.</p>
      </div>
    `;
  } else {
    container.innerHTML = currentSlice
      .map((item) => {
        const statusBadges = {
          published: '<span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Dipublikasikan</span>',
          draft: '<span class="inline-flex items-center rounded-md border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-xs font-semibold text-yellow-800">Draf</span>',
          archived: '<span class="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">Diarsipkan</span>'
        };
        const badge = statusBadges[item.status] || statusBadges.published;

        return `
        <div class="rounded-xl border border-[#e4e4e7] bg-white text-[#09090b] overflow-hidden shadow-none hover:border-[#d4d4d8] transition-colors">
          <div class="p-5 pb-3 space-y-2">
            <div class="flex justify-between items-start gap-3">
              <h3 class="text-base sm:text-lg font-medium leading-snug flex-1 text-[#09090b] cursor-pointer hover:text-[#0655a7] transition-colors" onclick="showDetailPengumumanModal(${item.id})">${item.judul}</h3>
              <div class="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onclick="showBuatPengumumanModal(${item.id})"
                  class="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#71717a] hover:text-[#0655a7] hover:bg-[#f4f4f5] transition-colors"
                  title="Edit Pengumuman"
                >
                  <i data-lucide="pencil" class="w-4 h-4"></i>
                </button>
                <button
                  type="button"
                  onclick="toggleArchivePengumuman(${item.id})"
                  class="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
                  title="${item.status === 'archived' ? 'Publikasikan' : 'Arsipkan'}"
                >
                  <i data-lucide="${item.status === 'archived' ? 'archive-restore' : 'archive'}" class="w-4 h-4"></i>
                </button>
                <button
                  type="button"
                  onclick="showDeletePengumumanModal(${item.id})"
                  class="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Hapus Pengumuman"
                >
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <div class="text-xs sm:text-sm text-[#71717a] flex flex-wrap items-center gap-2 pt-0.5">
              ${item.pinned ? '<span class="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#0655a7]"><i data-lucide="pin" class="w-3 h-3"></i> Disematkan</span>' : ''}
              <div class="flex items-center gap-1.5">
                <i data-lucide="user" class="h-3.5 w-3.5 text-[#71717a]"></i>
                <span>${item.author}</span>
              </div>
              <span class="text-gray-300">|</span>
              <div class="flex items-center gap-1.5">
                <i data-lucide="calendar" class="h-3.5 w-3.5 text-[#71717a]"></i>
                <span>${item.tgl}</span>
              </div>
              <span class="text-gray-300">|</span>
              <div class="flex items-center gap-1.5">
                <i data-lucide="clock" class="h-3.5 w-3.5 text-[#71717a]"></i>
                <span>${item.jam || '09:00 WIB'}</span>
              </div>
              <span class="text-gray-300">|</span>
              ${badge}
              <span class="inline-flex items-center rounded-md border border-[#e4e4e7] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#71717a]">${item.sasaranLabel}</span>
            </div>
          </div>

          <div class="px-5 pb-3">
            <p class="text-sm text-[#71717a] leading-relaxed line-clamp-2">${item.isi}</p>
            ${item.file ? `
              <div class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#e4e4e7] bg-[#fafafa] text-xs text-[#0655a7] hover:bg-blue-50/50 cursor-pointer transition-colors" onclick="alert('Mengunduh lampiran resmi: ${item.file}')">
                <i data-lucide="file-text" class="w-3.5 h-3.5 text-[#0655a7]"></i>
                <span class="font-medium">${item.file}</span>
              </div>
            ` : ''}
          </div>

          <div class="px-5 py-3 border-t border-[#f4f4f5] flex justify-end">
            <button
              type="button"
              onclick="showDetailPengumumanModal(${item.id})"
              class="inline-flex items-center text-sm text-[#0655a7] font-medium hover:underline gap-1 group"
            >
              <span>Lihat Detail</span>
              <i data-lucide="chevron-right" class="w-4 h-4 transition-transform group-hover:translate-x-0.5"></i>
            </button>
          </div>
        </div>
        `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent = totalItems === 0
      ? 'Page 0 of 0 (0 total items)'
      : `Page ${pengumumanCurrentPage} of ${totalPages} (${totalItems} total items)`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToPengumumanPage(${pengumumanCurrentPage - 1})"
        ${pengumumanCurrentPage === 1 ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === pengumumanCurrentPage;
      html += `
        <button
          type="button"
          onclick="goToPengumumanPage(${p})"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${ isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]' }"
        >
          ${p}
        </button>
      `;
    }
    html += `
      <button
        type="button"
        onclick="goToPengumumanPage(${pengumumanCurrentPage + 1})"
        ${pengumumanCurrentPage === totalPages ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;
    paginationEl.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToPengumumanPage(p) {
  const totalPages = Math.ceil(getFilteredPengumumanData().length / pengumumanItemsPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  pengumumanCurrentPage = p;
  renderPengumumanCards();
}

function showDetailPengumumanModal(id) {
  const item = pengumumanListData.find((p) => p.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-detail-pengumuman');
  const pinnedBadge = document.getElementById('detail-pengumuman-badge-pinned');
  const judulEl = document.getElementById('detail-pengumuman-judul');
  const authorEl = document.getElementById('detail-pengumuman-author');
  const tglEl = document.getElementById('detail-pengumuman-tgl');
  const jamEl = document.getElementById('detail-pengumuman-jam');
  const statusEl = document.getElementById('detail-pengumuman-status');
  const sasaranEl = document.getElementById('detail-pengumuman-sasaran');
  const isiEl = document.getElementById('detail-pengumuman-isi');
  const fileWrapper = document.getElementById('detail-pengumuman-file-wrapper');
  const fileNameEl = document.getElementById('detail-pengumuman-file-name');
  const downloadBtn = document.getElementById('detail-pengumuman-download-btn');
  const editBtn = document.getElementById('detail-pengumuman-edit-btn');

  if (pinnedBadge) {
    if (item.pinned) pinnedBadge.classList.remove('hidden');
    else pinnedBadge.classList.add('hidden');
  }
  if (judulEl) judulEl.textContent = item.judul;
  if (authorEl) authorEl.textContent = item.author;
  if (tglEl) tglEl.textContent = item.tgl;
  if (jamEl) jamEl.textContent = item.jam || '09:00 WIB';
  if (isiEl) isiEl.textContent = item.isi;

  if (statusEl) {
    const statusBadges = {
      published: '<span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Dipublikasikan</span>',
      draft: '<span class="inline-flex items-center rounded-md border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-xs font-semibold text-yellow-800">Draf</span>',
      archived: '<span class="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">Diarsipkan</span>'
    };
    statusEl.innerHTML = statusBadges[item.status] || statusBadges.published;
  }

  if (sasaranEl) sasaranEl.textContent = item.sasaranLabel;

  if (fileWrapper && fileNameEl) {
    if (item.file) {
      fileWrapper.classList.remove('hidden');
      fileNameEl.textContent = item.file;
      if (downloadBtn) {
        downloadBtn.onclick = () => alert('Mengunduh lampiran resmi: ' + item.file);
      }
    } else {
      fileWrapper.classList.add('hidden');
    }
  }

  if (editBtn) {
    editBtn.onclick = () => {
      closeDetailPengumumanModal();
      showBuatPengumumanModal(item.id);
    };
  }

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeDetailPengumumanModal() {
  const modal = document.getElementById('modal-detail-pengumuman');
  if (modal) modal.classList.add('hidden');
}

function showBuatPengumumanModal(editId) {
  const modal = document.getElementById('modal-buat-pengumuman');
  const title = document.getElementById('modal-pengumuman-title');
  const idInput = document.getElementById('modal-pengumuman-id');
  const judulInput = document.getElementById('modal-pengumuman-judul');
  const sasaranInput = document.getElementById('modal-pengumuman-sasaran');
  const statusInput = document.getElementById('modal-pengumuman-status');
  const isiInput = document.getElementById('modal-pengumuman-isi');
  const fileInput = document.getElementById('modal-pengumuman-file');

  if (editId) {
    const item = pengumumanListData.find((p) => p.id === editId);
    if (item) {
      if (title) title.textContent = 'Edit Pengumuman';
      if (idInput) idInput.value = item.id;
      if (judulInput) judulInput.value = item.judul;
      if (sasaranInput) sasaranInput.value = item.sasaran;
      if (statusInput) statusInput.value = item.status;
      if (isiInput) isiInput.value = item.isi;
      if (fileInput) fileInput.value = item.file || '';
    }
  } else {
    if (title) title.textContent = 'Tambah Pengumuman';
    if (idInput) idInput.value = '';
    if (judulInput) judulInput.value = '';
    if (sasaranInput) sasaranInput.value = 'semua_mhs';
    if (statusInput) statusInput.value = 'published';
    if (isiInput) isiInput.value = '';
    if (fileInput) fileInput.value = '';
  }

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeBuatPengumumanModal() {
  const modal = document.getElementById('modal-buat-pengumuman');
  if (modal) modal.classList.add('hidden');
}

function handleSavePengumuman(e) {
  e.preventDefault();
  const idVal = document.getElementById('modal-pengumuman-id').value;
  const judul = document.getElementById('modal-pengumuman-judul').value.trim();
  const sasaran = document.getElementById('modal-pengumuman-sasaran').value;
  const status = document.getElementById('modal-pengumuman-status').value;
  const isi = document.getElementById('modal-pengumuman-isi').value.trim();
  const file = document.getElementById('modal-pengumuman-file').value.trim();

  const sasaranLabels = {
    semua_mhs: 'Semua Mahasiswa MBKM',
    kontributor_dospem: 'Kontributor & Dosen Pembimbing',
    magang: 'Peserta Magang Industri',
    studi_independen: 'Peserta Studi Independen'
  };

  if (idVal) {
    const idx = pengumumanListData.findIndex((p) => p.id === Number(idVal));
    if (idx !== -1) {
      pengumumanListData[idx] = {
        ...pengumumanListData[idx],
        judul,
        sasaran,
        sasaranLabel: sasaranLabels[sasaran] || sasaran,
        status,
        isi,
        file
      };
    }
    alert('Pengumuman berhasil diperbarui!');
  } else {
    const newId = pengumumanListData.length > 0 ? Math.max(...pengumumanListData.map((p) => p.id)) + 1 : 1;
    pengumumanListData.unshift({
      id: newId,
      judul,
      sasaran,
      sasaranLabel: sasaranLabels[sasaran] || sasaran,
      status,
      tgl: '12 Okt 2026',
      jam: '09:00 WIB',
      author: 'Nurul Anisa, M.Cs (Koordinator MBKM)',
      isi,
      file,
      pinned: false
    });
    alert('Pengumuman resmi berhasil diterbitkan ke civitas MBKM!');
  }

  closeBuatPengumumanModal();
  renderPengumumanCards();
}

function toggleArchivePengumuman(id) {
  const item = pengumumanListData.find((p) => p.id === id);
  if (item) {
    item.status = item.status === 'archived' ? 'published' : 'archived';
    alert(`Status pengumuman diubah menjadi: ${item.status === 'archived' ? 'Diarsipkan' : 'Dipublikasikan'}`);
    renderPengumumanCards();
  }
}

function showDeletePengumumanModal(id) {
  activeDeletePengumumanId = id;
  const modal = document.getElementById('modal-delete-pengumuman');
  const textEl = document.getElementById('modal-delete-pengumuman-text');
  const item = pengumumanListData.find((p) => p.id === id);
  if (textEl && item) {
    textEl.textContent = `Apakah Anda yakin ingin menghapus pengumuman "${item.judul}"?`;
  }
  const confirmBtn = document.getElementById('btn-confirm-delete-pengumuman');
  if (confirmBtn) {
    confirmBtn.onclick = confirmDeletePengumuman;
  }
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeDeletePengumumanModal() {
  const modal = document.getElementById('modal-delete-pengumuman');
  if (modal) modal.classList.add('hidden');
  activeDeletePengumumanId = null;
}

function confirmDeletePengumuman() {
  if (!activeDeletePengumumanId) return;
  pengumumanListData = pengumumanListData.filter((p) => p.id !== activeDeletePengumumanId);
  closeDeletePengumumanModal();
  alert('Pengumuman berhasil dihapus.');
  renderPengumumanCards();
}


let periodeCurrentPage = 1;
let periodePerPage = 10;
let periodeStatusFilter = 'all';
let activeEditPeriodeId = null;

function handleFilterPeriodeStatus(val) {
  periodeStatusFilter = val;
  periodeCurrentPage = 1;
  renderPeriodeData();
}

function handlePeriodePerPageChange(val) {
  periodePerPage = Number(val) || 10;
  periodeCurrentPage = 1;
  renderPeriodeData();
}

function getFilteredPeriodeData() {
  return periodeDataList.filter((p) => {
    if (periodeStatusFilter === 'all') return true;
    return p.status.toString() === periodeStatusFilter;
  });
}

function renderPeriodeData() {
  const tbody = document.getElementById('periode-table-tbody');
  const infoEl = document.getElementById('periode-table-info');
  const paginationEl = document.getElementById('periode-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredPeriodeData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / periodePerPage) || 1;
  if (periodeCurrentPage > totalPages) periodeCurrentPage = totalPages;

  const startIndex = (periodeCurrentPage - 1) * periodePerPage;
  const endIndex = Math.min(startIndex + periodePerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="py-8 text-center text-sm text-[#71717a]">
          Belum ada data periode yang sesuai filter.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item) => {
        const statusBadge = item.status === 1
          ? '<span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Aktif</span>'
          : '<span class="inline-flex items-center rounded-md border border-red-200 bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">Nonaktif</span>';

        return `
        <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
          <td class="px-4 text-sm font-medium text-[#09090b]">${item.kode}</td>
          <td class="px-4 text-sm text-[#09090b]">${item.tahun}</td>
          <td class="px-4 text-sm text-[#71717a]">${item.mulai}</td>
          <td class="px-4 text-sm text-[#71717a]">${item.akhir}</td>
          <td class="px-4 text-center">${statusBadge}</td>
          <td class="px-4 text-center">
            <button
              type="button"
              onclick="showEditPeriodeModal(${item.id})"
              class="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#09090b] hover:bg-[#f4f4f5] transition-colors"
              title="Edit Periode"
            >
              <i data-lucide="edit" class="size-4"></i>
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent = totalItems === 0
      ? 'Page 0 of 0 (0 total items)'
      : `Page ${periodeCurrentPage} of ${totalPages} (${totalItems} total items)`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToPeriodePage(${periodeCurrentPage - 1})"
        ${periodeCurrentPage === 1 ? 'disabled' : ''}
        class="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <i data-lucide="chevron-left" class="size-4"></i>
      </button>
    `;

    // Generate page buttons: 1 2 3 ... 9
    if (totalPages <= 5) {
      for (let p = 1; p <= totalPages; p++) {
        const isActive = p === periodeCurrentPage;
        html += `
          <button
            type="button"
            onclick="goToPeriodePage(${p})"
            class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
              isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
            }"
          >
            ${p}
          </button>
        `;
      }
    } else {
      // First page
      html += `
        <button
          type="button"
          onclick="goToPeriodePage(1)"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            periodeCurrentPage === 1 ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
          }"
        >
          1
        </button>
      `;

      if (periodeCurrentPage <= 3) {
        for (let p = 2; p <= 3; p++) {
          const isActive = p === periodeCurrentPage;
          html += `
            <button
              type="button"
              onclick="goToPeriodePage(${p})"
              class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
                isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
              }"
            >
              ${p}
            </button>
          `;
        }
        html += `<span class="px-1 text-[#71717a]">...</span>`;
      } else if (periodeCurrentPage >= totalPages - 2) {
        html += `<span class="px-1 text-[#71717a]">...</span>`;
        for (let p = totalPages - 2; p < totalPages; p++) {
          const isActive = p === periodeCurrentPage;
          html += `
            <button
              type="button"
              onclick="goToPeriodePage(${p})"
              class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
                isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
              }"
            >
              ${p}
            </button>
          `;
        }
      } else {
        html += `<span class="px-1 text-[#71717a]">...</span>`;
        html += `
          <button
            type="button"
            onclick="goToPeriodePage(${periodeCurrentPage})"
            class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md bg-[#0655a7] text-white transition-colors"
          >
            ${periodeCurrentPage}
          </button>
        `;
        html += `<span class="px-1 text-[#71717a]">...</span>`;
      }

      // Last page
      html += `
        <button
          type="button"
          onclick="goToPeriodePage(${totalPages})"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            periodeCurrentPage === totalPages ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
          }"
        >
          ${totalPages}
        </button>
      `;
    }

    html += `
      <button
        type="button"
        onclick="goToPeriodePage(${periodeCurrentPage + 1})"
        ${periodeCurrentPage === totalPages ? 'disabled' : ''}
        class="h-8 w-8 inline-flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <i data-lucide="chevron-right" class="size-4"></i>
      </button>
    `;
    paginationEl.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToPeriodePage(p) {
  const totalPages = Math.ceil(getFilteredPeriodeData().length / periodePerPage) || 1;
  if (p < 1 || p > totalPages) return;
  periodeCurrentPage = p;
  renderPeriodeData();
}

function handleSyncPeriodeData() {
  const btn = document.getElementById('btn-sync-periode');
  const icon = document.getElementById('icon-sync-periode');
  const text = document.getElementById('btn-sync-text');

  if (btn) btn.disabled = true;
  if (icon) icon.classList.add('animate-spin');
  if (text) text.textContent = 'Sinkronisasi...';

  setTimeout(() => {
    if (btn) btn.disabled = false;
    if (icon) icon.classList.remove('animate-spin');
    if (text) text.textContent = 'Sync Data';
    alert('Berhasil melakukan sinkronisasi data dengan SIADIN');
    renderPeriodeData();
  }, 800);
}

function showEditPeriodeModal(id) {
  const item = periodeDataList.find((p) => p.id === id);
  if (!item) return;

  activeEditPeriodeId = id;
  const modal = document.getElementById('modal-edit-periode');
  const sub = document.getElementById('modal-edit-periode-subtitle');
  if (sub) sub.textContent = `Update tanggal periode MBKM untuk ${item.tahun} (${item.kode})`;

  document.getElementById('modal-edit-periode-id').value = item.id;
  document.getElementById('modal-edit-periode-status').value = item.status;

  document.getElementById('modal-edit-periode-mulai').value = item.mulai && item.mulai !== '-' ? '2026-09-14' : '';
  document.getElementById('modal-edit-periode-akhir').value = item.akhir && item.akhir !== '-' ? '2026-10-01' : '';

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeEditPeriodeModal() {
  const modal = document.getElementById('modal-edit-periode');
  if (modal) modal.classList.add('hidden');
  activeEditPeriodeId = null;
}

function handleSaveEditPeriode(e) {
  e.preventDefault();
  const idVal = Number(document.getElementById('modal-edit-periode-id').value);
  const mulaiVal = document.getElementById('modal-edit-periode-mulai').value;
  const akhirVal = document.getElementById('modal-edit-periode-akhir').value;
  const statusVal = Number(document.getElementById('modal-edit-periode-status').value);

  if (mulaiVal && akhirVal && new Date(mulaiVal) >= new Date(akhirVal)) {
    alert('Tanggal mulai harus lebih awal dari tanggal akhir');
    return;
  }

  const item = periodeDataList.find((p) => p.id === idVal);
  if (item) {
    if (statusVal === 1) {
      periodeDataList.forEach((p) => (p.status = 0));
      item.status = 1;
    } else {
      item.status = 0;
    }

    if (mulaiVal) {
      const d = new Date(mulaiVal);
      item.mulai = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    } else {
      item.mulai = '-';
    }

    if (akhirVal) {
      const d = new Date(akhirVal);
      item.akhir = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    } else {
      item.akhir = '-';
    }

    alert(`Periode ${item.tahun} (${item.kode}) berhasil diperbarui!`);
    closeEditPeriodeModal();
    renderPeriodeData();
  }
}


function switchFormTab(tabId) {
  if (tabId === 'akademik') tabId = 'identitas';
  if (tabId === 'berkas') tabId = 'dokumen';
  if (tabId === 'konversi' || tabId === 'surekom') tabId = 'persetujuan';

  formPendaftaranConfig.activeTab = tabId;
  const tabs = ['identitas', 'dokumen', 'persetujuan', 'akademik', 'berkas', 'konversi', 'surekom'];

  tabs.forEach((t) => {
    const btn = document.getElementById('btn-form-tab-' + t);
    const content = document.getElementById('form-tab-content-' + t);

    if (t === tabId) {
      if (btn) {
        btn.className =
          'form-tab-btn inline-flex items-center px-5 py-3 text-sm font-semibold border-b-2 border-primary-600 text-primary-700 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'true');
      }
      if (content) content.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className =
          'form-tab-btn inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'false');
      }
      if (content) content.classList.add('hidden');
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderFormPendaftaranUI() {
  // Render Ambang Batas Akademik
  const ipkEl = document.getElementById('cfg-ipk-min');
  if (ipkEl) ipkEl.value = formPendaftaranConfig.ipkMin.toFixed(2);

  const sksEl = document.getElementById('cfg-sks-min');
  if (sksEl) sksEl.value = formPendaftaranConfig.sksMin;

  const semEl = document.getElementById('cfg-semester-min');
  if (semEl) semEl.value = formPendaftaranConfig.semesterMin;

  // Render Toggles
  updateFormToggleVisual('bebasSanksi', formPendaftaranConfig.bebasSanksi);
  updateFormToggleVisual('terdaftarAktif', formPendaftaranConfig.terdaftarAktif);
  updateFormToggleVisual('singleApp', formPendaftaranConfig.singleApp);
  updateFormToggleVisual('wajibDrafMk', formPendaftaranConfig.wajibDrafMk);
  updateFormToggleVisual('paktaIntegritas', formPendaftaranConfig.paktaIntegritas);
  updateFormToggleVisual('ttdDigital', formPendaftaranConfig.ttdDigital);

  // Render Dokumen Mandatori
  ['cv', 'portofolio', 'transkrip', 'izin'].forEach((k) => {
    const d = formPendaftaranConfig.docs[k];
    if (!d) return;
    const toggleBtn = document.getElementById('toggle-doc-' + k);
    if (toggleBtn) {
      toggleBtn.className =
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
        (d.active ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
      const span = toggleBtn.querySelector('span');
      if (span) {
        span.className =
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
          (d.active ? 'translate-x-5' : 'translate-x-0');
      }
    }

    const badge = document.getElementById('badge-req-' + k);
    const btnReq = document.getElementById('btn-toggle-req-' + k);
    if (badge && btnReq) {
      if (d.required) {
        badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200';
        badge.textContent = k === 'portofolio' ? 'Wajib Diisi' : 'Wajib Diunggah';
        btnReq.textContent = 'Ubah ke Opsional';
      } else {
        badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200';
        badge.textContent = 'Opsional';
        btnReq.textContent = 'Ubah ke Wajib';
      }
    }
  });

  // Render Konversi SKS
  const maxSksEl = document.getElementById('cfg-konversi-sks-max');
  if (maxSksEl) maxSksEl.value = formPendaftaranConfig.konversiSksMax;

  const durasiEl = document.getElementById('cfg-durasi-minimal');
  if (durasiEl) durasiEl.value = formPendaftaranConfig.durasiMinimal;

  // Render SuReKom
  const surekomTpl = document.getElementById('cfg-surekom-template');
  if (surekomTpl) surekomTpl.value = formPendaftaranConfig.surekomTemplate;

  const surekomCutoff = document.getElementById('cfg-surekom-cutoff');
  if (surekomCutoff) surekomCutoff.value = formPendaftaranConfig.surekomCutoff;

  // Render Custom Fields List
  renderCustomFieldsContainer();

  if (window.lucide) window.lucide.createIcons();
}

function updateFormToggleVisual(key, state) {
  const btn = document.getElementById('toggle-cfg-' + key);
  if (!btn) return;
  btn.className =
    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
    (state ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
  const thumb = btn.querySelector('span');
  if (thumb) {
    thumb.className =
      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
      (state ? 'translate-x-5' : 'translate-x-0');
  }
}

function toggleFormSetting(key) {
  formPendaftaranConfig[key] = !formPendaftaranConfig[key];
  updateFormToggleVisual(key, formPendaftaranConfig[key]);
  triggerAutosave(key, formPendaftaranConfig[key]);
}

function toggleDocActive(k) {
  if (!formPendaftaranConfig.docs[k]) return;
  formPendaftaranConfig.docs[k].active = !formPendaftaranConfig.docs[k].active;
  const btn = document.getElementById('toggle-doc-' + k);
  if (btn) {
    const isActive = formPendaftaranConfig.docs[k].active;
    btn.className =
      'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
      (isActive ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
    const span = btn.querySelector('span');
    if (span) {
      span.className =
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
        (isActive ? 'translate-x-5' : 'translate-x-0');
    }
  }
  triggerAutosave('doc_' + k, formPendaftaranConfig.docs[k].active);
}

function toggleDocRequired(k) {
  if (!formPendaftaranConfig.docs[k]) return;
  formPendaftaranConfig.docs[k].required = !formPendaftaranConfig.docs[k].required;
  const isReq = formPendaftaranConfig.docs[k].required;

  const badge = document.getElementById('badge-req-' + k);
  const btnReq = document.getElementById('btn-toggle-req-' + k);
  if (badge && btnReq) {
    if (isReq) {
      badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200';
      badge.textContent = k === 'portofolio' ? 'Wajib Diisi' : 'Wajib Diunggah';
      btnReq.textContent = 'Ubah ke Opsional';
    } else {
      badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200';
      badge.textContent = 'Opsional';
      btnReq.textContent = 'Ubah ke Wajib';
    }
  }
  triggerAutosave('doc_req_' + k, isReq);
}

function triggerAutosave(key, val) {
  if (key && val !== undefined) {
    if (key === 'ipkMin') formPendaftaranConfig.ipkMin = parseFloat(val) || 3.0;
    else if (key === 'sksMin') formPendaftaranConfig.sksMin = parseInt(val, 10) || 80;
    else if (key === 'semesterMin') formPendaftaranConfig.semesterMin = parseInt(val, 10) || 5;
    else if (key === 'konversiSksMax') formPendaftaranConfig.konversiSksMax = parseInt(val, 10) || 20;
    else if (key === 'durasiMinimal') formPendaftaranConfig.durasiMinimal = parseInt(val, 10) || 5;
    else if (key === 'surekomTemplate') formPendaftaranConfig.surekomTemplate = val;
    else if (key === 'surekomCutoff') formPendaftaranConfig.surekomCutoff = val;
  }
}

function renderCustomFieldsContainer() {
  const container = document.getElementById('custom-fields-container');
  if (!container) return;

  if (formPendaftaranConfig.customFields.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-lg border border-dashed border-[#e4e4e7] bg-[#fafafa]">
        <i data-lucide="help-circle" class="w-8 h-8 mx-auto text-[#71717a] mb-2 opacity-50"></i>
        <p class="text-xs font-medium text-[#09090b]">Belum ada pertanyaan atau field kustom</p>
        <p class="text-[11px] text-[#71717a] mt-0.5">Klik tombol di kanan atas untuk menambahkan pertanyaan kustom bagi calon peserta MBKM.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const typeLabels = {
    text: { label: 'Teks Singkat', icon: 'type', bg: 'bg-blue-50 text-[#0655a7]' },
    textarea: { label: 'Esai / Paragraf', icon: 'align-left', bg: 'bg-indigo-50 text-indigo-700' },
    url: { label: 'Tautan Web / URL', icon: 'link', bg: 'bg-purple-50 text-purple-700' },
    file: { label: 'Unggah Berkas PDF', icon: 'file-up', bg: 'bg-amber-50 text-amber-700' },
    select: { label: 'Pilihan Dropdown', icon: 'list', bg: 'bg-emerald-50 text-emerald-700' },
  };

  container.innerHTML = formPendaftaranConfig.customFields
    .map((cf) => {
      const tInfo = typeLabels[cf.type] || { label: cf.type, icon: 'help-circle', bg: 'bg-gray-100 text-gray-700' };
      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-[#e4e4e7] bg-[#fafafa] hover:border-[#0655a7]/40 transition-colors gap-3">
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-md ${tInfo.bg} flex items-center justify-center shrink-0 border border-black/5">
              <i data-lucide="${tInfo.icon}" class="w-3.5 h-3.5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#09090b]">${cf.label}</span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${cf.required ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                  ${cf.required ? 'Wajib' : 'Opsional'}
                </span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${tInfo.bg}">
                  ${tInfo.label}
                </span>
              </div>
              <p class="text-[11px] text-[#71717a] mt-0.5">${cf.placeholder || 'Tanpa petunjuk isian'}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onclick="hapusCustomField('${cf.id}')"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent transition-colors"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Hapus</span>
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

function showTambahCustomFieldModal() {
  const form = document.getElementById('form-tambah-custom-field');
  if (form) form.reset();
  const modal = document.getElementById('modal-tambah-custom-field');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTambahCustomFieldModal() {
  const modal = document.getElementById('modal-tambah-custom-field');
  if (modal) modal.classList.add('hidden');
}

function handleSimpanCustomField(e) {
  e.preventDefault();
  const label = document.getElementById('input-cf-label').value.trim();
  const type = document.getElementById('select-cf-type').value;
  const placeholder = document.getElementById('input-cf-placeholder').value.trim();
  const required = document.getElementById('checkbox-cf-required').checked;

  if (!label) {
    alert('Label pertanyaan wajib diisi');
    return;
  }

  const newId = 'cf-' + Date.now();
  formPendaftaranConfig.customFields.push({
    id: newId,
    label,
    type,
    placeholder,
    required,
  });

  closeTambahCustomFieldModal();
  renderCustomFieldsContainer();
  triggerAutosave('customFields', formPendaftaranConfig.customFields);
}

function hapusCustomField(id) {
  formPendaftaranConfig.customFields = formPendaftaranConfig.customFields.filter((cf) => cf.id !== id);
  renderCustomFieldsContainer();
  triggerAutosave('customFields', formPendaftaranConfig.customFields);
}

function insertSurekomTag(tag) {
  const el = document.getElementById('cfg-surekom-template');
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = el.value;
  el.value = text.substring(0, start) + tag + text.substring(end);
  el.focus();
  el.selectionStart = el.selectionEnd = start + tag.length;
  triggerAutosave('surekomTemplate', el.value);
}

function resetSurekomTemplate() {
  const defaultTpl =
    'Dengan ini Koordinator MBKM Fakultas Ilmu Komputer Universitas Dian Nuswantoro menerangkan bahwa mahasiswa yang bersangkutan:\n\nNama: {nama_mahasiswa}\nNIM: {nim}\nProgram Studi: {program_studi}\nIPK: {ipk} ({sks_lulus} SKS)\n\nTelah memenuhi seluruh persyaratan akademik dan dinyatakan LAYAK serta DIREKOMENDASIKAN untuk mengikuti seleksi program MBKM pada instansi {nama_kontributor} untuk periode {semester_ajaran}.';
  const el = document.getElementById('cfg-surekom-template');
  if (el) el.value = defaultTpl;
  triggerAutosave('surekomTemplate', defaultTpl);
}

function openPreviewMahasiswaModal() {
  const modal = document.getElementById('modal-preview-pendaftaran-mhs');
  if (!modal) return;

  // Step 1: Syarat Akademik
  const pIpk = document.getElementById('prev-val-ipk');
  if (pIpk) pIpk.textContent = formPendaftaranConfig.ipkMin.toFixed(2);
  const pSks = document.getElementById('prev-val-sks');
  if (pSks) pSks.textContent = formPendaftaranConfig.sksMin;
  const pSem = document.getElementById('prev-val-sem');
  if (pSem) pSem.textContent = formPendaftaranConfig.semesterMin;

  // Step 2: Dokumen Mandatori
  const docsContainer = document.getElementById('preview-docs-container');
  if (docsContainer) {
    const docKeys = Object.keys(formPendaftaranConfig.docs);
    docsContainer.innerHTML = docKeys
      .filter((k) => formPendaftaranConfig.docs[k].active)
      .map((k) => {
        const d = formPendaftaranConfig.docs[k];
        return `
          <div class="p-3.5 rounded-lg border border-[#e4e4e7] bg-[#fafafa] space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#09090b]">${d.label}</span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${d.required ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600'}">
                  ${d.required ? 'Wajib Diisi' : 'Opsional'}
                </span>
              </div>
              <span class="text-[11px] text-[#71717a]">${d.format}</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" placeholder="${k === 'portofolio' ? 'Tempel tautan Google Drive / Portofolio di sini...' : 'Pilih berkas PDF untuk diunggah...'}" class="h-8 flex-1 rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none" />
              <button type="button" class="h-8 px-3 rounded border border-[#e4e4e7] bg-white hover:bg-black/5 text-xs text-[#09090b]">Pilih File</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // Step 2: Custom Fields
  const cfContainer = document.getElementById('preview-custom-fields-container');
  if (cfContainer) {
    if (formPendaftaranConfig.customFields.length === 0) {
      cfContainer.innerHTML = `
        <p class="text-xs text-[#71717a] italic">Tidak ada pertanyaan tambahan dari Koordinator.</p>
      `;
    } else {
      cfContainer.innerHTML = formPendaftaranConfig.customFields
        .map((cf) => {
          let inputHtml = '';
          if (cf.type === 'textarea') {
            inputHtml = `<textarea rows="2" placeholder="${cf.placeholder || ''}" class="w-full rounded border border-[#e4e4e7] bg-white p-2 text-xs focus:outline-none"></textarea>`;
          } else if (cf.type === 'select') {
            inputHtml = `
              <select class="h-8 w-full rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none">
                <option value="">Pilih opsi...</option>
                <option value="1">Pilihan 1 (Kategori Standar)</option>
                <option value="2">Pilihan 2 (Kategori Khusus)</option>
              </select>
            `;
          } else {
            inputHtml = `<input type="${cf.type === 'url' ? 'url' : 'text'}" placeholder="${cf.placeholder || ''}" class="h-8 w-full rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none" />`;
          }

          return `
            <div class="space-y-1.5 p-3 rounded-lg border border-[#e4e4e7] bg-[#fafafa]">
              <div class="flex items-center justify-between">
                <label class="text-xs font-medium text-[#09090b]">${cf.label}</label>
                <span class="text-[10px] font-medium text-[#71717a]">${cf.required ? 'Wajib *' : 'Opsional'}</span>
              </div>
              ${inputHtml}
            </div>
          `;
        })
        .join('');
    }
  }

  // Step 3: SuReKom Text Simulation
  const surekomEl = document.getElementById('preview-surekom-text');
  if (surekomEl) {
    let text = formPendaftaranConfig.surekomTemplate || '';
    text = text
      .replace(/{nama_mahasiswa}/g, 'Ahmad Rizky Pratama')
      .replace(/{nim}/g, 'A11.2022.14253')
      .replace(/{program_studi}/g, 'S1 Teknik Informatika')
      .replace(/{ipk}/g, '3.68')
      .replace(/{sks_lulus}/g, '112')
      .replace(/{nama_kontributor}/g, 'PT. Presentologics (Dicoding Indonesia)')
      .replace(/{semester_ajaran}/g, 'Semester Gasal 2026/2027');
    surekomEl.textContent = text;
  }

  switchPreviewStep(1);
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closePreviewMahasiswaModal() {
  const modal = document.getElementById('modal-preview-pendaftaran-mhs');
  if (modal) modal.classList.add('hidden');
}

function switchPreviewStep(step) {
  [1, 2, 3].forEach((s) => {
    const btn = document.getElementById('btn-preview-step-1');
    const btn2 = document.getElementById('btn-preview-step-2');
    const btn3 = document.getElementById('btn-preview-step-3');
    const content = document.getElementById('preview-step-content-' + s);

    if (s === step) {
      if (content) content.classList.remove('hidden');
    } else {
      if (content) content.classList.add('hidden');
    }
  });

  const b1 = document.getElementById('btn-preview-step-1');
  const b2 = document.getElementById('btn-preview-step-2');
  const b3 = document.getElementById('btn-preview-step-3');
  if (b1) b1.className = step === 1 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';
  if (b2) b2.className = step === 2 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';
  if (b3) b3.className = step === 3 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';

  if (window.lucide) window.lucide.createIcons();
}

// 4. MODUL KONTRIBUTOR (REVISI TABEL & HERO CARD DETAIL KONTRIBUTOR + ADAPTIVE TABS)
let kontributorCategoryTab = 'internal'; // 'internal' | 'eksternal'
let modalKontributorType = 'internal';
let activeDetailKontributorId = null;



let kontributorSearchQuery = '';
let kontributorCurrentPage = 1;
const kontributorItemsPerPage = 10;
let modalKontributorActiveTab = 'manual';

function handleSearchKontributor(val) {
  kontributorSearchQuery = (val || '').toLowerCase().trim();
  kontributorCurrentPage = 1;
  renderKontributorTable();
}

function switchKontributorCategoryTab(cat) {
  kontributorCategoryTab = cat;
  kontributorCurrentPage = 1;
  const btnInt = document.getElementById('btn-tab-kontributor-internal');
  const btnEks = document.getElementById('btn-tab-kontributor-eksternal');
  const thAkunPic = document.getElementById('th-kontributor-akun-pic');

  if (cat === 'internal') {
    if (btnInt) btnInt.className = 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors';
    if (btnEks) btnEks.className = 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors';
    if (thAkunPic) thAkunPic.textContent = 'Akun';
  } else {
    if (btnEks) btnEks.className = 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors';
    if (btnInt) btnInt.className = 'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors';
    if (thAkunPic) thAkunPic.textContent = 'Penanggung Jawab';
  }
  renderKontributorTable();
}

function updateKontributorCategoryBadges() {
  const countInt = kontributorListData.filter(m => m.tipe === 'internal').length;
  const countEks = kontributorListData.filter(m => m.tipe === 'eksternal').length;
  const badgeInt = document.getElementById('badge-count-kontributor-internal');
  const badgeEks = document.getElementById('badge-count-kontributor-eksternal');
  if (badgeInt) badgeInt.textContent = countInt;
  if (badgeEks) badgeEks.textContent = countEks;
}

function getFilteredKontributorData() {
  return kontributorListData.filter((m) => {
    const matchCategory = m.tipe === kontributorCategoryTab;
    const matchQuery =
      !kontributorSearchQuery ||
      m.nama.toLowerCase().includes(kontributorSearchQuery) ||
      (m.deskripsi && m.deskripsi.toLowerCase().includes(kontributorSearchQuery)) ||
      (m.sektor && m.sektor.toLowerCase().includes(kontributorSearchQuery)) ||
      (m.picNama && m.picNama.toLowerCase().includes(kontributorSearchQuery)) ||
      (m.picEmail && m.picEmail.toLowerCase().includes(kontributorSearchQuery));
    return matchCategory && matchQuery;
  });
}

function renderKontributorTable() {
  const tbody = document.getElementById('kontributor-table-tbody');
  const infoEl = document.getElementById('kontributor-table-info');
  const paginationEl = document.getElementById('kontributor-pagination-controls');
  if (!tbody) return;

  updateKontributorCategoryBadges();

  const filtered = getFilteredKontributorData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / kontributorItemsPerPage) || 1;
  if (kontributorCurrentPage > totalPages) kontributorCurrentPage = totalPages;

  const startIndex = (kontributorCurrentPage - 1) * kontributorItemsPerPage;
  const endIndex = Math.min(startIndex + kontributorItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-8 text-center text-sm text-[#71717a]">
          Tidak ada data kontributor ${kontributorCategoryTab === 'internal' ? 'internal' : 'eksternal'} yang cocok dengan kriteria pencarian.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const totalDosen = item.dosen ? item.dosen.length : 0;
        const totalMhs = item.mhs ? item.mhs.length : 0;
        const isAktif = item.status === 'aktif';

        // Kolom ke-3: Internal = Akun (Email & Nama), Eksternal = Nama Penanggung Jawab Saja (TANPA EMAIL)
        const cellAkunOrPic = item.tipe === 'internal'
          ? `
            <div class="font-medium text-[#09090b] text-sm">${item.picEmail}</div>
            <div class="text-xs text-[#71717a] mt-0.5">${item.picNama}</div>
          `
          : `
            <div class="font-medium text-[#09090b] text-sm">${item.picNama}</div>
            <div class="text-xs text-[#71717a] mt-0.5">${item.sektor || 'Instansi Kontributor'}</div>
          `;

        return `
        <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
          <td class="px-3 text-center text-[#71717a] text-xs">${rowNum}</td>
          <td class="px-4 py-2.5">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-lg border border-[#e4e4e7] bg-muted/60 text-[#09090b] font-semibold text-xs flex items-center justify-center shrink-0">
                ${item.avatar}
              </div>
              <div>
                <div class="font-medium text-[#09090b] text-sm">${item.nama}</div>
                <div class="text-xs text-[#71717a] line-clamp-1 max-w-md">${item.deskripsi || item.sektor}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-2.5">
            ${cellAkunOrPic}
          </td>
          <td class="px-4 text-center text-sm font-medium text-[#09090b]">
            ${totalDosen}
          </td>
          <td class="px-4 text-center text-sm font-medium text-[#09090b]">
            ${totalMhs}
          </td>
          <td class="px-4 text-center">
            ${isAktif ? `
              <span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#BBF7D0] bg-[#DCFCE7] text-[13px] font-medium text-[#15803D]">
                Aktif
              </span>
            ` : `
              <span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FECDD3] bg-[#FFE4E6] text-[13px] font-medium text-[#BE123C]">
                Non-Aktif
              </span>
            `}
          </td>
          <td class="px-4 text-center">
            <button
              type="button"
              onclick="showKontributorDetail(${item.id})"
              class="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"
              title="Lihat Detail"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5 text-[#71717a]"></i>
              <span>Detail</span>
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent = totalItems === 0
      ? 'Page 0 of 0 (0 total items)'
      : `Page ${kontributorCurrentPage} of ${totalPages} (${totalItems} total items)`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToKontributorPage(${kontributorCurrentPage - 1})"
        ${kontributorCurrentPage === 1 ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === kontributorCurrentPage;
      html += `
        <button
          type="button"
          onclick="goToKontributorPage(${p})"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${ isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]' }"
        >
          ${p}
        </button>
      `;
    }
    html += `
      <button
        type="button"
        onclick="goToKontributorPage(${kontributorCurrentPage + 1})"
        ${kontributorCurrentPage === totalPages ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;
    paginationEl.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToKontributorPage(p) {
  const totalPages = Math.ceil(getFilteredKontributorData().length / kontributorItemsPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  kontributorCurrentPage = p;
  renderKontributorTable();
}

function toggleKontributorStatus(id) {
  const item = kontributorListData.find((m) => m.id === id);
  if (!item) return;
  item.status = item.status === 'aktif' ? 'nonaktif' : 'aktif';
  renderKontributorTable();
}

// ====================================================
// Modal Konfirmasi Ubah Status Kontributor
// ====================================================
let pendingToggleKontributorId = null;

function openModalToggleStatusKontributor(id) {
  const item = kontributorListData.find((m) => m.id === id);
  if (!item) return;

  const isAktif = item.status === 'aktif';
  const totalDosen = item.dosen ? item.dosen.length : 0;
  const totalMhs = item.mhs ? item.mhs.length : 0;

  pendingToggleKontributorId = id;

  const modal = document.getElementById('modal-toggle-status-kontributor');
  const iconEl = document.getElementById('modal-toggle-status-icon');
  const titleEl = document.getElementById('modal-toggle-status-title');
  const subtitleEl = document.getElementById('modal-toggle-status-subtitle');
  const namaEl = document.getElementById('modal-toggle-status-nama');
  const detailEl = document.getElementById('modal-toggle-status-detail');
  const warningEl = document.getElementById('modal-toggle-status-warning');
  const confirmBtn = document.getElementById('modal-toggle-status-confirm');

  if (iconEl) {
    iconEl.className = isAktif
      ? 'h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-rose-50 text-[#BE123C]'
      : 'h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-50 text-[#15803D]';
    iconEl.innerHTML = isAktif
      ? '<i data-lucide="alert-triangle" class="w-5 h-5"></i>'
      : '<i data-lucide="check-circle-2" class="w-5 h-5"></i>';
  }

  if (titleEl) titleEl.textContent = isAktif ? 'Nonaktifkan Kontributor?' : 'Aktifkan Kontributor?';
  if (subtitleEl) subtitleEl.textContent = isAktif
    ? 'Tindakan ini akan membekukan seluruh aktivitas kontributor.'
    : 'Aktivitas kontributor akan dijalankan kembali.';

  if (namaEl) namaEl.textContent = item.nama;
  if (detailEl) detailEl.textContent = `${totalDosen} dosen binaan · ${totalMhs} mahasiswa aktif · ${item.sektor || '-'}`;

  if (warningEl) warningEl.textContent = isAktif
    ? 'Seluruh program, lowongan, dan akses mahasiswa binaan akan dibekukan sementara. Data tidak dihapus dan dapat diaktifkan kembali kapan saja.'
    : 'Seluruh program, lowongan, dan akses mahasiswa binaan akan aktif kembali setelah konfirmasi.';

  if (confirmBtn) {
    confirmBtn.textContent = isAktif ? 'Ya, Nonaktifkan' : 'Ya, Aktifkan';
    confirmBtn.className = isAktif
      ? 'h-9 px-4 rounded-lg bg-[#BE123C] hover:bg-[#9F1239] text-white text-xs font-semibold shadow-none transition-colors cursor-pointer'
      : 'h-9 px-4 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold shadow-none transition-colors cursor-pointer';
  }

  if (modal) {
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeModalToggleStatusKontributor() {
  pendingToggleKontributorId = null;
  const modal = document.getElementById('modal-toggle-status-kontributor');
  if (modal) modal.classList.add('hidden');
}

function confirmToggleStatusKontributor() {
  if (pendingToggleKontributorId === null) return;
  const id = pendingToggleKontributorId;
  pendingToggleKontributorId = null;

  const modal = document.getElementById('modal-toggle-status-kontributor');
  if (modal) modal.classList.add('hidden');

  // Sinkronkan data mock (jika tabel dirender via controller legacy)
  const item = kontributorListData.find((m) => m.id === id);
  const nowAktif = item ? item.status !== 'aktif' : true;
  if (item) item.status = nowAktif ? 'aktif' : 'nonaktif';

  // Update Alpine state (tabel Astro statis)
  const root = document.getElementById('subview-kontributor-list');
  if (root && window.Alpine) {
    const data = window.Alpine.$data(root);
    if (data && typeof data.setStatus === 'function') {
      data.setStatus(id, nowAktif);
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

// Controller Modal Tambah Kontributor (YAGNI & Clean Handler)
function showTambahKontributorModal(type = 'eksternal') {
  const modal = document.getElementById('modal-tambah-kontributor');
  if (!modal) return;

  // Reset input fields
  const iNama = document.getElementById('modal-internal-nama');
  const iPicNama = document.getElementById('modal-internal-pic-nama');
  const iPicEmail = document.getElementById('modal-internal-pic-email');
  const iPass = document.getElementById('modal-internal-password');
  const iDesk = document.getElementById('modal-internal-deskripsi');
  if (iNama) iNama.value = '';
  if (iPicNama) iPicNama.value = '';
  if (iPicEmail) iPicEmail.value = '';
  if (iPass) iPass.value = '';
  if (iDesk) iDesk.value = '';

  const eNama = document.getElementById('modal-eksternal-nama');
  const ePicNama = document.getElementById('modal-eksternal-pic-nama');
  const eDesk = document.getElementById('modal-eksternal-deskripsi');
  if (eNama) eNama.value = '';
  if (ePicNama) ePicNama.value = '';
  if (eDesk) eDesk.value = '';

  // Sesuaikan tipe kontributor
  modalKontributorType = (type === 'internal') ? 'internal' : 'eksternal';

  const titleEl = document.getElementById('modal-kontributor-title');
  if (titleEl) {
    titleEl.textContent = modalKontributorType === 'internal' ? 'Tambah Kontributor Internal' : 'Tambah Kontributor Eksternal';
  }

  handleModalKontributorTypeChange(modalKontributorType);

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTambahKontributorModal() {
  const modal = document.getElementById('modal-tambah-kontributor');
  if (modal) modal.classList.add('hidden');
}

function handleModalKontributorTypeChange(type) {
  modalKontributorType = type;
  const formInt = document.getElementById('modal-form-kontributor-internal');
  const formEks = document.getElementById('modal-form-kontributor-eksternal');

  if (type === 'internal') {
    if (formInt) formInt.classList.remove('hidden');
    if (formEks) formEks.classList.add('hidden');
  } else {
    if (formInt) formInt.classList.add('hidden');
    if (formEks) formEks.classList.remove('hidden');
  }
  if (window.lucide) window.lucide.createIcons();
}

function handleSubmitTambahKontributor() {
  if (modalKontributorType === 'internal') {
    const nama = document.getElementById('modal-internal-nama')?.value.trim();
    const picNama = document.getElementById('modal-internal-pic-nama')?.value.trim();
    const picEmail = document.getElementById('modal-internal-pic-email')?.value.trim();
    const deskripsi = document.getElementById('modal-internal-deskripsi')?.value.trim();

    if (!nama) {
      alert('Mohon masukkan Nama Kontributor!');
      document.getElementById('modal-internal-nama')?.focus();
      return;
    }
    if (!picNama) {
      alert('Mohon masukkan Nama Penanggung Jawab!');
      document.getElementById('modal-internal-pic-nama')?.focus();
      return;
    }
    if (!picEmail) {
      alert('Mohon masukkan Email Akun!');
      document.getElementById('modal-internal-pic-email')?.focus();
      return;
    }

    const newId = kontributorListData.length > 0 ? Math.max(...kontributorListData.map(m => m.id)) + 1 : 1;
    const avatar = nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'MI';

    kontributorListData.unshift({
      id: newId,
      nama,
      tipe: 'internal',
      deskripsi: deskripsi || 'Kontributor industri internal binaan FIK.',
      sektor: 'Teknologi Informasi & Software',
      picNama,
      picEmail,
      picPhone: '',
      role: 'mbkm_contributor',
      status: 'aktif',
      mou: `0${newId + 40}/MoU/FIK-UDINUS/2026`,
      alamat: 'Semarang, Jawa Tengah',
      avatar,
      programs: [],
      dosen: [],
      mhs: []
    });

    closeTambahKontributorModal();
    alert(`Kontributor Internal "${nama}" berhasil ditambahkan!`);
    switchKontributorCategoryTab('internal');
  } else {
    const nama = document.getElementById('modal-eksternal-nama')?.value.trim();
    const picNama = document.getElementById('modal-eksternal-pic-nama')?.value.trim();
    const deskripsi = document.getElementById('modal-eksternal-deskripsi')?.value.trim();

    if (!nama) {
      alert('Mohon masukkan Nama Kontributor / Instansi!');
      document.getElementById('modal-eksternal-nama')?.focus();
      return;
    }

    const newId = kontributorListData.length > 0 ? Math.max(...kontributorListData.map(m => m.id)) + 1 : 1;
    const avatar = nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'ME';

    kontributorListData.unshift({
      id: newId,
      nama,
      tipe: 'eksternal',
      deskripsi: deskripsi || 'Kontributor industri eksternal program nasional / mandiri.',
      sektor: 'Industri & Bisnis Luar',
      picNama: picNama || '-',
      picEmail: '',
      picPhone: '',
      role: 'external_partner',
      status: 'aktif',
      mou: `0${newId + 60}/MoU/FIK-UDINUS/2026`,
      alamat: 'Instansi Luar Kampus',
      avatar,
      programs: [],
      dosen: [],
      mhs: []
    });

    closeTambahKontributorModal();
    alert(`Kontributor Eksternal "${nama}" berhasil ditambahkan!`);
    switchKontributorCategoryTab('eksternal');
  }
}

// Legacy handler alias
function handleSaveKontributor(e) {
  if (e) e.preventDefault();
  handleSubmitTambahKontributor();
}

// ====================================================
// CONTROLLER DETAIL KONTRIBUTOR (HERO CARD + 3 MINI KPI + ADAPTIVE TABS)
// ====================================================
let activeDetailKontributorTabPane = 1;

function showKontributorDetail(id) {
  const item = kontributorListData.find((m) => m.id === id);
  if (!item) return;

  activeDetailKontributorId = id;
  document.getElementById('subview-kontributor-list').classList.add('hidden');
  const detailView = document.getElementById('subview-kontributor-detail');
  detailView.classList.remove('hidden');

  // Sembunyikan Header Baris 2 Direktori & Tombol Tambah Kontributor
  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.add('hidden');

  updateBreadcrumb(['Kontributor', 'Detail']);

  // 1. Populate Hero Profile Card
  const avatarEl = document.getElementById('kontributor-detail-avatar');
  if (avatarEl) {
    avatarEl.className = 'h-14 w-14 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] text-[#09090b] font-semibold text-lg flex items-center justify-center shrink-0';
    avatarEl.textContent = item.avatar;
  }
  const nameEl = document.getElementById('kontributor-detail-name');
  if (nameEl) nameEl.textContent = item.nama;
  const deskEl = document.getElementById('kontributor-detail-deskripsi');
  if (deskEl) deskEl.textContent = item.deskripsi || '-';
  const picEl = document.getElementById('kontributor-detail-pic');
  if (picEl) {
    picEl.textContent = item.tipe === 'internal' && item.picEmail
      ? `${item.picNama} (${item.picEmail})`
      : item.picNama;
  }

  // Badge Tipe Kontributor
  const typeBadge = document.getElementById('kontributor-detail-type-badge');
  if (typeBadge) {
    typeBadge.className = 'inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2.5 py-0.5 text-xs font-medium text-[#09090b]';
    if (item.tipe === 'internal') {
      typeBadge.innerHTML = '<i data-lucide="building" class="w-3.5 h-3.5 text-[#71717a]"></i><span>Kontributor Internal</span>';
    } else {
      typeBadge.innerHTML = '<i data-lucide="globe" class="w-3.5 h-3.5 text-[#71717a]"></i><span>Kontributor Eksternal</span>';
    }
  }

  // 2. Populate 2 Mini KPI Cards (Dospem & Mahasiswa)
  const totalDosen = item.dosen ? item.dosen.length : 0;
  const totalMhs = item.mhs ? item.mhs.length : 0;

  const kpiVal2 = document.getElementById('kpi-kontributor-val-2');
  if (kpiVal2) kpiVal2.textContent = `${totalDosen} Dosen`;

  const kpiVal3 = document.getElementById('kpi-kontributor-val-3');
  if (kpiVal3) kpiVal3.textContent = `${totalMhs} Mahasiswa`;

  // 3. Render Tabs Header (Hanya Daftar Mahasiswa & Daftar Dosen)
  const tabsHeader = document.getElementById('kontributor-detail-tabs-header');
  if (tabsHeader) {
    tabsHeader.innerHTML = `
      <button
        type="button"
        id="btn-detail-tab-1"
        onclick="switchKontributorDetailTab(1)"
        class="detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors"
      >
        <i data-lucide="users" class="mr-2 h-4 w-4"></i>
        <span>Daftar Mahasiswa</span>
      </button>
      <button
        type="button"
        id="btn-detail-tab-2"
        onclick="switchKontributorDetailTab(2)"
        class="detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors"
      >
        <i data-lucide="user-check" class="mr-2 h-4 w-4"></i>
        <span>Daftar Dosen</span>
      </button>
    `;
  }

  // 4. Render Pane Content
  const pane1 = document.getElementById('kontributor-detail-pane-1');
  const pane2 = document.getElementById('kontributor-detail-pane-2');
  const pane3 = document.getElementById('kontributor-detail-pane-3');

  // Helper render tabel mahasiswa bersih (No, Mahasiswa, Prodi, Dospem, Status)
  const renderTableMahasiswa = (mhsList) => `
    <div class="rounded-md border border-[#e4e4e7] overflow-hidden bg-white">
      <table class="w-full text-sm">
        <thead class="border-b border-[#e4e4e7] bg-[#fafafa]">
          <tr>
            <th class="h-10 w-12 px-3 text-center font-medium text-[#71717a] text-xs">No</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Mahasiswa</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Program Studi</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Dosen Pembimbing</th>
            <th class="h-10 px-4 text-center font-medium text-[#71717a] text-xs">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e4e4e7]">
          ${mhsList.length === 0 ? '<tr><td colspan="5" class="py-6 text-center text-sm text-[#71717a]">Belum ada data mahasiswa terdaftar.</td></tr>' : mhsList.map((m, idx) => `
            <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
              <td class="px-3 text-center text-[#71717a] text-xs">${idx + 1}</td>
              <td class="px-4">
                <div class="font-medium text-[#09090b] text-sm">${m.nama}</div>
                <div class="text-[#71717a] text-xs">${m.nim}</div>
              </td>
              <td class="px-4 text-sm text-[#71717a]">${m.prodi}</td>
              <td class="px-4 text-sm text-[#09090b]">${m.dpl || '-'}</td>
              <td class="px-4 text-center">
                <span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Aktif</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Helper render tabel dosen bersih (No, Nama Dosen, NIDN, Prodi) - Kolom Mahasiswa Binaan Dihapus Sesuai Request
  const renderTableDosen = (dosenList) => `
    <div class="rounded-md border border-[#e4e4e7] overflow-hidden bg-white">
      <table class="w-full text-sm">
        <thead class="border-b border-[#e4e4e7] bg-[#fafafa]">
          <tr>
            <th class="h-10 w-12 px-3 text-center font-medium text-[#71717a] text-xs">No</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Nama Dosen</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">NIDN</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Program Studi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e4e4e7]">
          ${dosenList.length === 0 ? '<tr><td colspan="4" class="py-6 text-center text-sm text-[#71717a]">Belum ada data dosen teralokasi.</td></tr>' : dosenList.map((d, idx) => `
            <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
              <td class="px-3 text-center text-[#71717a] text-xs">${idx + 1}</td>
              <td class="px-4 font-medium text-[#09090b] text-sm">${d.nama}</td>
              <td class="px-4 text-xs text-[#71717a]">${d.nidn}</td>
              <td class="px-4 text-sm text-[#71717a]">${d.prodi}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  if (pane1) pane1.innerHTML = renderTableMahasiswa(item.mhs || []);
  if (pane2) pane2.innerHTML = renderTableDosen(item.dosen || []);
  if (pane3) pane3.innerHTML = '';

  switchKontributorDetailTab(1);
  if (window.lucide) window.lucide.createIcons();
}

function switchKontributorDetailTab(paneIndex) {
  activeDetailKontributorTabPane = paneIndex;
  for (let i = 1; i <= 3; i++) {
    const pane = document.getElementById('kontributor-detail-pane-' + i);
    const btn = document.getElementById('btn-detail-tab-1') && document.getElementById('btn-detail-tab-' + i);
    if (pane) {
      if (i === paneIndex) pane.classList.remove('hidden');
      else pane.classList.add('hidden');
    }
    if (btn) {
      if (i === paneIndex) {
        btn.className = 'detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors';
      } else {
        btn.className = 'detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors';
      }
    }
  }
  if (window.lucide) window.lucide.createIcons();
}

function hideKontributorDetail() {
  const list = document.getElementById('subview-kontributor-list');
  const detail = document.getElementById('subview-kontributor-detail');
  if (list) list.classList.remove('hidden');
  if (detail) detail.classList.add('hidden');
  activeDetailKontributorId = null;

  // Tampilkan kembali Header Baris 2 Direktori & Tombol Tambah Kontributor
  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.remove('hidden');

  updateBreadcrumb(['Kontributor']);
}

// Legacy alias for compatibility
function switchKontributorTab(tabKey) {
  if (tabKey === 'program') switchKontributorDetailTab(1);
  else if (tabKey === 'dosen') switchKontributorDetailTab(2);
  else if (tabKey === 'mhs') switchKontributorDetailTab(3);
}

// ====================================================
// NAVIGASI KELOLA PROGRAM (HALAMAN TERSENDIRI)
// ====================================================
function openKontributorProgram(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  const id = kontributor ? kontributor.id : (kontributorId || 1);
  window.location.href = `/admin/kontributor/program?id=${id}`;
}

// Alias backward compatibility
function openModalKelolaProgram(kontributorId) {
  openKontributorProgram(kontributorId);
}

// ====================================================
// DATA & CONTROLLER CMS HALAMAN PUBLIK KONTRIBUTOR MBKM
// ====================================================
let activeCmsKontributorId = null;
let activeCmsSubTabKey = 'hero'; // 'hero' | 'showcase'


function openKontributorCms(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  if (!kontributor) return;

  // Navigasi ke halaman Kelola Program tersendiri
  window.location.href = `/admin/kontributor/kelola-program?id=${kontributorId}`;
}

/**
 * Mengisi seluruh field CMS berdasarkan kontributorId.
 * Dipanggil oleh halaman /admin/kontributor/kelola-program.
 */
function populateKontributorCmsPage(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  if (!kontributor) return;

  activeCmsKontributorId = kontributorId;

  const titleEl = document.getElementById('cms-program-page-title');
  if (titleEl) titleEl.textContent = `Kelola Program — ${kontributor.nama}`;

  // Get or initialize kontributor CMS data
  let data = kontributorCmsDataMap[kontributorId];
  if (!data) {
    data = {
      kontributor: kontributor.nama,
      sektor: kontributor.sektor || 'Industri & Teknologi',
      lokasi: kontributor.alamat || 'Hybrid (Daring & Luring)',
      periode: 'Semester Gasal 2026/2027',
      mou: kontributor.mou || '042/MoU/FIK-UDINUS/2026',
      badge: kontributor.tipe === 'internal' ? 'Kontributor Internal Kampus' : 'Kontributor Nasional MBKM',
      deadline: '25 Oktober 2026 • 23:59 WIB',
      deskripsiHero: kontributor.deskripsi || `Kerja Sama strategis MBKM antara FIK UDINUS dan ${kontributor.nama} dalam memberikan pengalaman kerja profesional industri terakreditasi konversi 20 SKS.`,
      poin1: 'Mentoring Mentor Industri Profesional',
      poin2: 'Pengalaman Proyek Nyata Skala Enterprise',
      poin3: 'Konversi Akademik Terjamin hingga 20 SKS',
      koorNama: kontributor.tipe === 'internal' ? kontributor.picNama : 'Nurul Anisa S.W., M.Cs',
      koorJabatan: kontributor.tipe === 'internal' ? 'PIC Kontributor' : 'Koordinator Kampus Berdampak FIK UDINUS',
      koorFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      showcases: []
    };
    kontributorCmsDataMap[kontributorId] = data;
  }

  // Setup Authority Mode (Internal = Read-Only | Eksternal = CRUD)
  const isInternal = kontributor.tipe === 'internal';
  const btnSaveTop = document.getElementById('btn-save-cms-top');
  const previewBadge = document.getElementById('cms-preview-badge');
  const btnAddShowcase = document.getElementById('btn-tambah-showcase');

  if (isInternal) {
    if (btnSaveTop) btnSaveTop.classList.add('hidden');
    if (previewBadge) previewBadge.classList.remove('hidden');
    if (btnAddShowcase) btnAddShowcase.classList.add('hidden');
  } else {
    if (btnSaveTop) btnSaveTop.classList.remove('hidden');
    if (previewBadge) previewBadge.classList.add('hidden');
    if (btnAddShowcase) btnAddShowcase.classList.remove('hidden');
  }

  // Populate Form Fields
  document.getElementById('cms-input-kontributor').value = data.kontributor || '';
  document.getElementById('cms-input-klaster').value = data.sektor || '';
  document.getElementById('cms-input-moda').value = data.lokasi || '';
  document.getElementById('cms-input-periode').value = data.periode || 'Semester Gasal 2026/2027';
  document.getElementById('cms-input-sks').value = data.mou || '';
  document.getElementById('cms-input-badge').value = data.badge || '';
  document.getElementById('cms-input-deadline').value = data.deadline || '';
  document.getElementById('cms-input-deskripsi-hero').value = data.deskripsiHero || '';
  document.getElementById('cms-input-poin-1').value = data.poin1 || '';
  document.getElementById('cms-input-poin-2').value = data.poin2 || '';
  document.getElementById('cms-input-poin-3').value = data.poin3 || '';
  document.getElementById('cms-input-koor-nama').value = data.koorNama || '';
  document.getElementById('cms-input-koor-jabatan').value = data.koorJabatan || '';
  const fotoImg = document.getElementById('cms-koor-foto-preview');
  if (fotoImg && data.koorFoto) fotoImg.src = data.koorFoto;

  // Apply disabled state to all cms-field if internal
  document.querySelectorAll('.cms-field').forEach((el) => {
    el.disabled = isInternal;
    if (isInternal) {
      el.classList.add('bg-gray-50', 'cursor-not-allowed', 'opacity-85');
    } else {
      el.classList.remove('bg-gray-50', 'cursor-not-allowed', 'opacity-85');
    }
  });

  // Render Showcases
  renderShowcaseGrid();
  switchCmsSubTab('hero');

  // Update Partner Info Card
  const partnerNameEl = document.getElementById('cms-partner-name');
  const partnerAvatarEl = document.getElementById('cms-partner-avatar');
  const partnerBadgeEl = document.getElementById('cms-partner-badge');
  const partnerDeskripsiEl = document.getElementById('cms-partner-deskripsi');
  const partnerPicEl = document.getElementById('cms-partner-pic');

  if (partnerNameEl) partnerNameEl.textContent = kontributor.nama;
  if (partnerAvatarEl) partnerAvatarEl.textContent = kontributor.avatar || kontributor.nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  if (partnerBadgeEl) {
    const isInt = kontributor.tipe === 'internal';
    partnerBadgeEl.innerHTML = `<i data-lucide="${isInt ? 'building' : 'globe'}" class="w-3.5 h-3.5 text-[#71717a]"></i><span>${isInt ? 'Kontributor Internal' : 'Kontributor Eksternal'}</span>`;
  }
  if (partnerDeskripsiEl) {
    partnerDeskripsiEl.textContent = kontributor.deskripsi || '-';
  }
  if (partnerPicEl) {
    partnerPicEl.textContent = kontributor.picNama || '-';
  }

  if (window.lucide) window.lucide.createIcons();
}

// Legacy alias for compatibility
function openProgramCms(progName, kontributorId) {
  openKontributorCms(kontributorId);
}

function closeProgramCms() {
  // Jika berada di halaman standalone, kembali ke direktori kontributor
  if (window.location.pathname.includes('/kontributor/kelola-program')) {
    window.location.href = '/admin/kontributor';
    return;
  }

  const cmsView = document.getElementById('subview-program-cms');
  if (cmsView) cmsView.classList.add('hidden');
  const detailView = document.getElementById('subview-kontributor-detail');
  if (detailView) detailView.classList.remove('hidden');

  updateBreadcrumb(['Kontributor', 'Detail']);
  if (window.lucide) window.lucide.createIcons();
}
const closeKontributorCms = closeProgramCms;

function switchCmsSubTab(subTab) {
  activeCmsSubTabKey = subTab;
  const tabs = ['hero', 'timeline', 'syarat', 'showcase', 'faq'];

  tabs.forEach((t) => {
    const btn = document.getElementById('btn-subtab-cms-' + t);
    const pane = document.getElementById('pane-cms-' + t);
    if (t === subTab) {
      if (btn) {
        btn.className = 'cms-tab-btn inline-flex items-center px-5 py-3 text-sm font-semibold border-b-2 border-primary-600 text-primary-700 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'true');
      }
      if (pane) pane.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className = 'cms-tab-btn inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'false');
      }
      if (pane) pane.classList.add('hidden');
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderShowcaseGrid() {
  const container = document.getElementById('cms-showcase-grid');
  const countBadge = document.getElementById('badge-count-showcase');
  if (!container) return;

  const data = kontributorCmsDataMap[activeCmsKontributorId];
  const list = data && data.showcases ? data.showcases : [];
  if (countBadge) countBadge.textContent = list.length;

  const kontributor = kontributorListData.find((m) => m.id === activeCmsKontributorId);
  const isInternal = kontributor && kontributor.tipe === 'internal';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full rounded-xl border border-dashed border-[#e4e4e7] p-8 text-center bg-white flex flex-col items-center justify-center">
        <div class="h-10 w-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a] mb-2">
          <i data-lucide="layout-grid" class="w-5 h-5"></i>
        </div>
        <h4 class="text-sm font-semibold text-[#09090b]">Belum Ada Proyek Showcase</h4>
        <p class="text-xs text-[#71717a] mt-1 max-w-sm">Tambahkan hasil karya atau prototipe capstone mahasiswa binaan selama berkegiatan di kontributor ini.</p>
        ${!isInternal ? `
          <button
            type="button"
            onclick="openShowcaseModal()"
            class="mt-4 inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-[#0655a7] hover:bg-[#0655a7]/90 text-white transition-colors"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Tambah Proyek Pertama</span>
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((item, idx) => {
    const techBadges = (item.tech || []).map(t =>
      `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7]">${t}</span>`
    ).join('');

    const actionBtns = isInternal ? '' : `
      <div class="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onclick="openShowcaseModal(${idx})"
          class="inline-flex items-center justify-center h-7 w-7 rounded-md text-[#71717a] hover:text-[#0655a7] hover:bg-[#f4f4f5] transition-colors"
          title="Edit Proyek"
        >
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
        </button>
        <button
          type="button"
          onclick="handleDeleteShowcase(${idx})"
          class="inline-flex items-center justify-center h-7 w-7 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Hapus Proyek"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    return `
      <div class="rounded-xl border border-[#e4e4e7] bg-white p-5 flex flex-col justify-between hover:border-[#d4d4d8] transition-colors shadow-none">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-1">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-blue-200 bg-blue-50 text-[11px] font-semibold text-[#0655a7]">
                ${item.kategori}
              </span>
              <div class="text-[11px] text-[#71717a]">${item.batch} • ${item.id}</div>
            </div>
            ${actionBtns}
          </div>
          <h4 class="text-sm font-semibold text-[#09090b] leading-snug pt-1">${item.judul}</h4>
          <p class="text-xs text-[#71717a] leading-relaxed line-clamp-3">${item.deskripsi}</p>
        </div>

        <div class="pt-4 mt-3 border-t border-[#f4f4f5] flex flex-wrap gap-1.5">
          ${techBadges}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openShowcaseModal(editIdx) {
  const modal = document.getElementById('modal-showcase-proyek');
  if (!modal) return;

  const titleEl = document.getElementById('modal-showcase-title');
  const idxInput = document.getElementById('modal-showcase-idx');
  const idInput = document.getElementById('modal-showcase-id');
  const batchInput = document.getElementById('modal-showcase-batch');
  const judulInput = document.getElementById('modal-showcase-judul');
  const kategoriInput = document.getElementById('modal-showcase-kategori');
  const descInput = document.getElementById('modal-showcase-deskripsi');
  const techInput = document.getElementById('modal-showcase-tech');

  const data = kontributorCmsDataMap[activeCmsKontributorId];
  const list = data && data.showcases ? data.showcases : [];

  if (editIdx !== undefined && editIdx !== null && list[editIdx]) {
    const item = list[editIdx];
    if (titleEl) titleEl.textContent = 'Edit Proyek Showcase';
    if (idxInput) idxInput.value = editIdx;
    if (idInput) idInput.value = item.id;
    if (batchInput) batchInput.value = item.batch;
    if (judulInput) judulInput.value = item.judul;
    if (kategoriInput) kategoriInput.value = item.kategori;
    if (descInput) descInput.value = item.deskripsi;
    if (techInput) techInput.value = (item.tech || []).join(', ');
  } else {
    if (titleEl) titleEl.textContent = 'Tambah Proyek Showcase';
    if (idxInput) idxInput.value = '';
    if (idInput) idInput.value = `PRJ-2026-0${list.length + 1}`;
    if (batchInput) batchInput.value = 'Capstone Project Batch 6';
    if (judulInput) judulInput.value = '';
    if (kategoriInput) kategoriInput.value = '';
    if (descInput) descInput.value = '';
    if (techInput) techInput.value = 'Python, TensorFlow, React.js';
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeShowcaseModal() {
  const modal = document.getElementById('modal-showcase-proyek');
  if (modal) modal.classList.add('hidden');
}

function handleSaveShowcase(e) {
  e.preventDefault();
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data) return;
  if (!data.showcases) data.showcases = [];

  const idxVal = document.getElementById('modal-showcase-idx').value;
  const idVal = document.getElementById('modal-showcase-id').value.trim();
  const batch = document.getElementById('modal-showcase-batch').value.trim();
  const judul = document.getElementById('modal-showcase-judul').value.trim();
  const kategori = document.getElementById('modal-showcase-kategori').value.trim();
  const deskripsi = document.getElementById('modal-showcase-deskripsi').value.trim();
  const techStr = document.getElementById('modal-showcase-tech').value.trim();
  const tech = techStr.split(',').map(s => s.trim()).filter(Boolean);

  const newItem = {
    id: idVal,
    batch,
    judul,
    kategori,
    deskripsi,
    tech
  };

  if (idxVal !== '' && data.showcases[Number(idxVal)]) {
    data.showcases[Number(idxVal)] = newItem;
    alert('Proyek showcase berhasil diperbarui!');
  } else {
    data.showcases.unshift(newItem);
    alert('Proyek showcase baru berhasil ditambahkan!');
  }

  closeShowcaseModal();
  renderShowcaseGrid();
}

function handleDeleteShowcase(idx) {
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data || !data.showcases || !data.showcases[idx]) return;

  if (confirm(`Hapus proyek showcase "${data.showcases[idx].judul}"?`)) {
    data.showcases.splice(idx, 1);
    renderShowcaseGrid();
  }
}

function handleSaveCmsHero() {
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data) return;

  data.kontributor = document.getElementById('cms-input-kontributor').value.trim();
  data.sektor = document.getElementById('cms-input-klaster').value.trim();
  data.lokasi = document.getElementById('cms-input-moda').value.trim();
  data.periode = document.getElementById('cms-input-periode').value;
  data.mou = document.getElementById('cms-input-sks').value.trim();
  data.badge = document.getElementById('cms-input-badge').value.trim();
  data.deadline = document.getElementById('cms-input-deadline').value.trim();
  data.deskripsiHero = document.getElementById('cms-input-deskripsi-hero').value.trim();
  data.poin1 = document.getElementById('cms-input-poin-1').value.trim();
  data.poin2 = document.getElementById('cms-input-poin-2').value.trim();
  data.poin3 = document.getElementById('cms-input-poin-3').value.trim();
  data.koorNama = document.getElementById('cms-input-koor-nama').value.trim();
  data.koorJabatan = document.getElementById('cms-input-koor-jabatan').value.trim();

  alert('Perubahan CMS Halaman Publik Kontributor berhasil disimpan!');
}

function handleCmsPhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const imgPreview = document.getElementById('cms-koor-foto-preview');
    if (imgPreview) imgPreview.src = evt.target.result;
    const statusText = document.getElementById('cms-foto-status');
    if (statusText) statusText.textContent = `Foto terpilih: ${file.name}`;

    const data = kontributorCmsDataMap[activeCmsKontributorId];
    if (data) data.koorFoto = evt.target.result;
  };
  reader.readAsDataURL(file);
}

// 5. MODUL MAHASISWA - PENDAFTAR (Sesuai Layout Tugas Akhir Pengajuan Mahasiswa)
let pendaftarActiveStatusTab = 'baru'; // 'baru' | 'diterima' | 'ditolak' | 'dibatalkan'
let pendaftarViewMode = 'kartu'; // 'kartu' | 'tabel'
let pendaftarSort = 'terbaru';
let pelamarSearchQuery = '';
let pelamarFilterKontributor = 'eksternal'; // default: 'eksternal' sesuai arahan pengguna
let pelamarFilterProdi = 'semua';
let pelamarCurrentPage = 1;
const pelamarItemsPerPage = 5;
let activeModalPelamarId = null;


function switchPendaftarStatusTab(tabKey) {
  pendaftarActiveStatusTab = tabKey;
  const tabs = ['baru', 'diterima', 'ditolak', 'dibatalkan'];

  tabs.forEach((t) => {
    const btn = document.getElementById('tab-pendaftar-' + t);
    if (!btn) return;
    if (t === tabKey) {
      btn.className =
        'flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 border-[#0655a7] text-[#0655a7] transition-colors';
    } else {
      btn.className =
        'flex items-center gap-2 pb-3 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors';
    }
  });

  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function switchPendaftarViewMode(mode) {
  pendaftarViewMode = mode;
  const cardsCont = document.getElementById('pendaftar-cards-container');
  const tableCont = document.getElementById('pendaftar-table-container');

  if (mode === 'kartu') {
    if (cardsCont) cardsCont.classList.remove('hidden');
    if (tableCont) tableCont.classList.add('hidden');
  } else {
    if (cardsCont) cardsCont.classList.add('hidden');
    if (tableCont) tableCont.classList.remove('hidden');
  }
  renderPelamarTable();
}

function handleSortPendaftar(sortVal) {
  pendaftarSort = sortVal;
  renderPelamarTable();
}

function handleSearchPelamar(val) {
  pelamarSearchQuery = (val || '').toLowerCase().trim();
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function handleFilterPelamarKontributor(val) {
  pelamarFilterKontributor = val;
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function handleFilterPelamarProdi(val) {
  pelamarFilterProdi = val;
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function updatePendaftarTabBadges() {
  const countBaru = pelamarListData.filter((p) => p.status === 'baru').length;
  const countDiterima = pelamarListData.filter((p) => p.status === 'diterima').length;
  const countDitolak = pelamarListData.filter((p) => p.status === 'ditolak').length;
  const countDibatalkan = pelamarListData.filter((p) => p.status === 'dibatalkan').length;

  const bBaru = document.getElementById('badge-count-pendaftar-baru');
  const bDiterima = document.getElementById('badge-count-pendaftar-diterima');
  const bDitolak = document.getElementById('badge-count-pendaftar-ditolak');
  const bDibatalkan = document.getElementById('badge-count-pendaftar-dibatalkan');

  if (bBaru) bBaru.textContent = countBaru;
  if (bDiterima) bDiterima.textContent = countDiterima;
  if (bDitolak) bDitolak.textContent = countDitolak;
  if (bDibatalkan) bDibatalkan.textContent = countDibatalkan;
}

function getFilteredPelamarData() {
  let list = pelamarListData.filter((p) => {
    // Status Tab Filter
    const matchStatus =
      pendaftarActiveStatusTab === 'semua' || p.status === pendaftarActiveStatusTab;

    // Search Query
    const matchQuery =
      !pelamarSearchQuery ||
      p.nama.toLowerCase().includes(pelamarSearchQuery) ||
      p.nim.toLowerCase().includes(pelamarSearchQuery) ||
      p.program.toLowerCase().includes(pelamarSearchQuery) ||
      p.kontributor.toLowerCase().includes(pelamarSearchQuery) ||
      p.deskripsi.toLowerCase().includes(pelamarSearchQuery);

    // Kontributor Filter (Semua, Eksternal, Internal, atau Nama Spesifik)
    let matchKontributor = true;
    if (pelamarFilterKontributor === 'eksternal') {
      matchKontributor = p.kategoriKontributor === 'eksternal';
    } else if (pelamarFilterKontributor === 'internal') {
      matchKontributor = p.kategoriKontributor === 'internal';
    } else if (pelamarFilterKontributor !== 'semua') {
      matchKontributor = p.kontributor === pelamarFilterKontributor;
    }

    // Prodi Filter
    const matchProdi =
      pelamarFilterProdi === 'semua' || p.prodi === pelamarFilterProdi;

    return matchStatus && matchQuery && matchKontributor && matchProdi;
  });

  // Sorting
  if (pendaftarSort === 'ipk-tinggi') {
    list.sort((a, b) => parseFloat(b.ipk) - parseFloat(a.ipk));
  } else if (pendaftarSort === 'nama-asc') {
    list.sort((a, b) => a.nama.localeCompare(b.nama));
  } else {
    // Default: Terbaru
    list.sort((a, b) => b.id - a.id);
  }

  return list;
}

function renderPelamarTable() {
  updatePendaftarTabBadges();

  const cardsContainer = document.getElementById('pendaftar-cards-container');
  const tbody = document.getElementById('pelamar-table-tbody');
  const infoEl = document.getElementById('pelamar-table-info');
  const paginationEl = document.getElementById('pelamar-pagination-controls');

  const filtered = getFilteredPelamarData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pelamarItemsPerPage) || 1;
  if (pelamarCurrentPage > totalPages) pelamarCurrentPage = totalPages;

  const startIndex = (pelamarCurrentPage - 1) * pelamarItemsPerPage;
  const endIndex = Math.min(startIndex + pelamarItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  // 1. Render Tampilan Kartu (Sesuai Gambar Tugas Akhir)
  if (cardsContainer) {
    if (currentSlice.length === 0) {
      cardsContainer.innerHTML = `
        <div class="p-12 text-center rounded-xl border border-dashed border-[#e4e4e7] bg-white">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto text-[#71717a] mb-2 opacity-40"></i>
          <h4 class="text-sm font-semibold text-[#09090b]">Tidak ada pendaftar mahasiswa</h4>
          <p class="text-xs text-[#71717a] mt-1">Tidak ditemukan pendaftar yang cocok dengan filter atau status saat ini.</p>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = currentSlice
        .map((item) => {
          const isInternal = item.kategoriKontributor === 'internal';

          // Badges Status & Kategori
          const kategoriBadge = isInternal
            ? `<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-[#0655a7] border border-blue-200">Internal</span>`
            : `<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-orange-50 text-orange-700 border border-orange-200">Eksternal</span>`;

          const statusBadges = {
            baru: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200">Menunggu</span>',
            diterima: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Diterima</span>',
            ditolak: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-rose-50 text-rose-700 border border-rose-200">Ditolak</span>',
            dibatalkan: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">Dibatalkan</span>'
          };
          const statusBadge = statusBadges[item.status] || statusBadges.baru;

          // Action Buttons Sisi Kiri
          let actionHtml = '';
          if (isInternal) {
            actionHtml = `
              <div class="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-center">
                <span class="text-[11px] font-semibold text-amber-800 flex items-center justify-center gap-1">
                  <i data-lucide="lock" class="w-3.5 h-3.5"></i>
                  <span>Read-Only (Kontributor)</span>
                </span>
                <p class="text-[10px] text-amber-700 mt-0.5">Seleksi kontributor internal dikelola penuh oleh Kontributor terkait.</p>
              </div>
            `;
          } else {
            if (item.status === 'baru') {
              actionHtml = `
                <div class="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onclick="terimaPelamar(${item.id})"
                    class="h-9 inline-flex items-center justify-center gap-1.5 rounded-md border border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-semibold text-emerald-700 transition-colors"
                  >
                    <i data-lucide="check" class="w-4 h-4"></i>
                    <span>Terima</span>
                  </button>
                  <button
                    type="button"
                    onclick="tolakPelamar(${item.id})"
                    class="h-9 inline-flex items-center justify-center gap-1.5 rounded-md border border-red-300 bg-white hover:bg-red-50 text-xs font-semibold text-red-600 transition-colors"
                  >
                    <i data-lucide="x" class="w-4 h-4"></i>
                    <span>Tolak</span>
                  </button>
                </div>
              `;
            } else if (item.status === 'diterima') {
              actionHtml = `
                <div class="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                  <span class="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1">
                    <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                    <span>Diterima</span>
                  </span>
                </div>
              `;
            } else if (item.status === 'ditolak') {
              actionHtml = `
                <div class="p-2 rounded-lg bg-rose-50 border border-rose-200 text-center">
                  <span class="text-xs font-semibold text-rose-700 flex items-center justify-center gap-1">
                    <i data-lucide="x-circle" class="w-4 h-4"></i>
                    <span>Ditolak</span>
                  </span>
                </div>
              `;
            } else {
              actionHtml = `
                <div class="p-2 rounded-lg bg-slate-100 border border-slate-200 text-center">
                  <span class="text-xs font-semibold text-slate-700 flex items-center justify-center gap-1">
                    <i data-lucide="ban" class="w-4 h-4"></i>
                    <span>Dibatalkan</span>
                  </span>
                </div>
              `;
            }
          }

          return `
            <div class="rounded-xl border border-[#e4e4e7] bg-white overflow-hidden shadow-none hover:border-[#0655a7]/30 transition-all">
              <div class="grid grid-cols-1 lg:grid-cols-12">
                <!-- Kolom Kiri: Data Mahasiswa -->
                <div class="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#e4e4e7] flex flex-col">
                  <!-- Header Kolom -->
                  <div class="bg-[#fafafa] border-b border-[#e4e4e7] px-5 py-3 shrink-0">
                    <div class="flex items-center gap-2 font-semibold text-sm text-[#09090b]">
                      <i data-lucide="user" class="w-4 h-4"></i>
                      <span>Data Mahasiswa</span>
                    </div>
                  </div>

                  <!-- Konten -->
                  <div class="p-5 space-y-4 flex-1 flex flex-col justify-center">
                    <div class="flex justify-center">
                      <img
                        src="${item.foto}"
                        alt="${item.nama}"
                        class="w-24 h-24 rounded-full object-cover border-2 border-[#e4e4e7] bg-[#f4f4f5]"
                      />
                    </div>
                    <h4 class="text-lg font-semibold text-center text-[#09090b] capitalize leading-tight">${item.nama.toLowerCase()}</h4>

                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">NIM</span>
                        <span class="text-[#09090b]">${item.nim}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">Email</span>
                        <span class="text-[#09090b] truncate" title="${item.email}">${item.email}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">No HP</span>
                        <span class="text-[#09090b]">${item.noHp}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">Prodi</span>
                        <span class="text-[#09090b] truncate">${item.prodi}</span>
                      </div>
                    </div>

                    <div class="pt-2">
                      <button
                        type="button"
                        onclick="lihatTranskripPelamar(${item.id})"
                        class="w-full h-9 inline-flex items-center justify-center gap-2 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-medium text-[#09090b] transition-colors"
                      >
                        <i data-lucide="file-text" class="w-4 h-4 text-[#71717a]"></i>
                        <span>Lihat Transkrip</span>
                      </button>
                    </div>

                    <div class="pt-2">
                      ${actionHtml}
                    </div>
                  </div>
                </div>

                <!-- Kolom Kanan: Data Pengajuan -->
                <div class="lg:col-span-8 flex flex-col">
                  <!-- Header Kolom -->
                  <div class="bg-[#fafafa] border-b border-[#e4e4e7] px-5 py-3 shrink-0">
                    <div class="flex items-center gap-2 font-semibold text-sm text-[#09090b]">
                      <i data-lucide="file-text" class="w-4 h-4"></i>
                      <span>Data Pengajuan</span>
                    </div>
                  </div>

                  <!-- Konten -->
                  <div class="p-5 space-y-6 flex-1 flex flex-col justify-center">
                    <!-- Program & Kontributor -->
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                        <i data-lucide="notebook-pen" class="w-4 h-4"></i>
                        <span>Kontributor</span>
                      </div>
                      <p class="text-lg font-medium text-[#09090b] leading-snug">${item.program}</p>
                      <div class="flex items-center gap-1.5">
                        <i data-lucide="building-2" class="w-3.5 h-3.5 text-[#0655a7]"></i>
                        <span class="text-sm text-[#0655a7] font-medium">${item.kontributor}</span>
                      </div>
                    </div>

                    <!-- Akademik & Semester -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="award" class="w-4 h-4"></i>
                          <span>IPK Kumulatif</span>
                        </div>
                        <p class="text-[#09090b]">${item.ipk}</p>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="calendar" class="w-4 h-4"></i>
                          <span>Semester</span>
                        </div>
                        <p class="text-[#09090b]">${item.semester} <span class="text-sm text-[#71717a]">(${(item.semesterAjaran || '').replace(/^(Gasal|Genap)\s*/i, '')})</span></p>
                      </div>
                    </div>

                    <!-- Tanggal Pengajuan -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="calendar" class="w-4 h-4"></i>
                          <span>Tanggal Pengajuan</span>
                        </div>
                        <p class="text-[#09090b]">${item.tanggalPengajuan}</p>
                      </div>
                    </div>

                    <!-- Lampiran Berkas (paling bawah) -->
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                        <i data-lucide="paperclip" class="w-4 h-4"></i>
                        <span>Lampiran Berkas</span>
                      </div>
                      <div class="flex items-stretch gap-2">
                        ${(item.links || [])
                          .map(
                            (l) => `
                            <a
                              href="${l.url}"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="flex-1 inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-medium text-[#09090b] transition-colors"
                            >
                              <i data-lucide="${l.label === 'CV' ? 'file-text' : 'folder-open'}" class="w-4 h-4 text-[#71717a]"></i>
                              <span>Lihat ${l.label}</span>
                            </a>
                          `
                          )
                          .join('')}
                        <button
                          type="button"
                          onclick="alert('Mahasiswa dapat menambahkan tautan pengumpulan lain (sertifikat, GitHub, demo aplikasi) saat mengisi form pendaftaran.')"
                          class="inline-flex items-center justify-center h-9 w-9 shrink-0 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#71717a] transition-colors"
                          title="Tautan tambahan dari mahasiswa"
                        >
                          <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // 2. Render Tampilan Tabel (Sesuai Tabel Standar DataTable)
  if (tbody) {
    if (currentSlice.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="py-8 text-center text-sm text-[#71717a]">
            Tidak ada data pendaftar yang cocok dengan kriteria filter.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = currentSlice
        .map((item, idx) => {
          const rowNum = startIndex + idx + 1;
          const isInternal = item.kategoriKontributor === 'internal';

          const matkulTags = item.matkulDiambil
            .map((m) => `<span class="px-1.5 py-0.5 text-[10px] rounded bg-blue-50 text-[#0655a7] border border-blue-200 font-medium whitespace-nowrap">${m.nama} (${m.sks} SKS)</span>`)
            .join(' ');

          let actionBtn = '';
          if (isInternal) {
            actionBtn = `<span class="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-medium">Read-Only</span>`;
          } else {
            if (item.status === 'baru') {
              actionBtn = `
                <div class="flex items-center justify-center gap-1.5">
                  <button type="button" onclick="terimaPelamar(${item.id})" class="h-7 px-2 rounded border border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-semibold text-emerald-700">Terima</button>
                  <button type="button" onclick="tolakPelamar(${item.id})" class="h-7 px-2 rounded border border-red-300 bg-white hover:bg-red-50 text-xs font-semibold text-red-600">Tolak</button>
                </div>
              `;
            } else {
              actionBtn = `
                <button type="button" onclick="lihatTranskripPelamar(${item.id})" class="h-7 px-2.5 rounded border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b]">Transkrip</button>
              `;
            }
          }

          return `
            <tr class="h-14 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
              <td class="px-3 text-center text-[#71717a] text-xs">${rowNum}</td>
              <td class="px-4">
                <div class="flex items-center gap-2.5">
                  <img src="${item.foto}" alt="${item.nama}" class="h-8 w-8 rounded-full object-cover border border-[#e4e4e7] shrink-0" />
                  <div>
                    <div class="font-medium text-[#09090b] text-sm">${item.nama}</div>
                    <div class="text-[#71717a] text-xs">${item.nim} • ${item.prodi}</div>
                  </div>
                </div>
              </td>
              <td class="px-4">
                <div class="font-medium text-[#09090b] text-sm">${item.program}</div>
                <div class="text-xs text-[#0655a7]">${item.kontributor} <span class="text-[10px] text-[#71717a]">(${item.kategoriKontributor})</span></div>
              </td>
              <td class="px-4">
                <div class="font-semibold text-xs text-[#09090b]">IPK ${item.ipk}</div>
                <div class="text-[11px] text-[#71717a]">${item.semester} • ${item.sksLulus} SKS</div>
              </td>
              <td class="px-4">
                <div class="flex flex-wrap gap-1 max-w-xs">
                  ${matkulTags}
                </div>
              </td>
              <td class="px-4 text-center">${actionBtn}</td>
            </tr>
          `;
        })
        .join('');
    }
  }

  // Pagination info & controls
  if (infoEl) {
    infoEl.textContent =
      totalItems === 0
        ? 'Menampilkan 0 pendaftar'
        : `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} pendaftar (Halaman ${pelamarCurrentPage} dari ${totalPages})`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToPelamarPage(${pelamarCurrentPage - 1})"
        ${pelamarCurrentPage === 1 ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === pelamarCurrentPage;
      html += `
        <button
          type="button"
          onclick="goToPelamarPage(${p})"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
            isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
          }"
        >
          ${p}
        </button>
      `;
    }
    html += `
      <button
        type="button"
        onclick="goToPelamarPage(${pelamarCurrentPage + 1})"
        ${pelamarCurrentPage === totalPages ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;
    paginationEl.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToPelamarPage(p) {
  const totalPages = Math.ceil(getFilteredPelamarData().length / pelamarItemsPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  pelamarCurrentPage = p;
  renderPelamarTable();
}

function terimaPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  if (item.kategoriKontributor === 'internal') {
    alert('Seleksi kontributor internal hanya dapat dilakukan oleh akun Kontributor.');
    return;
  }
  item.status = 'diterima';
  alert(`Pendaftar ${item.nama} BERHASIL DITERIMA sebagai peserta resmi MBKM di ${item.kontributor}!`);
  renderPelamarTable();
}

function tolakPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  if (item.kategoriKontributor === 'internal') {
    alert('Seleksi kontributor internal hanya dapat dilakukan oleh akun Kontributor.');
    return;
  }
  if (confirm(`Tolak pengajuan pendaftar ${item.nama}?`)) {
    item.status = 'ditolak';
    renderPelamarTable();
  }
}

function lihatTranskripPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-transkrip-pelamar');
  const namaEl = document.getElementById('modal-transkrip-nama');
  const nimEl = document.getElementById('modal-transkrip-nim');
  const ipkEl = document.getElementById('modal-transkrip-ipk');
  const sksEl = document.getElementById('modal-transkrip-sks');

  if (namaEl) namaEl.textContent = item.nama;
  if (nimEl) nimEl.textContent = `${item.nim} • ${item.prodi}`;
  if (ipkEl) ipkEl.textContent = `IPK: ${item.ipk}`;
  if (sksEl) sksEl.textContent = `${item.sksLulus} SKS Lulus (${item.semester})`;

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTranskripModal() {
  const modal = document.getElementById('modal-transkrip-pelamar');
  if (modal) modal.classList.add('hidden');
}


let semuaMhsSearchQuery = '';
let semuaMhsFilterKontributor = 'semua';
let semuaMhsFilterProdi = 'semua';
let semuaMhsCurrentPage = 1;
const semuaMhsItemsPerPage = 10;

function handleSearchSemuaMhs(val) {
  semuaMhsSearchQuery = (val || '').toLowerCase().trim();
  semuaMhsCurrentPage = 1;
  renderSemuaMhsTable();
}

function handleFilterSemuaMhsKontributor(val) {
  semuaMhsFilterKontributor = val;
  semuaMhsCurrentPage = 1;
  renderSemuaMhsTable();
}

function handleFilterSemuaMhsProdi(val) {
  semuaMhsFilterProdi = val;
  semuaMhsCurrentPage = 1;
  renderSemuaMhsTable();
}

function getFilteredSemuaMhsData() {
  return semuaMhsListData.filter((m) => {
    const matchQuery =
      !semuaMhsSearchQuery ||
      m.nama.toLowerCase().includes(semuaMhsSearchQuery) ||
      m.nim.toLowerCase().includes(semuaMhsSearchQuery) ||
      m.dpl.toLowerCase().includes(semuaMhsSearchQuery);
    const matchKontributor =
      semuaMhsFilterKontributor === 'semua' || m.kontributor === semuaMhsFilterKontributor;
    const matchProdi =
      semuaMhsFilterProdi === 'semua' || m.prodi === semuaMhsFilterProdi;
    return matchQuery && matchKontributor && matchProdi;
  });
}

function renderSemuaMhsTable() {
  const tbody = document.getElementById('semua-mhs-table-tbody');
  const infoEl = document.getElementById('semua-mhs-table-info');
  const paginationEl = document.getElementById('semua-mhs-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredSemuaMhsData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / semuaMhsItemsPerPage) || 1;
  if (semuaMhsCurrentPage > totalPages) semuaMhsCurrentPage = totalPages;

  const startIndex = (semuaMhsCurrentPage - 1) * semuaMhsItemsPerPage;
  const endIndex = Math.min(startIndex + semuaMhsItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-8 text-center text-sm text-[#71717a]">
          Tidak ada data mahasiswa aktif yang ditemukan.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const pct = Math.round((item.logbookFilled / item.logbookTotal) * 100);

        return `
        <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
          <td class="px-3 text-center text-[#71717a] text-xs">${rowNum}</td>
          <td class="px-4">
            <div class="flex items-center gap-2.5">
              <div class="h-8 w-8 rounded-full bg-muted text-[#71717a] flex items-center justify-center text-xs font-medium shrink-0">
                ${item.nama.charAt(0).toUpperCase()}
              </div>
              <div>
                <div class="font-medium text-[#09090b] text-sm">${item.nama}</div>
                <div class="text-[#71717a] text-xs">${item.nim} • ${item.prodi}</div>
              </div>
            </div>
          </td>
          <td class="px-4">
            <div class="text-xs text-[#09090b] flex items-center gap-1.5">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-[#71717a]"></i>
              <span>${item.email}</span>
            </div>
            <div class="text-xs text-[#71717a] flex items-center gap-1.5 mt-0.5">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-[#71717a]"></i>
              <span>${item.phone}</span>
            </div>
          </td>
          <td class="px-4">
            <div class="font-medium text-[#09090b] text-sm">${item.kontributor}</div>
            <div class="text-xs text-[#0655a7] font-medium">${item.posisi}</div>
          </td>
          <td class="px-4 text-sm text-[#09090b]">${item.dpl}</td>
          <td class="px-4 text-center">
            <div class="flex flex-col items-center gap-1">
              <span class="text-xs font-medium text-[#09090b]">${item.logbookFilled}/${item.logbookTotal} Mgg (${pct}%)</span>
              <div class="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#0655a7] rounded-full" style="width: ${pct}%"></div>
              </div>
            </div>
          </td>
          <td class="px-4 text-center">
            <span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">${item.status}</span>
          </td>
          <td class="px-4 text-center">
            <button
              type="button"
              onclick="switchTab('logbook')"
              class="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] transition-colors"
              title="Buka Logbook Mahasiswa"
            >
              <i data-lucide="book-open" class="w-3.5 h-3.5 text-[#71717a]"></i>
              <span>Logbook</span>
            </button>
          </td>
        </tr>
      `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent = totalItems === 0
      ? 'Page 0 of 0 (0 total items)'
      : `Page ${semuaMhsCurrentPage} of ${totalPages} (${totalItems} total items)`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToSemuaMhsPage(${semuaMhsCurrentPage - 1})"
        ${semuaMhsCurrentPage === 1 ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === semuaMhsCurrentPage;
      html += `
        <button
          type="button"
          onclick="goToSemuaMhsPage(${p})"
          class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${ isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]' }"
        >
          ${p}
        </button>
      `;
    }
    html += `
      <button
        type="button"
        onclick="goToSemuaMhsPage(${semuaMhsCurrentPage + 1})"
        ${semuaMhsCurrentPage === totalPages ? 'disabled' : ''}
        class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;
    paginationEl.innerHTML = html;
  }

  if (window.lucide) window.lucide.createIcons();
}

function goToSemuaMhsPage(p) {
  const totalPages = Math.ceil(getFilteredSemuaMhsData().length / semuaMhsItemsPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  semuaMhsCurrentPage = p;
  renderSemuaMhsTable();
}

function exportDataMahasiswa() {
  alert('Mengunduh rekap direktori seluruh mahasiswa aktif MBKM (Format: XLSX Spreadsheet)...');
}

function exportDataPelamar() {
  alert('Mengunduh data pendaftar mahasiswa MBKM (Format: Excel .xlsx)...');
}

// ====================================================
// INISIALISASI APLIKASI (SAFE RUNTIME TOP-LEVEL INIT)
// ====================================================
function initApp() {
  renderDashboardKoordinatorWidget();
  renderProgramTable();
  renderKategoriTable();
  renderSurekomTable();
  renderLogbookTable();
  renderLaporanTable();
  renderPengumumanCards();
  renderPeriodeData();
  renderKontributorTable();
  renderPelamarTable();
  renderSemuaMhsTable();
  populateProgramKategoriDropdown();

  // Otomatis buka tab berdasarkan window.__CURRENT_TAB__ atau URL hash
  const hash = window.location.hash.replace('#', '');
  let targetTab = 'dashboard';
  if (hash && typeof navMeta !== 'undefined' && navMeta[hash]) {
    targetTab = hash;
  } else if (typeof window !== 'undefined' && window.__CURRENT_TAB__) {
    targetTab = window.__CURRENT_TAB__;
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
    targetTab = slugMap[slug] || slug || 'dashboard';
  }
  switchTab(targetTab);

  // Halaman Kelola Program Kontributor (/admin/kontributor/kelola-program?id=N)
  // Dikenali dari section khusus agar tidak bentrok dengan subview di halaman direktori.
  if (document.getElementById('section-kontributor-cms')) {
    const params = new URLSearchParams(window.location.search);
    const cmsId = Number(params.get('id'));
    if (cmsId) {
      populateKontributorCmsPage(cmsId);
    } else {
      window.location.href = '/admin/kontributor';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && typeof navMeta !== 'undefined' && navMeta[hash]) {
    switchTab(hash);
  }
});


// JAVASCRIPT CONTROLLER BAGIAN 1 (ISSUE #17)
// ====================================================

// 1. Modul Konversi SKS (5 Skema Dinamis & CPL Locking)
function openModalInfoSkemaSks() {
  const modal = document.getElementById('modal-info-skema-sks');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalInfoSkemaSks() {
  const modal = document.getElementById('modal-info-skema-sks');
  if (modal) modal.classList.add('hidden');
}

function openModalTelaahKonversi(nama, nim, prodi, kontributor, skema, totalSks, matkulCount) {
  document.getElementById('modal-telaah-nama').textContent = nama;
  document.getElementById('modal-telaah-nim-prodi').textContent = `${nim} • ${prodi}`;
  document.getElementById('modal-telaah-kontributor').textContent = kontributor;
  document.getElementById('modal-telaah-skema-badge').textContent = skema;
  document.getElementById('modal-telaah-sks-total').textContent =
    `Total: ${totalSks} SKS (${matkulCount} Matkul)`;

  const btnKunci = document.getElementById('modal-telaah-btn-kunci');
  if (btnKunci) {
    btnKunci.onclick = function () {
      kunciKonversiIndividu(nim, nama);
      closeModalTelaahKonversi();
    };
  }

  const modal = document.getElementById('modal-telaah-konversi');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalTelaahKonversi() {
  const modal = document.getElementById('modal-telaah-konversi');
  if (modal) modal.classList.add('hidden');
}

function kunciKonversiIndividu(nim, nama) {
  if (
    confirm(
      `Sahkan dan kunci konversi SKS untuk mahasiswa ${nama} (${nim})?\n\nSetelah dikunci, usulan mata kuliah berstatus permanen dan langsung disinkronkan ke KHS SIADIN.`
    )
  ) {
    alert(`Konversi SKS untuk ${nama} (${nim}) BERHASIL DISAHKAN & DIKUNCI! Data telah terkirim ke KHS SIADIN.`);
  }
}

function kunciKonversiMassal() {
  const checkboxes = document.querySelectorAll('.check-konversi-row:checked');
  if (checkboxes.length === 0) {
    alert('Pilih minimal satu usulan konversi mahasiswa untuk disahkan & dikunci.');
    return;
  }
  if (
    confirm(`Sahkan dan kunci ${checkboxes.length} usulan konversi SKS terpilih ke KHS SIADIN secara massal?`)
  ) {
    alert(`Sukses! ${checkboxes.length} berkas konversi SKS berhasil disahkan dan dikunci permanen.`);
  }
}

function toggleSelectAllKonversi(source) {
  document.querySelectorAll('.check-konversi-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

// 2. Modul Kuota Dosen Pembimbing
function openModalSetBatasKuota() {
  const modal = document.getElementById('modal-atur-kuota-dosen');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalSetBatasKuota() {
  const modal = document.getElementById('modal-atur-kuota-dosen');
  if (modal) modal.classList.add('hidden');
}

function handleSaveBatasKuotaFakultas(e) {
  e.preventDefault();
  const kuota = document.getElementById('input-kuota-standar-fakultas').value;
  closeModalSetBatasKuota();
  alert(`Batas standar kuota Dospem fakultas berhasil diperbarui menjadi ${kuota} mahasiswa per dosen.`);
}

function openModalEditBatasDosen(dosenNama, kuota, terpakai) {
  document.getElementById('modal-edit-dosen-subtitle').textContent = dosenNama;
  document.getElementById('modal-edit-dosen-terpakai').textContent = `${terpakai} Mahasiswa`;
  document.getElementById('input-kuota-individual').value = kuota;
  const modal = document.getElementById('modal-edit-batas-dosen');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalEditBatasDosen() {
  const modal = document.getElementById('modal-edit-batas-dosen');
  if (modal) modal.classList.add('hidden');
}

function handleSaveKuotaIndividual(e) {
  e.preventDefault();
  const kuotaBaru = document.getElementById('input-kuota-individual').value;
  closeModalEditBatasDosen();
  alert(`Kapasitas kuota dosen berhasil disesuaikan menjadi ${kuotaBaru} mahasiswa.`);
}

// 3. Modul Data Dosen & Update Dospem (Plotting)
function syncDataDosenUdi() {
  alert('Sinkronisasi data kepegawaian dosen dengan UDI berhasil dijalankan. 48 dosen terverifikasi aktif.');
}

function openModalTambahDosen() {
  showAddKoordinatorModal();
}

function showDetailDosen(nama, nidn, prodi, kepakaran, beban) {
  alert(
    `Detail Dosen Pembimbing:\nNama: ${nama}\nNIDN: ${nidn}\nProdi: ${prodi}\nKepakaran: ${kepakaran}\nBeban Aktif: ${beban} mahasiswa.`
  );
}

function filterDosenData() {
  // Filter controller logic
  const query =
    (document.getElementById('search-dosen-data') || document.getElementById('search-dosen-data-embed') || {})
      .value || '';
  const prodi =
    (document.getElementById('filter-dosen-prodi') || document.getElementById('filter-dosen-prodi-embed') || {})
      .value || '';
  // Filtering simulated visually
}

function autoAssignDplBatch() {
  if (
    confirm(
      'Jalankan Auto-Assign Cerdas?\nSistem akan mencocokkan mahasiswa dengan Dospem berdasarkan kesesuaian domain kepakaran dan sisa kuota terbanyak.'
    )
  ) {
    alert('Berhasil! 14 mahasiswa dalam antrean telah dipasangkan dengan Dospem yang sesuai secara otomatis.');
  }
}

function simpanSemuaPlotting() {
  const selected = document.querySelectorAll('.check-plotting-row:checked');
  if (selected.length === 0) {
    alert('Pilih minimal satu mahasiswa untuk disimpan hasil plotting Dospem-nya.');
    return;
  }
  alert(`Berhasil menyimpan penugasan Dospem untuk ${selected.length} mahasiswa terpilih.`);
}

function saveIndividualPlotting(nim, nama) {
  alert(`Plotting Dospem untuk ${nama} (${nim}) berhasil disimpan.`);
}

function toggleSelectAllPlotting(source) {
  document.querySelectorAll('.check-plotting-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

// 4. Modul Sidang MBKM & Evaluasi Gabungan (60% Kontributor + 40% Dospem)
function openModalJadwalSidang() {
  const modal = document.getElementById('modal-jadwal-sidang');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalJadwalSidang() {
  const modal = document.getElementById('modal-jadwal-sidang');
  if (modal) modal.classList.add('hidden');
}

function handleSaveJadwalSidang(e) {
  e.preventDefault();
  closeModalJadwalSidang();
  alert('Jadwal sidang evaluasi akhir MBKM berhasil disimpan.');
}

function openModalInputNilaiSidang(nama, nim, kontributor, dpl, nilaiKontributor, nilaiDpl) {
  document.getElementById('modal-sidang-mhs-info').textContent = `${nama} (${nim})`;
  document.getElementById('modal-sidang-kontributor').textContent = kontributor;
  document.getElementById('modal-sidang-dpl').textContent = dpl;
  document.getElementById('input-nilai-kontributor').value = nilaiKontributor || '';
  document.getElementById('input-nilai-dpl').value = nilaiDpl || '';
  hitungNilaiAkhirSidang();
  const modal = document.getElementById('modal-input-nilai-sidang');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalInputNilaiSidang() {
  const modal = document.getElementById('modal-input-nilai-sidang');
  if (modal) modal.classList.add('hidden');
}

function hitungNilaiAkhirSidang() {
  const nKontributor = parseFloat(document.getElementById('input-nilai-kontributor').value) || 0;
  const nDpl = parseFloat(document.getElementById('input-nilai-dpl').value) || 0;
  const nAkhir = 0.6 * nKontributor + 0.4 * nDpl;

  let grade = '-';
  if (nAkhir >= 85) grade = 'A';
  else if (nAkhir >= 80) grade = 'AB';
  else if (nAkhir >= 70) grade = 'B';
  else if (nAkhir >= 65) grade = 'BC';
  else if (nAkhir >= 60) grade = 'C';
  else if (nAkhir > 0) grade = 'D/E';

  document.getElementById('display-nilai-angka').textContent = nAkhir.toFixed(1);
  document.getElementById('display-nilai-huruf').textContent = `Grade ${grade}`;
}

function handleSaveNilaiSidang(e) {
  e.preventDefault();
  const nAngka = document.getElementById('display-nilai-angka').textContent;
  const grade = document.getElementById('display-nilai-huruf').textContent;
  closeModalInputNilaiSidang();
  alert(
    `Nilai akhir sidang berhasil disahkan!\nNilai Gabungan: ${nAngka} (${grade})\nStatus: Lulus Evaluasi MBKM.`
  );
}

function filterSidangTable() {
  // Filter controller
}

// 5. Modul Validasi Sertifikat & Bukti Luaran Wajib
function previewDokumenLuaran(filename, tipe, mhsNama) {
  document.getElementById('modal-preview-doc-title').textContent = `Pratinjau Dokumen: ${tipe}`;
  document.getElementById('modal-preview-doc-sub').textContent = `${tipe} • ${mhsNama}`;
  document.getElementById('modal-preview-filename').textContent = filename;
  const modal = document.getElementById('modal-preview-dokumen-luaran');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalPreviewDokumen() {
  const modal = document.getElementById('modal-preview-dokumen-luaran');
  if (modal) modal.classList.add('hidden');
}

function verifikasiSertifikatIndividu(nim, nama, disetujui) {
  if (disetujui) {
    alert(
      `Berkas luaran mahasiswa ${nama} (${nim}) disetujui dan dinyatakan lolos validasi. Nilai siap disinkronkan ke KHS SIADIN.`
    );
  }
}

function mintaRevisiSertifikat(nim, nama) {
  const catatan = prompt(
    `Masukkan catatan revisi untuk ${nama} (${nim}):`,
    'Mohon unggah dokumen bertanda tangan resmi / cap basah kontributor.'
  );
  if (catatan) {
    alert(`Permintaan revisi telah dikirimkan ke mahasiswa dengan catatan: "${catatan}"`);
  }
}

function validasiSemuaSertifikatLolos() {
  const selected = document.querySelectorAll('.check-sertifikat-row:checked');
  if (selected.length === 0) {
    alert('Pilih minimal satu berkas mahasiswa untuk disetujui.');
    return;
  }
  alert(
    `Sukses memvalidasi ${selected.length} berkas luaran sertifikat terpilih. Status KHS diperbarui menjadi siap sinkronisasi.`
  );
}

function toggleSelectAllSertifikat(source) {
  document.querySelectorAll('.check-sertifikat-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

function filterSertifikatTable() {
  // Filter controller
}

// 6. Modul Log Aktivitas & Audit Trail
function exportLogAktivitasCsv() {
  alert('Memulai pengunduhan riwayat audit trail log aktivitas dalam format CSV...');
}

function filterLogTable() {
  // Filter controller
}
