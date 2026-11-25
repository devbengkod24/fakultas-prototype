// @ts-nocheck
// ==============================================================================
// KOORDINATOR DOSEN ADD/EDIT MODALS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


// ====================================================
// CRUD KOORDINATOR DOSEN MODAL
// ====================================================
function showAddKoordinatorModal() {
  document.getElementById('modal-koordinator-title').textContent = 'Tambah Dosen Koordinator';
  document.getElementById('modal-koordinator-id').value = '';
  document.getElementById('modal-koordinator-nama').value = '';
  document.getElementById('modal-koordinator-nidn').value = '';
  document.getElementById('modal-koordinator-prodi').value = 'S1 Teknik Informatika';
  document.getElementById('modal-koordinator-email').value = '';
  document.getElementById('modal-crud-koordinator').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function showEditKoordinatorModal(id) {
  const item = koordinatorData.find((k) => k.id === id);
  if (!item) return;

  document.getElementById('modal-koordinator-title').textContent = 'Edit Profil Dosen Koordinator';
  document.getElementById('modal-koordinator-id').value = item.id;
  document.getElementById('modal-koordinator-nama').value = item.nama;
  document.getElementById('modal-koordinator-nidn').value = item.nidn;
  document.getElementById('modal-koordinator-prodi').value = item.prodi;
  document.getElementById('modal-koordinator-email').value = item.email;
  document.getElementById('modal-crud-koordinator').classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeKoordinatorModal() {
  document.getElementById('modal-crud-koordinator').classList.add('hidden');
}

function handleSaveKoordinator(e) {
  e.preventDefault();
  const id = document.getElementById('modal-koordinator-id').value;
  const nama = document.getElementById('modal-koordinator-nama').value.trim();
  const nidn = document.getElementById('modal-koordinator-nidn').value.trim();
  const prodi = document.getElementById('modal-koordinator-prodi').value;
  const email = document.getElementById('modal-koordinator-email').value.trim();

  if (!nama || !nidn) {
    alert('Nama dosen dan NIDN wajib diisi.');
    return;
  }

  if (id) {
    // Edit
    const idx = koordinatorData.findIndex((k) => k.id === id);
    if (idx !== -1) {
      const oldNama = koordinatorData[idx].nama;
      koordinatorData[idx] = {
        ...koordinatorData[idx],
        nama,
        nidn,
        prodi,
        email,
      };
      // Jika nama berubah, update dosen di programListData yang terkait
      if (oldNama !== nama) {
        programListData.forEach((p) => {
          if (p.dosen === oldNama) {
            p.dosen = nama;
          }
        });
        renderProgramTable();
      }
    }
  } else {
    // Add
    const newId = `kord_${Date.now()}`;
    koordinatorData.push({
      id: newId,
      nama,
      nidn,
      prodi,
      email,
    });
  }

  closeKoordinatorModal();
  renderKoordinatorTable();
  populateProgramDosenDropdown();
  alert('Data dosen koordinator berhasil disimpan.');
}

function handleDeleteKoordinator(id) {
  const item = koordinatorData.find((k) => k.id === id);
  if (!item) return;

  const assigned = getProgramsForKoordinator(item.nama);
  let confirmMsg = `Apakah Anda yakin ingin menghapus "${item.nama}" dari daftar koordinator?`;
  if (assigned.length > 0) {
    confirmMsg += `\n\nPerhatian: Dosen ini sedang mengampu ${assigned.length} program. Status pengampu program-program tersebut akan direset menjadi "Belum Ditugaskan".`;
  }

  if (confirm(confirmMsg)) {
    // Reset penugasan program yang diampu dosen ini
    programListData.forEach((p) => {
      if (p.dosen === item.nama) {
        p.dosen = 'Belum Ditugaskan';
      }
    });

    koordinatorData = koordinatorData.filter((k) => k.id !== id);
    renderKoordinatorTable();
    renderProgramTable();
    populateProgramDosenDropdown();
    alert('Koordinator berhasil dihapus.');
  }
}


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).showAddKoordinatorModal = showAddKoordinatorModal;
  (window as any).showEditKoordinatorModal = showEditKoordinatorModal;
  (window as any).closeKoordinatorModal = closeKoordinatorModal;
  (window as any).handleSaveKoordinator = handleSaveKoordinator;
  (window as any).handleDeleteKoordinator = handleDeleteKoordinator;
}

export {
  showAddKoordinatorModal,
  showEditKoordinatorModal,
  closeKoordinatorModal,
  handleSaveKoordinator,
  handleDeleteKoordinator,
};
