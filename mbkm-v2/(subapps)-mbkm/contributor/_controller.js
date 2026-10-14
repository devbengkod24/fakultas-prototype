/**
 * ==============================================================================
 * CONTROLLER & INTERACTION LOGIC — Contributor & Mitra MBKM v2
 * Fakultas Ilmu Komputer UDINUS
 * ==============================================================================
 */

// Inisialisasi Otomatis Ikon Lucide
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupSidebarToggle();
  // Handle initial hash route if present
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash && ['dashboard', 'program', 'form', 'seleksi', 'mahasiswa', 'dosen'].includes(hash)) {
    switchNavView(hash);
  }
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '').toLowerCase();
    if (h && ['dashboard', 'program', 'form', 'seleksi', 'mahasiswa', 'dosen'].includes(h)) {
      switchNavView(h);
    }
  });
});

// Sidebar Toggle Mobile/Desktop
function setupSidebarToggle() {
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("mainSidebar");
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }
}

// Toggle Collapsible Nav Group (Anggota)
function toggleNavGroup(groupName) {
  const sub = document.getElementById(`group-${groupName}-sub`);
  const arrow = document.getElementById(`group-${groupName}-arrow`);
  if (sub) {
    const isHidden = sub.classList.toggle("hidden");
    if (arrow) {
      if (isHidden) {
        arrow.classList.remove("rotate-180");
      } else {
        arrow.classList.add("rotate-180");
      }
    }
  }
}

