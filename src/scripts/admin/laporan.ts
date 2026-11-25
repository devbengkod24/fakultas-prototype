// @ts-nocheck
// ==============================================================================
// LAPORAN AKHIR MAHASISWA MONITORING
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


let laporanCurrentPage = 1;
let laporanItemsPerPage = 10;
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


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchLaporan = handleSearchLaporan;
  (window as any).getFilteredLaporanData = getFilteredLaporanData;
  (window as any).renderLaporanTable = renderLaporanTable;
  (window as any).renderLaporanPaginationControls = renderLaporanPaginationControls;
  (window as any).changeLaporanItemsPerPage = changeLaporanItemsPerPage;
  (window as any).goToLaporanPage = goToLaporanPage;
  try {
    Object.defineProperty(window, "laporanCurrentPage", {
      get: () => laporanCurrentPage,
      set: (val) => { laporanCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).laporanCurrentPage = laporanCurrentPage;
  }
  try {
    Object.defineProperty(window, "laporanItemsPerPage", {
      get: () => laporanItemsPerPage,
      set: (val) => { laporanItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).laporanItemsPerPage = laporanItemsPerPage;
  }
  try {
    Object.defineProperty(window, "laporanSearchQuery", {
      get: () => laporanSearchQuery,
      set: (val) => { laporanSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).laporanSearchQuery = laporanSearchQuery;
  }
}

export {
  handleSearchLaporan,
  getFilteredLaporanData,
  renderLaporanTable,
  renderLaporanPaginationControls,
  changeLaporanItemsPerPage,
  goToLaporanPage,
  laporanCurrentPage,
  laporanItemsPerPage,
  laporanSearchQuery,
};
