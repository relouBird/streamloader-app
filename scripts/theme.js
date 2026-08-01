// ─────────────────────────────────────────────────────────────────
// scripts/theme.js — bascule clair / sombre / système, persistée en localStorage.
// ─────────────────────────────────────────────────────────────────

import { STORAGE_KEYS } from './config.js';

function applyTheme(th) {
  if (th) {
    document.documentElement.setAttribute('data-theme', th);
    localStorage.setItem(STORAGE_KEYS.theme, th);
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem(STORAGE_KEYS.theme);
  }
}

/** Applique le thème sauvegardé au chargement et câble le bouton de bascule. */
export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved) applyTheme(saved);

  const themeBtn = document.getElementById('themeBtn');
  themeBtn?.addEventListener('click', () => {
    const cur = localStorage.getItem(STORAGE_KEYS.theme);
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (!cur) applyTheme(sys === 'dark' ? 'light' : 'dark');
    else if (cur === 'dark') applyTheme('light');
    else applyTheme(null);
  });
}