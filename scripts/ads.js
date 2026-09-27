// ─────────────────────────────────────────────────────────────────
// scripts/ads.js — affiche/masque les emplacements publicitaires selon le plan.
// Les utilisateurs Premium ne voient jamais les .ad-slot.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";

let adScriptsLoaded = false;

// Scripts insérés via innerHTML ne s'exécutent pas : on les recrée un par un.
function injectAdHtml(container, html) {
  container.innerHTML = html;
  container.querySelectorAll("script").forEach((old) => {
    const s = document.createElement("script");
    for (const { name, value } of old.attributes) s.setAttribute(name, value);
    s.text = old.text;
    old.replaceWith(s);
  });
}

// Repli local quand le backend ne fournit pas de code de bannière (dev sans ads,
// ou fichier ads/banner-*.html absent côté serveur). Cliquable vers /api/ad-click
// pour ne pas perdre l'opportunité de monétisation.
function fallbackBannerHtml() {
  return `<a class="ad-banner" href="${ENDPOINTS.adClick}" target="_blank" rel="noopener noreferrer">
    <span class="ad-banner-copy">
      <span class="ad-banner-title">Découvre une offre partenaire</span>
      <span class="ad-banner-text">Soutiens StreamLoader en visitant notre partenaire.</span>
    </span>
    <span class="ad-banner-cta">Voir l'offre</span>
  </a>`;
}

async function loadAdScripts() {
  if (adScriptsLoaded) return;
  adScriptsLoaded = true;

  let banners = {};
  try {
    banners = await (await fetch(ENDPOINTS.adsBanners)).json();
  } catch {
    // Pas de réseau / endpoint absent : on utilisera le fallback local.
  }

  if (state.currentUser?.plan === "premium") return;

  const codeBySlot = {
    "ad-slot-hero": banners.hero,
    "ad-slot-card": banners.card,
  };

  document.querySelectorAll(".ad-slot").forEach((slot) => {
    const inner = slot.querySelector(".ad-slot-inner");
    if (!inner) return;
    const code = codeBySlot[slot.id];
    if (code) {
      injectAdHtml(inner, code);
    } else {
      inner.innerHTML = fallbackBannerHtml();
    }
    slot.classList.add("ad-loaded");
    slot.style.display = "block";
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
    return;
  }

  slots.forEach((slot) => {
    slot.style.display = "block";
  });
  loadAdScripts();
}
