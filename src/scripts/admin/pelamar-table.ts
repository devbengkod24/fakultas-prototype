// @ts-nocheck
// ==============================================================================
// PELAMAR & SELEKSI TABLE VIEW
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================


// 5. MODUL MAHASISWA - PENDAFTAR (Sesuai Layout Tugas Akhir Pengajuan Mahasiswa)
let pendaftarActiveStatusTab = 'berkas'; // 'baru' | 'wawancara' | 'hasil'
let pendaftarViewMode = 'kartu'; // 'kartu' | 'tabel'
let pendaftarSort = 'terbaru';
let pelamarSearchQuery = '';
let pelamarFilterKontributor = 'semua'; // default: 'semua' (Bengkel Koding, IDSS Laboratory, Dicoding Indonesia)
let pelamarFilterProdi = 'semua';
let pelamarCurrentPage = 1;
let pelamarItemsPerPage = 5;
let activeModalPelamarId = null;
let activeDrawerMode = 'review-berkas'; // 'review-berkas' | 'evaluasi-wawancara'
let isJadwalUnlocked = false;

function switchPendaftarStatusTab(tabKey) {
  pendaftarActiveStatusTab = tabKey;
  const tabs = ['berkas', 'wawancara', 'diterima', 'ditolak', 'dibatalkan'];

  tabs.forEach((t) => {
    const btn = document.getElementById('tab-pendaftar-' + t);
    if (!btn) return;
    if (t === tabKey) {
      btn.className =
        'flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 border-[#0655a7] text-[#0655a7] transition-colors cursor-pointer shrink-0';
    } else {
      btn.className =
        'flex items-center gap-2 pb-3 text-sm font-medium border-b-2 border-transparent text-[#71717a] hover:text-[#09090b] transition-colors cursor-pointer shrink-0';
    }
  });

  const selectView = document.getElementById('select-pendaftar-view');
  const cardsCont = document.getElementById('pendaftar-cards-container');
  const tableCont = document.getElementById('pendaftar-table-container');

  // Tampilkan toggle view (kartu/tabel) HANYA pada tab Berkas
  if (selectView) {
    if (tabKey === 'berkas') {
      selectView.classList.remove('hidden');
      selectView.value = pendaftarViewMode;
    } else {
      selectView.classList.add('hidden');
    }
  }

  // Jika bukan tab berkas, paksa tampil tabel saja
  if (tabKey !== 'berkas') {
    if (cardsCont) cardsCont.classList.add('hidden');
    if (tableCont) tableCont.classList.remove('hidden');
  } else {
    // Pada tab Berkas, ikuti pendaftarViewMode aktif
    if (pendaftarViewMode === 'kartu') {
      if (cardsCont) cardsCont.classList.remove('hidden');
      if (tableCont) tableCont.classList.add('hidden');
    } else {
      if (cardsCont) cardsCont.classList.add('hidden');
      if (tableCont) tableCont.classList.remove('hidden');
    }
    if (selectView) selectView.value = pendaftarViewMode;
  }

  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function switchPendaftarViewMode(mode) {
  pendaftarViewMode = mode;
  const cardsCont = document.getElementById('pendaftar-cards-container');
  const tableCont = document.getElementById('pendaftar-table-container');

  if (mode === 'kartu') {
    if (cardsCont) cardsCont.classList.remove('hidden');
    if (tableCont) tableCont.classList.add('hidden');
  } else {
    if (cardsCont) cardsCont.classList.add('hidden');
    if (tableCont) tableCont.classList.remove('hidden');
  }
  renderPelamarTable();
}

function handleSortPendaftar(sortVal) {
  pendaftarSort = sortVal;
  renderPelamarTable();
}

function handleSearchPelamar(val) {
  pelamarSearchQuery = (val || '').toLowerCase().trim();
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function handleFilterPelamarKontributor(val) {
  pelamarFilterKontributor = val;
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function handleFilterPelamarProdi(val) {
  pelamarFilterProdi = val;
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function updatePendaftarTabBadges() {
  const countBerkas = pelamarListData.filter((p) => p.status === 'baru' || p.status === 'berkas').length;
  const countWawancara = pelamarListData.filter((p) => p.status === 'wawancara').length;
  const countDiterima = pelamarListData.filter((p) => p.status === 'diterima').length;
  const countDitolak = pelamarListData.filter((p) => p.status === 'ditolak').length;
  const countDibatalkan = pelamarListData.filter((p) => p.status === 'dibatalkan').length;

  const bBerkas = document.getElementById('badge-count-pendaftar-berkas');
  const bWawancara = document.getElementById('badge-count-pendaftar-wawancara');
  const bDiterima = document.getElementById('badge-count-pendaftar-diterima');
  const bDitolak = document.getElementById('badge-count-pendaftar-ditolak');
  const bDibatalkan = document.getElementById('badge-count-pendaftar-dibatalkan');

  if (bBerkas) bBerkas.textContent = countBerkas;
  if (bWawancara) bWawancara.textContent = countWawancara;
  if (bDiterima) bDiterima.textContent = countDiterima;
  if (bDitolak) bDitolak.textContent = countDitolak;
  if (bDibatalkan) bDibatalkan.textContent = countDibatalkan;
}

function getFilteredPelamarData() {
  let list = pelamarListData.filter((p) => {
    // 5 Tab Status: berkas, wawancara, diterima, ditolak, dibatalkan
    let matchStatus = false;
    if (pendaftarActiveStatusTab === 'berkas') {
      matchStatus = p.status === 'baru' || p.status === 'berkas';
    } else if (pendaftarActiveStatusTab === 'wawancara') {
      matchStatus = p.status === 'wawancara';
    } else if (pendaftarActiveStatusTab === 'diterima') {
      matchStatus = p.status === 'diterima';
    } else if (pendaftarActiveStatusTab === 'ditolak') {
      matchStatus = p.status === 'ditolak';
    } else if (pendaftarActiveStatusTab === 'dibatalkan') {
      matchStatus = p.status === 'dibatalkan';
    } else {
      matchStatus = true;
    }

    // Search Query
    const matchQuery =
      !pelamarSearchQuery ||
      p.nama.toLowerCase().includes(pelamarSearchQuery) ||
      p.nim.toLowerCase().includes(pelamarSearchQuery) ||
      p.program.toLowerCase().includes(pelamarSearchQuery) ||
      p.kontributor.toLowerCase().includes(pelamarSearchQuery) ||
      p.deskripsi.toLowerCase().includes(pelamarSearchQuery);

    // Kontributor Filter (Semua, Eksternal, Internal, atau Nama Spesifik)
    let matchKontributor = true;
    if (pelamarFilterKontributor === 'eksternal') {
      matchKontributor = p.kategoriKontributor === 'eksternal';
    } else if (pelamarFilterKontributor === 'internal') {
      matchKontributor = p.kategoriKontributor === 'internal';
    } else if (pelamarFilterKontributor !== 'semua') {
      matchKontributor =
        p.kontributor === pelamarFilterKontributor ||
        p.program === pelamarFilterKontributor ||
        (p.jenisProgram && p.jenisProgram === pelamarFilterKontributor);
    }

    // Prodi Filter
    const matchProdi =
      pelamarFilterProdi === 'semua' || p.prodi === pelamarFilterProdi;

    return matchStatus && matchQuery && matchKontributor && matchProdi;
  });

  // Sorting
  if (pendaftarSort === 'ipk-tinggi') {
    list.sort((a, b) => parseFloat(b.ipk) - parseFloat(a.ipk));
  } else if (pendaftarSort === 'nama-asc') {
    list.sort((a, b) => a.nama.localeCompare(b.nama));
  } else {
    // Default: Terbaru
    list.sort((a, b) => b.id - a.id);
  }

  return list;
}

function renderPelamarTable() {
  updatePendaftarTabBadges();

  const cardsContainer = document.getElementById('pendaftar-cards-container');
  const tbody = document.getElementById('pelamar-table-tbody');
  const infoEl = document.getElementById('pelamar-table-info');
  const paginationEl = document.getElementById('pelamar-pagination-controls');

  const filtered = getFilteredPelamarData();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pelamarItemsPerPage) || 1;
  if (pelamarCurrentPage > totalPages) pelamarCurrentPage = totalPages;

  const startIndex = (pelamarCurrentPage - 1) * pelamarItemsPerPage;
  const endIndex = Math.min(startIndex + pelamarItemsPerPage, totalItems);
  const currentSlice = filtered.slice(startIndex, endIndex);

  // 1. Render Tampilan Kartu (Sesuai Gambar Tugas Akhir)
  if (cardsContainer) {
    // Container kartu HANYA untuk tab Berkas jika view mode kartu aktif
    if (pendaftarActiveStatusTab !== 'berkas' || pendaftarViewMode !== 'kartu') {
      cardsContainer.classList.add('hidden');
    } else {
      cardsContainer.classList.remove('hidden');
    }

    if (currentSlice.length === 0) {
      cardsContainer.innerHTML = `
        <div class="p-12 text-center rounded-xl border border-dashed border-[#e4e4e7] bg-white">
          <i data-lucide="inbox" class="w-10 h-10 mx-auto text-[#71717a] mb-2 opacity-40"></i>
          <h4 class="text-sm font-semibold text-[#09090b]">Tidak ada pendaftar mahasiswa</h4>
          <p class="text-xs text-[#71717a] mt-1">Tidak ditemukan pendaftar yang cocok dengan filter atau status saat ini.</p>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = currentSlice
        .map((item) => {
          const isInternal = item.kategoriKontributor === 'internal';
          const mitraText = item.kontributor || '-';
          const isIdentical = (item.program || '').trim().toLowerCase() === mitraText.trim().toLowerCase();
          const skemaText = isIdentical
            ? (item.kategoriKontributor === 'internal' ? 'Program Internal Kampus' : 'Program Eksternal')
            : (item.program || '-');

          // Badges Status & Kategori
          const kategoriBadge = isInternal
            ? `<span class="inline-flex items-center h-4 px-1.5 text-[10px] font-medium rounded bg-blue-50 text-[#0655a7] border border-blue-200 shrink-0 leading-none">Internal</span>`
            : `<span class="inline-flex items-center h-4 px-1.5 text-[10px] font-medium rounded bg-orange-50 text-orange-700 border border-orange-200 shrink-0 leading-none">Eksternal</span>`;

          const statusBadges = {
            baru: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-blue-50 text-[#0655a7] border border-blue-200">Baru</span>',
            wawancara: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200">Wawancara</span>',
            diterima: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Diterima</span>',
            ditolak: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-rose-50 text-rose-700 border border-rose-200">Ditolak</span>',
            dibatalkan: '<span class="px-2.5 py-0.5 text-xs font-semibold rounded bg-zinc-100 text-zinc-700 border border-zinc-200">Dibatalkan</span>'
          };
          const statusBadge = statusBadges[item.status] || statusBadges.baru;

          // Action Buttons Sisi Kiri
          let actionHtml = '';
          if (isInternal) {
            actionHtml = `
              <button
                type="button"
                onclick="bukaDetailPelamarReadOnly(${item.id})"
                class="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-semibold text-[#09090b] shadow-2xs transition-colors cursor-pointer"
              >
                <i data-lucide="eye" class="w-4 h-4 text-[#71717a]"></i>
                <span>Detail</span>
              </button>
            `;
          } else if (item.status === 'baru' || item.status === 'berkas') {
            actionHtml = `
              <button
                type="button"
                onclick="bukaReviewBerkasDrawer(${item.id})"
                class="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0655a7] hover:bg-[#114D91] text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <i data-lucide="file-check" class="w-4 h-4"></i>
                <span>Review Berkas</span>
              </button>
            `;
          } else if (item.status === 'wawancara') {
            actionHtml = `
              <button
                type="button"
                onclick="bukaEvaluasiWawancaraDrawer(${item.id})"
                class="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0655a7] hover:bg-[#114D91] text-xs font-semibold text-white shadow-2xs transition-colors cursor-pointer"
              >
                <i data-lucide="message-square" class="w-4 h-4"></i>
                <span>Wawancara</span>
              </button>
            `;
          } else {
            // Status final: diterima, ditolak, dibatalkan -> tombol Detail
            actionHtml = `
              <button
                type="button"
                onclick="bukaDetailPelamarReadOnly(${item.id})"
                class="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-semibold text-[#09090b] shadow-2xs transition-colors cursor-pointer"
              >
                <i data-lucide="eye" class="w-4 h-4 text-[#71717a]"></i>
                <span>Detail</span>
              </button>
            `;
          }

          return `
            <div class="rounded-xl border border-[#e4e4e7] bg-white overflow-hidden shadow-none hover:border-[#0655a7]/30 transition-all">
              <div class="grid grid-cols-1 lg:grid-cols-12">
                <!-- Kolom Kiri: Data Mahasiswa -->
                <div class="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#e4e4e7] flex flex-col">
                  <!-- Header Kolom -->
                  <div class="bg-[#fafafa] border-b border-[#e4e4e7] px-5 py-3 shrink-0">
                    <div class="flex items-center gap-2 font-semibold text-sm text-[#09090b]">
                      <i data-lucide="user" class="w-4 h-4"></i>
                      <span>Data Mahasiswa</span>
                    </div>
                  </div>

                  <!-- Konten -->
                  <div class="p-5 space-y-4 flex-1 flex flex-col justify-center">
                    <div class="flex justify-center">
                      <img
                        src="${item.foto}"
                        alt="${item.nama}"
                        class="w-24 h-24 rounded-full object-cover border-2 border-[#e4e4e7] bg-[#f4f4f5]"
                      />
                    </div>
                    <h4 class="text-lg font-semibold text-center text-[#09090b] capitalize leading-tight">${item.nama.toLowerCase()}</h4>

                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">NIM</span>
                        <span class="text-[#09090b]">${item.nim}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">Email</span>
                        <span class="text-[#09090b] truncate" title="${item.email}">${item.email}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">No HP</span>
                        <span class="text-[#09090b]">${item.noHp}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="inline-flex items-center justify-center w-16 h-6 rounded-md border border-[#e4e4e7] text-[11px] font-medium text-[#71717a] shrink-0">Prodi</span>
                        <span class="text-[#09090b] truncate">${item.prodi}</span>
                      </div>
                    </div>

                    <div class="pt-2">
                      <button
                        type="button"
                        onclick="lihatTranskripPelamar(${item.id})"
                        class="w-full h-9 inline-flex items-center justify-center gap-2 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-medium text-[#09090b] transition-colors"
                      >
                        <i data-lucide="file-text" class="w-4 h-4 text-[#71717a]"></i>
                        <span>Lihat Transkrip</span>
                      </button>
                    </div>

                    <div class="pt-2">
                      ${actionHtml}
                    </div>
                  </div>
                </div>

                <!-- Kolom Kanan: Data Pengajuan -->
                <div class="lg:col-span-8 flex flex-col">
                  <!-- Header Kolom -->
                  <div class="bg-[#fafafa] border-b border-[#e4e4e7] px-5 py-3 shrink-0">
                    <div class="flex items-center gap-2 font-semibold text-sm text-[#09090b]">
                      <i data-lucide="file-text" class="w-4 h-4"></i>
                      <span>Data Pengajuan</span>
                    </div>
                  </div>

                  <!-- Konten -->
                  <div class="p-5 space-y-6 flex-1 flex flex-col justify-center">
                    <!-- Mitra & Skema Program -->
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                        <i data-lucide="building-2" class="w-4 h-4 text-[#0655a7]"></i>
                        <span>Program MBKM</span>
                      </div>
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-lg font-bold text-[#09090b] leading-snug">${mitraText}</span>
                        ${kategoriBadge}
                      </div>
                      <div class="flex items-center gap-1.5">
                        <i data-lucide="award" class="w-3.5 h-3.5 text-[#0655a7]"></i>
                        <span class="text-sm text-[#0655a7] font-medium">${skemaText}</span>
                      </div>
                    </div>

                    <!-- Akademik & Semester -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="award" class="w-4 h-4"></i>
                          <span>IPK Kumulatif</span>
                        </div>
                        <p class="text-[#09090b]">${item.ipk}</p>
                      </div>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="calendar" class="w-4 h-4"></i>
                          <span>Semester</span>
                        </div>
                        <p class="text-[#09090b]">${item.semester} <span class="text-sm text-[#71717a]">(${(item.semesterAjaran || '').replace(/^(Gasal|Genap)\s*/i, '')})</span></p>
                      </div>
                    </div>

                    <!-- Tanggal Pengajuan -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                          <i data-lucide="calendar" class="w-4 h-4"></i>
                          <span>Tanggal Pengajuan</span>
                        </div>
                        <p class="text-[#09090b]">${item.tanggalPengajuan}</p>
                      </div>
                    </div>

                    <!-- Lampiran Berkas (paling bawah) -->
                    <div class="space-y-2">
                      <div class="flex items-center gap-2 text-sm font-medium text-[#71717a]">
                        <i data-lucide="paperclip" class="w-4 h-4"></i>
                        <span>Lampiran Berkas</span>
                      </div>
                      <div class="flex items-stretch gap-2">
                        ${(item.links || [])
                          .map(
                            (l) => `
                            <a
                              href="${l.url}"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="flex-1 inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-sm font-medium text-[#09090b] transition-colors"
                            >
                              <i data-lucide="${l.label === 'CV' ? 'file-text' : 'folder-open'}" class="w-4 h-4 text-[#71717a]"></i>
                              <span>Lihat ${l.label}</span>
                            </a>
                          `
                          )
                          .join('')}
                        <button
                          type="button"
                          onclick="alert('Mahasiswa dapat menambahkan tautan pengumpulan lain (sertifikat, GitHub, demo aplikasi) saat mengisi form pendaftaran.')"
                          class="inline-flex items-center justify-center h-9 w-9 shrink-0 rounded-md border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#71717a] transition-colors"
                          title="Tautan tambahan dari mahasiswa"
                        >
                          <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // 2. Render Tampilan Tabel (Sesuai Tabel Standar DataTable)
  if (tbody) {
    const tableCont = document.getElementById('pendaftar-table-container');
    if (pendaftarActiveStatusTab !== 'berkas' && tableCont) {
      tableCont.classList.remove('hidden');
    }

    const isTabBerkas = pendaftarActiveStatusTab === 'berkas';
    const isTabWawancara = pendaftarActiveStatusTab === 'wawancara';
    const isTabDiterima = pendaftarActiveStatusTab === 'diterima';
    const isTabAksi = isTabBerkas || isTabWawancara;

    // Header tabel dinamis: tab wawancara vs tab penerima vs tab lainnya (semua tab memiliki kolom aksi)
    const trThead = document.getElementById('tr-thead-pelamar');
    if (trThead) {
      if (isTabWawancara) {
        trThead.innerHTML = `
          <th class="h-11 px-4 font-semibold text-xs w-12 text-center text-[#71717a]">No.</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Mahasiswa</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program MBKM</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program Studi</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Jadwal Wawancara</th>
          <th class="h-11 px-4 font-semibold text-xs w-36 text-center text-[#71717a]">Aksi</th>
        `;
      } else if (isTabDiterima) {
        trThead.innerHTML = `
          <th class="h-11 px-4 font-semibold text-xs w-12 text-center text-[#71717a]">No.</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Mahasiswa</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program MBKM</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program Studi</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Hasil Seleksi</th>
          <th class="h-11 px-4 font-semibold text-xs w-36 text-center text-[#71717a]">Aksi</th>
        `;
      } else {
        trThead.innerHTML = `
          <th class="h-11 px-4 font-semibold text-xs w-12 text-center text-[#71717a]">No.</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Mahasiswa</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program MBKM</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Program Studi</th>
          <th class="h-11 px-4 font-semibold text-xs text-left text-[#71717a]">Akademik</th>
          <th class="h-11 px-4 font-semibold text-xs w-36 text-center text-[#71717a]">Aksi</th>
        `;
      }
    }

    const colSpan = 6;

    if (currentSlice.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="${colSpan}" class="py-8 text-center text-sm text-[#71717a]">
            Tidak ada data pendaftar yang cocok dengan kriteria filter.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = currentSlice
        .map((item, idx) => {
          const rowNum = startIndex + idx + 1;
          const isInternal = item.kategoriKontributor === 'internal';
          const mitraText = item.kontributor || '-';
          const isIdentical = (item.program || '').trim().toLowerCase() === mitraText.trim().toLowerCase();
          const skemaText = isIdentical
            ? (item.kategoriKontributor === 'internal' ? 'Program Internal Kampus' : 'Program Mandiri Eksternal')
            : (item.program || '-');

          const kategoriBadge = isInternal
            ? `<span class="inline-flex items-center h-4 px-1.5 text-[10px] font-medium rounded bg-blue-50 text-[#0655a7] border border-blue-200 shrink-0 leading-none">Internal</span>`
            : `<span class="inline-flex items-center h-4 px-1.5 text-[10px] font-medium rounded bg-orange-50 text-orange-700 border border-orange-200 shrink-0 leading-none">Eksternal</span>`;

          const avatarHtml = item.foto
            ? `<img src="${item.foto}" alt="" class="h-9 w-9 rounded-full object-cover border border-[#e4e4e7] shrink-0" />`
            : `<div class="h-9 w-9 rounded-full bg-[#f4f4f5] text-[#0655a7] font-semibold text-xs flex items-center justify-center shrink-0 border border-[#e4e4e7]"><span>${(item.nama || 'M').charAt(0)}</span></div>`;

          // Rendering baris khusus tab wawancara (No | Mahasiswa | Mitra & Skema Program | Jadwal Wawancara | Aksi)
          if (isTabWawancara) {
            const jadwalText = item.jadwalWawancara
              ? `<div class="font-medium text-sm text-[#09090b] flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5 text-[#0655a7]"></i><span>${item.jadwalWawancara}</span></div><div class="text-xs text-[#71717a] mt-0.5">${item.lokasiWawancara || 'Meet / Lab'}</div>`
              : `<span class="text-xs text-[#71717a] italic">Belum terjadwal</span>`;

            let actionBtn = isInternal
              ? `
                <button
                  type="button"
                  onclick="bukaDetailPelamarReadOnly(${item.id})"
                  class="h-8 px-3.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b] shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <i data-lucide="eye" class="w-3.5 h-3.5 text-[#71717a]"></i>
                  <span>Detail</span>
                </button>
              `
              : `
                <button
                  type="button"
                  onclick="bukaEvaluasiWawancaraDrawer(${item.id})"
                  class="h-8 px-3.5 rounded-lg bg-[#0655a7] hover:bg-[#114D91] text-xs font-medium text-white shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                  <span>Wawancara</span>
                </button>
              `;

            return `
              <tr class="h-[68px] hover:bg-[#fafafa] transition-colors">
                <td class="w-12 px-4 text-center text-[#71717a] text-xs font-medium">${rowNum}</td>
                <td class="px-4 text-sm">
                  <div class="flex items-center gap-3">
                    ${avatarHtml}
                    <div class="flex flex-col leading-tight gap-0.5">
                      <span class="font-semibold text-[#09090b] text-sm">${item.nama}</span>
                      <span class="text-xs text-[#71717a]">${item.nim}</span>
                    </div>
                  </div>
                </td>
                <td class="px-4 text-sm">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-medium text-[#09090b] text-sm">${mitraText}</span>
                    ${kategoriBadge}
                  </div>
                  <div class="text-xs text-[#0655a7] font-medium mt-0.5">${skemaText}</div>
                </td>
                <td class="px-4 text-sm">
                  <span class="text-sm font-normal text-[#09090b]">${item.prodi || '-'}</span>
                </td>
                <td class="px-4 text-sm">${jadwalText}</td>
                <td class="px-4 text-center text-sm">${actionBtn}</td>
              </tr>
            `;
          }

          // Rendering baris tab berkas, diterima, ditolak, dibatalkan
          let actionBtn = '';
          if (isTabBerkas) {
            actionBtn = isInternal
              ? `
                <button
                  type="button"
                  onclick="bukaDetailPelamarReadOnly(${item.id})"
                  class="h-8 px-3.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b] shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <i data-lucide="eye" class="w-3.5 h-3.5 text-[#71717a]"></i>
                  <span>Detail</span>
                </button>
              `
              : `
                <div class="inline-flex items-center justify-center gap-1.5">
                  <button
                    type="button"
                    onclick="bukaReviewBerkasDrawer(${item.id})"
                    class="h-8 px-3.5 rounded-lg bg-[#0655a7] hover:bg-[#114D91] text-xs font-medium text-white shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <i data-lucide="file-check" class="w-3.5 h-3.5"></i>
                    <span>Review</span>
                  </button>
                  <div class="relative inline-block text-left" data-pelamar-action-menu>
                    <button
                      type="button"
                      onclick="togglePelamarActionMenu(event, ${item.id})"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-[#71717a] hover:text-[#09090b] shadow-2xs transition-colors cursor-pointer"
                      title="Opsi lainnya"
                      aria-label="Opsi lainnya"
                      aria-expanded="false"
                    >
                      <i data-lucide="more-horizontal" class="w-4 h-4"></i>
                    </button>
                    <div
                      id="pelamar-action-menu-${item.id}"
                      class="hidden absolute right-0 top-full mt-1.5 w-48 rounded-lg border border-[#e4e4e7] bg-white py-1 shadow-lg z-30 text-xs text-left"
                    >
                      <button
                        type="button"
                        onclick="jadwalkanWawancaraDariTabel(${item.id})"
                        class="flex w-full items-center gap-2 px-3 py-2 text-left text-[#09090b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                      >
                        <i data-lucide="calendar-plus" class="w-3.5 h-3.5 text-[#0655a7] shrink-0"></i>
                        <span>Jadwalkan Wawancara</span>
                      </button>
                      <div class="my-1 h-px bg-[#e4e4e7]"></div>
                      <button
                        type="button"
                        onclick="closeAllPelamarActionMenus(); tolakPelamar(${item.id})"
                        class="flex w-full items-center gap-2 px-3 py-2 text-left text-[#BE123C] hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <i data-lucide="x-circle" class="w-3.5 h-3.5 shrink-0"></i>
                        <span>Tolak</span>
                      </button>
                    </div>
                  </div>
                </div>
              `;
          } else {
            // Tab diterima, ditolak, dibatalkan -> tombol Detail
            actionBtn = `
              <button
                type="button"
                onclick="bukaDetailPelamarReadOnly(${item.id})"
                class="h-8 px-3.5 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#f4f4f5] text-xs font-medium text-[#09090b] shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5 text-[#71717a]"></i>
                <span>Detail</span>
              </button>
            `;
          }
          const actionTd = `<td class="px-4 text-center text-sm">${actionBtn}</td>`;

          let col5Html = '';
          if (isTabDiterima) {
            const skorFinal =
              item.nilaiWawancara !== undefined && item.nilaiWawancara !== null
                ? item.nilaiWawancara
                : Array.isArray(item.skorPertanyaan) && item.skorPertanyaan.length > 0
                ? Math.round(item.skorPertanyaan.reduce((a, b) => a + b, 0) / item.skorPertanyaan.length)
                : 88;
            col5Html = `
              <div class="flex flex-col leading-tight gap-1">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Total Skor: ${skorFinal}
                  </span>
                </div>
                <span class="text-xs text-[#71717a]">IPK ${item.ipk} • ${item.semester}</span>
              </div>
            `;
          } else {
            col5Html = `
              <div class="flex flex-col leading-tight gap-0.5">
                <span class="text-sm font-medium text-[#09090b]">IPK ${item.ipk}</span>
                <span class="text-xs text-[#71717a]">${item.semester}</span>
              </div>
            `;
          }

          return `
            <tr class="h-[68px] hover:bg-[#fafafa] transition-colors">
              <td class="w-12 px-4 text-center text-[#71717a] text-xs font-medium">${rowNum}</td>
              <td class="px-4 text-sm">
                <div class="flex items-center gap-3">
                  ${avatarHtml}
                  <div class="flex flex-col leading-tight gap-0.5">
                    <span class="font-semibold text-[#09090b] text-sm">${item.nama}</span>
                    <span class="text-xs text-[#71717a]">${item.nim}</span>
                  </div>
                </div>
              </td>
              <td class="px-4 text-sm">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="font-medium text-[#09090b] text-sm">${mitraText}</span>
                  ${kategoriBadge}
                </div>
                <div class="text-xs text-[#0655a7] font-medium mt-0.5">${skemaText}</div>
              </td>
              <td class="px-4 text-sm">
                <span class="text-sm font-normal text-[#09090b]">${item.prodi || '-'}</span>
              </td>
              <td class="px-4 text-sm">${col5Html}</td>
              ${actionTd}
            </tr>
          `;
        })
        .join('');
    }
  }

  // Pagination info & controls
  if (infoEl) {
    infoEl.textContent =
      totalItems === 0
        ? 'Menampilkan 0 - 0 dari 0 data'
        : `Menampilkan ${startIndex + 1} - ${endIndex} dari ${totalItems} data`;
  }

  if (paginationEl) {
    let html = '';
    html += `
      <button
        type="button"
        onclick="goToPelamarPage(${pelamarCurrentPage - 1})"
        ${pelamarCurrentPage === 1 ? 'disabled' : ''}
        class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-xs transition-colors cursor-pointer ${
          pelamarCurrentPage === 1 ? 'opacity-50 cursor-not-allowed hover:bg-white text-[#71717a]' : 'hover:bg-[#f4f4f5] text-[#09090b]'
        }"
        title="Halaman Sebelumnya"
      >
        <i data-lucide="chevron-left" class="w-4 h-4"></i>
      </button>
    `;
    for (let p = 1; p <= totalPages; p++) {
      const isActive = p === pelamarCurrentPage;
      html += `
        <button
          type="button"
          onclick="goToPelamarPage(${p})"
          class="h-8 w-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${
            isActive ? 'bg-[#0655a7] text-white font-semibold shadow-none' : 'border border-[#e4e4e7] bg-white text-[#09090b] font-medium hover:bg-[#f4f4f5]'
          }"
        >
          ${p}
        </button>
      `;
    }
    html += `
      <button
        type="button"
        onclick="goToPelamarPage(${pelamarCurrentPage + 1})"
        ${pelamarCurrentPage === totalPages ? 'disabled' : ''}
        class="h-8 w-8 flex items-center justify-center rounded-md border border-[#e4e4e7] bg-white text-xs transition-colors cursor-pointer ${
          pelamarCurrentPage === totalPages ? 'opacity-50 cursor-not-allowed hover:bg-white text-[#71717a]' : 'hover:bg-[#f4f4f5] text-[#09090b]'
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

function handlePelamarPerPageChange(val) {
  pelamarItemsPerPage = parseInt(val) || 10;
  pelamarCurrentPage = 1;
  renderPelamarTable();
}

function goToPelamarPage(p) {
  const totalPages = Math.ceil(getFilteredPelamarData().length / pelamarItemsPerPage) || 1;
  if (p < 1 || p > totalPages) return;
  pelamarCurrentPage = p;
  renderPelamarTable();
}

function closeAllPelamarActionMenus() {
  document.querySelectorAll('[id^="pelamar-action-menu-"]').forEach((menu) => {
    menu.classList.add('hidden');
  });
  document.querySelectorAll('[data-pelamar-action-menu] > button').forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
  });
}

function togglePelamarActionMenu(event, id) {
  if (event) event.stopPropagation();
  const targetMenu = document.getElementById(`pelamar-action-menu-${id}`);
  if (!targetMenu) return;

  const isCurrentlyHidden = targetMenu.classList.contains('hidden');
  closeAllPelamarActionMenus();

  if (isCurrentlyHidden) {
    const triggerBtn = targetMenu.previousElementSibling;
    const rect = triggerBtn ? triggerBtn.getBoundingClientRect() : null;
    const openUpward = rect && rect.bottom + 100 > window.innerHeight;
    targetMenu.classList.toggle('bottom-full', Boolean(openUpward));
    targetMenu.classList.toggle('mb-1.5', Boolean(openUpward));
    targetMenu.classList.toggle('top-full', !openUpward);
    targetMenu.classList.toggle('mt-1.5', !openUpward);
    targetMenu.classList.remove('hidden');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
  }
}

function jadwalkanWawancaraDariTabel(id) {
  closeAllPelamarActionMenus();
  if (typeof (window as any).bukaModalJadwalWawancaraPelamar === 'function') {
    (window as any).bukaModalJadwalWawancaraPelamar(id);
  }
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  if (!(window as any).__pelamarActionMenuListenerBound) {
    (window as any).__pelamarActionMenuListenerBound = true;
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest('[data-pelamar-action-menu]')) {
        closeAllPelamarActionMenus();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllPelamarActionMenus();
    });
  }
  (window as any).switchPendaftarStatusTab = switchPendaftarStatusTab;
  (window as any).switchPendaftarViewMode = switchPendaftarViewMode;
  (window as any).handleSortPendaftar = handleSortPendaftar;
  (window as any).handleSearchPelamar = handleSearchPelamar;
  (window as any).handleFilterPelamarKontributor = handleFilterPelamarKontributor;
  (window as any).handleFilterPelamarProdi = handleFilterPelamarProdi;
  (window as any).updatePendaftarTabBadges = updatePendaftarTabBadges;
  (window as any).getFilteredPelamarData = getFilteredPelamarData;
  (window as any).renderPelamarTable = renderPelamarTable;
  (window as any).handlePelamarPerPageChange = handlePelamarPerPageChange;
  (window as any).goToPelamarPage = goToPelamarPage;
  (window as any).closeAllPelamarActionMenus = closeAllPelamarActionMenus;
  (window as any).togglePelamarActionMenu = togglePelamarActionMenu;
  (window as any).jadwalkanWawancaraDariTabel = jadwalkanWawancaraDariTabel;
  try {
    Object.defineProperty(window, "pendaftarActiveStatusTab", {
      get: () => pendaftarActiveStatusTab,
      set: (val) => { pendaftarActiveStatusTab = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pendaftarActiveStatusTab = pendaftarActiveStatusTab;
  }
  try {
    Object.defineProperty(window, "pendaftarViewMode", {
      get: () => pendaftarViewMode,
      set: (val) => { pendaftarViewMode = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pendaftarViewMode = pendaftarViewMode;
  }
  try {
    Object.defineProperty(window, "pendaftarSort", {
      get: () => pendaftarSort,
      set: (val) => { pendaftarSort = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pendaftarSort = pendaftarSort;
  }
  try {
    Object.defineProperty(window, "pelamarSearchQuery", {
      get: () => pelamarSearchQuery,
      set: (val) => { pelamarSearchQuery = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pelamarSearchQuery = pelamarSearchQuery;
  }
  try {
    Object.defineProperty(window, "pelamarFilterKontributor", {
      get: () => pelamarFilterKontributor,
      set: (val) => { pelamarFilterKontributor = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pelamarFilterKontributor = pelamarFilterKontributor;
  }
  try {
    Object.defineProperty(window, "pelamarFilterProdi", {
      get: () => pelamarFilterProdi,
      set: (val) => { pelamarFilterProdi = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pelamarFilterProdi = pelamarFilterProdi;
  }
  try {
    Object.defineProperty(window, "pelamarCurrentPage", {
      get: () => pelamarCurrentPage,
      set: (val) => { pelamarCurrentPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pelamarCurrentPage = pelamarCurrentPage;
  }
  try {
    Object.defineProperty(window, "pelamarItemsPerPage", {
      get: () => pelamarItemsPerPage,
      set: (val) => { pelamarItemsPerPage = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).pelamarItemsPerPage = pelamarItemsPerPage;
  }
  try {
    Object.defineProperty(window, "activeModalPelamarId", {
      get: () => activeModalPelamarId,
      set: (val) => { activeModalPelamarId = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeModalPelamarId = activeModalPelamarId;
  }
  try {
    Object.defineProperty(window, "activeDrawerMode", {
      get: () => activeDrawerMode,
      set: (val) => { activeDrawerMode = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activeDrawerMode = activeDrawerMode;
  }
  try {
    Object.defineProperty(window, "isJadwalUnlocked", {
      get: () => isJadwalUnlocked,
      set: (val) => { isJadwalUnlocked = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).isJadwalUnlocked = isJadwalUnlocked;
  }
}

export {
  switchPendaftarStatusTab,
  switchPendaftarViewMode,
  handleSortPendaftar,
  handleSearchPelamar,
  handleFilterPelamarKontributor,
  handleFilterPelamarProdi,
  updatePendaftarTabBadges,
  getFilteredPelamarData,
  renderPelamarTable,
  handlePelamarPerPageChange,
  goToPelamarPage,
  closeAllPelamarActionMenus,
  togglePelamarActionMenu,
  jadwalkanWawancaraDariTabel,
  pendaftarActiveStatusTab,
  pendaftarViewMode,
  pendaftarSort,
  pelamarSearchQuery,
  pelamarFilterKontributor,
  pelamarFilterProdi,
  pelamarCurrentPage,
  pelamarItemsPerPage,
  activeModalPelamarId,
  activeDrawerMode,
  isJadwalUnlocked,
};
