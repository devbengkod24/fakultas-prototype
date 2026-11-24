// @ts-nocheck
// ==============================================================================
// LOGBOOK MAHASISWA MONITORING & DETAIL SUBVIEW
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



let logbookCurrentPage = 1;
let logbookItemsPerPage = 10;
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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchLogbook = handleSearchLogbook;
  (window as any).getFilteredLogbookData = getFilteredLogbookData;
  (window as any).renderLogbookTable = renderLogbookTable;
  (window as any).renderLogbookPaginationControls = renderLogbookPaginationControls;
  (window as any).goToLogbookPage = goToLogbookPage;
  (window as any).showLogbookDetail = showLogbookDetail;
  (window as any).hideLogbookDetail = hideLogbookDetail;
  try {
    Object.defineProperty(window, "logbookCurrentPage", {
      get: () => logbookCurrentPage,
      set: (val) => { logbookCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).logbookCurrentPage = logbookCurrentPage;
  }
  try {
    Object.defineProperty(window, "logbookItemsPerPage", {
      get: () => logbookItemsPerPage,
      set: (val) => { logbookItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).logbookItemsPerPage = logbookItemsPerPage;
  }
  try {
    Object.defineProperty(window, "logbookSearchQuery", {
      get: () => logbookSearchQuery,
      set: (val) => { logbookSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).logbookSearchQuery = logbookSearchQuery;
  }
}

export {
  handleSearchLogbook,
  getFilteredLogbookData,
  renderLogbookTable,
  renderLogbookPaginationControls,
  goToLogbookPage,
  showLogbookDetail,
  hideLogbookDetail,
  logbookCurrentPage,
  logbookItemsPerPage,
  logbookSearchQuery,
};
