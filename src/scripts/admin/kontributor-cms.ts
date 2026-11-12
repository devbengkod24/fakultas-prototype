// @ts-nocheck
// ==============================================================================
// CMS HALAMAN PUBLIK KONTRIBUTOR MBKM
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// ====================================================
// DATA & CONTROLLER CMS HALAMAN PUBLIK KONTRIBUTOR MBKM
// ====================================================
let activeCmsKontributorId = null;
let activeCmsSubTabKey = 'hero'; // 'hero' | 'showcase'


function openKontributorCms(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  if (!kontributor) return;

  // Navigasi ke halaman Kelola Program tersendiri
  window.location.href = `/koordinator/kontributor/kelola-program?id=${kontributorId}`;
}

/**
 * Mengisi seluruh field CMS berdasarkan kontributorId.
 * Dipanggil oleh halaman /koordinator/kontributor/kelola-program.
 */
function populateKontributorCmsPage(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  if (!kontributor) return;

  activeCmsKontributorId = kontributorId;

  const titleEl = document.getElementById('cms-program-page-title');
  if (titleEl) titleEl.textContent = `Kelola Program — ${kontributor.nama}`;

  // Get or initialize kontributor CMS data
  let data = kontributorCmsDataMap[kontributorId];
  if (!data) {
    data = {
      kontributor: kontributor.nama,
      sektor: kontributor.sektor || 'Industri & Teknologi',
      lokasi: kontributor.alamat || 'Hybrid (Daring & Luring)',
      periode: 'Semester Gasal 2026/2027',
      mou: kontributor.mou || '042/MoU/FIK-UDINUS/2026',
      badge: kontributor.tipe === 'internal' ? 'Kontributor Internal Kampus' : 'Kontributor Nasional MBKM',
      deadline: '25 Oktober 2026 • 23:59 WIB',
      deskripsiHero: kontributor.deskripsi || `Kerja Sama strategis MBKM antara FIK UDINUS dan ${kontributor.nama} dalam memberikan pengalaman kerja profesional industri terakreditasi konversi 20 SKS.`,
      poin1: 'Mentoring Mentor Industri Profesional',
      poin2: 'Pengalaman Proyek Nyata Skala Enterprise',
      poin3: 'Konversi Akademik Terjamin hingga 20 SKS',
      koorNama: kontributor.tipe === 'internal' ? kontributor.picNama : 'Nurul Anisa S.W., M.Cs',
      koorJabatan: kontributor.tipe === 'internal' ? 'PIC Kontributor' : 'Koordinator Kampus Berdampak FIK UDINUS',
      koorFoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
      showcases: []
    };
    kontributorCmsDataMap[kontributorId] = data;
  }

  // Setup Authority Mode (Internal = Read-Only | Eksternal = CRUD)
  const isInternal = kontributor.tipe === 'internal';
  const btnSaveTop = document.getElementById('btn-save-cms-top');
  const previewBadge = document.getElementById('cms-preview-badge');
  const btnAddShowcase = document.getElementById('btn-tambah-showcase');

  if (isInternal) {
    if (btnSaveTop) btnSaveTop.classList.add('hidden');
    if (previewBadge) previewBadge.classList.remove('hidden');
    if (btnAddShowcase) btnAddShowcase.classList.add('hidden');
  } else {
    if (btnSaveTop) btnSaveTop.classList.remove('hidden');
    if (previewBadge) previewBadge.classList.add('hidden');
    if (btnAddShowcase) btnAddShowcase.classList.remove('hidden');
  }

  // Populate Form Fields
  document.getElementById('cms-input-kontributor').value = data.kontributor || '';
  document.getElementById('cms-input-klaster').value = data.sektor || '';
  document.getElementById('cms-input-moda').value = data.lokasi || '';
  document.getElementById('cms-input-periode').value = data.periode || 'Semester Gasal 2026/2027';
  document.getElementById('cms-input-sks').value = data.mou || '';
  document.getElementById('cms-input-badge').value = data.badge || '';
  document.getElementById('cms-input-deadline').value = data.deadline || '';
  document.getElementById('cms-input-deskripsi-hero').value = data.deskripsiHero || '';
  document.getElementById('cms-input-poin-1').value = data.poin1 || '';
  document.getElementById('cms-input-poin-2').value = data.poin2 || '';
  document.getElementById('cms-input-poin-3').value = data.poin3 || '';
  document.getElementById('cms-input-koor-nama').value = data.koorNama || '';
  document.getElementById('cms-input-koor-jabatan').value = data.koorJabatan || '';
  const fotoImg = document.getElementById('cms-koor-foto-preview');
  if (fotoImg && data.koorFoto) fotoImg.src = data.koorFoto;

  // Apply disabled state to all cms-field if internal
  document.querySelectorAll('.cms-field').forEach((el) => {
    el.disabled = isInternal;
    if (isInternal) {
      el.classList.add('bg-gray-50', 'cursor-not-allowed', 'opacity-85');
    } else {
      el.classList.remove('bg-gray-50', 'cursor-not-allowed', 'opacity-85');
    }
  });

  // Render Showcases
  renderShowcaseGrid();
  switchCmsSubTab('hero');

  // Update Partner Info Card
  const partnerNameEl = document.getElementById('cms-partner-name');
  const partnerAvatarEl = document.getElementById('cms-partner-avatar');
  const partnerBadgeEl = document.getElementById('cms-partner-badge');
  const partnerDeskripsiEl = document.getElementById('cms-partner-deskripsi');
  const partnerPicEl = document.getElementById('cms-partner-pic');

  if (partnerNameEl) partnerNameEl.textContent = kontributor.nama;
  if (partnerAvatarEl) partnerAvatarEl.textContent = kontributor.avatar || kontributor.nama.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  if (partnerBadgeEl) {
    const isInt = kontributor.tipe === 'internal';
    partnerBadgeEl.innerHTML = `<i data-lucide="${isInt ? 'building' : 'globe'}" class="w-3.5 h-3.5 text-[#71717a]"></i><span>${isInt ? 'Kontributor Internal' : 'Kontributor Eksternal'}</span>`;
  }
  if (partnerDeskripsiEl) {
    partnerDeskripsiEl.textContent = kontributor.deskripsi || '-';
  }
  if (partnerPicEl) {
    partnerPicEl.textContent = kontributor.picNama || '-';
  }

  if (window.lucide) window.lucide.createIcons();
}

