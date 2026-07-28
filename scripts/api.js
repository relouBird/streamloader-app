// scripts/api.js — Communication avec le backend Node
// const BASE = "http://localhost:5101";
const BASE = "https://www.streamback.mon-ndem.com";

export function getToken() {
  return localStorage.getItem("sl-tok") || null;
}

function headers(auth = false) {
  const h = { "Content-Type": "application/json" };
  if (auth) {
    const t = getToken();
    if (t) h["Authorization"] = `Bearer ${t}`;
  }
  return h;
}

export async function register(email, password) {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur inscription");
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur connexion");
  return data;
}

export async function getMe() {
  const res = await fetch(`${BASE}/api/auth/me`, {
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Non authentifié");
  return (await res.json()).user;
}

export async function analyzeUrl(url) {
  const t = getToken();
  const h = t ? { Authorization: `Bearer ${t}` } : {};
  const res = await fetch(
    `${BASE}/api/media/analyze?url=${encodeURIComponent(url)}`,
    { headers: h },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur analyse");
  return data;
}

export async function startDownload(url, format, title) {
  const t = getToken();
  const h = { "Content-Type": "application/json" };
  if (t) h["Authorization"] = `Bearer ${t}`;
  const res = await fetch(`${BASE}/api/media/download/start`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ url, format, title }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur démarrage");
  return data;
}

export function connectProgressSSE(jobId, onProgress, onDone, onError) {
  const evtSource = new EventSource(`${BASE}/api/media/progress/${jobId}`);
  evtSource.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === "progress") onProgress(msg);
    else if (msg.type === "done") {
      evtSource.close();
      onDone(msg);
    } else if (msg.type === "error") {
      evtSource.close();
      onError(msg.message || "Erreur");
    }
  };
  evtSource.onerror = () => {
    evtSource.close();
    onError("Connexion perdue");
  };
  return evtSource;
}

export function getFileUrl(jobId) {
  return `${BASE}/api/media/file/${jobId}`;
}

export async function initiatePayment(provider = "cinetpay") {
  const res = await fetch(BASE + "/api/payment/initiate", {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify({ provider }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur paiement");
  return data;
}
