// scripts/pwa.js — SW (PWA + Monetag) + UI d'installation + politique pub
// Un utilisateur Premium n'a : ni tags Monetag, ni Service Worker → zéro pub.

const DISMISS_KEY = "sl_pwa_dismissed";
const INSTALL_BANNER_DELAY = 3000;

// ── Monetag ──────────────────────────────────────────────────────
const MONETAG_SW_PATH = "/sw.js";
const MONETAG_TAGS = [
  { src: "https://quge5.com/88/tag.min.js", zone: "290672" },
  { src: "https://nap5k.com/tag.min.js", zone: "11956487" },
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
  // iPadOS 13+ se fait passer pour du macOS, d'où le check `maxTouchPoints`
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

// ── Tags Monetag (injection conditionnelle) ──────────────────────
function injectMonetagTags() {
  if (adTagsInjected) return;
  adTagsInjected = true;
  for (const { src, zone } of MONETAG_TAGS) {
    if (document.querySelector(`script[src="${src}"]`)) continue;
    const s = document.createElement("script");
    s.src = src;
    s.dataset.zone = zone;
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    document.head.appendChild(s);
  }
}

function removeMonetagTags() {
  for (const { src } of MONETAG_TAGS) {
    document
      .querySelectorAll(`script[src="${src}"]`)
      .forEach((n) => n.remove());
  }
  adTagsInjected = false;
}

// ── Service Worker (PWA + Monetag, même fichier) ─────────────────
async function registerSW() {
  if (!("serviceWorker" in navigator) || swRegistered) return;
  try {
    await navigator.serviceWorker.register(MONETAG_SW_PATH, { scope: "/" });
    swRegistered = true;
    console.log("[pwa] SW enregistré (ads actives)");
  } catch (e) {
    console.warn("[pwa] SW refusé :", e);
  }
}

async function unregisterSW() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) {
      if (reg.active?.scriptURL?.endsWith(MONETAG_SW_PATH)) {
        await reg.unregister();
        console.log("[pwa] SW désenregistré (ads coupées)");
      }
    }
    swRegistered = false;
    // Purge complète des caches (Monetag en pose parfois)
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  } catch (e) {
    console.warn("[pwa] Échec désenregistrement SW :", e);
  }
}

/**
 * Politique pub selon le plan. À appeler APRÈS avoir chargé state.currentUser.
 * @param {boolean} isPremium
 */
export async function applyAdPolicy(isPremium) {
  console.log("[pwa] applyAdPolicy appelée, isPremium =", isPremium); // ← AJOUTE ÇA
  if (isPremium) {
    removeMonetagTags();
    await unregisterSW();
  } else {
    injectMonetagTags();
    await registerSW();
  }
}

// ── PWA UI (installation) ────────────────────────────────────────
export function initPWA() {
  // Le SW est géré par applyAdPolicy(), pas ici.
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
