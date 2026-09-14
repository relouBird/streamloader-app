// ─────────────────────────────────────────────────────────────────
// scripts/download.js — POST /api/media/download/start, puis suit
// /api/media/progress/:jobId (SSE) et déclenche /api/media/file/:jobId.
// Gère la qualité choisie, les sous-titres incrustés et le découpage
// vidéo sur mesure.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";
import { t } from "./i18n.js";
import { showStatus, formatFileSize } from "./utils.js";
import { openModal } from "./modal.js";
import { reloadUser } from "./auth.js";

let activeEventSource = null;

function el(id) {
  return document.getElementById(id);
}

const TRIM_TIME_RE = /^\d{1,2}(:\d{2}){1,2}$/;

/** Ouvre l'onglet publicitaire (utilisateurs non-Premium) avant de lancer le téléchargement. */
function startDownloadFromButton() {
  if (state.currentUser?.plan !== "premium") {
    window.open(ENDPOINTS.adClick, "_blank", "noopener,noreferrer");
  }
  return startDownload();
}

async function startDownload() {
  const url = el("urlInput")?.value.trim();
  if (!url || !state.currentInfo) {
    showStatus(t("dl.no_analysis"), "info");
    return;
  }

  const isUserPremium = state.currentUser?.plan === "premium";
  if (state.selQuality === "4k" && !isUserPremium) {
    openModal("premium");
    showStatus(t("dl.premium_quality_required"), "info");
    return;
  }

  // Découpage vidéo sur mesure : validation du format avant l'envoi.
  let trimStartVal = null;
  let trimEndVal = null;
  if (state.wantsTrim) {
    trimStartVal = el("trimStart")?.value.trim() || "";
    trimEndVal = el("trimEnd")?.value.trim() || "";
    if (!TRIM_TIME_RE.test(trimStartVal) || !TRIM_TIME_RE.test(trimEndVal)) {
      showStatus(t("dl.trim_invalid_time"), "error");
      return;
    }
    if (!state.currentUser) {
      openModal("register");
      showStatus(t("dl.trim_login_required"), "info");
      return;
    }
  }

  if (activeEventSource) {
    activeEventSource.close();
    activeEventSource = null;
  }

  const pw = el("progressWrap");
  const fill = el("progressFill");
  const pct = el("progressPct");
  const lbl = el("progressLbl");
  const total = el("progressTotal");
  const speed = el("progressSpeed");
  const eta = el("progressEta");
  const dlBtn = el("dlBtn");

  pw?.classList.add("show");
  if (fill) {
    fill.style.width = "0%";
    fill.style.background = "var(--accent)";
  }
  if (pct) pct.textContent = "0%";
  if (lbl) lbl.textContent = t("dl.preparing");
  if (total) total.textContent = "";
  if (speed) speed.textContent = "";
  if (eta) eta.textContent = "";
  if (dlBtn) dlBtn.disabled = true;

  try {
    const headers = { "Content-Type": "application/json" };
    if (state.token) headers.Authorization = "Bearer " + state.token;

    const body = {
      url,
      quality: state.selQuality,
      title: state.currentInfo?.title || "video",
      ...(state.withSubtitles ? { sublang: state.subtitleLang } : {}),
      ...(state.wantsTrim
        ? { trim: true, startTime: trimStartVal, endTime: trimEndVal }
        : {}),
    };

    const r = await fetch(ENDPOINTS.mediaDownloadStart, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await r.json();

    if (!r.ok) {
      if (
        data.code === "PREMIUM_REQUIRED" ||
        data.code === "TRIM_LIMIT_REACHED" ||
        data.code === "SUBTITLE_LIMIT_REACHED"
      ) {
        openModal("premium");
      } else if (data.code === "LOGIN_REQUIRED") {
        openModal("register");
      }
      showStatus(data.error || t("dl.err"), "error");
      pw?.classList.remove("show");
      if (dlBtn) dlBtn.disabled = false;
      return;
    }

    // Un essai gratuit vient d'être consommé côté serveur : rafraîchir le badge de quota.
    if (
      state.wantsTrim &&
      state.currentUser &&
      state.currentUser.plan !== "premium"
    ) {
      await reloadUser();
    }

    const { jobId } = data;
    if (lbl) lbl.textContent = t("dl.progress");

    // EventSource ne peut pas envoyer de header Authorization : le token
    // (si connecté) passe donc en paramètre de requête.
    activeEventSource = new EventSource(
      ENDPOINTS.mediaProgress(jobId, state.token),
    );

    activeEventSource.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === "progress") {
        const p = Math.min(99, msg.percent || 0);
        if (fill) fill.style.width = p + "%";
        if (pct) pct.textContent = p.toFixed(1) + "%";
        if (msg.total && total) total.textContent = "📦 " + msg.total;
        if (msg.speed && speed) speed.textContent = "⚡ " + msg.speed;
        if (msg.eta && eta) eta.textContent = "⏱ ETA " + msg.eta;
      } else if (msg.type === "processing") {
        if (fill) fill.style.width = "99%";
        if (pct) pct.textContent = "99%";
        if (lbl) lbl.textContent = msg.message || t("dl.processing");
        if (speed) speed.textContent = "";
        if (eta) eta.textContent = "";
      } else if (msg.type === "done") {
        activeEventSource.close();
        activeEventSource = null;

        if (fill) {
          fill.style.width = "100%";
          fill.style.background = "var(--success)";
        }
        if (pct) pct.textContent = "100%";
        if (lbl) lbl.textContent = t("dl.packaging");
        if (msg.finalSize && total)
          total.textContent = "📦 " + formatFileSize(msg.finalSize);
        if (speed) speed.textContent = "";
        if (eta) eta.textContent = "";

        triggerFileDownload(msg.jobId, msg.title, msg.ext);

        setTimeout(() => {
          if (lbl) lbl.textContent = "✅ " + t("dl.done");
          if (dlBtn) dlBtn.disabled = false;
        }, 800);
      } else if (msg.type === "error") {
        activeEventSource.close();
        activeEventSource = null;

        if (fill) {
          fill.style.width = "100%";
          fill.style.background = "var(--error)";
        }
        if (pct) pct.textContent = "";
        if (lbl) lbl.textContent = "❌ " + (msg.message || t("dl.err"));
        if (speed) speed.textContent = "";
        if (eta) eta.textContent = "";
        showStatus(msg.message || t("dl.err"), "error");
        if (dlBtn) dlBtn.disabled = false;
      }
    };

    activeEventSource.onerror = () => {
      if (activeEventSource) {
        activeEventSource.close();
        activeEventSource = null;
      }
      if (dlBtn) dlBtn.disabled = false;
    };
  } catch (e) {
    showStatus("Erreur réseau : " + e.message, "error");
    pw?.classList.remove("show");
    if (dlBtn) dlBtn.disabled = false;
  }
}

function triggerFileDownload(jobId, title, ext) {
  const a = document.createElement("a");
  a.href = ENDPOINTS.mediaFile(jobId, state.token);
  a.download = `${title || "video"}.${ext || "mp4"}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Câble le bouton de téléchargement. */
export function initDownloadEvents() {
  el("dlBtn")?.addEventListener("click", startDownloadFromButton);
}
