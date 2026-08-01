// ─────────────────────────────────────────────────────────────────
// scripts/state.js — état partagé, mutable, entre tous les modules.
// Chaque module lit/écrit directement dans cet objet plutôt que de
// s'importer mutuellement, ce qui évite les dépendances circulaires
// (ex: auth.js <-> download.js).
// ─────────────────────────────────────────────────────────────────

import { STORAGE_KEYS } from './config.js';

export const state = {
  // Auth
  token: localStorage.getItem(STORAGE_KEYS.token) || null,
  currentUser: null, // { id, email, plan, created_at } | null

  // i18n
  lang: 'fr',

  // Analyse / téléchargement en cours
  currentInfo: null,      // dernière réponse de /media/analyze (data)
  selFmt: 'bestvideo+bestaudio/best',
  selSublang: null,       // code langue choisi pour l'incrustation des sous-titres (ou null)
};

export function setToken(tok) {
  state.token = tok;
  if (tok) localStorage.setItem(STORAGE_KEYS.token, tok);
  else localStorage.removeItem(STORAGE_KEYS.token);
}

export function setCurrentUser(user) {
  state.currentUser = user;
}