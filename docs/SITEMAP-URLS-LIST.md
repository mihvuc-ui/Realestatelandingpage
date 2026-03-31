# 🗺️ SITEMAP URL LISTA - NEKRETNINE STEPENIK

Kompletna lista svih URL-ova koji treba da budu u sitemap.xml fajlu.

---

## 📋 GLAVNE STRANICE (Static Pages)

### 1. **Homepage**
```
https://nekretnine-stepenik.rs/
```
- **Priority:** 1.0 (najviši)
- **Changefreq:** daily
- **Opis:** Glavna stranica sajta

---

### 2. **Browse/Prodaja Nekretnina**
```
https://nekretnine-stepenik.rs/browse
```
- **Priority:** 0.9
- **Changefreq:** daily
- **Opis:** Lista svih nekretnina za prodaju i iznajmljivanje

---

### 3. **Kupujem (Buying Services)**
```
https://nekretnine-stepenik.rs/kupujem
```
- **Priority:** 0.8
- **Changefreq:** weekly
- **Opis:** Usluge za kupce nekretnina

---

### 4. **Prodajem (Selling Services)**
```
https://nekretnine-stepenik.rs/prodajem
```
- **Priority:** 0.8
- **Changefreq:** weekly
- **Opis:** Usluge za prodavce nekretnina

---

### 5. **Rentiranje (Renting Services)**
```
https://nekretnine-stepenik.rs/rentiranje
```
- **Priority:** 0.8
- **Changefreq:** weekly
- **Opis:** Usluge za izdavanje/zakup nekretnina

---

### 6. **O Nama (About)**
```
https://nekretnine-stepenik.rs/about
```
- **Priority:** 0.7
- **Changefreq:** monthly
- **Opis:** O agenciji Nekretnine Stepenik

---

### 7. **Kontakt (Contact)**
```
https://nekretnine-stepenik.rs/contact
```
- **Priority:** 0.7
- **Changefreq:** monthly
- **Opis:** Kontakt informacije (napomena: ako nemaš posebnu stranicu, možeš izostaviti)

---

## 🏠 NEKRETNINE (Property Listings)

### **Trenutna Nekretnina:**

#### Nekretnina #1 - Dvosoban stan Nehruova
```
https://nekretnine-stepenik.rs/listing/1
```
- **Priority:** 0.8
- **Changefreq:** weekly
- **Opis:** Dvosoban stan - Nehruova, Savski blokovi (65m², 175,000€)
- **Slike:** 12 slika (uključene u image sitemap)

---

### **Buduće nekretnine (kada ih dodaš):**

```
https://nekretnine-stepenik.rs/listing/2
https://nekretnine-stepenik.rs/listing/3
https://nekretnine-stepenik.rs/listing/4
...itd.
```

**Format za nove nekretnine:**
- URL: `https://nekretnine-stepenik.rs/listing/{ID}`
- Priority: 0.8
- Changefreq: weekly

---

## 🚫 URL-OVI KOJE NE TREBA DODAVATI U SITEMAP

### **Ovi URL-ovi NE treba da budu u sitemap-u:**

#### 1. **Image Reorder Admin Tool**
```
https://nekretnine-stepenik.rs/image-reorder
```
❌ **Razlog:** Admin tool, ne treba da bude indexiran

---

#### 2. **404 / Error Pages**
❌ **Razlog:** Error stranice ne treba indexirati

---

#### 3. **Thank You / Confirmation Pages**
❌ **Razlog:** Stranice posle form submission ne treba u sitemap

---

#### 4. **Filtered URLs sa query parameters**
```
https://nekretnine-stepenik.rs/browse?type=sale
https://nekretnine-stepenik.rs/browse?location=belgrade
```
❌ **Razlog:** Duplicate content problem (main `/browse` je dovoljan)

**Izuzetak:** Ako imaš posebne category stranice (npr. `/browse/sale` ili `/browse/rent`), onda možeš dodati.

---

## 📊 KOMPLETAN SITEMAP TEMPLATE

