// ─────────────────────────────────────────────────────────────────
// scripts/modal.js — gère la fenêtre modale unique (auth / premium / profil).
// Lit l'utilisateur courant directement dans state.js : aucune
// dépendance vers auth.js pour éviter un cycle d'imports.
// ─────────────────────────────────────────────────────────────────

import { state } from './state.js';
import { t } from './i18n.js';
import { selectPlan } from './payment.js';

let authTab = 'login';

function el(id) { return document.getElementById(id); }

export function getAuthTab() { return authTab; }

export function switchTab(tab) {
  authTab = tab;
  el('tabLogin')?.classList.toggle('active', tab === 'login');
  el('tabRegister')?.classList.toggle('active', tab === 'register');
  const pwd2 = el('authPwd2Wrap');
  if (pwd2) pwd2.style.display = tab === 'register' ? '' : 'none';
  const label = el('authSubmitLabel');
  if (label) label.textContent = t(tab === 'login' ? 'auth.login_btn' : 'auth.register_btn');
  ['authErr', 'authOk'].forEach((id) => {
    const e = el(id);
    if (e) { e.style.display = 'none'; e.textContent = ''; }
  });
}

export function openModal(mode, plan = state.selectedPlan) {
  const backdrop = el('modalBackdrop');
  if (!backdrop) return;

  if (mode === 'premium') selectPlan(plan);

  ['panelAuth', 'panelPremium', 'panelProfile'].forEach((id) => {
    const p = el(id);
    if (p) p.style.display = 'none';
  });
  ['authErr', 'authOk', 'premErr', 'premOk'].forEach((id) => {
    const e = el(id);
    if (e) { e.style.display = 'none'; e.textContent = ''; }
  });

  if (mode === 'login' || mode === 'register') {
    el('panelAuth').style.display = '';
    switchTab(mode === 'register' ? 'register' : 'login');
  } else if (mode === 'premium') {
    el('panelPremium').style.display = '';
    const isLogged = !!state.currentUser;
    const loginNotice = el('premLoginNotice');
    if (loginNotice) loginNotice.style.display = isLogged ? 'none' : '';
    const loggedNotice = el('premLoggedNotice');
    if (loggedNotice) {
      loggedNotice.style.display = isLogged ? 'flex' : 'none';
      if (isLogged && el('premLoggedEmail')) {
        el('premLoggedEmail').textContent = state.currentUser.email;
      }
    }
    const pb = el('premBtn');
    if (pb) pb.disabled = !isLogged;
  } else if (mode === 'profile') {
    el('panelProfile').style.display = '';
    if (el('profEmail')) el('profEmail').textContent = state.currentUser?.email || '';
    if (el('profPlan')) el('profPlan').textContent = state.currentUser?.plan === 'premium' ? '⚡ Premium' : t('pf.badge');
    if (el('profUpgradeBtn')) el('profUpgradeBtn').style.display = state.currentUser?.plan === 'premium' ? 'none' : '';
    if (state.currentUser?.created_at && el('profSince')) {
      const d = new Date(state.currentUser.created_at);
      el('profSince').textContent = `${t('prof.member_since')} ${d.toLocaleDateString(state.lang)}`;
    }
  }

  backdrop.classList.add('open');
}

export function closeModal() {
  el('modalBackdrop')?.classList.remove('open');
}

/** Câble les interactions génériques de la modale (fermeture, onglets, ouverture depuis pricing). */
export function initModalEvents() {
  el('modalCloseBtn')?.addEventListener('click', closeModal);

  el('modalBackdrop')?.addEventListener('click', (e) => {
    if (e.target === el('modalBackdrop')) closeModal();
  });

  el('tabLogin')?.addEventListener('click', () => switchTab('login'));
  el('tabRegister')?.addEventListener('click', () => switchTab('register'));

  el('premiumBtn')?.addEventListener('click', () => openModal('premium'));
  el('profUpgradeBtn')?.addEventListener('click', () => openModal('premium'));
  el('premGuestRegisterBtn')?.addEventListener('click', () => openModal('register'));
  el('premGuestLoginBtn')?.addEventListener('click', () => openModal('login'));

  el('freeStartBtn')?.addEventListener('click', () => {
    el('urlInput')?.focus();
  });
}