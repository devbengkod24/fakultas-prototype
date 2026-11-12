// @ts-nocheck
// ==============================================================================
// WORKFLOW PRESETS & DYNAMIC STAGES BUILDER
// Fakultas Ilmu Komputer UDINUS — MBKM v2 Master Admin
// ==============================================================================

// State aktif workflow builder
let currentWorkflow = (typeof PRESETS !== "undefined" && PRESETS.internal) ? JSON.parse(JSON.stringify(PRESETS.internal)) : [];
let activePresetType = 'internal';

function updatePresetButtonsUI(activeType) {
  activePresetType = activeType;
  const btnEks = document.getElementById('btn-preset-eksternal');
  const btnInt = document.getElementById('btn-preset-internal');

  const activeEks =
    'px-2.5 py-1 rounded-lg border-2 border-amber-500 bg-amber-50 font-bold text-amber-900 shadow-sm text-[11px] flex items-center gap-1 transition-all';
  const inactiveEks =
    'px-2.5 py-1 rounded-lg border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[11px] font-medium text-[#3f3f46] flex items-center gap-1 transition-all';

  const activeInt =
    'px-2.5 py-1 rounded-lg border-2 border-[#0655a7] bg-blue-50 font-bold text-[#0655a7] shadow-sm text-[11px] flex items-center gap-1 transition-all';
  const inactiveInt =
    'px-2.5 py-1 rounded-lg border border-[#e4e4e7] bg-white hover:bg-gray-50 text-[11px] font-medium text-[#3f3f46] flex items-center gap-1 transition-all';

  if (btnEks) {
    btnEks.className = activeType === 'eksternal' ? activeEks : inactiveEks;
  }
  if (btnInt) {
    btnInt.className = activeType === 'internal' ? activeInt : inactiveInt;
  }
}

function loadWorkflowPreset(type) {
  if (PRESETS[type]) {
    currentWorkflow = JSON.parse(JSON.stringify(PRESETS[type]));
    updatePresetButtonsUI(type);
    renderWorkflowStages();
  }
}

function handleKategoriChange(val) {
  const item = kategoriData.find((k) => k.id === val);
  const presetType = item ? item.type : val.startsWith('eksternal') ? 'eksternal' : 'internal';
  loadWorkflowPreset(presetType);

  const sksInput = document.getElementById('edit-sks-konversi');
  if (sksInput) {
    if (item && item.sks) {
      sksInput.value = item.sks;
    } else if (presetType === 'eksternal') {
      sksInput.value = val === 'eksternal_studi' ? '15' : '20';
    } else {
      if (val === 'internal_bengkel') sksInput.value = '20';
      else if (val === 'internal_ugm') sksInput.value = '24';
      else if (val === 'internal_lab') sksInput.value = '15';
      else sksInput.value = '12';
    }
  }
}

