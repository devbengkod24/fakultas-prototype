// @ts-nocheck
// ==============================================================================
// KOORDINATOR DOSEN DIRECTORY & DASHBOARD WIDGET
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



let koordinatorCurrentPage = 1;
let koordinatorItemsPerPage = 10;
let koordinatorSearchQuery = '';
let koordinatorFilterProdi = '';

function getProgramsForKoordinator(dosenName) {
  if (!dosenName) return [];
  return programListData.filter((p) => p.dosen && p.dosen.trim() === dosenName.trim());
}

function handleSearchKoordinator(query) {
  koordinatorSearchQuery = (query || '').toLowerCase().trim();
  koordinatorCurrentPage = 1;
  renderKoordinatorTable();
}

function handleFilterKoordinatorProdi(prodi) {
  koordinatorFilterProdi = (prodi || '').trim();
  koordinatorCurrentPage = 1;
  renderKoordinatorTable();
}

function goToKoordinatorPage(page) {
  koordinatorCurrentPage = page;
  renderKoordinatorTable();
}

function renderKoordinatorTable() {
  const tbody = document.getElementById('koordinator-table-tbody');
  const infoEl = document.getElementById('koordinator-table-info');
  const controlsEl = document.getElementById('koordinator-pagination-controls');
  if (!tbody) return;

  // Hitung Statistik
  const totalKoord = koordinatorData.length;
  let aktifCount = 0;
  let kosongCount = 0;
  let totalAssignedPrograms = 0;

  koordinatorData.forEach((k) => {
    const progs = getProgramsForKoordinator(k.nama);
    if (progs.length > 0) {
      aktifCount++;
      totalAssignedPrograms += progs.length;
    } else {
      kosongCount++;
    }
  });

  const statTotal = document.getElementById('stat-total-koordinator');
  const statAktif = document.getElementById('stat-aktif-koordinator');
  const statKosong = document.getElementById('stat-kosong-koordinator');
  const statCover = document.getElementById('stat-program-tercover');

  if (statTotal) statTotal.textContent = `${totalKoord} Dosen`;
  if (statAktif) statAktif.textContent = `${aktifCount} Dosen`;
  if (statKosong) statKosong.textContent = `${kosongCount} Dosen`;
  if (statCover) statCover.textContent = `${totalAssignedPrograms} Program`;

  // Filter Data Koordinator
  const filtered = koordinatorData.filter((k) => {
    const matchQuery =
      !koordinatorSearchQuery ||
      k.nama.toLowerCase().includes(koordinatorSearchQuery) ||
      k.nidn.toLowerCase().includes(koordinatorSearchQuery) ||
      k.prodi.toLowerCase().includes(koordinatorSearchQuery) ||
      getProgramsForKoordinator(k.nama).some((p) => p.nama.toLowerCase().includes(koordinatorSearchQuery));

    const matchProdi =
      !koordinatorFilterProdi || k.prodi.toLowerCase().includes(koordinatorFilterProdi.toLowerCase());

    return matchQuery && matchProdi;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / koordinatorItemsPerPage));
  if (koordinatorCurrentPage > totalPages) koordinatorCurrentPage = totalPages;

  const startIndex = (koordinatorCurrentPage - 1) * koordinatorItemsPerPage;
  const endIndex = Math.min(startIndex + koordinatorItemsPerPage, totalItems);
  const pageItems = filtered.slice(startIndex, endIndex);

  if (totalItems === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-xs text-[#71717a]">Tidak ada data koordinator ditemukan.</td></tr>`;
    if (infoEl) infoEl.textContent = 'Showing 0 to 0 of 0 entries';
    if (controlsEl) controlsEl.innerHTML = '';
    return;
  }

  tbody.innerHTML = pageItems
    .map((item, idx) => {
      const rowNumber = startIndex + idx + 1;
      const progs = getProgramsForKoordinator(item.nama);
      const count = progs.length;

      // Badges untuk program diampu (1:N)
      let progsHtml = '';
      if (count === 0) {
        progsHtml = `
          <div class="flex items-center gap-1.5 text-xs">
            <span class="italic text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Belum ada program diampu
            </span>
          </div>
        `;
      } else {
        progsHtml = `
          <div class="flex flex-wrap items-center gap-1.5 max-w-xl">
            ${progs
              .map(
                (p) => `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-50 text-[#0655a7] border border-blue-200/80" title="${p.nama} (${p.kategori})">
                <span class="truncate max-w-[210px]">${p.nama}</span>
              </span>
            `
              )
              .join('')}
          </div>
        `;
      }

      // Beban tugas badge
      let bebanBadge = '';
      if (count === 0) {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Tersedia (0)</span>`;
      } else if (count <= 2) {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">${count} Program</span>`;
      } else {
        bebanBadge = `<span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-[#0655a7] border border-blue-200">${count} Program</span>`;
      }

      return `
      <tr class="transition-colors hover:bg-gray-50/80">
        <td class="py-2.5 px-2.5 text-center text-[#71717a] text-[11px]">${rowNumber}</td>
        <td class="py-2.5 px-3">
          <div class="font-semibold text-[#09090b] text-xs">${item.nama}</div>
          <div class="text-[10px] text-[#71717a] flex items-center gap-2 mt-0.5">
            <span class="">NIDN: ${item.nidn}</span>
            <span>•</span>
            <span>${item.email}</span>
          </div>
        </td>
        <td class="py-2.5 px-3">
          <span class="text-xs text-[#3f3f46] font-medium">${item.prodi}</span>
        </td>
        <td class="py-2.5 px-3">
          ${progsHtml}
        </td>
        <td class="py-2.5 px-3 text-center">
          ${bebanBadge}
        </td>
        <td class="px-3 py-2.5 text-center">
          <div class="flex items-center justify-center gap-1.5">
            <button
              type="button"
              onclick="showAssignProgramModal('${item.id}')"
              class="px-2.5 py-1 rounded-md bg-[#0655a7] hover:bg-[#114d91] text-white text-[11px] font-semibold flex items-center gap-1 shadow-none transition-colors"
              title="Alokasikan Program MBKM yang Diampu Dosen Ini"
            >
              <i data-lucide="layers" class="w-3 h-3"></i>
              <span>Tugaskan</span>
            </button>
            <button
              type="button"
              onclick="showEditKoordinatorModal('${item.id}')"
              class="p-1 rounded text-[#71717a] hover:text-[#0655a7] hover:bg-gray-100 transition-colors"
              title="Edit Profil Koordinator"
            >
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
            <button
              type="button"
              onclick="handleDeleteKoordinator('${item.id}')"
              class="p-1 rounded text-[#71717a] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Hapus Koordinator"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join('');

  if (infoEl) {
    infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`;
  }

  if (controlsEl) {
    let buttonsHtml = '';
    const prevDisabled = koordinatorCurrentPage === 1;
    buttonsHtml += `
      <button
        type="button"
        ${prevDisabled ? 'disabled' : ''}
        onclick="goToKoordinatorPage(${koordinatorCurrentPage - 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      const isCurrent = p === koordinatorCurrentPage;
      buttonsHtml += `
        <button
          type="button"
          onclick="goToKoordinatorPage(${p})"
          class="w-6 h-6 flex items-center justify-center rounded-md text-[11px] font-semibold transition-colors ${ isCurrent ? 'bg-[#0655a7] text-white shadow-none' : 'border border-[#e4e4e7] text-[#3f3f46] hover:bg-gray-50' }"
        >
          ${p}
        </button>
      `;
    }

    const nextDisabled = koordinatorCurrentPage === totalPages;
    buttonsHtml += `
      <button
        type="button"
        ${nextDisabled ? 'disabled' : ''}
        onclick="goToKoordinatorPage(${koordinatorCurrentPage + 1})"
        class="px-2 py-0.5 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#3f3f46] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    `;

    controlsEl.innerHTML = buttonsHtml;
  }

  renderDashboardKoordinatorWidget();
  if (window.lucide) window.lucide.createIcons();
}


function handleDashboardSksChange(sks) {
  const data = SKS_PIPELINE_DATA[sks] || SKS_PIPELINE_DATA['20'];
  const reqEl = document.getElementById('funnel-sks-request');
  const revEl = document.getElementById('funnel-sks-review');
  const mapEl = document.getElementById('funnel-sks-mapping');
  const skEl = document.getElementById('funnel-sks-sk');
  const totalEl = document.getElementById('dashboard-sks-total');

  if (reqEl) reqEl.textContent = data.request;
  if (revEl) revEl.textContent = data.review;
  if (mapEl) mapEl.textContent = data.mapping;
  if (skEl) skEl.textContent = data.sk;
  if (totalEl) totalEl.textContent = data.totalText;
}

function renderDashboardKoordinatorWidget() {
  const totalCardKoord = document.getElementById('dash-card-total-koordinator');
  const totalCardProg = document.getElementById('dash-card-total-program');

  if (totalCardProg) {
    totalCardProg.textContent = `${programListData.length} Program`;
  }
  if (totalCardKoord) {
    const aktif = koordinatorData.filter((k) => getProgramsForKoordinator(k.nama).length > 0).length;
    const kosong = koordinatorData.length - aktif;
    totalCardKoord.textContent = `${koordinatorData.length} Dosen`;
    const subP = totalCardKoord.nextElementSibling;
    if (subP) subP.textContent = `${aktif} aktif mengampu, ${kosong} belum ditugaskan`;
  }
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).getProgramsForKoordinator = getProgramsForKoordinator;
  (window as any).handleSearchKoordinator = handleSearchKoordinator;
  (window as any).handleFilterKoordinatorProdi = handleFilterKoordinatorProdi;
  (window as any).goToKoordinatorPage = goToKoordinatorPage;
  (window as any).renderKoordinatorTable = renderKoordinatorTable;
  (window as any).handleDashboardSksChange = handleDashboardSksChange;
  (window as any).renderDashboardKoordinatorWidget = renderDashboardKoordinatorWidget;
  try {
    Object.defineProperty(window, "koordinatorCurrentPage", {
      get: () => koordinatorCurrentPage,
      set: (val) => { koordinatorCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).koordinatorCurrentPage = koordinatorCurrentPage;
  }
  try {
    Object.defineProperty(window, "koordinatorItemsPerPage", {
      get: () => koordinatorItemsPerPage,
      set: (val) => { koordinatorItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).koordinatorItemsPerPage = koordinatorItemsPerPage;
  }
  try {
    Object.defineProperty(window, "koordinatorSearchQuery", {
      get: () => koordinatorSearchQuery,
      set: (val) => { koordinatorSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).koordinatorSearchQuery = koordinatorSearchQuery;
  }
  try {
    Object.defineProperty(window, "koordinatorFilterProdi", {
      get: () => koordinatorFilterProdi,
      set: (val) => { koordinatorFilterProdi = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).koordinatorFilterProdi = koordinatorFilterProdi;
  }
}

export {
  getProgramsForKoordinator,
  handleSearchKoordinator,
  handleFilterKoordinatorProdi,
  goToKoordinatorPage,
  renderKoordinatorTable,
  handleDashboardSksChange,
  renderDashboardKoordinatorWidget,
  koordinatorCurrentPage,
  koordinatorItemsPerPage,
  koordinatorSearchQuery,
  koordinatorFilterProdi,
};
