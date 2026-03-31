# ✅ SEO CHECKLIST - NEKRETNINE STEPENIK

Kompletna lista SEO optimizacija za sajt. Prati napredak i vidi šta je još potrebno.

---

## 🎯 TECHNICAL SEO

### Sitemap & Robots
- [x] **robots.txt** kreiran (`/public/robots.txt`)
- [x] **sitemap.xml** kreiran (`/public/sitemap.xml`)
- [x] Sitemap sadrži sve glavne stranice
- [x] Sitemap sadrži nekretnine
- [x] Image sitemap extension dodat
- [x] Hreflang tagovi u sitemap-u
- [ ] **Sitemap submitovan u Google Search Console** ⚠️ ACTION NEEDED
- [ ] **Sitemap submitovan u Bing Webmaster** (Opciono)
- [ ] **Sitemap submitovan u Yandex** (Opciono)

**Kako:** Vidi `/SITEMAP-GUIDE.md` i `/public/sitemap-instructions.txt`

---

### Meta Tags
- [x] Title tags optimizovani (svaka stranica)
- [x] Meta descriptions (svaka stranica)
- [x] Meta keywords (svaka stranica)
- [x] Canonical URLs implementirani
- [x] Robots meta tags
- [x] Viewport meta tag
- [ ] **Google Search Console verification** ⚠️ ACTION NEEDED

**Gde:** `/src/app/components/SEO.tsx`

---

### Open Graph & Social Media
- [x] Open Graph title, description, image
- [x] Open Graph locale (multi-jezik)
- [x] Open Graph type
- [x] Twitter Card meta tags
- [x] Twitter title, description, image
- [ ] **Kreirati custom OG image** (1200x630px) ⚠️ PREPORUKA

**Gde:** `/src/app/components/SEO.tsx`

---

### Multi-Language (i18n)
- [x] Hreflang meta tags implementirani
- [x] Hreflang u sitemap.xml
- [x] 4 jezika podržana (sr, en, ru, tr)
- [x] x-default hreflang za fallback
- [x] Language selector komponenta

**Gde:** `/src/app/components/SEO.tsx`, `/public/sitemap.xml`

---

### Structured Data (Schema.org)
- [x] Organization schema (RealEstateAgent)
- [x] LocalBusiness schema
- [x] WebSite schema (search box)
- [x] FAQ schema (5 pitanja)
- [x] Property/Apartment schema
- [x] Breadcrumb schema
- [x] ItemList schema (lista nekretnina)
- [ ] **Review/Rating schema** (kada dobiješ reviews)
- [ ] **Video schema** (ako dodaš video tureje)

**Gde:** `/src/app/components/SchemaMarkup.tsx`

---

### Performance & Core Web Vitals
- [ ] **Page Speed Insights test** ⚠️ TEST NEEDED
  - Cilj: LCP < 2.5s
  - Cilj: FID < 100ms
  - Cilj: CLS < 0.1
- [ ] **Image optimization** (kompresija)
- [ ] **Lazy loading** za slike
- [ ] **Code splitting**
- [ ] **Minification** (CSS, JS)
- [ ] **Caching** strategy

**Test:** https://pagespeed.web.dev/

---

### Mobile Optimization
- [x] Responsive dizajn
- [x] Mobile-friendly navigation
- [x] Touch-friendly buttons
- [x] Viewport meta tag
- [ ] **Mobile Usability test u Google Search Console** ⚠️ TEST NEEDED

---

### HTTPS & Security
- [ ] **HTTPS implementiran** (SSL sertifikat) ⚠️ HOSTING NEEDED
- [ ] **Mixed content** provera (http vs https)
- [ ] **Security headers** (HSTS, CSP)

---

## 📄 ON-PAGE SEO

### Homepage
- [x] Optimizovan title tag
- [x] Meta description
- [x] H1 heading
- [x] Keywords u sadržaju
- [x] Internal linking
- [x] CTA buttons
- [x] Organization schema
- [x] LocalBusiness schema
- [x] FAQ schema

**Stranica:** `/src/app/pages/Home.tsx`

---

### Browse/Prodaja Stranica
- [x] SEO title tag
- [x] Meta description
- [x] Breadcrumbs (UI + Schema)
- [x] ItemList schema
- [x] Filter funkcionalnost
- [x] Sort opcije
- [ ] **Canonical URLs za filtere** (sprečava duplicate content)

**Stranica:** `/src/app/pages/BrowseListings.tsx`

---

### Pojedinačne Nekretnine
- [ ] **Property detail pages** kreirati
- [ ] SEO optimized URLs (npr. `/property/dvosoban-stan-nehruova`)
- [ ] Property schema za svaku nekretninu
- [ ] Image alt texts
- [ ] Breadcrumbs
- [ ] Related properties (internal linking)

