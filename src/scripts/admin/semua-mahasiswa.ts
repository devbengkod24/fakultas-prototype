// @ts-nocheck
// ==============================================================================
// DIREKTORI SEMUA MAHASISWA AKTIF & EXPORT
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



let semuaMhsSearchQuery = '';
let semuaMhsFilterKontributor = 'semua';
let semuaMhsFilterProdi = 'semua';
let semuaMhsCurrentPage = 1;
let semuaMhsItemsPerPage = 10;

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


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchSemuaMhs = handleSearchSemuaMhs;
  (window as any).handleFilterSemuaMhsKontributor = handleFilterSemuaMhsKontributor;
  (window as any).handleFilterSemuaMhsProdi = handleFilterSemuaMhsProdi;
  (window as any).getFilteredSemuaMhsData = getFilteredSemuaMhsData;
  (window as any).renderSemuaMhsTable = renderSemuaMhsTable;
  (window as any).goToSemuaMhsPage = goToSemuaMhsPage;
  (window as any).exportDataMahasiswa = exportDataMahasiswa;
  (window as any).exportDataPelamar = exportDataPelamar;
  try {
    Object.defineProperty(window, "semuaMhsSearchQuery", {
      get: () => semuaMhsSearchQuery,
      set: (val) => { semuaMhsSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).semuaMhsSearchQuery = semuaMhsSearchQuery;
  }
  try {
    Object.defineProperty(window, "semuaMhsFilterKontributor", {
      get: () => semuaMhsFilterKontributor,
      set: (val) => { semuaMhsFilterKontributor = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).semuaMhsFilterKontributor = semuaMhsFilterKontributor;
  }
  try {
    Object.defineProperty(window, "semuaMhsFilterProdi", {
      get: () => semuaMhsFilterProdi,
      set: (val) => { semuaMhsFilterProdi = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).semuaMhsFilterProdi = semuaMhsFilterProdi;
  }
  try {
    Object.defineProperty(window, "semuaMhsCurrentPage", {
      get: () => semuaMhsCurrentPage,
      set: (val) => { semuaMhsCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).semuaMhsCurrentPage = semuaMhsCurrentPage;
  }
  try {
    Object.defineProperty(window, "semuaMhsItemsPerPage", {
      get: () => semuaMhsItemsPerPage,
      set: (val) => { semuaMhsItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).semuaMhsItemsPerPage = semuaMhsItemsPerPage;
  }
}

export {
  handleSearchSemuaMhs,
  handleFilterSemuaMhsKontributor,
  handleFilterSemuaMhsProdi,
  getFilteredSemuaMhsData,
  renderSemuaMhsTable,
  goToSemuaMhsPage,
  exportDataMahasiswa,
  exportDataPelamar,
  semuaMhsSearchQuery,
  semuaMhsFilterKontributor,
  semuaMhsFilterProdi,
  semuaMhsCurrentPage,
  semuaMhsItemsPerPage,
};
