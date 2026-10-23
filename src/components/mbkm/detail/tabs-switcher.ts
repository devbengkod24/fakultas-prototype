// src/components/mbkm/detail/tabs-switcher.js
function initTabs() {
  const tabList = document.querySelector('[role="tablist"]');
  if (!tabList) return;
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  const activateTab = (tab, focus = false) => {
    tabs.forEach((t) => {
      const isActive = t === tab;
      t.setAttribute("aria-selected", String(isActive));
      t.setAttribute("tabindex", isActive ? "0" : "-1");
      const panel = document.getElementById(t.getAttribute("data-tab-target"));
      if (panel) panel.hidden = !isActive;
    });
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      let next = null;
      if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
      else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;
      if (next !== null) {
        event.preventDefault();
        activateTab(tabs[next], true);
      }
    });
  });

  const initial = tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
  if (initial) activateTab(initial);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTabs);
} else {
  initTabs();
}
