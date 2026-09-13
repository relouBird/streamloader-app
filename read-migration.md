# Migration `index 1.2.html` → architecture modulaire

Document de répartition : chaque élément **nouveau ou modifié** dans le brut `index 1.2.html` indique **dans quel fichier** de ton architecture il doit atterrir.

---

## 1. `index.html`

### 1.1 Balises `<head>`

- `viewport` : ajout de `maximum-scale=1.0, user-scalable=no`.

### 1.2 Section « Carte vidéo » — nouveaux blocs HTML à insérer

**Entre `<div class="fmt-presets" id="vcFmts"></div>` et `<div id="ad-slot-card">` :**

- **Bloc sous-titres** :

  ```html
  <div id="subtitleOpts" class="subtitle-opts">
    <label class="subtitle-toggle" for="subtitleToggle">
      <input type="checkbox" id="subtitleToggle" />
      <span class="subtitle-switch"></span>
      <span class="subtitle-toggle-label" data-i18n="card.withSubs">…</span>
    </label>
    <div id="subtitleLangWrap" class="subtitle-lang-wrap" style="display:none">
      <span class="subtitle-lang-label" data-i18n="card.subsLang">…</span>
      <select id="subtitleLang" class="subtitle-lang-select">
        …
      </select>
      <p class="subtitle-hint" data-i18n="card.subsHint">…</p>
    </div>
  </div>
  ```

- **Bloc découpage vidéo** :
  ```html
  <div id="trimOpts" class="trim-opts">
    <div class="trim-toggle-row">
      <label class="trim-toggle" for="trimToggle" id="trimToggleWrap">…</label>
      <span
        id="trimTrialsBadge"
        class="trim-trials-badge"
        style="display:none"
      ></span>
    </div>
    <div id="trimFieldsWrap" class="trim-fields-wrap">
      <div class="trim-field">
        <label for="trimStart">…</label><input id="trimStart" />
      </div>
      <div class="trim-field">
        <label for="trimEnd">…</label><input id="trimEnd" />
      </div>
    </div>
  </div>
  ```

### 1.3 Bouton « Télécharger »

- L'`onclick` change : `onclick="startDownloadFromButton()"` (au lieu de `startDownload()`).

### 1.4 Section Pricing

- **Carte Gratuite** :
  - `pf.f1` → « 30 téléchargements par jour »
  - `pf.f3` → « Qualité maximale 1080p »
  - Ajout `pf.f5` → « Sous-titres : 5 téléchargements par jour »
  - Ajout `pf.f6` → « Découpage vidéo sur mesure : 3 essais »
  - Ajout de la classe `plan-card` sur `.price-card`.

- **Carte Premium** :
  - Nouveau badge texte : `⚡ Abonnement Premium`
  - Nouveau bloc prix :
    ```html
    <div class="premium-starting-label">À partir de</div>
    <div
      class="plan-price-value premium-starting-price"
      data-plan-price="monthly"
    >
      …
    </div>
    <div class="plan-saving">Choisis la durée qui te convient</div>
    <div class="price-period">Accès Premium selon l'abonnement choisi</div>
    ```
  - Ajout `pp.f5` → « Sous-titres illimités »
  - Ajout `pp.f6` → « Découpage vidéo sur mesure illimité »
  - Le bouton devient : `onclick="openModal('premium','monthly')"` avec libellé « Choisir un abonnement ».

### 1.5 Footer

- **Ajout du bloc `.footer-follow-row`** contenant :
  - Bouton Telegram (`.telegram-pill-btn`) → `https://t.me/StreamLoade_bot`
  - Bouton TikTok (`.social-icon-btn`) → `https://www.tiktok.com/@steamloader01…`
  - Bouton Instagram (`.social-icon-btn`) → `https://www.instagram.com/streamloader2026…`
  - Bouton X (`.social-icon-btn`) → `https://x.com/streamloader`
