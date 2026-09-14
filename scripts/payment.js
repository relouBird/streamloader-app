// ─────────────────────────────────────────────────────────────────
// scripts/payment.js — POST /api/payment/initiate (GeniusPay), géo-détection
// multi-devises pour l'affichage des prix, puis reprise de session au
// retour (?premium=success).
// ─────────────────────────────────────────────────────────────────

import {
  ENDPOINTS,
  STORAGE_KEYS,
  CURRENCIES,
  TIMEZONE_MAP,
  TIMEZONE_COUNTRY_MAP,
  COUNTRY_MAP,
  PLAN_PRICES_USD,
  LOCAL_RATES,
} from './config.js';
import { state } from './state.js';
import { t } from './i18n.js';
import { SPINNER_HTML, showStatus, flagImgHtml } from './utils.js';
import { openModal } from './modal.js';
import { loadUser } from './auth.js';

function el(id) { return document.getElementById(id); }

const PAY_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>';

/** Calcule le prix affiché (montant + libellé formaté) d'un forfait dans la devise courante. */
export function getPlanPrice(plan) {
  const currency = state.currentCurrency in LOCAL_RATES ? state.currentCurrency : 'USD';
  const raw = PLAN_PRICES_USD[plan] * LOCAL_RATES[currency];
  const decimalCurrency = ['USD', 'EUR', 'GBP', 'CAD', 'CHF'].includes(currency);
  const amount = decimalCurrency ? Math.round(raw * 100) / 100 : Math.round(raw);
  const formatted = new Intl.NumberFormat(state.lang === 'fr' ? 'fr-FR' : 'en-US', {
    minimumFractionDigits: decimalCurrency ? 2 : 0,
    maximumFractionDigits: decimalCurrency ? 2 : 0,
  }).format(amount);
  return { amount, formatted: `${formatted} ${CURRENCIES[currency]?.symbol || currency}` };
}

/** Sélectionne un forfait (mensuel/6 mois/annuel), met à jour l'UI et les prix affichés. */
export function selectPlan(plan) {
  if (!PLAN_PRICES_USD[plan]) return;
  state.selectedPlan = plan;
  document.querySelectorAll('[data-plan-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.planTab === plan);
  });
  updatePricingDisplay();
}

/**
 * Détecte la devise/pays de l'utilisateur au démarrage.
 * Priorité : choix manuel mémorisé > fuseau horaire du navigateur > API IP.
 * Le fuseau horaire est bien plus fiable que la géolocalisation par IP,
 * surtout en Afrique où les bases IP attribuent souvent des plages entières
 * au mauvais pays voisin. L'API IP n'est donc utilisée qu'en dernier recours.
 */
export function initGeoCurrency() {
  const savedCountry = localStorage.getItem(STORAGE_KEYS.country);
  if (savedCountry && COUNTRY_MAP[savedCountry]) {
    applyCountry(savedCountry, COUNTRY_MAP[savedCountry].name);
    updatePricingDisplay();
    return;
  }

  let timezoneResolved = false;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneCountry = TIMEZONE_COUNTRY_MAP[tz];
    if (timezoneCountry && COUNTRY_MAP[timezoneCountry]) {
      applyCountry(timezoneCountry, COUNTRY_MAP[timezoneCountry].name);
      timezoneResolved = true;
    } else if (tz && TIMEZONE_MAP[tz]) {
      state.currentCurrency = TIMEZONE_MAP[tz];
      for (const code in COUNTRY_MAP) {
        if (COUNTRY_MAP[code].curr === state.currentCurrency) {
          applyCountry(code, COUNTRY_MAP[code].name);
          timezoneResolved = true;
          break;
        }
      }
    }
  } catch {
    // Intl indisponible : on retombe sur l'API IP ci-dessous.
  }

  updatePricingDisplay();
  if (!timezoneResolved) fetchGeoLocation();
}

function applyCountry(code, name) {
  const item = COUNTRY_MAP[code];
  if (!item) return;
  state.currentCurrency = item.curr;
  state.currentCountryName = name || item.name;
  state.currentCountryFlag = item.flag;
  state.currentCountryCode = code;
}

/** Affiche/masque le sélecteur manuel de pays, peuplé à la volée depuis COUNTRY_MAP. */
export function toggleCountryPicker() {
  const picker = el('premCountryPicker');
  if (!picker) return;
  const opening = picker.style.display === 'none';
  if (opening && picker.options.length <= 1) {
    const codes = Object.keys(COUNTRY_MAP).sort((a, b) =>
      COUNTRY_MAP[a].name.localeCompare(COUNTRY_MAP[b].name, 'fr'));
    for (const code of codes) {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = `${COUNTRY_MAP[code].name} (${COUNTRY_MAP[code].curr})`;
      picker.appendChild(opt);
    }
  }
  picker.style.display = opening ? 'block' : 'none';
}

