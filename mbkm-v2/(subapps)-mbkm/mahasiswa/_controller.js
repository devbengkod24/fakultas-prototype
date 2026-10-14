/**
 * ==============================================================================
 * CONTROLLER & INTERACTION LOGIC — Mahasiswa MBKM v2
 * Fakultas Ilmu Komputer UDINUS
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Icons
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Sidebar controls
  setupSidebar();
  setupDropdowns();

  // Routing Tab View
  setupRouting();

  // Render awal data
  updateUI();
});

// ─── Setup Sidebar & Dropdown ──────────────────────────────
function setupSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const toggleBtns = document.querySelectorAll('.sidebar-toggle-btn');
  const isMobile = () => window.innerWidth < 768;

  function toggleSidebar() {
    if (isMobile()) {
      sidebar?.classList.toggle('mobile-open');
      sidebarOverlay?.classList.toggle('visible');
    } else {
      sidebar?.classList.toggle('collapsed');
    }
  }

  toggleBtns.forEach(btn => btn.addEventListener('click', toggleSidebar));
  sidebarOverlay?.addEventListener('click', () => {
    sidebar?.classList.remove('mobile-open');
    sidebarOverlay?.classList.remove('visible');
  });
}

function setupDropdowns() {
  const appSwitcherBtn = document.getElementById('app-switcher-btn');
  const appSwitcherDropdown = document.getElementById('app-switcher-dropdown');
  const appSwitcherChevron = appSwitcherBtn?.querySelector('.app-switcher-chevron');
  const userCard = document.getElementById('user-card');
  const userDropdown = document.getElementById('user-dropdown');

  appSwitcherBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = appSwitcherDropdown?.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      appSwitcherDropdown?.classList.add('open');
      appSwitcherChevron?.classList.add('open');
    }
  });

  userCard?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = userDropdown?.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) userDropdown?.classList.add('open');
  });

  function closeAllDropdowns() {
    appSwitcherDropdown?.classList.remove('open');
    appSwitcherChevron?.classList.remove('open');
    userDropdown?.classList.remove('open');
  }

  document.addEventListener('click', closeAllDropdowns);

  document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    if (!confirm('Keluar dari akun mahasiswa dan kembali ke Portal Apps?')) {
      e.preventDefault();
    }
  });
}

// ─── Hash Routing (Dashboard, Pendaftaran, Status Saya) ────
function setupRouting() {
  function navigate(hash) {
    const targetHash = (hash && ['#dashboard', '#pendaftaran', '#status'].includes(hash)) ? hash : '#dashboard';

    // Sembunyikan semua tab view
    document.querySelectorAll('.tab-view').forEach(el => el.classList.remove('active'));

    // Tampilkan view yang aktif
    const activeViewId = targetHash === '#dashboard' ? 'view-dashboard' :
      targetHash === '#pendaftaran' ? 'view-pendaftaran' : 'view-status';
    const activeEl = document.getElementById(activeViewId);
    activeEl?.classList.add('active');
    // Dynamic fetch loader for Option 1
    const fileMap = { 'view-dashboard': 'dashboard.html', 'view-pendaftaran': 'pendaftaran.html', 'view-status': 'status.html' };
    if (fileMap[activeViewId]) {
      fetch(fileMap[activeViewId])
        .then(res => res.ok ? res.text() : null)
        .then(html => {
          if (html && activeEl) {
            activeEl.innerHTML = html;
            updateUI();
            if (typeof lucide !== 'undefined') lucide.createIcons();
          }
        })
        .catch(() => {});
    }

    // Update active nav-link
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
      if (link.getAttribute('href') === targetHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update breadcrumb, judul dan subtitle halaman (sesuai template DESIGN.md Bab 15.2)
    const bcCurrent = document.getElementById('breadcrumb-current');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');

    if (targetHash === '#dashboard') {
      if (bcCurrent) bcCurrent.innerText = 'Dashboard';
      if (pageTitle) pageTitle.innerText = 'Dashboard Mahasiswa';
      if (pageSubtitle) pageSubtitle.innerText = 'Verifikasi data akademik Anda dari database dan mulai pendaftaran program MBKM.';
    } else if (targetHash === '#pendaftaran') {
      if (bcCurrent) bcCurrent.innerText = 'Pendaftaran';
      if (pageTitle) pageTitle.innerText = 'Pendaftaran MBKM Mandiri';
      if (pageSubtitle) pageSubtitle.innerText = 'Formulir pengajuan program MBKM mandiri untuk mahasiswa yang telah lolos syarat validasi DB.';
    } else if (targetHash === '#status') {
      if (bcCurrent) bcCurrent.innerText = 'Status Saya';
      if (pageTitle) pageTitle.innerText = 'Tracking Status Pendaftaran';
      if (pageSubtitle) pageSubtitle.innerText = 'Pantau progres verifikasi berkas pendaftaran MBKM Anda (Pending, Accepted, Rejected).';
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', () => navigate(window.location.hash));
  navigate(window.location.hash);
}

// ─── Update UI Berdasarkan State ──────────────────────────
function updateUI() {
  const isPass = appState.isEligible;
  const s = appState.student;

  // 1. Update Nilai Validasi Syarat DB
  document.getElementById('val-syarat-smt').innerText = 'Semester ' + s.smt;
  document.getElementById('val-syarat-ipk').innerText = s.ipk.toFixed(2);
  document.getElementById('val-syarat-sks').innerText = s.sks + ' SKS';

  // Badges syarat
  const smtPass = s.smt >= 6 && s.smt <= 8;
  const ipkPass = s.ipk >= 3.00;
  const sksPass = s.sks >= 100;

  setCardStatus('smt', smtPass, 'Semester ' + s.smt, 'Smt 6 - 8');
  setCardStatus('ipk', ipkPass, s.ipk.toFixed(2), 'Min. 3.00');
  setCardStatus('sks', sksPass, s.sks + ' SKS', 'Min. 100 SKS');

  // Summary badge
  const totalPass = (smtPass ? 1 : 0) + (ipkPass ? 1 : 0) + (sksPass ? 1 : 0);
  const dbBadge = document.getElementById('db-summary-badge');
  if (isPass) {
    dbBadge.className = 'badge badge-success';
    dbBadge.innerText = '3 dari 3 Syarat Terpenuhi (Lolos)';
  } else {
    dbBadge.className = 'badge badge-danger';
    dbBadge.innerText = totalPass + ' dari 3 Syarat Terpenuhi (Belum Lolos)';
  }

  // 2. Banner Dashboard
  const bannerBadge = document.getElementById('banner-eligibility-badge');
  const bannerDesc = document.getElementById('banner-eligibility-desc');
  const heroBtn = document.getElementById('btn-hero-action');
  const navBadgePendaftaran = document.getElementById('nav-badge-pendaftaran');
  const step1Badge = document.getElementById('flow-step1-badge');
  const step2Badge = document.getElementById('flow-step2-badge');

  if (isPass) {
    bannerBadge.innerText = 'Status DB: Lolos Syarat Pendaftaran';
    bannerBadge.parentElement.style.background = 'rgba(255,255,255,0.2)';
    bannerDesc.innerText = 'Data akademik Anda telah diverifikasi oleh sistem database. Anda memenuhi semua syarat untuk mendaftar Program MBKM Mandiri semester ini.';
    heroBtn.innerHTML = '<i data-lucide="file-edit"></i> Buka Pendaftaran Mandiri';
    heroBtn.href = '#pendaftaran';
    heroBtn.style.display = 'inline-flex';

    navBadgePendaftaran.className = 'badge badge-success nav-badge';
    navBadgePendaftaran.innerText = 'Buka';

    step1Badge.className = 'badge badge-success';
    step1Badge.innerText = 'Lolos';
    step2Badge.className = 'badge badge-primary';
    step2Badge.innerText = 'Tersedia';

    // Tampilan Tab Pendaftaran
    document.getElementById('pendaftaran-locked-container').style.display = 'none';
    document.getElementById('pendaftaran-form-container').style.display = 'block';
  } else {
    bannerBadge.innerText = 'Status DB: Belum Memenuhi Syarat';
    bannerBadge.parentElement.style.background = 'rgba(220,38,38,0.3)';
    bannerDesc.innerText = 'Mohon maaf, Anda belum memenuhi syarat pendaftaran MBKM (Semester 6-8, IPK >= 3.00, SKS >= 100). Pendaftaran saat ini terkunci.';
    heroBtn.innerHTML = '<i data-lucide="lock"></i> Pendaftaran Terkunci';
    heroBtn.href = '#pendaftaran';

    navBadgePendaftaran.className = 'badge badge-danger nav-badge';
    navBadgePendaftaran.innerText = 'Terkunci';

    step1Badge.className = 'badge badge-danger';
    step1Badge.innerText = 'Tidak Lolos';
    step2Badge.className = 'badge badge-danger';
    step2Badge.innerText = 'Terkunci';

    // Tampilan Tab Pendaftaran
    document.getElementById('pendaftaran-locked-container').style.display = 'block';
    document.getElementById('pendaftaran-form-container').style.display = 'none';

    // Update alasan kunci
    document.getElementById('lock-reason-smt').style.display = smtPass ? 'none' : 'list-item';
    document.getElementById('lock-reason-ipk').style.display = ipkPass ? 'none' : 'list-item';
    document.getElementById('lock-reason-sks').style.display = sksPass ? 'none' : 'list-item';
  }

  // 3. Update Status Tracking View
  updateTrackingUI();

  // Re-render icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function setCardStatus(type, isOk, valText, reqText) {
  const badge = document.getElementById('badge-syarat-' + type);
  const icon = document.getElementById('icon-syarat-' + type);
  if (isOk) {
    badge.className = 'badge badge-success';
    badge.innerHTML = '<i data-lucide="check" style="width:12px;height:12px;"></i> Memenuhi';
    if (type === 'smt') icon.className = 'stat-card-accent accent-blue';
    if (type === 'ipk') icon.className = 'stat-card-accent accent-green';
    if (type === 'sks') icon.className = 'stat-card-accent accent-purple';
  } else {
    badge.className = 'badge badge-danger';
    badge.innerHTML = '<i data-lucide="x" style="width:12px;height:12px;"></i> Belum Lolos';
    icon.className = 'stat-card-accent accent-red';
  }
}

// ─── Tracking Status UI (Pending, Accepted, Rejected) ─────
function updateTrackingUI() {
  const st = appState.trackingStatus;
  const reg = appState.registration;

  const heroCard = document.getElementById('status-hero-card');
  const heroPill = document.getElementById('status-hero-pill-text');
  const heroTitle = document.getElementById('status-hero-title');
  const heroDesc = document.getElementById('status-hero-desc');
  const feedbackBox = document.getElementById('status-feedback-box');
  const navBadgeStatus = document.getElementById('nav-badge-status');

  const cardPending = document.getElementById('step-card-pending');
  const cardAccepted = document.getElementById('step-card-accepted');
  const cardRejected = document.getElementById('step-card-rejected');

  const badgePending = document.getElementById('badge-step-pending');
  const badgeAccepted = document.getElementById('badge-step-accepted');
  const badgeRejected = document.getElementById('badge-step-rejected');

  // Reset step opacity & border
  [cardPending, cardAccepted, cardRejected].forEach(c => {
    c.style.opacity = '0.5';
    c.style.borderLeft = '1px solid var(--border)';
  });
  badgePending.className = badgeAccepted.className = badgeRejected.className = 'badge badge-muted';
  badgePending.innerText = badgeAccepted.innerText = badgeRejected.innerText = '-';

  if (st === 'pending') {
    heroCard.className = 'status-hero pending';
    heroPill.innerText = 'STATUS: PENDING (MENUNGGU)';
    heroPill.previousElementSibling.setAttribute('data-lucide', 'clock');
    heroPill.previousElementSibling.style.color = '#d97706';
    heroTitle.innerText = 'Pendaftaran Anda Sedang Dalam Proses Peninjauan';
    heroDesc.innerText = 'Berkas Anda telah diterima oleh sistem dan sedang diverifikasi oleh Tim Koordinator MBKM Fakultas Ilmu Komputer. Proses verifikasi biasanya memakan waktu 1 - 3 hari kerja.';
    feedbackBox.style.display = 'none';

    cardPending.style.opacity = '1';
    cardPending.style.borderLeft = '4px solid #d97706';
    badgePending.className = 'badge badge-warning';
    badgePending.innerText = 'Sedang Berjalan';

    navBadgeStatus.className = 'badge badge-warning nav-badge';
    navBadgeStatus.innerText = 'Pending';

    // Dashboard quick status
    document.getElementById('dash-status-label').innerText = 'Pending (Menunggu Verifikasi)';
    document.getElementById('dash-status-label').style.color = '#92400e';
    document.getElementById('dash-status-box').style.background = '#fffbeb';
    document.getElementById('dash-status-box').style.borderColor = '#fde68a';
  } else if (st === 'accepted') {
    heroCard.className = 'status-hero accepted';
    heroPill.innerText = 'STATUS: ACCEPTED (DITERIMA)';
    heroPill.previousElementSibling.setAttribute('data-lucide', 'check-circle-2');
    heroPill.previousElementSibling.style.color = '#16a34a';
    heroTitle.innerText = 'Selamat! Pendaftaran MBKM Anda Telah Diterima';
    heroDesc.innerText = 'Koordinator MBKM FIK telah menyetujui pendaftaran mandiri Anda. Surat Rekomendasi Resmi dan penetapan Dosen Pembimbing Lapangan (DPL) telah diterbitkan.';

    feedbackBox.style.display = 'block';
    feedbackBox.style.background = '#dcfce7';
    feedbackBox.style.border = '1px solid #bbf7d0';
    feedbackBox.style.color = '#14532d';
    feedbackBox.innerHTML = '<strong>Catatan Koordinator:</strong> Berkas Transkrip dan CV lengkap & relevan dengan mitra. Dosen Pembimbing Lapangan (DPL): Dr. Ir. Edi Mulyanto, M.Kom.';

    cardAccepted.style.opacity = '1';
    cardAccepted.style.borderLeft = '4px solid #16a34a';
    badgeAccepted.className = 'badge badge-success';
    badgeAccepted.innerText = 'Diterima';

    navBadgeStatus.className = 'badge badge-success nav-badge';
    navBadgeStatus.innerText = 'Accepted';

    // Dashboard quick status
    document.getElementById('dash-status-label').innerText = 'Accepted (Diterima)';
    document.getElementById('dash-status-label').style.color = '#166534';
    document.getElementById('dash-status-box').style.background = '#f0fdf4';
    document.getElementById('dash-status-box').style.borderColor = '#bbf7d0';
  } else if (st === 'rejected') {
    heroCard.className = 'status-hero rejected';
    heroPill.innerText = 'STATUS: REJECTED (DITOLAK)';
    heroPill.previousElementSibling.setAttribute('data-lucide', 'x-circle');
    heroPill.previousElementSibling.style.color = '#dc2626';
    heroTitle.innerText = 'Mohon Maaf, Pendaftaran Anda Belum Disetujui';
    heroDesc.innerText = 'Setelah diteliti oleh Koordinator MBKM, pendaftaran Anda belum memenuhi kualifikasi atau kelengkapan berkas yang disyaratkan.';

    feedbackBox.style.display = 'block';
    feedbackBox.style.background = '#fee2e2';
    feedbackBox.style.border = '1px solid #fecaca';
    feedbackBox.style.color = '#7f1d1d';
    feedbackBox.innerHTML = '<strong>Alasan Penolakan:</strong> Transkrip Nilai yang diunggah belum memuat cap legalisir BAAK resmi dan tanggal mulai program berbenturan dengan KRS reguler. Silakan perbaiki dan daftar ulang.';

    cardRejected.style.opacity = '1';
    cardRejected.style.borderLeft = '4px solid #dc2626';
    badgeRejected.className = 'badge badge-danger';
    badgeRejected.innerText = 'Ditolak';

    navBadgeStatus.className = 'badge badge-danger nav-badge';
    navBadgeStatus.innerText = 'Rejected';

    // Dashboard quick status
    document.getElementById('dash-status-label').innerText = 'Rejected (Ditolak)';
    document.getElementById('dash-status-label').style.color = '#991b1b';
    document.getElementById('dash-status-box').style.background = '#fef2f2';
    document.getElementById('dash-status-box').style.borderColor = '#fecaca';
  }

  // Update Detail Text
  document.getElementById('detail-status-program').innerText = reg.program;
  document.getElementById('detail-status-mitra').innerText = reg.mitra;
  document.getElementById('detail-status-posisi').innerText = reg.posisi;
  document.getElementById('detail-status-durasi').innerText = reg.durasi;
  document.getElementById('status-file-transkrip').innerText = reg.transkripName;
  document.getElementById('status-file-cv').innerText = reg.cvName;
  document.getElementById('dash-status-program').innerText = reg.program + ' — ' + reg.mitra;

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ─── Simulator Setter Functions ───────────────────────────
function setEligibility(isPass) {
  appState.isEligible = isPass;
  if (isPass) {
    appState.student.smt = 6;
    appState.student.ipk = 3.72;
    appState.student.sks = 104;
  } else {
    // Simulasi tidak lolos: Smt 4, IPK 2.85, SKS 72 (< 100 SKS)
    appState.student.smt = 4;
    appState.student.ipk = 2.85;
    appState.student.sks = 72;
  }

  // Update button active state (if exists)
  const btnPass = document.getElementById('btn-sim-pass');
  const btnFail = document.getElementById('btn-sim-fail');
  if (btnPass) btnPass.className = isPass ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline';
  if (btnFail) btnFail.className = !isPass ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline';

  updateUI();
}

function setTrackingStatus(status) {
  appState.trackingStatus = status;
  updateTrackingUI();
}

// ─── File Upload Handler ──────────────────────────────────
function handleFileChange(input, boxId, infoId, nameId) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Hanya berkas format .PDF yang diperbolehkan sesuai persyaratan.');
      input.value = '';
      return;
    }
    document.getElementById(boxId)?.classList.add('has-file');
    const info = document.getElementById(infoId);
    if (info) info.style.display = 'flex';
    const nameEl = document.getElementById(nameId);
    if (nameEl) nameEl.innerText = file.name;
  }
}

// ─── Form Pendaftaran Submit ──────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();

  if (!appState.isEligible) {
    alert('Pendaftaran tidak dapat diproses karena Anda belum memenuhi syarat validasi DB.');
    return;
  }

  // Ambil nilai form
  const program = document.getElementById('reg-program').value;
  const mitra = document.getElementById('reg-mitra').value;
  const posisi = document.getElementById('reg-posisi').value;
  const durasi = document.getElementById('reg-durasi').value;
  const transkripFile = document.getElementById('name-transkrip').innerText;
  const cvFile = document.getElementById('name-cv').innerText;

  appState.registration = {
    program,
    mitra,
    posisi,
    durasi,
    transkripName: transkripFile,
    cvName: cvFile,
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  };

  // Status masuk ke 'Pending (Menunggu)' sesuai flowchart
  appState.trackingStatus = 'pending';
  updateUI();

  alert('Pendaftaran Berhasil Dikirim!\nStatus pengajuan Anda saat ini adalah: Pending (Menunggu Verifikasi).');

  // Arahkan otomatis ke Menu Status Saya
  window.location.hash = '#status';
}
