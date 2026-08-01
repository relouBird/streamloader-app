// ─────────────────────────────────────────────────────────────────
// scripts/media.js — GET /api/media/analyze, rendu de la carte vidéo,
// sélection du format et de la langue de sous-titres.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";
import { t } from "./i18n.js";
import { showStatus, fmtDur, SPINNER_HTML } from "./utils.js";

const FORMAT_PRESETS = [
  {
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
    t: "Vidéo Max",
    sub: "Meilleure qualité (MP4)",
    v: "bestvideo+bestaudio/best",
    isAudio: false,
  },
  {
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
    t: "1080p",
    sub: "Full HD (MP4)",
    v: "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
    isAudio: false,
  },
  {
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    t: "720p",
    sub: "Standard HD (MP4)",
    v: "bestvideo[height<=720]+bestaudio/best[height<=720]",
    isAudio: false,
  },
  {
    icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    t: "Audio MP3",
    sub: "Haute Qualité",
    v: "bestaudio/best",
    isAudio: true,
  },
];

function el(id) {
  return document.getElementById(id);
}

/** Construit les puces de format et branche leur sélection. */
function renderFormats() {
  const container = el("vcFmts");
  if (!container) return;
  container.innerHTML = "";

  FORMAT_PRESETS.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.className = "fmt-card" + (i === 0 ? " sel" : "");
    btn.type = "button";
    btn.innerHTML = `<div class="fmt-icon">${p.icon}</div><div class="fmt-info"><div class="fmt-t">${p.t}</div><div class="fmt-sub">${p.sub}</div></div>`;
    if (i === 0) state.selFmt = p.v;

    btn.addEventListener("click", () => {
      state.selFmt = p.v;
      container
        .querySelectorAll(".fmt-card")
        .forEach((b) => b.classList.remove("sel"));
      btn.classList.add("sel");
      renderSubtitles(state.currentInfo); // les sous-titres n'ont de sens que pour la vidéo
    });

    container.appendChild(btn);
  });
}

/** Construit le sélecteur de sous-titres à partir de info.subtitles (peut être vide). */
function renderSubtitles(info) {
  const container = el("vcSubs");
  if (!container) return;

  const currentPreset = FORMAT_PRESETS.find((p) => p.v === state.selFmt);
  const isAudioSelected = currentPreset?.isAudio;
  const subs = info?.subtitles || [];

  state.selSublang = null; // reset à chaque nouveau rendu (changement de format ou de vidéo)

  if (isAudioSelected || subs.length === 0) {
    container.innerHTML = "";
    return;
  }

  const chipsHtml = subs
    .map(
      (code) =>
        `<button type="button" class="sub-chip" data-lang="${code}">${code}</button>`,
    )
    .join("");
  container.innerHTML = `
    <div class="sub-block">
      <div class="fmt-label">${t("card.subtitles")}</div>
      <div class="sub-chips">
        <button type="button" class="sub-chip sel" data-lang="">${t("card.subtitles_none")}</button>
        ${chipsHtml}
      </div>
    </div>
  `;

  container.querySelectorAll(".sub-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      container
        .querySelectorAll(".sub-chip")
        .forEach((c) => c.classList.remove("sel"));
      chip.classList.add("sel");
      const lang = chip.dataset.lang;
      state.selSublang = lang || null;
    });
  });
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
  renderSubtitles(info);

  el("progressWrap")?.classList.remove("show");
  if (el("progressFill")) el("progressFill").style.width = "0%";
  if (el("progressPct")) el("progressPct").textContent = "";

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

/** Câble les interactions liées à l'analyse (bouton, touche Entrée, "Regarder"). */
export function initMediaEvents() {
  el("analyzeBtn")?.addEventListener("click", analyzeUrl);
  el("urlInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") analyzeUrl();
  });
  el("watchBtn")?.addEventListener("click", openBrowser);
}
