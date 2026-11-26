# Graph Report - fakultas-prototype  (2026-11-09)

## Corpus Check
- 236 files · ~287,732 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 993 nodes · 1456 edges · 85 communities (51 shown, 34 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 75 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `588f08de`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/_controller.js
- Golden Flow MBKM (6 Fase)
- koordinator/dashboard.astro
- Issue 07: Verifikasi Integrasi Global & Audit Build
- Modals.astro
- KontributorShell.astro
- public/_controller.js
- mahasiswa/_controller.js
- detail-mbkm.astro
- index.ts
- MahasiswaShell.astro
- KontributorCms.astro
- TabDokumenPendaftaran.astro
- mock-data.ts
- DosenShell.astro
- switchTab
- LandingScripts.astro
- AdminShell.astro
- package.json
- initApp
- admin/_mock-data.js
- renderKoordinatorTable
- setProdiTenant
- triggerAutosave
- renderSurekomTable
- renderPelamarTable
- Sidebar.astro
- lucide-astro
- renderPengumumanCards
- renderKontributorTable
- Topbar.astro
- initShowcaseCarousel
- renderWorkflowStages
- renderPeriodeData
- users.ts
- bukaEvaluasiWawancara
- openValidasiSurekomModal
- renderLaporanTable
- renderSemuaMhsTable
- renderAssignProgramList
- switchPage
- applicants.ts
- tsconfig.json
- initRegistrationStepper
- vercel.json
- showDetailPengumumanModal
- openModalTelaahKonversi
- Card.astro
- StatCard.astro
- closeModalEditBatasDosen
- closeModalInputNilaiSidang
- closeModalJadwalSidang
- closeModalSetBatasKuota
- handleModalKontributorTypeChange
- hitungNilaiAkhirSidang
- openKontributorCms
- openKontributorProgram
- openModalTambahDosen
- openPreviewMahasiswaModal
- mahasiswa/_mock-data.js
- public/_mock-data.js
- renderProdiAnnouncements
- showHero
- programs.ts
- showKontributorDetail
- openNewsDetail
- Badge.astro
- shareArticle
- confirmToggleStatusKontributor
- lihatTranskripPelamar
- renderUnggulan
- ref_astro_transitions
- renderBeritaGrid

## God Nodes (most connected - your core abstractions)
1. `switchTab()` - 27 edges
2. `renderPelamarTable()` - 19 edges
3. `initApp()` - 15 edges
4. `renderPelamarTable()` - 15 edges
5. `Golden Flow MBKM (6 Fase)` - 13 edges
6. `renderSurekomTable()` - 12 edges
7. `renderPengumumanCards()` - 11 edges
8. `Issue 07: Verifikasi Integrasi Global & Audit Build` - 11 edges
9. `renderKoordinatorTable()` - 10 edges
10. `18 State Resmi Siklus Hidup Pendaftaran MBKM` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Thin Page Orchestrator Pattern` --semantically_similar_to--> `Modal Barrel Registry (< 40 baris)`  [INFERRED] [semantically similar]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md
- `Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)` --conceptually_related_to--> `LandingProgramStudi.astro (1.722 baris, melebihi batas ideal)`  [INFERRED]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md
- `22 Komponen Modal Atomik (src/components/admin/modals/)` --semantically_similar_to--> `StepIdentitas / StepDokumen / StepKonfirmasi`  [INFERRED] [semantically similar]
  .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md → .scratch/ideal-lines-refactor/issues/02-dekomposisi-pendaftaran-mahasiswa.md
- `LandingNavbar / Hero / BeritaKegiatan / SambutanDekan / ProgramStudi / Footer` --semantically_similar_to--> `DetailHero / About / Timeline / Showcase / Faq / Footer`  [INFERRED] [semantically similar]
  .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md → .scratch/ideal-lines-refactor/issues/03-dekomposisi-detail-mbkm.md
- `index.astro (Landing Orkestrator, 83 baris)` --implements--> `Thin Page Orchestrator Pattern`  [EXTRACTED]
  .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md → CLAUDE.md

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

## Communities (85 total, 34 thin omitted)

### Community 0 - "admin/_controller.js"
Cohesion: 0.03
Nodes (3): assignSelectedPrograms, countdownTarget, currentWorkflow

### Community 1 - "Golden Flow MBKM (6 Fase)"
Cohesion: 0.05
Nodes (65): Active Period / Context Banner, Chronological Logbook Timeline, Color Palette & Semantic Role Tokens, Component Stylings (Buttons, Cards, Navigation, Inputs), Design System: Enterprise Academic & Workflow Workspace, Filterable Data Table & Toolbar, KPI Stat Cards, Layout Principles (App Shell, 4px Scale, Breakpoints) (+57 more)

### Community 3 - "Issue 07: Verifikasi Integrasi Global & Audit Build"
Cohesion: 0.07
Nodes (46): astro dev --background Workflow, AGENTS.md: Astro Development Guide, Astro Documentation Reference Set (routing, components, styling, i18n), Verifikasi Build Wajib (npm run build), CLAUDE.md: Panduan Pengembangan Prototipe MBKM, Preservasi Kontrak DOM (id, name, listener, data-pencil-name), Standarisasi Istilah Dosen Pembimbing / Dospem, Git Read-Only Policy & Protokol Konfirmasi (+38 more)

### Community 4 - "Modals.astro"
Cohesion: 0.06
Nodes (14): ModalKontributorAdmin.astro, ModalPengumuman.astro, ModalShowcase.astro, TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase, ModalCustomField.astro, ModalPelamarAdmin.astro, TICKET-05: Dekomposisi Admin Modals - Pelamar & Pratinjau Pendaftaran, ModalMasterProgram.astro (+6 more)

### Community 5 - "KontributorShell.astro"
Cohesion: 0.07
Nodes (30): closeAddDosenModal(), closeDirectAssignModal(), fileMap, handleAddDosenSubmit(), handleDirectAssignSubmit(), handleSaveProgramOperasional(), hideToast(), initIcons() (+22 more)

### Community 6 - "public/_controller.js"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 7 - "mahasiswa/_controller.js"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 8 - "detail-mbkm.astro"
Cohesion: 0.08
Nodes (24): GlobalFooter.astro, GlobalNavbar.astro, Mobile Drawer Navigation (Hamburger), TICKET-01: Ekstraksi Komponen Global Navbar dan Footer UDINUS, TICKET-02: Dekomposisi Halaman Detail MBKM ke Komponen Domain Modular, src/scripts/pendaftaran-stepper.js, TICKET-03: Modularisasi Multi-Step Form Pendaftaran Mahasiswa, ModalSidangAdmin.astro (+16 more)

### Community 9 - "index.ts"
Cohesion: 0.19
Nodes (10): [], masterPartnersData, partnersData, Announcement, Coordinator, DataTableTab, Partner, PartnerDosen (+2 more)

### Community 10 - "MahasiswaShell.astro"
Cohesion: 0.05
Nodes (12): dokumenList, durasiOptions, semesterOptions, BerkasSidang, KomponenNilai, PengujiSidang, sidangData, setState() (+4 more)

### Community 11 - "KontributorCms.astro"
Cohesion: 0.16
Nodes (6): defaultFaqs, defaultTimelineSteps, hapusTimelineStep(), tambahTimelineStep(), updateTimelineStepState(), defaultShowcase

### Community 12 - "TabDokumenPendaftaran.astro"
Cohesion: 0.17
Nodes (5): defaultDocs, inputTypes, defaultFields, inputTypes, defaultAgreements

### Community 13 - "mock-data.ts"
Cohesion: 0.12
Nodes (23): DOSEN_PROFILE, MOCK_JADWAL_SIDANG, MOCK_LOG_AKTIVITAS_DOSEN, MOCK_LOGBOOK_MINGGUAN, MOCK_MAHASISWA_BINAAN, MOCK_PENGAJUAN_SIDANG, MOCK_PENGUMUMAN_DOSEN, DosenProfile (+15 more)

### Community 14 - "DosenShell.astro"
Cohesion: 0.09
Nodes (12): cardKuotaData, groupedActivities, kuotaData, logbookBabs, students, studentsJson, students, studentsJson (+4 more)

### Community 15 - "switchTab"
Cohesion: 0.14
Nodes (20): closeProgramCms(), goToPage(), handleProgramSubmit(), hideKontributorDetail(), hideLogbookDetail(), hideSubviews(), init(), refreshIcons() (+12 more)

### Community 16 - "LandingScripts.astro"
Cohesion: 0.04
Nodes (41): annChevron, annFilterBtn, annFilterMenu, annSearchInput, beritaNextBtn, beritaPerPageSelect, beritaPrevBtn, expandedAnnSet (+33 more)

### Community 17 - "AdminShell.astro"
Cohesion: 0.08
Nodes (4): isDosenActive, isMahasiswaActive, isMbkmActive, isSidangActive

### Community 18 - "package.json"
Cohesion: 0.06
Nodes (36): dependencies, alpinejs, astro, @astrojs/alpinejs, class-variance-authority, clsx, lucide-astro, tailwind-merge (+28 more)

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
Cohesion: 0.14
Nodes (18): closePelamarDetailModal(), getFilteredPelamarData(), goToPelamarPage(), handleFilterPelamarKontributor(), handleFilterPelamarProdi(), handlePelamarPerPageChange(), handleSearchPelamar(), handleSortPendaftar() (+10 more)

### Community 26 - "Sidebar.astro"
Cohesion: 0.50
Nodes (3): navigationMenus, NavItem, RoleNavConfig

### Community 27 - "lucide-astro"
Cohesion: 0.25
Nodes (4): sizeStyles, variantStyles, maxWidthStyles, src_data_programs_categories

### Community 28 - "renderPengumumanCards"
Cohesion: 0.20
Nodes (11): closeBuatPengumumanModal(), closeDeletePengumumanModal(), confirmDeletePengumuman(), getFilteredPengumumanData(), goToPengumumanPage(), handleFilterPengumumanSasaran(), handleFilterPengumumanStatus(), handleSavePengumuman() (+3 more)

### Community 29 - "renderKontributorTable"
Cohesion: 0.22
Nodes (10): closeTambahKontributorModal(), getFilteredKontributorData(), goToKontributorPage(), handleSaveKontributor(), handleSearchKontributor(), handleSubmitTambahKontributor(), renderKontributorTable(), switchKontributorCategoryTab() (+2 more)

### Community 31 - "initShowcaseCarousel"
Cohesion: 0.44
Nodes (8): initShowcaseCarousel(), buildDots(), goTo(), render(), restartAutoplay(), startAutoplay(), stopAutoplay(), updateGlow()

### Community 32 - "renderWorkflowStages"
Cohesion: 0.25
Nodes (8): addFileField(), addStageCard(), handleKategoriChange(), loadWorkflowPreset(), removeFileField(), removeStageCard(), renderWorkflowStages(), updatePresetButtonsUI()

### Community 33 - "renderPeriodeData"
Cohesion: 0.29
Nodes (8): closeEditPeriodeModal(), getFilteredPeriodeData(), goToPeriodePage(), handleFilterPeriodeStatus(), handlePeriodePerPageChange(), handleSaveEditPeriode(), handleSyncPeriodeData(), renderPeriodeData()

### Community 36 - "bukaEvaluasiWawancara"
Cohesion: 0.39
Nodes (9): bukaEvaluasiWawancara(), bukaEvaluasiWawancaraDrawer(), bukaReviewBerkasDrawer(), populateDrawerDokumenList(), populateDrawerHeaderProfile(), renderPrioritasProgramList(), setujuiBerkasPelamar(), switchDrawerDetailTab() (+1 more)

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

### Community 48 - "showDetailPengumumanModal"
Cohesion: 0.67
Nodes (3): closeDetailPengumumanModal(), showBuatPengumumanModal(), showDetailPengumumanModal()

### Community 49 - "openModalTelaahKonversi"
Cohesion: 0.67
Nodes (3): closeModalTelaahKonversi(), kunciKonversiIndividu(), openModalTelaahKonversi()

### Community 66 - "renderProdiAnnouncements"
Cohesion: 0.40
Nodes (5): changeAnnPage(), clearAnnSearch(), handleAnnCategoryChange(), handleAnnSearch(), renderProdiAnnouncements()

### Community 72 - "showHero"
Cohesion: 0.60
Nodes (5): heroNext(), heroPrev(), paintHeroDots(), showHero(), startHero()

### Community 73 - "programs.ts"
Cohesion: 0.40
Nodes (3): categoriesData, programsData, Program

### Community 74 - "showKontributorDetail"
Cohesion: 0.50
Nodes (4): renderRelasiDospemMahasiswa(), showKontributorDetail(), switchKontributorDetailTab(), switchKontributorTab()

### Community 75 - "openNewsDetail"
Cohesion: 0.50
Nodes (4): goNews(), openNewsDetail(), renderNews(), swapImg()

### Community 76 - "Badge.astro"
Cohesion: 0.50
Nodes (3): dotColors, sizeStyles, variantStyles

### Community 77 - "shareArticle"
Cohesion: 0.67
Nodes (3): copyText(), shareArticle(), showToast()

## Ambiguous Edges - Review These
- `22 Komponen Modal Atomik (src/components/admin/modals/)` → `public/admin/_controller.js (6.023 baris monolitik)`  [AMBIGUOUS]
  .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md · relation: shares_data_with

## Knowledge Gaps
- **187 isolated node(s):** `name`, `type`, `version`, `node`, `dev` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 437 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `22 Komponen Modal Atomik (src/components/admin/modals/)` and `public/admin/_controller.js (6.023 baris monolitik)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._
- **Why does `TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase` connect `Modals.astro` to `admin/_controller.js`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `ModalKontributorAdmin.astro` connect `Modals.astro` to `KontributorShell.astro`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `[]` connect `index.ts` to `KontributorCms.astro`, `Badge.astro`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin/_controller.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03076923076923077 - nodes in this community are weakly interconnected._
- **Should `Golden Flow MBKM (6 Fase)` be split into smaller, more focused modules?**
  _Cohesion score 0.05336538461538461 - nodes in this community are weakly interconnected._