// ─────────────────────────────────────────────────────────────────
// scripts/app.js — effets purement visuels, sans logique métier :
// révélation au scroll (.reveal) et parallax du décor flottant.
// ─────────────────────────────────────────────────────────────────

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollReveal() {
  if (REDUCED_MOTION) return; // la CSS affiche déjà tout sans animation dans ce cas

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in', entry.isIntersecting);
      });
    },
    { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

export function initParallax() {
  if (REDUCED_MOTION) return;

  const layer = document.getElementById('prlxLayer');
  if (!layer) return;

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      layer.style.transform = `translateY(${window.scrollY * -0.15}px)`;
    });
  }, { passive: true });
}