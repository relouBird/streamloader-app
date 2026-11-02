# StreamLoaders Web

Frontend statique de StreamLoaders, servi directement depuis `public_html`.

## Contenu

- HTML, CSS et JavaScript sans étape de compilation ;
- pages dédiées aux plateformes dans [`telecharger/`](./telecharger/) ;
- ressources statiques dans [`assets/`](./assets/), [`fonts/`](./fonts/) et [`icons/`](./icons/) ;
- documentation de l'API consommée par le frontend dans [`api.md`](./api.md).

Le dossier [`_build/`](./_build/) contient uniquement les sources utilisées pour
générer certaines pages. Il n'est pas nécessaire au fonctionnement du site.

## Déploiement automatique

Les workflows GitHub Actions déploient le contenu de `main` via SSH :

1. lancer **First website deployment** une seule fois pour initialiser le serveur ;
2. chaque push sur `main` lance ensuite **Deploy website** ;
3. le checkout technique est conservé dans `~/.streamloader-web` ;
4. seuls les fichiers publics sont synchronisés vers `~/public_html`.

Le serveur doit disposer de `git` et `rsync`. Les secrets suivants sont requis
dans les paramètres GitHub du dépôt :

- `SERVER_HOST` ;
- `SERVER_USER` ;
- `SERVER_SSH_KEY` ;
- `SERVER_SSH_PORT` (facultatif, `5022` par défaut).

Par sécurité, les workflows n'envoient pas les fichiers de documentation,
`_build/`, `.git/` ou `.github/` vers `public_html`. Les fichiers serveur
`.htaccess` et `.well-known/` existants sont conservés.

## Développement local

Ouvrir [`index.html`](./index.html) dans un navigateur ou utiliser un serveur
HTTP statique local. Aucune compilation n'est nécessaire.
