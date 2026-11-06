# Plan de migration SEO — StreamLoaders

**Date de mise à jour :** 6 novembre 2026
**Domaine canonique cible :** `https://streamloaders.net/`  
**Objectif :** supprimer les doublons d'URL, clarifier les pages indexables et stabiliser le déploiement avant de relancer la validation dans Google Search Console.

> Ce document est un plan d'action. Les redirections HTTP doivent être configurées sur le serveur d'hébergement, pas dans les balises HTML.

---

## 1. Diagnostic confirmé

Les contrôles du site en production montrent plusieurs URL accessibles pour une même ressource :

| URL testée | Résultat observé | Action |
|---|---:|---|
| `https://streamloaders.net/` | `200` | conserver |
| `https://streamloaders.net/index.html` | `200` | rediriger vers `/` |
| `https://streamloaders.net/telecharger/youtube/` | `200` | conserver |
| `https://streamloaders.net/telecharger/youtube` | `301` vers la version avec slash | conserver cette règle |
| `https://streamloaders.net/telecharger/youtube/index.html` | `200` | rediriger vers `/telecharger/youtube/` |
| `https://www.streamloaders.net/` | `200` | rediriger vers le domaine sans `www` |
| `https://streamloaders.net/admin-reviews.html` | `200` avec `noindex` | garder hors index, idéalement protéger |
| URL inexistante | `404` | conserver une vraie réponse `404` |

Le [sitemap.xml](./sitemap.xml) ne contient pas les pages `noindex`, ce qui est correct. Les pages publiques ont déjà des balises `canonical` et `robots` cohérentes dans le code source.

La nouvelle page [`from-telegram/`](./from-telegram/index.html) est une page de parcours
promotionnel et contient volontairement `noindex, nofollow`. Elle ne doit donc pas être
ajoutée au sitemap ni demandée à l'indexation dans Google Search Console.

---

## 2. Règle de canonicalisation à retenir

Une seule URL doit être indexable par page :

```text
https://streamloaders.net/
https://streamloaders.net/telecharger/youtube/
https://streamloaders.net/telecharger/youtube-mp3/
https://streamloaders.net/telecharger/tiktok/
https://streamloaders.net/telecharger/instagram/
https://streamloaders.net/telecharger/facebook/
https://streamloaders.net/telecharger/twitter-x/
https://streamloaders.net/mentions-legales.html
https://streamloaders.net/confidentialite.html
https://streamloaders.net/cgv-cgu.html
```

Le sitemap, les liens internes, les canoniques et les données structurées doivent toujours utiliser exactement ces URLs.

---

## 3. Phase A — corriger le serveur

### A1. Rediriger `www`

Redirection permanente :

```text
https://www.streamloaders.net/* → https://streamloaders.net/*
```

La redirection doit préserver le chemin et la query string.

### A2. Rediriger les fichiers d'accueil

```text
/index.html → /
```

Ne pas rediriger les `index.html` internes avec une règle trop générale avant d'avoir vérifié les pages concernées.

### A3. Rediriger les pages plateforme vers la version avec slash

```text
/telecharger/youtube → /telecharger/youtube/
/telecharger/youtube-mp3 → /telecharger/youtube-mp3/
/telecharger/tiktok → /telecharger/tiktok/
/telecharger/instagram → /telecharger/instagram/
/telecharger/facebook → /telecharger/facebook/
/telecharger/twitter-x → /telecharger/twitter-x/
```

### A4. Rediriger les `index.html` internes

```text
/telecharger/youtube/index.html → /telecharger/youtube/
/telecharger/youtube-mp3/index.html → /telecharger/youtube-mp3/
/telecharger/tiktok/index.html → /telecharger/tiktok/
/telecharger/instagram/index.html → /telecharger/instagram/
/telecharger/facebook/index.html → /telecharger/facebook/
/telecharger/twitter-x/index.html → /telecharger/twitter-x/
```

### A5. Ne pas utiliser de redirection pour les erreurs

