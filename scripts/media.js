// ─────────────────────────────────────────────────────────────────
// scripts/media.js — GET /api/media/analyze, rendu de la carte vidéo,
// sélection de la qualité, sous-titres incrustés et découpage vidéo.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";
import { t } from "./i18n.js";
import { showStatus, fmtDur, SPINNER_HTML } from "./utils.js";
import { openModal } from "./modal.js";

const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const QUALITY_PRESETS = [
  {
    id: "4k",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    t: "4K Ultra HD",
    badge: "👑 Premium",
    sub: "2160p / 1440p (Qualité Max)",
    premium: true,
  },
  {
    id: "1080p",
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
    t: "1080p Full HD",
    badge: "",
    sub: "Haute Définition 1080p",
    premium: false,
  },
  {
    id: "720p",
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    t: "720p HD",
    badge: "",
    sub: "Standard HD Rapide & Léger",
    premium: false,
  },
  {
    id: "480p",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/></svg>',
    t: "480p SD",
    badge: "",
    sub: "Économie de données",
    premium: false,
  },
  {
    id: "mp3",
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    t: "Audio MP3",
    badge: "",
    sub: "Haute Qualité (320 kbps)",
    premium: false,
  },
];

function el(id) {
  return document.getElementById(id);
}

function isUserPremium() {
  return state.currentUser?.plan === "premium";
}

/** True si l'utilisateur non-Premium a épuisé ses 3 essais gratuits de découpage. */
export function trimLimitReached() {
  return (
    !!state.currentUser &&
    state.currentUser.plan !== "premium" &&
    (state.currentUser.trim_trials_used || 0) >= 3
  );
}

/** Met à jour le badge de quota et le verrouillage de l'option de découpage. */
export function updateTrimUI() {
  const badge = el("trimTrialsBadge");
  const wrap = el("trimToggleWrap");
  const toggle = el("trimToggle");
  const fieldsWrap = el("trimFieldsWrap");
  if (!badge || !wrap || !toggle) return;

  const premium = isUserPremium();
  const locked = trimLimitReached();

  if (premium || !state.currentUser) {
    badge.style.display = "none";
  } else {
    const used = state.currentUser.trim_trials_used || 0;
    const remaining = Math.max(0, 3 - used);
    badge.textContent = `${remaining}/3 essais restants`;
    badge.classList.toggle("limit-reached", remaining === 0);
    badge.style.display = "inline-block";
  }

  wrap.classList.toggle("locked", locked);
  if (locked && toggle.checked) {
    toggle.checked = false;
    state.wantsTrim = false;
    fieldsWrap?.classList.remove("open");
  }
}

/** Construit les puces de qualité et branche leur sélection. */
function renderFormats() {
  const container = el("vcFmts");
  if (!container) return;
  container.innerHTML = "";

  const premium = isUserPremium();
  const defaultIdx = premium ? 0 : 1; // 4K si Premium, sinon 1080p
  state.selQuality = QUALITY_PRESETS[defaultIdx].id;

  QUALITY_PRESETS.forEach((p, i) => {
    const isLocked = p.premium && !premium;
    const btn = document.createElement("button");
    btn.className =
      "fmt-card" +
      (i === defaultIdx ? " sel" : "") +
      (isLocked ? " locked" : "");
    btn.type = "button";
    const badgeHtml = p.badge
      ? `<span class="fmt-badge-prem">${p.badge}</span>`
      : "";
    btn.innerHTML = `<div class="fmt-icon">${p.icon}</div><div class="fmt-info"><div class="fmt-t"><span>${p.t}</span>${badgeHtml}</div><div class="fmt-sub">${p.sub}</div></div>`;

    btn.addEventListener("click", () => {
      if (isLocked) {
        openModal("premium");
        showStatus(t("card.premium_quality_locked"), "info");
        return;
      }
      state.selQuality = p.id;
      container
        .querySelectorAll(".fmt-card")
        .forEach((b) => b.classList.remove("sel"));
      btn.classList.add("sel");

      const subtitleOpts = el("subtitleOpts");
      if (subtitleOpts)
        subtitleOpts.style.display = p.id === "mp3" ? "none" : "block";
      if (p.id === "mp3") {
        state.withSubtitles = false;
        const toggle = el("subtitleToggle");
        if (toggle) toggle.checked = false;
        const langWrap = el("subtitleLangWrap");
        if (langWrap) langWrap.style.display = "none";
      }
    });

    container.appendChild(btn);
  });
}

/** Réinitialise les options sous-titres/découpage pour une nouvelle vidéo analysée. */
function resetPerVideoOptions() {
  state.withSubtitles = false;
  const subToggle = el("subtitleToggle");
  if (subToggle) subToggle.checked = false;
  const subLangSel = el("subtitleLang");
  if (subLangSel) subLangSel.value = "fr";
  state.subtitleLang = "fr";
  const langWrap = el("subtitleLangWrap");
  if (langWrap) langWrap.style.display = "none";
  const subtitleOpts = el("subtitleOpts");
  if (subtitleOpts)
    subtitleOpts.style.display = state.selQuality === "mp3" ? "none" : "block";

  state.wantsTrim = false;
  const trimToggle = el("trimToggle");
  if (trimToggle) trimToggle.checked = false;
  el("trimFieldsWrap")?.classList.remove("open");
  if (el("trimStart")) el("trimStart").value = "";
  if (el("trimEnd")) el("trimEnd").value = "";
  updateTrimUI();
}

