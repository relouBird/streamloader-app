#!/usr/bin/env node
"use strict";
/**
 * _build/build-pages.js
 *
 * Génère une page par plateforme dans <racine>/<outDir>/<slug>/index.html
 * à partir de :
 *   - _build/platforms.json          (contenu de chaque page)
 *   - _build/platform.template.html  (gabarit)
 *   - index.html                     (source unique de la nav, du footer, des modales, etc.,
 *                                     repérés par des commentaires <!-- build:NOM:start/end -->)
 *
 * Il met aussi à jour :
 *   - la zone <!-- build:platforms:start/end --> de index.html (liens du footer)
 *   - sitemap.xml
 *
 * Usage :  node _build/build-pages.js          (génère)
 *          node _build/build-pages.js --dry    (simule, n'écrit rien)
 */
const fs = require("fs");
const path = require("path");

// Textes communs du gabarit (hors platforms.json)
const COMMON_FR = {
  "foot.download": "Télécharger",
  "pg.home": "Accueil",
  "pg.how": "Mode d'emploi",
  "pg.faqAbout": "Questions sur",
  "pg.otherLabel": "Autres sites",
  "pg.otherT1": "Télécharger depuis",
  "pg.otherT2": "d'autres sites.",
};

const I18N_README =
  "Fichier de traductions des pages plateformes. Le build met à jour 'fr' tout seul. " +
  "Remplis uniquement les valeurs vides (en/es/pt/ar). Garde les balises HTML des clés '.html' intactes, " +
  "ne traduis pas les noms de marques, URLs ni exemples comme 00:10. Quand une traduction est à jour, supprime 'outdated'.";

const ROOT = path.resolve(__dirname, "..");
const LANGS = ["fr", "en", "es", "pt", "ar"];
const I18N_FILE = path.join(__dirname, "platforms.i18n.json");
const I18N_OUT = path.join(ROOT, "scripts", "i18n-platforms.js");
const INDEX = path.join(ROOT, "index.html");
const DATA = path.join(__dirname, "platforms.json");
const TEMPLATE = path.join(__dirname, "platform.template.html");
const SITEMAP = path.join(ROOT, "sitemap.xml");
const DRY = process.argv.includes("--dry");

const GENERATED_MARK =
  "<!-- Page générée par _build/build-pages.js : ne pas modifier à la main -->";
const BLOCKS = [
  "head",
  "bg",
  "nav",
  "widget",
  "footer",
  "modal",
  "pwa",
  "inline-js",
];
// IDs que le JavaScript du site cherche : s'ils manquent, la page serait cassée.
const REQUIRED_IDS = [
  "urlInput",
  "analyzeBtn",
  "status-area",
  "videoCard",
  "vcFmts",
  "dlBtn",
  "modalBackdrop",
  "panelAuth",
  "panelPremium",
  "panelProfile",
  "premBtn",
  "apiKeyBox",
  "navCta",
  "navUserChip",
  "langBtn",
  "themeBtn",
];

/* ─── Utilitaires ─────────────────────────────────────────────── */
const warnings = [];
const warn = (m) => {
  warnings.push(m);
  console.warn("  ⚠ " + m);
};
const fail = (m) => {
  console.error("\n✖ " + m + "\n");
  process.exit(1);
};

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const stripTags = (s) => String(s ?? "").replace(/<[^>]*>/g, " ");
const countWords = (s) => stripTags(s).split(/\s+/).filter(Boolean).length;
const norm = (s) => s.replace(/\r\n/g, "\n");

function readFile(file, label) {
  if (!fs.existsSync(file)) fail(`Fichier introuvable : ${label || file}`);
  return fs.readFileSync(file, "utf8");
}

function writeIfChanged(file, content) {
  const old = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (old === content) return false;
  if (!DRY) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, "utf8");
  }
  return true;
}

