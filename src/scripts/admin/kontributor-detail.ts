// @ts-nocheck
// ==============================================================================
// DETAIL KONTRIBUTOR HERO & ADAPTIVE TABS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


// ====================================================
// CONTROLLER DETAIL KONTRIBUTOR (HERO CARD + 3 MINI KPI + ADAPTIVE TABS)
// ====================================================
let activeDetailKontributorTabPane = 1;

function showKontributorDetail(id) {
  const item = kontributorListData.find((m) => m.id === id);
  if (!item) return;

  activeDetailKontributorId = id;
  document.getElementById('subview-kontributor-list').classList.add('hidden');
  const detailView = document.getElementById('subview-kontributor-detail');
  detailView.classList.remove('hidden');

  // Sembunyikan Header Baris 2 Direktori & Tombol Tambah Kontributor
  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.add('hidden');

  updateBreadcrumb(['Kontributor', 'Detail']);

  // 1. Populate Hero Profile Card
  const avatarEl = document.getElementById('kontributor-detail-avatar');
  if (avatarEl) {
    avatarEl.className = 'h-14 w-14 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] text-[#09090b] font-semibold text-lg flex items-center justify-center shrink-0';
    avatarEl.textContent = item.avatar;
  }
  const nameEl = document.getElementById('kontributor-detail-name');
  if (nameEl) nameEl.textContent = item.nama;
  const deskEl = document.getElementById('kontributor-detail-deskripsi');
  if (deskEl) deskEl.textContent = item.deskripsi || '-';
  const picEl = document.getElementById('kontributor-detail-pic');
  if (picEl) {
    picEl.textContent = item.tipe === 'internal' && item.picEmail
      ? `${item.picNama} (${item.picEmail})`
      : item.picNama;
  }

  // Badge Tipe Kontributor
  const typeBadge = document.getElementById('kontributor-detail-type-badge');
  if (typeBadge) {
    typeBadge.className = 'inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2.5 py-0.5 text-xs font-medium text-[#09090b]';
    if (item.tipe === 'internal') {
      typeBadge.innerHTML = '<i data-lucide="building" class="w-3.5 h-3.5 text-[#71717a]"></i><span>Kontributor Internal</span>';
    } else {
      typeBadge.innerHTML = '<i data-lucide="globe" class="w-3.5 h-3.5 text-[#71717a]"></i><span>Kontributor Eksternal</span>';
    }
  }

  // 2. Populate 2 Mini KPI Cards (Dospem & Mahasiswa)
  const totalDosen = item.dosen ? item.dosen.length : 0;
  const totalMhs = item.mhs ? item.mhs.length : 0;

  const kpiVal2 = document.getElementById('kpi-kontributor-val-2');
  if (kpiVal2) kpiVal2.textContent = `${totalDosen} Dosen`;

  const kpiVal3 = document.getElementById('kpi-kontributor-val-3');
  if (kpiVal3) kpiVal3.textContent = `${totalMhs} Mahasiswa`;

  // 3. Render Tabs Header (Hanya Daftar Mahasiswa & Daftar Dosen)
  const tabsHeader = document.getElementById('kontributor-detail-tabs-header');
  if (tabsHeader) {
    tabsHeader.innerHTML = `
      <button
        type="button"
        id="btn-detail-tab-1"
        onclick="switchKontributorDetailTab(1)"
        class="detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors"
      >
        <i data-lucide="users" class="mr-2 h-4 w-4"></i>
        <span>Daftar Mahasiswa</span>
      </button>
      <button
        type="button"
        id="btn-detail-tab-2"
        onclick="switchKontributorDetailTab(2)"
        class="detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors"
      >
        <i data-lucide="user-check" class="mr-2 h-4 w-4"></i>
        <span>Daftar Dosen</span>
      </button>
    `;
  }

  // 4. Render Pane Content
  const pane1 = document.getElementById('kontributor-detail-pane-1');
  const pane2 = document.getElementById('kontributor-detail-pane-2');
  const pane3 = document.getElementById('kontributor-detail-pane-3');

  // Helper render tabel mahasiswa bersih (No, Mahasiswa, Prodi, Dospem, Status)
  const renderTableMahasiswa = (mhsList) => `
    <div class="rounded-md border border-[#e4e4e7] overflow-hidden bg-white">
      <table class="w-full text-sm">
        <thead class="border-b border-[#e4e4e7] bg-[#fafafa]">
          <tr>
            <th class="h-11 w-12 px-3 text-center text-xs font-semibold text-[#71717a]">No</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Mahasiswa</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Program Studi</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Dosen Pembimbing</th>
            <th class="h-10 px-4 text-center font-medium text-[#71717a] text-xs">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e4e4e7]">
          ${mhsList.length === 0 ? '<tr><td colspan="5" class="py-6 text-center text-sm text-[#71717a]">Belum ada data mahasiswa terdaftar.</td></tr>' : mhsList.map((m, idx) => `
            <tr class="h-12 border-b border-[#e4e4e7] hover:bg-[#f4f4f5]/60 transition-colors">
              <td class="w-12 px-3 text-center text-xs text-[#71717a]">${idx + 1}</td>
              <td class="px-4">
                <div class="font-medium text-[#09090b] text-sm">${m.nama}</div>
                <div class="text-[#71717a] text-xs">${m.nim}</div>
              </td>
              <td class="px-4 text-sm text-[#71717a]">${m.prodi}</td>
              <td class="px-4 text-sm text-[#09090b]">${m.dospem || '-'}</td>
              <td class="px-4 text-center">
                <span class="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">Aktif</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  if (pane1) pane1.innerHTML = renderTableMahasiswa(item.mhs || []);
  if (pane2) pane2.innerHTML = renderRelasiDospemMahasiswa(item.dosen || [], item.mhs || []);
  if (pane3) pane3.innerHTML = '';

  switchKontributorDetailTab(1);
  if (window.lucide) window.lucide.createIcons();
}

