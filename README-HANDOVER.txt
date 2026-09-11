ARIKHO SUITES — MULTI-PAGE SEO REBUILD
========================================

WHAT'S HERE
- index.html, rooms.html, gallery.html, about.html, contact.html
- rooms/standard-room.html, king-ensuite.html, deluxe-room.html, twin-room.html, full-apartment.html
- css/style.css, js/main.js
- sitemap.xml, robots.txt (domain assumed: https://arikhosuites.co.zw — update if wrong)

TO GO LIVE, YOU STILL NEED TO ADD
1. /images/ folder — same filenames as the old single-page site (standard-1.jpeg, king-1.jpeg,
   Arikho_trans.png, reception.png, etc.) — not included here since they weren't in the upload.
2. Favicon set at site root: favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png
   (referenced in every page's <head> but not generated — you'll need real brand icon exports).
3. Real Facebook/Instagram URLs — placeholders (facebook.com/arikhosuites, instagram.com/arikhosuites)
   are in the footer sameAs/schema; swap for the real profiles if different.

WHAT CHANGED FROM THE OLD BUILD
- No more hash-based JS router — every page is a real .html file with its own URL, title,
  meta description, canonical, Open Graph/Twitter tags, and JSON-LD schema (LodgingBusiness,
  Service, Product per room, AboutPage, ContactPage, ImageGallery).
- All internal links are real hrefs (no href="#").
- Nav, footer, lightbox and gallery filters still work via shared js/main.js — same visual
  design and behaviour as before, just multi-page.
- Added accessibility: aria-label on nav/icon buttons, role="list" on nav lists, breadcrumbs
  on every inner page, :focus-visible outline, prefers-reduced-motion support.
- Added geo tags, ICBM, theme-color, preconnect + preload for fonts/hero image.

DELIVERY CHECKLIST STATUS
✅ Unique title/description/canonical per page      ✅ No href="#" links
✅ Sitemap lists only real .html URLs                ✅ robots.txt references sitemap
✅ JSON-LD schema on every page                      ✅ Internal links between all pages
✅ Mobile responsive (inherited from original CSS)   ✅ WhatsApp CTAs on every page
⚠️  Favicons — not generated, see above
⚠️  Image width/height on hero images — not set (dimensions unknown; add once real images
    are in place, to fully eliminate layout shift)
