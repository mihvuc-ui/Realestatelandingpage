# 🏷️ META TAGS REFERENCE - NEKRETNINE STEPENIK

Kompletna referenca svih meta tagova implementiranih na sajtu.

---

## 📱 VIEWPORT & BASIC

```html
<!-- Viewport - Responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

<!-- Character encoding -->
<meta charset="UTF-8" />
```

**Implementirano u:** `/src/app/components/SEO.tsx`

---

## 🔍 SEARCH ENGINE META TAGS

### Title & Description
```html
<!-- Page Title (50-60 karaktera) -->
<title>Nekretnine u Beogradu – Prodaja i Izdavanje Stanova | Nekretnine Stepenik</title>

<!-- Meta Description (150-160 karaktera) -->
<meta name="description" content="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova, kuće na prodaju. Preko 150 uspešno završenih poslova." />

<!-- Keywords (10-15 keywords) -->
<meta name="keywords" content="nekretnine Beograd, prodaja stanova Beograd, izdavanje stanova Beograd, stan na prodaju, agencija za nekretnine Beograd" />
```

---

### Robots & Crawling
```html
<!-- Robots - Kontrola indexing-a -->
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<!-- Googlebot specific -->
<meta name="googlebot" content="index, follow" />

<!-- Canonical URL - Sprečava duplicate content -->
<link rel="canonical" href="https://nekretnine-stepenik.rs/" />
```

**Opcije za robots:**
- `index` - Dozvoljava indexing
- `noindex` - Blokira indexing
- `follow` - Prati linkove
- `nofollow` - Ne prati linkove
- `max-snippet:-1` - Bez limita za snippet
- `max-image-preview:large` - Large image preview u rezultatima

---

### Google Site Verification
```html
<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="google127f4562652b22dd" />
```

**⚠️ ACTION:** Zameni `google127f4562652b22dd` sa pravim kodom od Google-a!

**Kako dobiti kod:**
1. Idi na https://search.google.com/search-console
2. Add Property → HTML tag metod
3. Kopiraj verification code

---

### Author & Publisher
```html
<!-- Author -->
<meta name="author" content="Nekretnine Stepenik" />

<!-- Publisher (opciono) -->
<link rel="publisher" href="https://plus.google.com/+NekretnineStepenikBeograd" />
```

---

## 🌍 GEO LOCATION META TAGS

```html
<!-- Geographic region (ISO 3166-1) -->
<meta name="geo.region" content="RS-00" />

<!-- City/Place name -->
<meta name="geo.placename" content="Beograd" />

<!-- Coordinates (latitude;longitude) -->
<meta name="geo.position" content="44.787197;20.457273" />

<!-- Alternative coordinate format (ICBM) -->
<meta name="ICBM" content="44.787197, 20.457273" />
```

**Beograd koordinate:**
- Latitude: 44.787197
- Longitude: 20.457273

---

## 🌐 MULTI-LANGUAGE (HREFLANG)

```html
<!-- Language alternatives -->
<link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/" />
<link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/" />
<link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/" />
<link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/" />

<!-- Default language (fallback) -->
<link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/" />
```

**Language codes:**
- `sr` - Serbian (Srpski)
- `en` - English (Engleski)
- `ru` - Russian (Ruski)
- `tr` - Turkish (Turski)
- `x-default` - Fallback za sve ostale

---

## 📱 OPEN GRAPH (Facebook, LinkedIn, WhatsApp)

```html
<!-- Basic OG tags -->
<meta property="og:title" content="Nekretnine u Beogradu – Prodaja i Izdavanje Stanova | Nekretnine Stepenik" />
<meta property="og:description" content="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://nekretnine-stepenik.rs/" />

<!-- Image (1200x630px recommended) -->
<meta property="og:image" content="https://nekretnine-stepenik.rs/og-default.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Locale & Alternatives -->
<meta property="og:locale" content="sr_RS" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:locale:alternate" content="ru_RU" />
<meta property="og:locale:alternate" content="tr_TR" />

<!-- Site Info -->
<meta property="og:site_name" content="Nekretnine Stepenik" />
```

**OG Image Specs:**
- Dimenzije: **1200x630px** (Facebook recommended)
- Format: JPG ili PNG
- Max veličina: 8MB
- Aspect ratio: 1.91:1

**OG Types:**
- `website` - Obična web stranica (default)
- `article` - Blog članak
- `product` - Proizvod (nekretnina)
- `profile` - Profil kompanije/osobe

---

## 🐦 TWITTER CARD

```html
<!-- Twitter Card Type -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Content -->
<meta name="twitter:title" content="Nekretnine u Beogradu – Prodaja i Izdavanje Stanova | Nekretnine Stepenik" />
<meta name="twitter:description" content="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova." />
<meta name="twitter:image" content="https://nekretnine-stepenik.rs/og-default.jpg" />

<!-- Account Info -->
<meta name="twitter:site" content="@NekretnineStepe" />
<meta name="twitter:creator" content="@NekretnineStepe" />
```

**Twitter Card Types:**
- `summary` - Mali thumbnail (default)
- `summary_large_image` - Large image (preporučeno)
- `app` - Mobile app
- `player` - Video/Audio player

**Twitter Image Specs:**
- Dimenzije: **1200x675px** (large card) ili **120x120px** (summary)
- Format: JPG, PNG, WEBP, GIF
- Max veličina: 5MB

---

## 📊 JSON-LD STRUCTURED DATA (Schema.org)