- **Un `<style>` inline** (à déplacer vers `style.css`, voir plus bas).
- **Modification du `foot.copy`** : « © 2026 StreamLoader · **Propulsée par GOD D_PACHA** ».

### 1.6 Modale — panneau Premium entièrement refondu

Remplacer l'ancien `#panelPremium` par le nouveau bloc structuré :

- `.prem-modal-header` :
  - `.prem-glow-icon` (icône éclair)
  - `.prem-pill-badge` → « ⚡ Accès Premium »
  - `.prem-price-tag` → `#premPriceVal` + `#premPriceUnit` + `#premPriceApprox`
  - `#premPriceSub`
  - `#premGeoIndicator` avec `#premGeoFlag` (image `flagcdn.com`) et `#premGeoCountry`
  - `#premGeoFixBtn` → « Pas le bon pays ? » (appelle `toggleCountryPicker()`)
  - `<select id="premCountryPicker" onchange="setManualCountry(this.value)">`
- `.plan-switcher` avec 3 boutons : `monthly` / `halfyearly` / `yearly` (onclick `selectPlan(...)`).
- `.prem-benefits-card` avec 4 `prem-benefit-item`.
- **Bloc invité** `#premLoginNotice` (avec `openModal('register')` / `openModal('login')`).
- **Bloc connecté** `#premLoggedNotice` avec `#premLoggedEmail`.
- `.btn-prem-pay` `#premBtn` → `onclick="doPremium()"` avec `#premBtnLabel`.
- `.prem-security-badge` → « Paiement 100% sécurisé… via **GeniusPay** ».

### 1.7 Suppression

- Le badge de sécurité CinetPay précédent (`prem-security-badge` texte CinetPay) → remplacé par GeniusPay.

---

## 2. `style.css`

### 2.1 Cartes format

- `.fmt-info` reçoit `flex: 1`.
- `.fmt-t` reçoit `display:flex; align-items:center; justify-content:space-between`.
- **Nouveaux** :
  - `.fmt-badge-prem` (badge doré Premium)
  - `.fmt-card.locked` (+ hover doré)

### 2.2 Sous-titres

- `.subtitle-opts`, `.subtitle-toggle`, `.subtitle-switch` (+ `::after`, `:checked`)
- `.subtitle-toggle-label`, `.subtitle-lang-wrap`, `.subtitle-lang-label`, `.subtitle-lang-select` (+ `:focus`), `.subtitle-hint`

### 2.3 Trim

- `.trim-opts`, `.trim-toggle-row`, `.trim-toggle`, `.trim-switch` (+ `::after`, `:checked`)
- `.trim-toggle-label`, `.trim-toggle.locked`
- `.trim-trials-badge` (+ `.limit-reached`)
- `.trim-fields-wrap` (+ `.open`), `.trim-field`, `.trim-field input` (+ `:focus`)

### 2.4 Pricing

- `.plan-price-value`, `.premium-starting-label`, `.premium-starting-price`, `.plan-saving`, `.plan-card`

### 2.5 Nouvelle modale Premium

- `.prem-modal-header`, `.prem-glow-icon`, `@keyframes breatheGlow`
- `.prem-pill-badge`, `.prem-price-tag` (+ `.fcfa`, `.approx`), `.prem-price-sub`
- `.prem-benefits-card`, `.prem-benefit-item`, `.prem-check-icon`
- `.prem-guest-box`, `.prem-guest-txt`, `.prem-guest-actions`
- `.btn-prem-register`, `.btn-prem-login`
- `.prem-logged-box`
- `.btn-prem-pay` (+ `:hover`, `:disabled`)
- `.prem-security-badge`
- `.plan-switcher` (+ `button.active`)

### 2.6 Publicités

- `.ad-banner`, `.ad-banner-copy`, `.ad-banner-title`, `.ad-banner-text`, `.ad-banner-cta`

### 2.7 Footer social

À extraire du `<style>` inline du brut et déplacer ici :

- `.footer-follow-row`
- `.telegram-pill-btn` (+ `:hover`)
- `.tg-icon`
- `.social-icon-btn` (+ `:hover`)

