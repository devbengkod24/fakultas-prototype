// @ts-nocheck
// ==============================================================================
// PELAMAR DRAWER REVIEW & DOKUMEN LIST
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


let activeDrawerDetailTab = 'dokumen';
let isDrawerJadwalUnlocked = false;

function switchDrawerDetailTab(tabKey) {
  if (tabKey === 'jadwal' && activeDrawerMode === 'review-berkas' && !isDrawerJadwalUnlocked) {
    alert('Tab Atur Jadwal masih terkunci.\n\nSilakan tinjau berkas di tab Dokumen terlebih dahulu, kemudian klik tombol "Setuju Berkas >" di footer untuk membuka pengaturan jadwal wawancara.');
    return;
  }

  activeDrawerDetailTab = tabKey;
  const btnDokumen = document.getElementById('drawer-tab-btn-dokumen');
  const btnJadwal = document.getElementById('drawer-tab-btn-jadwal');
  const panelDokumen = document.getElementById('drawer-panel-dokumen');
  const panelJadwal = document.getElementById('drawer-panel-jadwal');

  const footerDokumen = document.getElementById('drawer-footer-actions-dokumen');
  const footerJadwal = document.getElementById('drawer-footer-actions-jadwal');
  const footerEvaluasi = document.getElementById('drawer-footer-actions-evaluasi');
  const footerReadonly = document.getElementById('drawer-footer-actions-readonly');

  if (tabKey === 'dokumen') {
    if (btnDokumen) {
      btnDokumen.className = 'flex items-center gap-2 py-3 text-xs font-semibold border-b-2 border-[#0655a7] text-[#0655a7] transition-colors cursor-pointer';
    }
    if (btnJadwal) {
      btnJadwal.className = 'flex items-center gap-2 py-3 text-xs font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer';
    }
    if (panelDokumen) panelDokumen.classList.remove('hidden');
    if (panelJadwal) panelJadwal.classList.add('hidden');

    if (activeDrawerMode === 'readonly-detail') {
      if (footerDokumen) footerDokumen.classList.add('hidden');
      if (footerJadwal) footerJadwal.classList.add('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.add('hidden');
      if (footerReadonly) footerReadonly.classList.remove('hidden');
    } else if (activeDrawerMode === 'review-berkas') {
      const subpanelJadwalFlow = document.getElementById('drawer-subpanel-jadwal-flow');
      if (subpanelJadwalFlow) subpanelJadwalFlow.classList.add('hidden');
      if (footerReadonly) footerReadonly.classList.add('hidden');
      if (footerDokumen) footerDokumen.classList.remove('hidden');
      if (footerJadwal) footerJadwal.classList.add('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.add('hidden');
    } else {
      if (footerReadonly) footerReadonly.classList.add('hidden');
      if (footerDokumen) footerDokumen.classList.add('hidden');
      if (footerJadwal) footerJadwal.classList.add('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.remove('hidden');
    }
  } else {
    if (btnDokumen) {
      btnDokumen.className = 'flex items-center gap-2 py-3 text-xs font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer';
    }
    if (btnJadwal) {
      btnJadwal.className = 'flex items-center gap-2 py-3 text-xs font-semibold border-b-2 border-[#0655a7] text-[#0655a7] transition-colors cursor-pointer';
    }
    if (panelDokumen) panelDokumen.classList.add('hidden');
    if (panelJadwal) panelJadwal.classList.remove('hidden');

    if (activeDrawerMode === 'readonly-detail') {
      if (footerDokumen) footerDokumen.classList.add('hidden');
      if (footerJadwal) footerJadwal.classList.add('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.add('hidden');
      if (footerReadonly) footerReadonly.classList.remove('hidden');
    } else if (activeDrawerMode === 'review-berkas') {
      if (footerReadonly) footerReadonly.classList.add('hidden');
      if (footerDokumen) footerDokumen.classList.add('hidden');
      if (footerJadwal) footerJadwal.classList.remove('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.add('hidden');
    } else {
      if (footerReadonly) footerReadonly.classList.add('hidden');
      if (footerDokumen) footerDokumen.classList.add('hidden');
      if (footerJadwal) footerJadwal.classList.add('hidden');
      if (footerEvaluasi) footerEvaluasi.classList.remove('hidden');
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function updateDrawerJadwalLockState(unlocked) {
  isDrawerJadwalUnlocked = unlocked;
  const lockedState = document.getElementById('drawer-jadwal-locked-state');
  const formContent = document.getElementById('drawer-jadwal-form-content');

  if (lockedState && formContent) {
    if (unlocked) {
      lockedState.classList.add('hidden');
      formContent.classList.remove('hidden');
    } else {
      lockedState.classList.remove('hidden');
      formContent.classList.add('hidden');
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function bukaDetailPelamarReadOnly(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  activeModalPelamarId = id;
  activeDrawerMode = 'readonly-detail';

  const modal = document.getElementById('modal-detail-pelamar');
  if (!modal) return;

  // Header Title & Subtitle untuk Read-Only Detail
  const titleEl = document.getElementById('slide-over-title');
  if (titleEl) {
    if (item.status === 'diterima') {
      titleEl.textContent = 'Detail Penerima MBKM';
      if (titleEl.nextElementSibling) {
        titleEl.nextElementSibling.textContent = 'Tinjau profil akademik, berkas pendaftaran, dan hasil evaluasi seleksi';
      }
    } else {
      titleEl.textContent = 'Detail Pendaftar Mahasiswa';
      if (titleEl.nextElementSibling) {
        if (item.kategoriKontributor === 'internal') {
          titleEl.nextElementSibling.textContent = 'Tinjau profil akademik dan berkas pendaftaran (Seleksi dikelola Kontributor)';
        } else {
          titleEl.nextElementSibling.textContent = 'Tinjau profil akademik, kelengkapan berkas, dan riwayat seleksi';
        }
      }
    }
  }

  // Label Tab 2 disesuaikan
  const tabBtnJadwal = document.getElementById('drawer-tab-btn-jadwal');
  const subpanelJadwalFlow = document.getElementById('drawer-subpanel-jadwal-flow');
  const subpanelWawancaraEval = document.getElementById('drawer-subpanel-wawancara-eval');
  const lockedState = document.getElementById('drawer-jadwal-locked-state');
  const formContent = document.getElementById('drawer-jadwal-form-content');

  // Identitas & Info Akademik
  populateDrawerHeaderProfile(item);

  // Populate dynamic list dokumen ke Tab Dokumen
  populateDrawerDokumenList(item);

  // Konfigurasi Tab 2 berdasarkan data yang ada
  if (item.status === 'diterima' || (item.nilaiWawancara !== undefined && item.nilaiWawancara !== null)) {
    if (tabBtnJadwal) {
      const spanText = tabBtnJadwal.querySelector('span');
      if (spanText) spanText.textContent = 'Hasil Wawancara';
    }
    if (subpanelJadwalFlow) subpanelJadwalFlow.classList.add('hidden');
    if (subpanelWawancaraEval) subpanelWawancaraEval.classList.remove('hidden');

    initPertanyaanSkorList(item, true);

    const inputCatatan = document.getElementById('modal-pelamar-catatan-koor');
    if (inputCatatan) {
      inputCatatan.value = item.catatanWawancara || 'Kandidat dinyatakan lolos seluruh rangkaian seleksi program MBKM.';
      inputCatatan.disabled = true;
      inputCatatan.classList.add('bg-zinc-50', 'cursor-not-allowed');
    }
  } else if (item.jadwalWawancara) {
    if (tabBtnJadwal) {
      const spanText = tabBtnJadwal.querySelector('span');
      if (spanText) spanText.textContent = 'Jadwal Wawancara';
    }
    if (subpanelJadwalFlow) subpanelJadwalFlow.classList.remove('hidden');
    if (subpanelWawancaraEval) subpanelWawancaraEval.classList.add('hidden');
    if (lockedState) lockedState.classList.add('hidden');
    if (formContent) {
      formContent.classList.remove('hidden');
      const inputTanggal = document.getElementById('input-jadwal-tanggal');
      const inputJam = document.getElementById('input-jadwal-jam');
      const inputCatatan = document.getElementById('input-jadwal-catatan');
      if (inputTanggal) {
        inputTanggal.disabled = true;
        inputTanggal.classList.add('bg-zinc-100', 'cursor-not-allowed');
      }
      if (inputJam) {
        inputJam.disabled = true;
        inputJam.classList.add('bg-zinc-100', 'cursor-not-allowed');
      }
      if (inputCatatan) {
        inputCatatan.value = item.lokasiWawancara || item.catatanWawancara || '';
        inputCatatan.disabled = true;
        inputCatatan.classList.add('bg-zinc-100', 'cursor-not-allowed');
      }
    }
  } else {
    // Belum ada jadwal/evaluasi wawancara
    if (tabBtnJadwal) {
      const spanText = tabBtnJadwal.querySelector('span');
      if (spanText) spanText.textContent = 'Jadwal Wawancara';
    }
    if (subpanelJadwalFlow) subpanelJadwalFlow.classList.remove('hidden');
    if (subpanelWawancaraEval) subpanelWawancaraEval.classList.add('hidden');
    if (lockedState) {
      lockedState.classList.remove('hidden');
      lockedState.innerHTML = `
        <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2.5">
          <i data-lucide="lock" class="w-5 h-5"></i>
        </div>
        <h4 class="text-sm font-semibold text-[#09090b]">Tahap Seleksi Dikelola Kontributor</h4>
        <p class="text-xs text-[#71717a] mt-1 max-w-sm mx-auto">
          Penjadwalan wawancara dan penetapan kelolosan bagi mitra internal <strong>${item.kontributor}</strong> ditangani sepenuhnya oleh pihak kontributor.
        </p>
      `;
    }
    if (formContent) formContent.classList.add('hidden');
  }

  // Buka drawer & aktifkan Tab Dokumen
  switchDrawerDetailTab('dokumen');

  // Update status badge di footer read-only
  const statusBadgeContainer = document.getElementById('drawer-readonly-status-badge');
  if (statusBadgeContainer) {
    if (item.status === 'diterima') {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium">
          <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 shrink-0"></i>
          <span>Status: Lolos Seleksi (Diterima)</span>
        </span>
      `;
    } else if (item.status === 'ditolak') {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg font-medium">
          <i data-lucide="x-circle" class="w-3.5 h-3.5 text-rose-600 shrink-0"></i>
          <span>Status: Tidak Lolos (Ditolak)</span>
        </span>
      `;
    } else if (item.status === 'dibatalkan') {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg font-medium">
          <i data-lucide="ban" class="w-3.5 h-3.5 text-zinc-500 shrink-0"></i>
          <span>Status: Pengajuan Dibatalkan</span>
        </span>
      `;
    } else if (item.kategoriKontributor === 'internal') {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg font-medium">
          <i data-lucide="lock" class="w-3.5 h-3.5 text-amber-600 shrink-0"></i>
          <span>Seleksi pelamar ini dikelola langsung oleh pihak Kontributor</span>
        </span>
      `;
    } else {
      statusBadgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 text-xs text-[#71717a] bg-zinc-50 border border-[#e4e4e7] px-3 py-1.5 rounded-lg font-medium">
          <i data-lucide="info" class="w-3.5 h-3.5 text-[#71717a] shrink-0"></i>
          <span>Mode Read-Only</span>
        </span>
      `;
    }
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function bukaReviewBerkasDrawer(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  activeModalPelamarId = id;
  activeDrawerMode = 'review-berkas';

  const modal = document.getElementById('modal-detail-pelamar');
  if (!modal) return;

  // Header Title & Subtitle untuk Review Berkas
  const titleEl = document.getElementById('slide-over-title');
  if (titleEl) {
    titleEl.textContent = 'Review Berkas Pelamar';
    if (titleEl.nextElementSibling) {
      titleEl.nextElementSibling.textContent = 'Verifikasi berkas persyaratan dan penjadwalan sesi wawancara';
    }
  }

  // Label Tab 2 disesuaikan untuk Review Berkas
  const tabBtnJadwal = document.getElementById('drawer-tab-btn-jadwal');
  if (tabBtnJadwal) {
    const spanText = tabBtnJadwal.querySelector('span');
    if (spanText) spanText.textContent = 'Atur Jadwal';
  }

  // Mode Review Berkas: sembunyikan subpanel penilaian wawancara
  const subpanelJadwalFlow = document.getElementById('drawer-subpanel-jadwal-flow');
  const subpanelWawancaraEval = document.getElementById('drawer-subpanel-wawancara-eval');
  if (subpanelJadwalFlow) subpanelJadwalFlow.classList.remove('hidden');
  if (subpanelWawancaraEval) subpanelWawancaraEval.classList.add('hidden');

  // Pastikan input jadwal aktif (re-enable jika sebelumnya dibuka dari readonly detail)
  const inputTanggal = document.getElementById('input-jadwal-tanggal');
  const inputJam = document.getElementById('input-jadwal-jam');
  const inputCatatanJadwal = document.getElementById('input-jadwal-catatan');
  if (inputTanggal) {
    inputTanggal.disabled = false;
    inputTanggal.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputJam) {
    inputJam.disabled = false;
    inputJam.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputCatatanJadwal) {
    inputCatatanJadwal.disabled = false;
    inputCatatanJadwal.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }

  // Identitas & Info Akademik
  populateDrawerHeaderProfile(item);

  // Kunci form Atur Jadwal di awal
  updateDrawerJadwalLockState(false);

  // Reset form Atur Jadwal ke default (Online)
  const radioOnline = document.querySelector('input[name="radio-metode-wawancara"][value="online"]');
  if (radioOnline) {
    radioOnline.checked = true;
    handleMetodeWawancaraChange('online');
  }

  // Populate dynamic list dokumen ke Tab Dokumen
  populateDrawerDokumenList(item);

  // Buka drawer & aktifkan Tab Dokumen
  switchDrawerDetailTab('dokumen');
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function bukaEvaluasiWawancaraDrawer(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  activeModalPelamarId = id;
  activeDrawerMode = 'evaluasi-wawancara';

  const modal = document.getElementById('modal-detail-pelamar');
  if (!modal) return;

  // Header Title & Subtitle untuk Evaluasi Wawancara
  const titleEl = document.getElementById('slide-over-title');
  if (titleEl) {
    titleEl.textContent = 'Evaluasi & Wawancara Pelamar';
    if (titleEl.nextElementSibling) {
      titleEl.nextElementSibling.textContent = 'Tinjau berkas portofolio, input skor penilaian dan catatan wawancara';
    }
  }

  // Label Tab 2 disesuaikan untuk Evaluasi Wawancara (tidak terkunci)
  const tabBtnJadwal = document.getElementById('drawer-tab-btn-jadwal');
  if (tabBtnJadwal) {
    const spanText = tabBtnJadwal.querySelector('span');
    if (spanText) spanText.textContent = 'Nilai & Catatan';
  }

  // Tampilkan subpanel wawancara eval & sembunyikan subpanel form jadwal
  const subpanelJadwalFlow = document.getElementById('drawer-subpanel-jadwal-flow');
  const subpanelWawancaraEval = document.getElementById('drawer-subpanel-wawancara-eval');
  if (subpanelJadwalFlow) subpanelJadwalFlow.classList.add('hidden');
  if (subpanelWawancaraEval) subpanelWawancaraEval.classList.remove('hidden');

  // Identitas & Info Akademik
  populateDrawerHeaderProfile(item);

  // Populate dynamic list dokumen ke Tab Dokumen
  populateDrawerDokumenList(item);

  // Inisialisasi daftar skor pertanyaan dinamis (Default: 2, Min: 1, Max: 7)
  initPertanyaanSkorList(item, false);

  const inputCatatan = document.getElementById('modal-pelamar-catatan-koor');
  if (inputCatatan) {
    inputCatatan.disabled = false;
    inputCatatan.classList.remove('bg-zinc-100', 'bg-zinc-50', 'cursor-not-allowed');
    inputCatatan.value = item.catatanWawancara || '';
  }

  // Buka drawer & aktifkan Tab Dokumen sebagai review awal
  switchDrawerDetailTab('dokumen');
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function populateDrawerHeaderProfile(item) {
  const avatarEl = document.getElementById('modal-pelamar-avatar');
  const namaEl = document.getElementById('modal-pelamar-nama');
  const metaEl = document.getElementById('modal-pelamar-meta');
  const ipkEl = document.getElementById('modal-pelamar-ipk');
  const sksEl = document.getElementById('modal-pelamar-sks');
  const semesterEl = document.getElementById('modal-pelamar-semester');
  const kontributorEl = document.getElementById('modal-pelamar-kontributor');
  const singlePrioritasBadge = document.getElementById('modal-pelamar-single-prioritas-badge');

  if (avatarEl) {
    if (item.foto) {
      avatarEl.innerHTML = `<img src="${item.foto}" alt="" class="w-full h-full rounded-full object-cover" />`;
    } else {
      const initials = (item.nama || 'M')
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
      avatarEl.textContent = initials;
    }
  }

  if (namaEl) namaEl.textContent = item.nama;
  if (metaEl) metaEl.textContent = `${item.nim} • ${item.prodi}`;
  if (ipkEl) ipkEl.textContent = item.ipk;
  if (sksEl) sksEl.textContent = `${item.sksLulus} SKS`;

  // Format semester: hanya angka (contoh: "5")
  const semRaw = String(item.semester || '5');
  const semNumOnly = semRaw.replace(/[^0-9]/g, '') || semRaw;
  if (semesterEl) semesterEl.textContent = semNumOnly;

  if (kontributorEl) {
    kontributorEl.textContent = item.kontributor || '-';
    kontributorEl.title = item.kontributor || '';
  }

  const kategoriBadgeEl = document.getElementById('modal-pelamar-kategori-badge');
  if (kategoriBadgeEl) {
    const isInternal = item.kategoriKontributor === 'internal';
    kategoriBadgeEl.innerHTML = isInternal
      ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-[#0655a7] border border-blue-200">Internal</span>`
      : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-orange-50 text-orange-700 border border-orange-200">Eksternal</span>`;
  }

  const skemaEl = document.getElementById('modal-pelamar-skema');
  const skemaSepEl = document.getElementById('modal-pelamar-skema-sep');
  if (skemaEl) {
    const rawKontributor = (item.kontributor || '').trim();
    const rawProgram = (item.program || '').trim();
    const isIdentical = rawProgram.toLowerCase() === rawKontributor.toLowerCase();
    const skemaText = isIdentical
      ? (item.kategoriKontributor === 'internal' ? 'Program Internal Kampus' : 'Program Mandiri Eksternal')
      : (rawProgram || '-');

    skemaEl.textContent = skemaText;
    skemaEl.title = skemaText;
    skemaEl.classList.remove('hidden');
    if (skemaSepEl) skemaSepEl.classList.remove('hidden');
  }

  // Hitung nomor prioritas dari pilihanProgram atau default
  let prioritasNum = 1;
  if (Array.isArray(item.pilihanProgram) && item.pilihanProgram.length > 0) {
    const found = item.pilihanProgram.find(
      (p) =>
        (p.mitra && p.mitra.toLowerCase() === (item.kontributor || '').toLowerCase()) ||
        (p.program && p.program.toLowerCase() === (item.program || '').toLowerCase())
    );
    if (found && found.prioritas) {
      prioritasNum = found.prioritas;
    }
  }

  if (singlePrioritasBadge) {
    singlePrioritasBadge.textContent = prioritasNum;
  }
}

function closePelamarDetailModal() {
  const modal = document.getElementById('modal-detail-pelamar');
  if (modal) modal.classList.add('hidden');
  activeModalPelamarId = null;

  // Reset disabled / readonly input state
  const inputSkor = document.getElementById('modal-pelamar-input-skor');
  const inputCatatan = document.getElementById('modal-pelamar-catatan-koor');
  const inputTanggal = document.getElementById('input-jadwal-tanggal');
  const inputJam = document.getElementById('input-jadwal-jam');
  const inputCatatanJadwal = document.getElementById('input-jadwal-catatan');

  if (inputSkor) {
    inputSkor.disabled = false;
    inputSkor.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputCatatan) {
    inputCatatan.disabled = false;
    inputCatatan.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputTanggal) {
    inputTanggal.disabled = false;
    inputTanggal.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputJam) {
    inputJam.disabled = false;
    inputJam.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }
  if (inputCatatanJadwal) {
    inputCatatanJadwal.disabled = false;
    inputCatatanJadwal.classList.remove('bg-zinc-100', 'cursor-not-allowed');
  }

  // Kembalikan locked state template bawaan
  const lockedState = document.getElementById('drawer-jadwal-locked-state');
  if (lockedState) {
    lockedState.innerHTML = `
      <div class="w-10 h-10 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-2.5">
        <i data-lucide="lock" class="w-5 h-5"></i>
      </div>
      <h4 class="text-sm font-semibold text-[#09090b]">Form Penjadwalan Masih Terkunci</h4>
      <p class="text-xs text-[#71717a] mt-1 max-w-sm mx-auto">
        Silakan periksa berkas di tab Dokumen, lalu klik <strong>Setujui Berkas</strong> untuk mengaktifkan pengaturan jadwal wawancara bagi kandidat ini.
      </p>
    `;
  }
}

function populateDrawerDokumenList(item) {
  const container = document.getElementById('drawer-dokumen-list');
  if (!container) return;

  const docs = Array.isArray(item.links) && item.links.length > 0 ? item.links : [
    { label: 'CV (Curriculum Vitae)', subtitle: 'Berkas riwayat hidup pelamar', url: 'https://drive.google.com/file/d/cv/view', icon: 'file-text' },
    { label: 'Portofolio', subtitle: 'Dokumentasi hasil karya & proyek', url: 'https://drive.google.com/file/d/portfolio/view', icon: 'folder-open' }
  ];

  container.innerHTML = docs
    .map((doc) => {
      const isCv = doc.label.toLowerCase().includes('cv');
      const labelText = isCv ? 'Curriculum Vitae (CV)' : (doc.label.toLowerCase().includes('port') ? 'Portofolio Proyek' : doc.label);
      const subtitleText = doc.subtitle || (isCv ? 'Berkas riwayat hidup pelamar' : 'Dokumentasi karya & proyek');
      const iconName = isCv ? 'file-text' : 'folder-open';

      return `
        <div class="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-zinc-50 transition-colors">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-[#0655a7] flex items-center justify-center shrink-0">
              <i data-lucide="${iconName}" class="w-4.5 h-4.5"></i>
            </div>
            <div class="min-w-0">
              <span class="text-sm font-medium text-[#09090b] block truncate">${labelText}</span>
              <span class="text-xs text-[#71717a] block mt-0.5">${subtitleText}</span>
            </div>
          </div>
          <a
            href="${doc.url || '#'}"
            target="_blank"
            rel="noopener noreferrer"
            class="h-8 px-3 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#09090b] text-xs font-medium inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5 text-[#71717a]"></i>
            <span>Buka</span>
          </a>
        </div>
      `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).switchDrawerDetailTab = switchDrawerDetailTab;
  (window as any).updateDrawerJadwalLockState = updateDrawerJadwalLockState;
  (window as any).bukaDetailPelamarReadOnly = bukaDetailPelamarReadOnly;
  (window as any).bukaReviewBerkasDrawer = bukaReviewBerkasDrawer;
  (window as any).bukaEvaluasiWawancaraDrawer = bukaEvaluasiWawancaraDrawer;
  (window as any).populateDrawerHeaderProfile = populateDrawerHeaderProfile;
  (window as any).closePelamarDetailModal = closePelamarDetailModal;
  (window as any).populateDrawerDokumenList = populateDrawerDokumenList;
  try {
    Object.defineProperty(window, "activeDrawerDetailTab", {
      get: () => activeDrawerDetailTab,
      set: (val) => { activeDrawerDetailTab = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeDrawerDetailTab = activeDrawerDetailTab;
  }
  try {
    Object.defineProperty(window, "isDrawerJadwalUnlocked", {
      get: () => isDrawerJadwalUnlocked,
      set: (val) => { isDrawerJadwalUnlocked = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).isDrawerJadwalUnlocked = isDrawerJadwalUnlocked;
  }
}

export {
  switchDrawerDetailTab,
  updateDrawerJadwalLockState,
  bukaDetailPelamarReadOnly,
  bukaReviewBerkasDrawer,
  bukaEvaluasiWawancaraDrawer,
  populateDrawerHeaderProfile,
  closePelamarDetailModal,
  populateDrawerDokumenList,
  activeDrawerDetailTab,
  isDrawerJadwalUnlocked,
};
