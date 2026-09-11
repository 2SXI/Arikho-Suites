// Arikho Suites — shared site behaviour (multi-page)

function toggleMenu() {
  document.getElementById('mobMenu').classList.toggle('open');
  document.querySelector('.burger').classList.toggle('open');
}

// ── HERO SLIDESHOW (home page only) ─────────────────────────
function initHero(images) {
  const wrap = document.getElementById('heroSlides');
  const dots = document.getElementById('heroDots');
  if (!wrap || !images || !images.length) return;
  let idx = 0;
  images.forEach((src, i) => {
    const s = document.createElement('div');
    s.className = 'hero-slide' + (i === 0 ? ' on' : '');
    s.style.backgroundImage = `url('${src}')`;
    wrap.appendChild(s);
    const d = document.createElement('div');
    d.className = 'hero-dot' + (i === 0 ? ' on' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.onclick = () => setSlide(i);
    dots.appendChild(d);
  });
  function setSlide(n) {
    document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('on', i === n));
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('on', i === n));
    idx = n;
  }
  setInterval(() => setSlide((idx + 1) % images.length), 5500);
  let tx = 0;
  wrap.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) setSlide(dx < 0 ? (idx + 1) % images.length : (idx - 1 + images.length) % images.length);
  }, { passive: true });
}

// ── SCROLL REVEAL ────────────────────────────────────────────
function initReveals() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.vis)').forEach(el => obs.observe(el));
}

// ── NAVBAR SCROLL STATE ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('solid', window.scrollY > 50);
}, { passive: true });

// ── GALLERY FILTER + LIGHTBOX (gallery page) ─────────────────
let lbImages = [], lbIdx = 0, galFilter = 'all';

function renderGallery(GALLERY) {
  const grid = document.getElementById('galGrid');
  if (!grid) return;
  const items = galFilter === 'all' ? GALLERY : GALLERY.filter(g => g.cat === galFilter);
  grid.innerHTML = items.map((g, i) => `
    <div class="masonry-item" onclick="lbOpen(${i}, '${galFilter}', GALLERY)">
      <div class="img-wrap"><img src="${g.src}" alt="${g.alt}" loading="lazy">
        <div class="img-brand"><span class="img-brand-txt">Arikho Suites</span></div>
      </div>
    </div>`).join('');
}

function renderGalFilters(GALLERY) {
  const el = document.getElementById('galFilters');
  if (!el || el.dataset.done) return;
  el.dataset.done = '1';
  ['all','bedroom','kitchen','dining','bathroom','exterior'].forEach(cat => {
    const b = document.createElement('button');
    b.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    b.setAttribute('aria-pressed', cat === 'all' ? 'true' : 'false');
    const setStyle = () => {
      const active = galFilter === cat;
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
      b.style.cssText = `
        font-family:var(--sans);font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
        padding:.48rem 1.1rem;border-radius:50px;cursor:pointer;border:1.5px solid;transition:all .2s;
        background:${active ? 'var(--plum)' : 'transparent'};
        color:${active ? 'var(--white)' : 'var(--stone)'};
        border-color:${active ? 'var(--plum)' : 'var(--stone-light)'};
      `;
    };
    setStyle();
    b.onclick = () => {
      galFilter = cat;
      renderGallery(GALLERY);
      document.querySelectorAll('#galFilters button').forEach(x => x._s && x._s());
    };
    b._s = setStyle;
    el.appendChild(b);
  });
}

function lbOpen(i, filter, GALLERY) {
  lbImages = filter === 'all' ? GALLERY : GALLERY.filter(g => g.cat === filter);
  lbIdx = i; lbShow();
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function lbShow() {
  document.getElementById('lbImg').src = lbImages[lbIdx].src;
  document.getElementById('lbImg').alt = lbImages[lbIdx].alt;
  document.getElementById('lbCap').textContent = `${lbImages[lbIdx].alt} \u00b7 ${lbIdx + 1} / ${lbImages.length}`;
}
function lbNav(d) { lbIdx = (lbIdx + d + lbImages.length) % lbImages.length; lbShow(); }
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
  if (e.key === 'Escape') { lb.classList.remove('open'); document.body.style.overflow = ''; }
});
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lb');
  if (!lb) return;
  let lbTx = 0;
  lb.addEventListener('touchstart', e => { lbTx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - lbTx;
    if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
  }, { passive: true });
});

document.addEventListener('DOMContentLoaded', initReveals);
