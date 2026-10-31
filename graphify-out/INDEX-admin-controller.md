# Index Baris: public/admin/_controller.js

File: `public/admin/_controller.js` — 6.062 baris, 249 simbol terpetakan graphify.

Dibuat otomatis dari `graphify-out/graph.json`. Setiap baris = `L<n>` yang bisa
dilompati langsung (konvensi sama dengan permalink GitHub `#L231`).

## Simbol per Baris

| L | Simbol | Memanggil (L) |
|---|---|---|
| L1 | `admin/_controller.js` | — |
| L19 | `currentSection()` | — |
| L27 | `activeMeta()` | — |
| L37 | `switchTab()` | toggleMbkmSubmenu()(L266), toggleMahasiswaSubmenu()(L64), toggleDosenSubmenu()(L69), toggleSidangSubmenu()(L280), updateBreadcrumb()(L323), hideSubviews()(L988) +15 |
| L64 | `toggleMahasiswaSubmenu()` | refreshIcons()(L81) |
| L69 | `toggleDosenSubmenu()` | refreshIcons()(L81) |
| L74 | `toggleSidebar()` | — |
| L81 | `refreshIcons()` | — |
| L92 | `init()` | refreshIcons()(L81) |
| L146 | `isAktif()` | — |
| L151 | `setStatus()` | — |
| L174 | `filteredPrograms()` | — |
| L187 | `totalPages()` | — |
| L191 | `startIndex()` | — |
| L195 | `paginatedPrograms()` | — |
| L200 | `goToPage()` | refreshIcons()(L81) |
| L207 | `showEdit()` | refreshIcons()(L81) |
| L222 | `showList()` | refreshIcons()(L81) |
| L227 | `showKategori()` | refreshIcons()(L81) |
| L266 | `toggleMbkmSubmenu()` | — |
| L280 | `toggleSidangSubmenu()` | — |
| L323 | `updateBreadcrumb()` | — |
| L537 | `currentWorkflow` | — |
| L540 | `updatePresetButtonsUI()` | — |
| L563 | `loadWorkflowPreset()` | updatePresetButtonsUI()(L540), renderWorkflowStages()(L591) |
| L571 | `handleKategoriChange()` | loadWorkflowPreset()(L563) |
| L591 | `renderWorkflowStages()` | — |
| L659 | `addStageCard()` | renderWorkflowStages()(L591) |
| L673 | `removeStageCard()` | renderWorkflowStages()(L591) |
| L682 | `updateStageName()` | — |
| L686 | `addFileField()` | renderWorkflowStages()(L591) |
| L699 | `removeFileField()` | renderWorkflowStages()(L591) |
| L704 | `updateFileLabel()` | — |
| L710 | `toggleFileRequired()` | — |
| L716 | `saveAsTemplate()` | — |
| L726 | `handleSearchProgram()` | renderProgramTable()(L737) |
| L732 | `goToProgramPage()` | renderProgramTable()(L737) |
| L737 | `renderProgramTable()` | — |
| L886 | `showProgramEdit()` | — |
| L931 | `toggleProgramSubmenu()` | — |
| L946 | `updateProgramSubmenuActive()` | — |
| L959 | `showProgramListView()` | switchTab()(L37), updateProgramSubmenuActive()(L946), updateBreadcrumb()(L323) |
| L973 | `showKategoriManagementView()` | switchTab()(L37), updateProgramSubmenuActive()(L946), updateBreadcrumb()(L323), renderKategoriTable()(L1077) |
| L988 | `hideSubviews()` | updateProgramSubmenuActive()(L946) |
| L998 | `handleProgramSubmit()` | renderProgramTable()(L737), hideSubviews()(L988) |
| L1032 | `confirmDeleteProgram()` | renderProgramTable()(L737) |
| L1041 | `stepIpk()` | — |
| L1050 | `stepKuota()` | — |
| L1066 | `filterKategoriTable()` | renderKategoriTable()(L1077) |
| L1072 | `goToKategoriPage()` | renderKategoriTable()(L1077) |
| L1077 | `renderKategoriTable()` | — |
| L1269 | `showAddKategoriModal()` | — |
| L1279 | `showEditKategoriModal()` | — |
| L1291 | `closeKategoriModal()` | — |
| L1295 | `handleSaveKategori()` | closeKategoriModal()(L1291), renderKategoriTable()(L1077), populateProgramKategoriDropdown()(L1912) |
| L1321 | `handleDeleteKategori()` | renderKategoriTable()(L1077), populateProgramKategoriDropdown()(L1912) |
| L1344 | `getProgramsForKoordinator()` | — |
| L1349 | `handleSearchKoordinator()` | renderKoordinatorTable()(L1366) |
| L1355 | `handleFilterKoordinatorProdi()` | renderKoordinatorTable()(L1366) |
| L1361 | `goToKoordinatorPage()` | renderKoordinatorTable()(L1366) |
| L1366 | `renderKoordinatorTable()` | getProgramsForKoordinator()(L1344), renderDashboardKoordinatorWidget()(L1590) |
| L1575 | `handleDashboardSksChange()` | — |
| L1590 | `renderDashboardKoordinatorWidget()` | getProgramsForKoordinator()(L1344) |
| L1609 | `showAddKoordinatorModal()` | — |
| L1620 | `showEditKoordinatorModal()` | — |
| L1634 | `closeKoordinatorModal()` | — |
| L1638 | `handleSaveKoordinator()` | renderProgramTable()(L737), closeKoordinatorModal()(L1634), renderKoordinatorTable()(L1366), populateProgramDosenDropdown()(L1890) |
| L1691 | `handleDeleteKoordinator()` | getProgramsForKoordinator()(L1344), renderKoordinatorTable()(L1366), renderProgramTable()(L737), populateProgramDosenDropdown()(L1890) |
| L1721 | `assignSelectedPrograms` | — |
| L1724 | `showAssignProgramModal()` | renderAssignProgramList()(L1797) |
| L1750 | `closeAssignProgramModal()` | — |
| L1755 | `handleAssignProgramSearch()` | renderAssignProgramList()(L1797) |
| L1760 | `handleToggleProgramCheck()` | updateAssignSelectedCount()(L1790) |
| L1769 | `handleSelectAllPrograms()` | renderAssignProgramList()(L1797) |
| L1790 | `updateAssignSelectedCount()` | — |
| L1797 | `renderAssignProgramList()` | updateAssignSelectedCount()(L1790) |
| L1865 | `handleSaveProgramAssignment()` | closeAssignProgramModal()(L1750), renderKoordinatorTable()(L1366), renderProgramTable()(L737) |
| L1890 | `populateProgramDosenDropdown()` | — |
| L1912 | `populateProgramKategoriDropdown()` | — |
| L1954 | `handleSearchSurekom()` | renderSurekomTable()(L2003) |
| L1960 | `handleFilterSurekomStatus()` | renderSurekomTable()(L2003) |
| L1966 | `handleFilterSurekomProgram()` | renderSurekomTable()(L2003) |
| L1972 | `handleFilterSurekomProdi()` | renderSurekomTable()(L2003) |
| L1978 | `getFilteredSurekomData()` | — |
| L2003 | `renderSurekomTable()` | getFilteredSurekomData()(L1978), renderSurekomPaginationControls()(L2107) |
| L2107 | `renderSurekomPaginationControls()` | — |
| L2154 | `goToSurekomPage()` | getFilteredSurekomData()(L1978), renderSurekomTable()(L2003) |
| L2162 | `openValidasiSurekomModal()` | buildSuratRekomendasiText()(L2333), handleModalSurekomDecisionChange()(L2216) |
| L2210 | `closeValidasiSurekomModal()` | — |
| L2216 | `handleModalSurekomDecisionChange()` | — |
| L2275 | `submitValidasiSurekomWithDecision()` | closeValidasiSurekomModal()(L2210), renderSurekomTable()(L2003) |
| L2301 | `submitValidasiSurekomFromModal()` | closeValidasiSurekomModal()(L2210), renderSurekomTable()(L2003) |
| L2333 | `buildSuratRekomendasiText()` | — |
| L2362 | `bukaPratinjauDrafDoc()` | buildSuratRekomendasiText()(L2333), viewSurekomDoc()(L2382) |
| L2370 | `showSurekomDetailById()` | openValidasiSurekomModal()(L2162) |
| L2374 | `showSurekomDetail()` | — |
| L2378 | `hideSurekomDetail()` | closeValidasiSurekomModal()(L2210) |
| L2382 | `viewSurekomDoc()` | — |
| L2394 | `closeSurekomDocModal()` | — |
| L2404 | `handleSearchLogbook()` | renderLogbookTable()(L2419) |
| L2410 | `getFilteredLogbookData()` | — |
| L2419 | `renderLogbookTable()` | getFilteredLogbookData()(L2410), renderLogbookPaginationControls()(L2482) |
| L2482 | `renderLogbookPaginationControls()` | — |
| L2527 | `goToLogbookPage()` | getFilteredLogbookData()(L2410), renderLogbookTable()(L2419) |
| L2540 | `handleSearchLaporan()` | renderLaporanTable()(L2555) |
| L2546 | `getFilteredLaporanData()` | — |
| L2555 | `renderLaporanTable()` | getFilteredLaporanData()(L2546), renderLaporanPaginationControls()(L2619) |
| L2619 | `renderLaporanPaginationControls()` | — |
| L2682 | `changeLaporanItemsPerPage()` | renderLaporanTable()(L2555) |
| L2688 | `goToLaporanPage()` | getFilteredLaporanData()(L2546), renderLaporanTable()(L2555) |
| L2699 | `showLogbookDetail()` | — |
| L2710 | `hideLogbookDetail()` | — |
| L2725 | `countdownTarget` | — |
| L2730 | `updateCountdownTimer()` | — |
| L2766 | `handleSearchPengumuman()` | renderPengumumanCards()(L2799) |
| L2772 | `handleFilterPengumumanSasaran()` | renderPengumumanCards()(L2799) |
| L2778 | `handleFilterPengumumanStatus()` | renderPengumumanCards()(L2799) |
| L2784 | `getFilteredPengumumanData()` | — |
| L2799 | `renderPengumumanCards()` | getFilteredPengumumanData()(L2784) |
| L2961 | `goToPengumumanPage()` | getFilteredPengumumanData()(L2784), renderPengumumanCards()(L2799) |
| L2968 | `showDetailPengumumanModal()` | closeDetailPengumumanModal()(L3030), showBuatPengumumanModal()(L3035) |
| L3030 | `closeDetailPengumumanModal()` | — |
| L3035 | `showBuatPengumumanModal()` | — |
| L3070 | `closeBuatPengumumanModal()` | — |
| L3075 | `handleSavePengumuman()` | closeBuatPengumumanModal()(L3070), renderPengumumanCards()(L2799) |
| L3127 | `toggleArchivePengumuman()` | renderPengumumanCards()(L2799) |
| L3136 | `showDeletePengumumanModal()` | — |
| L3152 | `closeDeletePengumumanModal()` | — |
| L3158 | `confirmDeletePengumuman()` | closeDeletePengumumanModal()(L3152), renderPengumumanCards()(L2799) |
| L3172 | `handleFilterPeriodeStatus()` | renderPeriodeData()(L3191) |
| L3178 | `handlePeriodePerPageChange()` | renderPeriodeData()(L3191) |
| L3184 | `getFilteredPeriodeData()` | — |
| L3191 | `renderPeriodeData()` | getFilteredPeriodeData()(L3184) |
| L3369 | `goToPeriodePage()` | getFilteredPeriodeData()(L3184), renderPeriodeData()(L3191) |
| L3376 | `handleSyncPeriodeData()` | renderPeriodeData()(L3191) |
| L3394 | `showEditPeriodeModal()` | — |
| L3413 | `closeEditPeriodeModal()` | — |
| L3419 | `handleSaveEditPeriode()` | closeEditPeriodeModal()(L3413), renderPeriodeData()(L3191) |
| L3461 | `switchFormTab()` | — |
| L3493 | `renderFormPendaftaranUI()` | updateFormToggleVisual()(L3564), renderCustomFieldsContainer()(L3636) |
| L3564 | `updateFormToggleVisual()` | — |
| L3578 | `toggleFormSetting()` | updateFormToggleVisual()(L3564), triggerAutosave()(L3624) |
| L3584 | `toggleDocActive()` | triggerAutosave()(L3624) |
| L3603 | `toggleDocRequired()` | triggerAutosave()(L3624) |
| L3624 | `triggerAutosave()` | — |
| L3636 | `renderCustomFieldsContainer()` | — |
| L3700 | `showTambahCustomFieldModal()` | — |
| L3708 | `closeTambahCustomFieldModal()` | — |
| L3713 | `handleSimpanCustomField()` | closeTambahCustomFieldModal()(L3708), renderCustomFieldsContainer()(L3636), triggerAutosave()(L3624) |
| L3739 | `hapusCustomField()` | renderCustomFieldsContainer()(L3636), triggerAutosave()(L3624) |
| L3745 | `insertSurekomTag()` | triggerAutosave()(L3624) |
| L3757 | `resetSurekomTemplate()` | triggerAutosave()(L3624) |
| L3765 | `openPreviewMahasiswaModal()` | switchPreviewStep()(L3870) |
| L3865 | `closePreviewMahasiswaModal()` | — |
| L3870 | `switchPreviewStep()` | — |
| L3906 | `handleSearchKontributor()` | renderKontributorTable()(L3954) |
| L3912 | `switchKontributorCategoryTab()` | renderKontributorTable()(L3954) |
| L3931 | `updateKontributorCategoryBadges()` | — |
| L3940 | `getFilteredKontributorData()` | — |
| L3954 | `renderKontributorTable()` | updateKontributorCategoryBadges()(L3931), getFilteredKontributorData()(L3940) |
| L4095 | `goToKontributorPage()` | getFilteredKontributorData()(L3940), renderKontributorTable()(L3954) |
| L4102 | `toggleKontributorStatus()` | renderKontributorTable()(L3954) |
| L4114 | `openModalToggleStatusKontributor()` | — |
| L4167 | `closeModalToggleStatusKontributor()` | — |
| L4173 | `confirmToggleStatusKontributor()` | — |
| L4199 | `showTambahKontributorModal()` | handleModalKontributorTypeChange()(L4241) |
| L4236 | `closeTambahKontributorModal()` | — |
| L4241 | `handleModalKontributorTypeChange()` | — |
| L4256 | `handleSubmitTambahKontributor()` | closeTambahKontributorModal()(L4236), switchKontributorCategoryTab()(L3912) |
| L4344 | `handleSaveKontributor()` | handleSubmitTambahKontributor()(L4256) |
| L4354 | `showKontributorDetail()` | updateBreadcrumb()(L323), switchKontributorDetailTab()(L4504) |
| L4504 | `switchKontributorDetailTab()` | — |
| L4524 | `hideKontributorDetail()` | updateBreadcrumb()(L323) |
| L4539 | `switchKontributorTab()` | switchKontributorDetailTab()(L4504) |
| L4548 | `openKontributorProgram()` | — |
| L4555 | `openModalKelolaProgram()` | openKontributorProgram()(L4548) |
| L4566 | `openKontributorCms()` | — |
| L4578 | `populateKontributorCmsPage()` | renderShowcaseGrid()(L4727), switchCmsSubTab()(L4702) |
| L4681 | `openProgramCms()` | openKontributorCms()(L4566) |
| L4685 | `closeProgramCms()` | updateBreadcrumb()(L323) |
| L4702 | `switchCmsSubTab()` | — |
| L4727 | `renderShowcaseGrid()` | — |
| L4814 | `openShowcaseModal()` | — |
| L4855 | `closeShowcaseModal()` | — |
| L4860 | `handleSaveShowcase()` | closeShowcaseModal()(L4855), renderShowcaseGrid()(L4727) |
| L4896 | `handleDeleteShowcase()` | renderShowcaseGrid()(L4727) |
| L4906 | `handleSaveCmsHero()` | — |
| L4927 | `handleCmsPhotoUpload()` | — |
| L4956 | `switchPendaftarStatusTab()` | renderPelamarTable()(L5076) |
| L4976 | `switchPendaftarViewMode()` | renderPelamarTable()(L5076) |
| L4991 | `handleSortPendaftar()` | renderPelamarTable()(L5076) |
| L4996 | `handleSearchPelamar()` | renderPelamarTable()(L5076) |
| L5002 | `handleFilterPelamarKontributor()` | renderPelamarTable()(L5076) |
| L5008 | `handleFilterPelamarProdi()` | renderPelamarTable()(L5076) |
| L5014 | `updatePendaftarTabBadges()` | — |
| L5031 | `getFilteredPelamarData()` | — |
| L5076 | `renderPelamarTable()` | updatePendaftarTabBadges()(L5014), getFilteredPelamarData()(L5031) |
| L5462 | `goToPelamarPage()` | getFilteredPelamarData()(L5031), renderPelamarTable()(L5076) |
| L5469 | `terimaPelamar()` | renderPelamarTable()(L5076) |
| L5481 | `tolakPelamar()` | renderPelamarTable()(L5076) |
| L5494 | `lihatTranskripPelamar()` | — |
| L5513 | `closeTranskripModal()` | — |
| L5525 | `handleSearchSemuaMhs()` | renderSemuaMhsTable()(L5558) |
| L5531 | `handleFilterSemuaMhsKontributor()` | renderSemuaMhsTable()(L5558) |
| L5537 | `handleFilterSemuaMhsProdi()` | renderSemuaMhsTable()(L5558) |
| L5543 | `getFilteredSemuaMhsData()` | — |
| L5558 | `renderSemuaMhsTable()` | getFilteredSemuaMhsData()(L5543) |
| L5690 | `goToSemuaMhsPage()` | getFilteredSemuaMhsData()(L5543), renderSemuaMhsTable()(L5558) |
| L5697 | `exportDataMahasiswa()` | — |
| L5701 | `exportDataPelamar()` | — |
| L5708 | `initApp()` | renderDashboardKoordinatorWidget()(L1590), renderProgramTable()(L737), renderKategoriTable()(L1077), renderSurekomTable()(L2003), renderLogbookTable()(L2419), renderLaporanTable()(L2555) +8 |
| L5774 | `openModalInfoSkemaSks()` | — |
| L5780 | `closeModalInfoSkemaSks()` | — |
| L5785 | `openModalTelaahKonversi()` | kunciKonversiIndividu()(L5811), closeModalTelaahKonversi()(L5806) |
| L5806 | `closeModalTelaahKonversi()` | — |
| L5811 | `kunciKonversiIndividu()` | — |
| L5821 | `kunciKonversiMassal()` | — |
| L5834 | `toggleSelectAllKonversi()` | — |
| L5841 | `openModalSetBatasKuota()` | — |
| L5847 | `closeModalSetBatasKuota()` | — |
| L5852 | `handleSaveBatasKuotaFakultas()` | closeModalSetBatasKuota()(L5847) |
| L5859 | `openModalEditBatasDosen()` | — |
| L5868 | `closeModalEditBatasDosen()` | — |
| L5873 | `handleSaveKuotaIndividual()` | closeModalEditBatasDosen()(L5868) |
| L5881 | `syncDataDosenUdi()` | — |
| L5885 | `openModalTambahDosen()` | showAddKoordinatorModal()(L1609) |
| L5889 | `showDetailDosen()` | — |
| L5895 | `filterDosenData()` | — |
| L5906 | `autoAssignDplBatch()` | — |
| L5916 | `simpanSemuaPlotting()` | — |
| L5925 | `saveIndividualPlotting()` | — |
| L5929 | `toggleSelectAllPlotting()` | — |
| L5936 | `openModalJadwalSidang()` | — |
| L5942 | `closeModalJadwalSidang()` | — |
| L5947 | `handleSaveJadwalSidang()` | closeModalJadwalSidang()(L5942) |
| L5953 | `openModalInputNilaiSidang()` | hitungNilaiAkhirSidang()(L5970) |
| L5965 | `closeModalInputNilaiSidang()` | — |
| L5970 | `hitungNilaiAkhirSidang()` | — |
| L5987 | `handleSaveNilaiSidang()` | closeModalInputNilaiSidang()(L5965) |
| L5997 | `filterSidangTable()` | — |
| L6002 | `previewDokumenLuaran()` | — |
| L6011 | `closeModalPreviewDokumen()` | — |
| L6016 | `verifikasiSertifikatIndividu()` | — |
| L6024 | `mintaRevisiSertifikat()` | — |
| L6034 | `validasiSemuaSertifikatLolos()` | — |
| L6045 | `toggleSelectAllSertifikat()` | — |
| L6051 | `filterSertifikatTable()` | — |
| L6056 | `exportLogAktivitasCsv()` | — |
| L6060 | `filterLogTable()` | — |