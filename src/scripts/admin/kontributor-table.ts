// @ts-nocheck
// ==============================================================================
// DIREKTORI KONTRIBUTOR MITRA MBKM
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


// 4. MODUL KONTRIBUTOR (REVISI TABEL & HERO CARD DETAIL KONTRIBUTOR + ADAPTIVE TABS)
let kontributorCategoryTab = 'internal'; // 'internal' | 'eksternal'
let modalKontributorType = 'internal';
let activeDetailKontributorId = null;



let kontributorSearchQuery = '';
let kontributorCurrentPage = 1;
let kontributorItemsPerPage = 10;
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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchKontributor = handleSearchKontributor;
  (window as any).switchKontributorCategoryTab = switchKontributorCategoryTab;
  (window as any).updateKontributorCategoryBadges = updateKontributorCategoryBadges;
  (window as any).getFilteredKontributorData = getFilteredKontributorData;
  (window as any).renderKontributorTable = renderKontributorTable;
  (window as any).goToKontributorPage = goToKontributorPage;
  (window as any).toggleKontributorStatus = toggleKontributorStatus;
  (window as any).openModalToggleStatusKontributor = openModalToggleStatusKontributor;
  (window as any).closeModalToggleStatusKontributor = closeModalToggleStatusKontributor;
  (window as any).confirmToggleStatusKontributor = confirmToggleStatusKontributor;
  (window as any).showTambahKontributorModal = showTambahKontributorModal;
  (window as any).closeTambahKontributorModal = closeTambahKontributorModal;
  (window as any).handleModalKontributorTypeChange = handleModalKontributorTypeChange;
  (window as any).handleSubmitTambahKontributor = handleSubmitTambahKontributor;
  (window as any).handleSaveKontributor = handleSaveKontributor;
  try {
    Object.defineProperty(window, "kontributorCategoryTab", {
      get: () => kontributorCategoryTab,
      set: (val) => { kontributorCategoryTab = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kontributorCategoryTab = kontributorCategoryTab;
  }
  try {
    Object.defineProperty(window, "modalKontributorType", {
      get: () => modalKontributorType,
      set: (val) => { modalKontributorType = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).modalKontributorType = modalKontributorType;
  }
  try {
    Object.defineProperty(window, "activeDetailKontributorId", {
      get: () => activeDetailKontributorId,
      set: (val) => { activeDetailKontributorId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeDetailKontributorId = activeDetailKontributorId;
  }
  try {
    Object.defineProperty(window, "kontributorSearchQuery", {
      get: () => kontributorSearchQuery,
      set: (val) => { kontributorSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kontributorSearchQuery = kontributorSearchQuery;
  }
  try {
    Object.defineProperty(window, "kontributorCurrentPage", {
      get: () => kontributorCurrentPage,
      set: (val) => { kontributorCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kontributorCurrentPage = kontributorCurrentPage;
  }
  try {
    Object.defineProperty(window, "kontributorItemsPerPage", {
      get: () => kontributorItemsPerPage,
      set: (val) => { kontributorItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kontributorItemsPerPage = kontributorItemsPerPage;
  }
  try {
    Object.defineProperty(window, "modalKontributorActiveTab", {
      get: () => modalKontributorActiveTab,
      set: (val) => { modalKontributorActiveTab = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).modalKontributorActiveTab = modalKontributorActiveTab;
  }
  try {
    Object.defineProperty(window, "pendingToggleKontributorId", {
      get: () => pendingToggleKontributorId,
      set: (val) => { pendingToggleKontributorId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pendingToggleKontributorId = pendingToggleKontributorId;
  }
}

export {
  handleSearchKontributor,
  switchKontributorCategoryTab,
  updateKontributorCategoryBadges,
  getFilteredKontributorData,
  renderKontributorTable,
  goToKontributorPage,
  toggleKontributorStatus,
  openModalToggleStatusKontributor,
  closeModalToggleStatusKontributor,
  confirmToggleStatusKontributor,
  showTambahKontributorModal,
  closeTambahKontributorModal,
  handleModalKontributorTypeChange,
  handleSubmitTambahKontributor,
  handleSaveKontributor,
  kontributorCategoryTab,
  modalKontributorType,
  activeDetailKontributorId,
  kontributorSearchQuery,
  kontributorCurrentPage,
  kontributorItemsPerPage,
  modalKontributorActiveTab,
  pendingToggleKontributorId,
};
