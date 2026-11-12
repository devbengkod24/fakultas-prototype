// @ts-nocheck
// ==============================================================================
// KATEGORI MBKM MANAGEMENT
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


// ==================================================


let currentActiveKategoriId = 'internal_bengkel';
let kategoriSearchKeyword = '';
let kategoriCurrentPage = 1;
let kategoriItemsPerPage = 10;

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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).filterKategoriTable = filterKategoriTable;
  (window as any).goToKategoriPage = goToKategoriPage;
  (window as any).renderKategoriTable = renderKategoriTable;
  (window as any).showAddKategoriModal = showAddKategoriModal;
  (window as any).showEditKategoriModal = showEditKategoriModal;
  (window as any).closeKategoriModal = closeKategoriModal;
  (window as any).handleSaveKategori = handleSaveKategori;
  (window as any).handleDeleteKategori = handleDeleteKategori;
  try {
    Object.defineProperty(window, "currentActiveKategoriId", {
      get: () => currentActiveKategoriId,
      set: (val) => { currentActiveKategoriId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).currentActiveKategoriId = currentActiveKategoriId;
  }
  try {
    Object.defineProperty(window, "kategoriSearchKeyword", {
      get: () => kategoriSearchKeyword,
      set: (val) => { kategoriSearchKeyword = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kategoriSearchKeyword = kategoriSearchKeyword;
  }
  try {
    Object.defineProperty(window, "kategoriCurrentPage", {
      get: () => kategoriCurrentPage,
      set: (val) => { kategoriCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kategoriCurrentPage = kategoriCurrentPage;
  }
  try {
    Object.defineProperty(window, "kategoriItemsPerPage", {
      get: () => kategoriItemsPerPage,
      set: (val) => { kategoriItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).kategoriItemsPerPage = kategoriItemsPerPage;
  }
}

export {
  filterKategoriTable,
  goToKategoriPage,
  renderKategoriTable,
  showAddKategoriModal,
  showEditKategoriModal,
  closeKategoriModal,
  handleSaveKategori,
  handleDeleteKategori,
  currentActiveKategoriId,
  kategoriSearchKeyword,
  kategoriCurrentPage,
  kategoriItemsPerPage,
};
