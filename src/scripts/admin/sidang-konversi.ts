// @ts-nocheck
// ==============================================================================
// MODUL SIDANG, KONVERSI SKS & SERTIFIKAT MBKM
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// JAVASCRIPT CONTROLLER BAGIAN 1 (ISSUE #17)
// ====================================================

// 1. Modul Konversi SKS (5 Skema Dinamis & CPL Locking)
function openModalInfoSkemaSks() {
  const modal = document.getElementById('modal-info-skema-sks');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalInfoSkemaSks() {
  const modal = document.getElementById('modal-info-skema-sks');
  if (modal) modal.classList.add('hidden');
}

function openModalTelaahKonversi(nama, nim, prodi, kontributor, skema, totalSks, matkulCount) {
  document.getElementById('modal-telaah-nama').textContent = nama;
  document.getElementById('modal-telaah-nim-prodi').textContent = `${nim} • ${prodi}`;
  document.getElementById('modal-telaah-kontributor').textContent = kontributor;
  document.getElementById('modal-telaah-skema-badge').textContent = skema;
  document.getElementById('modal-telaah-sks-total').textContent =
    `Total: ${totalSks} SKS (${matkulCount} Matkul)`;

  const btnKunci = document.getElementById('modal-telaah-btn-kunci');
  if (btnKunci) {
    btnKunci.onclick = function () {
      kunciKonversiIndividu(nim, nama);
      closeModalTelaahKonversi();
    };
  }

  const modal = document.getElementById('modal-telaah-konversi');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalTelaahKonversi() {
  const modal = document.getElementById('modal-telaah-konversi');
  if (modal) modal.classList.add('hidden');
}

function kunciKonversiIndividu(nim, nama) {
  if (
    confirm(
      `Sahkan dan kunci konversi SKS untuk mahasiswa ${nama} (${nim})?\n\nSetelah dikunci, usulan mata kuliah berstatus permanen dan langsung disinkronkan ke KHS SIADIN.`
    )
  ) {
    alert(`Konversi SKS untuk ${nama} (${nim}) BERHASIL DISAHKAN & DIKUNCI! Data telah terkirim ke KHS SIADIN.`);
  }
}

function kunciKonversiMassal() {
  const checkboxes = document.querySelectorAll('.check-konversi-row:checked');
  if (checkboxes.length === 0) {
    alert('Pilih minimal satu usulan konversi mahasiswa untuk disahkan & dikunci.');
    return;
  }
  if (
    confirm(`Sahkan dan kunci ${checkboxes.length} usulan konversi SKS terpilih ke KHS SIADIN secara massal?`)
  ) {
    alert(`Sukses! ${checkboxes.length} berkas konversi SKS berhasil disahkan dan dikunci permanen.`);
  }
}

function toggleSelectAllKonversi(source) {
  document.querySelectorAll('.check-konversi-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

// 2. Modul Kuota Dosen Pembimbing
function openModalSetBatasKuota() {
  const modal = document.getElementById('modal-atur-kuota-dosen');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalSetBatasKuota() {
  const modal = document.getElementById('modal-atur-kuota-dosen');
  if (modal) modal.classList.add('hidden');
}

function handleSaveBatasKuotaFakultas(e) {
  e.preventDefault();
  const kuota = document.getElementById('input-kuota-standar-fakultas').value;
  closeModalSetBatasKuota();
  alert(`Batas standar kuota Dospem fakultas berhasil diperbarui menjadi ${kuota} mahasiswa per dosen.`);
}

function openModalEditBatasDosen(dosenNama, kuota, terpakai) {
  document.getElementById('modal-edit-dosen-subtitle').textContent = dosenNama;
  document.getElementById('modal-edit-dosen-terpakai').textContent = `${terpakai} Mahasiswa`;
  document.getElementById('input-kuota-individual').value = kuota;
  const modal = document.getElementById('modal-edit-batas-dosen');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalEditBatasDosen() {
  const modal = document.getElementById('modal-edit-batas-dosen');
  if (modal) modal.classList.add('hidden');
}

function handleSaveKuotaIndividual(e) {
  e.preventDefault();
  const kuotaBaru = document.getElementById('input-kuota-individual').value;
  closeModalEditBatasDosen();
  alert(`Kapasitas kuota dosen berhasil disesuaikan menjadi ${kuotaBaru} mahasiswa.`);
}

// 3. Modul Data Dosen & Update Dospem (Plotting)
function syncDataDosenUdi() {
  alert('Sinkronisasi data kepegawaian dosen dengan UDI berhasil dijalankan. 48 dosen terverifikasi aktif.');
}

function openModalTambahDosen() {
  showAddKoordinatorModal();
}

function showDetailDosen(nama, nidn, prodi, kepakaran, beban) {
  alert(
    `Detail Dosen Pembimbing:\nNama: ${nama}\nNIDN: ${nidn}\nProdi: ${prodi}\nKepakaran: ${kepakaran}\nBeban Aktif: ${beban} mahasiswa.`
  );
}

function filterDosenData() {
  // Filter controller logic
  const query =
    (document.getElementById('search-dosen-data') || document.getElementById('search-dosen-data-embed') || {})
      .value || '';
  const prodi =
    (document.getElementById('filter-dosen-prodi') || document.getElementById('filter-dosen-prodi-embed') || {})
      .value || '';
  // Filtering simulated visually
}

function autoAssignDplBatch() {
  if (
    confirm(
      'Jalankan Auto-Assign Cerdas?\nSistem akan mencocokkan mahasiswa dengan Dospem berdasarkan kesesuaian domain kepakaran dan sisa kuota terbanyak.'
    )
  ) {
    alert('Berhasil! 14 mahasiswa dalam antrean telah dipasangkan dengan Dospem yang sesuai secara otomatis.');
  }
}

function simpanSemuaPlotting() {
  const selected = document.querySelectorAll('.check-plotting-row:checked');
  if (selected.length === 0) {
    alert('Pilih minimal satu mahasiswa untuk disimpan hasil plotting Dospem-nya.');
    return;
  }
  alert(`Berhasil menyimpan penugasan Dospem untuk ${selected.length} mahasiswa terpilih.`);
}

function saveIndividualPlotting(nim, nama) {
  alert(`Plotting Dospem untuk ${nama} (${nim}) berhasil disimpan.`);
}

function toggleSelectAllPlotting(source) {
  document.querySelectorAll('.check-plotting-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

// 4. Modul Sidang MBKM & Evaluasi Gabungan (60% Kontributor + 40% Dospem)
function openModalJadwalSidang() {
  const modal = document.getElementById('modal-jadwal-sidang');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalJadwalSidang() {
  const modal = document.getElementById('modal-jadwal-sidang');
  if (modal) modal.classList.add('hidden');
}

function handleSaveJadwalSidang(e) {
  e.preventDefault();
  closeModalJadwalSidang();
  alert('Jadwal sidang evaluasi akhir MBKM berhasil disimpan.');
}

function openModalInputNilaiSidang(nama, nim, kontributor, dpl, nilaiKontributor, nilaiDpl) {
  document.getElementById('modal-sidang-mhs-info').textContent = `${nama} (${nim})`;
  document.getElementById('modal-sidang-kontributor').textContent = kontributor;
  document.getElementById('modal-sidang-dpl').textContent = dpl;
  document.getElementById('input-nilai-kontributor').value = nilaiKontributor || '';
  document.getElementById('input-nilai-dpl').value = nilaiDpl || '';
  hitungNilaiAkhirSidang();
  const modal = document.getElementById('modal-input-nilai-sidang');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalInputNilaiSidang() {
  const modal = document.getElementById('modal-input-nilai-sidang');
  if (modal) modal.classList.add('hidden');
}

function hitungNilaiAkhirSidang() {
  const nKontributor = parseFloat(document.getElementById('input-nilai-kontributor').value) || 0;
  const nDpl = parseFloat(document.getElementById('input-nilai-dpl').value) || 0;
  const nAkhir = 0.6 * nKontributor + 0.4 * nDpl;

  let grade = '-';
  if (nAkhir >= 85) grade = 'A';
  else if (nAkhir >= 80) grade = 'AB';
  else if (nAkhir >= 70) grade = 'B';
  else if (nAkhir >= 65) grade = 'BC';
  else if (nAkhir >= 60) grade = 'C';
  else if (nAkhir > 0) grade = 'D/E';

  document.getElementById('display-nilai-angka').textContent = nAkhir.toFixed(1);
  document.getElementById('display-nilai-huruf').textContent = `Grade ${grade}`;
}

function handleSaveNilaiSidang(e) {
  e.preventDefault();
  const nAngka = document.getElementById('display-nilai-angka').textContent;
  const grade = document.getElementById('display-nilai-huruf').textContent;
  closeModalInputNilaiSidang();
  alert(
    `Nilai akhir sidang berhasil disahkan!\nNilai Gabungan: ${nAngka} (${grade})\nStatus: Lulus Evaluasi MBKM.`
  );
}

function filterSidangTable() {
  // Filter controller
}

// 5. Modul Validasi Sertifikat & Bukti Luaran Wajib
function previewDokumenLuaran(filename, tipe, mhsNama) {
  document.getElementById('modal-preview-doc-title').textContent = `Pratinjau Dokumen: ${tipe}`;
  document.getElementById('modal-preview-doc-sub').textContent = `${tipe} • ${mhsNama}`;
  document.getElementById('modal-preview-filename').textContent = filename;
  const modal = document.getElementById('modal-preview-dokumen-luaran');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeModalPreviewDokumen() {
  const modal = document.getElementById('modal-preview-dokumen-luaran');
  if (modal) modal.classList.add('hidden');
}

function verifikasiSertifikatIndividu(nim, nama, disetujui) {
  if (disetujui) {
    alert(
      `Berkas luaran mahasiswa ${nama} (${nim}) disetujui dan dinyatakan lolos validasi. Nilai siap disinkronkan ke KHS SIADIN.`
    );
  }
}

function mintaRevisiSertifikat(nim, nama) {
  const catatan = prompt(
    `Masukkan catatan revisi untuk ${nama} (${nim}):`,
    'Mohon unggah dokumen bertanda tangan resmi / cap basah kontributor.'
  );
  if (catatan) {
    alert(`Permintaan revisi telah dikirimkan ke mahasiswa dengan catatan: "${catatan}"`);
  }
}

function validasiSemuaSertifikatLolos() {
  const selected = document.querySelectorAll('.check-sertifikat-row:checked');
  if (selected.length === 0) {
    alert('Pilih minimal satu berkas mahasiswa untuk disetujui.');
    return;
  }
  alert(
    `Sukses memvalidasi ${selected.length} berkas luaran sertifikat terpilih. Status KHS diperbarui menjadi siap sinkronisasi.`
  );
}

function toggleSelectAllSertifikat(source) {
  document.querySelectorAll('.check-sertifikat-row').forEach((cb) => {
    cb.checked = source.checked;
  });
}

function filterSertifikatTable() {
  // Filter controller
}

// 6. Modul Log Aktivitas & Audit Trail
function exportLogAktivitasCsv() {
  alert('Memulai pengunduhan riwayat audit trail log aktivitas dalam format CSV...');
}

function filterLogTable() {
  // Filter controller
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).openModalInfoSkemaSks = openModalInfoSkemaSks;
  (window as any).closeModalInfoSkemaSks = closeModalInfoSkemaSks;
  (window as any).openModalTelaahKonversi = openModalTelaahKonversi;
  (window as any).closeModalTelaahKonversi = closeModalTelaahKonversi;
  (window as any).kunciKonversiIndividu = kunciKonversiIndividu;
  (window as any).kunciKonversiMassal = kunciKonversiMassal;
  (window as any).toggleSelectAllKonversi = toggleSelectAllKonversi;
  (window as any).openModalSetBatasKuota = openModalSetBatasKuota;
  (window as any).closeModalSetBatasKuota = closeModalSetBatasKuota;
  (window as any).handleSaveBatasKuotaFakultas = handleSaveBatasKuotaFakultas;
  (window as any).openModalEditBatasDosen = openModalEditBatasDosen;
  (window as any).closeModalEditBatasDosen = closeModalEditBatasDosen;
  (window as any).handleSaveKuotaIndividual = handleSaveKuotaIndividual;
  (window as any).syncDataDosenUdi = syncDataDosenUdi;
  (window as any).openModalTambahDosen = openModalTambahDosen;
  (window as any).showDetailDosen = showDetailDosen;
  (window as any).filterDosenData = filterDosenData;
  (window as any).autoAssignDplBatch = autoAssignDplBatch;
  (window as any).simpanSemuaPlotting = simpanSemuaPlotting;
  (window as any).saveIndividualPlotting = saveIndividualPlotting;
  (window as any).toggleSelectAllPlotting = toggleSelectAllPlotting;
  (window as any).openModalJadwalSidang = openModalJadwalSidang;
  (window as any).closeModalJadwalSidang = closeModalJadwalSidang;
  (window as any).handleSaveJadwalSidang = handleSaveJadwalSidang;
  (window as any).openModalInputNilaiSidang = openModalInputNilaiSidang;
  (window as any).closeModalInputNilaiSidang = closeModalInputNilaiSidang;
  (window as any).hitungNilaiAkhirSidang = hitungNilaiAkhirSidang;
  (window as any).handleSaveNilaiSidang = handleSaveNilaiSidang;
  (window as any).filterSidangTable = filterSidangTable;
  (window as any).previewDokumenLuaran = previewDokumenLuaran;
  (window as any).closeModalPreviewDokumen = closeModalPreviewDokumen;
  (window as any).verifikasiSertifikatIndividu = verifikasiSertifikatIndividu;
  (window as any).mintaRevisiSertifikat = mintaRevisiSertifikat;
  (window as any).validasiSemuaSertifikatLolos = validasiSemuaSertifikatLolos;
  (window as any).toggleSelectAllSertifikat = toggleSelectAllSertifikat;
  (window as any).filterSertifikatTable = filterSertifikatTable;
  (window as any).exportLogAktivitasCsv = exportLogAktivitasCsv;
  (window as any).filterLogTable = filterLogTable;
}

export {
  openModalInfoSkemaSks,
  closeModalInfoSkemaSks,
  openModalTelaahKonversi,
  closeModalTelaahKonversi,
  kunciKonversiIndividu,
  kunciKonversiMassal,
  toggleSelectAllKonversi,
  openModalSetBatasKuota,
  closeModalSetBatasKuota,
  handleSaveBatasKuotaFakultas,
  openModalEditBatasDosen,
  closeModalEditBatasDosen,
  handleSaveKuotaIndividual,
  syncDataDosenUdi,
  openModalTambahDosen,
  showDetailDosen,
  filterDosenData,
  autoAssignDplBatch,
  simpanSemuaPlotting,
  saveIndividualPlotting,
  toggleSelectAllPlotting,
  openModalJadwalSidang,
  closeModalJadwalSidang,
  handleSaveJadwalSidang,
  openModalInputNilaiSidang,
  closeModalInputNilaiSidang,
  hitungNilaiAkhirSidang,
  handleSaveNilaiSidang,
  filterSidangTable,
  previewDokumenLuaran,
  closeModalPreviewDokumen,
  verifikasiSertifikatIndividu,
  mintaRevisiSertifikat,
  validasiSemuaSertifikatLolos,
  toggleSelectAllSertifikat,
  filterSertifikatTable,
  exportLogAktivitasCsv,
  filterLogTable,
};