Une URL inconnue doit retourner `404`, et non le contenu de l'accueil avec un statut `200`. Une redirection globale vers l'accueil crée des pages en double et des erreurs d'exploration.

### A6. Emplacement de configuration

Le dépôt conserve le `.htaccess` du serveur et le workflow de déploiement l'exclut volontairement. Les règles ci-dessus doivent donc être ajoutées directement dans la configuration de l'hébergement (`public_html/.htaccess` si Apache est utilisé, ou dans la configuration Nginx équivalente).

Ne pas ajouter de règles serveur au hasard dans le dépôt sans confirmer le serveur HTTP utilisé.

---

## 4. Phase B — corriger et contrôler la génération du site

Le site possède un générateur dans [_build/build-pages.js](./_build/build-pages.js). Il génère les pages plateforme et met à jour le sitemap. Le workflow [.github/workflows/main.yml](./.github/workflows/main.yml) lance maintenant ce générateur dans un job GitHub `build` avant le déploiement.

### Actions

1. Conserver l'étape de génération avant le déploiement :

   ```bash
   node _build/build-pages.js
   ```

2. Vérifier que la commande termine sans avertissement bloquant.
3. Vérifier que les pages générées sont commitées avant le déploiement.
4. Vérifier que le sitemap publié correspond aux fichiers effectivement déployés.
5. Ne jamais modifier manuellement une page générée dans `telecharger/`; modifier plutôt [_build/platforms.json](./_build/platforms.json), [_build/platform.template.html](./_build/platform.template.html) ou les sources communes.

### Contrôles de génération

Avant chaque publication :

- chaque page du sitemap existe ;
- chaque page publique possède un seul `canonical` ;
- chaque canonical utilise `https://streamloaders.net` ;
- aucune URL `noindex` n'est dans le sitemap ;
- `from-telegram/` reste hors du sitemap et en `noindex, nofollow` ;
- aucun lien interne ne pointe vers `index.html` ;
- aucun lien interne ne pointe vers une URL sans slash ;
- les titres et descriptions sont uniques ;
- les données JSON-LD restent du JSON valide.

---

## 5. Phase C — pages indexables et contenu

### Pages à conserver indexables

- l'accueil ;
- les six pages plateforme ;
- les trois pages légales si elles doivent être trouvées dans Google.

### Page à garder hors index

[admin-reviews.html](./admin-reviews.html) contient déjà :

```html
<meta name="robots" content="noindex, nofollow">
```

C'est approprié pour une interface d'administration. Elle ne doit pas être ajoutée au sitemap ni liée depuis les pages publiques. Si elle contient des données sensibles, `noindex` ne suffit pas : ajouter une authentification serveur ou limiter son accès.

La page [`from-telegram/`](./from-telegram/index.html) doit également rester hors index :

```html
<meta name="robots" content="noindex, nofollow">
```

Elle sert uniquement de point d'arrivée depuis Telegram. Ses paramètres de campagne,
ses publicités et son contenu promotionnel ne constituent pas une page SEO à exposer
dans les résultats de recherche.

### Cohérence de marque

La marque doit être `StreamLoaders` partout dans les textes, titres, métadonnées et données structurées. La source à corriger en priorité est [_build/platforms.json](./_build/platforms.json), puis les pages doivent être régénérées. Les identifiants de réseaux sociaux ne doivent pas être renommés automatiquement.

### Contenu des pages plateforme

Chaque page doit garder :

- un `title` unique ;
- une `meta description` unique de 120 à 160 caractères environ ;
- un seul `h1` ;
- un texte réellement spécifique à la plateforme ;
- des liens vers les autres pages plateforme ;
- un contenu principal présent dans le HTML livré au crawler.

Les traductions JavaScript peuvent améliorer l'expérience utilisateur, mais le contenu SEO principal ne doit pas dépendre exclusivement d'une exécution JavaScript.

---

## 6. Phase D — tests avant publication

Exécuter les contrôles suivants depuis un poste extérieur au serveur :

