// @ts-nocheck
// ==============================================================================
// PROGRAM SUBVIEWS & FORM MANAGEMENT
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// Program Subviews
function showProgramEdit(title, isNew = false) {
  const listView = document.getElementById('subview-program-list');
  if (listView) listView.classList.add('hidden');
  const pesertaView = document.getElementById('subview-program-peserta');
  if (pesertaView) pesertaView.classList.add('hidden');
  const editView = document.getElementById('subview-program-edit');
  if (editView) editView.classList.remove('hidden');
  document.getElementById('edit-program-title').textContent = isNew ? 'Tambah Program Baru' : 'Ubah Program';
  document.getElementById('edit-nama-program').value = isNew ? '' : title;
  currentEditingProgramTitle = isNew ? '' : title;

  const currentProg = !isNew ? programListData.find((p) => p.nama === title) : null;

  // Set Dosen Penanggung Jawab
  const dosenSelect = document.getElementById('edit-dosen-program');
  if (dosenSelect) {
    if (currentProg && currentProg.dosen) {
      dosenSelect.value = currentProg.dosen;
    } else {
      dosenSelect.selectedIndex = 2; // Default Ahmad Zainul
    }
  }

  // Set Kategori Program
  const kategoriSelect = document.getElementById('edit-kategori-program');
  if (kategoriSelect && currentProg && currentProg.kategori) {
    const matchingOption = Array.from(kategoriSelect.options).find(
      (opt) => opt.text.includes(currentProg.kategori) || currentProg.kategori.includes(opt.text)
    );
    if (matchingOption) kategoriSelect.value = matchingOption.value;
  }

  if (isNew) {
    const sksEl = document.getElementById('edit-sks-konversi');
    if (sksEl) sksEl.value = '20';
    const ipkEl = document.getElementById('edit-min-ipk');
    if (ipkEl) ipkEl.value = '3.00';
    const kuotaEl = document.getElementById('edit-kuota-peserta');
    if (kuotaEl) kuotaEl.value = '4';
  }
  lucide.createIcons();
}

let programSubmenuOpen = true;

function toggleProgramSubmenu() {
  const submenu = document.getElementById('submenu-program');
  const chevron = document.getElementById('program-chevron');
  if (!submenu) return;

  programSubmenuOpen = !programSubmenuOpen;
  if (programSubmenuOpen) {
    submenu.classList.remove('hidden');
    if (chevron) chevron.classList.remove('-rotate-90');
  } else {
    submenu.classList.add('hidden');
    if (chevron) chevron.classList.add('-rotate-90');
  }
}

function updateProgramSubmenuActive(activeSub) {
  const btnDaftar = document.getElementById('nav-sub-daftar-program');
  const btnKategori = document.getElementById('nav-sub-kategori-program');

  const activeClass =
    'px-2.5 py-1.5 rounded-md text-xs font-semibold bg-blue-50/80 text-[#0655a7] text-left transition-colors';
  const inactiveClass =
    'px-2.5 py-1.5 rounded-md text-xs text-[#71717a] hover:text-[#0655a7] hover:bg-blue-50/60 font-medium text-left transition-colors';

  if (btnDaftar) btnDaftar.className = activeSub === 'daftar' ? activeClass : inactiveClass;
  if (btnKategori) btnKategori.className = activeSub === 'kategori' ? activeClass : inactiveClass;
}

function showProgramListView() {
  switchTab('program');
  const listView = document.getElementById('subview-program-list');
  const editView = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (listView) listView.classList.remove('hidden');
  if (editView) editView.classList.add('hidden');
  if (katView) katView.classList.add('hidden');

  updateProgramSubmenuActive('daftar');
  updateBreadcrumb(['Program', 'Daftar Program']);
  if (window.lucide) window.lucide.createIcons();
}