### **Sitemap.xml struktura:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- 1. HOMEPAGE -->
  <url>
    <loc>https://nekretnine-stepenik.rs/</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/" />
  </url>

  <!-- 2. BROWSE -->
  <url>
    <loc>https://nekretnine-stepenik.rs/browse</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/browse" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/browse" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/browse" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/browse" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/browse" />
  </url>

  <!-- 3. KUPUJEM -->
  <url>
    <loc>https://nekretnine-stepenik.rs/kupujem</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/kupujem" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/kupujem" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/kupujem" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/kupujem" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/kupujem" />
  </url>

  <!-- 4. PRODAJEM -->
  <url>
    <loc>https://nekretnine-stepenik.rs/prodajem</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/prodajem" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/prodajem" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/prodajem" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/prodajem" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/prodajem" />
  </url>

  <!-- 5. RENTIRANJE -->
  <url>
    <loc>https://nekretnine-stepenik.rs/rentiranje</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/rentiranje" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/rentiranje" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/rentiranje" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/rentiranje" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/rentiranje" />
  </url>

  <!-- 6. ABOUT -->
  <url>
    <loc>https://nekretnine-stepenik.rs/about</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/about" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/about" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/about" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/about" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/about" />
  </url>

  <!-- 7. NEKRETNINA #1 -->
  <url>
    <loc>https://nekretnine-stepenik.rs/listing/1</loc>
    <lastmod>2026-03-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="sr" href="https://nekretnine-stepenik.rs/listing/1" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nekretnine-stepenik.rs/listing/1" />
    <xhtml:link rel="alternate" hreflang="ru" href="https://nekretnine-stepenik.rs/listing/1" />
    <xhtml:link rel="alternate" hreflang="tr" href="https://nekretnine-stepenik.rs/listing/1" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nekretnine-stepenik.rs/listing/1" />
    
    <!-- Slike nekretnine (image sitemap) -->
    <image:image>
      <image:loc>https://i.imgur.com/rhk2C8oh.jpg</image:loc>
      <image:title>Dvosoban stan - Nehruova, Savski blokovi - Slika 1</image:title>
    </image:image>
    <image:image>
      <image:loc>https://i.imgur.com/srqdJnBh.jpg</image:loc>
      <image:title>Dvosoban stan - Nehruova, Savski blokovi - Slika 2</image:title>
    </image:image>
    <!-- ... ostale slike ... -->
  </url>

  <!-- OVDE ĆE DOĆI NOVE NEKRETNINE KADA IH DODAŠ -->

</urlset>
```

---

## 🔢 SUMMARY - Trenutno Stanje

### **Ukupno URL-ova u sitemap-u:**
- **Glavne stranice:** 6 URL-ova
  - / (Homepage)
  - /browse
  - /kupujem
  - /prodajem
  - /rentiranje
  - /about
  
- **Nekretnine:** 1 URL
  - /listing/1

**UKUPNO: 7 URL-ova** ✅

---

## 📝 PLAIN TEXT LISTA (Copy-Paste Ready)

Ako ti treba samo lista URL-ova bez meta tagova:

```
https://nekretnine-stepenik.rs/
https://nekretnine-stepenik.rs/browse
https://nekretnine-stepenik.rs/kupujem
https://nekretnine-stepenik.rs/prodajem
https://nekretnine-stepenik.rs/rentiranje
https://nekretnine-stepenik.rs/about
https://nekretnine-stepenik.rs/listing/1
```

---

## ➕ KADA DODAŠ NOVU NEKRETNINU

### **Korak 1:** Dodaj nekretninu u `/src/data/apartments.ts`

```typescript
{
  id: '2',
  name: 'Naziv nekretnine',
  // ... ostali podaci ...
}
```

### **Korak 2:** Automatski generiši novi sitemap

```bash
npm run generate-sitemap
```

### **Korak 3:** Re-submituj u Google Search Console

1. Idi na https://search.google.com/search-console
2. Sitemaps → Ukloni stari sitemap
3. Submituj novi sitemap.xml
4. Google će automatski crawl-ovati nove URL-ove

---

## 🎯 BEST PRACTICES

### **URL Format:**
✅ **DOBRO:**
```
https://nekretnine-stepenik.rs/listing/1
https://nekretnine-stepenik.rs/listing/dvosoban-stan-nehruova
```

❌ **LOŠE:**
```
https://nekretnine-stepenik.rs/listing?id=1          (query parameter)
https://nekretnine-stepenik.rs/listing/1#details     (fragment)
https://nekretnine-stepenik.rs/listing/1/            (trailing slash može biti problem)
```

---

### **Priority Guidelines:**
- **1.0** → Homepage (SAMO homepage!)
- **0.9** → Glavne kategorije (Browse)
- **0.8** → Važne landing pages (Kupujem, Prodajem, Rentiranje, Nekretnine)
- **0.7** → Sekundarne stranice (About, Contact)
- **0.5** → Blog articles (ako dodaš blog)
- **0.3** → Archive pages, old content

---

### **Changefreq Guidelines:**
- **daily** → Homepage, Browse (često se menjaju)
- **weekly** → Landing pages, Nekretnine
- **monthly** → About, Contact (retko se menja)
- **yearly** → Terms of service, Privacy policy

---

## ✅ CHECKLIST PRE SUBMITA

Pre nego što submituje sitemap u Google:

- [ ] Svi URL-ovi rade (200 status, ne 404)
- [ ] Svi URL-ovi su HTTPS (ne HTTP)
- [ ] Nema duplikata
- [ ] Nema redirecta (301/302)
- [ ] XML format je validan
- [ ] robots.txt dozvoljava crawling
- [ ] lastmod datumi su ažurirani

**Test sitemap:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

**🎉 GOTOVO!**

Ovo je kompletna lista svih URL-ova koji treba da budu u tvom sitemap.xml fajlu! 🚀

---

*Last updated: 2026-03-31*
