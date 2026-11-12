// @ts-nocheck
// ==============================================================================
// PELAMAR EVALUASI WAWANCARA & SCORING DINAMIS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// ====================================================
// MANAJEMEN SKOR PERTANYAAN WAWANCARA DINAMIS (1 - 7)
// ====================================================
let activePertanyaanSkorList = ['', ''];
const MIN_PERTANYAAN_SKOR = 1;
const MAX_PERTANYAAN_SKOR = 7;
let isPertanyaanSkorReadOnly = false;

function initPertanyaanSkorList(item, isReadOnly = false) {
  isPertanyaanSkorReadOnly = isReadOnly;
  if (Array.isArray(item.skorPertanyaan) && item.skorPertanyaan.length > 0) {
    activePertanyaanSkorList = item.skorPertanyaan.slice(0, MAX_PERTANYAAN_SKOR);
  } else if (item.nilaiWawancara !== undefined && item.nilaiWawancara !== null) {
    activePertanyaanSkorList = [item.nilaiWawancara, item.nilaiWawancara];
  } else {
    // Default 2 pertanyaan
    activePertanyaanSkorList = ['', ''];
  }

  if (activePertanyaanSkorList.length < MIN_PERTANYAAN_SKOR) {
    activePertanyaanSkorList = [''];
  }
  renderPertanyaanSkorList(isReadOnly);
}