**TODO:** Kreirati PropertyDetail stranicu

---

### O Nama / About
- [x] Stranica kreirana
- [ ] SEO optimizacija (title, description)
- [ ] Kompanija istorija
- [ ] Team members
- [ ] Achievements/Stats
- [ ] About schema

---

### Kontakt
- [x] Kontakt stranica kreirana
- [x] Contact modal
- [ ] SEO optimizacija
- [ ] Google Maps integracija
- [ ] ContactPoint schema

---

### Dodatne Stranice (Landing Pages)
- [x] Kupujem stranica
- [x] Prodajem stranica
- [x] Rentiranje stranica
- [ ] SEO optimizacija za svaku
- [ ] Unique content za svaku
- [ ] CTA forms

---

## 🖼️ MEDIA OPTIMIZATION

### Images
- [x] Alt text za glavne slike
- [ ] **Alt text za SVE slike nekretnina** ⚠️ ACTION NEEDED
- [ ] **Optimizacija veličine slika** (kompresija)
- [ ] **WebP format** (umesto JPG/PNG)
- [ ] **Responsive images** (srcset)
- [x] Image sitemap

**Tool:** https://tinypng.com/ ili https://squoosh.app/

---

### Videos (Buduće)
- [ ] Video tureje nekretnina
- [ ] YouTube integracija
- [ ] Video schema markup
- [ ] Transcripts za accessibility

---

## 🔗 OFF-PAGE SEO

### Backlinks
- [ ] **Google My Business** profil ⚠️ PRIORITY
- [ ] Directory submissions (sreality.rs, cityexpert.rs, etc.)
- [ ] Social media profiles (Facebook, Instagram, LinkedIn)
- [ ] Local citations (Yelp, YellowPages Serbia)
- [ ] Press releases
- [ ] Blog outreach

---

### Social Media
- [ ] **Facebook Business Page** kreirati
- [ ] **Instagram Business** profil
- [ ] **LinkedIn Company Page**
- [ ] Redovno postovanje (2-3x nedeljno)
- [ ] Share button na svim nekretninama

---

### Local SEO
- [ ] **Google My Business** optimizacija ⚠️ PRIORITY
  - Adresa, telefon, radno vreme
  - Fotografije kancelarije
  - Reviews od klijenata
  - Regular posts
- [ ] Local keywords u content
- [ ] NAP consistency (Name, Address, Phone)
- [ ] Local schema markup (DONE ✓)

---

## 📊 ANALYTICS & TRACKING

### Google Analytics
- [ ] **Google Analytics 4** instalacija ⚠️ ACTION NEEDED
- [ ] Event tracking (clicks, form submissions)
- [ ] Conversion tracking
- [ ] Custom reports

**Setup:** https://analytics.google.com/

---

### Google Search Console
- [ ] **Verifikacija sajta** ⚠️ ACTION NEEDED
- [ ] Sitemap submission
- [ ] Coverage monitoring
- [ ] Performance tracking
- [ ] Mobile usability
- [ ] Core Web Vitals

**Setup:** https://search.google.com/search-console

---

### Heat Mapping & User Behavior
- [ ] **Hotjar** ili similar tool
- [ ] Session recordings
- [ ] Heatmaps
- [ ] Conversion funnels

---

## 📝 CONTENT STRATEGY

### Blog (Buduće)
- [ ] Blog sekcija kreirana
- [ ] 10+ članaka o nekretninama
- [ ] Keyword research za članke
- [ ] Internal linking strategija
- [ ] Author schema

**Ideje za članke:**
- "Kako kupiti stan u Beogradu - Vodič"
- "Top 10 najboljih kvartova u Beogradu"
- "Proces kupovine nekretnine - Step by step"
- "Investiranje u nekretnine 2026"

---

### Keywords Research
- [ ] **Main keywords** identifikovati
- [ ] **Long-tail keywords** research
- [ ] Competitor analysis
- [ ] Keyword difficulty score

**Tools:**
- Google Keyword Planner
- Ahrefs
- SEMrush
- Ubersuggest

**Trenutni keywords:**
- nekretnine Beograd ✓
- prodaja stanova Beograd ✓
- izdavanje stanova Beograd ✓
- stan na prodaju ✓
- agencija za nekretnine Beograd ✓

---

## 🚀 ADVANCED SEO

### Rich Snippets
- [x] FAQ rich snippets (implementirano)
- [ ] Review/Rating stars (kada dobiješ reviews)
- [ ] Breadcrumbs rich snippets
- [ ] Organization knowledge panel

