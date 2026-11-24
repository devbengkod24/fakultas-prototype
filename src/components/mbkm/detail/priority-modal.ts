// src/components/mbkm/detail/priority-modal.ts
// Pengendali popup "Prioritas Pendaftaran" pada halaman detail program MBKM.
// Menyimpan pilihan prioritas (maksimal 3 slot) di localStorage agar tetap
// tersimpan saat pendaftar membuka program MBKM berikutnya.

const STORAGE_KEY = "mbkm.prioritySlots.v1";
const SLOT_INDEXES = [1, 2, 3];
const REDIRECT_URL = "/pendaftaran-mahasiswa";
const FULL_SLOT_NOTE =
  "Semua slot prioritas sudah terisi (3/3). Batas pendaftaran adalah 3 program MBKM, buka halaman detail program lain untuk melepas slot prioritasnya.";

interface SlotEntry {
  name: string;
  id: string;
}

type SlotState = Record<number, SlotEntry | null>;

function initPriorityModal(): void {
  const modal = document.getElementById("priorityModal");
  if (!modal) return;

  const backdrop = document.getElementById("priorityModalBackdrop");
  const closeBtn = document.getElementById("priorityModalClose");
  const nextBtn = document.getElementById("priorityModalNext") as HTMLButtonElement | null;
  const note = document.getElementById("priorityModalNote");
  const trigger = document.getElementById("btn-daftar-program");
  const slotCards = Array.from(modal.querySelectorAll<HTMLButtonElement>(".slot-card"));

  const programName = modal.dataset.programName || "Program MBKM";
  const programId = modal.dataset.programId || "";

  /** Baca state slot dari localStorage; bentuk apa pun dinormalkan ke 3 slot. */
  function readSlots(): SlotState {
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch {
      parsed = {};
    }

    const state: SlotState = {};
    SLOT_INDEXES.forEach((index) => {
      const entry = parsed[index] as SlotEntry | undefined;
      state[index] =
        entry && typeof entry.name === "string" && entry.name.length > 0
          ? { name: entry.name, id: typeof entry.id === "string" ? entry.id : "" }
          : null;
    });
    return state;
  }

  function writeSlots(state: SlotState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Penyimpanan tidak tersedia: state tetap hidup selama popup terbuka.
    }
  }

  let slots: SlotState = readSlots();

  /** Nomor prioritas yang ditempati program pada halaman detail ini. */
  function ownedSlotIndex(): number | null {
    const found = SLOT_INDEXES.find((index) => {
      const entry = slots[index];
      if (!entry) return false;
      return (programId !== "" && entry.id === programId) || entry.name === programName;
    });
    return typeof found === "number" ? found : null;
  }

  function render(): void {
    const owned = ownedSlotIndex();

    slotCards.forEach((card) => {
      const index = Number(card.dataset.slotIndex);
      const entry = slots[index];
      const wrapper = modal!.querySelector<HTMLElement>(
        `.priority-slot[data-slot-index="${index}"]`,
      );
      const emptyView = card.querySelector<HTMLElement>(".slot-view--empty");
      const filledView = card.querySelector<HTMLElement>(".slot-view--filled");
      const nameEl = card.querySelector<HTMLElement>(".slot-name");

      card.dataset.state = entry ? "filled" : "empty";
      card.dataset.owned = entry ? (index === owned ? "self" : "other") : "none";
      card.setAttribute("aria-pressed", entry ? "true" : "false");
      card.title =
        entry && index === owned ? "Klik untuk melepas slot prioritas ini" : "";

      if (wrapper) wrapper.dataset.filled = entry ? "true" : "false";
      if (emptyView) emptyView.hidden = Boolean(entry);
      if (filledView) filledView.hidden = !entry;
      if (nameEl) nameEl.textContent = entry ? entry.name : "";
    });

    const filledCount = SLOT_INDEXES.filter((index) => slots[index]).length;
    if (note) {
      const isFull = filledCount === SLOT_INDEXES.length && owned === null;
      note.textContent = isFull ? FULL_SLOT_NOTE : "";
      note.hidden = !isFull;
    }

    if (nextBtn) nextBtn.disabled = owned === null;
  }

  function handleSlotClick(card: HTMLButtonElement): void {
    const index = Number(card.dataset.slotIndex);
    const entry = slots[index];
    const owned = ownedSlotIndex();

    if (!entry) {
      // Slot kosong: tempatkan program ini di prioritas tersebut.
      // Bila sebelumnya sudah menempati slot lain, pindahkan (ganti prioritas).
      if (owned !== null) slots[owned] = null;
      slots[index] = { name: programName, id: programId };
    } else if (index === owned) {
      // Slot milik program ini: klik lagi untuk melepas dan memilih prioritas lain.
      slots[index] = null;
    } else {
      // Slot milik program lain: tidak ada aksi.
      return;
    }

    writeSlots(slots);
    render();
  }

  function openModal(): void {
    slots = readSlots();
    render();
    modal!.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(): void {
    modal!.classList.remove("is-open");
    document.body.style.overflow = "";
    if (trigger) trigger.focus({ preventScroll: true });
  }

  slotCards.forEach((card) => {
    card.addEventListener("click", () => handleSlotClick(card));
  });

  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled) return;
      writeSlots(slots);
      window.location.href = REDIRECT_URL;
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal!.classList.contains("is-open")) closeModal();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPriorityModal);
} else {
  initPriorityModal();
}
