// @ts-nocheck
// ==============================================================================
// KOORDINATOR 1-TO-N PROGRAM ASSIGNMENT MODAL
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// ====================================================
// 1-to-N MULTI-SELECT PROGRAM ASSIGNMENT MODAL
// ====================================================
let activeAssignKoordinatorId = null;
let assignSelectedPrograms = new Set();
let assignProgramSearchQuery = '';

function showAssignProgramModal(koordinatorId) {
  const koord = koordinatorData.find((k) => k.id === koordinatorId);
  if (!koord) return;

  activeAssignKoordinatorId = koordinatorId;
  document.getElementById('modal-assign-koordinator-id').value = koord.id;
  document.getElementById('modal-assign-dosen-name').textContent = koord.nama;
  document.getElementById('modal-assign-dosen-meta').textContent = `${koord.prodi} • NIDN: ${koord.nidn}`;

  // Inisialisasi set dengan program yang saat ini diampu oleh dosen ini
  assignSelectedPrograms = new Set();
  programListData.forEach((p) => {
    if (p.dosen && p.dosen.trim() === koord.nama.trim()) {
      assignSelectedPrograms.add(p.nama);
    }
  });

  assignProgramSearchQuery = '';
  const searchInput = document.getElementById('search-assign-program');
  if (searchInput) searchInput.value = '';

  renderAssignProgramList();
  document.getElementById('modal-assign-program').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeAssignProgramModal() {
  document.getElementById('modal-assign-program').classList.add('hidden');
  activeAssignKoordinatorId = null;
}

function handleAssignProgramSearch(query) {
  assignProgramSearchQuery = (query || '').toLowerCase().trim();
  renderAssignProgramList();
}

function handleToggleProgramCheck(progNama, isChecked) {
  if (isChecked) {
    assignSelectedPrograms.add(progNama);
  } else {
    assignSelectedPrograms.delete(progNama);
  }
  updateAssignSelectedCount();
}

function handleSelectAllPrograms(checkAll) {
  const koord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  if (!koord) return;

  programListData.forEach((p) => {
    const match =
      !assignProgramSearchQuery ||
      p.nama.toLowerCase().includes(assignProgramSearchQuery) ||
      p.kategori.toLowerCase().includes(assignProgramSearchQuery);

    if (match) {
      if (checkAll) {
        assignSelectedPrograms.add(p.nama);
      } else {
        assignSelectedPrograms.delete(p.nama);
      }
    }
  });
  renderAssignProgramList();
}

function updateAssignSelectedCount() {
  const countEl = document.getElementById('modal-assign-selected-count');
  if (countEl) {
    countEl.textContent = `${assignSelectedPrograms.size} Program Dipilih`;
  }
}

function renderAssignProgramList() {
  const container = document.getElementById('modal-assign-program-list');
  if (!container) return;

  const currentKoord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  const currentKoordNama = currentKoord ? currentKoord.nama : '';

  const filtered = programListData.filter((p) => {
    if (!assignProgramSearchQuery) return true;
    return (
      p.nama.toLowerCase().includes(assignProgramSearchQuery) ||
      p.kategori.toLowerCase().includes(assignProgramSearchQuery) ||
      (p.dosen && p.dosen.toLowerCase().includes(assignProgramSearchQuery))
    );
  });

  updateAssignSelectedCount();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-xs text-[#71717a]">
        Tidak ada program MBKM yang cocok dengan pencarian.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((p) => {
      const isChecked = assignSelectedPrograms.has(p.nama);
      const isCurrentlyAssignedToAnother =
        p.dosen && p.dosen !== currentKoordNama && p.dosen !== 'Belum Ditugaskan' && p.dosen !== '-';

      return `
      <label class="flex items-start gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ${ isChecked ? 'bg-blue-50/50 border-[#0655a7]/40 ring-1 ring-[#0655a7]/20' : 'bg-white border-[#e4e4e7] hover:bg-gray-50' }">
        <input
          type="checkbox"
          ${isChecked ? 'checked' : ''}
          onchange="handleToggleProgramCheck('${p.nama.replace(/'/g, "\\'")}', this.checked)"
          class="mt-1 w-4 h-4 rounded text-[#0655a7] focus:ring-[#0655a7] border-gray-300 rounded cursor-pointer"
        />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <div class="font-semibold text-xs text-[#09090b] truncate">${p.nama}</div>
            <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-[#71717a] border border-gray-200 shrink-0">
              ${p.kategori}
            </span>
          </div>
          <div class="text-[11px] text-[#71717a] mt-0.5 flex flex-wrap items-center gap-2">
            <span>Konversi: <b class="text-[#09090b]">${p.sks} SKS</b></span>
            <span>•</span>
            ${
              isCurrentlyAssignedToAnother
                ? `<span class="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">Dialihkan dari: ${p.dosen}</span>`
                : p.dosen === currentKoordNama
                  ? `<span class="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">Sedang diampu dosen ini</span>`
                  : `<span class="text-[#71717a] text-[10px]">Status: Belum Ditugaskan</span>`
            }
          </div>
        </div>
      </label>
    `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

function handleSaveProgramAssignment(e) {
  e.preventDefault();
  const koord = koordinatorData.find((k) => k.id === activeAssignKoordinatorId);
  if (!koord) return;

  // 1-to-N assignment update:
  programListData.forEach((p) => {
    if (assignSelectedPrograms.has(p.nama)) {
      // Ditugaskan ke dosen ini
      p.dosen = koord.nama;
    } else if (p.dosen === koord.nama) {
      // Dilepas dari dosen ini
      p.dosen = 'Belum Ditugaskan';
    }
  });

  closeAssignProgramModal();
  renderKoordinatorTable();
  renderProgramTable();
  alert(`Penugasan program untuk ${koord.nama} berhasil diperbarui.`);
}

// --------------------------------------------------
// SYNC DYNAMIC DROPDOWN DI FORM PROGRAM (SUBVIEW EDIT)
// --------------------------------------------------
function populateProgramDosenDropdown() {
  const select = document.getElementById('edit-dosen-program');
  if (!select) return;

  const currentVal = select.value;
  let html = '';
  html += `<option value="Belum Ditugaskan">-- Belum Ditugaskan --</option>`;
  koordinatorData.forEach((k) => {
    html += `<option value="${k.nama}">${k.nama} (NIDN: ${k.nidn})</option>`;
  });

  select.innerHTML = html;
  if (currentVal && koordinatorData.some((k) => k.nama === currentVal)) {
    select.value = currentVal;
  } else if (koordinatorData.length > 0) {
    select.value = koordinatorData[0].nama;
  }
}

// --------------------------------------------------
// SYNC DYNAMIC DROPDOWN DI FORM PROGRAM (SUBVIEW EDIT)
// --------------------------------------------------
function populateProgramKategoriDropdown() {
  const select = document.getElementById('edit-kategori-program');
  if (!select) return;

  const currentVal = select.value;
  const eksternalList = kategoriData.filter((k) => k.type === 'eksternal');
  const internalList = kategoriData.filter((k) => k.type === 'internal');

  let html = '';
  if (eksternalList.length > 0) {
    html += `<optgroup label="MBKM Eksternal (Pendaftaran Mandiri & Seleksi)">`;
    eksternalList.forEach((k) => {
      html += `<option value="${k.id}">${k.nama}</option>`;
    });
    html += `</optgroup>`;
  }

  if (internalList.length > 0) {
    html += `<optgroup label="MBKM Internal (Penugasan Kontributor / Auto-Lolos)">`;
    internalList.forEach((k) => {
      html += `<option value="${k.id}">${k.nama}</option>`;
    });
    html += `</optgroup>`;
  }

  select.innerHTML = html;
  if (currentVal && kategoriData.some((k) => k.id === currentVal)) {
    select.value = currentVal;
  } else if (kategoriData.length > 0) {
    select.value = kategoriData[0].id;
  }
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).showAssignProgramModal = showAssignProgramModal;
  (window as any).closeAssignProgramModal = closeAssignProgramModal;
  (window as any).handleAssignProgramSearch = handleAssignProgramSearch;
  (window as any).handleToggleProgramCheck = handleToggleProgramCheck;
  (window as any).handleSelectAllPrograms = handleSelectAllPrograms;
  (window as any).updateAssignSelectedCount = updateAssignSelectedCount;
  (window as any).renderAssignProgramList = renderAssignProgramList;
  (window as any).handleSaveProgramAssignment = handleSaveProgramAssignment;
  (window as any).populateProgramDosenDropdown = populateProgramDosenDropdown;
  (window as any).populateProgramKategoriDropdown = populateProgramKategoriDropdown;
  try {
    Object.defineProperty(window, "activeAssignKoordinatorId", {
      get: () => activeAssignKoordinatorId,
      set: (val) => { activeAssignKoordinatorId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeAssignKoordinatorId = activeAssignKoordinatorId;
  }
  try {
    Object.defineProperty(window, "assignSelectedPrograms", {
      get: () => assignSelectedPrograms,
      set: (val) => { assignSelectedPrograms = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).assignSelectedPrograms = assignSelectedPrograms;
  }
  try {
    Object.defineProperty(window, "assignProgramSearchQuery", {
      get: () => assignProgramSearchQuery,
      set: (val) => { assignProgramSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).assignProgramSearchQuery = assignProgramSearchQuery;
  }
}

export {
  showAssignProgramModal,
  closeAssignProgramModal,
  handleAssignProgramSearch,
  handleToggleProgramCheck,
  handleSelectAllPrograms,
  updateAssignSelectedCount,
  renderAssignProgramList,
  handleSaveProgramAssignment,
  populateProgramDosenDropdown,
  populateProgramKategoriDropdown,
  activeAssignKoordinatorId,
  assignSelectedPrograms,
  assignProgramSearchQuery,
};
