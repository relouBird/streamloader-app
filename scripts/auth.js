// scripts/auth.js — Authentification et état utilisateur
import * as api from './api.js';
import { openModal, closeModal, showStatus } from './ui.js';

export let token = localStorage.getItem('sl-tok') || null;
export let currentUser = null;

export function setToken(t) {
  token = t;
  if (t) localStorage.setItem('sl-tok', t);
  else localStorage.removeItem('sl-tok');
}

export async function loadUser() {
  if (!token) return;
  try {
    currentUser = await api.getMe();
    updateNavUI();
  } catch {
    setToken(null);
    currentUser = null;
    updateNavUI();
  }
}

export function logout() {
  setToken(null);
  currentUser = null;
  updateNavUI();
  closeModal();
}

export function updateNavUI() {
  const cta = document.getElementById('navCta');
  const chip = document.getElementById('navUserChip');
  if (!currentUser) {
    cta.style.display = '';
    chip.style.display = 'none';
  } else {
    cta.style.display = 'none';
    chip.style.display = 'flex';
    document.getElementById('navEmail').textContent = currentUser.email.split('@')[0];
    document.getElementById('navAvatar').textContent = currentUser.email[0].toUpperCase();
    const pb = document.getElementById('navPlan');
    pb.style.display = currentUser.plan === 'premium' ? 'inline' : 'none';
  }
}

let authTab = 'login';

export function switchTab(tab) {
  authTab = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
  document.getElementById('authPwd2Wrap').style.display = tab === 'register' ? '' : 'none';
  document.getElementById('authSubmitLabel').textContent = 
    tab === 'login' ? 'Se connecter' : 'Créer mon compte';
  document.getElementById('authErr').style.display = 'none';
  document.getElementById('authOk').style.display = 'none';
}

export async function submitAuth() {
  const email = document.getElementById('authEmail').value.trim();
  const pwd = document.getElementById('authPwd').value;
  const pwd2 = document.getElementById('authPwd2').value;
  const errEl = document.getElementById('authErr');
  const okEl = document.getElementById('authOk');
  const btn = document.getElementById('authSubmit');

  errEl.style.display = 'none'; okEl.style.display = 'none';
  if (!email || !pwd) {
    errEl.textContent = 'Remplis tous les champs.'; errEl.style.display = 'block'; return;
  }
  if (authTab === 'register' && pwd !== pwd2) {
    errEl.textContent = 'Les mots de passe ne correspondent pas.'; errEl.style.display = 'block'; return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spin"></span>';

  try {
    let data;
    if (authTab === 'login') {
      data = await api.login(email, pwd);
    } else {
      data = await api.register(email, pwd);
    }
    setToken(data.token);
    currentUser = data.user;
    updateNavUI();
    if (authTab === 'login') {
      okEl.textContent = '✓ Connexion réussie !';
      okEl.style.display = 'block';
      setTimeout(closeModal, 1000);
    } else {
      okEl.innerHTML = '✓ Compte créé ! <button id="goPremiumFromRegister" style="margin-left:8px;background:var(--accent);border:none;color:#fff;font-weight:700;cursor:pointer;font-size:12px;font-family:inherit;padding:5px 14px;border-radius:100px">Activer Premium →</button>';
      okEl.style.display = 'block';
      document.getElementById('goPremiumFromRegister').onclick = () => openModal('premium');
      setTimeout(closeModal, 2000);
    }
  } catch (e) {
    errEl.textContent = e.message;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span id="authSubmitLabel">${authTab === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>`;
  }
}

export function initAuthListeners() {
  document.getElementById('tabLogin').addEventListener('click', () => switchTab('login'));
  document.getElementById('tabRegister').addEventListener('click', () => switchTab('register'));
  document.getElementById('authSubmit').addEventListener('click', submitAuth);
  document.getElementById('logoutBtn')?.addEventListener('click', logout);
}