import { ENDPOINTS } from "./config.js";
import { initTheme } from "./theme.js";

const modalBackdrop = document.getElementById("offerModalBackdrop");
const modalTitle = document.getElementById("offerModalTitle");
const modalMessage = document.getElementById("offerModalMessage");
const modalKicker = document.getElementById("offerModalKicker");
const resultIcon = document.getElementById("offerResultIcon");
const resultIconPath = document.getElementById("offerResultIconPath");
const closeButton = document.getElementById("offerModalClose");

function showResult(valid, message) {
  modalKicker.textContent = valid ? "Invitation confirmée" : "Invitation indisponible";
  modalTitle.textContent = valid ? "Merci pour ta visite !" : "Lien non valide ou expiré";
  modalMessage.textContent = message;
  resultIconPath.setAttribute(
    "d",
    valid ? "m5 12 4 4L19 6" : "M12 8v4m0 4h.01M10.3 3.8 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3l-7.5-13.2a2 2 0 0 0-3.4 0Z",
  );
  resultIcon.classList.toggle("success", valid);
  resultIcon.classList.toggle("error", !valid);
  modalBackdrop.classList.add("open");
}

function closeModal() {
  modalBackdrop.classList.remove("open");
}

async function verifyOffer(token) {
  const response = await fetch(ENDPOINTS.offerVerify, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.valid !== true) {
    const reason = payload?.reason;
    const message = reason === "expired"
      ? "Cette invitation a expiré. Tu peux tout de même découvrir StreamLoaders."
      : "Cette invitation n’est pas reconnue. Tu peux tout de même découvrir StreamLoaders.";
    showResult(false, message);
    return;
  }

  showResult(true, "Ton invitation est valide. Profite de ta visite et découvre les offres partenaires.");
}

function loadAds() {
  const display = document.getElementById("adsterra-display-728x90");
  if (display) {
    display.innerHTML = `
      <script>
        atOptions = {
          'key': '2d37bf1cd600a759435d645667b98eb1',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
      </script>
      <script src="https://bellnewyork.org/22/2d37bf1cd600a759435d645667b98eb1"></script>
    `;
    display.querySelectorAll("script").forEach((oldScript) => {
      const script = document.createElement("script");
      for (const { name, value } of oldScript.attributes) script.setAttribute(name, value);
      script.text = oldScript.text;
      oldScript.replaceWith(script);
    });
  }

  const native = document.createElement("script");
  native.src = "https://bellnewyork.org/21/8d98744dc408b0db5e089b7bcc209169";
  native.async = true;
  native.id = "adsterra-native";
  native.setAttribute("data-cfasync", "false");
  document.body.appendChild(native);
}

function init() {
  initTheme();
  closeButton.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) closeModal();
  });

  const token = new URLSearchParams(window.location.search).get("t");
  window.history.replaceState({}, document.title, window.location.pathname);
  loadAds();

  if (!token) {
    showResult(false, "Aucun token d’invitation n’a été transmis.");
    return;
  }

  verifyOffer(token).catch(() => {
    showResult(false, "La vérification est momentanément indisponible. Tu peux tout de même découvrir StreamLoaders.");
  });
}

init();