// Daftar Dosen Pembimbing beserta mahasiswa bimbingannya di kontributor ini (satu tampilan)
function renderRelasiDospemMahasiswa(dosenList, mhsList) {
  const groups = dosenList.map((d) => ({
    nama: d.nama,
    nidn: d.nidn,
    prodi: d.prodi,
    mhs: mhsList.filter((m) => m.dospem === d.nama),
  }));
  const belumAda = mhsList.filter((m) => !m.dospem || !dosenList.some((d) => d.nama === m.dospem));
  if (belumAda.length > 0) {
    groups.push({ nama: 'Belum Ada Dospem', nidn: '-', prodi: '-', mhs: belumAda });
  }
  if (groups.length === 0) {
    return '<div class="rounded-lg border border-[#e4e4e7] bg-white py-6 text-center text-sm text-[#71717a]">Belum ada relasi Dosen Pembimbing dan mahasiswa.</div>';
  }

  return groups.map((g) => `
    <div class="rounded-lg border border-[#e4e4e7] overflow-hidden bg-white">
      <div class="flex items-center justify-between gap-3 px-4 py-3 bg-[#fafafa] border-b border-[#e4e4e7]">
        <div>
          <p class="text-sm font-semibold text-[#09090b]">${g.nama}</p>
          <p class="text-xs text-[#71717a]">${g.nidn !== '-' ? 'NIDN ' + g.nidn + ' · ' : ''}${g.prodi}</p>
        </div>
        <span class="inline-flex items-center rounded-md border border-[#e4e4e7] bg-[#f4f4f5] px-2.5 py-0.5 text-xs font-semibold text-[#09090b]">${g.mhs.length} Mahasiswa</span>
      </div>
      <table class="w-full text-sm">
        <thead class="border-b border-[#e4e4e7]">
          <tr>
            <th class="h-11 w-12 px-3 text-center text-xs font-semibold text-[#71717a]">No</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Mahasiswa</th>
            <th class="h-10 px-4 text-left font-medium text-[#71717a] text-xs">Program Studi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e4e4e7]">
          ${g.mhs.length === 0 ? '<tr><td colspan="3" class="py-5 text-center text-sm text-[#71717a]">Belum ada mahasiswa bimbingan di kontributor ini.</td></tr>' : g.mhs.map((m, idx) => `
            <tr class="h-12 hover:bg-[#f4f4f5]/60 transition-colors">
              <td class="w-12 px-3 text-center text-xs text-[#71717a]">${idx + 1}</td>
              <td class="px-4">
                <div class="font-medium text-[#09090b] text-sm">${m.nama}</div>
                <div class="text-[#71717a] text-xs">${m.nim}</div>
              </td>
              <td class="px-4 text-sm text-[#71717a]">${m.prodi}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `).join('');
}

function switchKontributorDetailTab(paneIndex) {
  activeDetailKontributorTabPane = paneIndex;
  for (let i = 1; i <= 3; i++) {
    const pane = document.getElementById('kontributor-detail-pane-' + i);
    const btn = document.getElementById('btn-detail-tab-1') && document.getElementById('btn-detail-tab-' + i);
    if (pane) {
      if (i === paneIndex) pane.classList.remove('hidden');
      else pane.classList.add('hidden');
    }
    if (btn) {
      if (i === paneIndex) {
        btn.className = 'detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-[#0655a7] text-[#0655a7] transition-colors';
      } else {
        btn.className = 'detail-tab-btn flex items-center px-4 py-2.5 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors';
      }
    }
  }
  if (window.lucide) window.lucide.createIcons();
}

function hideKontributorDetail() {
  const list = document.getElementById('subview-kontributor-list');
  const detail = document.getElementById('subview-kontributor-detail');
  if (list) list.classList.remove('hidden');
  if (detail) detail.classList.add('hidden');
  activeDetailKontributorId = null;

  // Tampilkan kembali Header Baris 2 Direktori & Tombol Tambah Kontributor
  const bar2 = document.getElementById('dashboard-header-bar-2');
  if (bar2) bar2.classList.remove('hidden');

  updateBreadcrumb(['Kontributor']);
}

// Legacy alias for compatibility
function switchKontributorTab(tabKey) {
  if (tabKey === 'program') switchKontributorDetailTab(1);
  else if (tabKey === 'dosen') switchKontributorDetailTab(2);
  else if (tabKey === 'mhs') switchKontributorDetailTab(3);
}

// ====================================================
// NAVIGASI KELOLA PROGRAM (HALAMAN TERSENDIRI)
// ====================================================
function openKontributorProgram(kontributorId) {
  const kontributor = kontributorListData.find((m) => m.id === kontributorId);
  const id = kontributor ? kontributor.id : (kontributorId || 1);
  window.location.href = `/koordinator/kontributor/program?id=${id}`;
}

// Alias backward compatibility
function openModalKelolaProgram(kontributorId) {
  openKontributorProgram(kontributorId);
}


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).showKontributorDetail = showKontributorDetail;
  (window as any).renderRelasiDospemMahasiswa = renderRelasiDospemMahasiswa;
  (window as any).switchKontributorDetailTab = switchKontributorDetailTab;
  (window as any).hideKontributorDetail = hideKontributorDetail;
  (window as any).switchKontributorTab = switchKontributorTab;
  (window as any).openKontributorProgram = openKontributorProgram;
  (window as any).openModalKelolaProgram = openModalKelolaProgram;
  try {
    Object.defineProperty(window, "activeDetailKontributorTabPane", {
      get: () => activeDetailKontributorTabPane,
      set: (val) => { activeDetailKontributorTabPane = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeDetailKontributorTabPane = activeDetailKontributorTabPane;
  }
}

export {
  showKontributorDetail,
  renderRelasiDospemMahasiswa,
  switchKontributorDetailTab,
  hideKontributorDetail,
  switchKontributorTab,
  openKontributorProgram,
  openModalKelolaProgram,
  activeDetailKontributorTabPane,
};