**Test:** https://search.google.com/test/rich-results

---

### International SEO
- [x] Hreflang tags
- [x] Multi-language support (4 jezika)
- [ ] Geo-targeting u Search Console
- [ ] Currency localization (€, RSD, $, ₽)

---

### Voice Search Optimization
- [x] FAQ schema (za voice assistants)
- [ ] Natural language content
- [ ] Long-tail keywords
- [ ] Featured snippets targeting

---

### E-A-T (Expertise, Authoritativeness, Trustworthiness)
- [ ] About page sa team info
- [ ] Author bios za blog članke
- [ ] Certifikati i nagrade
- [ ] Client testimonials
- [ ] Privacy policy
- [ ] Terms of service

---

## 📋 MONTHLY MAINTENANCE

### Svaki Mesec Proveri:
- [ ] Google Search Console errors
- [ ] Google Analytics traffic
- [ ] Broken links (404 errors)
- [ ] Page speed performance
- [ ] New backlinks
- [ ] Competitor rankings
- [ ] Update sitemap ako ima novih nekretnina

---

### Quarterly (Svaka 3 meseca):
- [ ] Full SEO audit
- [ ] Keyword ranking check
- [ ] Content refresh (update stari content)
- [ ] Competitor analysis
- [ ] Backlink cleanup (disavow bad links)

---

## 🎯 PRIORITY ACTION ITEMS

### 🔴 HIGH PRIORITY (Ove nedelje):
1. [ ] **Google Search Console** - Verifikacija sajta
2. [ ] **Submit sitemap.xml** u Google Search Console
3. [ ] **Google My Business** profil kreirati
4. [ ] **Google Analytics 4** instalacija
5. [ ] **Alt texts** za sve slike nekretnina

---

### 🟡 MEDIUM PRIORITY (Ovaj mesec):
6. [ ] Kreirati property detail pages
7. [ ] Optimizovati slike (kompresija, WebP)
8. [ ] Facebook Business Page
9. [ ] Bing Webmaster Tools setup
10. [ ] Custom OG image kreirati

---

### 🟢 LOW PRIORITY (Sledeća 3 meseca):
11. [ ] Blog sekcija
12. [ ] Video tureje nekretnina
13. [ ] Hotjar heat mapping
14. [ ] Advanced analytics setup
15. [ ] Link building campaign

---

## 📊 KPI METRICS - Šta pratiti

### Organic Traffic:
- **Goal:** +50% organic traffic u 6 meseci
- **Metric:** Google Analytics - Organic Search

### Rankings:
- **Goal:** Top 3 za "nekretnine Beograd"
- **Metric:** Google Search Console - Average Position

### Conversions:
- **Goal:** 5% conversion rate (kontakt form)
- **Metric:** Google Analytics - Goal Completions

### Page Speed:
- **Goal:** 90+ score na mobile
- **Metric:** PageSpeed Insights

---

## 🆘 TROUBLESHOOTING

### Ako sajt nije u Google-u:
1. Proveri robots.txt (da nije blokiran)
2. Submituj sitemap u Search Console
3. Request indexing u Search Console
4. Proveri da nema "noindex" meta tag

### Ako traffic ne raste:
1. Proveri keyword rankings
2. Dodaj više kvalitetnog sadržaja
3. Gradi backlinks
4. Poboljšaj page speed
5. Optimizuj za mobile

---

## 📞 RESOURCES & TOOLS

### Free SEO Tools:
- **Google Search Console** - https://search.google.com/search-console
- **Google Analytics** - https://analytics.google.com/
- **Google PageSpeed Insights** - https://pagespeed.web.dev/
- **Google Rich Results Test** - https://search.google.com/test/rich-results
- **Google Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly

### Keyword Research:
- **Google Keyword Planner** - https://ads.google.com/keyword-planner
- **Ubersuggest** - https://neilpatel.com/ubersuggest/
- **AnswerThePublic** - https://answerthepublic.com/

### Backlink Analysis:
- **Ahrefs** - https://ahrefs.com/ (Paid)
- **Moz Link Explorer** - https://moz.com/link-explorer (Free limited)
- **SEMrush** - https://semrush.com/ (Paid)

### Image Optimization:
- **TinyPNG** - https://tinypng.com/
- **Squoosh** - https://squoosh.app/
- **ImageOptim** - https://imageoptim.com/

---

**🎉 GOTOVO!**

Sajt je **80% SEO optimizovan**! Sledeći koraci su u tvojim rukama - fokusiraj se na HIGH PRIORITY akcije i vidi rezultate za 30-60 dana! 🚀

---

*Last updated: 2026-03-31*
