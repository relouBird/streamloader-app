// scripts/main.js — Point d'entrée, initialisation globale
import * as theme from "./theme.js";
import { detectLang, applyI18n, toggleLang } from "./lang.js";
import * as auth from "./auth.js";
import {
  analyzeUrl,
  startDownload,
  openModal,
  closeModal,
  updateAdVisibility,
} from "./ui.js";

// Initialisation
detectLang();
applyI18n();

theme.initTheme();

document
  .getElementById("themeBtn")
  .addEventListener("click", theme.toggleTheme);
document.getElementById("langBtn").addEventListener("click", toggleLang);

// Nav CTA
document
  .getElementById("navCta")
  .addEventListener("click", () => openModal("login"));
document
  .getElementById("navUserChip")
  .addEventListener("click", () => openModal("profile"));

// Analyze button
document.getElementById("analyzeBtn").addEventListener("click", analyzeUrl);
document.getElementById("dlBtn").addEventListener("click", startDownload);

// Watch button
document.getElementById("watchBtn").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value.trim();
  if (url) window.open(url, "_blank");
});

// Free start button
document.getElementById("freeStartBtn").addEventListener("click", () => {
  document.getElementById("urlInput").focus();
});

// Premium button
document
  .getElementById("premiumBtn")
  .addEventListener("click", () => openModal("premium"));

// Modal close
document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalBackdrop")) closeModal();
});

// Enter key on URL input
document.getElementById("urlInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") analyzeUrl();
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
      else entry.target.classList.remove("in");
    });
  },
  { rootMargin: "0px 0px -50px 0px", threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Parallax
const prlx = document.getElementById("prlxLayer");
window.addEventListener("scroll", () => {
  if (prlx) prlx.style.transform = `translateY(${window.scrollY * -0.15}px)`;
});

auth.loadUser().then(() => {
  updateAdVisibility(); // importé depuis ui.js
});
auth.initAuthListeners();
