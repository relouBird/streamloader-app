// ─────────────────────────────────────────────────────────────────
// scripts/ads.js — affiche/masque les emplacements publicitaires selon le plan.
// Les utilisateurs Premium ne voient jamais les .ad-slot.
// ─────────────────────────────────────────────────────────────────
import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";

let adScriptsLoaded = false;

function loadAdScripts() {
  if (adScriptsLoaded) return;
  adScriptsLoaded = true;
  document.querySelectorAll(".ad-slot").forEach((slot) => {
    const inner = slot.querySelector(".ad-slot-inner");
    if (!inner) return;
    inner.innerHTML = `<a class="ad-banner" href="${ENDPOINTS.adClick}" target="_blank" rel="noopener noreferrer">
      <span class="ad-banner-copy"><span class="ad-banner-title">Découvre une offre partenaire</span><span class="ad-banner-text">Soutiens StreamLoader en visitant notre partenaire.</span></span>
      <span class="ad-banner-cta">Voir l'offre</span>
    </a>`;
    slot.classList.add("ad-loaded");
  });
}

export function updateAdVisibility() {
  const isPremium = state.currentUser?.plan === "premium";
  const slots = document.querySelectorAll(".ad-slot");

  if (isPremium) {
    slots.forEach((slot) => {
      slot.style.display = "none";
      slot.classList.remove("ad-loaded");
    });
  } else {
    slots.forEach((slot) => {
      slot.style.display = "block";
    });
    loadAdScripts();
  }
}