function renderWorkflowStages() {
  const container = document.getElementById('workflow-stages-container');
  if (!container) return;

  container.innerHTML = currentWorkflow
    .map(
      (stage, sIdx) => `
  <div class="p-3.5 rounded-xl border border-[#e4e4e7] bg-[#fafafa] flex flex-col gap-3 transition-all hover:border-[#0655a7]/40">
    <!-- Header Tahapan -->
    <div class="flex items-center justify-between pb-2 border-b border-[#e4e4e7]">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-md bg-[#0655a7] text-white text-xs font-bold flex items-center justify-center shrink-0">
          ${sIdx + 1}
        </span>
        <input type="text" value="${stage.name}" onchange="updateStageName(${sIdx}, this.value)" class="font-semibold text-xs text-[#09090b] bg-transparent border-b border-transparent hover:border-[#e4e4e7] focus:border-[#0655a7] focus:outline-none px-1 py-0.5 w-72 sm:w-96" />
      </div>
      <div class="flex items-center gap-1.5">
        <button type="button" onclick="addFileField(${sIdx})" class="px-2.5 py-1 rounded bg-white border border-[#e4e4e7] hover:border-[#0655a7] text-[11px] font-medium text-[#0655a7] flex items-center gap-1 transition-colors shadow-none">
          <i data-lucide="file-plus" class="w-3 h-3"></i>
          <span>+ Syarat Dokumen</span>
        </button>
        <button type="button" onclick="removeStageCard(${sIdx})" class="flex items-center justify-center w-6 h-6 transition-colors rounded text-rose-500 hover:bg-rose-50" title="Hapus Tahapan">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>

    <!-- Keterangan Aturan Tahap -->
    <div class="text-[11px] text-[#71717a] flex items-center gap-1.5 italic">
      <i data-lucide="info" class="w-3.5 h-3.5 text-blue-500 shrink-0"></i>
      <span>Rule: ${stage.rule}</span>
    </div>

    <!-- Daftar Dokumen yang Wajib Diunggah -->
    <div class="flex flex-col gap-1.5 pl-2 border-l-2 border-blue-200">
      <span class="text-[11px] font-semibold text-[#3f3f46]">Dokumen yang Harus Diunggah Mahasiswa:</span>
      ${stage.files.length === 0 ? '<p class="text-[11px] text-[#a1a1aa] italic">Tidak ada syarat berkas khusus pada tahapan ini.</p>' : ''}
      ${stage.files
        .map(
          (file, fIdx) => `
        <div class="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white border border-[#e4e4e7] text-xs">
          <div class="flex items-center gap-2 flex-1 min-w-[200px]">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-[#0655a7] shrink-0"></i>
            <input type="text" value="${file.label}" onchange="updateFileLabel(${sIdx}, ${fIdx}, this.value)" class="flex-1 bg-transparent border-b border-transparent hover:border-[#e4e4e7] focus:border-[#0655a7] focus:outline-none px-1 py-0.5 text-xs text-[#09090b] font-medium" />
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-[#71717a]">${file.format}</span>
            <label class="inline-flex items-center gap-1 text-[11px] font-medium text-[#3f3f46] cursor-pointer">
              <input type="checkbox" ${file.required ? 'checked' : ''} onchange="toggleFileRequired(${sIdx}, ${fIdx}, this.checked)" class="rounded text-[#0655a7] focus:ring-0" />
              <span>Wajib</span>
            </label>
            <button type="button" onclick="removeFileField(${sIdx}, ${fIdx})" class="p-1 text-gray-400 hover:text-rose-500" title="Hapus Berkas">
              <i data-lucide="x" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  </div>
`
    )
    .join('');

  lucide.createIcons();
}

function addStageCard() {
  const newStageNum = currentWorkflow.length + 1;
  currentWorkflow.push({
    id: 'stage_' + Date.now(),
    name: `Tahap ${newStageNum}: Tahapan Seleksi Baru`,
    type: 'custom',
    rule: 'Tahapan kustom yang diatur oleh Koordinator MBKM',
    files: [
      { id: 'f_' + Date.now(), label: 'Dokumen Persyaratan Khusus', format: 'PDF (Maks 2MB)', required: true },
    ],
  });
  renderWorkflowStages();
}

function removeStageCard(sIdx) {
  if (currentWorkflow.length <= 1) {
    alert('Minimal harus ada 1 tahapan dalam program!');
    return;
  }
  currentWorkflow.splice(sIdx, 1);
  renderWorkflowStages();
}

function updateStageName(sIdx, val) {
  if (currentWorkflow[sIdx]) currentWorkflow[sIdx].name = val;
}

function addFileField(sIdx) {
  const name = prompt('Masukkan nama dokumen persyaratan:', 'Surat Keterangan Tambahan');
  if (name) {
    currentWorkflow[sIdx].files.push({
      id: 'f_' + Date.now(),
      label: name,
      format: 'PDF (Maks 2MB)',
      required: true,
    });
    renderWorkflowStages();
  }
}

function removeFileField(sIdx, fIdx) {
  currentWorkflow[sIdx].files.splice(fIdx, 1);
  renderWorkflowStages();
}

function updateFileLabel(sIdx, fIdx, val) {
  if (currentWorkflow[sIdx] && currentWorkflow[sIdx].files[fIdx]) {
    currentWorkflow[sIdx].files[fIdx].label = val;
  }
}

function toggleFileRequired(sIdx, fIdx, checked) {
  if (currentWorkflow[sIdx] && currentWorkflow[sIdx].files[fIdx]) {
    currentWorkflow[sIdx].files[fIdx].required = checked;
  }
}

function saveAsTemplate() {
  alert('Konfigurasi tahapan & berkas berhasil disimpan sebagai Template MBKM Baru!');
}


// ------------------------------------------------------------------------------
// Window Global Bridge (Backward Compatibility & Inline Event Handlers)
// ------------------------------------------------------------------------------
if (typeof window !== "undefined") {
  (window as any).updatePresetButtonsUI = updatePresetButtonsUI;
  (window as any).loadWorkflowPreset = loadWorkflowPreset;
  (window as any).handleKategoriChange = handleKategoriChange;
  (window as any).renderWorkflowStages = renderWorkflowStages;
  (window as any).addStageCard = addStageCard;
  (window as any).removeStageCard = removeStageCard;
  (window as any).updateStageName = updateStageName;
  (window as any).addFileField = addFileField;
  (window as any).removeFileField = removeFileField;
  (window as any).updateFileLabel = updateFileLabel;
  (window as any).toggleFileRequired = toggleFileRequired;
  (window as any).saveAsTemplate = saveAsTemplate;
  try {
    Object.defineProperty(window, "currentWorkflow", {
      get: () => currentWorkflow,
      set: (val) => { currentWorkflow = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).currentWorkflow = currentWorkflow;
  }
  try {
    Object.defineProperty(window, "activePresetType", {
      get: () => activePresetType,
      set: (val) => { activePresetType = val; },
      configurable: true
    });
  } catch (_) {
    (window as any).activePresetType = activePresetType;
  }
}

export {
  updatePresetButtonsUI,
  loadWorkflowPreset,
  handleKategoriChange,
  renderWorkflowStages,
  addStageCard,
  removeStageCard,
  updateStageName,
  addFileField,
  removeFileField,
  updateFileLabel,
  toggleFileRequired,
  saveAsTemplate,
  currentWorkflow,
  activePresetType,
};
