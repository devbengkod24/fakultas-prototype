// @ts-nocheck
// ==============================================================================
// PENGUMUMAN MBKM & COUNTDOWN TIMER
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


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
let pengumumanItemsPerPage = 5;
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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).updateCountdownTimer = updateCountdownTimer;
  (window as any).handleSearchPengumuman = handleSearchPengumuman;
  (window as any).handleFilterPengumumanSasaran = handleFilterPengumumanSasaran;
  (window as any).handleFilterPengumumanStatus = handleFilterPengumumanStatus;
  (window as any).getFilteredPengumumanData = getFilteredPengumumanData;
  (window as any).renderPengumumanCards = renderPengumumanCards;
  (window as any).goToPengumumanPage = goToPengumumanPage;
  (window as any).showDetailPengumumanModal = showDetailPengumumanModal;
  (window as any).closeDetailPengumumanModal = closeDetailPengumumanModal;
  (window as any).showBuatPengumumanModal = showBuatPengumumanModal;
  (window as any).closeBuatPengumumanModal = closeBuatPengumumanModal;
  (window as any).handleSavePengumuman = handleSavePengumuman;
  (window as any).toggleArchivePengumuman = toggleArchivePengumuman;
  (window as any).showDeletePengumumanModal = showDeletePengumumanModal;
  (window as any).closeDeletePengumumanModal = closeDeletePengumumanModal;
  (window as any).confirmDeletePengumuman = confirmDeletePengumuman;
  try {
    Object.defineProperty(window, "countdownTarget", {
      get: () => countdownTarget,
      set: (val) => { countdownTarget = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).countdownTarget = countdownTarget;
  }
  try {
    Object.defineProperty(window, "pengumumanSearchQuery", {
      get: () => pengumumanSearchQuery,
      set: (val) => { pengumumanSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pengumumanSearchQuery = pengumumanSearchQuery;
  }
  try {
    Object.defineProperty(window, "pengumumanFilterSasaran", {
      get: () => pengumumanFilterSasaran,
      set: (val) => { pengumumanFilterSasaran = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pengumumanFilterSasaran = pengumumanFilterSasaran;
  }
  try {
    Object.defineProperty(window, "pengumumanFilterStatus", {
      get: () => pengumumanFilterStatus,
      set: (val) => { pengumumanFilterStatus = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pengumumanFilterStatus = pengumumanFilterStatus;
  }
  try {
    Object.defineProperty(window, "pengumumanCurrentPage", {
      get: () => pengumumanCurrentPage,
      set: (val) => { pengumumanCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pengumumanCurrentPage = pengumumanCurrentPage;
  }
  try {
    Object.defineProperty(window, "pengumumanItemsPerPage", {
      get: () => pengumumanItemsPerPage,
      set: (val) => { pengumumanItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pengumumanItemsPerPage = pengumumanItemsPerPage;
  }
  try {
    Object.defineProperty(window, "activeDeletePengumumanId", {
      get: () => activeDeletePengumumanId,
      set: (val) => { activeDeletePengumumanId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeDeletePengumumanId = activeDeletePengumumanId;
  }
}

export {
  updateCountdownTimer,
  handleSearchPengumuman,
  handleFilterPengumumanSasaran,
  handleFilterPengumumanStatus,
  getFilteredPengumumanData,
  renderPengumumanCards,
  goToPengumumanPage,
  showDetailPengumumanModal,
  closeDetailPengumumanModal,
  showBuatPengumumanModal,
  closeBuatPengumumanModal,
  handleSavePengumuman,
  toggleArchivePengumuman,
  showDeletePengumumanModal,
  closeDeletePengumumanModal,
  confirmDeletePengumuman,
  countdownTarget,
  pengumumanSearchQuery,
  pengumumanFilterSasaran,
  pengumumanFilterStatus,
  pengumumanCurrentPage,
  pengumumanItemsPerPage,
  activeDeletePengumumanId,
};
