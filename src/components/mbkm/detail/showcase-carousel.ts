// src/components/mbkm/detail/showcase-carousel.js
function initShowcaseCarousel() {
  const showcase = document.querySelector("#showcase");
  if (!showcase) return;

  const stage = showcase.querySelector("[data-showcase-stage]");
  const prevButton = showcase.querySelector("[data-showcase-prev]");
  const nextButton = showcase.querySelector("[data-showcase-next]");
  const dotsContainer = showcase.querySelector("[data-showcase-dots]");
  const counter = showcase.querySelector("[data-showcase-counter]");
  const glows = Array.from(showcase.querySelectorAll("[data-showcase-glow]"));
  const filters = Array.from(showcase.querySelectorAll("[data-showcase-filter]"));
  if (!stage || !prevButton || !nextButton || !dotsContainer) return;

  const allCards = Array.from(stage.querySelectorAll(".project-card"));
  if (!allCards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let visible = allCards.slice();
  let activeIndex = 0;
  let glowIndex = 0;
  let timer = null;
  let hovering = false;
  let inView = true;

  const pad = (n) => String(n).padStart(2, "0");

  function buildDots() {
    dotsContainer.innerHTML = "";
    visible.forEach((card, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Tampilkan karya ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsContainer.appendChild(dot);
    });
  }

  function updateGlow(card) {
    if (!glows.length) return;
    const img = card.querySelector(".project-image");
    if (!img) return;
    glowIndex = (glowIndex + 1) % glows.length;
    glows.forEach((g, i) => {
      if (i === glowIndex) {
        g.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
        g.classList.add("is-on");
      } else {
        g.classList.remove("is-on");
      }
    });
  }

  function render() {
    const total = visible.length;

    allCards.forEach((card) => {
      if (!visible.includes(card)) {
        card.dataset.position = "hidden";
        card.setAttribute("aria-hidden", "true");
        card.tabIndex = -1;
      }
    });

    visible.forEach((card, index) => {
      let offset = index - activeIndex;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const inRange = Math.abs(offset) <= 1;
      card.dataset.position = inRange ? String(offset) : "hidden";
      card.setAttribute("aria-hidden", inRange ? "false" : "true");
      card.setAttribute("aria-current", index === activeIndex ? "true" : "false");
      card.tabIndex = inRange ? 0 : -1;
    });

    Array.from(dotsContainer.children).forEach((dot, index) => {
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });

    const activeCard = visible[activeIndex];
    if (activeCard) {
      showcase.style.setProperty("--sc-accent", activeCard.dataset.accent || "#114D91");
      updateGlow(activeCard);
    }
    if (counter) {
      counter.textContent = `${pad(activeIndex + 1)} / ${pad(total)}`;
    }
    const single = total <= 1;
    prevButton.disabled = single;
    nextButton.disabled = single;
  }

  function goTo(index) {
    const total = visible.length;
    if (!total) return;
    activeIndex = ((index % total) + total) % total;
    render();
    restartAutoplay();
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
    timer = null;
  }
  function startAutoplay() {
    if (reduceMotion || hovering || !inView || document.hidden) return;
    if (visible.length < 2) return;
    stopAutoplay();
    timer = setInterval(() => goTo(activeIndex + 1), 6000);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  showcase.addEventListener("mouseenter", () => {
    hovering = true;
    stopAutoplay();
  });
  showcase.addEventListener("mouseleave", () => {
    hovering = false;
    startAutoplay();
  });
  showcase.addEventListener("focusin", () => {
    hovering = true;
    stopAutoplay();
  });
  showcase.addEventListener("focusout", () => {
    hovering = false;
    startAutoplay();
  });
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        inView ? startAutoplay() : stopAutoplay();
      },
      { threshold: 0.25 },
    ).observe(showcase);
  }

  let suppressClick = false;
  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (suppressClick) return;
      const index = visible.indexOf(card);
      if (index > -1 && index !== activeIndex) goTo(index);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const index = visible.indexOf(card);
        if (index > -1 && index !== activeIndex) {
          event.preventDefault();
          goTo(index);
        }
      }
    });
  });

  prevButton.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton.addEventListener("click", () => goTo(activeIndex + 1));
  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  let startX = 0;
  let dragging = false;
  let moved = false;
  stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    dragging = true;
    moved = false;
    startX = event.clientX;
  });
  stage.addEventListener("pointermove", (event) => {
    if (dragging && Math.abs(event.clientX - startX) > 8) moved = true;
  });
  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    const dx = event.clientX - startX;
    if (moved && Math.abs(dx) > 50) {
      suppressClick = true;
      setTimeout(() => (suppressClick = false), 0);
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", () => (dragging = false));
  stage.addEventListener("pointerleave", () => (dragging = false));

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.showcaseFilter;
      visible =
        value === "all"
          ? allCards.slice()
          : allCards.filter((c) => c.dataset.category === value);
      if (!visible.length) visible = allCards.slice();
      activeIndex = 0;
      filters.forEach((b) =>
        b.setAttribute("aria-pressed", String(b === button)),
      );
      buildDots();
      render();
      restartAutoplay();
    });
  });

  buildDots();
  render();
  startAutoplay();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initShowcaseCarousel);
} else {
  initShowcaseCarousel();
}
