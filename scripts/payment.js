// ─────────────────────────────────────────────────────────────────
// scripts/payment.js — POST /api/payment/initiate, redirection vers le
// prestataire, puis reprise de session au retour (?premium=success).
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from './config.js';
import { state } from './state.js';
import { t } from './i18n.js';
import { SPINNER_HTML, showStatus } from './utils.js';
import { openModal } from './modal.js';
import { loadUser } from './auth.js';

function el(id) { return document.getElementById(id); }

const PAY_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>';

function resetPremButton(btn) {
  if (!btn) return;
  btn.disabled = false;
  btn.innerHTML = `${PAY_ICON}<span id="premBtnLabel">${t('prem.pay_label')}</span>`;
}

async function doPremium() {
  if (!state.currentUser) { openModal('register'); return; }

  const btn = el('premBtn');
  const errEl = el('premErr');
  const okEl = el('premOk');

  if (btn) { btn.disabled = true; btn.innerHTML = `${SPINNER_HTML} ${t('prem.preparing')}`; }
  if (errEl) errEl.style.display = 'none';
  if (okEl) okEl.style.display = 'none';

  try {
    const r = await fetch(ENDPOINTS.paymentInitiate, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + state.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider: 'cinetpay' }),
    });
    const d = await r.json();

    if (!r.ok) {
      if (errEl) { errEl.textContent = d.error || "Impossible d'initier le paiement. Vérifie ta connexion."; errEl.style.display = 'block'; }
      resetPremButton(btn);
      return;
    }

    sessionStorage.setItem('sl_tx', d.transaction_id);
    window.location.href = d.payment_url;
  } catch (e) {
    if (errEl) { errEl.textContent = 'Erreur réseau : ' + e.message; errEl.style.display = 'block'; }
    resetPremButton(btn);
  }
}

/** À appeler au chargement : gère le retour ?premium=success après paiement. */
export async function handlePaymentReturn() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('premium') !== 'success') return;

  window.history.replaceState({}, '', '/');
  await loadUser();

  setTimeout(() => {
    if (state.currentUser?.plan === 'premium') {
      openModal('profile');
      showStatus(t('prem.activated'), 'success');
    }
  }, 400);
}

/** Câble le bouton de paiement dans le panneau Premium. */
export function initPaymentEvents() {
  el('premBtn')?.addEventListener('click', doPremium);
}