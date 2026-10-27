# Graph Report - fakultas-prototype  (2026-10-27)

## Corpus Check
- 210 files · ~172,000 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .css 2, (none) 1, .ico 1)

## Summary
- 989 nodes · 1439 edges · 72 communities (48 shown, 24 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.82)
- Token cost: 322,416 input · 0 output

## Community Hubs (Navigation)
- Admin Controller: Modal & Assignment
- MBKM Spec: Flow & State Machine
- Admin Shell & Dashboard Cards
- CLAUDE.md: Refactor Discipline Rules
- Astro Refactor Tickets: Modals & Sidang
- Kontributor Shell & CMS Pages
- Public Controller: Shared UI Handlers
- Mahasiswa Controller: Logbook & Katalog
- Astro Refactor Tickets: Layout & Landing
- Types & Badge Components
- Mahasiswa Shell: Logbook & Sidang
- Detail MBKM Tab Sections
- Pendaftaran: Tab Form Sections
- Pengumuman: Types & Mock Data
- Dashboard Pages: Laporan & Aktivitas
- Admin Controller: Program CMS
- Pengumuman Page Module
- Seleksi Pelamar Page
- package.json Dependencies
- Admin Controller: Kategori & Showcase
- _mock-data.js Fixtures
- Admin Controller: Program & Koordinator
- Anggota Page Module
- Admin Controller: Custom Field & Surekom
- Admin Controller: Validasi Surekom
- Admin Controller: Pelamar Table
- Layout & Sidebar Navigation
- UI Primitives: Button & Modal
- _controller module
- _controller module
- RoleSwitcher module
- showcase-carousel module
- _controller module
- _controller module
- login module
- package module
- _controller module
- _controller module
- _controller module
- _controller module
- package module
- package module
- tsconfig module
- TabInfoSyarat module
- stepper module
- vercel module
- _controller module
- _controller module
- Card module
- StatCard module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _controller module
- _mock-data module
- _mock-data module

