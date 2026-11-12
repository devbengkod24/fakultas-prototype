// @ts-nocheck
// ==============================================================================
// MBKM Master Admin Scripts Entry Point
// Fakultas Ilmu Komputer UDINUS
// ==============================================================================

// Import all modular scripts to register Alpine stores, lifecycle events,
// and attach all controller functions to window object for inline template handlers.

import * as core_store from "./core-store";
import * as navigation from "./navigation";
import * as workflow_presets from "./workflow-presets";
import * as program_table from "./program-table";
import * as program_form from "./program-form";
import * as kategori from "./kategori";
import * as koordinator_table from "./koordinator-table";
import * as koordinator_modal from "./koordinator-modal";
import * as koordinator_assign from "./koordinator-assign";
import * as surekom_table from "./surekom-table";
import * as surekom_preview from "./surekom-preview";
import * as logbook from "./logbook";
import * as laporan from "./laporan";
import * as pengumuman from "./pengumuman";
import * as periode from "./periode";
import * as form_settings from "./form-settings";
import * as kontributor_table from "./kontributor-table";
import * as kontributor_detail from "./kontributor-detail";
import * as kontributor_cms from "./kontributor-cms";
import * as pelamar_table from "./pelamar-table";
import * as pelamar_drawer from "./pelamar-drawer";
import * as pelamar_evaluasi from "./pelamar-evaluasi";
import * as semua_mahasiswa from "./semua-mahasiswa";
import * as init from "./init";
import * as sidang_konversi from "./sidang-konversi";

// Re-export all domain modules
export {
  core_store,
  navigation,
  workflow_presets,
  program_table,
  program_form,
  kategori,
  koordinator_table,
  koordinator_modal,
  koordinator_assign,
  surekom_table,
  surekom_preview,
  logbook,
  laporan,
  pengumuman,
  periode,
  form_settings,
  kontributor_table,
  kontributor_detail,
  kontributor_cms,
  pelamar_table,
  pelamar_drawer,
  pelamar_evaluasi,
  semua_mahasiswa,
  init,
  sidang_konversi,
};

console.log("[AdminShell] Modular TypeScript controller initialized successfully.");