---

## 3. `style-float.css`

**Aucun changement** : les logos flottants et le parallax restent identiques.

---

## 4. `scripts/config.js`

### 4.1 Nouvelles constantes à ajouter

- `CURRENCIES` — 17 devises (`XAF`, `XOF`, `EUR`, `USD`, `CAD`, `GBP`, `NGN`, `GHS`, `CDF`, `MAD`, `DZD`, `TND`, `GNF`, `CHF`, `ZAR`, `BRL`, `INR`) avec `symbol`, `amount`, `formatted`, `approx`, `flag`, `country`.
- `TIMEZONE_MAP` — fuseau → devise.
- `TIMEZONE_COUNTRY_MAP` — fuseau → code pays.
- `COUNTRY_MAP` — code pays → `{ curr, flag, name }`.
- `PLAN_PRICES_USD` — `{ monthly: 1.5, halfyearly: 6, yearly: 10 }`.
- `LOCAL_RATES` — taux de conversion par devise.

---

## 5. `scripts/state.js`

### 5.1 Nouvelles variables d'état

- `currentCurrency` (défaut `'XAF'`)
- `currentCountryName`, `currentCountryFlag`, `currentCountryCode`
- `selectedPlan` (défaut `'monthly'`)
- `selQuality` **remplace** `selFmt` (valeurs : `'4k' | '1080p' | '720p' | '480p' | 'mp3'`)
- `withSubtitles` (bool), `subtitleLang` (`'fr'` par défaut)
- `wantsTrim` (bool)

---

## 6. `scripts/utils.js`

### 6.1 Nouveaux helpers

- `flagImgHtml(countryCode)` — génère une balise `<img>` pointant vers `flagcdn.com`, avec repli `🌍`.
- `formatFileSize(bytes)` — convertit en `B / KiB / MiB / GiB`.

### 6.2 Helpers existants inchangés

- `fmtDur`, `showStatus`, `openBrowser`.

---

## 7. `scripts/auth.js`

### 7.1 Modifications

- **Exporter `reloadUser()`** publiquement (appelé après l'utilisation d'un trim gratuit).
- Après inscription réussie : `setTimeout(closeModal, 2000)` au lieu de `4000`.

---

## 8. `scripts/modal.js`

### 8.1 Signature

- `openModal(mode, plan = selectedPlan)` → nouveau paramètre optionnel.

### 8.2 Branche Premium

- Sélectionner le plan (`selectPlan(plan)`).
- Afficher/masquer `#premLoginNotice` vs `#premLoggedNotice` selon `currentUser`.
- Renseigner `#premLoggedEmail`.
- Désactiver `#premBtn` si non connecté.

### 8.3 Branche Profile

- Inchangée.

---

## 9. `scripts/payment.js`

### 9.1 Fonctions à ajouter

- `getPlanPrice(plan)` — calcule le prix affiché selon `currentCurrency` et `selectedPlan`.
- `selectPlan(plan)` — met à jour `selectedPlan` et rafraîchit l'UI (`.plan-switcher` + `updatePricingDisplay`).
- `initGeoCurrency()` — lit d'abord `localStorage.sl_user_country`, puis le fuseau (`TIMEZONE_COUNTRY_MAP` → `TIMEZONE_MAP`), puis `fetchGeoLocation()` en secours.
- `toggleCountryPicker()` — remplit et affiche `#premCountryPicker`.
- `setManualCountry(code)` — enregistre `sl_user_country` dans `localStorage`.
- `applyDetectedCountry(code, name)` — applique la géo détectée.
- `fetchGeoLocation()` — appel `https://ipapi.co/json/` en dernier recours.
- `updatePricingDisplay()` — met à jour les prix dans `#pricing` (via `[data-plan-price]` et `.premium-starting-price`), la modale, le bouton et l'indicateur géo.

### 9.2 `doPremium()`

