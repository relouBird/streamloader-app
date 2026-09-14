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
  currentUser: null, // { id, email, plan, created_at, trim_trials_used } | null

  // i18n
  lang: 'fr',

  // Géo-détection & devise (pricing Premium multi-devises)
  currentCurrency: 'XAF',
  currentCountryName: 'Cameroun',
  currentCountryFlag: '🇨🇲',
  currentCountryCode: 'CM',
  selectedPlan: 'monthly', // 'monthly' | 'halfyearly' | 'yearly'

  // Analyse / téléchargement en cours
  currentInfo: null,      // dernière réponse de /media/analyze (data)
  selQuality: '1080p',    // '4k' | '1080p' | '720p' | '480p' | 'mp3'

  // Sous-titres incrustés à la demande
  withSubtitles: false,
  subtitleLang: 'fr',

  // Découpage vidéo sur mesure
  wantsTrim: false,
};

export function setToken(tok) {
  state.token = tok;
  if (tok) localStorage.setItem(STORAGE_KEYS.token, tok);
  else localStorage.removeItem(STORAGE_KEYS.token);
}

export function setCurrentUser(user) {
  state.currentUser = user;
}