// SPA View Switcher Utama
function switchNavView(viewName) {
  // 1. Sembunyikan semua panel konten
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  // 2. Tampilkan panel yang dituju
  const targetPanel = document.getElementById(`view-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }

  // 3. Reset semua styling menu navigasi
  document.querySelectorAll(".nav-item").forEach(item => {
    item.className = "nav-item relative flex items-center px-4 py-2.5 rounded-lg text-[14px] text-[#3f3f46] font-normal hover:bg-black/5 hover:text-[#09090b] transition-colors w-full text-left";
    const indicator = item.querySelector(".active-indicator");
    if (indicator) indicator.classList.add("hidden");
    const icon = item.querySelector(".nav-icon");
    if (icon) {
      icon.classList.remove("text-[#0655a7]");
      icon.classList.add("text-[#71717a]");
    }
  });

  // 4. Set menu yang aktif
  const activeNav = document.getElementById(`nav-${viewName}`);
  if (activeNav) {
    activeNav.className = "nav-item relative flex items-center px-4 py-2.5 rounded-lg text-[14px] text-[#0655a7] font-medium bg-transparent hover:bg-black/5 transition-colors w-full text-left";
    const indicator = activeNav.querySelector(".active-indicator");
    if (indicator) indicator.classList.remove("hidden");
    const icon = activeNav.querySelector(".nav-icon");
    if (icon) {
      icon.classList.remove("text-[#71717a]");
      icon.classList.add("text-[#0655a7]");
    }
  }

  // Pastikan accordion Anggota terbuka jika view dosen/mahasiswa aktif
  if (viewName === 'dosen' || viewName === 'mahasiswa') {
    const sub = document.getElementById("group-anggota-sub");
    const arrow = document.getElementById("group-anggota-arrow");
    if (sub && sub.classList.contains("hidden")) {
      sub.classList.remove("hidden");
      if (arrow) arrow.classList.add("rotate-180");
    }
  }

  // 5. Update Breadcrumb Badge
  const breadcrumbNames = {
    'dashboard': 'Dashboard',
    'program': 'Kelola Program Binaan',
    'form': 'Formulir Pendaftaran',
    'seleksi': 'Seleksi Pendaftar',
    'mahasiswa': 'Anggota / Mahasiswa',
    'dosen': 'Anggota / Dosen'
  };
  const badge = document.getElementById("breadcrumbBadge");
  if (badge && breadcrumbNames[viewName]) {
    badge.textContent = breadcrumbNames[viewName];
  }

  // 6. Progressive Dynamic Fetch for Option 1
  const fileMap = {
    'dashboard': 'dashboard.html',
    'program': 'program.html',
    'form': 'form.html',
    'seleksi': 'seleksi.html',
    'mahasiswa': 'mahasiswa.html',
    'dosen': 'dosen.html'
  };
  if (fileMap[viewName]) {
    fetch(fileMap[viewName])
      .then(res => res.ok ? res.text() : null)
      .then(html => {
        if (html && targetPanel) {
          targetPanel.innerHTML = html;
          if (typeof lucide !== 'undefined') lucide.createIcons();
          if (viewName === 'program') { renderShowcaseTable(); renderTracksTable(); renderMatkulTable(); }
          else if (viewName === 'form') { renderQuestionsTable(); }
          else if (viewName === 'seleksi') { renderPelamarTable(); }
          else if (viewName === 'mahasiswa') { renderMahasiswaTable(); }
          else if (viewName === 'dosen') { renderDosenTable(); }
        }
      })
      .catch(() => {});
  }

  // Update URL hash smoothly
  if (window.location.hash !== '#' + viewName) {
    history.replaceState(null, '', '#' + viewName);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// Filter Tabel Seleksi Pendaftar
function filterSeleksiTable(status, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.className = "filter-btn px-3 py-1.5 font-medium rounded text-gray-600 hover:text-gray-900";
  });
  btn.className = "filter-btn px-3 py-1.5 font-semibold rounded bg-white text-[#09090b] shadow-2xs";

  const rows = document.querySelectorAll(".seleksi-row");
  rows.forEach(row => {
    if (status === 'semua' || row.getAttribute("data-status") === status) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Search Tabel Seleksi
function searchSeleksi() {
  const q = document.getElementById("searchSeleksiInput").value.toLowerCase();
  document.querySelectorAll(".seleksi-row").forEach(row => {
    const name = (row.getAttribute("data-name") || "").toLowerCase();
    const nim = (row.getAttribute("data-nim") || "").toLowerCase();
    if (name.includes(q) || nim.includes(q)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Handle Keputusan Seleksi (Terima / Tolak)
function handleDecision(btn, decision, name, nim) {
  const row = btn.closest(".seleksi-row");
  const statusCell = row.querySelector(".status-cell");
  const actionCell = row.querySelector(".action-cell");

  if (decision === 'accept') {
    row.setAttribute("data-status", "diterima");
    statusCell.className = "status-cell inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
    statusCell.innerHTML = `<i data-lucide="check-circle-2" class="w-3 h-3 text-emerald-600"></i> Diterima`;
    actionCell.innerHTML = `<span class="text-xs text-emerald-700 font-semibold">Telah Diterima</span>`;

    // Tambah ke tabel Mahasiswa Binaan
    addAcceptedToMahasiswaTable(name, nim);
    showToast("Pendaftar Diterima", `${name} resmi bergabung ke program binaan.`);
  } else {
    row.setAttribute("data-status", "ditolak");
    statusCell.className = "status-cell inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-800 border border-rose-200";
    statusCell.innerHTML = `<i data-lucide="x-circle" class="w-3 h-3 text-rose-600"></i> Ditolak`;
    actionCell.innerHTML = `<span class="text-xs text-rose-600 font-medium">Telah Ditolak</span>`;
    showToast("Pendaftar Ditolak", `Pendaftaran ${name} tidak diloloskan.`);
  }
  lucide.createIcons();
}

function quickAccept(btn, name, nim) {
  btn.parentElement.innerHTML = `<span class="text-xs text-emerald-700 font-semibold">Diterima</span>`;
  addAcceptedToMahasiswaTable(name, nim);
  showToast("Pendaftar Diterima", `${name} berhasil diterima.`);
  lucide.createIcons();
}

function quickReject(btn, name) {
  btn.parentElement.innerHTML = `<span class="text-xs text-rose-600 font-medium">Ditolak</span>`;
  showToast("Pendaftar Ditolak", `Pendaftaran ${name} ditolak.`);
  lucide.createIcons();
}

// Sinkronisasi Mahasiswa Diterima ke Tabel Mahasiswa Binaan
function addAcceptedToMahasiswaTable(name, nim) {
  const tbody = document.getElementById("mahasiswaTableBody");
  if (!tbody) return;

  const newRow = document.createElement("tr");
  newRow.className = "mhs-row hover:bg-gray-50/70 transition-colors animate-in fade-in";
  newRow.setAttribute("data-intake", "mandiri");
  newRow.setAttribute("data-name", name);
  newRow.setAttribute("data-nim", nim);
  newRow.innerHTML = `
    <td class="py-3.5 px-4">
      <div class="font-medium text-[13px] text-[#09090b]">${name}</div>
      <div class="text-[12px] text-[#71717a]">${nim} • TI-S1</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
        Lolos Mandiri
      </span>
    </td>
    <td class="py-3.5 px-4">
      <span class="font-medium text-gray-800">Riset Terapan Machine Learning</span>
      <div class="text-[#71717a] text-[11px]">Bimbingan Lab</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="font-semibold text-[#1063B9]">20 SKS</span>
      <div class="text-[#71717a] text-[11px]">5 Mata Kuliah</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> Siap Plotting Prodi
      </span>
    </td>
    <td class="py-3.5 px-4 text-right">
      <button type="button" onclick="showToast('Rincian Mahasiswa', 'Membuka profil akademik ${name}')" class="px-2.5 py-1 text-xs text-[#1063B9] hover:bg-blue-50 rounded border border-blue-200 font-medium">
        Rincian
      </button>
    </td>
  `;
  tbody.prepend(newRow);

  // Update counters
  const countEl = document.getElementById("statMahasiswaCount");
  const countAll = document.getElementById("countMhsAll");
  const filledQuota = document.getElementById("statFilledQuota");

  if (countEl) countEl.textContent = parseInt(countEl.textContent || 6) + 1;
  if (countAll) countAll.textContent = parseInt(countAll.textContent || 6) + 1;
  if (filledQuota) filledQuota.textContent = parseInt(filledQuota.textContent || 6) + 1;
}

// Filter Tabel Mahasiswa Binaan
function filterMahasiswaTable(intake, btn) {
  document.querySelectorAll(".mhs-filter-btn").forEach(b => {
    b.className = "mhs-filter-btn px-3 py-1.5 font-medium rounded text-gray-600 hover:text-gray-900";
  });
  btn.className = "mhs-filter-btn px-3 py-1.5 font-semibold rounded bg-white text-[#09090b] shadow-2xs";

  const rows = document.querySelectorAll(".mhs-row");
  rows.forEach(row => {
    if (intake === 'semua' || row.getAttribute("data-intake") === intake) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Search Tabel Mahasiswa
function searchMahasiswa() {
  const q = document.getElementById("searchMahasiswaInput").value.toLowerCase();
  document.querySelectorAll(".mhs-row").forEach(row => {
    const name = (row.getAttribute("data-name") || "").toLowerCase();
    const nim = (row.getAttribute("data-nim") || "").toLowerCase();
    if (name.includes(q) || nim.includes(q)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Verifikasi NIM SIAKAD (Modal Direct Assign)
function verifyNimSiakad() {
  const nim = document.getElementById("inputNim").value.trim();
  const statusText = document.getElementById("verifiedStatusText");
  const nameText = document.getElementById("verifiedName");
  const prodiText = document.getElementById("verifiedProdi");
  const box = document.getElementById("siakadResultBox");

  if (!nim) {
    alert("Silakan ketikkan NIM terlebih dahulu.");
    return;
  }

  statusText.innerHTML = `<span class="text-emerald-700 font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i> Terverifikasi SIAKAD (Memenuhi Syarat MBKM)</span>`;
  nameText.textContent = "Arya Wicaksana Dewanto";
  prodiText.textContent = "Teknik Informatika (S1) • Semester 7";
  box.className = "p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs space-y-1";
  lucide.createIcons();
}

// Submit Direct Assign Mahasiswa
function handleDirectAssignSubmit(e) {
  e.preventDefault();
  const nim = document.getElementById("inputNim").value;
  const name = document.getElementById("verifiedName").textContent !== "-" ? document.getElementById("verifiedName").textContent : "Arya Wicaksana Dewanto";
  const topic = document.getElementById("assignTopic").value;

  const tbody = document.getElementById("mahasiswaTableBody");
  const newRow = document.createElement("tr");
  newRow.className = "mhs-row hover:bg-gray-50/70 transition-colors animate-in fade-in";
  newRow.setAttribute("data-intake", "direct");
  newRow.setAttribute("data-name", name);
  newRow.setAttribute("data-nim", nim);
  newRow.innerHTML = `
    <td class="py-3.5 px-4">
      <div class="font-medium text-[13px] text-[#09090b]">${name}</div>
      <div class="text-[12px] text-[#71717a]">${nim} • TI-S1</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200">
        Direct Assign
      </span>
    </td>
    <td class="py-3.5 px-4">
      <span class="font-medium text-gray-800">${topic}</span>
      <div class="text-[#71717a] text-[11px]">Bimbingan Tugas Akhir</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="font-semibold text-[#1063B9]">20 SKS</span>
      <div class="text-[#71717a] text-[11px]">5 Mata Kuliah</div>
    </td>
    <td class="py-3.5 px-4">
      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> Siap Plotting Prodi
      </span>
    </td>
    <td class="py-3.5 px-4 text-right">
      <button type="button" onclick="showToast('Rincian Mahasiswa', 'Membuka profil akademik ${name}')" class="px-2.5 py-1 text-xs text-[#1063B9] hover:bg-blue-50 rounded border border-blue-200 font-medium">
        Rincian
      </button>
    </td>
  `;
  tbody.prepend(newRow);

  // Update counters
  const countEl = document.getElementById("statMahasiswaCount");
  const countAll = document.getElementById("countMhsAll");
  const filledQuota = document.getElementById("statFilledQuota");

  if (countEl) countEl.textContent = parseInt(countEl.textContent || 6) + 1;
  if (countAll) countAll.textContent = parseInt(countAll.textContent || 6) + 1;
  if (filledQuota) filledQuota.textContent = parseInt(filledQuota.textContent || 6) + 1;

  closeDirectAssignModal();
  showToast("Mahasiswa Berhasil Ditugaskan", `${name} (${nim}) telah ditambahkan ke Mahasiswa Binaan.`);
  lucide.createIcons();
}

// Submit Tambah Dosen Pembina
function handleAddDosenSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("inputDosenName").value;
  const npp = document.getElementById("inputDosenNpp").value;
  const bidang = document.getElementById("inputDosenBidang").value;
  const kuota = document.getElementById("inputDosenKuota").value;

  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const tbody = document.getElementById("dosenTableBody");
  const newRow = document.createElement("tr");
  newRow.className = "hover:bg-gray-50/70 transition-colors animate-in fade-in";
  newRow.innerHTML = `
    <td class="py-3.5 px-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-primary-100 text-[#114D91] font-bold text-xs flex items-center justify-center shrink-0 border border-primary-200">
          ${initials}
        </div>
        <div>
          <div class="font-medium text-[13px] text-[#09090b] leading-tight">${name}</div>
          <div class="text-[11px] text-[#71717a]">Dosen Pembimbing</div>
        </div>
      </div>
    </td>
    <td class="py-3.5 px-4 text-xs text-[#71717a]">${npp}</td>
    <td class="py-3.5 px-4 text-gray-800">${bidang}</td>
    <td class="py-3.5 px-4">
      <div class="flex items-center gap-2">
        <span class="font-medium text-[#09090b]">0 / ${kuota} Mahasiswa</span>
        <span class="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Sisa ${kuota}</span>
      </div>
    </td>
    <td class="py-3.5 px-4">
      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
        <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Pembimbing Riset
      </span>
    </td>
    <td class="py-3.5 px-4 text-right">
      <button type="button" onclick="showToast('Data Dosen', 'Membuka pengaturan bimbingan dosen')" class="px-2.5 py-1 text-xs text-[#1063B9] hover:bg-blue-50 rounded border border-blue-200 font-medium">
        Kelola
      </button>
    </td>
  `;
  tbody.prepend(newRow);

  closeAddDosenModal();
  showToast("Dosen Pembina Ditambahkan", `${name} berhasil didaftarkan ke tim pengampu.`);
  lucide.createIcons();
}