/* ─── Données ─────────────────────────────────────────────────── */
function loadData() {
  let data;
  try {
    data = JSON.parse(readFile(DATA, "_build/platforms.json"));
  } catch (e) {
    fail(`platforms.json invalide : ${e.message}`);
  }

  const { site, platforms } = data;
  if (!site || !site.url || !site.outDir)
    fail('platforms.json : "site.url" et "site.outDir" sont obligatoires.');
  if (!Array.isArray(platforms) || platforms.length === 0)
    fail('platforms.json : "platforms" est vide.');
  site.url = site.url.replace(/\/+$/, "");

  const seen = new Set();
  for (const p of platforms) {
    const id = p.slug || "?";
    for (const k of [
      "slug",
      "name",
      "label",
      "title",
      "description",
      "h1",
      "h1Accent",
      "intro",
      "card",
    ]) {
      if (!p[k]) fail(`[${id}] champ obligatoire manquant : "${k}"`);
    }
    for (const k of ["steps", "faq"]) {
      if (!Array.isArray(p[k]) || p[k].length === 0)
        fail(`[${id}] "${k}" doit être une liste non vide.`);
    }
    if (!Array.isArray(p.sections)) p.sections = [];
    if (!Array.isArray(p.related)) p.related = [];
    if (!/^[a-z0-9-]+$/.test(p.slug))
      fail(
        `[${id}] slug invalide (minuscules, chiffres et tirets uniquement).`,
      );
    if (seen.has(p.slug)) fail(`Slug en double : ${p.slug}`);
    seen.add(p.slug);

    if (p.title.length > 60)
      warn(`[${id}] title trop long (${p.title.length} car., cible 50-60).`);
    if (p.description.length < 120 || p.description.length > 160)
      warn(
        `[${id}] meta description : ${p.description.length} car. (cible 120-160).`,
      );
    if (p.steps.length !== 3)
      warn(
        `[${id}] ${p.steps.length} étapes : la grille du site est prévue pour 3.`,
      );

    // NEW
    p.stepsTitle = p.stepsTitle || `Comment télécharger une vidéo ${p.name}`;
    p.stepsAccent = p.stepsAccent || "en 3 étapes.";
    p.stepsSub =
      p.stepsSub ||
      "Aucun compte ni application à installer : tout se passe dans ton navigateur.";
  }
  return data;
}

/* ─── Blocs repérés dans index.html ───────────────────────────── */
function extractBlock(html, name) {
  const re = new RegExp(
    `<!--\\s*build:${name}:start\\s*-->([\\s\\S]*?)<!--\\s*build:${name}:end\\s*-->`,
  );
  const m = html.match(re);
  return m ? m[1] : null;
}
// Retire les commentaires de repérage et rend les chemins valables depuis un sous-dossier.
const cleanMarkers = (h) =>
  h.replace(/[ \t]*<!--\s*build:[\w-]+:(?:start|end)\s*-->[ \t]*\n?/g, "");
