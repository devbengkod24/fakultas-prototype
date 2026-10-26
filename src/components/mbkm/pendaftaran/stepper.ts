// src/components/mbkm/pendaftaran/stepper.js
function initRegistrationStepper() {
  // ------------------------------------------------
  // Manajemen Lampiran Tambahan Dinamis (Maksimal 3)
  // ------------------------------------------------
  const MAX_ATTACHMENTS = 3;
  let attachmentList = [];

  const additionalAttachmentsContainer = document.getElementById(
    "additional-attachments",
  );
  const addAttachmentBtn = document.getElementById("add-attachment-btn");

  function renderAttachments() {
    if (!additionalAttachmentsContainer) return;

    additionalAttachmentsContainer.classList.toggle(
      "hidden",
      attachmentList.length === 0,
    );

    additionalAttachmentsContainer.innerHTML = attachmentList
      .map(
        (att, idx) => `
      <div class="attachment-item transition-all">
        <div class="flex items-center justify-between gap-3 mb-2">
          <label
            for="attachment-url-${att.id}"
            class="block text-sm font-semibold text-gray-700"
          >
            Lampiran ${idx + 1}
          </label>
          <button
            type="button"
            class="remove-attachment-btn text-gray-400 hover:text-rose-600 transition p-1 rounded-md hover:bg-rose-50 cursor-pointer"
            title="Hapus Lampiran ${idx + 1}"
            aria-label="Hapus Lampiran ${idx + 1}"
            data-id="${att.id}"
          >
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
        <input
          id="attachment-url-${att.id}"
          name="attachmentUrl_${idx + 1}"
          type="url"
          inputmode="url"
          value="${att.value || ""}"
          placeholder="https://drive.google.com/file/d/..."
          class="attachment-input w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm font-medium text-gray-900 transition focus:border-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-100"
          data-id="${att.id}"
        />
      </div>
    `,
      )
      .join("");

    // Simpan nilai input saat pengguna mengetik
    additionalAttachmentsContainer
      .querySelectorAll(".attachment-input")
      .forEach((input) => {
        input.addEventListener("input", (e) => {
          const id = Number(e.target.dataset.id);
          const targetAtt = attachmentList.find((a) => a.id === id);
          if (targetAtt) targetAtt.value = e.target.value;
        });
      });

    // Listener tombol hapus lampiran
    additionalAttachmentsContainer
      .querySelectorAll(".remove-attachment-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = Number(btn.dataset.id);
          attachmentList = attachmentList.filter((a) => a.id !== id);
          renderAttachments();
        });
      });

    // Sembunyikan tombol tambah saat mencapai maksimal 3 lampiran
    const isMax = attachmentList.length >= MAX_ATTACHMENTS;
    if (addAttachmentBtn) {
      addAttachmentBtn.classList.toggle("hidden", isMax);
    }

    if (window.lucide) lucide.createIcons();
  }

  if (addAttachmentBtn) {
    addAttachmentBtn.addEventListener("click", () => {
      if (attachmentList.length < MAX_ATTACHMENTS) {
        attachmentList.push({ id: Date.now(), value: "" });
        renderAttachments();
      }
    });
  }

  // ------------------------------------------------
  // Elemen umum
  // ------------------------------------------------
  const form = document.getElementById("registration-form");
  if (!form) return;

  const stepSections = [
    document.getElementById("step-1"),
    document.getElementById("step-2"),
    document.getElementById("step-3"),
  ];
  const stepButtons = [...document.querySelectorAll("[data-step]")];
  const progressLabel = document.getElementById("progress-label");
  const progressBar = document.getElementById("progress-bar");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const nextLabel = document.getElementById("next-label");
  const submitButton = document.getElementById("submit-button");
  const registrationPanel = document.getElementById("registration-panel");
  const formNavigation = document.getElementById("form-navigation");

  let currentStep = 1;

  // ------------------------------------------------
  // Navigasi tahap (tanpa validasi)
  // ------------------------------------------------
  function updateNavigation() {
    stepSections.forEach((section, index) => {
      if (section) section.hidden = index + 1 !== currentStep;
    });

    stepButtons.forEach((button, index) => {
      const step = index + 1;
      const circle = button.querySelector(".step-number");

      button.classList.toggle("active", step === currentStep);
      button.classList.toggle("completed", step < currentStep);
      if (circle) circle.textContent = String(step);

      if (step === currentStep) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });

    if (progressLabel) {
      progressLabel.textContent = `Tahap ${currentStep} dari 3`;
    }
    if (progressBar) {
      const progressPercent =
        ((currentStep - 1) / (stepButtons.length - 1)) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    if (currentStep === 1) {
      prevButton.classList.add("hidden");
      prevButton.classList.remove("inline-flex");
      formNavigation.classList.remove("sm:justify-between");
      formNavigation.classList.add("sm:justify-end");
    } else {
      prevButton.classList.remove("hidden");
      prevButton.classList.add("inline-flex");
      formNavigation.classList.add("sm:justify-between");
      formNavigation.classList.remove("sm:justify-end");
    }

    nextButton.classList.toggle("hidden", currentStep === 3);
    nextLabel.textContent = `Berikutnya`;

    submitButton.classList.toggle("hidden", currentStep !== 3);
    submitButton.classList.toggle("inline-flex", currentStep === 3);
  }

  function goToStep(step) {
    if (step < 1 || step > 3) return;
    currentStep = step;
    updateNavigation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  stepButtons.forEach((button) => {
    button.addEventListener("click", () =>
      goToStep(Number(button.dataset.step)),
    );
  });
  if (nextButton) nextButton.addEventListener("click", () => goToStep(currentStep + 1));
  if (prevButton) prevButton.addEventListener("click", () => goToStep(currentStep - 1));

  // ------------------------------------------------
  // Submit (tanpa validasi) → kembali ke detail program
  // ------------------------------------------------
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "/detail-mbkm";
  });

  // ------------------------------------------------
  // Inisialisasi
  // ------------------------------------------------
  renderAttachments();
  updateNavigation();
  if (window.lucide) lucide.createIcons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRegistrationStepper);
} else {
  initRegistrationStepper();
}
