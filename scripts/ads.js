// ─────────────────────────────────────────────────────────────────
// scripts/ads.js — affiche/masque les emplacements publicitaires selon le plan.
// Les utilisateurs Premium ne voient jamais les .ad-slot.
// ─────────────────────────────────────────────────────────────────

import { state } from './state.js';

let adScriptsLoaded = false;

function loadAdScripts() {
  if (adScriptsLoaded) return;
  adScriptsLoaded = true;
  // Point d'extension : brancher ici le SDK publicitaire réel si besoin.
}

export function updateAdVisibility() {
  const isPremium = state.currentUser?.plan === 'premium';
  const slots = document.querySelectorAll('.ad-slot');

  if (isPremium) {
    slots.forEach((slot) => {
      slot.style.display = 'none';
      slot.classList.remove('ad-loaded');
    });
  } else {
    slots.forEach((slot) => { slot.style.display = 'block'; });
    loadAdScripts();
  }
}