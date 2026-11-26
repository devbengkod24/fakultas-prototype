# Graph Report - fakultas-prototype  (2026-11-26)

## Corpus Check
- 295 files · ~345,209 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 1472 nodes · 2183 edges · 102 communities (79 shown, 23 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2299f55`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/_controller.js
- Golden Flow MBKM (6 Fase)
- Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)
- Modals.astro
- KontributorShell.astro
- public/_controller.js
- mahasiswa/_controller.js
- pages/index.astro
- index.ts
- cn.ts
- KontributorCms.astro
- TabDokumenPendaftaran.astro
- mock-data.ts
- DosenShell.astro
- switchTab
- LandingScripts.astro
- package.json
- initApp
- admin/_mock-data.js
- renderKoordinatorTable
- setProdiTenant
- triggerAutosave
- renderSurekomTable
- renderPelamarTable
- lucide-astro
- programs.ts
- renderPengumumanCards
- renderKontributorTable
- admin/index.ts
- initShowcaseCarousel
- renderWorkflowStages
- renderPeriodeData
- logbook-kegiatan-pdf.ts
- users.ts
- bukaReviewBerkasDrawer
- openValidasiSurekomModal
- renderLaporanTable
- renderSemuaMhsTable
- renderAssignProgramList
- switchPage
- applicants.ts
- tsconfig.json
- initRegistrationStepper
- vercel.json
- sidang-konversi.ts
- 3. User Stories
- Card.astro
- StatCard.astro
- konversiData.ts
- env.d.ts
- core-store.ts
- pelamar-evaluasi.ts
- form-settings.ts
- kontributor-cms.ts
- pengumuman.ts
- kontributor-table.ts
- pelamar-table.ts
- workflow-presets.ts
- mahasiswa/_mock-data.js
- public/_mock-data.js
- renderProdiAnnouncements
- koordinator-assign.ts
- CLAUDE.md: Panduan Pengembangan Prototipe MBKM
- showHero
- program-form.ts
- Issue 07: Verifikasi Integrasi Global & Audit Build
- openNewsDetail
- Badge.astro
- shareArticle
- MahasiswaShell.astro
- periode.ts
- Design System & Coding Standards (Ref: fakultas-fe Tugas Akhir)
- renderUnggulan
- ref_astro_transitions
- renderBeritaGrid
- 22 Komponen Modal Atomik (src/components/admin/modals/)
- pendaftaran.astro
- logbook-kegiatan.ts
- kontributor-form.ts
- pelamar-drawer.ts
- UI Style Guardian & Consistency Auditor
- kontributor-detail.ts
- kontributor-onboarding.ts
- logAktivitasData.ts
- logbook-bimbingan.ts
- FormSectionCms.astro
- mahasiswa/pengumuman.astro
- LogbookChartCard.astro
- globals.d.ts

## God Nodes (most connected - your core abstractions)
1. `switchTab()` - 27 edges
2. `susunLaporan()` - 18 edges
3. `renderPelamarTable()` - 17 edges
4. `PdfDoc` - 16 edges
5. `initApp()` - 15 edges
6. `renderPelamarTable()` - 15 edges
7. `3. User Stories` - 13 edges
8. `Golden Flow MBKM (6 Fase)` - 13 edges
9. `renderSurekomTable()` - 12 edges
10. `renderPengumumanCards()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Thin Page Orchestrator Pattern` --semantically_similar_to--> `Modal Barrel Registry (< 40 baris)`  [INFERRED] [semantically similar]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md
- `Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)` --conceptually_related_to--> `LandingProgramStudi.astro (1.722 baris, melebihi batas ideal)`  [INFERRED]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md
- `Admin TypeScript Modules (src/scripts/admin/*.ts)` --implements--> `Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)`  [INFERRED]
  .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md → CLAUDE.md
- `Admin TypeScript Modules (src/scripts/admin/*.ts)` --implements--> `TypeScript Mandate untuk Logika src/`  [EXTRACTED]
  .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md → CLAUDE.md
- `Preservasi Kontrak DOM (id, name, listener, data-pencil-name)` --rationale_for--> `Alpine.store('mbkm') Reactivity Contract`  [INFERRED]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Program Dekomposisi Modals Admin (04-07) menuju Modals.astro sebagai Agregator** — scratch_modular_astro_refactor_issues_04_split_admin_modals_pengumuman_kontributor_ticket_04, scratch_modular_astro_refactor_issues_05_split_admin_modals_pelamar_pendaftaran_ticket_05, scratch_modular_astro_refactor_issues_06_split_admin_modals_program_surekom_ticket_06, scratch_modular_astro_refactor_issues_07_split_admin_modals_konversi_sidang_kuota_ticket_07, scratch_modular_astro_refactor_issues_07_split_admin_modals_konversi_sidang_kuota_modals_aggregator [EXTRACTED 1.00]
- **Kontrak DOM & Visual: id, name, listener, data-pencil-name** — claude_dom_contract_preservation, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_data_pencil_name, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_modal_atomic_components, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_landing_sections, scratch_ideal_lines_refactor_issues_06_modularisasi_controller_admin_alpine_store_mbkm [EXTRACTED 1.00]
- **Pola Reuse Global Layout (Navbar/Footer) Lintas Halaman Publik** — scratch_modular_astro_refactor_issues_01_extract_global_layout_globalnavbar, scratch_modular_astro_refactor_issues_01_extract_global_layout_globalfooter, scratch_modular_astro_refactor_issues_02_decouple_detail_mbkm_ticket_02, scratch_modular_astro_refactor_issues_10_decouple_landing_page_ticket_10 [EXTRACTED 1.00]
- **Program Refactor Ideal Lines (Issue 00-07)** — scratch_ideal_lines_refactor_issues_00_setup_helper_styling_dan_utility_issue_00, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_issue_01, scratch_ideal_lines_refactor_issues_02_dekomposisi_pendaftaran_mahasiswa_issue_02, scratch_ideal_lines_refactor_issues_03_dekomposisi_detail_mbkm_issue_03, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_issue_04, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_issue_05, scratch_ideal_lines_refactor_issues_06_modularisasi_controller_admin_issue_06, scratch_ideal_lines_refactor_issues_07_verifikasi_integrasi_dan_audit_build_issue_07 [EXTRACTED 1.00]
- **Pola Dekomposisi: Halaman Ramping + Subkomponen Atomik + cn() Utility** — scratch_ideal_lines_refactor_issues_00_setup_helper_styling_dan_utility_cn_utility, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_modal_registry_barrel, scratch_ideal_lines_refactor_issues_02_dekomposisi_pendaftaran_mahasiswa_pendaftaran_page, scratch_ideal_lines_refactor_issues_03_dekomposisi_detail_mbkm_detail_page, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_apps_page, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_index_page [INFERRED 0.85]
- **Pola Orkestrator Halaman di Bawah Batas Baris dengan Sub-Komponen Domain** — scratch_modular_astro_refactor_issues_02_decouple_detail_mbkm_ticket_02, scratch_modular_astro_refactor_issues_03_modularize_pendaftaran_mahasiswa_ticket_03, scratch_modular_astro_refactor_issues_08_decouple_mahasiswa_sidang_ticket_08, scratch_modular_astro_refactor_issues_09_modularize_admin_kontributor_shells_ticket_09, scratch_modular_astro_refactor_issues_10_decouple_landing_page_ticket_10 [INFERRED 0.85]
- **Sidang Evaluasi: Single Menu, Dual Tab, Dual Examiner Scoring** — docs_spec_03_antarmuka_dan_navigasi_role_sidang_evaluasi_dual_tab, docs_spec_03_antarmuka_dan_navigasi_role_tab_pengajuan_sidang, docs_spec_03_antarmuka_dan_navigasi_role_tab_jadwal_hasil_sidang, docs_spec_03_antarmuka_dan_navigasi_role_bobot_penilaian_sidang, docs_spec_01_flow_mbkm_mahasiswa_role_journey, docs_spec_02_state_machine_mbkm_completed [INFERRED 0.85]
- **Gatekeeper KRS -> Dospem Assignment -> Mandatory WAG Channel** — docs_spec_01_flow_mbkm_gatekeeper_krs_sebelum_plotting, docs_spec_02_state_machine_mbkm_krs_locked_verified, docs_spec_02_state_machine_mbkm_zero_ghost_tutoring, docs_spec_02_state_machine_mbkm_dospem_assigned, docs_spec_02_state_machine_mbkm_mandatory_communication_channel, docs_spec_03_antarmuka_dan_navigasi_role_kartu_dospem_dashboard, docs_spec_03_antarmuka_dan_navigasi_role_komponen_grup_whatsapp [INFERRED 0.90]
- **Pakta Integritas Lifecycle (General Consent -> Generated PDF -> Revision -> Approved)** — docs_spec_readme_dualitas_pakta, docs_spec_01_flow_mbkm_dualitas_pakta_integritas, docs_spec_02_state_machine_mbkm_pakta_revision, docs_spec_02_state_machine_mbkm_non_destructive_revision, docs_spec_04_standar_komponen_dan_interaksi_pakta_generator, docs_spec_04_standar_komponen_dan_interaksi_pakta_alur_frontend [INFERRED 0.95]

## Communities (102 total, 23 thin omitted)

### Community 0 - "admin/_controller.js"
Cohesion: 0.02
Nodes (34): activePertanyaanSkorList, assignSelectedPrograms, closeDetailPengumumanModal(), closeModalEditBatasDosen(), closeModalInputNilaiSidang(), closeModalJadwalSidang(), closeModalSetBatasKuota(), closeModalTelaahKonversi() (+26 more)

### Community 1 - "Golden Flow MBKM (6 Fase)"
Cohesion: 0.05
Nodes (65): Active Period / Context Banner, Chronological Logbook Timeline, Color Palette & Semantic Role Tokens, Component Stylings (Buttons, Cards, Navigation, Inputs), Design System: Enterprise Academic & Workflow Workspace, Filterable Data Table & Toolbar, KPI Stat Cards, Layout Principles (App Shell, 4px Scale, Breakpoints) (+57 more)

### Community 3 - "Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)"
Cohesion: 0.18
Nodes (16): Preservasi Kontrak DOM (id, name, listener, data-pencil-name), Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip), Thin Page Orchestrator Pattern, Zero Improvisation / Pure Extraction Discipline, cn() Class Merge Utility (src/utils/cn.ts), Styling Dependencies: clsx, tailwind-merge, class-variance-authority, Modal Barrel Registry (< 40 baris), detail-mbkm.astro (Orkestrator Layout & Meta) (+8 more)

### Community 4 - "Modals.astro"
Cohesion: 0.06
Nodes (20): ModalKontributorAdmin.astro, ModalPengumuman.astro, ModalShowcase.astro, TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase, ModalCustomField.astro, ModalPelamarAdmin.astro, TICKET-05: Dekomposisi Admin Modals - Pelamar & Pratinjau Pendaftaran, ModalMasterProgram.astro (+12 more)

### Community 5 - "KontributorShell.astro"
Cohesion: 0.07
Nodes (30): closeAddDosenModal(), closeDirectAssignModal(), fileMap, handleAddDosenSubmit(), handleDirectAssignSubmit(), handleSaveProgramOperasional(), hideToast(), initIcons() (+22 more)

### Community 6 - "public/_controller.js"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 7 - "mahasiswa/_controller.js"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 8 - "pages/index.astro"
Cohesion: 0.05
Nodes (20): GlobalFooter.astro, GlobalNavbar.astro, Mobile Drawer Navigation (Hamburger), TICKET-01: Ekstraksi Komponen Global Navbar dan Footer UDINUS, TICKET-02: Dekomposisi Halaman Detail MBKM ke Komponen Domain Modular, src/scripts/pendaftaran-stepper.js, TICKET-03: Modularisasi Multi-Step Form Pendaftaran Mahasiswa, MobileDrawer.astro (Shell) (+12 more)

### Community 9 - "index.ts"
Cohesion: 0.19
Nodes (10): [], masterPartnersData, partnersData, Announcement, Coordinator, DataTableTab, Partner, PartnerDosen (+2 more)

### Community 10 - "cn.ts"
Cohesion: 0.29
Nodes (5): KomponenNilai, PengujiSidang, PersyaratanSidang, sidangData, cn()

### Community 11 - "KontributorCms.astro"
Cohesion: 0.11
Nodes (9): dokumenList, durasiOptions, semesterOptions, defaultFaqs, defaultTimelineSteps, hapusTimelineStep(), tambahTimelineStep(), updateTimelineStepState() (+1 more)

### Community 12 - "TabDokumenPendaftaran.astro"
Cohesion: 0.17
Nodes (5): defaultDocs, inputTypes, defaultFields, inputTypes, defaultAgreements

### Community 13 - "mock-data.ts"
Cohesion: 0.09
Nodes (24): variants, DOSEN_PROFILE, MOCK_JADWAL_SIDANG, MOCK_LOG_AKTIVITAS_DOSEN, MOCK_LOGBOOK_MINGGUAN, MOCK_MAHASISWA_BINAAN, MOCK_PENGAJUAN_SIDANG, MOCK_PENGUMUMAN_DOSEN (+16 more)

### Community 14 - "DosenShell.astro"
Cohesion: 0.10
Nodes (12): LogbookEntry, LogbookLampiran, Student, students, groupedActivities, weeklyCounts, students, studentsJson (+4 more)

### Community 15 - "switchTab"
Cohesion: 0.11
Nodes (24): closeProgramCms(), goToPage(), handleProgramSubmit(), hideKontributorDetail(), hideLogbookDetail(), hideSubviews(), init(), refreshIcons() (+16 more)

### Community 16 - "LandingScripts.astro"
Cohesion: 0.04
Nodes (42): annChevron, annFilterBtn, annFilterMenu, annSearchInput, beritaNextBtn, beritaPerPageSelect, beritaPrevBtn, expandedAnnSet (+34 more)

### Community 18 - "package.json"
Cohesion: 0.05
Nodes (40): dependencies, alpinejs, astro, @astrojs/alpinejs, class-variance-authority, clsx, html2pdf.js, jszip (+32 more)

### Community 19 - "initApp"
Cohesion: 0.12
Nodes (19): closeKategoriModal(), closeShowcaseModal(), filterKategoriTable(), getFilteredLogbookData(), goToKategoriPage(), goToLogbookPage(), handleDeleteKategori(), handleDeleteShowcase() (+11 more)

### Community 20 - "admin/_mock-data.js"
Cohesion: 0.11
Nodes (18): formPendaftaranConfig, kategoriData, kontributorCmsDataMap, kontributorListData, koordinatorData, laporanListData, logbookListData, masterKontributorList (+10 more)

### Community 21 - "renderKoordinatorTable"
Cohesion: 0.17
Nodes (16): closeAssignProgramModal(), closeKoordinatorModal(), confirmDeleteProgram(), getProgramsForKoordinator(), goToKoordinatorPage(), goToProgramPage(), handleDeleteKoordinator(), handleFilterKoordinatorProdi() (+8 more)

### Community 22 - "setProdiTenant"
Cohesion: 0.20
Nodes (10): nextKurikulumPeminatan(), prevKurikulumPeminatan(), renderKurikulumPeminatan(), renderTenantAkreditasi(), selectKurikulumPeminatan(), selectProdiSemester(), setKurikulumMode(), setProdiTenant() (+2 more)

### Community 23 - "triggerAutosave"
Cohesion: 0.20
Nodes (12): closeTambahCustomFieldModal(), handleSimpanCustomField(), hapusCustomField(), insertSurekomTag(), renderCustomFieldsContainer(), renderFormPendaftaranUI(), resetSurekomTemplate(), toggleDocActive() (+4 more)

### Community 24 - "renderSurekomTable"
Cohesion: 0.20
Nodes (12): closeValidasiSurekomModal(), getFilteredSurekomData(), goToSurekomPage(), handleFilterSurekomProdi(), handleFilterSurekomProgram(), handleFilterSurekomStatus(), handleSearchSurekom(), hideSurekomDetail() (+4 more)

### Community 25 - "renderPelamarTable"
Cohesion: 0.15
Nodes (16): closePelamarDetailModal(), getFilteredPelamarData(), goToPelamarPage(), handleFilterPelamarKontributor(), handleFilterPelamarProdi(), handlePelamarPerPageChange(), handleSearchPelamar(), handleSortPendaftar() (+8 more)

### Community 26 - "lucide-astro"
Cohesion: 0.24
Nodes (4): roles, navigationMenus, NavItem, RoleNavConfig

### Community 27 - "programs.ts"
Cohesion: 0.17
Nodes (7): sizeStyles, variantStyles, maxWidthStyles, src_data_programs_categories, categoriesData, programsData, Program

### Community 28 - "renderPengumumanCards"
Cohesion: 0.20
Nodes (11): closeBuatPengumumanModal(), closeDeletePengumumanModal(), confirmDeletePengumuman(), getFilteredPengumumanData(), goToPengumumanPage(), handleFilterPengumumanSasaran(), handleFilterPengumumanStatus(), handleSavePengumuman() (+3 more)

### Community 29 - "renderKontributorTable"
Cohesion: 0.22
Nodes (10): closeTambahKontributorModal(), getFilteredKontributorData(), goToKontributorPage(), handleSaveKontributor(), handleSearchKontributor(), handleSubmitTambahKontributor(), renderKontributorTable(), switchKontributorCategoryTab() (+2 more)

### Community 30 - "admin/index.ts"
Cohesion: 0.05
Nodes (40): closeKategoriModal(), filterKategoriTable(), goToKategoriPage(), handleDeleteKategori(), handleSaveKategori(), renderKategoriTable(), closeKoordinatorModal(), handleSaveKoordinator() (+32 more)

### Community 31 - "initShowcaseCarousel"
Cohesion: 0.44
Nodes (8): initShowcaseCarousel(), buildDots(), goTo(), render(), restartAutoplay(), startAutoplay(), stopAutoplay(), updateGlow()

### Community 32 - "renderWorkflowStages"
Cohesion: 0.25
Nodes (8): addFileField(), addStageCard(), handleKategoriChange(), loadWorkflowPreset(), removeFileField(), removeStageCard(), renderWorkflowStages(), updatePresetButtonsUI()

### Community 33 - "renderPeriodeData"
Cohesion: 0.29
Nodes (8): closeEditPeriodeModal(), getFilteredPeriodeData(), goToPeriodePage(), handleFilterPeriodeStatus(), handlePeriodePerPageChange(), handleSaveEditPeriode(), handleSyncPeriodeData(), renderPeriodeData()

### Community 34 - "logbook-kegiatan-pdf.ts"
Cohesion: 0.10
Nodes (20): kegiatanAwal, KegiatanLog, profilLaporan, BIRU, blokIdentitas(), cacheSkrip, footerSemuaHalaman(), GARIS (+12 more)

### Community 36 - "bukaReviewBerkasDrawer"
Cohesion: 0.18
Nodes (15): bukaDetailPelamarReadOnly(), bukaEvaluasiWawancaraDrawer(), bukaReviewBerkasDrawer(), handleInputSkorPertanyaan(), handleMetodeWawancaraChange(), hapusPertanyaanSkor(), initPertanyaanSkorList(), populateDrawerDokumenList() (+7 more)

### Community 37 - "openValidasiSurekomModal"
Cohesion: 0.33
Nodes (6): buildSuratRekomendasiText(), bukaPratinjauDrafDoc(), handleModalSurekomDecisionChange(), openValidasiSurekomModal(), showSurekomDetailById(), viewSurekomDoc()

### Community 38 - "renderLaporanTable"
Cohesion: 0.40
Nodes (6): changeLaporanItemsPerPage(), getFilteredLaporanData(), goToLaporanPage(), handleSearchLaporan(), renderLaporanPaginationControls(), renderLaporanTable()

### Community 39 - "renderSemuaMhsTable"
Cohesion: 0.40
Nodes (6): getFilteredSemuaMhsData(), goToSemuaMhsPage(), handleFilterSemuaMhsKontributor(), handleFilterSemuaMhsProdi(), handleSearchSemuaMhs(), renderSemuaMhsTable()

### Community 40 - "renderAssignProgramList"
Cohesion: 0.33
Nodes (6): handleAssignProgramSearch(), handleSelectAllPrograms(), handleToggleProgramCheck(), renderAssignProgramList(), showAssignProgramModal(), updateAssignSelectedCount()

### Community 42 - "switchPage"
Cohesion: 0.25
Nodes (8): closeMobileNav(), closeProdiMobileNav(), navigateToProdi(), onScroll(), setMobileNav(), setProdiMobileNav(), switchPage(), updateProdiScrollspy()

### Community 43 - "applicants.ts"
Cohesion: 0.25
Nodes (6): applicantsData, recommendationsData, studentsData, src_data_applicants_recommendations, src_data_applicants_students, Applicant

### Community 44 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 46 - "initRegistrationStepper"
Cohesion: 0.43
Nodes (6): initRegistrationStepper(), checkStep3Valid(), goToStep(), renderAttachments(), updateNavigation(), updateSubmitButtonState()

### Community 47 - "vercel.json"
Cohesion: 0.50
Nodes (3): cleanUrls, ignoreCommand, rewrites

### Community 48 - "sidang-konversi.ts"
Cohesion: 0.06
Nodes (13): closeModalEditBatasDosen(), closeModalInputNilaiSidang(), closeModalJadwalSidang(), closeModalSetBatasKuota(), closeModalTelaahKonversi(), handleSaveBatasKuotaFakultas(), handleSaveJadwalSidang(), handleSaveKuotaIndividual() (+5 more)

### Community 49 - "3. User Stories"
Cohesion: 0.08
Nodes (23): 1. Problem Statement, 2. Solution Overview, 3. User Stories, 4.1 Stack & Constraints, 4.2 Keputusan Arsitektur, 4.3 Rute & Navigasi Akhir, 4.4 Kalkulasi Nilai Akhir Sidang, 4. Implementation Decisions (+15 more)

### Community 52 - "konversiData.ts"
Cohesion: 0.10
Nodes (11): ditolak, lengkap, buatPengajuan(), katalogMatkul, MAKS_SKS, MatkulKatalog, MatkulPengajuan, NilaiLama (+3 more)

### Community 53 - "env.d.ts"
Cohesion: 0.10
Nodes (20): AnchorHTMLAttributes, astroHTML.JSX, ButtonHTMLAttributes, DefinedIntrinsicElements, DOMAttributes, FormHTMLAttributes, HTMLAttributes, ImgHTMLAttributes (+12 more)

### Community 54 - "core-store.ts"
Cohesion: 0.15
Nodes (9): goToPage(), init(), refreshIcons(), showEdit(), showKategori(), showList(), switchTab(), toggleDosenSubmenu() (+1 more)

### Community 55 - "pelamar-evaluasi.ts"
Cohesion: 0.15
Nodes (13): activePertanyaanSkorList, bukaModalJadwalWawancaraPelamar(), closeModalJadwalWawancaraPelamar(), handleInputSkorPertanyaan(), handleMetodeWawancaraChange(), hapusPertanyaanSkor(), initPertanyaanSkorList(), lihatTranskripPelamar() (+5 more)

### Community 56 - "form-settings.ts"
Cohesion: 0.20
Nodes (14): closeTambahCustomFieldModal(), handleSimpanCustomField(), hapusCustomField(), insertSurekomTag(), openPreviewMahasiswaModal(), renderCustomFieldsContainer(), renderFormPendaftaranUI(), resetSurekomTemplate() (+6 more)

### Community 57 - "kontributor-cms.ts"
Cohesion: 0.18
Nodes (14): clearShowcaseFoto(), closeShowcaseModal(), handleDeleteShowcase(), handleSaveShowcase(), handleShowcaseFotoChange(), handleShowcaseFotoDrop(), openKontributorCms(), openProgramCms() (+6 more)

### Community 58 - "pengumuman.ts"
Cohesion: 0.20
Nodes (15): closeBuatPengumumanModal(), closeDeletePengumumanModal(), closeDetailPengumumanModal(), confirmDeletePengumuman(), countdownTarget, getFilteredPengumumanData(), goToPengumumanPage(), handleFilterPengumumanSasaran() (+7 more)

### Community 59 - "kontributor-table.ts"
Cohesion: 0.22
Nodes (12): closeTambahKontributorModal(), getFilteredKontributorData(), goToKontributorPage(), handleModalKontributorTypeChange(), handleSaveKontributor(), handleSearchKontributor(), handleSubmitTambahKontributor(), renderKontributorTable() (+4 more)

### Community 60 - "pelamar-table.ts"
Cohesion: 0.26
Nodes (14): closeAllPelamarActionMenus(), getFilteredPelamarData(), goToPelamarPage(), handleFilterPelamarKontributor(), handleFilterPelamarProdi(), handlePelamarPerPageChange(), handleSearchPelamar(), handleSortPendaftar() (+6 more)

### Community 61 - "workflow-presets.ts"
Cohesion: 0.24
Nodes (8): addFileField(), addStageCard(), handleKategoriChange(), loadWorkflowPreset(), removeFileField(), removeStageCard(), renderWorkflowStages(), updatePresetButtonsUI()

### Community 66 - "renderProdiAnnouncements"
Cohesion: 0.40
Nodes (5): changeAnnPage(), clearAnnSearch(), handleAnnCategoryChange(), handleAnnSearch(), renderProdiAnnouncements()

### Community 67 - "koordinator-assign.ts"
Cohesion: 0.26
Nodes (9): assignSelectedPrograms, closeAssignProgramModal(), handleAssignProgramSearch(), handleSaveProgramAssignment(), handleSelectAllPrograms(), handleToggleProgramCheck(), renderAssignProgramList(), showAssignProgramModal() (+1 more)

### Community 71 - "CLAUDE.md: Panduan Pengembangan Prototipe MBKM"
Cohesion: 0.20
Nodes (11): astro dev --background Workflow, AGENTS.md: Astro Development Guide, Astro Documentation Reference Set (routing, components, styling, i18n), Verifikasi Build Wajib (npm run build), CLAUDE.md: Panduan Pengembangan Prototipe MBKM, Standarisasi Istilah Dosen Pembimbing / Dospem, Git Read-Only Policy & Protokol Konfirmasi, Persona Peran: Koordinator MBKM, Kontributor/Mitra, Dosen Pembimbing, Mahasiswa (+3 more)

### Community 72 - "showHero"
Cohesion: 0.60
Nodes (5): heroNext(), heroPrev(), paintHeroDots(), showHero(), startHero()

### Community 73 - "program-form.ts"
Cohesion: 0.25
Nodes (5): handleProgramSubmit(), hideSubviews(), showKategoriManagementView(), showProgramListView(), updateProgramSubmenuActive()

### Community 74 - "Issue 07: Verifikasi Integrasi Global & Audit Build"
Cohesion: 0.36
Nodes (10): Issue 00: Setup Helper Styling Komponen & Utilitas Tailwind, Issue 01: Dekomposisi Admin Modals ke Komponen Atomik, Issue 02: Dekomposisi Halaman Pendaftaran Mahasiswa ke Komponen Stepper, Issue 03: Dekomposisi Halaman Detail Program MBKM, Issue 04: Dekomposisi Halaman Portal Apps FIK, Issue 05: Dekomposisi Beranda Landing Page FIK, Issue 06: Modularisasi Admin Master Controller ke TypeScript, ESLint max-lines Rule (max 300) (+2 more)

### Community 75 - "openNewsDetail"
Cohesion: 0.50
Nodes (4): goNews(), openNewsDetail(), renderNews(), swapImg()

### Community 76 - "Badge.astro"
Cohesion: 0.50
Nodes (3): dotColors, sizeStyles, variantStyles

### Community 77 - "shareArticle"
Cohesion: 0.67
Nodes (3): copyText(), shareArticle(), showToast()

### Community 78 - "MahasiswaShell.astro"
Cohesion: 0.22
Nodes (3): setState(), toggle(), KegiatanList

### Community 79 - "periode.ts"
Cohesion: 0.38
Nodes (8): closeEditPeriodeModal(), getFilteredPeriodeData(), goToPeriodePage(), handleFilterPeriodeStatus(), handlePeriodePerPageChange(), handleSaveEditPeriode(), handleSyncPeriodeData(), renderPeriodeData()

### Community 80 - "Design System & Coding Standards (Ref: fakultas-fe Tugas Akhir)"
Cohesion: 0.22
Nodes (8): 1. Tipografi & Font Stack, 2. Token Warna Baku (Palette Tokens), 3. Komponen Baku (Sesuai Tugas Akhir `fakultas-fe`), 4. Prinsip Sibling Parity & Anti-Drift, A. Menu Cards Utama (Top Grid), B. Periode Aktif Card (Border-Left Accent), C. Tabel Data & Standar Tipografi Baku (Ref: Koordinator Data-Mahasiswa & Tugas Akhir), Design System & Coding Standards (Ref: fakultas-fe Tugas Akhir)

### Community 85 - "22 Komponen Modal Atomik (src/components/admin/modals/)"
Cohesion: 0.28
Nodes (9): 22 Komponen Modal Atomik (src/components/admin/modals/), Modals.astro Monolith (2.044 baris), ModalSuksesPendaftaran.astro, pendaftaran-mahasiswa.astro (Orkestrator Stepper), StepIdentitas / StepDokumen / StepKonfirmasi, Alpine Plugins: @alpinejs/collapse & @alpinejs/persist, Alpine.store('mbkm') Reactivity Contract, public/admin/_controller.js (6.023 baris monolitik) (+1 more)

### Community 86 - "pendaftaran.astro"
Cohesion: 0.25
Nodes (3): FormDokumen, FormMBKMItem, mockDaftarFormMBKM

### Community 88 - "logbook-kegiatan.ts"
Cohesion: 0.25
Nodes (6): LogbookEntry, logbookKegiatanList, LogbookStatus, MahasiswaLogbookRecord, sampleTopics, WeeklyLogbook

### Community 89 - "kontributor-form.ts"
Cohesion: 0.44
Nodes (8): getFormKontributorId(), handleSaveKontributorForm(), hydrateStoredForms(), persistForm(), populateKontributorFormPage(), readStoredForms(), setText(), val()

### Community 90 - "pelamar-drawer.ts"
Cohesion: 0.47
Nodes (6): bukaDetailPelamarReadOnly(), bukaEvaluasiWawancaraDrawer(), bukaReviewBerkasDrawer(), populateDrawerDokumenList(), populateDrawerHeaderProfile(), switchDrawerDetailTab()

### Community 91 - "UI Style Guardian & Consistency Auditor"
Cohesion: 0.25
Nodes (7): 1. Standar Token Warna (Color Tokens), 2. Standar Border & Radius (Border Radius Hierarchy), 3. Standar Tipografi & Font (Typography & Hierarchy), 4. Standar Copywriting & Istilah Akademik, 5. Keselarasan Elemen Bersaudara (Sibling Parity), 6. Prosedur Audit & Penegakan (Workflow), UI Style Guardian & Consistency Auditor

### Community 92 - "kontributor-detail.ts"
Cohesion: 0.39
Nodes (6): openKontributorProgram(), openModalKelolaProgram(), renderRelasiDospemMahasiswa(), showKontributorDetail(), switchKontributorDetailTab(), switchKontributorTab()

### Community 93 - "kontributor-onboarding.ts"
Cohesion: 0.39
Nodes (6): continueKontributorSetupToCms(), finishKontributorSetup(), hydrateStoredKontributor(), isKontributorSetupMode(), persistNewKontributor(), readStoredKontributor()

### Community 94 - "logAktivitasData.ts"
Cohesion: 0.29
Nodes (4): aktivitasAwal, AktivitasMahasiswa, KategoriAktivitas, tabAktivitas

### Community 95 - "logbook-bimbingan.ts"
Cohesion: 0.33
Nodes (5): BimbinganEntry, BimbinganStatus, DosenBimbinganRecord, logbookBimbinganList, MahasiswaBimbinganRecord

### Community 97 - "mahasiswa/pengumuman.astro"
Cohesion: 0.40
Nodes (3): awalDibaca, pengumuman, string

### Community 98 - "LogbookChartCard.astro"
Cohesion: 0.40
Nodes (4): axisLabels, currentWeek, progressPct, slots

## Ambiguous Edges - Review These
- `22 Komponen Modal Atomik (src/components/admin/modals/)` → `public/admin/_controller.js (6.023 baris monolitik)`  [AMBIGUOUS]
  .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md · relation: shares_data_with

## Knowledge Gaps
- **280 isolated node(s):** `name`, `type`, `version`, `node`, `dev` (+275 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 610 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `22 Komponen Modal Atomik (src/components/admin/modals/)` and `public/admin/_controller.js (6.023 baris monolitik)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **Why does `TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase` connect `Modals.astro` to `admin/_controller.js`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `ModalKontributorAdmin.astro` connect `Modals.astro` to `KontributorShell.astro`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `ModalPelamarAdmin.astro` connect `Modals.astro` to `admin/_controller.js`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _280 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin/_controller.js` be split into smaller, more focused modules?**
  _Cohesion score 0.024342105263157894 - nodes in this community are weakly interconnected._
- **Should `Golden Flow MBKM (6 Fase)` be split into smaller, more focused modules?**
  _Cohesion score 0.05336538461538461 - nodes in this community are weakly interconnected._