function renderPertanyaanSkorList(isReadOnly = false) {
  const container = document.getElementById('container-pertanyaan-skor-list');
  const btnTambah = document.getElementById('btn-tambah-pertanyaan-skor');
  if (!container) return;

  const total = activePertanyaanSkorList.length;

  if (btnTambah) {
    if (isReadOnly || activeDrawerMode === 'readonly-detail') {
      btnTambah.classList.add('hidden');
    } else {
      btnTambah.classList.remove('hidden');
      if (total >= MAX_PERTANYAAN_SKOR) {
        btnTambah.disabled = true;
        btnTambah.classList.add('opacity-40', 'cursor-not-allowed');
        btnTambah.classList.remove('hover:bg-blue-50/70', 'cursor-pointer');
      } else {
        btnTambah.disabled = false;
        btnTambah.classList.remove('opacity-40', 'cursor-not-allowed');
        btnTambah.classList.add('hover:bg-blue-50/70', 'cursor-pointer');
      }
    }
  }

  container.innerHTML = activePertanyaanSkorList.map((val, idx) => {
    const nomor = idx + 1;
    const canDelete = !isReadOnly && total > MIN_PERTANYAAN_SKOR;
    const isValSet = val !== '' && val !== null && val !== undefined;
    const disabledAttr = isReadOnly
      ? 'disabled class="h-8 w-20 rounded-md border border-[#e4e4e7] bg-zinc-100 px-2 text-right text-xs font-semibold text-[#09090b] cursor-not-allowed"'
      : 'class="h-8 w-20 rounded-md border border-[#e4e4e7] bg-white px-2 text-right text-xs font-semibold text-[#09090b] focus:outline-none focus:ring-1 focus:ring-[#0655a7]"';

    return `
      <div class="flex items-center justify-between py-1.5 px-1 rounded-md hover:bg-zinc-50/60 transition-colors">
        <span class="text-xs font-medium text-[#09090b]">Pertanyaan ${nomor}</span>
        <div class="flex items-center gap-2">
          <input
            type="number"
            min="0"
            max="100"
            value="${isValSet ? val : ''}"
            placeholder="0 - 100"
            ${disabledAttr}
            oninput="handleInputSkorPertanyaan(${idx}, this.value)"
          />
          ${canDelete ? `
            <button
              type="button"
              onclick="hapusPertanyaanSkor(${idx})"
              class="p-1.5 text-[#71717a] hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer shrink-0"
              title="Hapus Pertanyaan ${nomor}"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  updateRataRataSkor();
}

function tambahPertanyaanSkor() {
  if (isPertanyaanSkorReadOnly || activeDrawerMode === 'readonly-detail') return;
  if (activePertanyaanSkorList.length >= MAX_PERTANYAAN_SKOR) return;
  activePertanyaanSkorList.push('');
  renderPertanyaanSkorList(false);
}

function hapusPertanyaanSkor(index) {
  if (isPertanyaanSkorReadOnly || activeDrawerMode === 'readonly-detail') return;
  if (activePertanyaanSkorList.length <= MIN_PERTANYAAN_SKOR) return;
  activePertanyaanSkorList.splice(index, 1);
  renderPertanyaanSkorList(false);
}

function handleInputSkorPertanyaan(index, value) {
  if (value === '') {
    activePertanyaanSkorList[index] = '';
  } else {
    const parsed = parseInt(value, 10);
    activePertanyaanSkorList[index] = isNaN(parsed) ? '' : Math.max(0, Math.min(100, parsed));
  }
  updateRataRataSkor();
}

function updateRataRataSkor() {
  const labelEl = document.getElementById('label-rata-rata-skor');
  const inputHidden = document.getElementById('modal-pelamar-input-skor');

  const filled = activePertanyaanSkorList.filter(
    (v) => v !== '' && v !== null && !isNaN(parseInt(v, 10))
  );

  if (filled.length > 0) {
    const totalScore = filled.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    const avg = Math.round(totalScore / filled.length);
    if (labelEl) labelEl.textContent = avg;
    if (inputHidden) inputHidden.value = avg;
  } else {
    if (labelEl) labelEl.textContent = '-';
    if (inputHidden) inputHidden.value = '';
  }
}

window.initPertanyaanSkorList = initPertanyaanSkorList;
window.renderPertanyaanSkorList = renderPertanyaanSkorList;
window.tambahPertanyaanSkor = tambahPertanyaanSkor;
window.hapusPertanyaanSkor = hapusPertanyaanSkor;
window.handleInputSkorPertanyaan = handleInputSkorPertanyaan;

function tolakBerkasPelamar() {
  if (!activeModalPelamarId || activeDrawerMode === 'readonly-detail') return;
  const item = pelamarListData.find((p) => p.id === activeModalPelamarId);
  if (!item) return;

  if (confirm(`Tolak berkas pengajuan pendaftar ${item.nama}?\n\nPendaftar akan otomatis dipindahkan ke tab "Dibatalkan".`)) {
    item.status = 'dibatalkan';
    item.alasanBatal = 'Berkas persyaratan administrasi ditolak oleh Koordinator MBKM.';
    alert(`Berkas mahasiswa ${item.nama} DITOLAK.\nStatus kandidat kini berpindah ke tab "Dibatalkan".`);
    closePelamarDetailModal();
    renderPelamarTable();
  }
}

let activeJadwalPelamarId = null;

function bukaModalJadwalWawancaraPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;

  activeJadwalPelamarId = id;
  const modal = document.getElementById('modal-jadwal-wawancara-pelamar');
  if (!modal) return;

  const infoEl = document.getElementById('modal-jadwal-pelamar-info');
  if (infoEl) {
    infoEl.textContent = `${item.nama} (${item.nim}) • ${item.kontributor || item.program || '-'}`;
  }

  const tglInput = document.getElementById('input-jadwal-tanggal');
  const jamInput = document.getElementById('input-jadwal-jam');
  const catatanInput = document.getElementById('input-jadwal-catatan');
  const radioOnline = document.querySelector('input[name="radio-metode-wawancara"][value="online"]');

  if (tglInput) tglInput.value = '2026-10-22';
  if (jamInput) jamInput.value = '09:00';
  if (catatanInput) catatanInput.value = 'https://meet.google.com/bengkod-ai-eval';
  if (radioOnline) {
    radioOnline.checked = true;
    handleMetodeWawancaraChange('online');
  }

  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalJadwalWawancaraPelamar() {
  const modal = document.getElementById('modal-jadwal-wawancara-pelamar');
  if (modal) modal.classList.add('hidden');
  activeJadwalPelamarId = null;
}

function setujuiBerkasPelamar() {
  if (!activeModalPelamarId || activeDrawerMode === 'readonly-detail') return;
  const targetId = activeModalPelamarId;
  closePelamarDetailModal();
  bukaModalJadwalWawancaraPelamar(targetId);
}

function handleMetodeWawancaraChange(metode) {
  const labelEl = document.getElementById('label-jadwal-lokasi');
  const catatanInput = document.getElementById('input-jadwal-catatan');
  if (!labelEl || !catatanInput) return;

  if (metode === 'offline') {
    labelEl.textContent = 'Informasi Ruangan / Lokasi Tatap Muka:';
    catatanInput.placeholder = 'Contoh: Gedung H Lantai 3 Ruang H.3.1';
    if (catatanInput.value.includes('meet.google.com') || catatanInput.value.includes('http')) {
      catatanInput.value = 'Ruang Lab Software Gedung H Lantai 3 (H.3.1)';
    }
  } else {
    labelEl.textContent = 'Informasi Link Pertemuan (Google Meet / Zoom):';
    catatanInput.placeholder = 'Contoh: meet.google.com/bengkod-ai-eval';
    if (catatanInput.value.includes('Gedung H') || catatanInput.value.includes('Ruang')) {
      catatanInput.value = 'https://meet.google.com/bengkod-ai-eval';
    }
  }
}

function simpanJadwalWawancara() {
  const targetId = activeJadwalPelamarId || (activeDrawerMode !== 'readonly-detail' ? activeModalPelamarId : null);
  if (!targetId) return;
  const item = pelamarListData.find((p) => p.id === targetId);
  if (!item) return;

  const tglInput = document.getElementById('input-jadwal-tanggal');
  const jamInput = document.getElementById('input-jadwal-jam');
  const catatanInput = document.getElementById('input-jadwal-catatan');
  const radioOffline = document.querySelector('input[name="radio-metode-wawancara"][value="offline"]');
  const isOffline = radioOffline && radioOffline.checked;

  const tglVal = tglInput ? tglInput.value : '';
  const jamVal = jamInput ? jamInput.value : '';
  const infoVal = catatanInput ? catatanInput.value.trim() : '';

  // Format tanggal ringkas ke format tampilan: "22 Okt, 09:00 WIB"
  let formattedJadwal = '22 Okt, 09:00 WIB';
  if (tglVal) {
    try {
      const d = new Date(`${tglVal}T${jamVal || '09:00'}:00`);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      formattedJadwal = `${d.getDate()} ${monthNames[d.getMonth()]}, ${jamVal || '09:00'} WIB`;
    } catch (_) {
      formattedJadwal = `${tglVal}, ${jamVal} WIB`;
    }
  }

  const prefixMetode = isOffline ? 'Offline' : 'Online';
  const defaultLokasi = isOffline ? 'Ruang Lab H.3.1' : 'https://meet.google.com/bengkod-ai-eval';
  const lokasiFinal = infoVal ? `${prefixMetode} (${infoVal})` : `${prefixMetode} (${defaultLokasi})`;

  item.jadwalWawancara = formattedJadwal;
  item.lokasiWawancara = lokasiFinal;
  if (infoVal) {
    item.catatanWawancara = infoVal;
  }
  item.status = 'wawancara';

  alert(`Jadwal wawancara berhasil disimpan!\n\nMahasiswa: ${item.nama}\nJadwal: ${item.jadwalWawancara}\nLokasi / Tautan: ${item.lokasiWawancara}\n\nKandidat kini berpindah ke tab "Wawancara".`);

  closeModalJadwalWawancaraPelamar();
  closePelamarDetailModal();
  renderPelamarTable();
}

function submitKeputusanWawancara(statusKeputusan) {
  if (!activeModalPelamarId || activeDrawerMode === 'readonly-detail') return;
  const item = pelamarListData.find((p) => p.id === activeModalPelamarId);
  if (!item) return;

  const inputSkor = document.getElementById('modal-pelamar-input-skor');
  const inputCatatan = document.getElementById('modal-pelamar-catatan-koor');

  const skorVal = inputSkor ? parseInt(inputSkor.value, 10) : null;
  const catatanVal = inputCatatan ? inputCatatan.value.trim() : '';

  if (!isNaN(skorVal) && skorVal !== null) {
    item.nilaiWawancara = skorVal;
  }
  if (Array.isArray(activePertanyaanSkorList)) {
    item.skorPertanyaan = [...activePertanyaanSkorList];
  }
  if (catatanVal) {
    item.catatanWawancara = catatanVal;
  }
  item.status = statusKeputusan;

  const labelStatus = statusKeputusan === 'diterima' ? 'LOLOS SELEKSI (Diterima)' : 'DITOLAK';
  alert(`Keputusan wawancara berhasil disimpan!\n\nMahasiswa: ${item.nama}\nKeputusan: ${labelStatus}\nSkor: ${item.nilaiWawancara || '-'}/100\nCatatan: ${item.catatanWawancara || '-'}\n\nKandidat berpindah ke tab "${statusKeputusan === 'diterima' ? 'Diterima' : 'Ditolak'}".`);

  closePelamarDetailModal();
  renderPelamarTable();
}

function triggerTranskripFromDetailModal() {
  if (!activeModalPelamarId) return;
  lihatTranskripPelamar(activeModalPelamarId);
}

function tolakPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;
  if (item.kategoriKontributor === 'internal') {
    alert('Seleksi kontributor internal hanya dapat dilakukan oleh akun Kontributor.');
    return;
  }
  if (confirm(`Tolak pengajuan pendaftar ${item.nama}?`)) {
    item.status = 'ditolak';
    renderPelamarTable();
  }
}

function lihatTranskripPelamar(id) {
  const item = pelamarListData.find((p) => p.id === id);
  if (!item) return;

  const modal = document.getElementById('modal-transkrip-pelamar');
  const namaEl = document.getElementById('modal-transkrip-nama');
  const nimEl = document.getElementById('modal-transkrip-nim');
  const ipkEl = document.getElementById('modal-transkrip-ipk');
  const sksEl = document.getElementById('modal-transkrip-sks');

  if (namaEl) namaEl.textContent = item.nama;
  if (nimEl) nimEl.textContent = `${item.nim} • ${item.prodi}`;
  if (ipkEl) ipkEl.textContent = `IPK: ${item.ipk}`;
  if (sksEl) sksEl.textContent = `${item.sksLulus} SKS Lulus (${item.semester})`;

  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTranskripModal() {
  const modal = document.getElementById('modal-transkrip-pelamar');
  if (modal) modal.classList.add('hidden');
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  if (!(window as any).__jadwalWawancaraModalEscBound) {
    (window as any).__jadwalWawancaraModalEscBound = true;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModalJadwalWawancaraPelamar();
      }
    });
  }
  (window as any).bukaModalJadwalWawancaraPelamar = bukaModalJadwalWawancaraPelamar;
  (window as any).closeModalJadwalWawancaraPelamar = closeModalJadwalWawancaraPelamar;
  (window as any).initPertanyaanSkorList = initPertanyaanSkorList;
  (window as any).renderPertanyaanSkorList = renderPertanyaanSkorList;
  (window as any).tambahPertanyaanSkor = tambahPertanyaanSkor;
  (window as any).hapusPertanyaanSkor = hapusPertanyaanSkor;
  (window as any).handleInputSkorPertanyaan = handleInputSkorPertanyaan;
  (window as any).updateRataRataSkor = updateRataRataSkor;
  (window as any).tolakBerkasPelamar = tolakBerkasPelamar;
  (window as any).setujuiBerkasPelamar = setujuiBerkasPelamar;
  (window as any).handleMetodeWawancaraChange = handleMetodeWawancaraChange;
  (window as any).simpanJadwalWawancara = simpanJadwalWawancara;
  (window as any).submitKeputusanWawancara = submitKeputusanWawancara;
  (window as any).triggerTranskripFromDetailModal = triggerTranskripFromDetailModal;
  (window as any).tolakPelamar = tolakPelamar;
  (window as any).lihatTranskripPelamar = lihatTranskripPelamar;
  (window as any).closeTranskripModal = closeTranskripModal;
  try {
    Object.defineProperty(window, "activePertanyaanSkorList", {
      get: () => activePertanyaanSkorList,
      set: (val) => { activePertanyaanSkorList = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activePertanyaanSkorList = activePertanyaanSkorList;
  }
  try {
    Object.defineProperty(window, "MIN_PERTANYAAN_SKOR", {
      get: () => MIN_PERTANYAAN_SKOR,
      
      configurable: true
    });
  } catch (_) {
    (window as any).MIN_PERTANYAAN_SKOR = MIN_PERTANYAAN_SKOR;
  }
  try {
    Object.defineProperty(window, "MAX_PERTANYAAN_SKOR", {
      get: () => MAX_PERTANYAAN_SKOR,
      
      configurable: true
    });
  } catch (_) {
    (window as any).MAX_PERTANYAAN_SKOR = MAX_PERTANYAAN_SKOR;
  }
  try {
    Object.defineProperty(window, "isPertanyaanSkorReadOnly", {
      get: () => isPertanyaanSkorReadOnly,
      set: (val) => { isPertanyaanSkorReadOnly = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).isPertanyaanSkorReadOnly = isPertanyaanSkorReadOnly;
  }
}

export {
  bukaModalJadwalWawancaraPelamar,
  closeModalJadwalWawancaraPelamar,
  initPertanyaanSkorList,
  renderPertanyaanSkorList,
  tambahPertanyaanSkor,
  hapusPertanyaanSkor,
  handleInputSkorPertanyaan,
  updateRataRataSkor,
  tolakBerkasPelamar,
  setujuiBerkasPelamar,
  handleMetodeWawancaraChange,
  simpanJadwalWawancara,
  submitKeputusanWawancara,
  triggerTranskripFromDetailModal,
  tolakPelamar,
  lihatTranskripPelamar,
  closeTranskripModal,
  activePertanyaanSkorList,
  MIN_PERTANYAAN_SKOR,
  MAX_PERTANYAAN_SKOR,
  isPertanyaanSkorReadOnly,
};
