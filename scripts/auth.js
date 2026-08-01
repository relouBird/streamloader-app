// ─────────────────────────────────────────────────────────────────
// scripts/auth.js — /api/auth/register, /api/auth/login, /api/auth/me.
// Met à jour state.js, la nav, et la visibilité des publicités.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from './config.js';
import { state, setToken, setCurrentUser } from './state.js';
import { t } from './i18n.js';
import { SPINNER_HTML } from './utils.js';
import { updateAdVisibility } from './ads.js';
import { openModal, closeModal, getAuthTab } from './modal.js';

function el(id) { return document.getElementById(id); }

export function updateNavUser() {
  const cta = el('navCta');
  const chip = el('navUserChip');

  if (!state.currentUser) {
    if (cta) cta.style.display = '';
    if (chip) chip.style.display = 'none';
  } else {
    if (cta) cta.style.display = 'none';
    if (chip) chip.style.display = 'flex';
    if (el('navEmail')) el('navEmail').textContent = state.currentUser.email.split('@')[0];
    if (el('navAvatar')) el('navAvatar').textContent = state.currentUser.email[0].toUpperCase();
    const pb = el('navPlan');
    if (pb) pb.style.display = state.currentUser.plan === 'premium' ? 'inline' : 'none';
  }

  updateAdVisibility();
}

/** Recharge le profil utilisateur depuis le token stocké (à appeler au démarrage). */
export async function loadUser() {
  if (!state.token) return;
  try {
    const r = await fetch(ENDPOINTS.authMe, {
      headers: { Authorization: 'Bearer ' + state.token },
    });
    if (!r.ok) { setToken(null); setCurrentUser(null); return; }
    const d = await r.json();
    setCurrentUser(d.user);
    updateNavUser();
  } catch {
    setToken(null);
    setCurrentUser(null);
  }
}

async function submitAuth() {
  const email = el('authEmail')?.value.trim();
  const pwd = el('authPwd')?.value;
  const pwd2 = el('authPwd2')?.value;
  const errEl = el('authErr');
  const okEl = el('authOk');
  const btn = el('authSubmit');
  const tab = getAuthTab();

  if (errEl) errEl.style.display = 'none';
  if (okEl) okEl.style.display = 'none';

  if (!email || !pwd) {
    if (errEl) { errEl.textContent = t('auth.fill_all'); errEl.style.display = 'block'; }
    return;
  }
  if (tab === 'register' && pwd !== pwd2) {
    if (errEl) { errEl.textContent = t('auth.pwd_mismatch'); errEl.style.display = 'block'; }
    return;
  }

  if (btn) { btn.disabled = true; btn.innerHTML = SPINNER_HTML; }

  const endpoint = tab === 'login' ? ENDPOINTS.authLogin : ENDPOINTS.authRegister;
  try {
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pwd }),
    });
    const d = await r.json();
    if (!r.ok) {
      if (errEl) { errEl.textContent = d.error || 'Erreur'; errEl.style.display = 'block'; }
      return;
    }

    setToken(d.token);
    setCurrentUser(d.user);
    updateNavUser();

    if (tab === 'login') {
      if (okEl) { okEl.textContent = t('auth.login_ok'); okEl.style.display = 'block'; }
      setTimeout(closeModal, 1000);
    } else {
      if (okEl) {
        okEl.innerHTML = `${t('auth.register_ok')} <button id="authGoPremiumBtn" style="margin-left:8px;background:var(--accent);border:none;color:#fff;font-weight:700;cursor:pointer;font-size:12px;font-family:inherit;padding:5px 14px;border-radius:100px">${t('prem.activate')}</button>`;
        okEl.style.display = 'block';
        el('authGoPremiumBtn')?.addEventListener('click', () => openModal('premium'));
      }
      setTimeout(closeModal, 2500);
    }
  } catch {
    if (errEl) { errEl.textContent = t('auth.network_err'); errEl.style.display = 'block'; }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span id="authSubmitLabel">${t(tab === 'login' ? 'auth.login_btn' : 'auth.register_btn')}</span>`;
    }
  }
}

function logout() {
  setToken(null);
  setCurrentUser(null);
  updateNavUser();
  closeModal();
}

/** Câble les interactions liées à l'authentification. */
export function initAuthEvents() {
  el('navCta')?.addEventListener('click', () => openModal('login'));
  el('navUserChip')?.addEventListener('click', () => openModal('profile'));
  el('authSubmit')?.addEventListener('click', submitAuth);
  el('logoutBtn')?.addEventListener('click', logout);
}