// Modal Handlers
function openDirectAssignModal() {
  document.getElementById("directAssignModal").classList.remove("hidden");
}
function closeDirectAssignModal() {
  document.getElementById("directAssignModal").classList.add("hidden");
}

function openAddDosenModal() {
  document.getElementById("addDosenModal").classList.remove("hidden");
}
function closeAddDosenModal() {
  document.getElementById("addDosenModal").classList.add("hidden");
}

function previewDoc(name, type) {
  document.getElementById("previewModalTitle").textContent = `Berkas: ${name}`;
  document.getElementById("previewFileName").textContent = type === 'transkrip' ? "Transkrip_Akademik_SIAKAD.pdf" : "Curriculum_Vitae_Terbaru.pdf";
  document.getElementById("previewDocModal").classList.remove("hidden");
}
function closePreviewDocModal() {
  document.getElementById("previewDocModal").classList.add("hidden");
}

// ========================================================
// CMS KELOLA PROGRAM BINAAN CONTROLLERS
// ========================================================

// Simpan Seluruh Konten Program Binaan (Card 1)
function saveProgramContent() {
  const title = document.getElementById("progTitle").value;
  showToast("Perubahan Disimpan", `Konten "${title}" berhasil diperbarui untuk halaman detail.`);
}

// Modal Showcase Handlers
let currentEditShowcaseEl = null;

