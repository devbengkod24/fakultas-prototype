// @ts-nocheck
// ==============================================================================
// ADMIN NAVIGATION & SIDEBAR STATE
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


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



// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).toggleMbkmSubmenu = toggleMbkmSubmenu;
  (window as any).toggleSidangSubmenu = toggleSidangSubmenu;
  (window as any).toggleMahasiswaSubmenu = toggleMahasiswaSubmenu;
  (window as any).toggleDosenSubmenu = toggleDosenSubmenu;
  (window as any).updateBreadcrumb = updateBreadcrumb;
  (window as any).switchTab = switchTab;
  (window as any).toggleSidebar = toggleSidebar;
  try {
    Object.defineProperty(window, "mahasiswaSubmenuOpen", {
      get: () => mahasiswaSubmenuOpen,
      set: (val) => { mahasiswaSubmenuOpen = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).mahasiswaSubmenuOpen = mahasiswaSubmenuOpen;
  }
  try {
    Object.defineProperty(window, "dosenSubmenuOpen", {
      get: () => dosenSubmenuOpen,
      set: (val) => { dosenSubmenuOpen = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).dosenSubmenuOpen = dosenSubmenuOpen;
  }
  try {
    Object.defineProperty(window, "mbkmSubmenuOpen", {
      get: () => mbkmSubmenuOpen,
      set: (val) => { mbkmSubmenuOpen = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).mbkmSubmenuOpen = mbkmSubmenuOpen;
  }
  try {
    Object.defineProperty(window, "sidangSubmenuOpen", {
      get: () => sidangSubmenuOpen,
      set: (val) => { sidangSubmenuOpen = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).sidangSubmenuOpen = sidangSubmenuOpen;
  }
}

export {
  toggleMbkmSubmenu,
  toggleSidangSubmenu,
  toggleMahasiswaSubmenu,
  toggleDosenSubmenu,
  updateBreadcrumb,
  switchTab,
  toggleSidebar,
  mahasiswaSubmenuOpen,
  dosenSubmenuOpen,
  mbkmSubmenuOpen,
  sidangSubmenuOpen,
};
