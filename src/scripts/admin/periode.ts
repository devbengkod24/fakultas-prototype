// @ts-nocheck
// ==============================================================================
// PERIODE MBKM & SINKRONISASI UDI
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



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
        <td colspan="7" class="py-8 text-center text-xs text-[#71717a]">
          Belum ada data periode yang sesuai filter.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNumber = startIndex + idx + 1;
        const statusBadge = item.status === 1
          ? '<span class="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">Aktif</span>'
          : '<span class="inline-flex items-center rounded-md border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">Nonaktif</span>';

        return `
        <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
          <td class="h-12 px-2 text-center text-xs font-medium text-[#71717a] w-12">${rowNumber}</td>
          <td class="px-4 text-sm font-medium text-[#09090b]">${item.kode}</td>
          <td class="px-4 text-sm text-[#09090b]">${item.tahun}</td>
          <td class="px-4 text-sm text-[#71717a]">${item.mulai}</td>
          <td class="px-4 text-sm text-[#71717a]">${item.akhir}</td>
          <td class="px-4 text-center">${statusBadge}</td>
          <td class="px-4 text-center">
            <button
              type="button"
              onclick="showEditPeriodeModal(${item.id})"
              class="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
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
      ? 'Menampilkan 0 - 0 dari 0 data'
      : `Menampilkan ${startIndex + 1} - ${endIndex} dari ${totalItems} data`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToPeriodePage(${periodeCurrentPage - 1})"
        ${periodeCurrentPage === 1 ? 'disabled' : ''}
        class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-xs transition-colors cursor-pointer ${
          periodeCurrentPage === 1 ? 'opacity-50 cursor-not-allowed hover:bg-white text-[#71717a]' : 'hover:bg-[#f4f4f5] text-[#09090b]'
        }"
        title="Halaman Sebelumnya"
      >
        <i data-lucide="chevron-left" class="w-4 h-4"></i>
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
            class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
              isActive ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
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
          class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
            periodeCurrentPage === 1 ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
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
              class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
                isActive ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
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
              class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
                isActive ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
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
            class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer bg-[#0655a7] text-white font-semibold shadow-none"
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
          class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
            periodeCurrentPage === totalPages ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
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
        class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-xs transition-colors cursor-pointer ${
          periodeCurrentPage === totalPages ? 'opacity-50 cursor-not-allowed hover:bg-white text-[#71717a]' : 'hover:bg-[#f4f4f5] text-[#09090b]'
        }"
        title="Halaman Selanjutnya"
      >
        <i data-lucide="chevron-right" class="w-4 h-4"></i>
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

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleFilterPeriodeStatus = handleFilterPeriodeStatus;
  (window as any).handlePeriodePerPageChange = handlePeriodePerPageChange;
  (window as any).getFilteredPeriodeData = getFilteredPeriodeData;
  (window as any).renderPeriodeData = renderPeriodeData;
  (window as any).goToPeriodePage = goToPeriodePage;
  (window as any).handleSyncPeriodeData = handleSyncPeriodeData;
  (window as any).showEditPeriodeModal = showEditPeriodeModal;
  (window as any).closeEditPeriodeModal = closeEditPeriodeModal;
  (window as any).handleSaveEditPeriode = handleSaveEditPeriode;
  try {
    Object.defineProperty(window, "periodeCurrentPage", {
      get: () => periodeCurrentPage,
      set: (val) => { periodeCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).periodeCurrentPage = periodeCurrentPage;
  }
  try {
    Object.defineProperty(window, "periodePerPage", {
      get: () => periodePerPage,
      set: (val) => { periodePerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).periodePerPage = periodePerPage;
  }
  try {
    Object.defineProperty(window, "periodeStatusFilter", {
      get: () => periodeStatusFilter,
      set: (val) => { periodeStatusFilter = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).periodeStatusFilter = periodeStatusFilter;
  }
  try {
    Object.defineProperty(window, "activeEditPeriodeId", {
      get: () => activeEditPeriodeId,
      set: (val) => { activeEditPeriodeId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeEditPeriodeId = activeEditPeriodeId;
  }
}

export {
  handleFilterPeriodeStatus,
  handlePeriodePerPageChange,
  getFilteredPeriodeData,
  renderPeriodeData,
  goToPeriodePage,
  handleSyncPeriodeData,
  showEditPeriodeModal,
  closeEditPeriodeModal,
  handleSaveEditPeriode,
  periodeCurrentPage,
  periodePerPage,
  periodeStatusFilter,
  activeEditPeriodeId,
};
