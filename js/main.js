/* Arikho Suites — shared site behaviour (multi-page build) */

// ── MOBILE MENU ──────────────────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobMenu');
  const burger = document.querySelector('.burger');
  if (!menu || !burger) return;
  menu.classList.toggle('open');
  burger.classList.toggle('open');
  burger.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
}

// ── NAVBAR SCROLL STATE ──────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

// ── HERO SLIDESHOW (home page only) ──────────────────────
function initHero() {
  const wrap = document.getElementById('heroSlides');
  const dots = document.getElementById('heroDots');
  if (!wrap || !dots) return;
  const slides = Array.from(wrap.querySelectorAll('.hero-slide'));
  const dotEls = Array.from(dots.querySelectorAll('.hero-dot'));
  let idx = 0;
  function setSlide(n) {
    slides.forEach((s, i) => s.classList.toggle('on', i === n));
    dotEls.forEach((d, i) => d.classList.toggle('on', i === n));
    idx = n;
  }
  dotEls.forEach((d, i) => d.addEventListener('click', () => setSlide(i)));
  if (slides.length > 1) {
    setInterval(() => setSlide((idx + 1) % slides.length), 5500);
  }
  let tx = 0;
  wrap.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50 && slides.length > 1) {
      setSlide(dx < 0 ? (idx + 1) % slides.length : (idx - 1 + slides.length) % slides.length);
    }
  }, { passive: true });
}

// ── LIGHTBOX (gallery page) ──────────────────────────────
let lbImages = [];
let lbIdx = 0;

function lbCollect(filter) {
  const items = Array.from(document.querySelectorAll('.masonry-item'));
  const visible = filter && filter !== 'all'
    ? items.filter(el => el.dataset.cat === filter)
    : items;
  return visible.map(el => ({
    src: el.querySelector('img').getAttribute('src'),
    alt: el.querySelector('img').getAttribute('alt')
  }));
}

function lbOpenFromEl(el) {
  const grid = document.getElementById('galGrid');
  const activeFilter = grid ? grid.dataset.activeFilter || 'all' : 'all';
  lbImages = lbCollect(activeFilter);
  const visibleEls = Array.from(document.querySelectorAll('.masonry-item')).filter(e => e.style.display !== 'none');
  lbIdx = visibleEls.indexOf(el);
  if (lbIdx < 0) lbIdx = 0;
  lbShow();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function lbShow() {
  if (!lbImages.length) return;
  document.getElementById('lbImg').src = lbImages[lbIdx].src;
  document.getElementById('lbCap').textContent = `${lbImages[lbIdx].alt} · ${lbIdx + 1} / ${lbImages.length}`;
}
function lbNav(d) {
  if (!lbImages.length) return;
  lbIdx = (lbIdx + d + lbImages.length) % lbImages.length;
  lbShow();
}
function lbClose(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('lb').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lb');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'Escape') lbClose();
});

// ── GALLERY FILTERS (gallery page) ───────────────────────
function initGalleryFilters() {
  const filterBar = document.getElementById('galFilters');
  const grid = document.getElementById('galGrid');
  if (!filterBar || !grid) return;
  const buttons = Array.from(filterBar.querySelectorAll('button'));
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      grid.dataset.activeFilter = cat;
      buttons.forEach(b => b.classList.toggle('gal-filter-active', b === btn));
      document.querySelectorAll('.masonry-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
      });
    });
  });
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initGalleryFilters();

  const lb = document.getElementById('lb');
  if (lb) {
    let lbTx = 0;
    lb.addEventListener('touchstart', e => { lbTx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - lbTx;
      if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
});
