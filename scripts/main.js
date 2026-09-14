// ─────────────────────────────────────────────────────────────────
// scripts/main.js — point d'entrée unique de StreamLoader.
// Chaque module gère un seul aspect de l'app (langue, thème, auth,
// modale, analyse, téléchargement, paiement, effets visuels) et
// expose une fonction init*() appelée ici, dans l'ordre. Le partage
// d'état entre modules passe exclusivement par state.js.
// ─────────────────────────────────────────────────────────────────

import { initI18n } from './i18n.js';
import { initTheme } from './theme.js';
import { initModalEvents } from './modal.js';
import { initAuthEvents, loadUser } from './auth.js';
import { initMediaEvents } from './media.js';
import { initDownloadEvents } from './download.js';
import { initPaymentEvents, handlePaymentReturn, initGeoCurrency } from './payment.js';
import { initScrollReveal, initParallax } from './app.js';
import { updateAdVisibility } from './ads.js';

async function init() {
  // 1. Réglages d'affichage indépendants du réseau
  initI18n();
  initTheme();
  initScrollReveal();
  initParallax();

  // 2. Câblage des interactions (aucune requête réseau à ce stade)
  initModalEvents();
  initAuthEvents();
  initMediaEvents();
  initDownloadEvents();
  initPaymentEvents();

  // 3. Géo-détection (devise Premium), puis session utilisateur et
  //    dépendances qui en découlent
  initGeoCurrency();
  await loadUser();
  updateAdVisibility();

  // 4. Retour éventuel d'un paiement Premium (?premium=success)
  await handlePaymentReturn();
}

init();