Umesto meta tagova, Schema.org koristi JSON-LD format:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nekretnine Stepenik",
  "url": "https://nekretnine-stepenik.rs",
  "telephone": "+38162671155",
  "email": "agencijastepenik@gmail.com"
}
</script>
```

**Implementirano u:** `/src/app/components/SchemaMarkup.tsx`

**Schema tipovi implementirani:**
- ✅ RealEstateAgent (Organization)
- ✅ LocalBusiness
- ✅ WebSite (search box)
- ✅ FAQ
- ✅ Breadcrumb
- ✅ ItemList (properties)
- ✅ Apartment (individual property)

---

## 🎨 THEME & APPEARANCE

```html
<!-- Theme color (browser UI color) -->
<meta name="theme-color" content="#9333ea" />

<!-- MS Tile Color (Windows) -->
<meta name="msapplication-TileColor" content="#9333ea" />

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

**Boje:**
- Primary: `#9333ea` (Fuchsia/Purple)
- Dark mode: `#1e293b` (Slate)

---

## 🔒 SECURITY & PRIVACY

```html
<!-- Referrer Policy -->
<meta name="referrer" content="no-referrer-when-downgrade" />

<!-- HTTP Security Headers (set na server-u, ne meta tags) -->
<!-- Ovi nisu meta tags već HTTP headers: -->
<!-- Content-Security-Policy -->
<!-- Strict-Transport-Security (HSTS) -->
<!-- X-Frame-Options -->
<!-- X-Content-Type-Options -->
```

---

## 📄 CONTENT TYPE & LANGUAGE

```html
<!-- Content Language -->
<meta http-equiv="content-language" content="sr" />

<!-- Content Type -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
```

---

## 🚫 DEPRECATED / AVOID

**Ove meta tagove NE koristiti:**

```html
<!-- DEPRECATED - Google ignoriše od 2009 -->
<meta name="keywords" content="..." />

<!-- DEPRECATED - Nema efekta -->
<meta name="revisit-after" content="7 days" />

<!-- DEPRECATED - Ne radi -->
<meta http-equiv="refresh" content="30" />
```

---

## 📋 META TAGS PO STRANICAMA

### Homepage (`/`)
```typescript
<SEO
  title="Nekretnine u Beogradu – Prodaja i Izdavanje Stanova"
  description="Agencija za nekretnine Stepenik Beograd. Prodaja stanova, iznajmljivanje stanova, kuće na prodaju."
  keywords="nekretnine Beograd, prodaja stanova Beograd, izdavanje stanova Beograd"
  canonical="/"
/>
```

### Browse/Prodaja (`/browse`)
```typescript
<SEO
  title="Prodaja Nekretnina u Beogradu – Stanovi na Prodaju"
  description="Pregledajte kompletnu ponudu nekretnina za prodaju u Beogradu."
  keywords="stanovi na prodaju Beograd, nekretnine prodaja Beograd"
  canonical="/browse"
/>
```

### O Nama (`/about`)
```typescript
<SEO
  title="O Nama – Agencija za Nekretnine Stepenik"
  description="Upoznajte tim Nekretnine Stepenik. Preko 150 uspešno završenih poslova."
  keywords="agencija za nekretnine Beograd, o nama"
  canonical="/about"
/>
```

### Kontakt (`/contact`)
```typescript
<SEO
  title="Kontakt – Nekretnine Stepenik Beograd"
  description="Kontaktirajte nas: +381 62 671 155 | agencijastepenik@gmail.com"
  keywords="kontakt, nekretnine stepenik telefon"
  canonical="/contact"
/>
```

---

## 🛠️ TESTING TOOLS

### Validacija Meta Tagova:
1. **Open Graph Debugger**
   - Facebook: https://developers.facebook.com/tools/debug/
   - LinkedIn: https://www.linkedin.com/post-inspector/

2. **Twitter Card Validator**
   - https://cards-dev.twitter.com/validator

3. **Rich Results Test**
   - https://search.google.com/test/rich-results

4. **Meta Tags Analyzer**
   - https://metatags.io/

---

## 📝 BEST PRACTICES

### Title Tag:
- ✅ **50-60 karaktera**
- ✅ Uključi primary keyword na početku
- ✅ Brand name na kraju
- ✅ Unique za svaku stranicu
- ❌ Nemoj keyword stuffing

**Formula:** `[Primary Keyword] – [Secondary Keyword] | [Brand]`

---

### Meta Description:
- ✅ **150-160 karaktera**
- ✅ Uključi call-to-action
- ✅ Unique za svaku stranicu
- ✅ Prirodan jezik (ne samo keywords)
- ❌ Nemoj duplirati title

**Formula:** `[Benefit] + [Feature] + [Call-to-Action]`

---

### Keywords:
- ✅ **10-15 keywords max**
- ✅ Relevantni za stranicu
- ✅ Odvojeni zarezima
- ✅ Mix short-tail i long-tail
- ❌ Google ih ignoriše ali Bing koristi

---

### OG Image:
- ✅ **1200x630px** (Facebook optimal)
- ✅ Text readable (min 40px font)
- ✅ Brand logo visible
- ✅ High contrast
- ✅ < 8MB file size

---

## 🎯 ACTION ITEMS

### Immediately:
- [ ] Zameni Google verification code sa pravim
- [ ] Kreiraj custom OG image (1200x630px)
- [ ] Dodaj Twitter account (@NekretnineStepe)

### This Week:
- [ ] Test sve meta tagove sa validation tools
- [ ] Dodaj alt texts za sve slike
- [ ] Optimizuj title/description za svaku stranicu

### This Month:
- [ ] A/B test različite meta descriptions
- [ ] Monitor CTR u Google Search Console
- [ ] Optimizuj na osnovu rezultata

---

**🎉 KOMPLETNO!**

Sve meta tagove su implementirani i optimizovani. Sad samo treba testirati i fine-tune na osnovu rezultata! 🚀

---

*Last updated: 2026-03-31*
