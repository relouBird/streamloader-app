// scripts/ui.js
import * as api from "./api.js";
import { switchTab, currentUser } from "./auth.js";
import { t } from "./lang.js";

let selFmt = "bestvideo+bestaudio/best";
let currentInfo = null;
let activeEventSource = null;

/* ─── Publicités ─────────────────────────────────────────────── */
export function updateAdVisibility() {
  const isPremium = currentUser?.plan === "premium";
  const slots = document.querySelectorAll(".ad-slot");
  slots.forEach((slot) => {
    if (isPremium) {
      slot.style.display = "none";
    } else {
      slot.style.display = "block";
      // Ici, tu peux charger dynamiquement les scripts pub si nécessaire
    }
  });
}
// Appel immédiat après le chargement initial
document.addEventListener("user-updated", updateAdVisibility);

/* ─── Status ─────────────────────────────────────────────────── */
export function showStatus(msg, type = "info") {
  const icons = {
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  };
  document.getElementById("status-area").innerHTML =
    `<div class="status-msg status-${type}">${icons[type]}<span>${msg}</span></div>`;
  if (type !== "error")
    setTimeout(() => {
      document.getElementById("status-area").innerHTML = "";
    }, 6000);
}

/* ─── Analyse & carte vidéo ──────────────────────────────────── */
export async function analyzeUrl() {
  const url = document.getElementById("urlInput").value.trim();
  if (!url) {
    showStatus(t("st.no_url"), "error");
    return;
  }

  const btn = document.getElementById("analyzeBtn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spin"></span><span>${t("st.analyzing")}</span>`;
  showStatus(t("st.analyzing"), "info");

  try {
    const data = await api.analyzeUrl(url);
    currentInfo = data.data;
    renderCard(data.data);
    showStatus(`✓ ${data.data.formats.length} ${t("st.ready")}`, "success");
  } catch (e) {
    showStatus(t("st.err") + e.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><span>${t("hero.analyze")}</span>`;
  }
}

function renderCard(info) {
  const img = document.getElementById("thumbImg");
  const ph = document.getElementById("thumbPlaceholder");
  const dur = document.getElementById("thumbDuration");
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
    const h = Math.floor(info.duration / 3600),
      m = Math.floor((info.duration % 3600) / 60),
      s = info.duration % 60;
    dur.textContent = h
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${m}:${String(s).padStart(2, "0")}`;
    dur.style.display = "";
  } else {
    dur.style.display = "none";
  }

  document.getElementById("vcTitle").textContent =
    info.title.slice(0, 90) + (info.title.length > 90 ? "…" : "");

  const meta = document.getElementById("vcMeta");
  meta.innerHTML = "";
  const chips = [
    {
      i: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`,
      v: info.extractor,
    },
    info.duration
      ? {
          i: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
          v: fmtDur(info.duration),
        }
      : null,
    {
      i: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      v: info.uploader.slice(0, 24),
    },
    {
      i: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
      v: info.formats.length + " formats",
    },
  ].filter(Boolean);
  chips.forEach((c) => {
    const div = document.createElement("div");
    div.className = "meta-chip";
    div.innerHTML = `${c.i}<span>${c.v}</span>`;
    meta.appendChild(div);
  });

  // Formats interactifs
  const fmts = document.getElementById("vcFmts");
  fmts.innerHTML = "";
  const presets = [
    {
      i: "🎬",
      t: "Vidéo Max",
      sub: "Meilleure qualité",
      v: "bestvideo+bestaudio/best",
    },
    {
      i: "📺",
      t: "1080p",
      sub: "Full HD",
      v: "bestvideo[height<=1080]+bestaudio/best[height<=1080]",
    },
    {
      i: "📱",
      t: "720p",
      sub: "Standard HD",
      v: "bestvideo[height<=720]+bestaudio/best[height<=720]",
    },
    { i: "🎵", t: "Audio MP3", sub: "Haute Qualité", v: "bestaudio/best" },
  ];
  presets.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.className = "fmt-card" + (i === 0 ? " sel" : "");
    btn.innerHTML = `<div class="fmt-icon">${p.i}</div><div class="fmt-info"><div class="fmt-t">${p.t}</div><div class="fmt-sub">${p.sub}</div></div>`;
    if (i === 0) selFmt = p.v;
    btn.onclick = () => {
      selFmt = p.v;
      fmts
        .querySelectorAll(".fmt-card")
        .forEach((b) => b.classList.remove("sel"));
      btn.classList.add("sel");
    };
    fmts.appendChild(btn);
  });

  document.getElementById("progressWrap").classList.remove("show");
  document.getElementById("progressFill").style.width = "0%";
  document.getElementById("progressPct").textContent = "";

  document.getElementById("videoCard").classList.add("show");
  document
    .getElementById("videoCard")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fmtDur(s) {
  const h = Math.floor(s / 3600),
    m = Math.floor((s % 3600) / 60),
    ss = s % 60;
  return h
    ? `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
    : `${m}:${String(ss).padStart(2, "0")}`;
}

/* ─── Téléchargement ──────────────────────────────────────────── */
export async function startDownload() {
  const url = document.getElementById("urlInput").value.trim();
  if (!url || !currentInfo) return;

  if (activeEventSource) {
    activeEventSource.close();
    activeEventSource = null;
  }

  const pw = document.getElementById("progressWrap");
  const fill = document.getElementById("progressFill");
  const pct = document.getElementById("progressPct");
  const lbl = document.getElementById("progressLbl");
  const total = document.getElementById("progressTotal");
  const speed = document.getElementById("progressSpeed");
  const eta = document.getElementById("progressEta");
  const dlBtn = document.getElementById("dlBtn");

  pw.classList.add("show");
  fill.style.width = "0%";
  fill.style.background = "var(--accent)";
  pct.textContent = "0%";
  lbl.textContent = "Préparation du téléchargement…";
  total.textContent = "";
  speed.textContent = "";
  eta.textContent = "";
  dlBtn.disabled = true;

  try {
    const data = await api.startDownload(url, selFmt, currentInfo.title);
    const { jobId } = data;
    lbl.textContent = "Téléchargement en cours…";

    activeEventSource = api.connectProgressSSE(
      jobId,
      (msg) => {
        const p = Math.min(99, msg.percent || 0);
        fill.style.width = p + "%";
        pct.textContent = p.toFixed(1) + "%";
        if (msg.total) total.textContent = "📦 " + msg.total;
        if (msg.speed) speed.textContent = "⚡ " + msg.speed;
        if (msg.eta) eta.textContent = "⏱ ETA " + msg.eta;
      },
      (msg) => {
        activeEventSource = null;
        fill.style.width = "100%";
        pct.textContent = "100%";
        lbl.textContent = "✅ Préparation du fichier…";
        speed.textContent = "";
        eta.textContent = "";
        fill.style.background = "var(--success)";

        const a = document.createElement("a");
        a.href = api.getFileUrl(msg.jobId);
        a.download = `${msg.title || "video"}.${msg.ext || "mp4"}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
          lbl.textContent = "✅ " + t("dl.done");
          dlBtn.disabled = false;
        }, 800);
      },
      (errorMsg) => {
        activeEventSource = null;
        fill.style.width = "100%";
        fill.style.background = "var(--error)";
        pct.textContent = "";
        lbl.textContent = "❌ " + errorMsg;
        speed.textContent = "";
        eta.textContent = "";
        showStatus(errorMsg, "error");
        dlBtn.disabled = false;
      },
    );
  } catch (e) {
    showStatus(e.message, "error");
    pw.classList.remove("show");
    dlBtn.disabled = false;
  }
}