## God Nodes (most connected - your core abstractions)
1. `switchTab()` - 25 edges
2. `initApp()` - 15 edges
3. `renderPelamarTable()` - 15 edges
4. `renderPelamarTable()` - 14 edges
5. `Golden Flow MBKM (6 Fase)` - 13 edges
6. `renderSurekomTable()` - 12 edges
7. `showToast()` - 12 edges
8. `kpgRender()` - 12 edges
9. `renderPengumumanCards()` - 11 edges
10. `Issue 07: Verifikasi Integrasi Global & Audit Build` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Thin Page Orchestrator Pattern` --semantically_similar_to--> `Modal Barrel Registry (< 40 baris)`  [INFERRED] [semantically similar]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md
- `Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)` --conceptually_related_to--> `LandingProgramStudi.astro (1.722 baris, melebihi batas ideal)`  [INFERRED]
  CLAUDE.md → .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md
- `Issue 01: Dekomposisi Admin Modals ke Komponen Atomik` --implements--> `Batas Ukuran Berkas Ideal (150-200 komponen, 100 halaman, 250-300 skrip)`  [INFERRED]
  .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md → CLAUDE.md
- `22 Komponen Modal Atomik (src/components/admin/modals/)` --semantically_similar_to--> `StepIdentitas / StepDokumen / StepKonfirmasi`  [INFERRED] [semantically similar]
  .scratch/ideal-lines-refactor/issues/01-dekomposisi-admin-modals.md → .scratch/ideal-lines-refactor/issues/02-dekomposisi-pendaftaran-mahasiswa.md
- `LandingNavbar / Hero / BeritaKegiatan / SambutanDekan / ProgramStudi / Footer` --semantically_similar_to--> `DetailHero / About / Timeline / Showcase / Faq / Footer`  [INFERRED] [semantically similar]
  .scratch/ideal-lines-refactor/issues/05-dekomposisi-landing-page.md → .scratch/ideal-lines-refactor/issues/03-dekomposisi-detail-mbkm.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Program Refactor Ideal Lines (Issue 00-07)** — scratch_ideal_lines_refactor_issues_00_setup_helper_styling_dan_utility_issue_00, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_issue_01, scratch_ideal_lines_refactor_issues_02_dekomposisi_pendaftaran_mahasiswa_issue_02, scratch_ideal_lines_refactor_issues_03_dekomposisi_detail_mbkm_issue_03, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_issue_04, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_issue_05, scratch_ideal_lines_refactor_issues_06_modularisasi_controller_admin_issue_06, scratch_ideal_lines_refactor_issues_07_verifikasi_integrasi_dan_audit_build_issue_07 [EXTRACTED 1.00]
- **Pola Dekomposisi: Halaman Ramping + Subkomponen Atomik + cn() Utility** — scratch_ideal_lines_refactor_issues_00_setup_helper_styling_dan_utility_cn_utility, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_modal_registry_barrel, scratch_ideal_lines_refactor_issues_02_dekomposisi_pendaftaran_mahasiswa_pendaftaran_page, scratch_ideal_lines_refactor_issues_03_dekomposisi_detail_mbkm_detail_page, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_apps_page, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_index_page [INFERRED 0.85]
- **Kontrak DOM & Visual: id, name, listener, data-pencil-name** — claude_dom_contract_preservation, scratch_ideal_lines_refactor_issues_04_dekomposisi_apps_portal_data_pencil_name, scratch_ideal_lines_refactor_issues_01_dekomposisi_admin_modals_modal_atomic_components, scratch_ideal_lines_refactor_issues_05_dekomposisi_landing_page_landing_sections, scratch_ideal_lines_refactor_issues_06_modularisasi_controller_admin_alpine_store_mbkm [EXTRACTED 1.00]
- **Program Dekomposisi Modals Admin (04-07) menuju Modals.astro sebagai Agregator** — scratch_modular_astro_refactor_issues_04_split_admin_modals_pengumuman_kontributor_ticket_04, scratch_modular_astro_refactor_issues_05_split_admin_modals_pelamar_pendaftaran_ticket_05, scratch_modular_astro_refactor_issues_06_split_admin_modals_program_surekom_ticket_06, scratch_modular_astro_refactor_issues_07_split_admin_modals_konversi_sidang_kuota_ticket_07, scratch_modular_astro_refactor_issues_07_split_admin_modals_konversi_sidang_kuota_modals_aggregator [EXTRACTED 1.00]
- **Pola Reuse Global Layout (Navbar/Footer) Lintas Halaman Publik** — scratch_modular_astro_refactor_issues_01_extract_global_layout_globalnavbar, scratch_modular_astro_refactor_issues_01_extract_global_layout_globalfooter, scratch_modular_astro_refactor_issues_02_decouple_detail_mbkm_ticket_02, scratch_modular_astro_refactor_issues_10_decouple_landing_page_ticket_10 [EXTRACTED 1.00]
- **Pola Orkestrator Halaman di Bawah Batas Baris dengan Sub-Komponen Domain** — scratch_modular_astro_refactor_issues_02_decouple_detail_mbkm_ticket_02, scratch_modular_astro_refactor_issues_03_modularize_pendaftaran_mahasiswa_ticket_03, scratch_modular_astro_refactor_issues_08_decouple_mahasiswa_sidang_ticket_08, scratch_modular_astro_refactor_issues_09_modularize_admin_kontributor_shells_ticket_09, scratch_modular_astro_refactor_issues_10_decouple_landing_page_ticket_10 [INFERRED 0.85]
- **Pakta Integritas Lifecycle (General Consent -> Generated PDF -> Revision -> Approved)** — docs_spec_readme_dualitas_pakta, docs_spec_01_flow_mbkm_dualitas_pakta_integritas, docs_spec_02_state_machine_mbkm_pakta_revision, docs_spec_02_state_machine_mbkm_non_destructive_revision, docs_spec_04_standar_komponen_dan_interaksi_pakta_generator, docs_spec_04_standar_komponen_dan_interaksi_pakta_alur_frontend [INFERRED 0.95]
- **Gatekeeper KRS -> Dospem Assignment -> Mandatory WAG Channel** — docs_spec_01_flow_mbkm_gatekeeper_krs_sebelum_plotting, docs_spec_02_state_machine_mbkm_krs_locked_verified, docs_spec_02_state_machine_mbkm_zero_ghost_tutoring, docs_spec_02_state_machine_mbkm_dospem_assigned, docs_spec_02_state_machine_mbkm_mandatory_communication_channel, docs_spec_03_antarmuka_dan_navigasi_role_kartu_dospem_dashboard, docs_spec_03_antarmuka_dan_navigasi_role_komponen_grup_whatsapp [INFERRED 0.90]
- **Sidang Evaluasi: Single Menu, Dual Tab, Dual Examiner Scoring** — docs_spec_03_antarmuka_dan_navigasi_role_sidang_evaluasi_dual_tab, docs_spec_03_antarmuka_dan_navigasi_role_tab_pengajuan_sidang, docs_spec_03_antarmuka_dan_navigasi_role_tab_jadwal_hasil_sidang, docs_spec_03_antarmuka_dan_navigasi_role_bobot_penilaian_sidang, docs_spec_01_flow_mbkm_mahasiswa_role_journey, docs_spec_02_state_machine_mbkm_completed [INFERRED 0.85]

## Communities (72 total, 24 thin omitted)

### Community 0 - "Admin Controller: Modal & Assignment"
Cohesion: 0.03
Nodes (3): assignSelectedPrograms, countdownTarget, currentWorkflow

### Community 1 - "MBKM Spec: Flow & State Machine"
Cohesion: 0.05
Nodes (57): Active Period / Context Banner, Chronological Logbook Timeline, Color Palette & Semantic Role Tokens, Component Stylings (Buttons, Cards, Navigation, Inputs), Design System: Enterprise Academic & Workflow Workspace, Filterable Data Table & Toolbar, KPI Stat Cards, Layout Principles (App Shell, 4px Scale, Breakpoints) (+49 more)

### Community 2 - "Admin Shell & Dashboard Cards"
Cohesion: 0.04
Nodes (17): Props, ActivityItem, dotColors, Props, Props, variants, Props, QuickActionItem (+9 more)

### Community 3 - "CLAUDE.md: Refactor Discipline Rules"
Cohesion: 0.07
Nodes (34): astro dev --background Workflow, AGENTS.md: Astro Development Guide, Astro Documentation Reference Set (routing, components, styling, i18n), CLAUDE.md: Panduan Pengembangan Prototipe MBKM, Persona Peran: Koordinator MBKM, Kontributor/Mitra, Dosen Pembimbing, Mahasiswa, Issue 00: Setup Helper Styling Komponen & Utilitas Tailwind, Styling Dependencies: clsx, tailwind-merge, class-variance-authority, Issue 01: Dekomposisi Admin Modals ke Komponen Atomik (+26 more)

### Community 4 - "Astro Refactor Tickets: Modals & Sidang"
Cohesion: 0.05
Nodes (20): ModalKontributorAdmin.astro, ModalPengumuman.astro, ModalShowcase.astro, TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase, ModalCustomField.astro, ModalPelamarAdmin.astro, TICKET-05: Dekomposisi Admin Modals - Pelamar & Pratinjau Pendaftaran, ModalMasterProgram.astro (+12 more)

### Community 5 - "Kontributor Shell & CMS Pages"
Cohesion: 0.07
Nodes (24): breadcrumbNames, closeAddDosenModal(), closeDirectAssignModal(), fileMap, handleAddDosenSubmit(), handleDirectAssignSubmit(), handleSaveProgramOperasional(), hideToast() (+16 more)

### Community 6 - "Public Controller: Shared UI Handlers"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 7 - "Mahasiswa Controller: Logbook & Katalog"
Cohesion: 0.07
Nodes (12): closeLogbookModal(), handleFormSubmit(), handleLogbookSubmit(), setCardStatus(), setEligibility(), setTrackingStatus(), setupDropdowns(), setupRouting() (+4 more)

### Community 8 - "Astro Refactor Tickets: Layout & Landing"
Cohesion: 0.09
Nodes (19): GlobalFooter.astro, GlobalNavbar.astro, TICKET-01: Ekstraksi Komponen Global Navbar dan Footer UDINUS, TICKET-02: Dekomposisi Halaman Detail MBKM ke Komponen Domain Modular, src/scripts/pendaftaran-stepper.js, TICKET-03: Modularisasi Multi-Step Form Pendaftaran Mahasiswa, MobileDrawer.astro (Shell), SidebarNav.astro (+11 more)

### Community 9 - "Types & Badge Components"
Cohesion: 0.07
Nodes (22): tabs, dotColors, Props, sizeStyles, variantStyles, Props, applicantsData, recommendationsData (+14 more)

### Community 10 - "Mahasiswa Shell: Logbook & Sidang"
Cohesion: 0.08
Nodes (11): Props, closePendaftaranForm(), openPendaftaranForm(), savePendaftaran(), switchFormTab(), closeFolderModal(), closeTambahModal(), handleFolderSubmit() (+3 more)

### Community 11 - "Detail MBKM Tab Sections"
Cohesion: 0.08
Nodes (17): dokumenList, durasiOptions, Props, semesterOptions, defaultFaqs, hapusFaq(), Props, tambahFaq() (+9 more)

### Community 12 - "Pendaftaran: Tab Form Sections"
Cohesion: 0.08
Nodes (14): defaultDocs, hapusDocItem(), inputTypes, Props, updateAllDocNumbers(), defaultFields, hapusFieldItem(), inputTypes (+6 more)

### Community 13 - "Pengumuman: Types & Mock Data"
Cohesion: 0.11
Nodes (24): DOSEN_PROFILE, MOCK_JADWAL_SIDANG, MOCK_LOG_AKTIVITAS_DOSEN, MOCK_LOGBOOK_MINGGUAN, MOCK_MAHASISWA_BINAAN, MOCK_PENGAJUAN_SIDANG, MOCK_PENGUMUMAN_DOSEN, DosenProfile (+16 more)

### Community 14 - "Dashboard Pages: Laporan & Aktivitas"
Cohesion: 0.07
Nodes (17): Props, cardKuotaData, groupedActivities, kuotaData, logbookBabs, studentsMap, students, studentsJson (+9 more)

### Community 15 - "Admin Controller: Program CMS"
Cohesion: 0.11
Nodes (23): closeProgramCms(), goToPage(), handleProgramSubmit(), hideKontributorDetail(), hideLogbookDetail(), hideSubviews(), init(), refreshIcons() (+15 more)

### Community 16 - "Pengumuman Page Module"
Cohesion: 0.19
Nodes (19): kpgCloseDelete(), kpgCloseModal(), kpgConfirmDelete(), kpgEsc(), kpgFiltered(), kpgFmtDate(), kpgGoto(), kpgIcons() (+11 more)

### Community 17 - "Seleksi Pelamar Page"
Cohesion: 0.21
Nodes (17): getFilteredPelamarData(), goToPelamarPage(), handleFilterPelamarKontributor(), handleFilterPelamarProdi(), handleSearchPelamar(), handleSortPendaftar(), lihatTranskripPelamar(), pelamarInit() (+9 more)

### Community 18 - "package.json Dependencies"
Cohesion: 0.14
Nodes (18): dependencies, alpinejs@^3.17.4, class-variance-authority@^0.7.1, clsx@^2.1.1, tailwind-merge@^3.7.0, tailwindcss@^4.3.3, @types/alpinejs@^3.17.0, engines (+10 more)

### Community 19 - "Admin Controller: Kategori & Showcase"
Cohesion: 0.12
Nodes (19): closeKategoriModal(), closeShowcaseModal(), filterKategoriTable(), getFilteredLogbookData(), goToKategoriPage(), goToLogbookPage(), handleDeleteKategori(), handleDeleteShowcase() (+11 more)

### Community 20 - "_mock-data.js Fixtures"
Cohesion: 0.11
Nodes (18): formPendaftaranConfig, kategoriData, kontributorCmsDataMap, kontributorListData, koordinatorData, laporanListData, logbookListData, masterKontributorList (+10 more)

### Community 21 - "Admin Controller: Program & Koordinator"
Cohesion: 0.17
Nodes (16): closeAssignProgramModal(), closeKoordinatorModal(), confirmDeleteProgram(), getProgramsForKoordinator(), goToKoordinatorPage(), goToProgramPage(), handleDeleteKoordinator(), handleFilterKoordinatorProdi() (+8 more)

### Community 22 - "Anggota Page Module"
Cohesion: 0.27
Nodes (12): kagCard(), kagDate(), kagEsc(), kagField(), kagInit(), kagInitials(), kagKey(), kagOpenProfile() (+4 more)

### Community 23 - "Admin Controller: Custom Field & Surekom"
Cohesion: 0.20
Nodes (12): closeTambahCustomFieldModal(), handleSimpanCustomField(), hapusCustomField(), insertSurekomTag(), renderCustomFieldsContainer(), renderFormPendaftaranUI(), resetSurekomTemplate(), toggleDocActive() (+4 more)

### Community 24 - "Admin Controller: Validasi Surekom"
Cohesion: 0.20
Nodes (12): closeValidasiSurekomModal(), getFilteredSurekomData(), goToSurekomPage(), handleFilterSurekomProdi(), handleFilterSurekomProgram(), handleFilterSurekomStatus(), handleSearchSurekom(), hideSurekomDetail() (+4 more)

### Community 25 - "Admin Controller: Pelamar Table"
Cohesion: 0.18
Nodes (12): getFilteredPelamarData(), goToPelamarPage(), handleFilterPelamarKontributor(), handleFilterPelamarProdi(), handleSearchPelamar(), handleSortPendaftar(), renderPelamarTable(), switchPendaftarStatusTab() (+4 more)

### Community 26 - "Layout & Sidebar Navigation"
Cohesion: 0.18
Nodes (7): iconMap, Props, navigationMenus, NavItem, RoleNavConfig, Props, Props

### Community 27 - "UI Primitives: Button & Modal"
Cohesion: 0.18
Nodes (7): Props, Props, Props, sizeStyles, variantStyles, maxWidthStyles, Props

### Community 28 - "_controller module"
Cohesion: 0.20
Nodes (11): closeBuatPengumumanModal(), closeDeletePengumumanModal(), confirmDeletePengumuman(), getFilteredPengumumanData(), goToPengumumanPage(), handleFilterPengumumanSasaran(), handleFilterPengumumanStatus(), handleSavePengumuman() (+3 more)

### Community 29 - "_controller module"
Cohesion: 0.22
Nodes (10): closeTambahKontributorModal(), getFilteredKontributorData(), goToKontributorPage(), handleSaveKontributor(), handleSearchKontributor(), handleSubmitTambahKontributor(), renderKontributorTable(), switchKontributorCategoryTab() (+2 more)

### Community 30 - "RoleSwitcher module"
Cohesion: 0.22
Nodes (6): lucide-astro@^0.556.0, lucide-astro, Props, roles, Props, userProfiles

### Community 31 - "showcase-carousel module"
Cohesion: 0.44
Nodes (8): initShowcaseCarousel(), buildDots(), goTo(), render(), restartAutoplay(), startAutoplay(), stopAutoplay(), updateGlow()

### Community 32 - "_controller module"
Cohesion: 0.25
Nodes (8): addFileField(), addStageCard(), handleKategoriChange(), loadWorkflowPreset(), removeFileField(), removeStageCard(), renderWorkflowStages(), updatePresetButtonsUI()

### Community 33 - "_controller module"
Cohesion: 0.29
Nodes (8): closeEditPeriodeModal(), getFilteredPeriodeData(), goToPeriodePage(), handleFilterPeriodeStatus(), handlePeriodePerPageChange(), handleSaveEditPeriode(), handleSyncPeriodeData(), renderPeriodeData()

### Community 35 - "login module"
Cohesion: 0.29
Nodes (4): DEMO_ACCOUNTS, UserAccount, ACCOUNTS, quotes

### Community 36 - "package module"
Cohesion: 0.29
Nodes (6): astro@^7.4.0, @astrojs/alpinejs@^1.0.0, @tailwindcss/vite@^4.3.3, astro, @astrojs/alpinejs, @tailwindcss/vite

### Community 37 - "_controller module"
Cohesion: 0.33
Nodes (6): buildSuratRekomendasiText(), bukaPratinjauDrafDoc(), handleModalSurekomDecisionChange(), openValidasiSurekomModal(), showSurekomDetailById(), viewSurekomDoc()

### Community 38 - "_controller module"
Cohesion: 0.40
Nodes (6): changeLaporanItemsPerPage(), getFilteredLaporanData(), goToLaporanPage(), handleSearchLaporan(), renderLaporanPaginationControls(), renderLaporanTable()

### Community 39 - "_controller module"
Cohesion: 0.40
Nodes (6): getFilteredSemuaMhsData(), goToSemuaMhsPage(), handleFilterSemuaMhsKontributor(), handleFilterSemuaMhsProdi(), handleSearchSemuaMhs(), renderSemuaMhsTable()

### Community 40 - "_controller module"
Cohesion: 0.33
Nodes (6): handleAssignProgramSearch(), handleSelectAllPrograms(), handleToggleProgramCheck(), renderAssignProgramList(), showAssignProgramModal(), updateAssignSelectedCount()

### Community 42 - "package module"
Cohesion: 0.40
Nodes (5): devDependencies, @astrojs/check@^0.9.11, typescript@^6.0.3, @astrojs/check, typescript

### Community 43 - "package module"
Cohesion: 0.40
Nodes (5): scripts, astro, build, dev, preview

### Community 44 - "tsconfig module"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 45 - "TabInfoSyarat module"
Cohesion: 0.40
Nodes (4): dokumenList, durasiOptions, Props, semesterOptions

### Community 46 - "stepper module"
Cohesion: 0.50
Nodes (4): initRegistrationStepper(), goToStep(), renderAttachments(), updateNavigation()

### Community 47 - "vercel module"
Cohesion: 0.50
Nodes (3): cleanUrls, ignoreCommand, rewrites

### Community 48 - "_controller module"
Cohesion: 0.67
Nodes (3): closeDetailPengumumanModal(), showBuatPengumumanModal(), showDetailPengumumanModal()

### Community 49 - "_controller module"
Cohesion: 0.67
Nodes (3): closeModalTelaahKonversi(), kunciKonversiIndividu(), openModalTelaahKonversi()

## Ambiguous Edges - Review These
- `22 Komponen Modal Atomik (src/components/admin/modals/)` → `public/admin/_controller.js (6.023 baris monolitik)`  [AMBIGUOUS]
  .scratch/ideal-lines-refactor/issues/06-modularisasi-controller-admin.md · relation: shares_data_with

## Knowledge Gaps
- **23 isolated node(s):** `astro/tsconfigs/strict`, `Styling Dependencies: clsx, tailwind-merge, class-variance-authority`, `Astro Documentation Reference Set (routing, components, styling, i18n)`, `ModalShowcase.astro`, `ModalCustomField.astro` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 422 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TICKET-04: Dekomposisi Admin Modals - Pengumuman, Kontributor, & Showcase` connect `Astro Refactor Tickets: Modals & Sidang` to `Admin Controller: Modal & Assignment`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **What connects `astro/tsconfigs/strict`, `Styling Dependencies: clsx, tailwind-merge, class-variance-authority`, `Astro Documentation Reference Set (routing, components, styling, i18n)` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Controller: Modal & Assignment` be split into smaller, more focused modules?**
  _Cohesion score 0.029411764705882353 - nodes in this community are weakly interconnected._
- **Why does `ModalKontributorAdmin.astro` connect `Astro Refactor Tickets: Modals & Sidang` to `Kontributor Shell & CMS Pages`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Should `MBKM Spec: Flow & State Machine` be split into smaller, more focused modules?**
  _Cohesion score 0.051923076923076926 - nodes in this community are weakly interconnected._
- **Why does `ModalPelamarAdmin.astro` connect `Astro Refactor Tickets: Modals & Sidang` to `Admin Controller: Modal & Assignment`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `22 Komponen Modal Atomik (src/components/admin/modals/)` and `public/admin/_controller.js (6.023 baris monolitik)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._