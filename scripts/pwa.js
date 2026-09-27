// scripts/pwa.js — enregistrement du service worker + UI d'installation PWA
// - Android/Chrome : utilise `beforeinstallprompt` (natif)
// - iOS Safari     : ne supporte PAS cet event → on affiche une notice manuelle
// - Desktop        : idem Android, avec un petit banner discret

const DISMISS_KEY = "sl_pwa_dismissed";
const INSTALL_BANNER_DELAY = 3000; // ms après chargement avant de proposer l'install

let deferredPrompt = null;

function el(id) {
  return document.getElementById(id);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  // iPadOS 13+ se fait passer pour du macOS, d'où le check `maxTouchPoints`
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function wasDismissed() {
  return localStorage.getItem(DISMISS_KEY) === "1";
}

/** Affiche le banner d'installation (Android/Chrome). */
function showInstallBanner() {
  const banner = el("pwaInstallBanner");
  if (!banner) return;
  banner.classList.add("show");
}

function hideInstallBanner() {
  el("pwaInstallBanner")?.classList.remove("show");
  el("pwaIosModal")?.classList.remove("show");
}

function dismissPermanently() {
  localStorage.setItem(DISMISS_KEY, "1");
  hideInstallBanner();
}

/** Enregistre le service worker et câble l'UI d'installation. */
export function initPWA() {
  // 1. Enregistrement du service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          // Détecte les mises à jour du SW (nouvelle version en prod)
          reg.addEventListener("updatefound", () => {
            const nw = reg.installing;
            nw?.addEventListener("statechange", () => {
              if (
                nw.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                console.info(
                  "[PWA] Nouvelle version disponible — recharge la page.",
                );
              }
            });
          });
        })
        .catch((err) => console.warn("[PWA] SW refusé :", err));
    });
  }

  // 2. Déjà installée ? → on n'affiche rien
  if (isStandalone()) return;

  // 3. iOS : pas d'event natif → notice manuelle après délai
  if (isIOS()) {
    if (!wasDismissed()) {
      setTimeout(
        () => el("pwaIosModal")?.classList.add("show"),
        INSTALL_BANNER_DELAY,
      );
    }
    // Câble le bouton "J'ai compris" du modal iOS
    el("pwaIosClose")?.addEventListener("click", dismissPermanently);
    return;
  }

  // 4. Android/Chrome : capte beforeinstallprompt
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // empêche la mini-infobar par défaut
    deferredPrompt = e;
    if (!wasDismissed()) showInstallBanner();
  });

  // 5. Bouton "Installer" du banner → déclenche le prompt natif
  el("pwaInstallBtn")?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    hideInstallBanner();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.info("[PWA] Choix utilisateur :", outcome);
    deferredPrompt = null;
    if (outcome === "accepted") localStorage.setItem(DISMISS_KEY, "1");
  });

  // 6. Bouton "Plus tard" → ferme sans mémoriser
  el("pwaLaterBtn")?.addEventListener("click", hideInstallBanner);

  // 7. Bouton "Ne plus proposer" → mémorise le refus
  el("pwaNeverBtn")?.addEventListener("click", dismissPermanently);

  // 8. Install terminée → nettoyage
  window.addEventListener("appinstalled", () => {
    console.info("[PWA] Application installée ✅");
    localStorage.setItem(DISMISS_KEY, "1");
    hideInstallBanner();
  });
}
