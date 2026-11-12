// @ts-nocheck
// ==============================================================================
// SURAT REKOMENDASI TEMPLATE & PREVIEW MODALS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

/**
 * Menyusun isi teks Surat Rekomendasi Dekanat berdasarkan data permohonan.
 * Dipakai untuk pratinjau inline di modal validasi.
 */
function buildSuratRekomendasiText(item) {
  return `SURAT REKOMENDASI DEKANAT
Nomor: 412/A.11/FIK/UDINUS/2026

Yang bertanda tangan di bawah ini:
Nama    : Dr. Guruh Fajar Shidik, S.Kom, M.Cs
Jabatan : Dekan Fakultas Ilmu Komputer
Instansi: Universitas Dian Nuswantoro Semarang

Dengan ini memberikan rekomendasi penuh kepada mahasiswa:
Nama          : ${item.nama}
NIM           : ${item.nim}
Program Studi : ${item.prodi}
Semester      : ${item.semester}
IPK Kumulatif : ${item.ipk} (Total ${item.sksLulus} SKS Lulus)

Untuk mengikuti program ${item.program} pada instansi ${item.kontributor} periode Semester Gasal 2026/2027.

Berdasarkan data akademik EWS & SIADIN, yang bersangkutan dinyatakan memenuhi seluruh persyaratan kualifikasi akademik dan bebas sanksi kode etik.

Demikian surat rekomendasi ini diterbitkan untuk dipergunakan sebagaimana mestinya.

Semarang, ${item.tanggal}
Dekan Fakultas Ilmu Komputer
Universitas Dian Nuswantoro

(Dokumen Resmi Bertanda Tangan Elektronik / TTE Digital Terverifikasi)`;
}

function bukaPratinjauDrafDoc() {
  if (!activeModalSurekomId) return;
  const item = surekomListData.find((s) => s.id === activeModalSurekomId);
  if (!item) return;

  viewSurekomDoc('Draft Surat Rekomendasi MBKM (' + item.nim + ')', buildSuratRekomendasiText(item));
}

function showSurekomDetailById(id) {
  openValidasiSurekomModal(id);
}

function showSurekomDetail() {
  // Fallback backward compatibility
}

function hideSurekomDetail() {
  closeValidasiSurekomModal();
}

function viewSurekomDoc(title, content) {
  const modal = document.getElementById('modal-surekom-doc-viewer');
  const titleEl = document.getElementById('modal-doc-viewer-title');
  const contentEl = document.getElementById('modal-doc-viewer-content');
  if (!modal || !titleEl || !contentEl) return;

  titleEl.textContent = 'Pratinjau Dokumen: ' + title;
  contentEl.textContent = content;
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeSurekomDocModal() {
  const modal = document.getElementById('modal-surekom-doc-viewer');
  if (modal) modal.classList.add('hidden');
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).buildSuratRekomendasiText = buildSuratRekomendasiText;
  (window as any).bukaPratinjauDrafDoc = bukaPratinjauDrafDoc;
  (window as any).showSurekomDetailById = showSurekomDetailById;
  (window as any).showSurekomDetail = showSurekomDetail;
  (window as any).hideSurekomDetail = hideSurekomDetail;
  (window as any).viewSurekomDoc = viewSurekomDoc;
  (window as any).closeSurekomDocModal = closeSurekomDocModal;
}

export {
  buildSuratRekomendasiText,
  bukaPratinjauDrafDoc,
  showSurekomDetailById,
  showSurekomDetail,
  hideSurekomDetail,
  viewSurekomDoc,
  closeSurekomDocModal,
};
