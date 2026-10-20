// ─────────────────────────────────────────────────────────────────
// scripts/config.js — point unique de vérité pour les routes de l'API Node.
// Si l'API change un jour de préfixe, on ne touche qu'ici.
// ─────────────────────────────────────────────────────────────────

export const API_BASE = "http://localhost:5101/api";
// export const API_BASE = "https://back.streamloaders.net/api";

export const ENDPOINTS = {
  authRegister: `${API_BASE}/auth/register`,
  authLogin: `${API_BASE}/auth/login`,
  authMe: `${API_BASE}/auth/me`,

  mediaAnalyze: `${API_BASE}/media/analyze`,
  mediaDownloadStart: `${API_BASE}/media/download/start`,
  mediaProgress: (jobId, token) =>
    `${API_BASE}/media/progress/${jobId}${token ? "?token=" + encodeURIComponent(token) : ""}`,
  mediaFile: (jobId, token) =>
    `${API_BASE}/media/file/${jobId}${token ? "?token=" + encodeURIComponent(token) : ""}`,
  adClick: `${API_BASE}/ad-click`,

  paymentInitiate: `${API_BASE}/payment/initiate`,
  paymentStatus: (txId) => `${API_BASE}/payment/status/${txId}`,
  reviews: (id, action) => `${API_BASE}/admin/reviews/${id}/${action}`,
  reviewsPending: `${API_BASE}/admin/reviews/pending`,

  // Compte utilisateur
  accountApiKey: `${API_BASE}/account/api-key`,
};

// Clés de stockage local (regroupées ici pour éviter les typos éparpillées)
export const STORAGE_KEYS = {
  token: "sl-tok",
  theme: "sl-th",
  country: "sl_user_country",
};

// ─── Multi-devises & Géo-détection automatique (Premium) ──────────
// le prix réel est calculé à partir de PLAN_PRICES_USD × LOCAL_RATES.
export const CURRENCIES = {
  XAF: { symbol: "FCFA", amount: 900,    formatted: "900 FCFA",     approx: "≈ 1.50€", flag: "🇨🇲", country: "Cameroun / Afrique Centrale" },
  XOF: { symbol: "FCFA", amount: 900,    formatted: "900 FCFA",     approx: "≈ 1.50€", flag: "🇨🇮", country: "Côte d'Ivoire / Afrique de l'Ouest" },
  EUR: { symbol: "€",    amount: 1.38,   formatted: "1,38 €",       approx: "≈ 900 FCFA", flag: "🇪🇺", country: "France / Europe" },
  USD: { symbol: "$",    amount: 1.50,   formatted: "$1.50 USD",    approx: "≈ 900 FCFA", flag: "🇺🇸", country: "États-Unis / International" },
  CAD: { symbol: "$ CAD", amount: 2.04,  formatted: "2,04 $ CAD",   approx: "≈ 1.50€", flag: "🇨🇦", country: "Canada" },
  GBP: { symbol: "£",    amount: 1.19,   formatted: "£1.19",        approx: "≈ 1.50€", flag: "🇬🇧", country: "Royaume-Uni" },
  NGN: { symbol: "₦",    amount: 2400,   formatted: "₦2 400",       approx: "≈ 1.50€", flag: "🇳🇬", country: "Nigeria" },
  GHS: { symbol: "GH₵",  amount: 23,     formatted: "GH₵ 23",       approx: "≈ 1.50€", flag: "🇬🇭", country: "Ghana" },
  CDF: { symbol: "CDF",  amount: 4200,   formatted: "4 200 CDF",    approx: "≈ 1.50€", flag: "🇨🇩", country: "RD Congo" },
  MAD: { symbol: "MAD",  amount: 15,     formatted: "15 MAD",       approx: "≈ 1.50€", flag: "🇲🇦", country: "Maroc" },
  DZD: { symbol: "DZD",  amount: 203,    formatted: "203 DZD",      approx: "≈ 1.50€", flag: "🇩🇿", country: "Algérie" },
  TND: { symbol: "TND",  amount: 4.65,   formatted: "4,65 TND",     approx: "≈ 1.50€", flag: "🇹🇳", country: "Tunisie" },
  GNF: { symbol: "GNF",  amount: 12900,  formatted: "12 900 GNF",   approx: "≈ 1.50€", flag: "🇬🇳", country: "Guinée" },
  CHF: { symbol: "CHF",  amount: 1.35,   formatted: "1.35 CHF",     approx: "≈ 1.50€", flag: "🇨🇭", country: "Suisse" },
  ZAR: { symbol: "ZAR",  amount: 27,     formatted: "R 27",         approx: "≈ 1.50€", flag: "🇿🇦", country: "Afrique du Sud" },
  BRL: { symbol: "R$",   amount: 7.50,   formatted: "R$ 7,50",      approx: "≈ 1.50€", flag: "🇧🇷", country: "Brésil" },
  INR: { symbol: "₹",    amount: 125,    formatted: "₹ 125",        approx: "≈ 1.50€", flag: "🇮🇳", country: "Inde" },
};

