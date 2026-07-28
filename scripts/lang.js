// scripts/lang.js — Internationalisation
const TR = {
  fr: {
    'brand':'StreamLoader', 'nav.features':'Fonctionnalités', 'nav.how':'Comment ça marche',
    'nav.pricing':'Premium', 'nav.cta':'Connexion',
    'hero.badge':'Propulsé par yt-dlp · 1000+ sites', 'hero.line1':'Télécharge des vidéos',
    'hero.line2':'sans limite.', 'hero.sub':'YouTube, TikTok, Instagram, Twitter, Facebook…',
    'hero.placeholder':'Colle l\'URL ici…', 'hero.analyze':'Analyser', 'hero.supports':'Compatible :',
    'hero.more':'+1000 autres', 'card.format':'Format', 'card.download':'Télécharger',
    'card.watch':'Regarder', 'stats.sites':'Sites supportés', 'stats.quality':'Qualité max',
    'stats.price':'Gratuit', 'stats.formats':'Formats',
    'feat.label':'Fonctionnalités', 'feat.t1':'Tout ce dont', 'feat.t2':'tu as besoin.',
    'feat.sub':'Simple, puissant, rapide.', 'f1.t':'Vidéo HD & 4K', 'f1.d':'...',
    'f2.t':'Audio MP3', 'f2.d':'...', 'f3.t':'Sous-titres', 'f3.d':'...',
    'f4.t':'Playlist entière', 'f4.d':'...', 'f5.t':'Sécurisé & Privé', 'f5.d':'...',
    'f6.t':'Mobile First', 'f6.d':'...', 'how.label':'Comment ça marche',
    'how.t1':'Simple', 'how.t2':'en 3 étapes.', 's1.t':'Colle l\'URL', 's1.d':'...',
    's2.t':'Choisis le format', 's2.d':'...', 's3.t':'Télécharge', 's3.d':'...',
    'price.label':'Tarifs', 'price.t1':'Commence', 'price.t2':'gratuitement.',
    'pf.badge':'Gratuit', 'pf.period':'Pour toujours', 'pf.f1':'Téléchargements nombreux',
    'pf.f2':'1000+ sites supportés', 'pf.f3':'Formats standard', 'pf.f4':'Avec publicités',
    'pf.btn':'Commencer', 'pp.badge':'⚡ Premium', 'pp.period':'accès à vie',
    'pp.f1':'Téléchargements illimités', 'pp.f2':'4K + Audio HD', 'pp.f3':'Sans publicités',
    'pp.f4':'Priorité serveur', 'pp.btn':'Passer Premium',
    'foot.privacy':'Confidentialité', 'foot.terms':'Conditions', 'foot.faq':'FAQ',
    'foot.contact':'Contact', 'foot.copy':'© 2026 StreamLoader · Propulsé par yt-dlp',
    'auth.title':'Bienvenue', 'auth.sub':'Connecte-toi ou crée un compte.',
    'auth.login':'Connexion', 'auth.register':'Créer un compte',
    'auth.email':'Email', 'auth.password':'Mot de passe', 'auth.confirm':'Confirmer',
    'auth.login_btn':'Se connecter', 'auth.register_btn':'Créer mon compte',
    'prem.title':'Passer Premium', 'prem.sub':'Paiement unique.', 'prem.must_login':'...',
    'prem.pay':'Payer 2€ et activer', 'prem.note':'...', 'prof.title':'Mon compte',
    'prof.email_lbl':'Email', 'prof.plan_lbl':'Plan : ', 'prof.upgrade':'Passer Premium',
    'prof.logout':'Se déconnecter', 'st.analyzing':'Analyse en cours…',
    'st.ready':'formats disponibles', 'st.err':'Erreur : ', 'st.no_url':'Colle une URL valide.',
    'dl.start':'Téléchargement démarré…', 'dl.done':'Téléchargement terminé !',
    'dl.err':'Erreur téléchargement.',
  },
      en: {
        'brand': 'StreamLoader', 'nav.features': 'Features', 'nav.how': 'How it works', 'nav.pricing': 'Premium', 'nav.cta': 'Login',
        'hero.badge': 'Powered by yt-dlp · 1000+ sites', 'hero.line1': 'Download videos', 'hero.line2': 'without limits.',
        'hero.sub': 'YouTube, TikTok, Instagram, Twitter, Facebook paste the link, pick the format, done.',
        'hero.placeholder': 'Paste URL here YouTube, TikTok, Instagram…', 'hero.analyze': 'Analyze', 'hero.supports': 'Works with:', 'hero.more': '+1000 more',
        'card.format': 'Format', 'card.download': 'Download', 'card.watch': 'Watch', 'card.progress': 'Downloading…', 'card.progress_note': 'File will be saved to your downloads folder.',
        'stats.sites': 'Sites supported', 'stats.quality': 'Max quality', 'stats.price': 'Free', 'stats.formats': 'Formats',
        'feat.label': 'Features', 'feat.t1': 'Everything', 'feat.t2': 'you need.', 'feat.sub': 'Simple, powerful, fast. No installation needed.',
        'f1.t': 'HD & 4K Video', 'f1.d': 'Download up to 4K Ultra HD.',
        'f2.t': 'MP3 Audio', 'f2.d': 'Extract high-quality MP3 audio.',
        'f3.t': 'Subtitles', 'f3.d': 'Download available subtitles.',
        'f4.t': 'Full Playlist', 'f4.d': 'Download entire playlists in one click.',
        'f5.t': 'Secure & Private', 'f5.d': 'No files stored on our servers.',
        'f6.t': 'Mobile First', 'f6.d': 'Optimized for smartphones and slow connections.',
        'how.label': 'How it works', 'how.t1': 'Simple', 'how.t2': 'in 3 steps.',
        's1.t': 'Paste the URL', 's1.d': 'Copy the link of any video.',
        's2.t': 'Choose format', 's2.d': 'Select MP4 4K, 1080p, 720p or MP3.',
        's3.t': 'Download', 's3.d': 'File is saved directly to your device.',
        'price.label': 'Pricing', 'price.t1': 'Start', 'price.t2': 'for free.',
        'pf.badge': 'Free', 'pf.period': 'Forever', 'pf.f1': 'Many downloads', 'pf.f2': '1000+ sites', 'pf.f3': 'Standard formats', 'pf.f4': 'With ads', 'pf.btn': 'Get started',
        'pp.badge': '⚡ Premium', 'pp.period': 'lifetime access', 'pp.f1': 'Unlimited downloads', 'pp.f2': '4K + HD Audio', 'pp.f3': 'No ads', 'pp.f4': 'Priority server', 'pp.btn': 'Go Premium',
        'foot.privacy': 'Privacy', 'foot.terms': 'Terms', 'foot.faq': 'FAQ', 'foot.contact': 'Contact', 'foot.copy': '© 2026 StreamLoader · Powered by yt-dlp',
        'auth.title': 'Welcome', 'auth.sub': 'Login or create an account.', 'auth.login': 'Login', 'auth.register': 'Create account',
        'auth.email': 'Email', 'auth.password': 'Password', 'auth.confirm': 'Confirm', 'auth.login_btn': 'Sign in', 'auth.register_btn': 'Create account',
        'prem.title': 'Go Premium', 'prem.sub': 'One-time payment. Lifetime access.', 'prem.must_login': 'Please create an account first.',
        'prem.pay': 'Pay €2 and activate', 'prem.note': 'Simulated payment for demo.',
        'prof.title': 'My account', 'prof.email_lbl': 'Email', 'prof.plan_lbl': 'Plan: ', 'prof.upgrade': 'Go Premium', 'prof.logout': 'Sign out',
        'st.analyzing': 'Analyzing…', 'st.ready': 'formats available', 'st.err': 'Error: ', 'st.no_url': 'Paste a valid URL.',
        'dl.start': 'Download started…', 'dl.done': 'Download complete!', 'dl.err': 'Download error.',
      },
      es: {
        'brand': 'StreamLoader', 'nav.cta': 'Entrar', 'hero.line1': 'Descarga vídeos', 'hero.line2': 'sin límites.',
        'hero.placeholder': 'Pega la URL aquí…', 'hero.analyze': 'Analizar', 'hero.supports': 'Compatible con:', 'hero.more': '+1000 más',
        'card.download': 'Descargar', 'card.watch': 'Ver', 'card.progress': 'Descargando…',
        'pf.badge': 'Gratis', 'pf.period': 'Para siempre', 'pf.f1': 'Muchas descargas', 'pf.f2': '1000+ sitios', 'pf.f3': 'Formatos estándar', 'pf.f4': 'Con anuncios', 'pf.btn': 'Comenzar',
        'pp.badge': '⚡ Premium', 'pp.period': 'acceso de por vida', 'pp.f1': 'Descargas ilimitadas', 'pp.f2': '4K + Audio HD', 'pp.f3': 'Sin anuncios', 'pp.f4': 'Servidor prioritario', 'pp.btn': 'Ir Premium',
        'prem.pay': 'Pagar 2€ y activar', 'auth.login_btn': 'Iniciar sesión', 'auth.register_btn': 'Crear cuenta', 'prof.logout': 'Cerrar sesión',
        'st.analyzing': 'Analizando…', 'st.ready': 'formatos disponibles', 'st.err': 'Error: ', 'st.no_url': 'Introduce una URL válida.',
        'dl.start': 'Descarga iniciada…', 'dl.done': '¡Descarga completa!',
      },
      pt: {
        'brand': 'StreamLoader', 'nav.cta': 'Entrar', 'hero.line1': 'Baixe vídeos', 'hero.line2': 'sem limites.',
        'hero.placeholder': 'Cole a URL aqui…', 'hero.analyze': 'Analisar', 'hero.supports': 'Compatível com:', 'hero.more': '+1000 outros',
        'card.download': 'Baixar', 'card.watch': 'Assistir', 'card.progress': 'Baixando…',
        'pf.badge': 'Grátis', 'pf.period': 'Para sempre', 'pf.f1': 'Muitos downloads', 'pf.f2': '1000+ sites', 'pf.f3': 'Formatos padrão', 'pf.f4': 'Com anúncios', 'pf.btn': 'Começar',
        'pp.badge': '⚡ Premium', 'pp.period': 'acesso vitalício', 'pp.f1': 'Downloads ilimitados', 'pp.f2': '4K + Áudio HD', 'pp.f3': 'Sem anúncios', 'pp.f4': 'Servidor prioritário', 'pp.btn': 'Ir Premium',
        'prem.pay': 'Pagar 2€ e ativar', 'auth.login_btn': 'Entrar', 'auth.register_btn': 'Criar conta', 'prof.logout': 'Sair',
        'st.analyzing': 'Analisando…', 'st.ready': 'formatos disponíveis', 'st.err': 'Erro: ', 'st.no_url': 'Cole uma URL válida.',
        'dl.start': 'Download iniciado…', 'dl.done': 'Download concluído!',
      },
      ar: {
        'brand': 'StreamLoader', 'nav.cta': 'تسجيل الدخول', 'hero.line1': 'حمّل مقاطع الفيديو', 'hero.line2': 'بلا حدود.',
        'hero.placeholder': 'الصق الرابط هنا…', 'hero.analyze': 'تحليل', 'hero.supports': 'متوافق مع:', 'hero.more': '+1000 موقع',
        'card.download': 'تحميل', 'card.watch': 'مشاهدة', 'card.progress': 'جارٍ التحميل…',
        'pf.badge': 'مجاني', 'pf.period': 'إلى الأبد', 'pf.f1': 'تحميلات كثيرة', 'pf.f2': 'أكثر من 1000 موقع', 'pf.f3': 'صيغ قياسية', 'pf.f4': 'مع إعلانات', 'pf.btn': 'ابدأ الآن',
        'pp.badge': '⚡ بريميوم', 'pp.period': 'وصول مدى الحياة', 'pp.f1': 'تحميلات غير محدودة', 'pp.f2': '4K + صوت HD', 'pp.f3': 'بدون إعلانات', 'pp.f4': 'أولوية الخادم', 'pp.btn': 'الترقية',
        'prem.pay': 'دفع 2€ وتفعيل', 'auth.login_btn': 'تسجيل الدخول', 'auth.register_btn': 'إنشاء حساب', 'prof.logout': 'تسجيل الخروج',
        'st.analyzing': 'جارٍ التحليل…', 'st.ready': 'صيغة متاحة', 'st.err': 'خطأ: ', 'st.no_url': 'أدخل رابطاً صحيحاً.',
        'dl.start': 'بدأ التحميل…', 'dl.done': 'اكتمل التحميل!',
      }
};

const LANGS = ['fr','en','es','pt','ar'];
let currentLang = 'fr';

export function detectLang() {
  const l = (navigator.language || 'fr').split('-')[0].toLowerCase();
  currentLang = LANGS.includes(l) ? l : 'fr';
  return currentLang;
}

export function t(k) {
  return (TR[currentLang] && TR[currentLang][k]) || TR.fr[k] || k;
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  applyI18n();
}

export function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t(el.dataset.i18nPlaceholder);
    if (v) el.placeholder = v;
  });
  document.getElementById('langLabel').textContent = currentLang.toUpperCase();
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

export function toggleLang() {
  const idx = LANGS.indexOf(currentLang);
  setLang(LANGS[(idx + 1) % LANGS.length]);
}