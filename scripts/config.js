// ─────────────────────────────────────────────────────────────────
// scripts/config.js — point unique de vérité pour les routes de l'API Node.
// Si l'API change un jour de préfixe, on ne touche qu'ici.
// ─────────────────────────────────────────────────────────────────

export const API_BASE = "https://www.streamback.mon-ndem.com/api";

export const ENDPOINTS = {
  authRegister: `${API_BASE}/auth/register`,
  authLogin: `${API_BASE}/auth/login`,
  authMe: `${API_BASE}/auth/me`,

  mediaAnalyze: `${API_BASE}/media/analyze`,
  mediaDownloadStart: `${API_BASE}/media/download/start`,
  mediaProgress: (jobId) => `${API_BASE}/media/progress/${jobId}`,
  mediaFile: (jobId) => `${API_BASE}/media/file/${jobId}`,

  paymentInitiate: `${API_BASE}/payment/initiate`,
  paymentStatus: (txId) => `${API_BASE}/payment/status/${txId}`,
};

// Clés de stockage local (regroupées ici pour éviter les typos éparpillées)
export const STORAGE_KEYS = {
  token: "sl-tok",
  theme: "sl-th",
};
