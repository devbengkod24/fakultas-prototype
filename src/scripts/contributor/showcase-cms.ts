// src/scripts/contributor/showcase-cms.ts
// CRUD Showcase pada Kelola CMS Kontributor. Tampilan kartu & modal disamakan dengan
// Kelola CMS koordinator (kontributor-cms.ts), ditambah foto proyek.

interface ShowcaseItem {
  batch: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  tech: string[];
  foto: string;
}

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
const val = (id: string) => ($<HTMLInputElement>(id)?.value ?? '').trim();

let items: ShowcaseItem[] = [
  {
    batch: 'Batch 5 (Gasal 2025/2026)',
    judul: 'Smart Campus IoT Energy & Air Quality Monitoring',
    kategori: 'IoT & AI',
    deskripsi: 'Sistem pemantauan konsumsi energi dan kualitas udara kampus berbasis sensor IoT dengan prediksi TensorFlow.',
    tech: ['IoT Sensor', 'TensorFlow', 'React'],
    foto: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    batch: 'Batch 6 (Genap 2025/2026)',
    judul: 'Platform E-Commerce Inklusif UMKM Ramah Disabilitas',
    kategori: 'Web Platform',
    deskripsi: 'Platform e-commerce UMKM dengan antarmuka yang dapat diakses penyandang disabilitas.',
    tech: ['Next.js', 'Tailwind', 'Go REST API'],
    foto: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80',
  },
];

const refreshIcons = () => (window as any).lucide?.createIcons();

function setFoto(src: string) {
  $('modal-showcase-foto')?.closest('[data-dropzone]')
    ?.dispatchEvent(new CustomEvent('dropzone:set', { detail: { src } }));
}

function render() {
  const grid = $('cms-showcase-grid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full rounded-xl border border-dashed border-[#e4e4e7] p-8 text-center bg-white flex flex-col items-center justify-center">
        <h4 class="text-sm font-semibold text-[#09090b]">Belum Ada Proyek Showcase</h4>
        <p class="text-xs text-[#71717a] mt-1 max-w-sm">Tambahkan hasil karya atau prototipe capstone mahasiswa binaan selama berkegiatan di kontributor ini.</p>
      </div>`;
    return;
  }

  grid.innerHTML = items.map((item, idx) => {
    const badges = item.tech.map((t) =>
      `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7]">${t}</span>`).join('');
    const foto = item.foto
      ? `<img src="${item.foto}" alt="${item.judul}" class="mb-3 h-36 w-full rounded-lg border border-[#e4e4e7] object-cover" />`
      : '';
    return `
      <div class="rounded-xl border border-[#e4e4e7] bg-white p-5 flex flex-col justify-between hover:border-[#d4d4d8] transition-colors shadow-none">
        <div class="space-y-2">
          ${foto}
          <div class="flex items-start justify-between gap-2">
            <div class="space-y-1">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-blue-200 bg-blue-50 text-[11px] font-semibold text-[#0655a7]">${item.kategori}</span>
              <div class="text-[11px] text-[#71717a]">${item.batch}</div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="openShowcaseModal(${idx})" class="inline-flex items-center justify-center h-7 w-7 rounded-md text-[#71717a] hover:text-[#0655a7] hover:bg-[#f4f4f5] transition-colors" title="Edit Proyek">
                <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
              </button>
              <button type="button" onclick="handleDeleteShowcase(${idx})" class="inline-flex items-center justify-center h-7 w-7 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus Proyek">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <h4 class="text-sm font-semibold text-[#09090b] leading-snug pt-1">${item.judul}</h4>
          <p class="text-xs text-[#71717a] leading-relaxed line-clamp-3">${item.deskripsi}</p>
        </div>
        <div class="pt-4 mt-3 border-t border-[#f4f4f5] flex flex-wrap gap-1.5">${badges}</div>
      </div>`;
  }).join('');
  refreshIcons();
}

function openShowcaseModal(editIdx?: number) {
  const modal = $('modal-showcase-proyek');
  if (!modal) return;
  const item = editIdx !== undefined ? items[editIdx] : undefined;
  const set = (id: string, v: string) => { const el = $<HTMLInputElement>(id); if (el) el.value = v; };

  $('modal-showcase-title')!.textContent = item ? 'Edit Proyek Showcase' : 'Tambah Proyek Showcase';
  set('modal-showcase-idx', item ? String(editIdx) : '');
  set('modal-showcase-batch', item?.batch ?? 'Capstone Project Batch 6');
  set('modal-showcase-judul', item?.judul ?? '');
  set('modal-showcase-kategori', item?.kategori ?? '');
  set('modal-showcase-deskripsi', item?.deskripsi ?? '');
  set('modal-showcase-tech', item ? item.tech.join(', ') : 'Python, TensorFlow, React.js');
  setFoto(item?.foto ?? '');

  modal.classList.remove('hidden');
  refreshIcons();
}

function closeShowcaseModal() {
  $('modal-showcase-proyek')?.classList.add('hidden');
}

function handleSaveShowcase(e: Event) {
  e.preventDefault();
  const idx = val('modal-showcase-idx');
  const item: ShowcaseItem = {
    batch: val('modal-showcase-batch'),
    judul: val('modal-showcase-judul'),
    kategori: val('modal-showcase-kategori'),
    deskripsi: val('modal-showcase-deskripsi'),
    tech: val('modal-showcase-tech').split(',').map((s) => s.trim()).filter(Boolean),
    foto: val('modal-showcase-foto'),
  };

  if (idx !== '' && items[Number(idx)]) {
    items[Number(idx)] = item;
    alert('Proyek showcase berhasil diperbarui!');
  } else {
    items.unshift(item);
    alert('Proyek showcase baru berhasil ditambahkan!');
  }
  closeShowcaseModal();
  render();
}

function handleDeleteShowcase(idx: number) {
  if (!items[idx]) return;
  if (confirm(`Hapus proyek showcase "${items[idx].judul}"?`)) {
    items.splice(idx, 1);
    render();
  }
}

export function initShowcaseCms() {
  Object.assign(window, { openShowcaseModal, closeShowcaseModal, handleSaveShowcase, handleDeleteShowcase });
  render();
}
