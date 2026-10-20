// ─────────────────────────────────────────────────────────────────
// scripts/i18n.js — traductions FR/EN/ES/PT/AR, appliquées via data-i18n.
// ─────────────────────────────────────────────────────────────────

import { state } from "./state.js";

const TR = {
  fr: {
    brand: "StreamLoaders",
    "nav.features": "Fonctionnalités",
    "nav.how": "Comment ça marche",
    "nav.formats": "Formats",
    "nav.pricing": "Tarifs",
    "nav.faq": "FAQ",
    "nav.cta": "Connexion",
    "hero.line1": "Télécharge tes vidéos",
    "hero.line2": "à partir d’un simple lien.",
    "hero.sub":
      "Colle le lien d’une vidéo YouTube, TikTok, Instagram, X ou Facebook, choisis la qualité, et récupère ton fichier.",
    "hero.placeholder": "Colle le lien de la vidéo…",
    "hero.analyze": "Analyser",
    "hero.supports": "Fonctionne avec",
    "hero.more": "et 1 000+ autres sites",
    "hero.disclaimer":
      "StreamLoaders est un outil technique. Vous êtes responsable de disposer des droits nécessaires sur les médias téléchargés.",
    "card.format": "Format",
    "card.download": "Télécharger",
    "card.watch": "Regarder",
    "card.withSubs": "Télécharger avec sous-titres",
    "card.subsLang": "Langue des sous-titres",
    "card.subsHint":
      "Les sous-titres seront intégrés à la vidéo dans la langue choisie, quelle que soit la langue d’origine.",
    "card.trimToggle": "Extraire une scène précise",
    "card.trimStart": "Début (ex : 00:10)",
    "card.trimEnd": "Fin (ex : 00:25)",
    "card.premium_quality_locked":
      "⚡ La qualité 4K Ultra HD est réservée aux abonnés Premium. Passe au Premium pour débloquer le 4K !",
    "card.trim_limit_reached":
      "Tu as utilisé tes 3 essais gratuits de découpage vidéo. Passe au Premium pour un découpage illimité.",
    "feat.label": "Fonctionnalités",
    "feat.t1": "Tout ce qu’il faut,",
    "feat.t2": "rien de superflu.",
    "feat.sub":
      "Un outil simple qui fait une chose et la fait bien : récupérer tes vidéos dans la qualité que tu veux, sans rien installer.",
    "f1.t": "De la HD à la 4K",
    "f1.d":
      "De 480p à 1080p gratuitement, jusqu’en 4K avec Premium. Le fichier est livré en MP4, lisible sur tous les appareils.",
    "f2.t": "Audio MP3",
    "f2.d":
      "Garde uniquement le son, en MP3 haute qualité. Pratique pour la musique, les podcasts et les conférences.",
    "f3.t": "Sous-titres intégrés",
    "f3.d":
      "Ajoute les sous-titres directement dans la vidéo : français, anglais, espagnol, italien, allemand ou arabe.",
    "f4.t": "Découpage précis",
    "f4.d":
      "Garde seulement le passage qui t’intéresse : indique le début et la fin, le reste n’est pas téléchargé.",
    "f5.t": "Rien n’est conservé",
    "f5.d":
      "Les fichiers sont effacés de nos serveurs dès qu’ils t’ont été envoyés, ou au bout de quelques minutes.",
    "f6.t": "Aussi sur Telegram",
    "f6.d":
      "Envoie un lien à notre bot Telegram et reçois la vidéo ou l’audio directement dans la conversation.",
    "how.label": "Comment ça marche",
    "how.t1": "Trois étapes,",
    "how.t2": "c’est tout.",
    "how.sub":
      "Pas besoin de compte ni d’application : tout se passe sur cette page, depuis ton téléphone ou ton ordinateur.",
    "s1.t": "Copie le lien",
    "s1.d":
      "Sur l’application ou le site de la vidéo, touche « Partager » puis « Copier le lien ».",
    "s2.t": "Colle et choisis",
    "s2.d":
      "Colle le lien en haut de cette page, puis choisis la qualité vidéo ou l’audio seul.",
    "s3.t": "Télécharge",
    "s3.d":
      "Le fichier est préparé, puis enregistré directement sur ton téléphone ou ton ordinateur.",
    "price.label": "Tarifs",
    "price.t1": "Gratuit au départ,",
    "price.t2": "Premium en option.",
    "price.sub":
      "Utilise StreamLoaders gratuitement aussi longtemps que tu veux. Premium retire les limites et les publicités.",
    "price.starting_from": "À partir de",
    "pf.badge": "Gratuit",
    "pf.period": "Pour toujours, sans carte bancaire",
    "pf.f1": "30 téléchargements par jour",
    "pf.f2": "Plus de 1 000 sites pris en charge",
    "pf.f3": "Qualité jusqu’à 1080p",
    "pf.f4": "Financé par la publicité",
    "pf.f5": "Sous-titres : 5 par jour",
    "pf.f6": "Découpage vidéo : 3 essais",
    "pf.btn": "Commencer",
    "pp.badge": "Premium",
    "pp.from": "À partir de",
    "pp.period": "Abonnement de 1 mois, 6 mois ou 1 an",
    "pp.unit": "/ mois",
    "pp.yearNote": "ou {price} / mois sur un an (−{pct} %)",
    "pp.f1": "Téléchargements illimités",
    "pp.f2": "Qualité 4K et audio HD",
    "pp.f3": "Aucune publicité",
    "pp.f4": "File d’attente prioritaire",
    "pp.f5": "Sous-titres illimités",
    "pp.f6": "Découpage vidéo illimité",
    "pp.btn": "Choisir un abonnement",
    "formats.label": "Formats",
    "formats.t1": "Choisis ta qualité,",
    "formats.t2": "vidéo ou audio.",
    "formats.sub":
      "StreamLoaders s'adapte à ton usage et à ta connexion : une vidéo légère pour économiser tes données, une image nette pour ton écran, ou seulement le son.",
    "formats.c1.t": "Vidéo MP4 de 480p à 4K",
    "formats.c1.d":
      "Choisis 480p pour économiser des données, 720p ou 1080p pour une image nette. La 4K est réservée aux abonnés Premium. Le fichier est en MP4, lisible sur téléphone, ordinateur et télévision.",
    "formats.c2.t": "Audio MP3 en 320 kbps",
    "formats.c2.d":
      "Pour la musique, un podcast ou une conférence, télécharge uniquement le son en MP3 haute qualité, sans la vidéo.",
    "formats.c3.t": "Plus de 1 000 sites compatibles",
    "formats.c3.d":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo et bien d'autres. Si la vidéo est publique, il suffit de coller son lien.",
    "faq.label": "Questions fréquentes",
    "faq.t1": "Une question ?",
    "faq.t2": "La réponse est sans doute ici.",
    "faq.q1": "StreamLoaders est-il gratuit ?",
    "faq.a1":
      "Oui. Sans rien payer, tu peux faire jusqu’à 30 téléchargements par jour, en qualité jusqu’à 1080p. L’abonnement Premium retire les limites, débloque la 4K et supprime les publicités.",
    "faq.q2": "Quels sites sont pris en charge ?",
    "faq.a2":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo et plus de 1 000 autres sites. Colle simplement le lien : la plupart des vidéos accessibles publiquement sont prises en charge.",
    "faq.q3": "Ai-je le droit de télécharger n’importe quelle vidéo ?",
    "faq.a3":
      "StreamLoaders est un outil technique, prévu pour un usage personnel. Tu restes responsable de disposer des droits nécessaires sur les contenus que tu télécharges. Le détail figure dans nos conditions d’utilisation.",
    "faq.q4": "Mes fichiers sont-ils conservés ?",
    "faq.a4":
      "Non. Le fichier est préparé sur nos serveurs le temps du téléchargement, puis supprimé dès qu’il t’a été envoyé. S’il n’est pas récupéré, il est effacé automatiquement au bout de quelques minutes.",
    "faq.q5": "Comment payer l’abonnement Premium ?",
    "faq.a5":
      "Le paiement passe par GeniusPay : Mobile Money (Orange Money, MTN Money, Wave) ou carte bancaire. Ton compte passe en Premium dès que le paiement est confirmé.",
    "faq.q6": "Le téléchargement ne démarre pas, que faire ?",
    "faq.a6":
      "Vérifie que le lien est complet et que la vidéo est publique. Aux heures de forte affluence, ton téléchargement peut patienter quelques instants en file d’attente : il démarre tout seul, garde simplement la page ouverte.",
    "faq.q7": "Comment télécharger une vidéo YouTube en MP3 ?",
    "faq.a7":
      "Colle le lien de la vidéo YouTube en haut de la page, clique sur Analyser, choisis « Audio MP3 » dans la liste des formats, puis clique sur Télécharger. Le fichier est enregistré sur ton appareil.",
    "faq.q8": "Comment télécharger une vidéo TikTok ou Instagram ?",
    "faq.a8":
      "Dans l'application, touche « Partager » puis « Copier le lien ». Colle ensuite ce lien sur StreamLoaders, choisis la qualité et télécharge. Seules les vidéos publiques sont prises en charge.",
    "faq.q9": "Quelle qualité vidéo choisir ?",
    "faq.a9":
      "Le 1080p convient à la plupart des écrans. Le 720p et le 480p sont plus légers, pratiques avec une connexion lente. La 4K est réservée aux abonnés Premium.",
    "foot.tagline":
      "Télécharge tes vidéos et ta musique en un lien, depuis plus de 1 000 sites.",
    "foot.product": "Produit",
    "foot.legalTitle": "Informations légales",
    "foot.telegram": "Bot Telegram",
    "foot.legal": "Mentions légales",
    "foot.privacy": "Confidentialité",
    "foot.terms": "CGV / CGU",
    "foot.faq": "FAQ",
    "foot.contact": "Contact",
    "foot.copy": "© 2026 StreamLoaders · Propulsée par GOD D_PACHA & RelouBird",
    "auth.title": "Bienvenue",
    "auth.sub": "Connecte-toi ou crée un compte.",
    "auth.login": "Connexion",
    "auth.register": "Créer un compte",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.confirm": "Confirmer",
    "auth.login_btn": "Se connecter",
    "auth.register_btn": "Créer mon compte",
    "auth.fill_all": "Remplis tous les champs.",
    "auth.pwd_mismatch": "Les mots de passe ne correspondent pas.",
    "auth.login_ok": "✓ Connexion réussie !",
    "auth.register_ok": "✓ Compte créé !",
    "auth.network_err": "Erreur réseau.",
    "prof.title": "Mon compte",
    "prof.email_lbl": "Email",
    "prof.plan_lbl": "Plan : ",
    "prof.upgrade": "Passer Premium",
    "prof.logout": "Se déconnecter",
    "prof.member_since": "Membre depuis le",
    "prem.activate": "Activer Premium →",
    "prem.create_account": "Créer mon compte →",
    "prem.pay_label": "Payer maintenant 1 200 FCFA",
    "prem.pay": "Payer et activer",
    "prem.note": "Paiement sécurisé via GeniusPay",
    "prem.detected": "Détecté :",
    "prem.sub_monthly": "Abonnement d’un mois",
    "prem.sub_halfyearly": "Abonnement de 6 mois",
    "prem.sub_yearly": "Abonnement d’un an",
    "prem.preparing": "Préparation du paiement…",
    "prem.activated": "⚡ Compte Premium activé ! Bienvenue.",
    "st.analyzing": "Analyse en cours…",
    "st.ready": "formats disponibles",
    "st.err": "Erreur : ",
    "st.no_url": "Colle une URL valide.",
    "dl.preparing": "Préparation du téléchargement…",
    "dl.progress": "Téléchargement en cours…",
    "dl.packaging": "✅ Préparation du fichier…",
    "dl.start": "Téléchargement démarré…",
    "dl.done": "Téléchargement terminé !",
    "dl.err": "Erreur téléchargement.",
    "dl.no_analysis": "Analyse d'abord une URL avant de télécharger.",
    "dl.processing": "Conversion finale…",
    "dl.premium_quality_required":
      "⚡ La qualité 4K Ultra HD est réservée aux abonnés Premium.",
    "dl.trim_invalid_time":
      "Format de temps invalide. Utilise MM:SS (ex : 00:10).",
    "dl.trim_login_required":
      "Crée un compte gratuit pour utiliser le découpage vidéo sur mesure.",
    "pwa.install_title": "Installer StreamLoaders",
    "pwa.install_desc": "Accès direct depuis ton écran d'accueil",
    "pwa.install_btn": "Installer",
    "pwa.ios_title": "Installer StreamLoaders",
    "pwa.ios_subtitle": "Sur iPhone / iPad :",
    "pwa.ios_step1":
      'Appuie sur <strong>Partager</strong> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:middle;margin:0 3px"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> en bas de Safari',
    "pwa.ios_step2": "Choisis <strong>« Sur l'écran d'accueil »</strong>",
    "pwa.ios_step3": "Appuie sur <strong>Ajouter</strong>",
    "pwa.ios_close": "J'ai compris",
  },
  en: {
    brand: "StreamLoaders",
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.formats": "Formats",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.cta": "Log in",
    "hero.line1":
      "Download your videos",
    "hero.line2": "from a single link.",
    "hero.sub":
      "Paste a link from YouTube, TikTok, Instagram, X or Facebook, pick the quality, and get your file.",
    "hero.placeholder": "Paste the video link…",
    "hero.analyze": "Analyze",
    "hero.supports": "Works with",
    "hero.more": "and 1,000+ other sites",
    "hero.disclaimer":
      "StreamLoaders is a technical tool. You are responsible for having the necessary rights to the media you download.",
    "card.format": "Format",
    "card.download": "Download",
    "card.watch": "Watch",
    "card.withSubs": "Download with subtitles",
    "card.subsLang": "Subtitle language",
    "card.subsHint":
      "Subtitles will be embedded in the video in the chosen language, whatever the original language.",
    "card.trimToggle": "Extract a specific scene",
    "card.trimStart": "Start (e.g. 00:10)",
    "card.trimEnd": "End (e.g. 00:25)",
    "card.premium_quality_locked":
      "⚡ 4K Ultra HD quality is reserved for Premium subscribers. Go Premium to unlock 4K!",
    "card.trim_limit_reached":
      "You've used your 3 free video trims. Go Premium for unlimited trimming.",
    "feat.label": "Features",
    "feat.t1": "Everything you need,",
    "feat.t2": "nothing you don’t.",
    "feat.sub":
      "A simple tool that does one thing well: getting your videos in the quality you want, with nothing to install.",
    "f1.t": "From HD to 4K",
    "f1.d":
      "480p to 1080p for free, up to 4K with Premium. Files are delivered as MP4, playable on any device.",
    "f2.t": "MP3 audio",
    "f2.d":
      "Keep only the sound, as a high-quality MP3. Handy for music, podcasts and talks.",
    "f3.t": "Built-in subtitles",
    "f3.d":
      "Embed subtitles right into the video: French, English, Spanish, Italian, German or Arabic.",
    "f4.t": "Precise trimming",
    "f4.d":
      "Keep only the part you care about: set a start and an end, the rest is never downloaded.",
    "f5.t": "Nothing is kept",
    "f5.d":
      "Files are deleted from our servers as soon as they have been sent to you, or after a few minutes.",
    "f6.t": "Also on Telegram",
    "f6.d":
      "Send a link to our Telegram bot and get the video or audio right in the chat.",
    "how.label": "How it works",
    "how.t1": "Three steps,",
    "how.t2": "that’s it.",
    "how.sub":
      "No account and no app needed: everything happens on this page, from your phone or computer.",
    "s1.t": "Copy the link",
    "s1.d": 'In the video’s app or website, tap "Share" then "Copy link".',
    "s2.t": "Paste and choose",
    "s2.d":
      "Paste the link at the top of this page, then pick a video quality or audio only.",
    "s3.t": "Download",
    "s3.d":
      "The file is prepared, then saved straight to your phone or computer.",
    "price.label": "Pricing",
    "price.t1": "Free to start,",
    "price.t2": "Premium if you want.",
    "price.sub":
      "Use StreamLoaders for free for as long as you like. Premium removes the limits and the ads.",
    "price.starting_from": "Starting from",
    "pf.badge": "Free",
    "pf.period": "Forever, no card required",
    "pf.f1": "30 downloads per day",
    "pf.f2": "More than 1,000 supported sites",
    "pf.f3": "Quality up to 1080p",
    "pf.f4": "Ad-supported",
    "pf.f5": "Subtitles: 5 per day",
    "pf.f6": "Video trimming: 3 trials",
    "pf.btn": "Get started",
    "pp.badge": "Premium",
    "pp.from": "From",
    "pp.period": "1-month, 6-month or 1-year plans",
    "pp.unit": "/ month",
    "pp.yearNote": "or {price} / month over a year (−{pct}%)",
    "pp.f1": "Unlimited downloads",
    "pp.f2": "4K quality and HD audio",
    "pp.f3": "No ads",
    "pp.f4": "Priority queue",
    "pp.f5": "Unlimited subtitles",
    "pp.f6": "Unlimited video trimming",
    "pp.btn": "Choose a plan",
    "formats.label": "Formats",
    "formats.t1": "Pick your quality,",
    "formats.t2": "video or audio.",
    "formats.sub":
      "StreamLoaders adapts to your usage and connection: a light video to save data, a sharp image for your screen, or audio only.",
    "formats.c1.t": "MP4 video from 480p to 4K",
    "formats.c1.d":
      "Choose 480p to save data, 720p or 1080p for a sharp image. 4K is reserved for Premium subscribers. Files come as MP4, playable on phone, computer and TV.",
    "formats.c2.t": "MP3 audio at 320 kbps",
    "formats.c2.d":
      "For music, a podcast or a talk, download only the sound as a high-quality MP3, without the video.",
    "formats.c3.t": "More than 1,000 supported sites",
    "formats.c3.d":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo and many more. If the video is public, just paste its link.",
    "faq.label": "Frequently asked questions",
    "faq.t1": "Got a question?",
    "faq.t2": "The answer is probably here.",
    "faq.q1": "Is StreamLoaders free?",
    "faq.a1":
      "Yes. Without paying anything, you get up to 30 downloads per day in up to 1080p. A Premium plan removes the limits, unlocks 4K and removes ads.",
    "faq.q2": "Which sites are supported?",
    "faq.a2":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo and more than 1,000 other sites. Just paste the link: most publicly accessible videos are supported.",
    "faq.q3": "Am I allowed to download any video?",
    "faq.a3":
      "StreamLoaders is a technical tool intended for personal use. You remain responsible for having the necessary rights to the content you download. Details are in our terms of use.",
    "faq.q4": "Are my files kept?",
    "faq.a4":
      "No. The file is prepared on our servers for the time of the download, then deleted as soon as it has been sent to you. If it is not collected, it is erased automatically after a few minutes.",
    "faq.q5": "How do I pay for Premium?",
    "faq.a5":
      "Payments go through GeniusPay: Mobile Money (Orange Money, MTN Money, Wave) or bank card. Your account becomes Premium as soon as the payment is confirmed.",
    "faq.q6": "The download won’t start, what should I do?",
    "faq.a6":
      "Check that the link is complete and the video is public. At busy times your download may wait in a queue for a moment: it starts on its own, just keep the page open.",
    "faq.q7": "How do I download a YouTube video as MP3?",
    "faq.a7":
      'Paste the YouTube video link at the top of the page, click Analyze, choose "MP3 audio" from the format list, then click Download. The file is saved to your device.',
    "faq.q8": "How do I download a TikTok or Instagram video?",
    "faq.a8":
      'In the app, tap "Share" then "Copy link". Paste that link on StreamLoaders, choose the quality and download. Only public videos are supported.',
    "faq.q9": "Which video quality should I choose?",
    "faq.a9":
      "1080p suits most screens. 720p and 480p are lighter, handy on a slow connection. 4K is reserved for Premium subscribers.",
    "foot.tagline":
      "Download your videos and music from a single link, from more than 1,000 sites.",
    "foot.product": "Product",
    "foot.legalTitle": "Legal",
    "foot.telegram": "Telegram bot",
    "foot.legal": "Legal notice",
    "foot.privacy": "Privacy",
    "foot.terms": "Terms",
    "foot.faq": "FAQ",
    "foot.contact": "Contact",
    "foot.copy": "© 2026 StreamLoaders · Powered by GOD D_PACHA & RelouBird",
    "auth.title": "Welcome",
    "auth.sub": "Log in or create an account.",
    "auth.login": "Log in",
    "auth.register": "Create account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirm": "Confirm password",
    "auth.login_btn": "Log in",
    "auth.register_btn": "Create my account",
    "auth.fill_all": "Fill in all fields.",
    "auth.pwd_mismatch": "Passwords do not match.",
    "auth.login_ok": "✓ Signed in!",
    "auth.register_ok": "✓ Account created!",
    "auth.network_err": "Network error.",
    "prof.title": "My account",
    "prof.email_lbl": "Email",
    "prof.plan_lbl": "Plan: ",
    "prof.upgrade": "Go Premium",
    "prof.logout": "Log out",
    "prof.member_since": "Member since",
    "prem.activate": "Activate Premium →",
    "prem.create_account": "Create my account →",
    "prem.pay_label": "Pay now — 1,200 FCFA",
    "prem.pay": "Pay and activate",
    "prem.note": "Secure payment via GeniusPay",
    "prem.detected": "Detected:",
    "prem.sub_monthly": "1-month plan",
    "prem.sub_halfyearly": "6-month plan",
    "prem.sub_yearly": "1-year plan",
    "prem.preparing": "Preparing payment…",
    "prem.activated": "⚡ Premium activated! Welcome.",
    "st.analyzing": "Analyzing…",
    "st.ready": "formats available",
    "st.err": "Error: ",
    "st.no_url": "Paste a valid URL.",
    "dl.preparing": "Preparing download…",
    "dl.progress": "Downloading…",
    "dl.packaging": "✅ Packaging file…",
    "dl.start": "Download started…",
    "dl.done": "Download complete!",
    "dl.err": "Download error.",
    "dl.no_analysis": "Analyze a URL first before downloading.",
    "dl.processing": "Final conversion…",
    "dl.premium_quality_required":
      "⚡ 4K Ultra HD quality is reserved for Premium subscribers.",
    "dl.trim_invalid_time": "Invalid time format. Use MM:SS (e.g. 00:10).",
    "dl.trim_login_required":
      "Create a free account to use custom video trimming.",
    "pwa.install_title": "Install StreamLoaders",
    "pwa.install_desc": "Direct access from your home screen",
    "pwa.install_btn": "Install",
    "pwa.ios_title": "Install StreamLoaders",
    "pwa.ios_subtitle": "On iPhone / iPad:",
    "pwa.ios_step1":
      'Tap <strong>Share</strong> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:middle;margin:0 3px"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> at the bottom of Safari',
    "pwa.ios_step2": "Choose <strong>Add to Home Screen</strong>",
    "pwa.ios_step3": "Tap <strong>Add</strong>",
    "pwa.ios_close": "Got it",
  },
  es: {
    brand: "StreamLoaders",
    "nav.features": "Funcionalidades",
    "nav.how": "Cómo funciona",
    "nav.formats": "Formatos",
    "nav.pricing": "Precios",
    "nav.faq": "FAQ",
    "nav.cta": "Entrar",
    "hero.line1": "Descarga tus vídeos",
    "hero.line2": "desde un simple enlace.",
    "hero.sub":
      "Pega el enlace de un vídeo de YouTube, TikTok, Instagram, X o Facebook, elige la calidad y recibe tu archivo.",
    "hero.placeholder": "Pega el enlace del vídeo…",
    "hero.analyze": "Analizar",
    "hero.supports": "Compatible con",
    "hero.more": "y más de 1.000 sitios",
    "hero.disclaimer":
      "StreamLoaders es una herramienta técnica. Eres responsable de disponer de los derechos necesarios sobre los medios descargados.",
    "card.format": "Formato",
    "card.download": "Descargar",
    "card.watch": "Ver",
    "card.withSubs": "Descargar con subtítulos",
    "card.subsLang": "Idioma de los subtítulos",
    "card.subsHint":
      "Los subtítulos se integrarán en el vídeo en el idioma elegido, independientemente del original.",
    "card.trimToggle": "Extraer una escena precisa",
    "card.trimStart": "Inicio (ej: 00:10)",
    "card.trimEnd": "Fin (ej: 00:25)",
    "card.premium_quality_locked":
      "⚡ La calidad 4K Ultra HD está reservada para los suscriptores Premium. ¡Pasa a Premium para desbloquear el 4K!",
    "card.trim_limit_reached":
      "Has usado tus 3 recortes gratuitos. Pasa a Premium para recortes ilimitados.",
    "feat.label": "Funcionalidades",
    "feat.t1": "Todo lo necesario,",
    "feat.t2": "nada superfluo.",
    "feat.sub":
      "Una herramienta simple que hace una cosa bien: conseguir tus vídeos en la calidad deseada, sin instalar nada.",
    "f1.t": "De HD a 4K",
    "f1.d":
      "De 480p a 1080p gratis, hasta 4K con Premium. Los archivos se entregan en MP4, reproducible en cualquier dispositivo.",
    "f2.t": "Audio MP3",
    "f2.d":
      "Solo el sonido, en MP3 de alta calidad. Práctico para música, pódcast y conferencias.",
    "f3.t": "Subtítulos integrados",
    "f3.d":
      "Incrusta los subtítulos directamente en el vídeo: francés, inglés, español, italiano, alemán o árabe.",
    "f4.t": "Recorte preciso",
    "f4.d":
      "Conserva sólo la parte que te interesa: indica el inicio y el fin, el resto no se descarga.",
    "f5.t": "Nada se conserva",
    "f5.d":
      "Los archivos se eliminan de nuestros servidores en cuanto se te envían, o al cabo de unos minutos.",
    "f6.t": "También en Telegram",
    "f6.d":
      "Envía un enlace a nuestro bot de Telegram y recibe el vídeo o el audio directamente en el chat.",
    "how.label": "Cómo funciona",
    "how.t1": "Tres pasos,",
    "how.t2": "y ya está.",
    "how.sub":
      "Sin cuenta ni aplicación: todo ocurre en esta página, desde tu teléfono u ordenador.",
    "s1.t": "Copia el enlace",
    "s1.d":
      "En la app o web del vídeo, toca «Compartir» y luego «Copiar enlace».",
    "s2.t": "Pega y elige",
    "s2.d":
      "Pega el enlace arriba y elige la calidad de vídeo o sólo el audio.",
    "s3.t": "Descarga",
    "s3.d": "El archivo se prepara y se guarda directamente en tu dispositivo.",
    "price.label": "Precios",
    "price.t1": "Gratis para empezar,",
    "price.t2": "Premium opcional.",
    "price.sub":
      "Usa StreamLoaders gratis tanto tiempo como quieras. Premium elimina los límites y los anuncios.",
    "price.starting_from": "Desde",
    "pf.badge": "Gratis",
    "pf.period": "Para siempre, sin tarjeta",
    "pf.f1": "30 descargas al día",
    "pf.f2": "Más de 1.000 sitios",
    "pf.f3": "Calidad hasta 1080p",
    "pf.f4": "Financiado por publicidad",
    "pf.f5": "Subtítulos: 5 al día",
    "pf.f6": "Recorte de vídeo: 3 intentos",
    "pf.btn": "Comenzar",
    "pp.badge": "Premium",
    "pp.from": "Desde",
    "pp.period": "Suscripción de 1 mes, 6 meses o 1 año",
    "pp.unit": "/ mes",
    "pp.yearNote": "o {price} / mes en un año (−{pct}%)",
    "pp.f1": "Descargas ilimitadas",
    "pp.f2": "Calidad 4K y audio HD",
    "pp.f3": "Sin anuncios",
    "pp.f4": "Cola prioritaria",
    "pp.f5": "Subtítulos ilimitados",
    "pp.f6": "Recorte de vídeo ilimitado",
    "pp.btn": "Elegir plan",
    "formats.label": "Formatos",
    "formats.t1": "Elige tu calidad,",
    "formats.t2": "vídeo o audio.",
    "formats.sub":
      "StreamLoaders se adapta a tu uso y conexión: un vídeo ligero para ahorrar datos, una imagen nítida para tu pantalla, o solo audio.",
    "formats.c1.t": "Vídeo MP4 de 480p a 4K",
    "formats.c1.d":
      "Elige 480p para ahorrar datos, 720p o 1080p para una imagen nítida. La 4K está reservada para los suscriptores Premium. Los archivos están en MP4, reproducible en teléfono, ordenador y televisión.",
    "formats.c2.t": "Audio MP3 a 320 kbps",
    "formats.c2.d":
      "Para música, un pódcast o una conferencia, descarga sólo el sonido en MP3 de alta calidad, sin el vídeo.",
    "formats.c3.t": "Más de 1 000 sitios compatibles",
    "formats.c3.d":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo y muchos otros. Si el vídeo es público, basta con pegar su enlace.",
    "formats.label": "Formatos",
    "formats.t1": "Elige tu calidad,",
    "formats.t2": "vídeo o audio.",
    "formats.sub":
      "StreamLoaders se adapta a tu uso y conexión: un vídeo ligero para ahorrar datos, una imagen nítida para tu pantalla, o solo audio.",
    "formats.c1.t": "Vídeo MP4 de 480p a 4K",
    "formats.c1.d":
      "Elige 480p para ahorrar datos, 720p o 1080p para una imagen nítida. La 4K está reservada para los suscriptores Premium. Los archivos están en MP4, reproducible en teléfono, ordenador y televisión.",
    "formats.c2.t": "Audio MP3 a 320 kbps",
    "formats.c2.d":
      "Para música, un pódcast o una conferencia, descarga sólo el sonido en MP3 de alta calidad, sin el vídeo.",
    "formats.c3.t": "Más de 1 000 sitios compatibles",
    "formats.c3.d":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo y muchos otros. Si el vídeo es público, basta con pegar su enlace.",
    "faq.label": "Preguntas frecuentes",
    "faq.t1": "¿Tienes una pregunta?",
    "faq.t2": "La respuesta probablemente esté aquí.",
    "faq.q1": "¿StreamLoaders es gratis?",
    "faq.a1":
      "Sí. Sin pagar nada, puedes hacer hasta 30 descargas al día en calidad hasta 1080p. Un plan Premium elimina los límites, desbloquea el 4K y quita los anuncios.",
    "faq.q2": "¿Qué sitios son compatibles?",
    "faq.a2":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo y más de 1.000 sitios. Solo tienes que pegar el enlace: la mayoría de los vídeos públicos son compatibles.",
    "faq.q3": "¿Puedo descargar cualquier vídeo?",
    "faq.a3":
      "StreamLoaders es una herramienta técnica prevista para uso personal. Sigues siendo responsable de disponer de los derechos necesarios sobre el contenido que descargas. Los detalles están en nuestras condiciones de uso.",
    "faq.q4": "¿Se conservan mis archivos?",
    "faq.a4":
      "No. El archivo se prepara en nuestros servidores durante el tiempo de descarga, y se elimina en cuanto se te envía. Si no se recoge, se borra automáticamente al cabo de unos minutos.",
    "faq.q5": "¿Cómo pago Premium?",
    "faq.a5":
      "El pago pasa por GeniusPay: Mobile Money (Orange Money, MTN Money, Wave) o tarjeta bancaria. Tu cuenta pasa a Premium en cuanto se confirma el pago.",
    "faq.q6": "La descarga no arranca, ¿qué hago?",
    "faq.a6":
      "Comprueba que el enlace esté completo y que el vídeo sea público. En horas punta, tu descarga puede esperar un momento en cola: arranca sola, solo mantén la página abierta.",
    "faq.q7": "¿Cómo descargar un vídeo de YouTube en MP3?",
    "faq.a7":
      "Pega el enlace del vídeo de YouTube en la parte superior de la página, haz clic en Analizar, elige «Audio MP3» en la lista de formatos y luego haz clic en Descargar. El archivo se guarda en tu dispositivo.",
    "faq.q8": "¿Cómo descargar un vídeo de TikTok o Instagram?",
    "faq.a8":
      "En la aplicación, toca «Compartir» y luego «Copiar enlace». Pega ese enlace en StreamLoaders, elige la calidad y descarga. Solo se admiten vídeos públicos.",
    "faq.q9": "¿Qué calidad de vídeo debo elegir?",
    "faq.a9":
      "El 1080p conviene a la mayoría de las pantallas. El 720p y el 480p son más ligeros, prácticos con una conexión lenta. La 4K está reservada para los suscriptores Premium.",
    "foot.tagline":
      "Descarga tus vídeos y tu música desde un solo enlace, desde más de 1.000 sitios.",
    "foot.product": "Producto",
    "foot.legalTitle": "Legal",
    "foot.telegram": "Bot de Telegram",
    "foot.legal": "Aviso legal",
    "foot.privacy": "Privacidad",
    "foot.terms": "Términos",
    "foot.faq": "FAQ",
    "foot.contact": "Contacto",
    "foot.copy": "© 2026 StreamLoaders · Impulsada por GOD D_PACHA & RelouBird",
    "auth.title": "Bienvenido",
    "auth.sub": "Inicia sesión o crea una cuenta.",
    "auth.login": "Entrar",
    "auth.register": "Crear cuenta",
    "auth.email": "Correo",
    "auth.password": "Contraseña",
    "auth.confirm": "Confirmar",
    "auth.login_btn": "Entrar",
    "auth.register_btn": "Crear mi cuenta",
    "auth.fill_all": "Rellena todos los campos.",
    "auth.pwd_mismatch": "Las contraseñas no coinciden.",
    "auth.login_ok": "✓ ¡Sesión iniciada!",
    "auth.register_ok": "✓ ¡Cuenta creada!",
    "auth.network_err": "Error de red.",
    "prof.title": "Mi cuenta",
    "prof.email_lbl": "Correo",
    "prof.plan_lbl": "Plan: ",
    "prof.upgrade": "Ir Premium",
    "prof.logout": "Cerrar sesión",
    "prof.member_since": "Miembro desde",
    "prem.activate": "Activar Premium →",
    "prem.create_account": "Crear mi cuenta →",
    "prem.pay_label": "Pagar ahora — 1.200 FCFA",
    "prem.pay": "Pagar y activar",
    "prem.note": "Pago seguro vía GeniusPay",
    "prem.detected": "Detectado:",
    "prem.sub_monthly": "Plan de 1 mes",
    "prem.sub_halfyearly": "Plan de 6 meses",
    "prem.sub_yearly": "Plan anual",
    "prem.preparing": "Preparando pago…",
    "prem.activated": "⚡ ¡Premium activado! Bienvenido.",
    "st.analyzing": "Analizando…",
    "st.ready": "formatos disponibles",
    "st.err": "Error: ",
    "st.no_url": "Introduce una URL válida.",
    "dl.preparing": "Preparando descarga…",
    "dl.progress": "Descargando…",
    "dl.packaging": "✅ Preparando archivo…",
    "dl.start": "Descarga iniciada…",
    "dl.done": "¡Descarga completa!",
    "dl.err": "Error de descarga.",
    "dl.no_analysis": "Analiza una URL antes de descargar.",
    "dl.processing": "Conversión final…",
    "dl.premium_quality_required":
      "⚡ La calidad 4K Ultra HD está reservada para los suscriptores Premium.",
    "dl.trim_invalid_time": "Formato de hora inválido. Usa MM:SS (ej: 00:10).",
    "dl.trim_login_required":
      "Crea una cuenta gratis para usar el recorte de vídeo.",
    "pwa.install_title": "Instalar StreamLoaders",
    "pwa.install_desc": "Acceso directo desde tu pantalla de inicio",
    "pwa.install_btn": "Instalar",
    "pwa.ios_title": "Instalar StreamLoaders",
    "pwa.ios_subtitle": "En iPhone / iPad:",
    "pwa.ios_step1":
      'Toca <strong>Compartir</strong> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:middle;margin:0 3px"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> en la parte inferior de Safari',
    "pwa.ios_step2": "Elige <strong>«Añadir a pantalla de inicio»</strong>",
    "pwa.ios_step3": "Toca <strong>Añadir</strong>",
    "pwa.ios_close": "Entendido",
  },
  pt: {
    brand: "StreamLoaders",
    "nav.features": "Funcionalidades",
    "nav.how": "Como funciona",
    "nav.formats": "Formatos",
    "nav.pricing": "Preços",
    "nav.faq": "FAQ",
    "nav.cta": "Entrar",
    "hero.line1": "Baixe seus vídeos",
    "hero.line2": "a partir de um único link.",
    "hero.sub":
      "Cole o link de um vídeo do YouTube, TikTok, Instagram, X ou Facebook, escolha a qualidade e receba o arquivo.",
    "hero.placeholder": "Cole o link do vídeo…",
    "hero.analyze": "Analisar",
    "hero.supports": "Compatível com",
    "hero.more": "e mais de 1.000 sites",
    "hero.disclaimer":
      "StreamLoaders é uma ferramenta técnica. Você é responsável por ter os direitos necessários sobre a mídia baixada.",
    "card.format": "Formato",
    "card.download": "Baixar",
    "card.watch": "Assistir",
    "card.withSubs": "Baixar com legendas",
    "card.subsLang": "Idioma das legendas",
    "card.subsHint":
      "As legendas serão incorporadas ao vídeo no idioma escolhido, independentemente do original.",
    "card.trimToggle": "Extrair uma cena precisa",
    "card.trimStart": "Início (ex: 00:10)",
    "card.trimEnd": "Fim (ex: 00:25)",
    "card.premium_quality_locked":
      "⚡ A qualidade 4K Ultra HD é reservada para assinantes Premium. Vá para o Premium para desbloquear 4K!",
    "card.trim_limit_reached":
      "Você usou seus 3 cortes gratuitos. Vá para o Premium para cortes ilimitados.",
    "feat.label": "Funcionalidades",
    "feat.t1": "Tudo o que é preciso,",
    "feat.t2": "nada supérfluo.",
    "feat.sub":
      "Uma ferramenta simples que faz uma coisa bem: obter seus vídeos na qualidade desejada, sem instalar nada.",
    "f1.t": "De HD a 4K",
    "f1.d":
      "De 480p a 1080p gratuitamente, até 4K com Premium. Os arquivos vêm em MP4, reproduzíveis em qualquer dispositivo.",
    "f2.t": "Áudio MP3",
    "f2.d":
      "Apenas o som, em MP3 de alta qualidade. Prático para música, podcasts e palestras.",
    "f3.t": "Legendas integradas",
    "f3.d":
      "Incorpora as legendas diretamente no vídeo: francês, inglês, espanhol, italiano, alemão ou árabe.",
    "f4.t": "Corte preciso",
    "f4.d":
      "Mantenha só a parte que interessa: indique o início e o fim, o resto não é baixado.",
    "f5.t": "Nada é conservado",
    "f5.d":
      "Os arquivos são apagados dos nossos servidores assim que são enviados a você, ou após alguns minutos.",
    "f6.t": "Também no Telegram",
    "f6.d":
      "Envie um link para nosso bot do Telegram e receba o vídeo ou o áudio direto no chat.",
    "how.label": "Como funciona",
    "how.t1": "Três passos,",
    "how.t2": "e pronto.",
    "how.sub":
      "Sem conta e sem aplicativo: tudo acontece nesta página, no seu celular ou computador.",
    "s1.t": "Copie o link",
    "s1.d":
      'No app ou site do vídeo, toque em "Compartilhar" e depois em "Copiar link".',
    "s2.t": "Cole e escolha",
    "s2.d":
      "Cole o link no topo desta página e escolha a qualidade de vídeo ou só o áudio.",
    "s3.t": "Baixar",
    "s3.d": "O arquivo é preparado e salvo direto no seu dispositivo.",
    "price.label": "Preços",
    "price.t1": "Grátis para começar,",
    "price.t2": "Premium opcional.",
    "price.sub":
      "Use o StreamLoaders de graça pelo tempo que quiser. O Premium remove os limites e os anúncios.",
    "price.starting_from": "A partir de",
    "pf.badge": "Grátis",
    "pf.period": "Para sempre, sem cartão",
    "pf.f1": "30 downloads por dia",
    "pf.f2": "Mais de 1.000 sites",
    "pf.f3": "Qualidade até 1080p",
    "pf.f4": "Financiado por publicidade",
    "pf.f5": "Legendas: 5 por dia",
    "pf.f6": "Corte de vídeo: 3 tentativas",
    "pf.btn": "Começar",
    "pp.badge": "Premium",
    "pp.from": "A partir de",
    "pp.period": "Assinatura de 1 mês, 6 meses ou 1 ano",
    "pp.unit": "/ mês",
    "pp.yearNote": "ou {price} / mês em um ano (−{pct}%)",
    "pp.f1": "Downloads ilimitados",
    "pp.f2": "Qualidade 4K e áudio HD",
    "pp.f3": "Sem anúncios",
    "pp.f4": "Fila prioritária",
    "pp.f5": "Legendas ilimitadas",
    "pp.f6": "Corte de vídeo ilimitado",
    "pp.btn": "Escolher um plano",
    "formats.label": "Formatos",
    "formats.t1": "Escolha a qualidade,",
    "formats.t2": "vídeo ou áudio.",
    "formats.sub":
      "O StreamLoaders se adapta ao seu uso e conexão: vídeo leve para economizar dados, imagem nítida para sua tela, ou apenas o áudio.",
    "formats.c1.t": "Vídeo MP4 de 480p a 4K",
    "formats.c1.d":
      "Escolha 480p para economizar dados, 720p ou 1080p para uma imagem nítida. A 4K é reservada para assinantes Premium. Os arquivos vêm em MP4, reproduzíveis em celular, computador e TV.",
    "formats.c2.t": "Áudio MP3 em 320 kbps",
    "formats.c2.d":
      "Para música, um podcast ou uma palestra, baixe apenas o som em MP3 de alta qualidade, sem o vídeo.",
    "formats.c3.t": "Mais de 1 000 sites compatíveis",
    "formats.c3.d":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo e muitos outros. Se o vídeo for público, basta colar o link.",
    "faq.label": "Perguntas frequentes",
    "faq.t1": "Tem uma pergunta?",
    "faq.t2": "A resposta provavelmente está aqui.",
    "faq.q1": "O StreamLoaders é gratuito?",
    "faq.a1":
      "Sim. Sem pagar nada, você pode fazer até 30 downloads por dia em qualidade até 1080p. Um plano Premium remove os limites, libera o 4K e tira os anúncios.",
    "faq.q2": "Quais sites são suportados?",
    "faq.a2":
      "YouTube, TikTok, Instagram, X (Twitter), Facebook, Vimeo e mais de 1.000 sites. Basta colar o link: a maioria dos vídeos públicos é suportada.",
    "faq.q3": "Posso baixar qualquer vídeo?",
    "faq.a3":
      "O StreamLoaders é uma ferramenta técnica para uso pessoal. Você continua responsável por ter os direitos necessários sobre o conteúdo que baixa. Os detalhes estão nos termos de uso.",
    "faq.q4": "Meus arquivos são mantidos?",
    "faq.a4":
      "Não. O arquivo é preparado nos nossos servidores durante o download e apagado assim que é enviado a você. Se não for retirado, é apagado automaticamente após alguns minutos.",
    "faq.q5": "Como pago o Premium?",
    "faq.a5":
      "O pagamento passa pela GeniusPay: Mobile Money (Orange Money, MTN Money, Wave) ou cartão bancário. Sua conta vira Premium assim que o pagamento é confirmado.",
    "faq.q6": "O download não começa, o que faço?",
    "faq.a6":
      "Verifique se o link está completo e se o vídeo é público. Em horários de pico, seu download pode esperar um momento na fila: começa sozinho, basta manter a página aberta.",
    "faq.q7": "Como baixar um vídeo do YouTube em MP3?",
    "faq.a7":
      "Cole o link do vídeo do YouTube no topo da página, clique em Analisar, escolha «Áudio MP3» na lista de formatos e clique em Baixar. O arquivo é salvo no seu dispositivo.",
    "faq.q8": "Como baixar um vídeo do TikTok ou do Instagram?",
    "faq.a8":
      "No aplicativo, toque em «Compartilhar» e depois em «Copiar link». Cole esse link no StreamLoaders, escolha a qualidade e baixe. Apenas vídeos públicos são aceitos.",
    "faq.q9": "Qual qualidade de vídeo devo escolher?",
    "faq.a9":
      "O 1080p atende à maioria das telas. O 720p e o 480p são mais leves, práticos com uma conexão lenta. O 4K é reservado para assinantes Premium.",
    "foot.tagline":
      "Baixe seus vídeos e músicas por um único link, de mais de 1.000 sites.",
    "foot.product": "Produto",
    "foot.legalTitle": "Legal",
    "foot.telegram": "Bot do Telegram",
    "foot.legal": "Aviso legal",
    "foot.privacy": "Privacidade",
    "foot.terms": "Termos",
    "foot.faq": "FAQ",
    "foot.contact": "Contato",
    "foot.copy":
      "© 2026 StreamLoaders · Desenvolvido por GOD D_PACHA & RelouBird",
    "auth.title": "Bem-vindo",
    "auth.sub": "Faça login ou crie uma conta.",
    "auth.login": "Entrar",
    "auth.register": "Criar conta",
    "auth.email": "E-mail",
    "auth.password": "Senha",
    "auth.confirm": "Confirmar",
    "auth.login_btn": "Entrar",
    "auth.register_btn": "Criar minha conta",
    "auth.fill_all": "Preencha todos os campos.",
    "auth.pwd_mismatch": "As senhas não coincidem.",
    "auth.login_ok": "✓ Sessão iniciada!",
    "auth.register_ok": "✓ Conta criada!",
    "auth.network_err": "Erro de rede.",
    "prof.title": "Minha conta",
    "prof.email_lbl": "E-mail",
    "prof.plan_lbl": "Plano: ",
    "prof.upgrade": "Ir Premium",
    "prof.logout": "Sair",
    "prof.member_since": "Membro desde",
    "prem.activate": "Ativar Premium →",
    "prem.create_account": "Criar minha conta →",
    "prem.pay_label": "Pagar agora — 1.200 FCFA",
    "prem.pay": "Pagar e ativar",
    "prem.note": "Pagamento seguro via GeniusPay",
    "prem.detected": "Detectado:",
    "prem.sub_monthly": "Plano de 1 mês",
    "prem.sub_halfyearly": "Plano de 6 meses",
    "prem.sub_yearly": "Plano anual",
    "prem.preparing": "Preparando pagamento…",
    "prem.activated": "⚡ Premium ativado! Bem-vindo.",
    "st.analyzing": "Analisando…",
    "st.ready": "formatos disponíveis",
    "st.err": "Erro: ",
    "st.no_url": "Cole uma URL válida.",
    "dl.preparing": "Preparando download…",
    "dl.progress": "Baixando…",
    "dl.packaging": "✅ Preparando arquivo…",
    "dl.start": "Download iniciado…",
    "dl.done": "Download concluído!",
    "dl.err": "Erro de download.",
    "dl.no_analysis": "Analise uma URL antes de baixar.",
    "dl.processing": "Conversão final…",
    "dl.premium_quality_required":
      "⚡ A qualidade 4K Ultra HD é reservada para assinantes Premium.",
    "dl.trim_invalid_time": "Formato de hora inválido. Use MM:SS (ex: 00:10).",
    "dl.trim_login_required":
      "Crie uma conta gratuita para usar o corte de vídeo.",
    "pwa.install_title": "Instalar o StreamLoaders",
    "pwa.install_desc": "Acesso direto a partir da sua tela inicial",
    "pwa.install_btn": "Instalar",
    "pwa.ios_title": "Instalar o StreamLoaders",
    "pwa.ios_subtitle": "No iPhone / iPad:",
    "pwa.ios_step1":
      'Toque em <strong>Compartilhar</strong> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:middle;margin:0 3px"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> na parte inferior do Safari',
    "pwa.ios_step2": "Escolha <strong>«Adicionar à Tela de Início»</strong>",
    "pwa.ios_step3": "Toque em <strong>Adicionar</strong>",
    "pwa.ios_close": "Entendi",
  },
  ar: {
    brand: "StreamLoaders",
    "nav.features": "الميزات",
    "nav.how": "كيف يعمل",
    "nav.formats": "الصيغ",
    "nav.pricing": "الأسعار",
    "nav.faq": "الأسئلة الشائعة",
    "nav.cta": "تسجيل الدخول",
    "hero.line1": "حمّل مقاطع الفيديو الخاصة بك",
    "hero.line2": "من رابط واحد.",
    "hero.sub":
      "الصق رابط فيديو من يوتيوب أو تيك توك أو إنستغرام أو إكس أو فيسبوك، اختر الجودة، واحصل على ملفك.",
    "hero.placeholder": "الصق رابط الفيديو…",
    "hero.analyze": "تحليل",
    "hero.supports": "متوافق مع",
    "hero.more": "وأكثر من 1000 موقع",
    "hero.disclaimer":
      "StreamLoaders أداة تقنية. أنت المسؤول عن امتلاك الحقوق اللازمة للوسائط التي تقوم بتنزيلها.",
    "card.format": "الصيغة",
    "card.download": "تحميل",
    "card.watch": "مشاهدة",
    "card.withSubs": "تحميل مع الترجمة",
    "card.subsLang": "لغة الترجمة",
    "card.subsHint":
      "سيتم دمج الترجمة في الفيديو باللغة المختارة، مهما كانت اللغة الأصلية.",
    "card.trimToggle": "استخراج مشهد محدد",
    "card.trimStart": "البداية (مثال: 00:10)",
    "card.trimEnd": "النهاية (مثال: 00:25)",
    "card.premium_quality_locked":
      "⚡ جودة 4K Ultra HD مخصصة لمشتركي بريميوم. قم بالترقية لفتح جودة 4K!",
    "card.trim_limit_reached":
      "لقد استخدمت محاولاتك الثلاث المجانية للاقتصاص. قم بالترقية إلى بريميوم لاقتصاص غير محدود.",
    "feat.label": "الميزات",
    "feat.t1": "كل ما تحتاجه،",
    "feat.t2": "بلا زوائد.",
    "feat.sub":
      "أداة بسيطة تؤدي مهمة واحدة بإتقان: الحصول على فيديوهاتك بالجودة التي تريدها، دون تثبيت أي شيء.",
    "f1.t": "من HD إلى 4K",
    "f1.d":
      "من 480p إلى 1080p مجانًا، وحتى 4K مع بريميوم. يتم التسليم بصيغة MP4 قابلة للتشغيل على أي جهاز.",
    "f2.t": "صوت MP3",
    "f2.d":
      "احتفظ بالصوت فقط بصيغة MP3 عالية الجودة. مناسب للموسيقى والبودكاست والمحاضرات.",
    "f3.t": "ترجمة مدمجة",
    "f3.d":
      "أضف الترجمة مباشرة إلى الفيديو: الفرنسية، الإنجليزية، الإسبانية، الإيطالية، الألمانية أو العربية.",
    "f4.t": "اقتصاص دقيق",
    "f4.d":
      "احتفظ فقط بالجزء الذي يهمك: حدد البداية والنهاية، والباقي لا يتم تنزيله.",
    "f5.t": "لا شيء يُحتفظ به",
    "f5.d": "تُحذف الملفات من خوادمنا بمجرد إرسالها إليك، أو بعد بضع دقائق.",
    "f6.t": "أيضًا على تيليجرام",
    "f6.d":
      "أرسل رابطًا إلى بوت تيليجرام الخاص بنا واستلم الفيديو أو الصوت مباشرة في المحادثة.",
    "how.label": "كيف يعمل",
    "how.t1": "ثلاث خطوات،",
    "how.t2": "وهذا كل شيء.",
    "how.sub":
      "بدون حساب وبدون تطبيق: كل شيء يحدث في هذه الصفحة، من هاتفك أو حاسوبك.",
    "s1.t": "انسخ الرابط",
    "s1.d": "في تطبيق أو موقع الفيديو، اضغط على «مشاركة» ثم «نسخ الرابط».",
    "s2.t": "الصق واختر",
    "s2.d":
      "الصق الرابط في أعلى هذه الصفحة، ثم اختر جودة الفيديو أو الصوت فقط.",
    "s3.t": "تحميل",
    "s3.d": "يتم تجهيز الملف ثم حفظه مباشرة على جهازك.",
    "price.label": "الأسعار",
    "price.t1": "مجاني في البداية،",
    "price.t2": "بريميوم اختياري.",
    "price.sub":
      "استخدم StreamLoaders مجانًا للمدة التي تريد. يزيل بريميوم الحدود والإعلانات.",
    "price.starting_from": "بدءاً من",
    "pf.badge": "مجاني",
    "pf.period": "إلى الأبد، بدون بطاقة",
    "pf.f1": "30 تحميلاً في اليوم",
    "pf.f2": "أكثر من 1000 موقع",
    "pf.f3": "جودة حتى 1080p",
    "pf.f4": "مدعوم بالإعلانات",
    "pf.f5": "الترجمة: 5 يوميًا",
    "pf.f6": "اقتصاص الفيديو: 3 محاولات",
    "pf.btn": "ابدأ الآن",
    "pp.badge": "بريميوم",
    "pp.from": "ابتداءً من",
    "pp.period": "اشتراك لمدة شهر أو 6 أشهر أو سنة",
    "pp.unit": "/ شهر",
    "pp.yearNote": "أو {price} / شهر على مدى سنة (−{pct}٪)",
    "pp.f1": "تحميلات غير محدودة",
    "pp.f2": "جودة 4K وصوت HD",
    "pp.f3": "بدون إعلانات",
    "pp.f4": "طابور الأولوية",
    "pp.f5": "ترجمة غير محدودة",
    "pp.f6": "اقتصاص فيديو غير محدود",
    "pp.btn": "اختر باقة",
    "formats.label": "الصيغ",
    "formats.t1": "اختر الجودة،",
    "formats.t2": "فيديو أو صوت.",
    "formats.sub":
      "يتكيف StreamLoaders مع استخدامك واتصالك: فيديو خفيف لتوفير البيانات، صورة واضحة لشاشتك، أو الصوت فقط.",
    "formats.c1.t": "فيديو MP4 من 480p إلى 4K",
    "formats.c1.d":
      "اختر 480p لتوفير البيانات، أو 720p أو 1080p للحصول على صورة واضحة. جودة 4K مخصصة لمشتركي بريميوم. الملف بصيغة MP4، قابل للتشغيل على الهاتف والحاسوب والتلفاز.",
    "formats.c2.t": "صوت MP3 بجودة 320 kbps",
    "formats.c2.d":
      "للموسيقى أو البودكاست أو المحاضرة، حمّل الصوت فقط بصيغة MP3 عالية الجودة، دون الفيديو.",
    "formats.c3.t": "أكثر من 1000 موقع متوافق",
    "formats.c3.d":
      "يوتيوب، تيك توك، إنستغرام، إكس (تويتر)، فيسبوك، فيميو وغيرها الكثير. إذا كان الفيديو عامًا، فما عليك سوى لصق رابطه.",
    "faq.label": "الأسئلة الشائعة",
    "faq.t1": "هل لديك سؤال؟",
    "faq.t2": "الجواب على الأرجح هنا.",
    "faq.q1": "هل StreamLoaders مجاني؟",
    "faq.a1":
      "نعم. دون دفع أي شيء، يمكنك إجراء ما يصل إلى 30 تحميلًا يوميًا بجودة تصل إلى 1080p. تزيل باقة بريميوم الحدود، وتفتح 4K، وتزيل الإعلانات.",
    "faq.q2": "ما المواقع المدعومة؟",
    "faq.a2":
      "يوتيوب، تيك توك، إنستغرام، إكس (تويتر)، فيسبوك، فيميو وأكثر من 1000 موقع آخر. الصق الرابط فقط: معظم الفيديوهات المتاحة علنًا مدعومة.",
    "faq.q3": "هل يحق لي تنزيل أي فيديو؟",
    "faq.a3":
      "StreamLoaders أداة تقنية مخصصة للاستخدام الشخصي. تظل مسؤولًا عن امتلاك الحقوق اللازمة للمحتوى الذي تنزّله. التفاصيل في شروط الاستخدام.",
    "faq.q4": "هل يتم الاحتفاظ بملفاتي؟",
    "faq.a4":
      "لا. يتم تجهيز الملف على خوادمنا خلال مدة التنزيل، ثم يُحذف بمجرد إرساله إليك. إذا لم يتم استرجاعه， يُحذف تلقائيًا بعد بضع دقائق.",
    "faq.q5": "كيف أدفع لبريميوم؟",
    "faq.a5":
      "يمر الدفع عبر GeniusPay: المحفظة الإلكترونية (Orange Money، MTN Money، Wave) أو بطاقة بنكية. يتحول حسابك إلى بريميوم بمجرد تأكيد الدفع.",
    "faq.q6": "لا يبدأ التنزيل، ماذا أفعل؟",
    "faq.a6":
      "تحقق من أن الرابط كامل وأن الفيديو عام. في أوقات الذروة، قد ينتظر تنزيلك لحظة في الطابور: يبدأ تلقائيًا، فقط أبقِ الصفحة مفتوحة.",
    "faq.q7": "كيف أحمّل فيديو من يوتيوب بصيغة MP3؟",
    "faq.a7":
      "الصق رابط فيديو يوتيوب في أعلى الصفحة، اضغط على تحليل، اختر «صوت MP3» من قائمة الصيغ، ثم اضغط على تحميل. يُحفظ الملف على جهازك.",
    "faq.q8": "كيف أحمّل فيديو من تيك توك أو إنستغرام؟",
    "faq.a8":
      "في التطبيق، اضغط على «مشاركة» ثم «نسخ الرابط». الصق هذا الرابط على StreamLoaders، اختر الجودة وحمّل. تُدعم الفيديوهات العامة فقط.",
    "faq.q9": "ما جودة الفيديو التي يجب أن أختارها؟",
    "faq.a9":
      "جودة 1080p مناسبة لمعظم الشاشات. جودة 720p و480p أخف، وعملية مع الاتصال البطيء. جودة 4K مخصصة لمشتركي بريميوم.",
    "foot.tagline":
      "حمّل فيديوهاتك وموسيقاك من رابط واحد، من أكثر من 1000 موقع.",
    "foot.product": "المنتج",
    "foot.legalTitle": "المعلومات القانونية",
    "foot.telegram": "بوت تيليجرام",
    "foot.legal": "المعلومات القانونية",
    "foot.privacy": "الخصوصية",
    "foot.terms": "الشروط",
    "foot.faq": "الأسئلة الشائعة",
    "foot.contact": "اتصل بنا",
    "foot.copy": "© 2026 StreamLoaders · بدعم من GOD D_PACHA & RelouBird",
    "auth.title": "مرحباً",
    "auth.sub": "سجّل الدخول أو أنشئ حساباً.",
    "auth.login": "تسجيل الدخول",
    "auth.register": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirm": "تأكيد كلمة المرور",
    "auth.login_btn": "تسجيل الدخول",
    "auth.register_btn": "إنشاء حسابي",
    "auth.fill_all": "املأ جميع الحقول.",
    "auth.pwd_mismatch": "كلمتا المرور غير متطابقتين.",
    "auth.login_ok": "✓ تم تسجيل الدخول!",
    "auth.register_ok": "✓ تم إنشاء الحساب!",
    "auth.network_err": "خطأ في الشبكة.",
    "prof.title": "حسابي",
    "prof.email_lbl": "البريد الإلكتروني",
    "prof.plan_lbl": "الخطة: ",
    "prof.upgrade": "الترقية إلى بريميوم",
    "prof.logout": "تسجيل الخروج",
    "prof.member_since": "عضو منذ",
    "prem.activate": "تفعيل بريميوم ←",
    "prem.create_account": "إنشاء حسابي ←",
    "prem.pay_label": "ادفع الآن — 1,200 فرنك",
    "prem.pay": "ادفع وفعّل",
    "prem.note": "دفع آمن عبر GeniusPay",
    "prem.detected": "تم الكشف عن:",
    "prem.sub_monthly": "باقة شهرية",
    "prem.sub_halfyearly": "باقة 6 أشهر",
    "prem.sub_yearly": "باقة سنوية",
    "prem.preparing": "جارٍ تحضير الدفع…",
    "prem.activated": "⚡ تم تفعيل بريميوم! مرحباً.",
    "st.analyzing": "جارٍ التحليل…",
    "st.ready": "صيغة متاحة",
    "st.err": "خطأ: ",
    "st.no_url": "أدخل رابطاً صحيحاً.",
    "dl.preparing": "جارٍ تحضير التحميل…",
    "dl.progress": "جارٍ التحميل…",
    "dl.packaging": "✅ جارٍ تحضير الملف…",
    "dl.start": "بدأ التحميل…",
    "dl.done": "اكتمل التحميل!",
    "dl.err": "خطأ في التحميل.",
    "dl.no_analysis": "حلل رابطاً قبل التحميل.",
    "dl.processing": "التحويل النهائي…",
    "dl.premium_quality_required": "⚡ جودة 4K Ultra HD مخصصة لمشتركي بريميوم.",
    "dl.trim_invalid_time": "صيغة وقت غير صالحة. استخدم MM:SS (مثال: 00:10).",
    "dl.trim_login_required": "أنشئ حساباً مجانياً لاستخدام اقتصاص الفيديو.",
    "pwa.install_title": "تثبيت StreamLoaders",
    "pwa.install_desc": "وصول مباشر من الشاشة الرئيسية",
    "pwa.install_btn": "تثبيت",
    "pwa.ios_title": "تثبيت StreamLoaders",
    "pwa.ios_subtitle": "على iPhone / iPad:",
    "pwa.ios_step1":
      'اضغط على <strong>مشاركة</strong> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="vertical-align:middle;margin:0 3px"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> في أسفل Safari',
    "pwa.ios_step2": "اختر <strong>«إضافة إلى الشاشة الرئيسية»</strong>",
    "pwa.ios_step3": "اضغط على <strong>إضافة</strong>",
    "pwa.ios_close": "فهمت",
  },
};

export const LANGS = ["fr", "en", "es", "pt", "ar"];
const LANG_KEY = "sl-lang";

/** Langue par défaut : français, sauf si l'utilisateur a explicitement choisi autre chose. */
function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && LANGS.includes(saved)) return saved;
  return "fr";
}

/** Traduit une clé pour la langue courante, avec repli sur le français. */
export function t(key) {
  return (TR[state.lang] || TR.fr)[key] || TR.fr[key] || key;
}

/** Applique les traductions à tous les éléments [data-i18n] / [data-i18n-html] / [data-i18n-placeholder]. */
export function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = t(el.dataset.i18nHtml);
    if (v) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const v = t(el.dataset.i18nPlaceholder);
    if (v) el.placeholder = v;
  });
  const label = document.getElementById("langLabel");
  if (label) label.textContent = state.lang.toUpperCase();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
}

export function initI18n() {
  state.lang = detectLang();
  applyI18n();
  const langBtn = document.getElementById("langBtn");
  langBtn?.addEventListener("click", () => {
    state.lang = LANGS[(LANGS.indexOf(state.lang) + 1) % LANGS.length];
    localStorage.setItem(LANG_KEY, state.lang);
    applyI18n();
  });
}
