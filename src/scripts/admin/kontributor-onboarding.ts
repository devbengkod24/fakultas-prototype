// @ts-nocheck
// ==============================================================================
// ALUR ONBOARDING KONTRIBUTOR EKSTERNAL
// Tambah Mitra → Kelola Program → Kelola CMS (berurutan, ditandai ?setup=1)
// ==============================================================================

const STORAGE_KEY = 'mbkm:kontributor-baru';
const PROGRAM_URL = '/koordinator/kontributor/program';
const CMS_URL = '/koordinator/kontributor/kelola-program';
const LIST_URL = '/koordinator/kontributor';

function readStoredKontributor() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch (_) {
    return [];
  }
}

/**
 * Simpan mitra baru ke sessionStorage agar tetap dikenali setelah pindah halaman
 * (data mock dimuat ulang setiap navigasi).
 */
function persistNewKontributor(item) {
  const stored = readStoredKontributor().filter((m) => m.id !== item.id);
  stored.push(item);
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch (_) {
    // Storage tidak tersedia (mode privat) — alur tetap jalan, data hanya hilang saat reload.
  }
}

// Gabungkan mitra baru dari sesi ke data mock global sebelum halaman diinisialisasi.
function hydrateStoredKontributor() {
  if (typeof kontributorListData === 'undefined') return;
  readStoredKontributor().forEach((item) => {
    if (!kontributorListData.some((m) => m.id === item.id)) {
      kontributorListData.unshift(item);
    }
  });
}

function isKontributorSetupMode() {
  return new URLSearchParams(window.location.search).get('setup') === '1';
}

// Langkah 1 → 2: setelah mitra dibuat, langsung isi Kelola Program.
function startKontributorSetup(kontributorId) {
  window.location.href = `${PROGRAM_URL}?id=${kontributorId}&setup=1`;
}

// Langkah 2 → 3: setelah Kelola Program disimpan, lanjut isi Kelola CMS.
function continueKontributorSetupToCms(kontributorId) {
  if (!isKontributorSetupMode()) return;
  window.location.href = `${CMS_URL}?id=${kontributorId}&setup=1`;
}

// Langkah 3 selesai: setelah Kelola CMS disimpan, kembali ke daftar kontributor.
function finishKontributorSetup() {
  if (!isKontributorSetupMode()) return;
  window.location.href = LIST_URL;
}

hydrateStoredKontributor();

if (typeof window !== 'undefined') {
  (window as any).persistNewKontributor = persistNewKontributor;
  (window as any).isKontributorSetupMode = isKontributorSetupMode;
  (window as any).startKontributorSetup = startKontributorSetup;
  (window as any).continueKontributorSetupToCms = continueKontributorSetupToCms;
  (window as any).finishKontributorSetup = finishKontributorSetup;
}

export {
  persistNewKontributor,
  isKontributorSetupMode,
  startKontributorSetup,
  continueKontributorSetupToCms,
  finishKontributorSetup,
};
