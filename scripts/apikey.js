// ─────────────────────────────────────────────────────────────────
// scripts/apikey.js — gestion de la clé API Premium depuis le profil :
// afficher/masquer, générer, révoquer, copier. Réservé aux comptes
// Premium connectés.
// ─────────────────────────────────────────────────────────────────

import { ENDPOINTS } from "./config.js";
import { state } from "./state.js";

function el(id) {
  return document.getElementById(id);
}

/**
 * Charge l'état de la clé API pour l'afficher dans la modale profil.
 * Rien à faire si l'utilisateur n'est pas Premium (box masquée).
 */
export async function loadApiKeyBox() {
  const box = el("apiKeyBox");
  if (!box) return;

  if (!state.currentUser || state.currentUser.plan !== "premium") {
    box.style.display = "none";
    return;
  }

  box.style.display = "block";
  el("apiKeyReveal").style.display = "none";

  try {
    const r = await fetch(ENDPOINTS.accountApiKey, {
      headers: { Authorization: "Bearer " + state.token },
    });
    const d = await r.json();

    el("apiKeyNoKey").style.display = d.hasKey ? "none" : "block";
    el("apiKeyHasKey").style.display = d.hasKey ? "block" : "none";

    if (d.hasKey) {
      el("apiKeyPrefix").textContent = d.prefix;
      el("apiKeyDate").textContent = d.createdAt
        ? new Date(d.createdAt.replace(" ", "T") + "Z").toLocaleDateString(
            state.lang,
          )
        : "";
    }
  } catch {
    // Échec silencieux : la box reste dans son dernier état connu.
  }
}

/** Génère une nouvelle clé API (invalide immédiatement l'ancienne). */
async function generateApiKey() {
  if (
    !confirm(
      "Générer une nouvelle clé invalidera immédiatement l'ancienne (si tu en avais une). Continuer ?",
    )
  )
    return;

  try {
    const r = await fetch(ENDPOINTS.accountApiKey, {
      method: "POST",
      headers: { Authorization: "Bearer " + state.token },
    });
    const d = await r.json();
    if (!r.ok) {
      alert(d.error || "Erreur lors de la génération de la clé.");
      return;
    }
    el("apiKeyFull").textContent = d.apiKey;
    el("apiKeyReveal").style.display = "block";
    loadApiKeyBox();
  } catch {
    alert("Erreur réseau.");
  }
}

/** Révoque la clé API existante. */
async function revokeApiKey() {
  if (
    !confirm(
      "Révoquer ta clé API ? Toute intégration utilisant cette clé cessera de fonctionner immédiatement.",
    )
  )
    return;

  try {
    await fetch(ENDPOINTS.accountApiKey, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + state.token },
    });
    el("apiKeyReveal").style.display = "none";
    loadApiKeyBox();
  } catch {
    // Échec silencieux.
  }
}

/** Copie la clé API affichée dans le presse-papiers. */
function copyApiKey(event) {
  const val = el("apiKeyFull")?.textContent;
  if (!val) return;
  const btn = event?.target?.closest("button");

  navigator.clipboard
    ?.writeText(val)
    .then(() => {
      if (!btn) return;
      const old = btn.textContent;
      btn.textContent = "Copié !";
      setTimeout(() => {
        btn.textContent = old;
      }, 1500);
    })
    .catch(() => {});
}

/** Câble les boutons de la box de clé API (générer, révoquer, copier). */
export function initApiKeyEvents() {
  el("apiKeyGenerateBtn")?.addEventListener("click", generateApiKey);
  el("apiKeyGenerateBtn2")?.addEventListener("click", generateApiKey);
  el("apiKeyRevokeBtn")?.addEventListener("click", revokeApiKey);
  el("apiKeyCopyBtn")?.addEventListener("click", copyApiKey);
}
