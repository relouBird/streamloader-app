// scripts/pwa.js — SW (PWA + Adsterra) + UI d'installation + politique pub
// Un utilisateur Premium n'a : ni pubs Adsterra, ni Service Worker → zéro pub.

const DISMISS_KEY = "sl_pwa_dismissed";
const INSTALL_BANNER_DELAY = 3000;

// ── Adsterra ─────────────────────────────────────────────────────
const ADSTERRA_BANNERS = [
  // 1. Bannière Display 728x90 (Code HTML complet)
  {
    type: "html",
    containerId: "adsterra-display-728x90",
    html: `
      <script>
        atOptions = {
          'key' : '2d37bf1cd600a759435d645667b98eb1',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script src="https://bellnewyork.org/22/2d37bf1cd600a759435d645667b98eb1"></script>
    `,
  },
  // 2. Native Banner (Script autonome + conteneur)
  {
    type: "script",
    src: "https://bellnewyork.org/21/8d98744dc408b0db5e089b7bcc209169",
    id: "adsterra-native",
    containerId: "container-8d98744dc408b0db5e089b7bcc209169",
  },
  // 3. Popunder (Script autonome)
  {
    type: "script",
    src: "https://accountut.com/1/d3edd295ec0be6b2053bd92ca4f6d4d8",
    id: "adsterra-popunder",
  },
  // 4. Social Bar (Script autonome)
  {
    type: "script",
    src: "https://bellnewyork.org/14/36e283ae8f1726e206f2cf2718b709ae",
    id: "adsterra-socialbar",
  },
];

let deferredPrompt = null;
let adTagsInjected = false;
let swRegistered = false;

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
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function wasDismissed() {
  return localStorage.getItem(DISMISS_KEY) === "1";
}

function showInstallBanner() {
  el("pwaInstallBanner")?.classList.add("show");
}

function hideInstallBanner() {
  el("pwaInstallBanner")?.classList.remove("show");
  el("pwaIosModal")?.classList.remove("show");
}

function dismissPermanently() {
  localStorage.setItem(DISMISS_KEY, "1");
  hideInstallBanner();
}

// ── Fonctions d'injection Adsterra ───────────────────────────────

// Permet d'insérer le code HTML d'Adsterra et de forcer l'exécution des <script>
function injectAdHtml(container, html) {
  if (!container) return;
  container.innerHTML = html;
  container.querySelectorAll("script").forEach((old) => {
    const s = document.createElement("script");
    for (const { name, value } of old.attributes) s.setAttribute(name, value);
    s.text = old.text;
    old.replaceWith(s);
  });
}

function injectAdsTags() {
  if (adTagsInjected) return;
  adTagsInjected = true;

  for (const banner of ADSTERRA_BANNERS) {
    if (banner.type === "html") {
      const container = document.getElementById(banner.containerId);
      if (container) injectAdHtml(container, banner.html);
    } else if (banner.type === "script") {
      if (document.getElementById(banner.id)) continue;
      const s = document.createElement("script");
      s.src = banner.src;
      s.async = true;
      s.id = banner.id;
      s.setAttribute("data-cfasync", "false");
      document.body.appendChild(s);
    }
  }
}

function removeAdsTags() {
  for (const banner of ADSTERRA_BANNERS) {
    // Supprime les scripts autonomes
    if (banner.id) {
      document.getElementById(banner.id)?.remove();
    }
    // Vide les conteneurs pour les bannières natives et display
    if (banner.containerId) {
      const container = document.getElementById(banner.containerId);
      if (container) container.innerHTML = "";
    }
  }

  // Nettoyage supplémentaire des iframes laissées par Adsterra
  document
    .querySelectorAll(
      'iframe[src*="bellnewyork.org"], iframe[src*="accountut.com"]',
    )
    .forEach((e) => e.remove());

  adTagsInjected = false;
}

// ── Service Worker (PWA only) ─────────────────
async function registerSW() {
  if (!("serviceWorker" in navigator) || swRegistered) return;
  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    swRegistered = true;
    console.log("[pwa] SW PWA enregistré");
  } catch (e) {
    console.warn("[pwa] SW refusé :", e);
  }
}

/**
 * Politique pub selon le plan. À appeler APRÈS avoir chargé state.currentUser.
 * @param {boolean} isPremium
 */
export async function applyAdPolicy(isPremium) {
  console.log("[pwa] applyAdPolicy appelée, isPremium =", isPremium);
  if (isPremium) {
    removeAdsTags();
  } else {
    injectAdsTags();
  }
}

// ── PWA UI (installation) ────────────────────────────────────────
export function initPWA() {
  // On enregistre le SW pour TOUT LE MONDE (c'est du PWA pur maintenant)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      registerSW();
    });
  }

  if (isStandalone()) return;

  if (isIOS()) {
    if (!wasDismissed()) {
      setTimeout(
        () => el("pwaIosModal")?.classList.add("show"),
        INSTALL_BANNER_DELAY,
      );
    }
    el("pwaIosClose")?.addEventListener("click", dismissPermanently);
    return;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!wasDismissed()) showInstallBanner();
  });

  el("pwaInstallBtn")?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    hideInstallBanner();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") localStorage.setItem(DISMISS_KEY, "1");
  });

  el("pwaLaterBtn")?.addEventListener("click", hideInstallBanner);
  el("pwaNeverBtn")?.addEventListener("click", dismissPermanently);

  window.addEventListener("appinstalled", () => {
    localStorage.setItem(DISMISS_KEY, "1");
    hideInstallBanner();
  });
}
