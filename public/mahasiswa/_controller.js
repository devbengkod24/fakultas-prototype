/**
 * CONTROLLER LOGIC — Mahasiswa MBKM v2 (Enhanced for Astro MPA & SPA Hybrid)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Icons
  if (typeof lucide !== "undefined") lucide.createIcons();

  // Sidebar controls
  setupSidebar();
  setupDropdowns();

  // Routing Tab View
  setupRouting();

  // Intercept internal hash links to navigate Astro pages
  setupNavigationInterceptors();

  // Render awal data
  updateUI();
});

// ─── Setup Sidebar & Dropdown ──────────────────────────────
function setupSidebar() {
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const toggleBtns = document.querySelectorAll(".sidebar-toggle-btn");
  const isMobile = () => window.innerWidth < 768;

  function toggleSidebar() {
    if (isMobile()) {
      sidebar?.classList.toggle("mobile-open");
      sidebarOverlay?.classList.toggle("visible");
    } else {
      sidebar?.classList.toggle("collapsed");
    }
  }

  toggleBtns.forEach(btn => btn.addEventListener("click", toggleSidebar));
  sidebarOverlay?.addEventListener("click", () => {
    sidebar?.classList.remove("mobile-open");
    sidebarOverlay?.classList.remove("visible");
  });
}

function setupDropdowns() {
  const appSwitcherBtn = document.getElementById("app-switcher-btn");
  const appSwitcherDropdown = document.getElementById("app-switcher-dropdown");
  const appSwitcherChevron = appSwitcherBtn?.querySelector(".app-switcher-chevron");
  const userCard = document.getElementById("user-card");
  const userDropdown = document.getElementById("user-dropdown");

  appSwitcherBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = appSwitcherDropdown?.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) {
      appSwitcherDropdown?.classList.add("open");
      appSwitcherChevron?.classList.add("open");
    }
  });

  userCard?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = userDropdown?.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) userDropdown?.classList.add("open");
  });

  function closeAllDropdowns() {
    appSwitcherDropdown?.classList.remove("open");
    appSwitcherChevron?.classList.remove("open");
    userDropdown?.classList.remove("open");
  }

  document.addEventListener("click", closeAllDropdowns);

  document.getElementById("logout-btn")?.addEventListener("click", (e) => {
    if (!confirm("Keluar dari akun mahasiswa dan kembali ke Portal Apps?")) {
      e.preventDefault();
    }
  });
}

// ─── Sub-menu Accordion Toggle ────────────────────────────
function toggleSubmenu(itemId) {
  const item = document.getElementById(itemId);
  if (item) {
    item.classList.toggle("open");
  }
}

// ─── Phase Switcher (Fase Pendaftar vs Peserta Aktif) ─────
function setDashboardPhase(phase) {
  const secPendaftar = document.getElementById("section-fase-pendaftar");
  const secAktif = document.getElementById("section-fase-aktif");
  const btnPendaftar = document.getElementById("btn-phase-pendaftar");
  const btnAktif = document.getElementById("btn-phase-aktif");

  if (phase === "aktif") {
    if (secPendaftar) secPendaftar.style.display = "none";
    if (secAktif) secAktif.style.display = "block";
    if (btnPendaftar) {
      btnPendaftar.className = "btn btn-sm btn-outline";
      btnPendaftar.style.fontWeight = "500";
    }
    if (btnAktif) {
      btnAktif.className = "btn btn-sm btn-primary";
      btnAktif.style.fontWeight = "600";
    }
  } else {
    if (secPendaftar) secPendaftar.style.display = "block";
    if (secAktif) secAktif.style.display = "none";
    if (btnPendaftar) {
      btnPendaftar.className = "btn btn-sm btn-primary";
      btnPendaftar.style.fontWeight = "600";
    }
    if (btnAktif) {
      btnAktif.className = "btn btn-sm btn-outline";
      btnAktif.style.fontWeight = "500";
    }
  }
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ─── Navigation Interceptors ──────────────────────────────
function setupNavigationInterceptors() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href) return;

    if (href === "#pendaftaran" || href === "#form-pendaftaran") {
      if (!document.getElementById("view-form-pendaftaran") && !document.getElementById("pendaftaran-form-container")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/lamaran";
      }
    } else if (href === "#status" || href === "#status-pengajuan") {
      if (!document.getElementById("view-status-pengajuan") && !document.getElementById("status-hero-card")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/lamaran#status";
      }
    } else if (href === "#dashboard") {
      if (!document.getElementById("view-dashboard") && !document.getElementById("dashboard-hero-banner")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/dashboard";
      }
    } else if (href === "#katalog") {
      if (!document.getElementById("view-katalog") && !document.getElementById("katalog-container")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/eksplorasi";
      }
    } else if (href === "#logbook") {
      if (!document.getElementById("view-logbook") && !document.getElementById("modal-logbook-mbkm")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/logbook";
      }
    } else if (href === "#sidang") {
      if (!document.getElementById("view-sidang")) {
        e.preventDefault();
        window.location.href = "/mahasiswa/laporan";
      }
    }
  });
}

// ─── Hash Routing (Pola Terpadu KP & BK) ──────────────────
function setupRouting() {
  function navigate(hash) {
    const validHashes = [
      "#dashboard", "#pengumuman", "#katalog", "#form-pendaftaran", "#status-pengajuan",
      "#dosen-pembimbing", "#logbook", "#konversi-sks", "#sidang", "#sertifikat", "#log-aktivitas"
    ];
    let targetHash = hash;

    // Deteksi route Astro jika hash kosong
    const pathname = window.location.pathname;
    if (!targetHash || !validHashes.includes(targetHash)) {
      if (pathname.includes("/mahasiswa/eksplorasi")) targetHash = "#katalog";
      else if (pathname.includes("/mahasiswa/lamaran")) targetHash = "#form-pendaftaran";
      else if (pathname.includes("/mahasiswa/logbook")) targetHash = "#logbook";
      else if (pathname.includes("/mahasiswa/laporan")) targetHash = "#sidang";
      else if (pathname.includes("/mahasiswa/dashboard")) targetHash = "#dashboard";
    }

    // Aliases untuk backward compatibility
    if (targetHash === "#pendaftaran") targetHash = "#form-pendaftaran";
    if (targetHash === "#status") targetHash = "#status-pengajuan";
    if (!validHashes.includes(targetHash)) targetHash = "#dashboard";

    // Sembunyikan semua tab view jika ada
    document.querySelectorAll(".tab-view").forEach(el => el.classList.remove("active"));

    // Pemetaan hash ke view ID (set file: null karena sudah statis)
    const routeConfig = {
      "#dashboard": { id: "view-dashboard", file: null, title: "Dashboard Mahasiswa", subtitle: "Ringkasan timeline pendaftaran, status SuReKom, & progres MBKM.", bc: "Dashboard" },
      "#pengumuman": { id: "view-pengumuman", file: null, title: "Papan Pengumuman MBKM", subtitle: "Broadcast informasi resmi dari Koordinator MBKM & Mitra.", bc: "Pengumuman" },
      "#katalog": { id: "view-katalog", file: "katalog.html", title: "Katalog Program Mitra Resmi", subtitle: "Eksplorasi formasi riset & industri resmi FIK Udinus.", bc: "Katalog Program" },
      "#form-pendaftaran": { id: "view-form-pendaftaran", file: "pendaftaran.html", title: "Form Pendaftaran MBKM (3 Tahap)", subtitle: "Validasi EWS, input tautan berkas GDrive, & draf konversi 20 SKS.", bc: "Form Pendaftaran" },
      "#status-pengajuan": { id: "view-status-pengajuan", file: "status.html", title: "Pelacakan Status & SuReKom Digital", subtitle: "Pantau seleksi mitra & unduh dokumen SuReKom dekanat (PDF).", bc: "Status Pengajuan" },
      "#dosen-pembimbing": { id: "view-dosen-pembimbing", file: null, title: "Dosen Pembimbing Lapangan", subtitle: "Informasi profil DPL resmi UDI yang dialokasikan Koordinator & PIC mitra.", bc: "Dosen Pembimbing" },
      "#logbook": { id: "view-logbook", file: null, title: "Logbook Kegiatan Mingguan", subtitle: "Jurnal mingguan, unggah tautan bukti kerja GDrive, & catatan review DPL.", bc: "Logbook Kegiatan" },
      "#konversi-sks": { id: "view-konversi-sks", file: null, title: "Matriks Konversi SKS (20 SKS)", subtitle: "Pemantauan matriks mata kuliah ekuivalensi yang telah diverifikasi & dikunci.", bc: "Konversi SKS" },
      "#sidang": { id: "view-sidang", file: null, title: "Sidang Evaluasi Akhir MBKM", subtitle: "Pendaftaran sidang akhir, draf laporan, jadwal penguji, & rekap nilai.", bc: "Sidang" },
      "#sertifikat": { id: "view-sertifikat", file: null, title: "Sertifikat & Target Luaran Wajib", subtitle: "Unggah sertifikat resmi mitra atau bukti publikasi ilmiah (DOI/LoA).", bc: "Sertifikat" },
      "#log-aktivitas": { id: "view-log-aktivitas", file: "log-aktivitas.html", title: "Log Aktivitas Mahasiswa", subtitle: "Audit trail riwayat tindakan mahasiswa pada ekosistem portal.", bc: "Log Aktivitas" }
    };

    const current = routeConfig[targetHash];
    if (current) {
      const activeEl = document.getElementById(current.id);
      activeEl?.classList.add("active");

      // Dynamic fetch loader removed for Astro SSG
      }

      // Update breadcrumb, judul dan subtitle halaman (DESIGN.md Bab 15.2)
      const bcCurrent = document.getElementById("breadcrumb-current");
      const pageTitle = document.getElementById("page-title");
      const pageSubtitle = document.getElementById("page-subtitle");

      if (bcCurrent && current.bc) bcCurrent.innerText = current.bc;
      if (pageTitle && current.title) pageTitle.innerText = current.title;
      if (pageSubtitle && current.subtitle) pageSubtitle.innerText = current.subtitle;
    }

    // Update active nav-link & nav-sub-link
    document.querySelectorAll(".sidebar-nav .nav-link, .sidebar-nav .nav-sub-link").forEach(link => {
      const href = link.getAttribute("href");
      if (href === targetHash ||
          (targetHash === "#dashboard" && href === "/mahasiswa/dashboard") ||
          (targetHash === "#katalog" && href === "/mahasiswa/eksplorasi") ||
          (targetHash === "#form-pendaftaran" && href === "/mahasiswa/lamaran") ||
          (targetHash === "#logbook" && href === "/mahasiswa/logbook") ||
          (targetHash === "#sidang" && href === "/mahasiswa/laporan")) {
        link.classList.add("active");
      } else if (href && (href.startsWith("/mahasiswa/") || href.startsWith("#"))) {
        link.classList.remove("active");
      }
    });

    // Pastikan parent collapsible terbuka jika sub-item aktif
    const pendaftaranGroup = document.getElementById("nav-item-pendaftaran");
    if (["#katalog", "#form-pendaftaran", "#status-pengajuan"].includes(targetHash) ||
        pathname.includes("/mahasiswa/eksplorasi") || pathname.includes("/mahasiswa/lamaran")) {
      pendaftaranGroup?.classList.add("open");
    }

    if (typeof lucide !== "undefined") lucide.createIcons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.addEventListener("hashchange", () => navigate(window.location.hash));
  navigate(window.location.hash);
}

// ─── Pengumuman Handlers ──────────────────────────────────
function filterAnnouncements(category, btn) {
  const cards = document.querySelectorAll(".announcement-card");
  document.querySelectorAll("#pengumuman-filter-bar .filter-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");

  cards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.getAttribute("data-category") === category ? "block" : "none";
    }
  });
}

function searchAnnouncements(query) {
  const q = query.toLowerCase();
  document.querySelectorAll(".announcement-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? "block" : "none";
  });
}

function openAnnouncementModal(id) {
  const modal = document.getElementById("modal-announcement");
  const titleEl = document.getElementById("modal-announcement-title");
  const metaEl = document.getElementById("modal-announcement-meta");
  const contentEl = document.getElementById("modal-announcement-content");
  const badgesEl = document.getElementById("modal-announcement-badges");

  if (!modal) return;
  if (id === 1) {
    if (badgesEl) badgesEl.innerHTML = "<span class="badge badge-danger">PENTING</span><span class="badge badge-primary">Koordinator MBKM</span>";
    if (titleEl) titleEl.innerText = "Jadwal Pembekalan Teknis & Verifikasi SuReKom Semester Genap 2025/2026";
    if (metaEl) metaEl.innerText = "Dipublikasikan: 10 Oktober 2025 • Oleh: Nurul Anisa Sri Winarsih, M.Cs";
    if (contentEl) contentEl.innerHTML = "<p>Diberitahukan kepada seluruh mahasiswa calon pendaftar program Kampus Berdampak, verifikasi berkas Surat Rekomendasi (SuReKom) dekanat ditutup pada tanggal 18 Oktober 2025 pukul 23:59 WIB.</p><p style="margin-top:8px;">Pastikan data akademik pada sistem EWS telah memenuhi kualifikasi minimal 100 SKS dan IPK 3.00. Mahasiswa yang lolos verifikasi SuReKom akan menerima salinan PDF digital bertanda tangan dekanat untuk dilampirkan ke mitra.</p>";
  } else {
    if (badgesEl) badgesEl.innerHTML = "<span class="badge badge-success">Mitra Resmi</span>";
    if (titleEl) titleEl.innerText = "Detail Informasi Pengumuman Resmi MBKM";
    if (metaEl) metaEl.innerText = "Dipublikasikan: Oktober 2025";
    if (contentEl) contentEl.innerHTML = "<p>Informasi teknis kegiatan dapat dikoordinasikan langsung melalui kanal komunikasi resmi mitra atau Dosen Pembimbing Lapangan.</p>";
  }
  modal.style.display = "flex";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeAnnouncementModal() {
  const modal = document.getElementById("modal-announcement");
  if (modal) modal.style.display = "none";
}

// ─── Katalog Program Handlers ─────────────────────────────
function filterKatalog(skema, btn) {
  document.querySelectorAll("#katalog-filter-bar .filter-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".katalog-card").forEach(card => {
    if (skema === "all") {
      card.style.display = "flex";
    } else {
      card.style.display = card.getAttribute("data-skema") === skema ? "flex" : "none";
    }
  });
}

function searchKatalog(query) {
  const q = query.toLowerCase();
  document.querySelectorAll(".katalog-card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? "flex" : "none";
  });
}

function selectProgramAndRegister(programName, skema) {
  if (window.location.pathname.includes("/mahasiswa/")) {
    window.location.href = "/mahasiswa/lamaran";
  } else {
    window.location.hash = "#form-pendaftaran";
  }
  setTimeout(() => {
    const selProg = document.getElementById("form-select-program");
    const selSkema = document.getElementById("form-select-skema");
    if (selProg) selProg.value = programName;
    if (selSkema) selSkema.value = skema;
  }, 100);
}

// ─── Form Pendaftaran 3 Tahap Handlers ────────────────────
function goToStep(step) {
  [1, 2, 3].forEach(s => {
    const content = document.getElementById("step-content-" + s);
    const circle = document.getElementById("step-circle-" + s);
    const text = document.getElementById("step-text-" + s);
    if (content) content.style.display = (s === step) ? "block" : "none";
    if (circle) {
      if (s <= step) {
        circle.style.background = "var(--primary)";
        circle.style.color = "#fff";
        circle.style.borderColor = "var(--primary)";
      } else {
        circle.style.background = "#f1f5f9";
        circle.style.color = "#64748b";
        circle.style.borderColor = "#cbd5e1";
      }
    }
    if (text) {
      text.style.color = (s <= step) ? "#0f172a" : "#64748b";
    }
  });

  const line = document.getElementById("stepper-progress-line");
  if (line) {
    line.style.width = step === 1 ? "0%" : step === 2 ? "50%" : "100%";
  }
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function recalculateSKS() {
  let total = 0;
  document.querySelectorAll(".sks-item:checked").forEach(cb => {
    total += parseInt(cb.getAttribute("data-sks") || "0", 10);
  });
  const counter = document.getElementById("total-sks-counter");
  if (counter) counter.innerText = total + " / 20 SKS";
}

function submitPendaftaranMBKM() {
  alert("Pendaftaran Berhasil Diajukan!\nPermohonan SuReKom digital Anda telah diteruskan ke Koordinator MBKM.\nID Registrasi: MBKM-2025-0914");
  if (window.location.pathname.includes("/mahasiswa/")) {
    window.location.href = "/mahasiswa/lamaran#status";
  } else {
    window.location.hash = "#status-pengajuan";
  }
}

function unduhSurekomPDF() {
  alert("Mengunduh Surat Rekomendasi (SuReKom) Dekanat Digital [PDF]...\nNomor Surat: 421/B.12/FIK-UDINUS/X/2025\nVerifikator: Nurul Anisa Sri Winarsih, M.Cs");
}

// ─── Simulator EWS Kelayakan (Pendaftaran.html) ───────────
function simulateEWS(isEligible) {
  setEligibility(isEligible);
  const lockedCont = document.getElementById("pendaftaran-locked-container");
  const formCont   = document.getElementById("pendaftaran-form-container");
  if (lockedCont) lockedCont.style.display = isEligible ? "none" : "block";
  if (formCont)   formCont.style.display   = isEligible ? "block" : "none";
  const btnPass = document.getElementById("sim-btn-memenuhi");
  const btnFail = document.getElementById("sim-btn-tidak");
  if (btnPass) {
    btnPass.style.background = isEligible ? "#ecfdf5" : "";
    btnPass.style.borderColor = isEligible ? "#a7f3d0" : "";
  }
  if (btnFail) {
    btnFail.style.background = !isEligible ? "#fee2e2" : "";
    btnFail.style.borderColor = !isEligible ? "#fecaca" : "";
  }
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ─── Simulator Alur 5 Tahap Status Pengajuan ──────────────
function setApplicationStatus(stage) {
  const heroCard  = document.getElementById("status-hero-card");
  const heroPill  = document.getElementById("status-hero-pill-text");
  const heroTitle = document.getElementById("status-hero-title");
  const heroDesc  = document.getElementById("status-hero-desc");
  const catatanBox = document.getElementById("box-catatan-evaluasi");

  const stageConfig = {
    1: {
      pill: "TAHAP 1: TERKIRIM — MENUNGGU REVIEW",
      title: "Formulir Pendaftaran Berhasil Dikirim",
      desc: "Permohonan Anda telah diterima sistem. Koordinator MBKM akan meninjau kelayakan EWS dan menerbitkan SuReKom Dekanat.",
      bg: "#fffbeb", border: "#fde68a", textColor: "#92400e", leftBorder: "#d97706"
    },
    2: {
      pill: "TAHAP 2: REVIEW SUREKOM KOORDINATOR",
      title: "SuReKom Sedang Diproses oleh Koordinator MBKM",
      desc: "Koordinator MBKM sedang meninjau draf Surat Rekomendasi Dekanat Anda. Proses biasanya 1–3 hari kerja.",
      bg: "#eff6ff", border: "#bfdbfe", textColor: "#1e40af", leftBorder: "#0655A7"
    },
    3: {
      pill: "TAHAP 3: SELEKSI INTERNAL MITRA",
      title: "SuReKom Diterbitkan — Sedang Dinilai Mitra Bengkel Koding",
      desc: "Surat Rekomendasi (SuReKom) Dekanat resmi telah diterbitkan. Berkas portofolio Anda sedang ditinjau dalam proses seleksi teknis & wawancara internal mitra.",
      bg: "#fffbeb", border: "#fde68a", textColor: "#92400e", leftBorder: "#d97706"
    },
    4: {
      pill: "TAHAP 4: REKOMENDASI MITRA TERKIRIM",
      title: "Mitra Menyampaikan Rekomendasi ke Fakultas",
      desc: "Bengkel Koding telah mengirimkan hasil seleksi dan kuota penerimaan ke Koordinator MBKM untuk approval akhir.",
      bg: "#eff6ff", border: "#bfdbfe", textColor: "#1e40af", leftBorder: "#0655A7"
    },
    5: {
      pill: "TAHAP 5: FINAL APPROVAL — DITERIMA!",
      title: "Selamat! Anda Resmi Diterima sebagai Peserta Aktif MBKM",
      desc: "Koordinator MBKM telah menerbitkan SK Peserta Aktif. DPL telah ditetapkan. Silakan akses menu Logbook dan mulai kegiatan MBKM.",
      bg: "#f0fdf4", border: "#bbf7d0", textColor: "#166534", leftBorder: "#16a34a"
    },
    revisi: {
      pill: "PERLU PERBAIKAN — BERKAS PERLU DIREVISI",
      title: "Pengajuan Dikembalikan — Mohon Perbaiki Berkas",
      desc: "Koordinator MBKM mengembalikan pengajuan Anda untuk perbaikan. Silakan baca catatan evaluasi di bawah dan kirim ulang sebelum batas waktu.",
      bg: "#fff1f2", border: "#fecdd3", textColor: "#9f1239", leftBorder: "#e11d48"
    }
  };

  const cfg = stageConfig[stage];
  if (!cfg) return;

  if (heroCard) {
    heroCard.style.background    = cfg.bg;
    heroCard.style.borderColor   = cfg.border;
    heroCard.style.borderLeft    = "4px solid " + cfg.leftBorder;
  }
  if (heroPill) {
    heroPill.innerText   = cfg.pill;
    heroPill.style.color = cfg.textColor;
  }
  if (heroTitle) {
    heroTitle.innerText = cfg.title;
    heroTitle.style.color = cfg.textColor;
  }
  if (heroDesc) {
    heroDesc.innerText  = cfg.desc;
    heroDesc.style.color  = cfg.textColor;
  }

  if (catatanBox) catatanBox.style.display = (stage === "revisi") ? "block" : "none";

  const stageNum = typeof stage === "number" ? stage : 0;
  [1, 2, 3, 4, 5].forEach(s => {
    const card = document.getElementById("step-card-" + s);
    const icon = document.getElementById("step-badge-icon-" + s);
    const badge = document.getElementById("step-badge-status-" + s);
    if (!card) return;

    if (s < stageNum) {
      card.style.borderLeft = "4px solid #16a34a";
      card.style.background = "#f0fdf4";
      card.style.borderTopColor = card.style.borderRightColor = card.style.borderBottomColor = "#bbf7d0";
      card.style.opacity = "1";
      if (icon)  { icon.style.background = "#dcfce7"; icon.style.color = "#16a34a"; icon.innerText = "✓"; }
      if (badge) { badge.className = "badge badge-success"; badge.innerText = "Selesai"; }
    } else if (s === stageNum) {
      card.style.borderLeft = "4px solid #d97706";
      card.style.background = "#fffbeb";
      card.style.opacity = "1";
      if (icon)  { icon.style.background = "#fef3c7"; icon.style.color = "#d97706"; icon.innerText = String(s); }
      if (badge) { badge.className = "badge badge-warning"; badge.innerText = "Sedang Berjalan"; }
    } else {
      card.style.borderLeft = "4px solid #94a3b8";
      card.style.background = "#f8fafc";
      card.style.opacity = "0.7";
      if (icon)  { icon.style.background = "#e2e8f0"; icon.style.color = "#64748b"; icon.innerText = String(s); }
      if (badge) {
        badge.className = "badge";
        badge.style.background = "#e2e8f0";
        badge.style.color = "#64748b";
        badge.innerText = "Menunggu Tahap " + (s - 1);
      }
    }
  });

  const navBadge = document.getElementById("nav-badge-status");
  if (navBadge) {
    if (stage === 5) { navBadge.className = "badge badge-success nav-badge"; navBadge.innerText = "Diterima"; }
    else if (stage === "revisi") { navBadge.className = "badge badge-danger nav-badge"; navBadge.innerText = "Revisi"; }
    else { navBadge.className = "badge badge-warning nav-badge"; navBadge.innerText = "Tahap " + stage; }
  }

  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ─── Logbook MBKM Modal Handlers (logbook.html) ──────────
function submitLogbookMBKM(e) {
  e.preventDefault();
  const m = document.getElementById("modal-logbook-mbkm");
  if (m) m.style.display = "none";
  alert("Logbook kegiatan mingguan berhasil dikirim ke Dosen Pembimbing Lapangan (DPL) untuk diverifikasi!");
}

function showLogbookDetail(week) {
  const labels = {
    1: "Minggu 1: Onboarding & Setup Workspace\nBukti: GDrive/bukti_minggu1.pdf\nStatus: Terverifikasi DPL (Nurul Anisa, M.Cs)",
    2: "Minggu 2: Pengembangan Modul Autentikasi & Database\nBukti: GDrive/bukti_minggu2.pdf\nStatus: Sedang Berjalan"
  };
  alert(labels[week] || "Detail logbook minggu ke-" + week + " belum tersedia.");
}

// ─── Logbook Handlers ────────────────────────────────────
function openLogbookModal() {
  const modal = document.getElementById("modal-logbook") || document.getElementById("modal-logbook-mbkm");
  if (modal) modal.style.display = "flex";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeLogbookModal() {
  const modal = document.getElementById("modal-logbook") || document.getElementById("modal-logbook-mbkm");
  if (modal) modal.style.display = "none";
}

function handleLogbookSubmit(e) {
  e.preventDefault();
  alert("Jurnal Logbook Minggu Ini Berhasil Disimpan & Diteruskan ke DPL!");
  closeLogbookModal();
}

// ─── Update UI Berdasarkan State ──────────────────────────
function updateUI() {
  if (typeof appState === "undefined") return;
  const isPass = appState.isEligible;
  const s = appState.student;

  const elSmt = document.getElementById("val-syarat-smt");
  if (elSmt) elSmt.innerText = "Semester " + s.smt;
  const elIpk = document.getElementById("val-syarat-ipk");
  if (elIpk) elIpk.innerText = s.ipk.toFixed(2);
  const elSks = document.getElementById("val-syarat-sks");
  if (elSks) elSks.innerText = s.sks + " SKS";

  const smtPass = s.smt >= 6 && s.smt <= 8;
  const ipkPass = s.ipk >= 3.00;
  const sksPass = s.sks >= 100;

  setCardStatus("smt", smtPass, "Semester " + s.smt, "Smt 6 - 8");
  setCardStatus("ipk", ipkPass, s.ipk.toFixed(2), "Min. 3.00");
  setCardStatus("sks", sksPass, s.sks + " SKS", "Min. 100 SKS");

  const totalPass = (smtPass ? 1 : 0) + (ipkPass ? 1 : 0) + (sksPass ? 1 : 0);
  const dbBadge = document.getElementById("db-summary-badge");
  if (dbBadge) {
    if (isPass) {
      dbBadge.className = "badge badge-success";
      dbBadge.innerText = "3 dari 3 Syarat Terpenuhi (Lolos)";
    } else {
      dbBadge.className = "badge badge-danger";
      dbBadge.innerText = totalPass + " dari 3 Syarat Terpenuhi (Belum Lolos)";
    }
  }

  const bannerBadge = document.getElementById("banner-eligibility-badge");
  const bannerDesc = document.getElementById("banner-eligibility-desc");
  const heroBtn = document.getElementById("btn-hero-action");
  const navBadgePendaftaran = document.getElementById("nav-badge-pendaftaran");
  const step1Badge = document.getElementById("flow-step1-badge");
  const step2Badge = document.getElementById("flow-step2-badge");

  if (isPass) {
    if (bannerBadge) {
      bannerBadge.innerText = "Status DB: Lolos Syarat Pendaftaran";
      if (bannerBadge.parentElement) bannerBadge.parentElement.style.background = "rgba(255,255,255,0.2)";
    }
    if (bannerDesc) {
      bannerDesc.innerText = "Data akademik Anda telah diverifikasi oleh sistem database. Anda memenuhi semua syarat untuk mendaftar Program MBKM Mandiri semester ini.";
    }
    if (heroBtn) {
      heroBtn.innerHTML = "<i data-lucide="file-edit"></i> Buka Pendaftaran Mandiri";
      heroBtn.href = "/mahasiswa/lamaran";
      heroBtn.style.display = "inline-flex";
    }
    if (navBadgePendaftaran) {
      navBadgePendaftaran.className = "badge badge-success nav-badge";
      navBadgePendaftaran.innerText = "Buka";
    }
    if (step1Badge) {
      step1Badge.className = "badge badge-success";
      step1Badge.innerText = "Lolos";
    }
    if (step2Badge) {
      step2Badge.className = "badge badge-primary";
      step2Badge.innerText = "Tersedia";
    }

    const pLock = document.getElementById("pendaftaran-locked-container");
    const pForm = document.getElementById("pendaftaran-form-container");
    if (pLock) pLock.style.display = "none";
    if (pForm) pForm.style.display = "block";
  } else {
    if (bannerBadge) {
      bannerBadge.innerText = "Status DB: Belum Memenuhi Syarat";
      if (bannerBadge.parentElement) bannerBadge.parentElement.style.background = "rgba(220,38,38,0.3)";
    }
    if (bannerDesc) {
      bannerDesc.innerText = "Mohon maaf, Anda belum memenuhi syarat pendaftaran MBKM (Semester 6-8, IPK >= 3.00, SKS >= 100). Pendaftaran saat ini terkunci.";
    }
    if (heroBtn) {
      heroBtn.innerHTML = "<i data-lucide="lock"></i> Pendaftaran Terkunci";
      heroBtn.href = "/mahasiswa/lamaran";
    }
    if (navBadgePendaftaran) {
      navBadgePendaftaran.className = "badge badge-danger nav-badge";
      navBadgePendaftaran.innerText = "Terkunci";
    }
    if (step1Badge) {
      step1Badge.className = "badge badge-danger";
      step1Badge.innerText = "Tidak Lolos";
    }
    if (step2Badge) {
      step2Badge.className = "badge badge-danger";
      step2Badge.innerText = "Terkunci";
    }

    const pLock = document.getElementById("pendaftaran-locked-container");
    const pForm = document.getElementById("pendaftaran-form-container");
    if (pLock) pLock.style.display = "block";
    if (pForm) pForm.style.display = "none";

    const lockSmt = document.getElementById("lock-reason-smt");
    const lockIpk = document.getElementById("lock-reason-ipk");
    const lockSks = document.getElementById("lock-reason-sks");
    if (lockSmt) lockSmt.style.display = smtPass ? "none" : "list-item";
    if (lockIpk) lockIpk.style.display = ipkPass ? "none" : "list-item";
    if (lockSks) lockSks.style.display = sksPass ? "none" : "list-item";
  }

  updateTrackingUI();
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function setCardStatus(type, isOk, valText, reqText) {
  const card = document.getElementById("card-syarat-" + type);
  const badge = document.getElementById("badge-syarat-" + type);
  const icon = document.getElementById("icon-syarat-" + type);
  if (!card) return;

  if (isOk) {
    if (badge) {
      badge.className = "badge badge-success";
      badge.innerHTML = "<i data-lucide="check" style="width:12px;height:12px;"></i> Memenuhi";
    }
  } else {
    if (badge) {
      badge.className = "badge badge-danger";
      badge.innerHTML = "<i data-lucide="x" style="width:12px;height:12px;"></i> Belum Lolos";
    }
  }
}

// ─── Tracking Status UI (Pending, Accepted, Rejected) ─────
function updateTrackingUI() {
  if (typeof appState === "undefined") return;
  const st = appState.trackingStatus;
  const reg = appState.registration;

  const heroCard = document.getElementById("status-hero-card");
  const heroPill = document.getElementById("status-hero-pill-text");
  const heroTitle = document.getElementById("status-hero-title");
  const heroDesc = document.getElementById("status-hero-desc");
  const feedbackBox = document.getElementById("status-feedback-box");
  const navBadgeStatus = document.getElementById("nav-badge-status");
  const btnDownload = document.getElementById("btn-download-surekom");

  // Reset semua step 5 tahap
  for (let i = 1; i <= 5; i++) {
    const stepCard = document.getElementById("step-5-" + i);
    const badge = document.getElementById("badge-tahap-" + i);
    if (stepCard) {
      stepCard.style.opacity = "0.5";
      stepCard.style.borderLeft = "1px solid var(--border)";
      stepCard.style.background = "#ffffff";
    }
    if (badge) {
      badge.className = "badge badge-muted";
      badge.innerText = "Menunggu";
    }
  }

  if (st === "pending") {
    if (heroCard) heroCard.className = "status-hero pending";
    if (heroPill) heroPill.innerText = "STATUS: TAHAP 2 - REVIEW SUREKOM KOORDINATOR";
    if (heroTitle) heroTitle.innerText = "Pendaftaran Sedang Ditinjau Koordinator MBKM";
    if (heroDesc) heroDesc.innerText = "Koordinator MBKM prodi sedang memverifikasi kelayakan akademik dan draf konversi SKS Anda sebelum menerbitkan Surat Rekomendasi (SuReKom) digital.";
    if (feedbackBox) feedbackBox.style.display = "none";
    if (btnDownload) btnDownload.style.display = "none";

    const s1 = document.getElementById("step-5-1");
    const s2 = document.getElementById("step-5-2");
    const b2 = document.getElementById("badge-tahap-2");
    if (s1) { s1.style.opacity = "1"; s1.style.borderLeft = "4px solid #16a34a"; s1.style.background = "#f0fdf4"; }
    if (s2) { s2.style.opacity = "1"; s2.style.borderLeft = "4px solid #d97706"; s2.style.background = "#fffbeb"; }
    if (b2) { b2.className = "badge badge-warning"; b2.innerText = "Sedang Berjalan"; }

    if (navBadgeStatus) {
      navBadgeStatus.className = "badge badge-warning nav-badge";
      navBadgeStatus.innerText = "Pending";
    }
  } else if (st === "accepted") {
    if (heroCard) heroCard.className = "status-hero accepted";
    if (heroPill) heroPill.innerText = "STATUS: TAHAP 5 - FINAL APPROVAL KOORDINATOR (LOLOS)";
    if (heroTitle) heroTitle.innerText = "Selamat! Anda Resmi Menjadi Peserta MBKM";
    if (heroDesc) heroDesc.innerText = "Seluruh tahapan seleksi telah selesai. SuReKom telah disetujui, rekomendasi mitra telah diterima, dan Koordinator MBKM telah memberikan approval final.";

    if (feedbackBox) {
      feedbackBox.style.display = "block";
      feedbackBox.style.background = "#dcfce7";
      feedbackBox.style.border = "1px solid #bbf7d0";
      feedbackBox.style.color = "#14532d";
      feedbackBox.innerHTML = "<strong>Catatan Approval:</strong> Selamat bergabung! Silakan unduh SuReKom Digital di bawah ini dan segera bergabung ke grup koordinasi mitra. DPL Anda: Dr. Ricardus Anggi, M.Kom.";
    }
    
    if (btnDownload) btnDownload.style.display = "inline-flex";

    for (let i = 1; i <= 5; i++) {
      const s = document.getElementById("step-5-" + i);
      const b = document.getElementById("badge-tahap-" + i);
      if (s) { s.style.opacity = "1"; s.style.borderLeft = "4px solid #16a34a"; s.style.background = "#f0fdf4"; }
      if (b) { b.className = "badge badge-success"; b.innerText = "Selesai"; }
    }

    if (navBadgeStatus) {
      navBadgeStatus.className = "badge badge-success nav-badge";
      navBadgeStatus.innerText = "Accepted";
    }
  } else if (st === "rejected") {
    if (heroCard) heroCard.className = "status-hero rejected";
    if (heroPill) heroPill.innerText = "STATUS: PENGAJUAN DITOLAK / PERLU REVISI";
    if (heroTitle) heroTitle.innerText = "Mohon Maaf, Pengajuan Belum Dapat Disetujui";
    if (heroDesc) heroDesc.innerText = "Terdapat kendala pada berkas atau hasil seleksi mitra yang menyebabkan pengajuan Anda tidak dapat dilanjutkan ke tahap berikutnya.";

    if (feedbackBox) {
      feedbackBox.style.display = "block";
      feedbackBox.style.background = "#fee2e2";
      feedbackBox.style.border = "1px solid #fecaca";
      feedbackBox.style.color = "#7f1d1d";
      feedbackBox.innerHTML = "<strong>Alasan Evaluasi:</strong> Tautan Google Drive Portofolio tidak dapat diakses (Private). Silakan perbaiki akses berbagi menjadi \"Siapa saja yang memiliki link\" dan ajukan kembali.";
    }
    
    if (btnDownload) btnDownload.style.display = "none";

    if (navBadgeStatus) {
      navBadgeStatus.className = "badge badge-danger nav-badge";
      navBadgeStatus.innerText = "Rejected";
    }
  }

  // Update Detail Text
  const pProg = document.getElementById("detail-status-program");
  const pMitr = document.getElementById("detail-status-mitra");
  const pPos  = document.getElementById("detail-status-posisi");
  const pDur  = document.getElementById("detail-status-durasi");
  const pTr   = document.getElementById("status-file-transkrip");
  const pCv   = document.getElementById("status-file-cv");

  if (pProg) pProg.innerText = reg.program;
  if (pMitr) pMitr.innerText = reg.mitra;
  if (pPos)  pPos.innerText  = reg.posisi;
  if (pDur)  pDur.innerText  = reg.durasi;
  if (pTr)   pTr.innerText   = reg.transkripName;
  if (pCv)   pCv.innerText   = reg.cvName;

  const dProg = document.getElementById("dash-status-program");
  const dDate = document.getElementById("dash-status-date");
  if (dProg) dProg.innerText = reg.program + " — " + reg.mitra;
  if (dDate) dDate.innerText = reg.tanggal;

  const dashBox   = document.getElementById("dash-status-box");
  const dashLabel = document.getElementById("dash-status-label");
  if (dashBox && dashLabel) {
    if (st === "pending") {
      dashLabel.innerText = "Pending (Menunggu Verifikasi)";
      dashLabel.style.color = "#92400e";
      dashBox.style.background = "#fffbeb";
      dashBox.style.borderColor = "#fde68a";
    } else if (st === "accepted") {
      dashLabel.innerText = "Accepted (Lolos & Diterima)";
      dashLabel.style.color = "#166534";
      dashBox.style.background = "#f0fdf4";
      dashBox.style.borderColor = "#bbf7d0";
    } else if (st === "rejected") {
      dashLabel.innerText = "Rejected (Perlu Revisi Berkas)";
      dashLabel.style.color = "#991b1b";
      dashBox.style.background = "#fef2f2";
      dashBox.style.borderColor = "#fecaca";
    }
  }

  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ─── Simulator Setter Functions ───────────────────────────
function setEligibility(isPass) {
  if (typeof appState === "undefined") return;
  appState.isEligible = isPass;
  if (isPass) {
    appState.student.smt = 6;
    appState.student.ipk = 3.72;
    appState.student.sks = 104;
  } else {
    appState.student.smt = 4;
    appState.student.ipk = 2.85;
    appState.student.sks = 72;
  }

  const btnPass = document.getElementById("btn-sim-pass");
  const btnFail = document.getElementById("btn-sim-fail");
  if (btnPass) btnPass.className = isPass ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline";
  if (btnFail) btnFail.className = !isPass ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline";

  updateUI();
}

function setTrackingStatus(status) {
  if (typeof appState === "undefined") return;
  appState.trackingStatus = status;
  updateTrackingUI();
}

// ─── File Upload Handler ──────────────────────────────────
function handleFileChange(input, boxId, infoId, nameId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      alert("Hanya berkas format .PDF yang diperbolehkan sesuai persyaratan.");
      input.value = "";
      return;
    }
    document.getElementById(boxId)?.classList.add("has-file");
    const info = document.getElementById(infoId);
    if (info) info.style.display = "flex";
    const nameEl = document.getElementById(nameId);
    if (nameEl) nameEl.innerText = file.name;
  }
}

// ─── Form Pendaftaran Submit ──────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();

  if (typeof appState !== "undefined" && !appState.isEligible) {
    alert("Pendaftaran tidak dapat diproses karena Anda belum memenuhi syarat validasi DB.");
    return;
  }

  const program = document.getElementById("reg-program")?.value || "";
  const mitra = document.getElementById("reg-mitra")?.value || "";
  const posisi = document.getElementById("reg-posisi")?.value || "";
  const durasi = document.getElementById("reg-durasi")?.value || "";
  const transkripFile = document.getElementById("name-transkrip")?.innerText || "";
  const cvFile = document.getElementById("name-cv")?.innerText || "";

  if (typeof appState !== "undefined") {
    appState.registration = {
      program,
      mitra,
      posisi,
      durasi,
      transkripName: transkripFile,
      cvName: cvFile,
      tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    };
    appState.trackingStatus = "pending";
  }

  updateUI();
  alert("Pendaftaran Berhasil Dikirim!\nStatus pengajuan Anda saat ini adalah: Pending (Menunggu Verifikasi).");

  if (window.location.pathname.includes("/mahasiswa/")) {
    window.location.href = "/mahasiswa/lamaran#status";
  } else {
    window.location.hash = "#status";
  }
}

// Expose functions globally to window for inline onclick handlers
window.setupSidebar = setupSidebar;
window.setupDropdowns = setupDropdowns;
window.toggleSubmenu = toggleSubmenu;
window.setDashboardPhase = setDashboardPhase;
window.setupRouting = setupRouting;
window.filterAnnouncements = filterAnnouncements;
window.searchAnnouncements = searchAnnouncements;
window.openAnnouncementModal = openAnnouncementModal;
window.closeAnnouncementModal = closeAnnouncementModal;
window.filterKatalog = filterKatalog;
window.searchKatalog = searchKatalog;
window.selectProgramAndRegister = selectProgramAndRegister;
window.goToStep = goToStep;
window.recalculateSKS = recalculateSKS;
window.submitPendaftaranMBKM = submitPendaftaranMBKM;
window.unduhSurekomPDF = unduhSurekomPDF;
window.simulateEWS = simulateEWS;
window.setApplicationStatus = setApplicationStatus;
window.submitLogbookMBKM = submitLogbookMBKM;
window.showLogbookDetail = showLogbookDetail;
window.openLogbookModal = openLogbookModal;
window.closeLogbookModal = closeLogbookModal;
window.handleLogbookSubmit = handleLogbookSubmit;
window.updateUI = updateUI;
window.setEligibility = setEligibility;
window.setTrackingStatus = setTrackingStatus;
window.handleFileChange = handleFileChange;
window.handleFormSubmit = handleFormSubmit;