function renderCard(info) {
  const img = el("thumbImg");
  const ph = el("thumbPlaceholder");
  const dur = el("thumbDuration");

  if (info.thumbnail) {
    img.src = info.thumbnail;
    img.style.display = "";
    ph.style.display = "none";
    img.onerror = () => {
      img.style.display = "none";
      ph.style.display = "flex";
    };
  } else {
    img.style.display = "none";
    ph.style.display = "flex";
  }

  if (info.duration) {
    dur.textContent = fmtDur(info.duration);
    dur.style.display = "";
  } else {
    dur.style.display = "none";
  }

  el("vcTitle").textContent =
    info.title.slice(0, 90) + (info.title.length > 90 ? "…" : "");

  const meta = el("vcMeta");
  meta.innerHTML = "";
  const chips = [
    {
      i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
      v: info.extractor,
    },
    info.duration
      ? {
          i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
          v: fmtDur(info.duration),
        }
      : null,
    {
      i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      v: (info.uploader || "").slice(0, 24),
    },
    {
      i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
      v: `${info.formats.length} formats`,
    },
  ].filter(Boolean);
  chips.forEach((c) => {
    const div = document.createElement("div");
    div.className = "meta-chip";
    div.innerHTML = `${c.i}<span>${c.v}</span>`;
    meta.appendChild(div);
  });

  renderFormats();

  el("progressWrap")?.classList.remove("show");
  if (el("progressFill")) el("progressFill").style.width = "0%";
  if (el("progressPct")) el("progressPct").textContent = "";

  if (isDev && el("simBtn")) el("simBtn").style.display = "flex";

  resetPerVideoOptions();

  el("videoCard")?.classList.add("show");
  el("videoCard")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function analyzeUrl() {
  const url = el("urlInput")?.value.trim();
  if (!url) {
    showStatus(t("st.no_url"), "error");
    return;
  }

  const btn = el("analyzeBtn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `${SPINNER_HTML}<span>${t("st.analyzing")}</span>`;
  }
  showStatus(t("st.analyzing"), "info");

  try {
    const headers = state.token
      ? { Authorization: "Bearer " + state.token }
      : {};
    const r = await fetch(
      `${ENDPOINTS.mediaAnalyze}?url=${encodeURIComponent(url)}`,
      { headers },
    );
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || t("st.err"));

    state.currentInfo = d.data;
    renderCard(d.data);
    showStatus(`✓ ${d.data.formats.length} ${t("st.ready")}`, "success");
  } catch (e) {
    showStatus(t("st.err") + e.message, "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><span>${t("hero.analyze")}</span>`;
    }
  }
}

function openBrowser() {
  const url = el("urlInput")?.value.trim();
  if (url) window.open(url, "_blank", "noopener,noreferrer");
}

/** Câble le toggle sous-titres (avec/sans + langue). */
function initSubtitleEvents() {
  el("subtitleToggle")?.addEventListener("change", (e) => {
    state.withSubtitles = e.target.checked;
    const langWrap = el("subtitleLangWrap");
    if (langWrap)
      langWrap.style.display = state.withSubtitles ? "flex" : "none";
  });
  el("subtitleLang")?.addEventListener("change", (e) => {
    state.subtitleLang = e.target.value;
  });
}

/** Câble le toggle découpage vidéo (avec verrouillage sur quota épuisé). */
function initTrimEvents() {
  const toggle = el("trimToggle");
  const fieldsWrap = el("trimFieldsWrap");
  if (!toggle) return;

  // Un clic alors que le quota est épuisé doit ouvrir la modale Premium
  // AVANT que la case ne bascule : preventDefault empêche le changement d'état.
  toggle.addEventListener("click", (e) => {
    if (trimLimitReached()) {
      e.preventDefault();
      openModal("premium");
      showStatus(t("card.trim_limit_reached"), "info");
    }
  });

  toggle.addEventListener("change", () => {
    if (trimLimitReached()) {
      toggle.checked = false;
      return;
    }
    state.wantsTrim = toggle.checked;
    fieldsWrap?.classList.toggle("open", state.wantsTrim);
  });
}

/** Câble les interactions liées à l'analyse (bouton, touche Entrée, "Regarder", sous-titres, découpage). */
export function initMediaEvents() {
  el("analyzeBtn")?.addEventListener("click", analyzeUrl);
  el("urlInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") analyzeUrl();
  });
  el("watchBtn")?.addEventListener("click", openBrowser);
  initSubtitleEvents();
  initTrimEvents();
}