// Fuseau horaire → devise (repli quand le pays exact ne figure pas dans COUNTRY_MAP).
export const TIMEZONE_MAP = {
  "Africa/Douala": "XAF", "Africa/Libreville": "XAF", "Africa/Brazzaville": "XAF", "Africa/Ndjamena": "XAF", "Africa/Bangui": "XAF", "Africa/Malabo": "XAF",
  "Africa/Abidjan": "XOF", "Africa/Dakar": "XOF", "Africa/Bamako": "XOF", "Africa/Ouagadougou": "XOF", "Africa/Cotonou": "XOF", "Africa/Lome": "XOF", "Africa/Niamey": "XOF", "Africa/Bissau": "XOF",
  "Africa/Lagos": "NGN", "Africa/Accra": "GHS", "Africa/Kinshasa": "CDF", "Africa/Lubumbashi": "CDF", "Africa/Conakry": "GNF",
  "Africa/Casablanca": "MAD", "Africa/Algiers": "DZD", "Africa/Tunis": "TND", "Africa/Johannesburg": "ZAR",
  "Europe/Paris": "EUR", "Europe/Brussels": "EUR", "Europe/Berlin": "EUR", "Europe/Madrid": "EUR", "Europe/Rome": "EUR", "Europe/Lisbon": "EUR", "Europe/Amsterdam": "EUR", "Europe/Vienna": "EUR", "Europe/Dublin": "EUR", "Europe/Luxembourg": "EUR",
  "Europe/London": "GBP", "Europe/Zurich": "CHF",
  "America/Toronto": "CAD", "America/Montreal": "CAD", "America/Vancouver": "CAD", "America/Edmonton": "CAD", "America/Winnipeg": "CAD", "America/Halifax": "CAD",
  "America/New_York": "USD", "America/Chicago": "USD", "America/Denver": "USD", "America/Los_Angeles": "USD", "America/Phoenix": "USD", "America/Anchorage": "USD", "America/Honolulu": "USD",
  "America/Sao_Paulo": "BRL", "Asia/Kolkata": "INR",
};

// Fuseau horaire → code pays ISO (priorité sur TIMEZONE_MAP : plus précis).
export const TIMEZONE_COUNTRY_MAP = {
  "Africa/Douala": "CM", "Africa/Libreville": "GA", "Africa/Brazzaville": "CG",
  "Africa/Ndjamena": "TD", "Africa/Bangui": "CF", "Africa/Malabo": "GQ",
  "Africa/Abidjan": "CI", "Africa/Dakar": "SN", "Africa/Bamako": "ML",
  "Africa/Ouagadougou": "BF", "Africa/Cotonou": "BJ", "Africa/Lome": "TG",
  "Africa/Niamey": "NE", "Africa/Bissau": "GW", "Africa/Lagos": "NG",
  "Africa/Accra": "GH", "Africa/Kinshasa": "CD", "Africa/Lubumbashi": "CD",
  "Africa/Conakry": "GN", "Africa/Casablanca": "MA", "Africa/Algiers": "DZ",
  "Africa/Tunis": "TN", "Africa/Johannesburg": "ZA",
  "Europe/Paris": "FR", "Europe/Brussels": "BE", "Europe/Berlin": "DE",
  "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Lisbon": "PT",
  "Europe/Amsterdam": "NL", "Europe/Vienna": "AT", "Europe/Dublin": "IE",
  "Europe/Luxembourg": "LU", "Europe/London": "GB", "Europe/Zurich": "CH",
  "America/Toronto": "CA", "America/Montreal": "CA", "America/Vancouver": "CA",
  "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US",
  "America/Los_Angeles": "US", "America/Sao_Paulo": "BR", "Asia/Kolkata": "IN",
};