// Legacy alias for compatibility
function openProgramCms(progName, kontributorId) {
  openKontributorCms(kontributorId);
}

function closeProgramCms() {
  // Jika berada di halaman standalone, kembali ke direktori kontributor
  if (window.location.pathname.includes('/kontributor/kelola-program')) {
    window.location.href = '/koordinator/kontributor';
    return;
  }

  const cmsView = document.getElementById('subview-program-cms');
  if (cmsView) cmsView.classList.add('hidden');
  const detailView = document.getElementById('subview-kontributor-detail');
  if (detailView) detailView.classList.remove('hidden');

  updateBreadcrumb(['Kontributor', 'Detail']);
  if (window.lucide) window.lucide.createIcons();
}
const closeKontributorCms = closeProgramCms;

function switchCmsSubTab(subTab) {
  activeCmsSubTabKey = subTab;
  const tabs = ['hero', 'timeline', 'syarat', 'showcase', 'faq'];

  tabs.forEach((t) => {
    const btn = document.getElementById('btn-subtab-cms-' + t);
    const pane = document.getElementById('pane-cms-' + t);
    if (t === subTab) {
      if (btn) {
        btn.className = 'cms-tab-btn inline-flex items-center px-5 py-3 text-sm font-semibold border-b-2 border-primary-600 text-primary-700 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'true');
      }
      if (pane) pane.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className = 'cms-tab-btn inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'false');
      }
      if (pane) pane.classList.add('hidden');
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderShowcaseGrid() {
  const container = document.getElementById('cms-showcase-grid');
  const countBadge = document.getElementById('badge-count-showcase');
  if (!container) return;

  const data = kontributorCmsDataMap[activeCmsKontributorId];
  const list = data && data.showcases ? data.showcases : [];
  if (countBadge) countBadge.textContent = list.length;

  const kontributor = kontributorListData.find((m) => m.id === activeCmsKontributorId);
  const isInternal = kontributor && kontributor.tipe === 'internal';

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-span-full rounded-xl border border-dashed border-[#e4e4e7] p-8 text-center bg-white flex flex-col items-center justify-center">
        <div class="h-10 w-10 rounded-full bg-[#f4f4f5] flex items-center justify-center text-[#71717a] mb-2">
          <i data-lucide="layout-grid" class="w-5 h-5"></i>
        </div>
        <h4 class="text-sm font-semibold text-[#09090b]">Belum Ada Proyek Showcase</h4>
        <p class="text-xs text-[#71717a] mt-1 max-w-sm">Tambahkan hasil karya atau prototipe capstone mahasiswa binaan selama berkegiatan di kontributor ini.</p>
        ${!isInternal ? `
          <button
            type="button"
            onclick="openShowcaseModal()"
            class="mt-4 inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-[#0655a7] hover:bg-[#0655a7]/90 text-white transition-colors"
          >
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Tambah Proyek Pertama</span>
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = list.map((item, idx) => {
    const techBadges = (item.tech || []).map(t =>
      `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7]">${t}</span>`
    ).join('');

    const actionBtns = isInternal ? '' : `
      <div class="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onclick="openShowcaseModal(${idx})"
          class="inline-flex items-center justify-center h-7 w-7 rounded-md text-[#71717a] hover:text-[#0655a7] hover:bg-[#f4f4f5] transition-colors"
          title="Edit Proyek"
        >
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
        </button>
        <button
          type="button"
          onclick="handleDeleteShowcase(${idx})"
          class="inline-flex items-center justify-center h-7 w-7 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Hapus Proyek"
        >
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    return `
      <div class="rounded-xl border border-[#e4e4e7] bg-white p-5 flex flex-col justify-between hover:border-[#d4d4d8] transition-colors shadow-none">
        <div class="space-y-2">
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-1">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-blue-200 bg-blue-50 text-[11px] font-semibold text-[#0655a7]">
                ${item.kategori}
              </span>
              <div class="text-[11px] text-[#71717a]">${item.batch} • ${item.id}</div>
            </div>
            ${actionBtns}
          </div>
          <h4 class="text-sm font-semibold text-[#09090b] leading-snug pt-1">${item.judul}</h4>
          <p class="text-xs text-[#71717a] leading-relaxed line-clamp-3">${item.deskripsi}</p>
        </div>

        <div class="pt-4 mt-3 border-t border-[#f4f4f5] flex flex-wrap gap-1.5">
          ${techBadges}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function openShowcaseModal(editIdx) {
  const modal = document.getElementById('modal-showcase-proyek');
  if (!modal) return;

  const titleEl = document.getElementById('modal-showcase-title');
  const idxInput = document.getElementById('modal-showcase-idx');
  const idInput = document.getElementById('modal-showcase-id');
  const batchInput = document.getElementById('modal-showcase-batch');
  const judulInput = document.getElementById('modal-showcase-judul');
  const kategoriInput = document.getElementById('modal-showcase-kategori');
  const descInput = document.getElementById('modal-showcase-deskripsi');
  const techInput = document.getElementById('modal-showcase-tech');

  const data = kontributorCmsDataMap[activeCmsKontributorId];
  const list = data && data.showcases ? data.showcases : [];

  if (editIdx !== undefined && editIdx !== null && list[editIdx]) {
    const item = list[editIdx];
    if (titleEl) titleEl.textContent = 'Edit Proyek Showcase';
    if (idxInput) idxInput.value = editIdx;
    if (idInput) idInput.value = item.id;
    if (batchInput) batchInput.value = item.batch;
    if (judulInput) judulInput.value = item.judul;
    if (kategoriInput) kategoriInput.value = item.kategori;
    if (descInput) descInput.value = item.deskripsi;
    if (techInput) techInput.value = (item.tech || []).join(', ');
  } else {
    if (titleEl) titleEl.textContent = 'Tambah Proyek Showcase';
    if (idxInput) idxInput.value = '';
    if (idInput) idInput.value = `PRJ-2026-0${list.length + 1}`;
    if (batchInput) batchInput.value = 'Capstone Project Batch 6';
    if (judulInput) judulInput.value = '';
    if (kategoriInput) kategoriInput.value = '';
    if (descInput) descInput.value = '';
    if (techInput) techInput.value = 'Python, TensorFlow, React.js';
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeShowcaseModal() {
  const modal = document.getElementById('modal-showcase-proyek');
  if (modal) modal.classList.add('hidden');
}

function handleSaveShowcase(e) {
  e.preventDefault();
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data) return;
  if (!data.showcases) data.showcases = [];

  const idxVal = document.getElementById('modal-showcase-idx').value;
  const idVal = document.getElementById('modal-showcase-id').value.trim();
  const batch = document.getElementById('modal-showcase-batch').value.trim();
  const judul = document.getElementById('modal-showcase-judul').value.trim();
  const kategori = document.getElementById('modal-showcase-kategori').value.trim();
  const deskripsi = document.getElementById('modal-showcase-deskripsi').value.trim();
  const techStr = document.getElementById('modal-showcase-tech').value.trim();
  const tech = techStr.split(',').map(s => s.trim()).filter(Boolean);

  const newItem = {
    id: idVal,
    batch,
    judul,
    kategori,
    deskripsi,
    tech
  };

  if (idxVal !== '' && data.showcases[Number(idxVal)]) {
    data.showcases[Number(idxVal)] = newItem;
    alert('Proyek showcase berhasil diperbarui!');
  } else {
    data.showcases.unshift(newItem);
    alert('Proyek showcase baru berhasil ditambahkan!');
  }

  closeShowcaseModal();
  renderShowcaseGrid();
}

function handleDeleteShowcase(idx) {
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data || !data.showcases || !data.showcases[idx]) return;

  if (confirm(`Hapus proyek showcase "${data.showcases[idx].judul}"?`)) {
    data.showcases.splice(idx, 1);
    renderShowcaseGrid();
  }
}

function handleSaveCmsHero() {
  const data = kontributorCmsDataMap[activeCmsKontributorId];
  if (!data) return;

  data.kontributor = document.getElementById('cms-input-kontributor').value.trim();
  data.sektor = document.getElementById('cms-input-klaster').value.trim();
  data.lokasi = document.getElementById('cms-input-moda').value.trim();
  data.periode = document.getElementById('cms-input-periode').value;
  data.mou = document.getElementById('cms-input-sks').value.trim();
  data.badge = document.getElementById('cms-input-badge').value.trim();
  data.deadline = document.getElementById('cms-input-deadline').value.trim();
  data.deskripsiHero = document.getElementById('cms-input-deskripsi-hero').value.trim();
  data.poin1 = document.getElementById('cms-input-poin-1').value.trim();
  data.poin2 = document.getElementById('cms-input-poin-2').value.trim();
  data.poin3 = document.getElementById('cms-input-poin-3').value.trim();
  data.koorNama = document.getElementById('cms-input-koor-nama').value.trim();
  data.koorJabatan = document.getElementById('cms-input-koor-jabatan').value.trim();

  alert('Perubahan CMS Halaman Publik Kontributor berhasil disimpan!');
}

function handleCmsPhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const imgPreview = document.getElementById('cms-koor-foto-preview');
    if (imgPreview) imgPreview.src = evt.target.result;
    const statusText = document.getElementById('cms-foto-status');
    if (statusText) statusText.textContent = `Foto terpilih: ${file.name}`;

    const data = kontributorCmsDataMap[activeCmsKontributorId];
    if (data) data.koorFoto = evt.target.result;
  };
  reader.readAsDataURL(file);
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).openKontributorCms = openKontributorCms;
  (window as any).populateKontributorCmsPage = populateKontributorCmsPage;
  (window as any).openProgramCms = openProgramCms;
  (window as any).closeProgramCms = closeProgramCms;
  (window as any).switchCmsSubTab = switchCmsSubTab;
  (window as any).renderShowcaseGrid = renderShowcaseGrid;
  (window as any).openShowcaseModal = openShowcaseModal;
  (window as any).closeShowcaseModal = closeShowcaseModal;
  (window as any).handleSaveShowcase = handleSaveShowcase;
  (window as any).handleDeleteShowcase = handleDeleteShowcase;
  (window as any).handleSaveCmsHero = handleSaveCmsHero;
  (window as any).handleCmsPhotoUpload = handleCmsPhotoUpload;
  try {
    Object.defineProperty(window, "activeCmsKontributorId", {
      get: () => activeCmsKontributorId,
      set: (val) => { activeCmsKontributorId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeCmsKontributorId = activeCmsKontributorId;
  }
  try {
    Object.defineProperty(window, "activeCmsSubTabKey", {
      get: () => activeCmsSubTabKey,
      set: (val) => { activeCmsSubTabKey = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeCmsSubTabKey = activeCmsSubTabKey;
  }
  try {
    Object.defineProperty(window, "closeKontributorCms", {
      get: () => closeKontributorCms,
      
      configurable: true
    });
  } catch (_) {
    (window as any).closeKontributorCms = closeKontributorCms;
  }
}

export {
  openKontributorCms,
  populateKontributorCmsPage,
  openProgramCms,
  closeProgramCms,
  switchCmsSubTab,
  renderShowcaseGrid,
  openShowcaseModal,
  closeShowcaseModal,
  handleSaveShowcase,
  handleDeleteShowcase,
  handleSaveCmsHero,
  handleCmsPhotoUpload,
  activeCmsKontributorId,
  activeCmsSubTabKey,
  closeKontributorCms,
};
