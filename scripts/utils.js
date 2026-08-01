// ─────────────────────────────────────────────────────────────────
// scripts/utils.js — petites fonctions partagées, sans état ni dépendance
// vers les autres modules métier.
// ─────────────────────────────────────────────────────────────────

const ICONS = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
};

/**
 * Affiche un message dans la zone de statut sous la barre d'URL.
 * @param {string} msg
 * @param {'info'|'success'|'error'} type
 */
export function showStatus(msg, type = 'info') {
  const area = document.getElementById('status-area');
  if (!area) return;
  area.innerHTML = `<div class="status-msg status-${type}">${ICONS[type] || ICONS.info}<span>${msg}</span></div>`;
  if (type !== 'error') {
    setTimeout(() => { area.innerHTML = ''; }, 6000);
  }
}

/** Formate un nombre de secondes en "m:ss" ou "h:mm:ss". */
export function fmtDur(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return h
    ? `${h}:${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
    : `${m}:${String(ss).padStart(2, '0')}`;
}

/** Petit spinner HTML réutilisable pour les boutons en cours de chargement. */
export const SPINNER_HTML = '<span class="spin"></span>';