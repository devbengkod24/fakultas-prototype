// @ts-nocheck
// ==============================================================================
// APPLICATION LIFECYCLE INIT & EVENT LISTENERS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

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
      window.location.href = '/koordinator/kontributor';
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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).initApp = initApp;
}

export {
  initApp,
};
