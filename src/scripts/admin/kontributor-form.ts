// @ts-nocheck
// ==============================================================================
// FORM ONBOARDING KONTRIBUTOR (GABUNGAN KELOLA PROGRAM + KELOLA CMS)
// Satu halaman: /koordinator/kontributor/form-onboarding?id=N
// ==============================================================================

const FORM_STORAGE_KEY = 'mbkm:kontributor-form';
const FORM_LIST_URL = '/koordinator/kontributor';

function readStoredForms() {
  try {
    return JSON.parse(sessionStorage.getItem(FORM_STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function persistForm(id, payload) {
  const all = readStoredForms();
  all[id] = payload;
  try {
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(all));
  } catch (_) {
    // Storage tidak tersedia — data hanya berlaku selama halaman terbuka.
  }
}

// Gabungkan data CMS hasil form ke data mock agar terbaca di halaman Kelola CMS.
function hydrateStoredForms() {
  if (typeof kontributorCmsDataMap === 'undefined') return;
  const all = readStoredForms();
  Object.keys(all).forEach((id) => {
    if (!kontributorCmsDataMap[id]) kontributorCmsDataMap[id] = all[id].cms;
  });
}

const val = (id) => (document.getElementById(id)?.value ?? '').trim();
const setText = (id, text) => {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
};

function getFormKontributorId() {
  return Number(new URLSearchParams(window.location.search).get('id')) || 0;
}

function populateKontributorFormPage() {
  const kontributor = (typeof kontributorListData !== 'undefined' ? kontributorListData : []).find(
    (m) => m.id === getFormKontributorId()
  );
  if (!kontributor) return;

  setText('kf-partner-name', kontributor.nama);
  setText('kf-partner-avatar', kontributor.avatar || kontributor.nama.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase());
  setText('kf-partner-deskripsi', kontributor.deskripsi || '-');
  setText('kf-partner-pic', kontributor.picNama || '-');
  setText('kf-partner-tipe', kontributor.tipe === 'internal' ? 'Kontributor Internal' : 'Kontributor Eksternal');

  const deskripsi = document.getElementById('kf-deskripsi');
  if (deskripsi && !deskripsi.value) {
    deskripsi.value =
      kontributor.deskripsi ||
      `Kerja sama strategis MBKM antara FIK UDINUS dan ${kontributor.nama} dalam memberikan pengalaman kerja profesional.`;
  }
  const mou = document.getElementById('kf-mou');
  if (mou && !mou.value) mou.value = kontributor.mou || '';

  const saved = readStoredForms()[kontributor.id];
  if (saved) {
    Object.entries(saved.fields || {}).forEach(([id, v]) => {
      const el = document.getElementById(id);
      if (el) el.value = v;
    });
  }
  if (window.lucide) window.lucide.createIcons();
}

function handleSaveKontributorForm() {
  const id = getFormKontributorId();
  const kontributor = (typeof kontributorListData !== 'undefined' ? kontributorListData : []).find((m) => m.id === id);
  if (!kontributor) {
    alert('Kontributor tidak ditemukan. Kembali ke daftar kontributor.');
    return;
  }

  const required = [
    ['kf-kuota', 'Kuota Pendaftaran'],
    ['kf-buka', 'Jadwal Buka Pendaftaran'],
    ['kf-tutup', 'Jadwal Tutup Pendaftaran'],
    ['kf-badge', 'Badge Program'],
    ['kf-deadline', 'Batas Akhir Pendaftaran'],
    ['kf-deskripsi', 'Deskripsi Hero'],
  ];
  const missing = required.find(([fid]) => !val(fid));
  if (missing) {
    alert(`${missing[1]} wajib diisi.`);
    document.getElementById(missing[0])?.focus();
    return;
  }
  if (Number(val('kf-kuota')) < 1) {
    alert('Kuota pendaftaran minimal 1 peserta.');
    return;
  }
  if (val('kf-tutup') <= val('kf-buka')) {
    alert('Jadwal tutup harus setelah jadwal buka pendaftaran.');
    return;
  }

  const fieldIds = [
    'kf-kuota', 'kf-sks', 'kf-buka', 'kf-tutup', 'kf-badge', 'kf-deadline', 'kf-sektor', 'kf-lokasi',
    'kf-periode', 'kf-mou', 'kf-deskripsi', 'kf-poin-1', 'kf-poin-2', 'kf-poin-3', 'kf-koor-nama', 'kf-koor-jabatan',
  ];
  const fields = Object.fromEntries(fieldIds.map((fid) => [fid, val(fid)]));

  const cms = {
    kontributor: kontributor.nama,
    sektor: fields['kf-sektor'],
    lokasi: fields['kf-lokasi'],
    periode: fields['kf-periode'],
    mou: fields['kf-mou'],
    badge: fields['kf-badge'],
    deadline: fields['kf-deadline'],
    deskripsiHero: fields['kf-deskripsi'],
    poin1: fields['kf-poin-1'],
    poin2: fields['kf-poin-2'],
    poin3: fields['kf-poin-3'],
    koorNama: fields['kf-koor-nama'],
    koorJabatan: fields['kf-koor-jabatan'],
    koorFoto: '',
    showcases: [],
  };

  if (typeof kontributorCmsDataMap !== 'undefined') kontributorCmsDataMap[id] = cms;
  persistForm(id, { fields, cms });

  alert(`Data program & CMS "${kontributor.nama}" berhasil disimpan!`);
  window.location.href = FORM_LIST_URL;
}

hydrateStoredForms();

if (typeof window !== 'undefined') {
  (window as any).populateKontributorFormPage = populateKontributorFormPage;
  (window as any).handleSaveKontributorForm = handleSaveKontributorForm;

  const boot = () => {
    if (document.getElementById('section-kontributor-form')) populateKontributorFormPage();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}

export { populateKontributorFormPage, handleSaveKontributorForm };