// Code pays ISO → { devise, drapeau emoji, nom affiché }.
export const COUNTRY_MAP = {
  CM: { curr: "XAF", flag: "🇨🇲", name: "Cameroun" },
  GA: { curr: "XAF", flag: "🇬🇦", name: "Gabon" },
  CG: { curr: "XAF", flag: "🇨🇬", name: "Congo" },
  TD: { curr: "XAF", flag: "🇹🇩", name: "Tchad" },
  CF: { curr: "XAF", flag: "🇨🇫", name: "Centrafrique" },
  GQ: { curr: "XAF", flag: "🇬🇶", name: "Guinée Équatoriale" },
  CI: { curr: "XOF", flag: "🇨🇮", name: "Côte d'Ivoire" },
  SN: { curr: "XOF", flag: "🇸🇳", name: "Sénégal" },
  ML: { curr: "XOF", flag: "🇲🇱", name: "Mali" },
  BF: { curr: "XOF", flag: "🇧🇫", name: "Burkina Faso" },
  BJ: { curr: "XOF", flag: "🇧🇯", name: "Bénin" },
  TG: { curr: "XOF", flag: "🇹🇬", name: "Togo" },
  NE: { curr: "XOF", flag: "🇳🇪", name: "Niger" },
  GW: { curr: "XOF", flag: "🇬🇼", name: "Guinée-Bissau" },
  FR: { curr: "EUR", flag: "🇫🇷", name: "France" },
  BE: { curr: "EUR", flag: "🇧🇪", name: "Belgique" },
  DE: { curr: "EUR", flag: "🇩🇪", name: "Allemagne" },
  ES: { curr: "EUR", flag: "🇪🇸", name: "Espagne" },
  IT: { curr: "EUR", flag: "🇮🇹", name: "Italie" },
  PT: { curr: "EUR", flag: "🇵🇹", name: "Portugal" },
  NL: { curr: "EUR", flag: "🇳🇱", name: "Pays-Bas" },
  AT: { curr: "EUR", flag: "🇦🇹", name: "Autriche" },
  LU: { curr: "EUR", flag: "🇱🇺", name: "Luxembourg" },
  US: { curr: "USD", flag: "🇺🇸", name: "États-Unis" },
  CA: { curr: "CAD", flag: "🇨🇦", name: "Canada" },
  GB: { curr: "GBP", flag: "🇬🇧", name: "Royaume-Uni" },
  NG: { curr: "NGN", flag: "🇳🇬", name: "Nigeria" },
  GH: { curr: "GHS", flag: "🇬🇭", name: "Ghana" },
  CD: { curr: "CDF", flag: "🇨🇩", name: "RD Congo" },
  MA: { curr: "MAD", flag: "🇲🇦", name: "Maroc" },
  DZ: { curr: "DZD", flag: "🇩🇿", name: "Algérie" },
  TN: { curr: "TND", flag: "🇹🇳", name: "Tunisie" },
  GN: { curr: "GNF", flag: "🇬🇳", name: "Guinée" },
  CH: { curr: "CHF", flag: "🇨🇭", name: "Suisse" },
  ZA: { curr: "ZAR", flag: "🇿🇦", name: "Afrique du Sud" },
  BR: { curr: "BRL", flag: "🇧🇷", name: "Brésil" },
  IN: { curr: "INR", flag: "🇮🇳", name: "Inde" },
};

// Prix des forfaits Premium en USD (base de calcul pour toutes les devises).
export const PLAN_PRICES_USD = { monthly: 1.5, halfyearly: 6, yearly: 10 };

// Taux de conversion approximatifs USD → devise locale.
export const LOCAL_RATES = {
  USD: 1, EUR: 0.92, XAF: 600, XOF: 600, NGN: 1600, GHS: 15, GBP: 0.79,
  CAD: 1.36, CHF: 0.9, MAD: 10, DZD: 135, TND: 3.1, GNF: 8600, CDF: 2800,
  ZAR: 18, BRL: 5, INR: 83,
};