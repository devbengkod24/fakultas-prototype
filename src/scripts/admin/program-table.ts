// @ts-nocheck
// ==============================================================================
// PROGRAM MBKM TABLE & PAGINATION
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


let programCurrentPage = 1;
let programItemsPerPage = 10;
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


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchProgram = handleSearchProgram;
  (window as any).goToProgramPage = goToProgramPage;
  (window as any).renderProgramTable = renderProgramTable;
  try {
    Object.defineProperty(window, "programCurrentPage", {
      get: () => programCurrentPage,
      set: (val) => { programCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).programCurrentPage = programCurrentPage;
  }
  try {
    Object.defineProperty(window, "programItemsPerPage", {
      get: () => programItemsPerPage,
      set: (val) => { programItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).programItemsPerPage = programItemsPerPage;
  }
  try {
    Object.defineProperty(window, "programSearchQuery", {
      get: () => programSearchQuery,
      set: (val) => { programSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).programSearchQuery = programSearchQuery;
  }
  try {
    Object.defineProperty(window, "currentEditingProgramTitle", {
      get: () => currentEditingProgramTitle,
      set: (val) => { currentEditingProgramTitle = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).currentEditingProgramTitle = currentEditingProgramTitle;
  }
}

export {
  handleSearchProgram,
  goToProgramPage,
  renderProgramTable,
  programCurrentPage,
  programItemsPerPage,
  programSearchQuery,
  currentEditingProgramTitle,
};
