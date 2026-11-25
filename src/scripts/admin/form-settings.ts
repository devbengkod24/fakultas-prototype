// @ts-nocheck
// ==============================================================================
// PENGATURAN FORM PENDAFTARAN & CUSTOM FIELDS
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================



function switchFormTab(tabId) {
  if (tabId === 'akademik') tabId = 'identitas';
  if (tabId === 'berkas') tabId = 'dokumen';
  if (tabId === 'konversi' || tabId === 'surekom') tabId = 'persetujuan';

  formPendaftaranConfig.activeTab = tabId;
  const tabs = ['identitas', 'dokumen', 'persetujuan', 'akademik', 'berkas', 'konversi', 'surekom'];

  tabs.forEach((t) => {
    const btn = document.getElementById('btn-form-tab-' + t);
    const content = document.getElementById('form-tab-content-' + t);

    if (t === tabId) {
      if (btn) {
        btn.className =
          'form-tab-btn inline-flex items-center px-5 py-3 text-sm font-semibold border-b-2 border-primary-600 text-primary-700 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'true');
      }
      if (content) content.classList.remove('hidden');
    } else {
      if (btn) {
        btn.className =
          'form-tab-btn inline-flex items-center px-5 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-900 transition-colors shrink-0 cursor-pointer';
        btn.setAttribute('aria-selected', 'false');
      }
      if (content) content.classList.add('hidden');
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderFormPendaftaranUI() {
  // Render Ambang Batas Akademik
  const ipkEl = document.getElementById('cfg-ipk-min');
  if (ipkEl) ipkEl.value = formPendaftaranConfig.ipkMin.toFixed(2);

  const sksEl = document.getElementById('cfg-sks-min');
  if (sksEl) sksEl.value = formPendaftaranConfig.sksMin;

  const semEl = document.getElementById('cfg-semester-min');
  if (semEl) semEl.value = formPendaftaranConfig.semesterMin;

  // Render Toggles
  updateFormToggleVisual('bebasSanksi', formPendaftaranConfig.bebasSanksi);
  updateFormToggleVisual('terdaftarAktif', formPendaftaranConfig.terdaftarAktif);
  updateFormToggleVisual('singleApp', formPendaftaranConfig.singleApp);
  updateFormToggleVisual('wajibDrafMk', formPendaftaranConfig.wajibDrafMk);
  updateFormToggleVisual('paktaIntegritas', formPendaftaranConfig.paktaIntegritas);
  updateFormToggleVisual('ttdDigital', formPendaftaranConfig.ttdDigital);

  // Render Dokumen Mandatori
  ['cv', 'portofolio', 'transkrip', 'izin'].forEach((k) => {
    const d = formPendaftaranConfig.docs[k];
    if (!d) return;
    const toggleBtn = document.getElementById('toggle-doc-' + k);
    if (toggleBtn) {
      toggleBtn.className =
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
        (d.active ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
      const span = toggleBtn.querySelector('span');
      if (span) {
        span.className =
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
          (d.active ? 'translate-x-5' : 'translate-x-0');
      }
    }

    const badge = document.getElementById('badge-req-' + k);
    const btnReq = document.getElementById('btn-toggle-req-' + k);
    if (badge && btnReq) {
      if (d.required) {
        badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200';
        badge.textContent = k === 'portofolio' ? 'Wajib Diisi' : 'Wajib Diunggah';
        btnReq.textContent = 'Ubah ke Opsional';
      } else {
        badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200';
        badge.textContent = 'Opsional';
        btnReq.textContent = 'Ubah ke Wajib';
      }
    }
  });

  // Render Konversi SKS
  const maxSksEl = document.getElementById('cfg-konversi-sks-max');
  if (maxSksEl) maxSksEl.value = formPendaftaranConfig.konversiSksMax;

  const durasiEl = document.getElementById('cfg-durasi-minimal');
  if (durasiEl) durasiEl.value = formPendaftaranConfig.durasiMinimal;

  // Render SuReKom
  const surekomTpl = document.getElementById('cfg-surekom-template');
  if (surekomTpl) surekomTpl.value = formPendaftaranConfig.surekomTemplate;

  const surekomCutoff = document.getElementById('cfg-surekom-cutoff');
  if (surekomCutoff) surekomCutoff.value = formPendaftaranConfig.surekomCutoff;

  // Render Custom Fields List
  renderCustomFieldsContainer();

  if (window.lucide) window.lucide.createIcons();
}

function updateFormToggleVisual(key, state) {
  const btn = document.getElementById('toggle-cfg-' + key);
  if (!btn) return;
  btn.className =
    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
    (state ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
  const thumb = btn.querySelector('span');
  if (thumb) {
    thumb.className =
      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
      (state ? 'translate-x-5' : 'translate-x-0');
  }
}

function toggleFormSetting(key) {
  formPendaftaranConfig[key] = !formPendaftaranConfig[key];
  updateFormToggleVisual(key, formPendaftaranConfig[key]);
  triggerAutosave(key, formPendaftaranConfig[key]);
}

function toggleDocActive(k) {
  if (!formPendaftaranConfig.docs[k]) return;
  formPendaftaranConfig.docs[k].active = !formPendaftaranConfig.docs[k].active;
  const btn = document.getElementById('toggle-doc-' + k);
  if (btn) {
    const isActive = formPendaftaranConfig.docs[k].active;
    btn.className =
      'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ' +
      (isActive ? 'bg-[#0655a7]' : 'bg-[#e4e4e7]');
    const span = btn.querySelector('span');
    if (span) {
      span.className =
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ' +
        (isActive ? 'translate-x-5' : 'translate-x-0');
    }
  }
  triggerAutosave('doc_' + k, formPendaftaranConfig.docs[k].active);
}

function toggleDocRequired(k) {
  if (!formPendaftaranConfig.docs[k]) return;
  formPendaftaranConfig.docs[k].required = !formPendaftaranConfig.docs[k].required;
  const isReq = formPendaftaranConfig.docs[k].required;

  const badge = document.getElementById('badge-req-' + k);
  const btnReq = document.getElementById('btn-toggle-req-' + k);
  if (badge && btnReq) {
    if (isReq) {
      badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-emerald-50 text-emerald-700 border border-emerald-200';
      badge.textContent = k === 'portofolio' ? 'Wajib Diisi' : 'Wajib Diunggah';
      btnReq.textContent = 'Ubah ke Opsional';
    } else {
      badge.className = 'px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-600 border border-slate-200';
      badge.textContent = 'Opsional';
      btnReq.textContent = 'Ubah ke Wajib';
    }
  }
  triggerAutosave('doc_req_' + k, isReq);
}

function triggerAutosave(key, val) {
  if (key && val !== undefined) {
    if (key === 'ipkMin') formPendaftaranConfig.ipkMin = parseFloat(val) || 3.0;
    else if (key === 'sksMin') formPendaftaranConfig.sksMin = parseInt(val, 10) || 80;
    else if (key === 'semesterMin') formPendaftaranConfig.semesterMin = parseInt(val, 10) || 5;
    else if (key === 'konversiSksMax') formPendaftaranConfig.konversiSksMax = parseInt(val, 10) || 20;
    else if (key === 'durasiMinimal') formPendaftaranConfig.durasiMinimal = parseInt(val, 10) || 5;
    else if (key === 'surekomTemplate') formPendaftaranConfig.surekomTemplate = val;
    else if (key === 'surekomCutoff') formPendaftaranConfig.surekomCutoff = val;
  }
}

function renderCustomFieldsContainer() {
  const container = document.getElementById('custom-fields-container');
  if (!container) return;

  if (formPendaftaranConfig.customFields.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center rounded-lg border border-dashed border-[#e4e4e7] bg-[#fafafa]">
        <i data-lucide="help-circle" class="w-8 h-8 mx-auto text-[#71717a] mb-2 opacity-50"></i>
        <p class="text-xs font-medium text-[#09090b]">Belum ada pertanyaan atau field kustom</p>
        <p class="text-[11px] text-[#71717a] mt-0.5">Klik tombol di kanan atas untuk menambahkan pertanyaan kustom bagi calon peserta MBKM.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const typeLabels = {
    text: { label: 'Teks Singkat', icon: 'type', bg: 'bg-blue-50 text-[#0655a7]' },
    textarea: { label: 'Esai / Paragraf', icon: 'align-left', bg: 'bg-indigo-50 text-indigo-700' },
    url: { label: 'Tautan Web / URL', icon: 'link', bg: 'bg-purple-50 text-purple-700' },
    file: { label: 'Unggah Berkas PDF', icon: 'file-up', bg: 'bg-amber-50 text-amber-700' },
    select: { label: 'Pilihan Dropdown', icon: 'list', bg: 'bg-emerald-50 text-emerald-700' },
  };

  container.innerHTML = formPendaftaranConfig.customFields
    .map((cf) => {
      const tInfo = typeLabels[cf.type] || { label: cf.type, icon: 'help-circle', bg: 'bg-gray-100 text-gray-700' };
      return `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-[#e4e4e7] bg-[#fafafa] hover:border-[#0655a7]/40 transition-colors gap-3">
          <div class="flex items-start gap-3">
            <div class="w-7 h-7 rounded-md ${tInfo.bg} flex items-center justify-center shrink-0 border border-black/5">
              <i data-lucide="${tInfo.icon}" class="w-3.5 h-3.5"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#09090b]">${cf.label}</span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${cf.required ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                  ${cf.required ? 'Wajib' : 'Opsional'}
                </span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${tInfo.bg}">
                  ${tInfo.label}
                </span>
              </div>
              <p class="text-[11px] text-[#71717a] mt-0.5">${cf.placeholder || 'Tanpa petunjuk isian'}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onclick="hapusCustomField('${cf.id}')"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent transition-colors"
            >
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Hapus</span>
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  if (window.lucide) window.lucide.createIcons();
}

function showTambahCustomFieldModal() {
  const form = document.getElementById('form-tambah-custom-field');
  if (form) form.reset();
  const modal = document.getElementById('modal-tambah-custom-field');
  if (modal) modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closeTambahCustomFieldModal() {
  const modal = document.getElementById('modal-tambah-custom-field');
  if (modal) modal.classList.add('hidden');
}

function handleSimpanCustomField(e) {
  e.preventDefault();
  const label = document.getElementById('input-cf-label').value.trim();
  const type = document.getElementById('select-cf-type').value;
  const placeholder = document.getElementById('input-cf-placeholder').value.trim();
  const required = document.getElementById('checkbox-cf-required').checked;

  if (!label) {
    alert('Label pertanyaan wajib diisi');
    return;
  }

  const newId = 'cf-' + Date.now();
  formPendaftaranConfig.customFields.push({
    id: newId,
    label,
    type,
    placeholder,
    required,
  });

  closeTambahCustomFieldModal();
  renderCustomFieldsContainer();
  triggerAutosave('customFields', formPendaftaranConfig.customFields);
}

function hapusCustomField(id) {
  formPendaftaranConfig.customFields = formPendaftaranConfig.customFields.filter((cf) => cf.id !== id);
  renderCustomFieldsContainer();
  triggerAutosave('customFields', formPendaftaranConfig.customFields);
}

function insertSurekomTag(tag) {
  const el = document.getElementById('cfg-surekom-template');
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = el.value;
  el.value = text.substring(0, start) + tag + text.substring(end);
  el.focus();
  el.selectionStart = el.selectionEnd = start + tag.length;
  triggerAutosave('surekomTemplate', el.value);
}

function resetSurekomTemplate() {
  const defaultTpl =
    'Dengan ini Koordinator MBKM Fakultas Ilmu Komputer Universitas Dian Nuswantoro menerangkan bahwa mahasiswa yang bersangkutan:\n\nNama: {nama_mahasiswa}\nNIM: {nim}\nProgram Studi: {program_studi}\nIPK: {ipk} ({sks_lulus} SKS)\n\nTelah memenuhi seluruh persyaratan akademik dan dinyatakan LAYAK serta DIREKOMENDASIKAN untuk mengikuti seleksi program MBKM pada instansi {nama_kontributor} untuk periode {semester_ajaran}.';
  const el = document.getElementById('cfg-surekom-template');
  if (el) el.value = defaultTpl;
  triggerAutosave('surekomTemplate', defaultTpl);
}

function openPreviewMahasiswaModal() {
  const modal = document.getElementById('modal-preview-pendaftaran-mhs');
  if (!modal) return;

  // Step 1: Syarat Akademik
  const pIpk = document.getElementById('prev-val-ipk');
  if (pIpk) pIpk.textContent = formPendaftaranConfig.ipkMin.toFixed(2);
  const pSks = document.getElementById('prev-val-sks');
  if (pSks) pSks.textContent = formPendaftaranConfig.sksMin;
  const pSem = document.getElementById('prev-val-sem');
  if (pSem) pSem.textContent = formPendaftaranConfig.semesterMin;

  // Step 2: Dokumen Mandatori
  const docsContainer = document.getElementById('preview-docs-container');
  if (docsContainer) {
    const docKeys = Object.keys(formPendaftaranConfig.docs);
    docsContainer.innerHTML = docKeys
      .filter((k) => formPendaftaranConfig.docs[k].active)
      .map((k) => {
        const d = formPendaftaranConfig.docs[k];
        return `
          <div class="p-3.5 rounded-lg border border-[#e4e4e7] bg-[#fafafa] space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#09090b]">${d.label}</span>
                <span class="px-2 py-0.5 text-[10px] font-medium rounded ${d.required ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600'}">
                  ${d.required ? 'Wajib Diisi' : 'Opsional'}
                </span>
              </div>
              <span class="text-[11px] text-[#71717a]">${d.format}</span>
            </div>
            <div class="flex items-center gap-2">
              <input type="text" placeholder="${k === 'portofolio' ? 'Tempel tautan Google Drive / Portofolio di sini...' : 'Pilih berkas PDF untuk diunggah...'}" class="h-8 flex-1 rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none" />
              <button type="button" class="h-8 px-3 rounded border border-[#e4e4e7] bg-white hover:bg-black/5 text-xs text-[#09090b]">Pilih File</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // Step 2: Custom Fields
  const cfContainer = document.getElementById('preview-custom-fields-container');
  if (cfContainer) {
    if (formPendaftaranConfig.customFields.length === 0) {
      cfContainer.innerHTML = `
        <p class="text-xs text-[#71717a] italic">Tidak ada pertanyaan tambahan dari Koordinator.</p>
      `;
    } else {
      cfContainer.innerHTML = formPendaftaranConfig.customFields
        .map((cf) => {
          let inputHtml = '';
          if (cf.type === 'textarea') {
            inputHtml = `<textarea rows="2" placeholder="${cf.placeholder || ''}" class="w-full rounded border border-[#e4e4e7] bg-white p-2 text-xs focus:outline-none"></textarea>`;
          } else if (cf.type === 'select') {
            inputHtml = `
              <select class="h-8 w-full rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none">
                <option value="">Pilih opsi...</option>
                <option value="1">Pilihan 1 (Kategori Standar)</option>
                <option value="2">Pilihan 2 (Kategori Khusus)</option>
              </select>
            `;
          } else {
            inputHtml = `<input type="${cf.type === 'url' ? 'url' : 'text'}" placeholder="${cf.placeholder || ''}" class="h-8 w-full rounded border border-[#e4e4e7] bg-white px-2.5 text-xs focus:outline-none" />`;
          }

          return `
            <div class="space-y-1.5 p-3 rounded-lg border border-[#e4e4e7] bg-[#fafafa]">
              <div class="flex items-center justify-between">
                <label class="text-xs font-medium text-[#09090b]">${cf.label}</label>
                <span class="text-[10px] font-medium text-[#71717a]">${cf.required ? 'Wajib *' : 'Opsional'}</span>
              </div>
              ${inputHtml}
            </div>
          `;
        })
        .join('');
    }
  }

  // Step 3: SuReKom Text Simulation
  const surekomEl = document.getElementById('preview-surekom-text');
  if (surekomEl) {
    let text = formPendaftaranConfig.surekomTemplate || '';
    text = text
      .replace(/{nama_mahasiswa}/g, 'Ahmad Rizky Pratama')
      .replace(/{nim}/g, 'A11.2022.14253')
      .replace(/{program_studi}/g, 'S1 Teknik Informatika')
      .replace(/{ipk}/g, '3.68')
      .replace(/{sks_lulus}/g, '112')
      .replace(/{nama_kontributor}/g, 'PT. Presentologics (Dicoding Indonesia)')
      .replace(/{semester_ajaran}/g, 'Semester Gasal 2026/2027');
    surekomEl.textContent = text;
  }

  switchPreviewStep(1);
  modal.classList.remove('hidden');
  if (window.lucide) window.lucide.createIcons();
}

function closePreviewMahasiswaModal() {
  const modal = document.getElementById('modal-preview-pendaftaran-mhs');
  if (modal) modal.classList.add('hidden');
}

function switchPreviewStep(step) {
  [1, 2, 3].forEach((s) => {
    const btn = document.getElementById('btn-preview-step-1');
    const btn2 = document.getElementById('btn-preview-step-2');
    const btn3 = document.getElementById('btn-preview-step-3');
    const content = document.getElementById('preview-step-content-' + s);

    if (s === step) {
      if (content) content.classList.remove('hidden');
    } else {
      if (content) content.classList.add('hidden');
    }
  });

  const b1 = document.getElementById('btn-preview-step-1');
  const b2 = document.getElementById('btn-preview-step-2');
  const b3 = document.getElementById('btn-preview-step-3');
  if (b1) b1.className = step === 1 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';
  if (b2) b2.className = step === 2 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';
  if (b3) b3.className = step === 3 ? 'px-3 py-1.5 rounded-md font-medium bg-[#0655a7] text-white transition-colors' : 'px-3 py-1.5 rounded-md font-medium text-[#71717a] hover:bg-black/5 transition-colors';

  if (window.lucide) window.lucide.createIcons();
}

// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).switchFormTab = switchFormTab;
  (window as any).renderFormPendaftaranUI = renderFormPendaftaranUI;
  (window as any).updateFormToggleVisual = updateFormToggleVisual;
  (window as any).toggleFormSetting = toggleFormSetting;
  (window as any).toggleDocActive = toggleDocActive;
  (window as any).toggleDocRequired = toggleDocRequired;
  (window as any).triggerAutosave = triggerAutosave;
  (window as any).renderCustomFieldsContainer = renderCustomFieldsContainer;
  (window as any).showTambahCustomFieldModal = showTambahCustomFieldModal;
  (window as any).closeTambahCustomFieldModal = closeTambahCustomFieldModal;
  (window as any).handleSimpanCustomField = handleSimpanCustomField;
  (window as any).hapusCustomField = hapusCustomField;
  (window as any).insertSurekomTag = insertSurekomTag;
  (window as any).resetSurekomTemplate = resetSurekomTemplate;
  (window as any).openPreviewMahasiswaModal = openPreviewMahasiswaModal;
  (window as any).closePreviewMahasiswaModal = closePreviewMahasiswaModal;
  (window as any).switchPreviewStep = switchPreviewStep;
}

export {
  switchFormTab,
  renderFormPendaftaranUI,
  updateFormToggleVisual,
  toggleFormSetting,
  toggleDocActive,
  toggleDocRequired,
  triggerAutosave,
  renderCustomFieldsContainer,
  showTambahCustomFieldModal,
  closeTambahCustomFieldModal,
  handleSimpanCustomField,
  hapusCustomField,
  insertSurekomTag,
  resetSurekomTemplate,
  openPreviewMahasiswaModal,
  closePreviewMahasiswaModal,
  switchPreviewStep,
};