const absolutize = (h) =>
  h.replace(/\b(href|src)="\.\//g, '$1="/').replace(/\bhref="#/g, 'href="/#');

function updatePlatformsZone(html, platforms, base) {
  const re =
    /([ \t]*)<!--\s*build:platforms:start\s*-->[\s\S]*?<!--\s*build:platforms:end\s*-->/;
  const m = html.match(re);
  if (!m) {
    warn(
      'Zone "build:platforms" absente de index.html : les liens du footer ne sont pas générés.',
    );
    return html;
  }
  const indent = m[1];
  const links = platforms
    .map(
      (p) =>
        `${indent}<a href="${base}/${p.slug}/" data-i18n="p.${p.slug}.label">${escapeHtml(p.label)}</a>`,
    )
    .join("\n");
  return html.replace(
    re,
    () =>
      `${indent}<!-- build:platforms:start -->\n${links}\n${indent}<!-- build:platforms:end -->`,
  );
}

/* ─── Fragments HTML d'une page ───────────────────────────────── */
function buildFragments(p, site, byslug) {
  const base = `/${site.outDir}`;
  const url = `${site.url}${base}/${p.slug}/`;

  const K = (s) => `p.${p.slug}.${s}`;

  const steps = p.steps
    .map(
      (s, i) =>
        `<div class="step"><span class="step-num">${String(i + 1).padStart(2, "0")}</span>
                    <h3 class="step-title" data-i18n="${K(`steps.${i}.title`)}">${escapeHtml(s.title)}</h3>
                    <div class="step-desc" data-i18n="${K(`steps.${i}.text`)}">${escapeHtml(s.text)}</div>
                </div>`,
    )
    .join("\n                ");

  const sections = p.sections
    .map(
      (s, i) =>
        `<section class="section">
        <div class="section-inner">
            <h2 class="sec-title prose-title reveal" data-i18n="${K(`sections.${i}.title`)}">${escapeHtml(s.title)}</h2>
            <div class="prose reveal" data-i18n-html="${K(`sections.${i}.html`)}">
                ${s.html}
            </div>
        </div>
    </section>`,
    )
    .join("\n\n    ");

  const faq = p.faq
    .map(
      (f, i) =>
        `<details class="faq-item">
                        <summary data-i18n="${K(`faq.${i}.q`)}">${escapeHtml(f.q)}</summary>
                        <p data-i18n="${K(`faq.${i}.a`)}">${escapeHtml(f.a)}</p>
                    </details>`,
    )
    .join("\n                    ");

  const relatedItems = p.related
    .filter((slug) => {
      if (!byslug[slug]) {
        warn(`[${p.slug}] page liée "${slug}" inexistante : ignorée.`);
        return false;
      }
      return slug !== p.slug;
    })
    .map((slug) => byslug[slug]);

  const related =
    relatedItems.length === 0
      ? ""
      : `<section class="section" id="autres-sites">
        <div class="section-inner">
            <div class="sec-head reveal">
                <div>
                    <div class="sec-label" data-i18n="pg.otherLabel">Autres sites</div>
                    <h2 class="sec-title"><span class="hl-1" data-i18n="pg.otherT1">Télécharger depuis</span><span class="hl-2" data-i18n="pg.otherT2">d'autres sites.</span></h2>
                </div>
            </div>
            <div class="feat-grid reveal">
                ${relatedItems
                  .map(
                    (r) =>
                      `<div class="feat-card">
                    <h3 class="feat-title"><a href="${base}/${r.slug}/" data-i18n="p.${r.slug}.label">${escapeHtml(r.label)}</a></h3>
                    <p class="feat-desc" data-i18n="p.${r.slug}.card">${escapeHtml(r.card)}</p>
                </div>`,
                  )
                  .join("\n                ")}
            </div>
        </div>
    </section>`;

  const jsonld = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: p.title,
          description: p.description,
          inLanguage: "fr",
          isPartOf: { "@id": `${site.url}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${site.url}/`,
            },
            { "@type": "ListItem", position: 2, name: p.label, item: url },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: p.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    },
    null,
    2,
  ).replace(/</g, "\\u003c");

  const words =
    countWords(p.intro) +
    p.steps.reduce((n, s) => n + countWords(s.title + " " + s.text), 0) +
    p.sections.reduce((n, s) => n + countWords(s.title + " " + s.html), 0) +
    p.faq.reduce((n, f) => n + countWords(f.q + " " + f.a), 0);

  return { url, steps, sections, faq, related, jsonld, words };
}

/* ─── Rendu ───────────────────────────────────────────────────── */
function render(tpl, ctx, blocks) {
  let out = tpl.replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => {
    if (!(k in ctx)) warn(`variable inconnue dans le gabarit : {{{${k}}}}`);
    return ctx[k] ?? "";
  });
  out = out.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in ctx)) warn(`variable inconnue dans le gabarit : {{${k}}}`);
    return escapeHtml(ctx[k] ?? "");
  });
  out = out.replace(/\{\{block:([\w-]+)\}\}/g, (_, n) => {
    if (!(n in blocks)) {
      warn(`bloc inconnu dans le gabarit : ${n}`);
      return "";
    }
    return blocks[n];
  });
  return out;
}

/* ─── Nettoyage des pages supprimées du JSON ──────────────────── */
function cleanStale(outRoot, slugs) {
  if (!fs.existsSync(outRoot)) return;
  for (const entry of fs.readdirSync(outRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || slugs.has(entry.name)) continue;
    const f = path.join(outRoot, entry.name, "index.html");
    if (
      fs.existsSync(f) &&
      fs.readFileSync(f, "utf8").includes(GENERATED_MARK)
    ) {
      if (!DRY) fs.rmSync(path.dirname(f), { recursive: true, force: true });
      console.log(`  - supprimé (absent de platforms.json) : ${entry.name}/`);
    }
  }
}

/* ─── Sitemap ─────────────────────────────────────────────────── */
function buildSitemap(site, platforms, outRoot) {
  const entries = [];
  const add = (loc, file) => {
    if (!fs.existsSync(file)) {
      warn(`sitemap : fichier absent, ignoré : ${path.relative(ROOT, file)}`);
      return;
    }
    entries.push({
      loc,
      lastmod: fs.statSync(file).mtime.toISOString().slice(0, 10),
    });
  };
  add(`${site.url}/`, INDEX);
  for (const p of platforms)
    add(
      `${site.url}/${site.outDir}/${p.slug}/`,
      path.join(outRoot, p.slug, "index.html"),
    );
  for (const f of site.staticPages || [])
    add(`${site.url}/${f}`, path.join(ROOT, f));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
  if (writeIfChanged(SITEMAP, xml)) console.log("  ✓ sitemap.xml mis à jour");
  else console.log("  = sitemap.xml inchangé");
}