function openShowcaseModal(editEl = null) {
  currentEditShowcaseEl = editEl;
  const modal = document.getElementById("showcaseModal");
  const titleEl = document.getElementById("showcaseModalTitle");
  const form = document.getElementById("showcaseForm");

  if (editEl) {
    titleEl.innerHTML = `<i data-lucide="pencil" class="w-5 h-5 text-[#1063B9]"></i><span>Edit Proyek Showcase</span>`;
    const item = editEl.closest(".showcase-item");
    document.getElementById("inputShowcaseTitle").value = item.querySelector(".item-title").textContent.trim();
    document.getElementById("inputShowcaseId").value = item.getAttribute("data-id") || "PRJ-2026-01";
    document.getElementById("inputShowcaseBatch").value = "Capstone Project Batch 6";
    document.getElementById("inputShowcaseCategory").value = item.querySelector(".bg-gray-900\\/80") ? item.querySelector(".bg-gray-900\\/80").textContent.trim() : "IoT & AI";
    const tags = Array.from(item.querySelectorAll(".item-tags span")).map(s => s.textContent.trim()).join(", ");
    document.getElementById("inputShowcaseTags").value = tags;
    document.getElementById("inputShowcaseDesc").value = item.querySelector(".item-desc").textContent.trim();
    const img = item.querySelector("img");
    document.getElementById("inputShowcaseImg").value = img ? img.src : "";
  } else {
    titleEl.innerHTML = `<i data-lucide="folder-git-2" class="w-5 h-5 text-[#1063B9]"></i><span>Tambah Proyek Showcase</span>`;
    form.reset();
    document.getElementById("inputShowcaseId").value = `PRJ-2026-0${document.querySelectorAll(".showcase-item").length + 1}`;
    document.getElementById("inputShowcaseBatch").value = "Capstone Project Batch 6";
    document.getElementById("inputShowcaseImg").value = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";
  }
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeShowcaseModal() {
  document.getElementById("showcaseModal").classList.add("hidden");
  currentEditShowcaseEl = null;
}

function editShowcaseItem(btn) {
  openShowcaseModal(btn);
}

function deleteShowcaseItem(btn) {
  if (confirm("Apakah Anda yakin ingin menghapus proyek showcase ini?")) {
    const item = btn.closest(".showcase-item");
    const title = item.querySelector(".item-title").textContent.trim();
    item.remove();
    showToast("Proyek Dihapus", `Showcase "${title}" berhasil dihapus.`);
  }
}

function handleShowcaseSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("inputShowcaseTitle").value;
  const id = document.getElementById("inputShowcaseId").value;
  const batch = document.getElementById("inputShowcaseBatch").value;
  const category = document.getElementById("inputShowcaseCategory").value;
  const tagsStr = document.getElementById("inputShowcaseTags").value;
  const desc = document.getElementById("inputShowcaseDesc").value;
  const img = document.getElementById("inputShowcaseImg").value || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80";

  const tagsArray = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
  const tagsHtml = tagsArray.map(t => `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-gray-700 border border-gray-200">${t}</span>`).join(" ");

  if (currentEditShowcaseEl) {
    const item = currentEditShowcaseEl.closest(".showcase-item");
    item.setAttribute("data-id", id);
    item.querySelector(".item-title").textContent = title;
    item.querySelector(".item-desc").textContent = desc;
    item.querySelector(".item-tags").innerHTML = tagsHtml;
    const catBadge = item.querySelector(".bg-gray-900\\/80");
    if (catBadge) catBadge.textContent = category;
    const imgEl = item.querySelector("img");
    if (imgEl) imgEl.src = img;
    showToast("Proyek Diperbarui", `Showcase "${title}" berhasil diperbarui.`);
  } else {
    const container = document.getElementById("showcaseListContainer");
    const newItem = document.createElement("div");
    newItem.className = "showcase-item p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50/50 transition-all flex flex-col md:flex-row gap-4 items-start animate-in fade-in";
    newItem.setAttribute("data-id", id);
    newItem.innerHTML = `
      <div class="w-full md:w-44 h-28 rounded-lg overflow-hidden shrink-0 bg-gray-200 relative">
        <img src="${img}" alt="${title}" class="w-full h-full object-cover" />
        <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-900/80 text-white">${category}</span>
      </div>
      <div class="flex-1 space-y-1.5">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-semibold text-primary-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">${batch}</span>
            <span class="text-xs text-gray-500 font-medium">ID: ${id}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button type="button" onclick="editShowcaseItem(this)" class="p-1.5 text-gray-500 hover:text-[#1063B9] hover:bg-blue-50 rounded" title="Edit">
              <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
            </button>
            <button type="button" onclick="deleteShowcaseItem(this)" class="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded" title="Hapus">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <h4 class="text-sm font-bold text-gray-900 item-title">${title}</h4>
        <p class="text-xs text-gray-600 leading-relaxed item-desc">${desc}</p>
        <div class="flex flex-wrap items-center gap-1.5 pt-1 item-tags">
          ${tagsHtml}
        </div>
      </div>
    `;
    container.prepend(newItem);
    showToast("Proyek Ditambahkan", `Showcase "${title}" berhasil ditambahkan.`);
  }

  closeShowcaseModal();
  lucide.createIcons();
}