function showKategoriManagementView() {
  switchTab('program');
  const listView = document.getElementById('subview-program-list');
  const editView = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (listView) listView.classList.add('hidden');
  if (editView) editView.classList.add('hidden');
  if (katView) katView.classList.remove('hidden');

  updateProgramSubmenuActive('kategori');
  updateBreadcrumb(['Program', 'Manajemen Kategori']);
  renderKategoriTable();
  if (window.lucide) window.lucide.createIcons();
}

function hideSubviews() {
  const list = document.getElementById('subview-program-list');
  const edit = document.getElementById('subview-program-edit');
  const katView = document.getElementById('subview-program-kategori');
  if (list) list.classList.remove('hidden');
  if (edit) edit.classList.add('hidden');
  if (katView) katView.classList.add('hidden');
  updateProgramSubmenuActive('daftar');
}

function handleProgramSubmit(e) {
  e.preventDefault();
  const namaInput = document.getElementById('edit-nama-program');
  const newNama = namaInput ? namaInput.value.trim() : '';

  const dosenSelect = document.getElementById('edit-dosen-program');
  const newDosen = dosenSelect ? dosenSelect.value : 'Ahmad Zainul, M.Kom';

  const kategoriSelect = document.getElementById('edit-kategori-program');
  const newKategori = kategoriSelect
    ? kategoriSelect.options[kategoriSelect.selectedIndex].text
    : 'MBKM Internal - Asistensi Mengajar (Bengkel Koding)';

  if (currentEditingProgramTitle) {
    const prog = programListData.find((p) => p.nama === currentEditingProgramTitle);
    if (prog) {
      prog.nama = newNama || prog.nama;
      prog.dosen = newDosen;
      prog.kategori = newKategori;
    }
  } else if (newNama) {
    programListData.unshift({
      id: 'prog_' + Date.now(),
      nama: newNama,
      dosen: newDosen,
      kategori: newKategori,
    });
  }

  renderProgramTable();
  alert(`Program berhasil disimpan dengan dosen penanggung jawab: ${newDosen}!`);
  hideSubviews();
}

function confirmDeleteProgram(name) {
  if (confirm(`Apakah Anda yakin ingin menghapus program "${name}"?`)) {
    programListData = programListData.filter((p) => p.nama !== name);
    renderProgramTable();
    alert(`Program "${name}" berhasil dihapus.`);
  }
}

// Stepper Minimal IPK
function stepIpk(delta) {
  const input = document.getElementById('edit-min-ipk');
  if (!input) return;
  let val = parseFloat(input.value) || 0.0;
  val = Math.max(0.0, Math.min(4.0, val + delta));
  input.value = val.toFixed(2);
}

// Stepper Kuota Peserta
function stepKuota(delta) {
  const input = document.getElementById('edit-kuota-peserta');
  if (!input) return;
  let val = parseInt(input.value) || 0;
  val = Math.max(1, Math.min(500, val + delta));
  input.value = val;
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).showProgramEdit = showProgramEdit;
  (window as any).toggleProgramSubmenu = toggleProgramSubmenu;
  (window as any).updateProgramSubmenuActive = updateProgramSubmenuActive;
  (window as any).showProgramListView = showProgramListView;
  (window as any).showKategoriManagementView = showKategoriManagementView;
  (window as any).hideSubviews = hideSubviews;
  (window as any).handleProgramSubmit = handleProgramSubmit;
  (window as any).confirmDeleteProgram = confirmDeleteProgram;
  (window as any).stepIpk = stepIpk;
  (window as any).stepKuota = stepKuota;
  try {
    Object.defineProperty(window, "programSubmenuOpen", {
      get: () => programSubmenuOpen,
      set: (val) => { programSubmenuOpen = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).programSubmenuOpen = programSubmenuOpen;
  }
}

export {
  showProgramEdit,
  toggleProgramSubmenu,
  updateProgramSubmenuActive,
  showProgramListView,
  showKategoriManagementView,
  hideSubviews,
  handleProgramSubmit,
  confirmDeleteProgram,
  stepIpk,
  stepKuota,
  programSubmenuOpen,
};