/* ─── Traductions ─────────────────────────────────────────────── */
function collectStrings(platforms) {
  const o = { ...COMMON_FR };
  for (const p of platforms) {
    const K = (s) => `p.${p.slug}.${s}`;
    o[K("title")] = p.title;
    o[K("label")] = p.label;
    o[K("card")] = p.card;
    o[K("h1")] = p.h1;
    o[K("h1Accent")] = p.h1Accent;
    o[K("intro")] = p.intro;
    if (p.placeholder) o[K("placeholder")] = p.placeholder;
    o[K("stepsTitle")] = p.stepsTitle;
    o[K("stepsAccent")] = p.stepsAccent;
    o[K("stepsSub")] = p.stepsSub;
    p.steps.forEach((s, i) => {
      o[K(`steps.${i}.title`)] = s.title;
      o[K(`steps.${i}.text`)] = s.text;
    });
    p.sections.forEach((s, i) => {
      o[K(`sections.${i}.title`)] = s.title;
      o[K(`sections.${i}.html`)] = s.html;
    });
    p.faq.forEach((f, i) => {
      o[K(`faq.${i}.q`)] = f.q;
      o[K(`faq.${i}.a`)] = f.a;
    });
  }
  return o;
}

function syncTranslations(strings) {
  let store = {};
  if (fs.existsSync(I18N_FILE)) {
    try {
      store = JSON.parse(readFile(I18N_FILE));
    } catch (e) {
      fail(`platforms.i18n.json invalide : ${e.message}`);
    }
  }
  const others = LANGS.filter((l) => l !== "fr");
  const next = { _readme: I18N_README };
  const missing = Object.fromEntries(others.map((l) => [l, 0]));
  let outdated = 0;

  for (const [key, fr] of Object.entries(strings)) {
    const old = store[key] || {};
    const e = { fr };
    for (const l of others) {
      e[l] = typeof old[l] === "string" ? old[l] : "";
      if (!e[l]) missing[l]++;
    }
    const filled = others.filter((l) => e[l]);
    if (old.fr !== undefined && old.fr !== fr && filled.length)
      e.outdated = filled; // le français a changé : traduction à revoir
    else if (Array.isArray(old.outdated) && old.outdated.length)
      e.outdated = old.outdated;
    if (e.outdated) outdated++;
    next[key] = e;
  }

  // clés disparues de platforms.json : retirées automatiquement
  const orphans = Object.keys(store).filter(
    (k) => !k.startsWith("_") && !(k in strings),
  ).length;

  // Sortie JS consommée par i18n.js (valeurs non vides uniquement)
  const out = Object.fromEntries(LANGS.map((l) => [l, {}]));
  for (const [key, e] of Object.entries(next)) {
    if (key.startsWith("_")) continue;
    for (const l of LANGS) if (e[l]) out[l][key] = e[l];
  }
  const js =
    "// Fichier généré par _build/build-pages.js : ne pas modifier à la main.\n" +
    "// Source : _build/platforms.i18n.json\n" +
    `export const PLATFORM_TR = ${JSON.stringify(out, null, 2)};\n`;

  const a = writeIfChanged(I18N_FILE, JSON.stringify(next, null, 2) + "\n");
  const b = writeIfChanged(I18N_OUT, js);
  console.log(
    `Traductions : ${Object.keys(strings).length} clés · ` +
      others.map((l) => `${l} manquantes ${missing[l]}`).join(" · "),
  );
  if (a) console.log("  ✓ _build/platforms.i18n.json mis à jour");
  if (b) console.log("  ✓ scripts/i18n-platforms.js mis à jour");
  if (outdated)
    warn(`${outdated} clé(s) dont le français a changé (voir "outdated").`);
  if (orphans) console.log(`  - ${orphans} clé(s) obsolète(s) retirée(s)`);
}