/** Correction manuelle par l'utilisateur : prioritaire à vie sur la détection automatique. */
export function setManualCountry(code) {
  if (!code || !COUNTRY_MAP[code]) return;
  applyCountry(code, COUNTRY_MAP[code].name);
  localStorage.setItem(STORAGE_KEYS.country, code);
  updatePricingDisplay();
  const picker = el('premCountryPicker');
  if (picker) picker.style.display = 'none';
}

export function applyDetectedCountry(countryCode, countryName) {
  const code = String(countryCode || '').toUpperCase();
  if (!COUNTRY_MAP[code]) return false;
  applyCountry(code, countryName);
  updatePricingDisplay();
  return true;
}

/** Repli en dernier recours : géolocalisation par IP via ipapi.co. */
export async function fetchGeoLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/').catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (data.country_code && COUNTRY_MAP[data.country_code]) {
        applyDetectedCountry(data.country_code, data.country_name);
        return;
      }
      if (data.currency && CURRENCIES[data.currency]) {
        state.currentCurrency = data.currency;
        state.currentCountryName = data.country_name || state.currentCurrency;
        state.currentCountryFlag = '🌍';
        state.currentCountryCode = null;
        updatePricingDisplay();
      }
    }
  } catch {
    // Pas d'accès réseau à l'API IP : on garde le repli déjà appliqué.
  }
}

/** Met à jour tous les prix affichés (pricing, modale, bouton, indicateur géo). */
export function updatePricingDisplay() {
  document.querySelectorAll('[data-plan-price]').forEach((element) => {
    element.textContent = getPlanPrice(element.dataset.planPrice).formatted;
  });

  const startingPrice = document.querySelector('.premium-starting-price');
  if (startingPrice) startingPrice.textContent = getPlanPrice('monthly').formatted;

  const selected = getPlanPrice(state.selectedPlan);
  const numberEnd = selected.formatted.lastIndexOf(' ');

  if (el('premPriceVal')) el('premPriceVal').textContent = numberEnd > 0 ? selected.formatted.slice(0, numberEnd) : selected.formatted;
  if (el('premPriceUnit')) el('premPriceUnit').textContent = numberEnd > 0 ? selected.formatted.slice(numberEnd + 1) : state.currentCurrency;
  if (el('premPriceApprox')) el('premPriceApprox').textContent = `≈ ${PLAN_PRICES_USD[state.selectedPlan].toFixed(2)} USD`;
  if (el('premBtnLabel')) el('premBtnLabel').textContent = `${t('prem.pay')} — ${selected.formatted}`;
  if (el('premPriceSub')) {
    el('premPriceSub').textContent =
      state.selectedPlan === 'yearly' ? t('prem.sub_yearly') :
      state.selectedPlan === 'halfyearly' ? t('prem.sub_halfyearly') :
      t('prem.sub_monthly');
  }
  if (el('premGeoFlag')) el('premGeoFlag').innerHTML = flagImgHtml(state.currentCountryCode);
  if (el('premGeoCountry')) el('premGeoCountry').textContent = `${t('prem.detected')} ${state.currentCountryName}`;
}

function resetPremButton(btn) {
  if (!btn) return;
  const cfg = getPlanPrice(state.selectedPlan);
  btn.disabled = false;
  btn.innerHTML = `${PAY_ICON}<span id="premBtnLabel">${t('prem.pay')} — ${cfg.formatted}</span>`;
}

/* ─── Paiement GeniusPay ─────────────────────────────────────────── */

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
      body: JSON.stringify({
        provider: 'geniuspay',
        currency: state.currentCurrency,
        plan: state.selectedPlan,
      }),
    });
    const d = await r.json();

    if (!r.ok) {
      if (errEl) { errEl.textContent = d.error || "Impossible d'initier le paiement. Vérifie la configuration."; errEl.style.display = 'block'; }
      resetPremButton(btn);
      return;
    }

    sessionStorage.setItem('sl_tx', d.transaction_id);
    if (d.payment_url) {
      window.location.href = d.payment_url;
    } else if (okEl) {
      okEl.textContent = 'Paiement initié avec succès !';
      okEl.style.display = 'block';
    }
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

/** Câble le bouton de paiement, le sélecteur de forfait et la géo-détection manuelle. */
export function initPaymentEvents() {
  el('premBtn')?.addEventListener('click', doPremium);

  document.querySelectorAll('[data-plan-tab]').forEach((button) => {
    button.addEventListener('click', () => selectPlan(button.dataset.planTab));
  });

  el('premGeoFixBtn')?.addEventListener('click', toggleCountryPicker);
  el('premCountryPicker')?.addEventListener('change', (e) => setManualCountry(e.target.value));
}