```powershell
curl.exe -I https://streamloaders.net/
curl.exe -I https://www.streamloaders.net/
curl.exe -I https://streamloaders.net/index.html
curl.exe -I https://streamloaders.net/telecharger/youtube
curl.exe -I https://streamloaders.net/telecharger/youtube/
curl.exe -I https://streamloaders.net/telecharger/youtube/index.html
curl.exe -I https://streamloaders.net/telecharger/inconnue/
```

Résultats attendus :

| Test | Résultat attendu |
|---|---|
| domaine canonique | `200` |
| domaine `www` | `301` vers le domaine sans `www` |
| `/index.html` | `301` vers `/` |
| page sans slash | `301` vers la page avec slash |
| page avec slash | `200` |
| page `index.html` interne | `301` vers le dossier |
| URL inconnue | `404` |

Puis vérifier :

```powershell
curl.exe -sS https://streamloaders.net/robots.txt
curl.exe -sS https://streamloaders.net/sitemap.xml
```

Le sitemap ne doit contenir que les URLs finales en `200`.

---

## 7. Phase E — Google Search Console

Après la mise en production des redirections :

1. ouvrir l'inspection d'URL ;
2. tester l'accueil ;
3. tester les six pages plateforme ;
4. vérifier pour chaque page :
   - URL canonique déclarée ;
   - URL canonique choisie par Google ;
   - indexabilité autorisée ;
   - absence de `noindex` ;
   - réponse HTTP finale `200` ;
5. soumettre à nouveau `https://streamloaders.net/sitemap.xml` ;
6. demander l'indexation uniquement des URLs finales ;
7. lancer la validation des corrections dans les rapports concernés ;
8. attendre plusieurs jours avant de réévaluer les résultats.

Les anciennes URLs peuvent rester visibles temporairement dans Search Console. Il ne faut pas les remettre dans le sitemap : les redirections permanentes permettent à Google de transférer progressivement les signaux.

---

## 8. Ordre d'exécution recommandé

### Lot 1 — serveur

- [ ] confirmer Apache ou Nginx ;
- [ ] sauvegarder la configuration actuelle ;
- [ ] activer HTTPS ;
- [ ] rediriger `www` ;
- [ ] rediriger les variantes `index.html` ;
- [ ] normaliser les slashs ;
- [ ] vérifier les vrais `404`.

### Lot 2 — génération

- [ ] lancer le générateur avant déploiement ;
- [ ] vérifier les pages générées ;
- [ ] vérifier le sitemap ;
- [ ] supprimer les liens internes vers les anciennes variantes ;
- [ ] normaliser `StreamLoaders` dans les sources.

### Lot 3 — publication

- [ ] déployer ;
- [ ] exécuter les tests HTTP ;
- [ ] vérifier `robots.txt` ;
- [ ] vérifier `sitemap.xml` ;
- [ ] vérifier les canoniques HTML ;
- [ ] vérifier les données structurées.
- [ ] vérifier que `from-telegram/` répond en `200` mais reste `noindex` et absent du sitemap.

### Lot 4 — Search Console

- [ ] inspecter les URLs finales ;
- [ ] soumettre le sitemap ;
- [ ] demander l'indexation ;
- [ ] lancer la validation ;
- [ ] surveiller les rapports sans modifier les URLs pendant la phase de stabilisation.

---

## 9. Critère de réussite

La migration est considérée comme stable lorsque :

- chaque page publique possède une seule URL finale ;
- toutes les variantes redirigent en `301` ;
- le domaine `www` redirige vers le domaine canonique ;
- le sitemap ne contient que des réponses `200` ;
- aucune page publique indexable n'est en `noindex` ;
- aucune page `noindex` n'est dans le sitemap ;
- les canoniques, liens internes et données structurées utilisent les mêmes URLs ;
- la page `from-telegram/` est exclue de l'indexation par conception ;
- Search Console ne signale plus de nouvelles variantes dupliquées après le prochain cycle d'exploration.
