// scripts/theme.js — Gestion du thème clair/sombre
export function applyTheme(th) {
  if (th) {
    document.documentElement.setAttribute('data-theme', th);
    localStorage.setItem('sl-th', th);
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('sl-th');
  }
}

export function toggleTheme() {
  const cur = localStorage.getItem('sl-th');
  const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (!cur) {
    applyTheme(sys === 'dark' ? 'light' : 'dark');
  } else if (cur === 'dark') {
    applyTheme('light');
  } else {
    applyTheme(null);
  }
}

export function initTheme() {
  const saved = localStorage.getItem('sl-th');
  if (saved) applyTheme(saved);
}