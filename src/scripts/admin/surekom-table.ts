// @ts-nocheck
// ==============================================================================
// SURAT REKOMENDASI TABLE & VALIDATION MODAL
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



let surekomCurrentPage = 1;
let surekomItemsPerPage = 8;
let surekomSearchQuery = '';
let surekomFilterStatus = 'pending'; // Default: Menunggu Validasi
let surekomFilterProgram = 'semua';
let surekomFilterProdi = 'semua';
let activeModalSurekomId = null;

function handleSearchSurekom(query) {
  surekomSearchQuery = (query || '').toLowerCase().trim();
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomStatus(val) {
  surekomFilterStatus = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomProgram(val) {
  surekomFilterProgram = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function handleFilterSurekomProdi(val) {
  surekomFilterProdi = val;
  surekomCurrentPage = 1;
  renderSurekomTable();
}

function getFilteredSurekomData() {
  return surekomListData.filter((item) => {
    const matchQuery =
      !surekomSearchQuery ||
      item.nama.toLowerCase().includes(surekomSearchQuery) ||
      item.nim.toLowerCase().includes(surekomSearchQuery) ||
      item.program.toLowerCase().includes(surekomSearchQuery) ||
      (item.kontributor && item.kontributor.toLowerCase().includes(surekomSearchQuery));

    const matchStatus =
      surekomFilterStatus === 'semua' || item.status === surekomFilterStatus;

    const matchProgram =
      surekomFilterProgram === 'semua' ||
      item.program.toLowerCase().includes(surekomFilterProgram.toLowerCase()) ||
      (item.kontributor && item.kontributor.toLowerCase().includes(surekomFilterProgram.toLowerCase()));

    const matchProdi =
      surekomFilterProdi === 'semua' ||
      item.prodi.toUpperCase().includes(surekomFilterProdi.toUpperCase());

    return matchQuery && matchStatus && matchProgram && matchProdi;
  });
}

function renderSurekomTable() {
  const tbody = document.getElementById('surekom-table-tbody');
  const infoEl = document.getElementById('surekom-table-info');
  const paginationControls = document.getElementById('surekom-pagination-controls');
  if (!tbody) return;

  const filtered = getFilteredSurekomData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / surekomItemsPerPage) || 1;

  if (surekomCurrentPage > totalPages) {
    surekomCurrentPage = totalPages;
  }

  const startIndex = (surekomCurrentPage - 1) * surekomItemsPerPage;
  const endIndex = Math.min(startIndex + surekomItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  if (currentSlice.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-8 text-center text-sm text-[#71717a]">
          Tidak ada permohonan surat rekomendasi yang cocok dengan kriteria filter.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = currentSlice
      .map((item, idx) => {
        const rowNum = startIndex + idx + 1;
        const initials = item.nama
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase();

        const statusBadges = {
          pending: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FDE68A] bg-[#FEF3C7] text-[13px] font-medium text-[#92400E]">Menunggu</span>',
          approved: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#BBF7D0] bg-[#DCFCE7] text-[13px] font-medium text-[#15803D]">Disetujui</span>',
          rejected: '<span class="inline-flex items-center px-2.5 py-1 rounded-md border border-[#FECDD3] bg-[#FFE4E6] text-[13px] font-medium text-[#BE123C]">Ditolak</span>',
        };
        const statusBadge = statusBadges[item.status] || statusBadges.pending;

        const isPending = item.status === 'pending';
        const actionBtn = isPending
          ? `
            <button
              type="button"
              onclick="openValidasiSurekomModal(${item.id})"
              class="h-9 px-3.5 rounded-md bg-[#0655a7] hover:bg-[#0655a7]/90 text-white font-medium text-xs transition-colors shadow-none"
            >
              Validasi
            </button>
          `
          : `
            <button
              type="button"
              onclick="openValidasiSurekomModal(${item.id})"
              class="h-9 px-3.5 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] font-medium text-xs transition-colors"
            >
              Detail
            </button>
          `;

        return `
          <tr class="h-[68px] border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors">
            <td class="px-4 text-center text-sm text-[#71717a]">${rowNum}</td>
            <td class="px-4">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-[#0655a7] font-bold flex items-center justify-center text-xs shrink-0">
                  ${initials}
                </div>
                <div>
                  <div class="font-medium text-[#09090b] text-sm">${item.nama}</div>
                  <div class="text-[#71717a] text-xs">${item.nim} • ${item.prodi}</div>
                </div>
              </div>
            </td>
            <td class="px-4">
              <div class="text-sm font-medium text-[#09090b]">${item.kontributor}</div>
            </td>
            <td class="px-4 text-center text-sm font-medium text-[#09090b]">${item.ipk}</td>
            <td class="px-4 text-center text-sm text-[#71717a]">${item.sksLulus}</td>
            <td class="px-4 text-center">${statusBadge}</td>
            <td class="px-4 text-center text-sm text-[#71717a]">${item.tanggal}</td>
            <td class="px-4 text-center">${actionBtn}</td>
          </tr>
        `;
      })
      .join('');
  }

  if (infoEl) {
    infoEl.textContent =
      totalItems === 0
        ? 'Menampilkan 0 permohonan'
        : `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} permohonan (Halaman ${surekomCurrentPage} dari ${totalPages})`;
  }

  renderSurekomPaginationControls(totalPages);
  if (window.lucide) window.lucide.createIcons();
}

function renderSurekomPaginationControls(totalPages) {
  const controls = document.getElementById('surekom-pagination-controls');
  if (!controls) return;

  let html = '';
  const prevDisabled = surekomCurrentPage === 1;
  html += `
    <button
      type="button"
      onclick="goToSurekomPage(${surekomCurrentPage - 1})"
      ${prevDisabled ? 'disabled' : ''}
      class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Prev
    </button>
  `;

  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === surekomCurrentPage;
    html += `
      <button
        type="button"
        onclick="goToSurekomPage(${p})"
        class="h-8 w-8 inline-flex items-center justify-center text-xs font-medium rounded-md transition-colors ${
          isActive ? 'bg-[#0655a7] text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5]'
        }"
      >
        ${p}
      </button>
    `;
  }

  const nextDisabled = surekomCurrentPage === totalPages;
  html += `
    <button
      type="button"
      onclick="goToSurekomPage(${surekomCurrentPage + 1})"
      ${nextDisabled ? 'disabled' : ''}
      class="inline-flex items-center justify-center h-8 px-3 text-xs font-medium rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  `;

  controls.innerHTML = html;
}

function goToSurekomPage(page) {
  const filtered = getFilteredSurekomData();
  const totalPages = Math.ceil(filtered.length / surekomItemsPerPage) || 1;
  if (page < 1 || page > totalPages) return;
  surekomCurrentPage = page;
  renderSurekomTable();
}

function openValidasiSurekomModal(id) {
  const item = surekomListData.find((s) => s.id === id);
  if (!item) return;

  activeModalSurekomId = id;
  const modal = document.getElementById('modal-validasi-surekom');
  if (!modal) return;

  const initials = item.nama
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const avatar = document.getElementById('modal-surekom-avatar');
  if (avatar) avatar.textContent = initials;

  const nama = document.getElementById('modal-surekom-nama');
  if (nama) nama.textContent = item.nama;

  const nimProdi = document.getElementById('modal-surekom-nim-prodi');
  if (nimProdi) nimProdi.textContent = `${item.nim} • ${item.prodi}`;

  const program = document.getElementById('modal-surekom-program');
  if (program) program.textContent = item.program;

  const kontributor = document.getElementById('modal-surekom-kontributor');
  if (kontributor) kontributor.textContent = item.kontributor;

  // Isi pratinjau surat langsung di dalam modal
  const previewEl = document.getElementById('modal-surekom-doc-preview');
  if (previewEl) {
    previewEl.textContent = buildSuratRekomendasiText(item);
  }

  // Reset radio decision to Setujui
  const inputCatatan = document.getElementById('modal-surekom-catatan-input');
  if (inputCatatan) {
    inputCatatan.value = item.catatan || '';
    inputCatatan.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
  }
  handleModalSurekomDecisionChange('Setujui');

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeValidasiSurekomModal() {
  const modal = document.getElementById('modal-validasi-surekom');
  if (modal) modal.classList.add('hidden');
  activeModalSurekomId = null;
}

function handleModalSurekomDecisionChange(val) {
  const cardSetujui = document.getElementById('label-radio-surekom-setujui');
  const cardTolak = document.getElementById('label-radio-surekom-tolak');
  const badge = document.getElementById('modal-decision-label-badge');
  const label = document.getElementById('modal-surekom-catatan-label');
  const hint = document.getElementById('modal-surekom-catatan-hint');
  const input = document.getElementById('modal-surekom-catatan-input');

  if (val === 'Setujui') {
    if (cardSetujui) {
      cardSetujui.className = 'h-10 rounded-md border border-[#0655a7] bg-[#0655a7] text-white cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (cardTolak) {
      cardTolak.className = 'h-10 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#3f3f46] cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (badge) {
      badge.textContent = 'Setujui';
      badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]';
    }
    if (label) label.textContent = 'Catatan untuk Mahasiswa';
    if (hint) {
      hint.textContent = 'Opsional';
      hint.className = 'text-[11px] text-[#71717a]';
    }
    if (input) {
      input.required = false;
      input.placeholder = 'Tuliskan catatan atau instruksi revisi...';
      input.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
    }
  } else {
    if (cardTolak) {
      cardTolak.className = 'h-10 rounded-md border border-[#BE123C] bg-[#BE123C] text-white cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (cardSetujui) {
      cardSetujui.className = 'h-10 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#3f3f46] cursor-pointer flex items-center justify-center gap-2 transition-colors';
    }
    if (badge) {
      badge.textContent = 'Tolak';
      badge.className = 'px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#FFE4E6] text-[#BE123C] border border-[#FECDD3]';
    }
    if (label) label.textContent = 'Alasan Penolakan / Instruksi Revisi *';
    if (hint) {
      hint.textContent = '*Wajib diisi alasan penolakan';
      hint.className = 'text-[11px] font-semibold text-[#BE123C]';
    }
    if (input) {
      input.required = true;
      input.placeholder = 'Wajib masukkan alasan penolakan / instruksi revisi dokumen mahasiswa...';
      input.focus();
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Kirim keputusan validasi SuReKom langsung dari tombol footer.
 * @param {'Setujui'|'Tolak'} decision
 */
function submitValidasiSurekomWithDecision(decision) {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  const input = document.getElementById('modal-surekom-catatan-input');
  const catatan = input ? input.value.trim() : '';

  if (decision === 'Tolak' && !catatan) {
    alert('Alasan penolakan wajib diisi untuk memberikan instruksi revisi kepada mahasiswa.');
    if (input) {
      input.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
      input.focus();
    }
    return;
  }

  item.status = decision === 'Setujui' ? 'approved' : 'rejected';
  item.catatan = catatan;

  alert(`Validasi Surat Rekomendasi Berhasil Disimpan!\nMahasiswa: ${item.nama} (${item.nim})\nKeputusan: ${decision === 'Setujui' ? 'Disetujui (SuReKom Resmi Diterbitkan)' : 'Ditolak (Permintaan Revisi Dikirim)'}\nCatatan: ${catatan || '-'}`);

  closeValidasiSurekomModal();
  renderSurekomTable();
}

function submitValidasiSurekomFromModal() {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  const radio = document.querySelector('input[name="modal_surekom_decision"]:checked');
  const decision = radio ? radio.value : 'Setujui';
  const input = document.getElementById('modal-surekom-catatan-input');
  const catatan = input ? input.value.trim() : '';

  if (decision === 'Tolak' && !catatan) {
    alert('Alasan penolakan wajib diisi untuk memberikan instruksi revisi kepada mahasiswa.');
    if (input) {
      input.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
      input.focus();
    }
    return;
  }

  item.status = decision === 'Setujui' ? 'approved' : 'rejected';
  item.catatan = catatan;

  alert(`Validasi Surat Rekomendasi Berhasil Disimpan!\nMahasiswa: ${item.nama} (${item.nim})\nKeputusan: ${decision === 'Setujui' ? 'Disetujui (SuReKom Resmi Diterbitkan)' : 'Ditolak (Permintaan Revisi Dikirim)'}\nCatatan: ${catatan || '-'}`);

  closeValidasiSurekomModal();
  renderSurekomTable();
}


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).handleSearchSurekom = handleSearchSurekom;
  (window as any).handleFilterSurekomStatus = handleFilterSurekomStatus;
  (window as any).handleFilterSurekomProgram = handleFilterSurekomProgram;
  (window as any).handleFilterSurekomProdi = handleFilterSurekomProdi;
  (window as any).getFilteredSurekomData = getFilteredSurekomData;
  (window as any).renderSurekomTable = renderSurekomTable;
  (window as any).renderSurekomPaginationControls = renderSurekomPaginationControls;
  (window as any).goToSurekomPage = goToSurekomPage;
  (window as any).openValidasiSurekomModal = openValidasiSurekomModal;
  (window as any).closeValidasiSurekomModal = closeValidasiSurekomModal;
  (window as any).handleModalSurekomDecisionChange = handleModalSurekomDecisionChange;
  (window as any).submitValidasiSurekomWithDecision = submitValidasiSurekomWithDecision;
  (window as any).submitValidasiSurekomFromModal = submitValidasiSurekomFromModal;
  try {
    Object.defineProperty(window, "surekomCurrentPage", {
      get: () => surekomCurrentPage,
      set: (val) => { surekomCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomCurrentPage = surekomCurrentPage;
  }
  try {
    Object.defineProperty(window, "surekomItemsPerPage", {
      get: () => surekomItemsPerPage,
      set: (val) => { surekomItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomItemsPerPage = surekomItemsPerPage;
  }
  try {
    Object.defineProperty(window, "surekomSearchQuery", {
      get: () => surekomSearchQuery,
      set: (val) => { surekomSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomSearchQuery = surekomSearchQuery;
  }
  try {
    Object.defineProperty(window, "surekomFilterStatus", {
      get: () => surekomFilterStatus,
      set: (val) => { surekomFilterStatus = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomFilterStatus = surekomFilterStatus;
  }
  try {
    Object.defineProperty(window, "surekomFilterProgram", {
      get: () => surekomFilterProgram,
      set: (val) => { surekomFilterProgram = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomFilterProgram = surekomFilterProgram;
  }
  try {
    Object.defineProperty(window, "surekomFilterProdi", {
      get: () => surekomFilterProdi,
      set: (val) => { surekomFilterProdi = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).surekomFilterProdi = surekomFilterProdi;
  }
  try {
    Object.defineProperty(window, "activeModalSurekomId", {
      get: () => activeModalSurekomId,
      set: (val) => { activeModalSurekomId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeModalSurekomId = activeModalSurekomId;
  }
}

export {
  handleSearchSurekom,
  handleFilterSurekomStatus,
  handleFilterSurekomProgram,
  handleFilterSurekomProdi,
  getFilteredSurekomData,
  renderSurekomTable,
  renderSurekomPaginationControls,
  goToSurekomPage,
  openValidasiSurekomModal,
  closeValidasiSurekomModal,
  handleModalSurekomDecisionChange,
  submitValidasiSurekomWithDecision,
  submitValidasiSurekomFromModal,
  surekomCurrentPage,
  surekomItemsPerPage,
  surekomSearchQuery,
  surekomFilterStatus,
  surekomFilterProgram,
  surekomFilterProdi,
  activeModalSurekomId,
};