- Envoie au backend : `{ provider: 'geniuspay', currency: currentCurrency, plan: selectedPlan }`.
- Gère l'échec en réinitialisant le bouton avec le prix formaté.

### 9.3 Handler `premium=success`

- Déplacé depuis l'IIFE du brut → à confier à `main.js` (voir § 14).

---

## 10. `scripts/media.js`

### 10.1 Nouveau tableau de presets

- 5 entrées : `4k` (premium, badge 👑 Premium), `1080p`, `720p`, `480p`, `mp3`.
- Sélection par défaut : `1080p` si free, `4k` si premium.

### 10.2 Rendu `fmt-card`

- Ajout du badge `<span class="fmt-badge-prem">` quand `p.premium`.
- Ajout de la classe `.locked` quand premium non débloqué.
- Clic sur preset verrouillé → `openModal('premium')` + message.
- Sélection met à jour `selQuality` (variable d'état).

### 10.3 Sous-titres

- Listener `#subtitleToggle` : met à jour `withSubtitles` et affiche/masque `#subtitleLangWrap`.
- Listener `#subtitleLang` : met à jour `subtitleLang`.
- Masquer `#subtitleOpts` si `selQuality === 'mp3'`.

### 10.4 Trim

- `trimLimitReached()` — vérifie `currentUser.trim_trials_used >= 3` pour non-premium.
- `updateTrimUI()` — met à jour le badge (`N/3 essais restants`), la classe `.locked`, et décoche le toggle si limite atteinte.
- Listener **click** sur `#trimToggle` : si limite atteinte, `preventDefault()` + `openModal('premium')` + message.
- Listener **change** sur `#trimToggle` : met à jour `wantsTrim` et ouvre `.trim-fields-wrap`.

### 10.5 Reset

- À chaque nouvelle analyse : reset `withSubtitles`, `subtitleLang`, `wantsTrim`, `subtitleToggle.checked`, `trimToggle.checked`, `trimStart`, `trimEnd`, `subtitleLangWrap.style.display`, `trimFieldsWrap.classList.remove('open')`.

### 10.6 Bouton simulation

- Rendu visible si `isDev`.

---

## 11. `scripts/download.js`

### 11.1 `startDownloadFromButton()` — nouvelle fonction

- Si non-premium : `window.open('/api/ad-click', '_blank', 'noopener,noreferrer')`.
- Puis appelle `startDownload()`.

### 11.2 Payload `/api/download/start`

Remplace l'ancien `{ url, format, title }` par :

```js
{
  url,
  quality: selQuality,
  title,
  ...(withSubtitles ? { sublang: subtitleLang } : {}),
  ...(wantsTrim ? { trim: true, startTime, endTime } : {}),
}
```

### 11.3 Validation avant envoi

- Si `selQuality === '4k'` et non-premium → modale Premium.
- Si `wantsTrim` :
  - Regex `^\d{1,2}(:\d{2}){1,2}$` sur `startTime`/`endTime`.
  - Si invalide → message d'erreur.
  - Si pas connecté → `openModal('register')`.

### 11.4 Gestion des codes d'erreur serveur

- `PREMIUM_REQUIRED`, `TRIM_LIMIT_REACHED`, `SUBTITLE_LIMIT_REACHED` → `openModal('premium')`.
- `LOGIN_REQUIRED` → `openModal('register')`.

### 11.5 Après démarrage

- Si trim utilisé par un non-premium → `await reloadUser()` pour rafraîchir le quota.

### 11.6 SSE `EventSource`

- URL : `/api/progress/:jobId?token=<token>` (token optionnel en query string).
- Nouveau type `processing` → barre à 99%, libellé = `msg.message`.
- Dans `done` : nouveau champ `msg.finalSize` → `formatFileSize`.

### 11.7 Téléchargement du fichier

- URL : `/api/file/:jobId?token=<token>`.

---

## 12. `scripts/ads.js`

### 12.1 `loadAdScripts()`

- Remplace le rendu vide par l'injection du HTML :
  ```html
  <a
    class="ad-banner"
    href="/api/ad-click"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="ad-banner-copy">
      <span class="ad-banner-title">Découvre une offre partenaire</span>
      <span class="ad-banner-text"
        >Soutiens StreamLoader en visitant notre partenaire.</span
      >
    </span>
    <span class="ad-banner-cta">Voir l'offre</span>
  </a>
  ```
- Ajoute la classe `.ad-loaded`.

---

## 13. `scripts/i18n.js`

### 13.1 Nouvelles clés à ajouter dans les 5 langues

- `card.withSubs`, `card.subsLang`, `card.subsHint`
- `card.trimToggle`, `card.trimStart`, `card.trimEnd`
- `pf.f5`, `pf.f6`
- `pp.f5`, `pp.f6`
- `prem.pay` mis à jour → « Payer et activer »
- `prem.note` → « Paiement sécurisé via GeniusPay »

### 13.2 Clés existantes à réviser

- `pf.f1` → « 30 téléchargements par jour »
- `pf.f3` → « Qualité maximale 1080p »
- `pp.period` → « selon le forfait »
- `foot.copy` → « Propulsée par GOD D_PACHA »

---

## 14. `scripts/app.js`

### 14.1 Nouveaux écouteurs

- `#subtitleToggle` (`change`)
- `#subtitleLang` (`change`)
- `#trimToggle` (`click` + `change`)
- Boutons `.plan-switcher` (délégation `click` → `selectPlan`)
- `#premGeoFixBtn` (`click` → `toggleCountryPicker`)
- `#premCountryPicker` (`change` → `setManualCountry`)
- `#dlBtn` → `startDownloadFromButton()`

### 14.2 Écouteurs conservés

- Enter sur `#urlInput`, IntersectionObserver, parallax, listeners modal, etc.

---

## 15. `scripts/main.js`

### 15.1 Séquence d'initialisation

```js
lang = detectLang();
applyI18n();
initGeoCurrency(); // ← nouveau, avant loadUser
await loadUser();
if (!token) updateAdVisibility();
```

### 15.2 Handler `?premium=success`

- Vérifie `new URLSearchParams(location.search).get('premium')`.
- Nettoie l'URL (`history.replaceState`).
- `await reloadUser()`.
- Si `currentUser.plan === 'premium'` → `openModal('profile')` + `showStatus(...)`.

### 15.3 Suppression du double `loadUser()`

- Le brut n'a qu'un seul appel (bonne pratique à conserver).

---

## 16. Récapitulatif — fichiers touchés

| Fichier               | Nature                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `index.html`          | HTML : blocs sous-titres + trim + nouvelle modale Premium + footer social + cartes pricing |
| `style.css`           | CSS : sections 2.1 → 2.7                                                                   |
| `style-float.css`     | Aucun changement                                                                           |
| `scripts/config.js`   | Nouvelles constantes (devises, pays, fuseaux, plans)                                       |
| `scripts/state.js`    | 7 nouvelles variables                                                                      |
| `scripts/utils.js`    | 2 nouveaux helpers                                                                         |
| `scripts/auth.js`     | Export `reloadUser` + délai modale                                                         |
| `scripts/modal.js`    | Signature `openModal` + branche Premium                                                    |
| `scripts/payment.js`  | 8 nouvelles fonctions + `doPremium` GeniusPay                                              |
| `scripts/media.js`    | Nouveaux presets + sous-titres + trim                                                      |
| `scripts/download.js` | Payload + SSE + ad-click + gestion erreurs                                                 |
| `scripts/ads.js`      | Nouveau rendu ad-banner                                                                    |
| `scripts/i18n.js`     | ~12 nouvelles clés × 5 langues                                                             |
| `scripts/app.js`      | 7 nouveaux écouteurs                                                                       |
| `scripts/main.js`     | Séquence init + handler premium                                                            |

Aucun nouveau fichier n'est nécessaire : tout se répartit dans l'architecture existante.