/* ─── Programme principal ─────────────────────────────────────── */
function main() {
  console.log(DRY ? "\n[SIMULATION : rien n'est écrit]\n" : "");
  const { site, platforms } = loadData();
  const base = `/${site.outDir}`;
  const outRoot = path.join(ROOT, site.outDir);
  const byslug = Object.fromEntries(platforms.map((p) => [p.slug, p]));

  // 1. index.html : mise à jour de la zone des liens du footer
  const rawIndex = readFile(INDEX, "index.html");
  const eol = rawIndex.includes("\r\n") ? "\r\n" : "\n";
  const html = norm(rawIndex);
  const updatedIndex = updatePlatformsZone(html, platforms, base);
  if (updatedIndex !== html) {
    if (!DRY) fs.writeFileSync(INDEX, updatedIndex.replace(/\n/g, eol), "utf8");
    console.log("  ✓ index.html : liens du footer mis à jour");
  }

  // 2. Extraction des blocs communs
  const common = {};
  const missing = [];
  for (const name of BLOCKS) {
    const b = extractBlock(updatedIndex, name);
    if (b === null) missing.push(name);
    else common[name] = absolutize(cleanMarkers(b)).trim();
  }
  if (missing.length) {
    fail(
      "Repères manquants dans index.html : " +
        missing
          .map((n) => `<!-- build:${n}:start --> ... <!-- build:${n}:end -->`)
          .join("  |  "),
    );
  }

  const template = norm(readFile(TEMPLATE, "_build/platform.template.html"));

  // 3. Génération page par page
  console.log("Pages :");
  const rows = [];
  for (const p of platforms) {
    const f = buildFragments(p, site, byslug);

    let widget = common.widget;
    if (p.placeholder) {
      const before = widget;
      widget = widget
        .replace(
          /data-i18n-placeholder="hero\.placeholder"/,
          `data-i18n-placeholder="p.${p.slug}.placeholder"`,
        )
        .replace(
          /placeholder="Colle le lien de la vidéo…"/,
          `placeholder="${escapeHtml(p.placeholder)}"`,
        );
      if (before === widget)
        warn(
          `[${p.slug}] placeholder du champ lien introuvable dans le bloc widget.`,
        );
    }

    const ctx = {
      generated: GENERATED_MARK,
      title: p.title,
      description: p.description,
      canonical: f.url,
      ogImage: site.ogImage || `${site.url}/og-image.png`,
      name: p.name,
      label: p.label,
      h1: p.h1,
      h1Accent: p.h1Accent,
      intro: p.intro,
      stepsTitle: p.stepsTitle,
      stepsAccent: p.stepsAccent,
      stepsSub: p.stepsSub,
      kTitle: `p.${p.slug}.title`,
      kLabel: `p.${p.slug}.label`,
      kH1: `p.${p.slug}.h1`,
      kH1Accent: `p.${p.slug}.h1Accent`,
      kIntro: `p.${p.slug}.intro`,
      kStepsTitle: `p.${p.slug}.stepsTitle`,
      kStepsAccent: `p.${p.slug}.stepsAccent`,
      kStepsSub: `p.${p.slug}.stepsSub`,
      jsonld: f.jsonld,
      steps: f.steps,
      sections: f.sections,
      faq: f.faq,
      related: f.related,
    };

    const page = render(template, ctx, { ...common, widget });
    const missingIds = REQUIRED_IDS.filter(
      (id) => !page.includes(`id="${id}"`),
    );
    if (missingIds.length)
      warn(
        `[${p.slug}] IDs absents (le JS risque de planter) : ${missingIds.join(", ")}`,
      );
    if (/\{\{/.test(page))
      warn(`[${p.slug}] il reste des {{...}} non remplacés dans la page.`);
    if (f.words < 350)
      warn(
        `[${p.slug}] seulement ${f.words} mots de contenu propre (cible : 350+).`,
      );

    const file = path.join(outRoot, p.slug, "index.html");
    const changed = writeIfChanged(file, page);
    rows.push(
      `  ${changed ? "✓" : "="} ${base}/${p.slug}/   title ${p.title.length} car. · meta ${p.description.length} car. · ${f.words} mots`,
    );
  }
  console.log(rows.join("\n"));

  // 4. Traductions
  syncTranslations(collectStrings(platforms));

  // 5. Nettoyage + sitemap
  cleanStale(outRoot, new Set(platforms.map((p) => p.slug)));
  console.log("Sitemap :");
  if (DRY) console.log("  (ignoré en simulation)");
  else buildSitemap(site, platforms, outRoot);

  console.log(
    `\nTerminé : ${platforms.length} page(s), ${warnings.length} avertissement(s).\n`,
  );
}

main();