export function selectFormat(fmt) {
  selFmt = fmt;
}
export function resetProgress() {
  /* ... */
}

/* ─── Modale ──────────────────────────────────────────────────── */
let modalMode = "login";

export function openModal(mode) {
  modalMode = mode;
  const backdrop = document.getElementById("modalBackdrop");
  ["panelAuth", "panelPremium", "panelProfile"].forEach(
    (id) => (document.getElementById(id).style.display = "none"),
  );
  ["authErr", "authOk", "premErr", "premOk"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = "none";
      el.textContent = "";
    }
  });

  if (mode === "login" || mode === "register") {
    document.getElementById("panelAuth").style.display = "";
    // switchTab est importé de auth.js, mais on l'appellera via l'UI directement dans auth.js
    // On peut juste déclencher switchTab ici si besoin
    if (mode === "login") switchTab("login");
    else switchTab("register");
  } else if (mode === "premium") {
    document.getElementById("panelPremium").style.display = "";
    const notice = document.getElementById("premLoginNotice");
    if (notice) notice.style.display = currentUser ? "none" : "";
    const pb = document.getElementById("premBtn");
    if (pb) {
      pb.disabled = !currentUser;
      pb.style.opacity = currentUser ? "1" : "0.5";
    }
  } else if (mode === "profile") {
    document.getElementById("panelProfile").style.display = "";
    document.getElementById("profEmail").textContent = currentUser?.email || "";
    document.getElementById("profPlan").textContent =
      currentUser?.plan === "premium" ? "⚡ Premium" : "Gratuit";
    const upg = document.getElementById("profUpgradeBtn");
    if (upg) upg.style.display = currentUser?.plan === "premium" ? "none" : "";
    // etc.
  }
  backdrop.classList.add("open");
}

export function closeModal() {
  document.getElementById("modalBackdrop").classList.remove("open");
}

export function backdropClick(e) {
  if (e.target === document.getElementById("modalBackdrop")) closeModal();
}

// Export supplémentaire pour le paiement
export async function doPremium() {
  // Appel api.initiatePayment et redirection
}
