/* Thème + état de connexion partagés sur les pages légales — reprend le même
   mécanisme (mêmes clés localStorage) que public/index.html, pour que le
   choix de thème et la session restent cohérents entre toutes les pages. */
(function () {
  function applyTheme(th) {
    if (th) { document.documentElement.setAttribute('data-theme', th); localStorage.setItem('sl-th', th); }
    else { document.documentElement.removeAttribute('data-theme'); localStorage.removeItem('sl-th'); }
  }

  const savedTh = localStorage.getItem('sl-th');
  if (savedTh) applyTheme(savedTh);

  document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const cur = localStorage.getItem('sl-th');
        const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (!cur) applyTheme(sys === 'dark' ? 'light' : 'dark');
        else if (cur === 'dark') applyTheme('light');
        else applyTheme(null);
      });
    }

    // Reflète l'état de connexion de la page d'accueil : puce utilisateur si
    // un token valide existe, sinon le bouton Connexion. Les deux renvoient
    // vers "/", où se trouvent les modales de connexion et de profil.
    const token = localStorage.getItem('sl-tok');
    const cta = document.getElementById('navCta');
    const chip = document.getElementById('navUserChip');
    if (token && cta && chip) {
      fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d || !d.user) return;
          cta.style.display = 'none';
          chip.style.display = 'flex';
          document.getElementById('navEmail').textContent = d.user.email.split('@')[0];
          document.getElementById('navAvatar').textContent = d.user.email[0].toUpperCase();
          const pb = document.getElementById('navPlan');
          if (pb) pb.style.display = d.user.plan === 'premium' ? 'inline' : 'none';
        })
        .catch(function () {});
    }
  });
})();