// Modal Formasi Track Handlers
let currentEditTrackEl = null;

function openTrackModal(editEl = null) {
  currentEditTrackEl = editEl;
  const modal = document.getElementById("trackModal");
  const titleEl = document.getElementById("trackModalTitle");
  const form = document.getElementById("trackForm");

  if (editEl) {
    titleEl.innerHTML = `<i data-lucide="pencil" class="w-5 h-5 text-[#1063B9]"></i><span>Edit Formasi Track</span>`;
    const item = editEl.closest(".track-item");
    document.getElementById("inputTrackTitle").value = item.querySelector(".track-title").textContent.trim();
    document.getElementById("inputTrackDesc").value = item.querySelector(".track-desc").textContent.trim();
  } else {
    titleEl.innerHTML = `<i data-lucide="briefcase" class="w-5 h-5 text-[#1063B9]"></i><span>Tambah Formasi Track</span>`;
    form.reset();
    document.getElementById("inputTrackTotal").value = "20";
    document.getElementById("inputTrackRemaining").value = "15";
    document.getElementById("inputTrackDuration").value = "5 Bulan Penuh";
    document.getElementById("inputTrackReqs").value = "Transkrip Nilai (PDF) & Draft Surekom";
    document.getElementById("inputTrackQuals").value = "Smt 6-8 • IPK ≥ 3.00";
  }
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeTrackModal() {
  document.getElementById("trackModal").classList.add("hidden");
  currentEditTrackEl = null;
}

function editTrackItem(btn) {
  openTrackModal(btn);
}

function deleteTrackItem(btn) {
  if (confirm("Apakah Anda yakin ingin menghapus formasi track ini?")) {
    const item = btn.closest(".track-item");
    const title = item.querySelector(".track-title").textContent.trim();
    item.remove();
    showToast("Track Dihapus", `Formasi "${title}" berhasil dihapus.`);
  }
}

function toggleTrackStatus(btn) {
  const item = btn.closest(".track-item");
  const badge = item.querySelector(".track-status-badge");
  const title = item.querySelector(".track-title").textContent.trim();

  if (btn.textContent.includes("Tutup")) {
    btn.textContent = "Buka Jalur";
    btn.className = "track-toggle-btn px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors";
    badge.className = "track-status-badge px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200";
    badge.textContent = "Ditutup";
    showToast("Jalur Ditutup", `Formasi "${title}" telah dinonaktifkan.`);
  } else {
    btn.textContent = "Tutup Jalur";
    btn.className = "track-toggle-btn px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors";
    badge.className = "track-status-badge px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200";
    badge.textContent = "Dibuka (Open)";
    showToast("Jalur Dibuka", `Formasi "${title}" siap menerima pendaftaran mahasiswa.`);
  }
}

function handleTrackSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("inputTrackTitle").value;
  const total = document.getElementById("inputTrackTotal").value;
  const remaining = document.getElementById("inputTrackRemaining").value;
  const duration = document.getElementById("inputTrackDuration").value;
  const reqs = document.getElementById("inputTrackReqs").value;
  const quals = document.getElementById("inputTrackQuals").value;
  const desc = document.getElementById("inputTrackDesc").value;

  if (currentEditTrackEl) {
    const item = currentEditTrackEl.closest(".track-item");
    item.querySelector(".track-title").textContent = title;
    item.querySelector(".track-desc").textContent = desc;
    showToast("Track Diperbarui", `Formasi "${title}" berhasil diperbarui.`);
  } else {
    const container = document.getElementById("tracksListContainer");
    const newItem = document.createElement("div");
    newItem.className = "track-item p-4 rounded-xl border border-gray-200 hover:border-gray-300 bg-white transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 animate-in fade-in";
    newItem.innerHTML = `
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-blue-50 text-[#1063B9] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
          <i data-lucide="layers" class="w-5 h-5"></i>
        </div>
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="track-status-badge px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Dibuka (Open)
            </span>
            <span class="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 flex items-center gap-1 font-medium">
              <i data-lucide="users" class="w-3 h-3 text-gray-400"></i>
              <span>Sisa Kuota: <strong>${remaining}</strong> / ${total} Mahasiswa</span>
            </span>
            <span class="text-xs font-medium text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
              Konversi 20 SKS
            </span>
          </div>
          <h4 class="text-sm font-bold text-gray-900 track-title">${title}</h4>
          <p class="text-xs text-gray-600 leading-relaxed max-w-2xl track-desc">${desc}</p>
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 pt-0.5">
            <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5 text-gray-400"></i> Durasi: ${duration}</span>
            <span>•</span>
            <span class="flex items-center gap-1"><i data-lucide="file-check" class="w-3.5 h-3.5 text-gray-400"></i> Syarat: ${reqs}</span>
            <span>•</span>
            <span class="flex items-center gap-1"><i data-lucide="graduation-cap" class="w-3.5 h-3.5 text-gray-400"></i> ${quals}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 w-full lg:w-auto justify-end">
        <button type="button" onclick="toggleTrackStatus(this)" class="track-toggle-btn px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors">
          Tutup Jalur
        </button>
        <button type="button" onclick="editTrackItem(this)" class="p-1.5 text-gray-500 hover:text-[#1063B9] hover:bg-blue-50 rounded-lg" title="Edit">
          <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
        </button>
        <button type="button" onclick="deleteTrackItem(this)" class="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg" title="Hapus">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;
    container.prepend(newItem);
    showToast("Track Ditambahkan", `Formasi "${title}" berhasil dibuka.`);
  }

  closeTrackModal();
  lucide.createIcons();
}

// ========================================================
// CMS FORM PENDAFTARAN CONTROLLERS
// ========================================================

// Simpan Pengaturan Form Pendaftaran
function saveFormConfig() {
  showToast("Pengaturan Disimpan", "Konfigurasi periode, syarat kelayakan, dan dokumen berhasil diperbarui.");
}

// Modal Mata Kuliah Konversi Handlers
let currentEditMatkulEl = null;

function openMatkulModal(editEl = null) {
  currentEditMatkulEl = editEl;
  const modal = document.getElementById("matkulModal");
  const titleEl = document.getElementById("matkulModalTitle");
  const form = document.getElementById("matkulForm");

  if (editEl) {
    titleEl.innerHTML = `<i data-lucide="pencil" class="w-5 h-5 text-[#1063B9]"></i><span>Edit Mata Kuliah Konversi</span>`;
    const row = editEl.closest("tr");
    document.getElementById("inputMatkulCode").value = row.querySelector(".matkul-code").textContent.trim();
    document.getElementById("inputMatkulName").value = row.querySelector(".matkul-name").textContent.trim();
    const sksText = row.querySelector(".matkul-sks").textContent.trim();
    const sksNum = sksText.replace(/\D/g, "");
    document.getElementById("inputMatkulSks").value = sksNum || "4";
    document.getElementById("inputMatkulDesc").value = row.querySelector(".matkul-desc").textContent.trim();
  } else {
    titleEl.innerHTML = `<i data-lucide="book-open" class="w-5 h-5 text-[#1063B9]"></i><span>Tambah Mata Kuliah Konversi</span>`;
    form.reset();
    document.getElementById("inputMatkulCode").value = "A11.54xxx";
    document.getElementById("inputMatkulSks").value = "4";
  }
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeMatkulModal() {
  document.getElementById("matkulModal").classList.add("hidden");
  currentEditMatkulEl = null;
}

function editMatkulRow(btn) {
  openMatkulModal(btn);
}

function deleteMatkulRow(btn) {
  if (confirm("Apakah Anda yakin ingin menghapus mata kuliah konversi ini?")) {
    const row = btn.closest("tr");
    const name = row.querySelector(".matkul-name").textContent.trim();
    row.remove();
    recalculateMatkulSks();
    showToast("Matkul Dihapus", `Mata kuliah "${name}" berhasil dihapus.`);
  }
}

function recalculateMatkulSks() {
  const rows = document.querySelectorAll("#matkulTableBody tr");
  let total = 0;
  rows.forEach(r => {
    const sksCell = r.querySelector(".matkul-sks");
    if (sksCell) {
      const num = parseInt(sksCell.textContent.replace(/\D/g, "") || 0, 10);
      total += num;
    }
  });
  const badge = document.getElementById("totalSksTersedia");
  if (badge) {
    badge.textContent = total;
  }
}

function handleMatkulSubmit(e) {
  e.preventDefault();
  const code = document.getElementById("inputMatkulCode").value;
  const name = document.getElementById("inputMatkulName").value;
  const sks = document.getElementById("inputMatkulSks").value;
  const desc = document.getElementById("inputMatkulDesc").value;

  if (currentEditMatkulEl) {
    const row = currentEditMatkulEl.closest("tr");
    row.querySelector(".matkul-code").textContent = code;
    row.querySelector(".matkul-name").textContent = name;
    row.querySelector(".matkul-sks").textContent = `${sks} SKS`;
    row.querySelector(".matkul-desc").textContent = desc;
    showToast("Matkul Diperbarui", `Mata kuliah "${name}" berhasil diperbarui.`);
  } else {
    const tbody = document.getElementById("matkulTableBody");
    const newRow = document.createElement("tr");
    newRow.className = "hover:bg-gray-50/70 transition-colors animate-in fade-in";
    newRow.innerHTML = `
      <td class="py-3 px-4 font-semibold text-[#09090b] matkul-code">${code}</td>
      <td class="py-3 px-4 font-medium text-[#09090b] matkul-name">${name}</td>
      <td class="py-3 px-4 font-bold text-[#1063B9] matkul-sks">${sks} SKS</td>
      <td class="py-3 px-4 text-[#71717a] text-[11px] matkul-desc">${desc}</td>
      <td class="py-3 px-4 text-right">
        <div class="inline-flex items-center gap-1">
          <button type="button" onclick="editMatkulRow(this)" class="p-1 text-gray-500 hover:text-[#1063B9] hover:bg-blue-50 rounded" title="Edit"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
          <button type="button" onclick="deleteMatkulRow(this)" class="p-1 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded" title="Hapus"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </div>
      </td>
    `;
    tbody.prepend(newRow);
    showToast("Matkul Ditambahkan", `Mata kuliah "${name}" berhasil ditambahkan.`);
  }

  recalculateMatkulSks();
  closeMatkulModal();
  lucide.createIcons();
}

// Floating Toast Utility
let toastTimeout;
function showToast(title, message) {
  const toast = document.getElementById("toastNotification");
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastMessage").textContent = message;
  toast.classList.remove("hidden");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 3500);
  lucide.createIcons();
}
function hideToast() {
  const toast = document.getElementById("toastNotification");
  if (toast) toast.classList.add("hidden");
}
