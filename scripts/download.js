// ─────────────────────────────────────────────────────────────────
// scripts/download.js — POST /api/media/download/start, puis suit
// /api/media/progress/:jobId (SSE) et déclenche /api/media/file/:jobId.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from './config.js';
import { state } from './state.js';
import { t } from './i18n.js';
import { showStatus } from './utils.js';

let activeEventSource = null;

function el(id) { return document.getElementById(id); }

function triggerFileDownload(jobId, title, ext) {
  const a = document.createElement('a');
  a.href = ENDPOINTS.mediaFile(jobId);
  a.download = `${title || 'video'}.${ext || 'mp4'}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function startDownload() {
  const url = el('urlInput')?.value.trim();
  if (!url || !state.currentInfo) {
    showStatus(t('dl.no_analysis'), 'info');
    return;
  }

  if (activeEventSource) {
    activeEventSource.close();
    activeEventSource = null;
  }

  const pw = el('progressWrap');
  const fill = el('progressFill');
  const pct = el('progressPct');
  const lbl = el('progressLbl');
  const total = el('progressTotal');
  const speed = el('progressSpeed');
  const eta = el('progressEta');
  const dlBtn = el('dlBtn');

  pw?.classList.add('show');
  if (fill) { fill.style.width = '0%'; fill.style.background = 'var(--accent)'; }
  if (pct) pct.textContent = '0%';
  if (lbl) lbl.textContent = t('dl.preparing');
  if (total) total.textContent = '';
  if (speed) speed.textContent = '';
  if (eta) eta.textContent = '';
  if (dlBtn) dlBtn.disabled = true;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (state.token) headers.Authorization = 'Bearer ' + state.token;

    const body = {
      url,
      format: state.selFmt,
      title: state.currentInfo?.title || 'video',
    };
    if (state.selSublang) body.sublang = state.selSublang;

    const r = await fetch(ENDPOINTS.mediaDownloadStart, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await r.json();

    if (!r.ok) {
      showStatus(data.error || t('dl.err'), 'error');
      pw?.classList.remove('show');
      if (dlBtn) dlBtn.disabled = false;
      return;
    }

    const { jobId } = data;
    if (lbl) lbl.textContent = t('dl.progress');

    activeEventSource = new EventSource(ENDPOINTS.mediaProgress(jobId));

    activeEventSource.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      if (msg.type === 'progress') {
        const p = Math.min(99, msg.percent || 0);
        if (fill) fill.style.width = p + '%';
        if (pct) pct.textContent = p.toFixed(1) + '%';
        if (msg.total && total) total.textContent = '📦 ' + msg.total;
        if (msg.speed && speed) speed.textContent = '⚡ ' + msg.speed;
        if (msg.eta && eta) eta.textContent = '⏱ ETA ' + msg.eta;
      } else if (msg.type === 'done') {
        activeEventSource.close();
        activeEventSource = null;

        if (fill) { fill.style.width = '100%'; fill.style.background = 'var(--success)'; }
        if (pct) pct.textContent = '100%';
        if (lbl) lbl.textContent = t('dl.packaging');
        if (speed) speed.textContent = '';
        if (eta) eta.textContent = '';

        triggerFileDownload(msg.jobId, msg.title, msg.ext);

        setTimeout(() => {
          if (lbl) lbl.textContent = '✅ ' + t('dl.done');
          if (dlBtn) dlBtn.disabled = false;
        }, 800);
      } else if (msg.type === 'error') {
        activeEventSource.close();
        activeEventSource = null;

        if (fill) { fill.style.width = '100%'; fill.style.background = 'var(--error)'; }
        if (pct) pct.textContent = '';
        if (lbl) lbl.textContent = '❌ ' + (msg.message || t('dl.err'));
        if (speed) speed.textContent = '';
        if (eta) eta.textContent = '';
        showStatus(msg.message || t('dl.err'), 'error');
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
    showStatus('Erreur réseau : ' + e.message, 'error');
    pw?.classList.remove('show');
    if (dlBtn) dlBtn.disabled = false;
  }
}

/** Câble le bouton de téléchargement. */
export function initDownloadEvents() {
  el('dlBtn')?.addEventListener('click', startDownload);
}